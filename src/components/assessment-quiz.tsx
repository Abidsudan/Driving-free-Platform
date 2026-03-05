"use client"

import { useState } from "react"
import { generateQuizQuestions, type GenerateQuizQuestionsOutput } from "@/ai/flows/generate-quiz-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, RefreshCw, Trophy, Target, Lightbulb, Zap, ArrowRight, ArrowLeft, ShieldCheck, Database, BrainCircuit, Star, AlertCircle, Loader2 } from "lucide-react"
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
      console.error(err)
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

  if (isLoading) return (
    <div className="py-40 text-center space-y-6">
      <div className="relative inline-block">
        <div className="h-32 w-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <BrainCircuit className="h-12 w-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="space-y-2 animate-pulse">
        <h3 className="text-2xl font-black font-headline">{t.loadingTitle}</h3>
        <p className="text-muted-foreground font-medium">{t.loadingSubtitle}</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="text-center py-20 glass-card rounded-[3rem] border-red-500/20 max-w-2xl mx-auto space-y-6">
      <AlertCircle className="h-20 w-20 mx-auto text-red-500" />
      <div className="space-y-2">
        <h3 className="text-2xl font-black">{language === 'ar' ? "عذراً، حدث خطأ" : "Oops, an error occurred"}</h3>
        <p className="text-muted-foreground font-medium">{error}</p>
      </div>
      <Button onClick={startQuiz} className="rounded-2xl h-14 px-10 font-black">
        <RefreshCw className="mr-2 h-5 w-5" /> {language === 'ar' ? "حاول مرة أخرى" : "Try Again"}
      </Button>
    </div>
  )

  if (isFinished) {
    const rate = Math.round((score / questions!.length) * 100)
    return (
      <Card className="max-w-2xl mx-auto glass-card text-center p-12 space-y-8 rounded-[3rem] border-primary/20 shadow-2xl">
        <div className="relative">
          <Trophy className="h-32 w-32 text-accent mx-auto animate-float" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent/10 blur-[60px] rounded-full -z-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-headline font-black">{t.resultTitle}</h2>
          <div className="text-9xl font-black smart-gradient-text leading-none">{rate}%</div>
        </div>
        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 inline-flex items-center gap-4">
          <div className="text-center">
            <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest">Correct</span>
            <span className="text-2xl font-black text-green-400">{score}</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total</span>
            <span className="text-2xl font-black">{questions!.length}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={startQuiz} className="rounded-[1.5rem] h-16 px-10 font-black text-lg">
            <RefreshCw className="mr-2 h-5 w-5" /> {t.btnRetry}
          </Button>
          <Button variant="outline" asChild className="rounded-[1.5rem] h-16 px-10 font-black text-lg glass-card border-white/10 hover:bg-white/5">
            <Link href="/dashboard">{language === 'ar' ? "لوحة التحكم" : "Dashboard"}</Link>
          </Button>
        </div>
      </Card>
    )
  }

  if (!questions) {
    return (
      <div className="max-w-4xl mx-auto text-center glass-card p-16 rounded-[4rem] border-white/5 space-y-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative z-10 space-y-10">
          <div className="inline-flex p-8 rounded-[2.5rem] bg-primary/10 text-primary mb-4 animate-float">
            <Database className="h-16 w-16" />
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tighter leading-none">{t.simulatorTitle}</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              {language === 'ar' 
                ? "ابدأ الآن تقييماً ذكياً يدمج بين مجموعة التميز الـ 16 والأسئلة الرسمية لضمان جاهزيتك التامة." 
                : "Start a smart assessment combining the Mastery Set and official questions to ensure full readiness."}
            </p>
          </div>
          <Button onClick={startQuiz} size="lg" className="h-20 px-16 rounded-[2rem] font-black text-2xl shadow-[0_20px_80px_rgba(59,130,246,0.4)] hover:scale-105 transition-all">
            {t.btnStart} <Zap className="ml-3 h-6 w-6 fill-white" />
          </Button>
        </div>
      </div>
    )
  }

  const q = questions[currentIndex]
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
          Question {currentIndex + 1} <span className="opacity-40">/ {questions.length}</span>
        </span>
        <div className="academic-badge bg-accent/10 text-accent border-accent/20">
          {q.category}
        </div>
      </div>
      <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-2 bg-white/5" />
      
      <Card className="glass-card overflow-hidden rounded-[3rem] border-white/5 shadow-2xl">
        <CardHeader className="p-10 pb-6">
          <CardTitle className="text-2xl md:text-3xl font-black font-headline leading-tight">{q.questionText}</CardTitle>
        </CardHeader>
        <CardContent className="p-10 pt-0 space-y-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              disabled={isAnswered}
              onClick={() => handleAnswer(i)}
              className={cn(
                "w-full text-left p-6 rounded-2xl border-2 transition-all font-bold text-lg",
                !isAnswered && "border-white/5 hover:border-primary/50 hover:bg-primary/5",
                isAnswered && i === q.correctAnswerIndex && "border-green-500 bg-green-500/10 text-green-400",
                isAnswered && i === selectedAnswer && i !== q.correctAnswerIndex && "border-red-500 bg-red-500/10 text-red-400"
              )}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {isAnswered && i === q.correctAnswerIndex && <CheckCircle2 className="h-6 w-6 shrink-0" />}
                {isAnswered && i === selectedAnswer && i !== q.correctAnswerIndex && <XCircle className="h-6 w-6 shrink-0" />}
              </div>
            </button>
          ))}
        </CardContent>
        {isAnswered && (
          <CardFooter className="bg-primary/5 p-10 flex flex-col gap-8 items-start animate-fade-in">
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest">
                <Lightbulb className="h-4 w-4" /> {t.analysisLabel}
              </div>
              <p className="text-muted-foreground italic font-medium text-lg leading-relaxed">{q.explanation}</p>
            </div>
            <Button onClick={handleNextAction} className="w-full h-16 rounded-[1.5rem] font-black text-xl shadow-xl">
              {currentIndex === questions.length - 1 ? (language === 'ar' ? "إنهاء التقييم" : "Finish Assessment") : (language === 'ar' ? "السؤال التالي" : "Next Question")} 
              {dir === 'rtl' ? <ArrowLeft className="mr-2 h-6 w-6" /> : <ArrowRight className="ml-2 h-6 w-6" />}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
