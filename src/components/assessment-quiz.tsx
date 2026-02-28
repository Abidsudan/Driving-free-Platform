
"use client"

import { useState } from "react"
import { generateQuizQuestions, type GenerateQuizQuestionsOutput } from "@/ai/flows/generate-quiz-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, Trophy, Target, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

export function AssessmentQuiz() {
  const [questions, setQuestions] = useState<GenerateQuizQuestionsOutput["questions"] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const startQuiz = async () => {
    setIsLoading(true)
    try {
      const result = await generateQuizQuestions({
        numberOfQuestions: 5,
        difficulty: "medium",
        topic: "RTA Theory Test Dubai"
      })
      setQuestions(result.questions)
      setCurrentIndex(0)
      setScore(0)
      setIsFinished(false)
      setIsAnswered(false)
      setSelectedAnswer(null)
    } catch (error) {
      console.error("Failed to fetch questions:", error)
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
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-pulse">
        <div className="relative">
          <RefreshCw className="h-16 w-16 animate-spin text-primary mb-6" />
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        </div>
        <h3 className="font-headline text-2xl font-bold text-primary">جاري توليد الأسئلة بذكاء...</h3>
        <p className="text-muted-foreground mt-2 max-w-xs mx-auto">نحن نعد لك محاكاة دقيقة لاختبار RTA بناءً على أحدث القواعد</p>
      </div>
    )
  }

  if (isFinished) {
    const cognitiveRate = (score / (questions?.length || 1)) * 100
    return (
      <Card className="max-w-2xl mx-auto glass-card border-accent/20 overflow-hidden animate-fade-in-up">
        <div className="h-2 bg-accent w-full" />
        <CardHeader className="text-center pt-10">
          <Trophy className="h-16 w-16 text-accent mx-auto mb-4" />
          <CardTitle className="text-3xl font-headline text-accent">معدل الإدراك المعرفي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-center px-10">
          <div className="relative inline-flex items-center justify-center p-12 rounded-full border-4 border-primary/30 bg-primary/5">
            <span className="text-6xl font-black text-primary">{Math.round(cognitiveRate)}%</span>
            <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping opacity-20" />
          </div>
          
          <div className="space-y-2">
            <p className="text-xl font-bold">نتيجة الاختبار: {score} من {questions?.length}</p>
            <p className="text-muted-foreground">
              {cognitiveRate >= 80 ? "أداء استثنائي! أنت مستعد تماماً للتفوق في الاختبار الحقيقي." : 
               cognitiveRate >= 60 ? "أداء جيد، مراجعة بسيطة للمفاهيم التقنية ستضمن لك النجاح." : "تحتاج للتركيز أكثر على المنهج الأكاديمي قبل خوض الاختبار."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-secondary/40 border border-white/5 text-right">
              <div className="flex items-center gap-2 text-primary font-bold mb-1">
                <Target className="h-4 w-4" /> نقاط القوة
              </div>
              <p className="text-sm text-muted-foreground">فهم جيد لسلوك الطريق العام والسرعات المقررة.</p>
            </div>
            <div className="p-5 rounded-2xl bg-secondary/40 border border-white/5 text-right">
              <div className="flex items-center gap-2 text-accent font-bold mb-1">
                <Lightbulb className="h-4 w-4" /> نصيحة الخبير
              </div>
              <p className="text-sm text-muted-foreground">راجع قواعد الأولوية في الدوارات المعقدة وإشارات التنبيه.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-10">
          <Button onClick={startQuiz} size="lg" className="bg-primary hover:bg-primary/90 px-10 h-14 text-lg">خوض التقييم مرة أخرى</Button>
        </CardFooter>
      </Card>
    )
  }

  if (!questions) {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-2xl mx-auto p-8 md:p-16 glass-card rounded-[3rem] space-y-8 animate-fade-in-up">
          <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary">
            <Target className="h-12 w-12" />
          </div>
          <div className="space-y-4">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">محاكي اختبار RTA الذكي</h2>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              تقييم فوري لمستواك المعرفي عبر أسئلة ديناميكية تغطي أحدث لوائح هيئة الطرق والمواصلات بدبي ونظام DSSSM.
            </p>
          </div>
          <Button size="lg" onClick={startQuiz} className="bg-primary hover:bg-primary/90 px-12 h-16 text-xl rounded-2xl shadow-2xl shadow-primary/20">ابدأ التقييم الآن</Button>
          <p className="text-xs text-muted-foreground/60">يستغرق الاختبار حوالي 3 دقائق • 5 أسئلة تقنية</p>
        </div>
      </div>
    )
  }

  const q = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4 animate-fade-in-up">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">السؤال {currentIndex + 1} / {questions.length}</span>
          <span className="text-xl font-headline font-bold text-accent">{q.category}</span>
        </div>
        <div className="h-12 w-12 rounded-full border-2 border-primary/20 flex items-center justify-center font-bold text-primary">
          {currentIndex + 1}
        </div>
      </div>
      
      <Progress value={progress} className="h-2 bg-secondary rounded-full overflow-hidden" />
      
      <Card className="glass-card border-white/5 overflow-hidden">
        <CardHeader className="pb-8 pt-10">
          <CardTitle className="text-xl md:text-2xl leading-relaxed text-right">{q.questionText}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-6 md:px-10">
          {q.options.map((option, idx) => {
            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx)}
                className={cn(
                  "group w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-right",
                  !isAnswered && "hover:border-primary/50 hover:bg-primary/5 border-white/5",
                  isAnswered && idx === q.correctAnswerIndex && "border-green-500 bg-green-500/10 text-green-400 scale-[1.02]",
                  isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && "border-red-500 bg-red-500/10 text-red-400",
                  isAnswered && idx !== selectedAnswer && idx !== q.correctAnswerIndex && "opacity-40 border-white/5"
                )}
              >
                <span className="text-base md:text-lg font-medium">{option}</span>
                <div className={cn(
                  "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                  isAnswered && idx === q.correctAnswerIndex ? "bg-green-500 border-green-500" : "border-white/10"
                )}>
                  {isAnswered && idx === q.correctAnswerIndex && <CheckCircle2 className="h-4 w-4 text-white" />}
                  {isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && <XCircle className="h-4 w-4 text-red-400" />}
                </div>
              </button>
            )
          })}
        </CardContent>
        {isAnswered && (
          <CardFooter className="flex flex-col items-start gap-6 p-8 md:p-10 border-t border-white/5 bg-primary/5 animate-fade-in">
            <div className="space-y-2 text-right w-full">
              <div className="flex items-center gap-2 text-accent font-black text-sm uppercase tracking-tighter">
                <Lightbulb className="h-4 w-4" /> الشرح العلمي
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{q.explanation}</p>
            </div>
            <Button onClick={nextQuestion} size="lg" className="w-full bg-primary hover:bg-primary/90 h-14 rounded-xl text-lg shadow-xl shadow-primary/20">
              {currentIndex === questions.length - 1 ? "عرض النتيجة النهائية" : "السؤال التالي"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
