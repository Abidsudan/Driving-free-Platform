"use client"

import { useState } from "react"
import { generateQuizQuestions, type GenerateQuizQuestionsOutput } from "@/ai/flows/generate-quiz-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, RefreshCw, Trophy, Target, Lightbulb, Zap, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser, useFirestore } from "@/firebase"
import { collection } from "firebase/firestore"
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export function AssessmentQuiz() {
  const { language, dir } = useLanguage()
  const [questions, setQuestions] = useState<GenerateQuizQuestionsOutput["questions"] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const { user } = useUser()
  const db = useFirestore()

  const startQuiz = async () => {
    setIsLoading(true)
    try {
      const result = await generateQuizQuestions({
        numberOfQuestions: 5,
        difficulty: "medium",
        topic: "RTA Theory Test Dubai",
        language: language
      })
      setQuestions(result.questions)
      setCurrentIndex(0)
      setScore(0)
      setIsFinished(false)
      setIsAnswered(false)
      setSelectedAnswer(null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = (index: number) => {
    if (isAnswered) return
    setSelectedAnswer(index)
    setIsAnswered(true)
    if (index === questions![currentIndex].correctAnswerIndex) {
      setScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < questions!.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
      if (user && db) {
        addDocumentNonBlocking(collection(db, 'users', user.uid, 'quizAttempts'), {
          userId: user.uid,
          startTime: new Date().toISOString(),
          score: score + (selectedAnswer === questions![currentIndex].correctAnswerIndex ? 1 : 0),
          totalQuestions: questions!.length,
          isCompleted: true,
          topic: language === 'ar' ? "محاكاة اختبار RTA الذكية" : "Smart RTA Test Simulation"
        });
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center gap-6 animate-pulse">
        <RefreshCw className="h-20 w-20 animate-spin text-primary" />
        <div className="space-y-2">
          <h3 className="text-3xl font-black font-headline text-primary">جاري التحليل وتوليد الأسئلة...</h3>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-black">AI is generating your unique simulation</p>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const finalScore = score + (selectedAnswer === questions![currentIndex].correctAnswerIndex ? 1 : 0);
    const cognitiveRate = (finalScore / (questions?.length || 1)) * 100
    return (
      <Card className="max-w-3xl mx-auto glass-card rounded-[3rem] overflow-hidden animate-fade-in border-accent/20">
        <div className="h-3 bg-accent w-full" />
        <CardContent className="p-16 text-center space-y-12">
          <Trophy className="h-24 w-24 text-accent mx-auto animate-float" />
          <div className="space-y-4">
            <h2 className="text-5xl font-black font-headline">معدل الكفاءة المعرفية</h2>
            <div className="text-8xl font-black smart-gradient-text">{Math.round(cognitiveRate)}%</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[2rem] bg-secondary/40 border border-white/5 space-y-2 text-center">
              <Zap className="h-6 w-6 text-primary mx-auto" />
              <h4 className="font-black text-sm uppercase">نقاط القوة</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">أداء ممتاز في فهم قواعد السرعة والمسافات الآمنة.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-secondary/40 border border-white/5 space-y-2 text-center">
              <Lightbulb className="h-6 w-6 text-accent mx-auto" />
              <h4 className="font-black text-sm uppercase">نصيحة الخبير</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">راجع قوانين الأولوية في المناطق السكنية المزدحمة.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={startQuiz} size="lg" className="h-16 px-12 rounded-2xl font-black text-xl w-full sm:w-auto">إعادة التقييم</Button>
            {user && (
              <Button variant="outline" asChild className="h-16 px-12 rounded-2xl font-black text-xl glass-card w-full sm:w-auto">
                <Link href="/dashboard">لوحة التحكم</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!questions) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center glass-card rounded-[4rem] border-white/5 space-y-10">
        <div className="inline-flex p-6 rounded-3xl bg-primary/10 text-primary animate-float">
          <Target className="h-16 w-16" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl md:text-7xl font-black font-headline leading-none">محاكي اختبار RTA الذكي</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            استخدم قوة الذكاء الاصطناعي لاختبار مستواك المعرفي وتوقع نتيجتك في اختبار RTA النظري الحقيقي في دبي.
          </p>
        </div>
        <Button size="lg" onClick={startQuiz} className="h-20 px-16 rounded-3xl font-black text-2xl shadow-2xl shadow-primary/30 active:scale-95 transition-all">
          ابدأ المحاكاة الآن
        </Button>
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">5 أسئلة تقنية • تحليل فوري • مجاني بالكامل</p>
      </div>
    )
  }

  const q = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in px-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">السؤال {currentIndex + 1} من {questions.length}</span>
          <h3 className="text-2xl font-black font-headline text-accent uppercase tracking-tighter">{q.category}</h3>
        </div>
        <div className="h-16 w-16 rounded-2xl glass-card flex items-center justify-center text-2xl font-black text-primary border-primary/20">
          {currentIndex + 1}
        </div>
      </div>
      
      <Progress value={progress} className="h-3 bg-secondary rounded-full overflow-hidden" />
      
      <Card className="glass-card border-white/5 overflow-hidden rounded-[3rem]">
        <CardHeader className="p-12 pb-8">
          <CardTitle className="text-2xl md:text-3xl leading-[1.3] font-black font-headline">{q.questionText}</CardTitle>
        </CardHeader>
        <CardContent className="px-12 space-y-4 pb-12">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleAnswer(idx)}
              className={cn(
                "w-full flex items-center justify-between p-6 rounded-[1.5rem] border-2 text-right transition-all group",
                !isAnswered && "border-white/5 hover:border-primary/50 hover:bg-primary/5",
                isAnswered && idx === q.correctAnswerIndex && "border-green-500 bg-green-500/10 text-green-400 scale-[1.02]",
                isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && "border-red-500 bg-red-500/10 text-red-400",
                isAnswered && idx !== selectedAnswer && idx !== q.correctAnswerIndex && "opacity-40 grayscale"
              )}
            >
              <span className="text-lg font-bold">{option}</span>
              <div className={cn(
                "h-6 w-6 rounded-full border-2 flex items-center justify-center",
                isAnswered && idx === q.correctAnswerIndex ? "bg-green-500 border-green-500" : "border-white/10"
              )}>
                {isAnswered && idx === q.correctAnswerIndex && <CheckCircle2 className="h-4 w-4 text-white" />}
                {isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && <XCircle className="h-4 w-4 text-red-500" />}
              </div>
            </button>
          ))}
        </CardContent>
        {isAnswered && (
          <CardFooter className="flex flex-col items-start gap-8 p-12 bg-primary/5 border-t border-white/5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest">
                <Lightbulb className="h-4 w-4" /> التحليل العلمي
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium italic">{q.explanation}</p>
            </div>
            <Button onClick={nextQuestion} className="h-16 w-full rounded-2xl font-black text-xl shadow-xl shadow-primary/20">
              {currentIndex === questions.length - 1 ? 'إنهاء المحاكاة' : 'السؤال التالي'}
              {dir === 'rtl' ? <ArrowLeft className="h-5 w-5 mr-3" /> : <ArrowRight className="h-5 w-5 ml-3" />}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}