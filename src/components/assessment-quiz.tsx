"use client"

import { useState } from "react"
import { generateQuizQuestions, type GenerateQuizQuestionsOutput } from "@/ai/flows/generate-quiz-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, RefreshCw, Trophy, Target, Lightbulb, Zap, ArrowRight, ArrowLeft, ShieldCheck, Database, BrainCircuit, Star, AlertCircle } from "lucide-react"
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
  const [error, setError] = useState<string | null>(null)
  
  const { user } = useUser()
  const db = useFirestore()

  const t = {
    loadingTitle: language === 'ar' ? "جاري استحضار مجموعة التميز..." : "Summoning Mastery Set...",
    loadingSubtitle: language === 'ar' ? "الذكاء الاصطناعي يقوم ببناء اختبار الـ 16 قاعدة الذهبية" : "AI is building the 16 Golden Rules test",
    resultTitle: language === 'ar' ? "معدل التميز الأكاديمي" : "Academic Excellence Rate",
    btnRetry: language === 'ar' ? "إعادة اختبار التميز" : "Retry Mastery Test",
    simulatorTitle: language === 'ar' ? "اختبار التميز الأكاديمي (Mastery Set)" : "Academic Mastery Test",
    btnStart: language === 'ar' ? "ابدأ اختبار التميز الآن" : "Start Mastery Test Now",
    analysisLabel: language === 'ar' ? "التحليل العلمي" : "Scientific Analysis",
    errorDesc: language === 'ar' ? "حدث خطأ أثناء توليد الأسئلة، يرجى المحاولة مرة أخرى." : "Error generating questions, please try again."
  };

  const startQuiz = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await generateQuizQuestions({
        numberOfQuestions: 16,
        language: language
      })
      setQuestions(result.questions)
      setCurrentIndex(0)
      setScore(0)
      setIsFinished(false)
      setIsAnswered(false)
      setSelectedAnswer(null)
    } catch (err) {
      setError(t.errorDesc)
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

  const handleNextAction = () => {
    if (currentIndex < questions!.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
      if (user && db) {
        addDocumentNonBlocking(collection(db, 'users', user.uid, 'quizAttempts'), {
          userId: user.uid,
          quizId: 'mastery-set',
          startTime: new Date().toISOString(),
          score: score,
          totalQuestions: questions!.length,
          isCompleted: true,
          topic: language === 'ar' ? "اختبار مجموعة التميز" : "Mastery Set Test"
        });
      }
    }
  }

  if (isLoading) return <div className="py-40 text-center animate-pulse"><BrainCircuit className="h-20 w-20 mx-auto text-primary mb-4" />{t.loadingTitle}</div>
  if (error) return <div className="text-center py-20 text-red-500"><AlertCircle className="h-12 w-12 mx-auto mb-4" />{error}<Button onClick={startQuiz} className="mt-4 block mx-auto">Retry</Button></div>

  if (isFinished) {
    const rate = Math.round((score / questions!.length) * 100)
    return (
      <Card className="max-w-2xl mx-auto glass-card text-center p-12 space-y-8 rounded-[3rem]">
        <Trophy className="h-24 w-24 text-accent mx-auto" />
        <h2 className="text-4xl font-headline font-black">{t.resultTitle}</h2>
        <div className="text-8xl font-black smart-gradient-text">{rate}%</div>
        <div className="flex gap-4 justify-center">
          <Button onClick={startQuiz} className="rounded-2xl h-14 px-10">Retry</Button>
          <Button variant="outline" asChild className="rounded-2xl h-14 px-10"><Link href="/dashboard">Dashboard</Link></Button>
        </div>
      </Card>
    )
  }

  if (!questions) {
    return (
      <div className="max-w-4xl mx-auto text-center glass-card p-16 rounded-[4rem] border-white/5 space-y-10">
        <Star className="h-16 w-16 text-primary mx-auto fill-primary" />
        <h2 className="text-5xl font-headline font-black tracking-tighter">{t.simulatorTitle}</h2>
        <Button onClick={startQuiz} size="lg" className="h-20 px-16 rounded-[2rem] font-black text-2xl shadow-2xl shadow-primary/30">
          {t.btnStart} <Zap className="ml-3 h-6 w-6" />
        </Button>
      </div>
    )
  }

  const q = questions[currentIndex]
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2" />
      <Card className="glass-card overflow-hidden rounded-[3rem] border-white/5">
        <CardHeader className="p-10 pb-6">
          <CardTitle className="text-2xl font-black font-headline leading-relaxed">{q.questionText}</CardTitle>
        </CardHeader>
        <CardContent className="p-10 pt-0 space-y-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              disabled={isAnswered}
              onClick={() => handleAnswer(i)}
              className={cn(
                "w-full text-left p-6 rounded-2xl border-2 transition-all font-bold",
                !isAnswered && "border-white/5 hover:border-primary/50 hover:bg-primary/5",
                isAnswered && i === q.correctAnswerIndex && "border-green-500 bg-green-500/10 text-green-400",
                isAnswered && i === selectedAnswer && i !== q.correctAnswerIndex && "border-red-500 bg-red-500/10 text-red-400"
              )}
            >
              {opt}
            </button>
          ))}
        </CardContent>
        {isAnswered && (
          <CardFooter className="bg-primary/5 p-10 flex flex-col gap-6 items-start">
            <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest">
              <Lightbulb className="h-4 w-4" /> {t.analysisLabel}
            </div>
            <p className="text-muted-foreground italic font-medium">{q.explanation}</p>
            <Button onClick={handleNextAction} className="w-full h-16 rounded-2xl font-black text-xl">
              {currentIndex === questions.length - 1 ? "Finish" : "Next"} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
