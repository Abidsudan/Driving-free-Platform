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
    strengthTitle: language === 'ar' ? "نقاط القوة" : "Key Strengths",
    strengthDesc: language === 'ar' ? "أداء ممتاز في فهم قواعد الالتزام وأخطاء الرسوب الفوري." : "Excellent performance in lane rules and immediate failure errors.",
    adviceTitle: language === 'ar' ? "نصيحة المعلم" : "Teacher's Advice",
    adviceDesc: language === 'ar' ? "يجب أن تجيد هذه الأسئلة بنسبة 100% لتضمن النجاح في الاختبار الحقيقي." : "You must master these questions 100% to guarantee success in the real test.",
    btnRetry: language === 'ar' ? "إعادة اختبار التميز" : "Retry Mastery Test",
    btnDashboard: language === 'ar' ? "لوحة التحكم" : "Dashboard",
    simulatorTitle: language === 'ar' ? "اختبار التميز الأكاديمي (Mastery Set)" : "Academic Mastery Test",
    simulatorDesc: language === 'ar' ? "تدرب على الـ 16 سؤالاً الأكثر حيوية في اختبار RTA. يجب عليك إتقانها بنسبة 100% للنجاح المضمون." : "Train on the 16 most vital questions in the RTA test. You must master them 100% for guaranteed success.",
    btnStart: language === 'ar' ? "ابدأ اختبار التميز الآن" : "Start Mastery Test Now",
    statsLabel: language === 'ar' ? "16 قاعدة ذهبية • تحليل فوري • مجاني بالكامل" : "16 Golden Rules • Instant Analysis • 100% Free",
    questionLabel: language === 'ar' ? "السؤال" : "Question",
    ofLabel: language === 'ar' ? "من" : "of",
    analysisLabel: language === 'ar' ? "التحليل العلمي" : "Scientific Analysis",
    btnFinish: language === 'ar' ? "إنهاء الاختبار" : "Finish Test",
    btnNext: language === 'ar' ? "السؤال التالي" : "Next Question",
    errorTitle: language === 'ar' ? "خطأ في الاتصال" : "Connection Error",
    errorDesc: language === 'ar' ? "حدث خطأ أثناء توليد الأسئلة، يرجى المحاولة مرة أخرى." : "Error generating questions, please try again."
  };

  const startQuiz = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await generateQuizQuestions({
        numberOfQuestions: 16,
        difficulty: "hard",
        topic: "RTA Mastery Set 16 Questions",
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
          score: score, // Correct score already updated in handleAnswer
          totalQuestions: questions!.length,
          isCompleted: true,
          topic: language === 'ar' ? "اختبار مجموعة التميز" : "Mastery Set Test"
        });
      }
    }
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center glass-card border-red-500/20 space-y-6">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
        <h3 className="text-2xl font-black">{t.errorTitle}</h3>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={startQuiz} className="rounded-2xl h-14 px-8">إعادة المحاولة</Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center gap-10 animate-fade-in">
        <div className="relative">
          <BrainCircuit className="h-32 w-32 text-primary animate-pulse" />
          <RefreshCw className="h-40 w-40 animate-spin text-primary/20 absolute -top-4 -left-4" />
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl md:text-6xl font-black font-headline text-primary tracking-tighter">{t.loadingTitle}</h3>
          <p className="text-xl text-muted-foreground uppercase tracking-[0.3em] font-black opacity-60">{t.loadingSubtitle}</p>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const cognitiveRate = (score / (questions?.length || 1)) * 100
    return (
      <Card className="max-w-4xl mx-auto glass-card rounded-[4rem] overflow-hidden animate-fade-in border-accent/20 shadow-[0_0_100px_rgba(245,158,11,0.1)]">
        <div className="h-4 bg-accent w-full animate-pulse" />
        <CardContent className="p-16 md:p-24 text-center space-y-16">
          <div className="relative inline-block">
            <Trophy className="h-32 w-32 text-accent mx-auto animate-float" />
            <Zap className="h-12 w-12 text-primary absolute -top-4 -right-4 animate-pulse" />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">{t.resultTitle}</h2>
            <div className="text-9xl font-black smart-gradient-text leading-none">{Math.round(cognitiveRate)}%</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[3rem] bg-secondary/40 border border-white/5 space-y-4 text-center shadow-xl hover:border-primary/30 transition-all">
              <ShieldCheck className="h-10 w-10 text-primary mx-auto" />
              <h4 className="font-black text-lg uppercase tracking-widest">{t.strengthTitle}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">{t.strengthDesc}</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-secondary/40 border border-white/5 space-y-4 text-center shadow-xl hover:border-accent/30 transition-all">
              <Star className="h-10 w-10 text-accent mx-auto fill-accent" />
              <h4 className="font-black text-lg uppercase tracking-widest">{t.adviceTitle}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">{t.adviceDesc}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button onClick={startQuiz} size="lg" className="h-20 px-16 rounded-[2rem] font-black text-2xl w-full sm:w-auto shadow-2xl shadow-primary/30">
              {t.btnRetry}
            </Button>
            {user && (
              <Button variant="outline" asChild className="h-20 px-16 rounded-[2rem] font-black text-2xl glass-card w-full sm:w-auto hover:bg-white/5">
                <Link href="/dashboard">{t.btnDashboard}</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!questions) {
    return (
      <div className="max-w-5xl mx-auto p-16 md:p-32 text-center glass-card rounded-[5rem] border-white/5 space-y-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 inline-flex p-8 rounded-[2.5rem] bg-primary/10 text-primary animate-float mb-4">
          <Star className="h-20 w-20 fill-primary" />
        </div>
        <div className="relative z-10 space-y-8">
          <h2 className="text-6xl md:text-9xl font-black font-headline leading-[0.85] tracking-tighter smart-gradient-text">{t.simulatorTitle}</h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium opacity-80">
            {t.simulatorDesc}
          </p>
        </div>
        <div className="relative z-10 space-y-10">
          <Button size="lg" onClick={startQuiz} className="h-24 px-20 rounded-[3rem] font-black text-3xl shadow-[0_20px_80px_rgba(59,130,246,0.5)] active:scale-95 transition-all bg-primary hover:bg-primary/90">
            {t.btnStart}
            <Zap className="ml-4 h-8 w-8 fill-white" />
          </Button>
          <div className="flex items-center justify-center gap-4 text-[12px] font-black text-muted-foreground uppercase tracking-[0.5em] opacity-60">
            <Database className="h-4 w-4" />
            {t.statsLabel}
          </div>
        </div>
      </div>
    )
  }

  const q = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in px-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em] opacity-60">
            {t.questionLabel} {currentIndex + 1} {t.ofLabel} {questions.length}
          </span>
          <h3 className="text-3xl font-black font-headline text-accent uppercase tracking-tighter leading-none">{q.category}</h3>
        </div>
        <div className="h-20 w-20 rounded-[2rem] glass-card flex items-center justify-center text-3xl font-black text-primary border-primary/30 shadow-2xl">
          {currentIndex + 1}
        </div>
      </div>
      
      <div className="relative h-4 w-full bg-secondary/40 rounded-full overflow-hidden shadow-inner">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 shadow-[0_0_20px_hsl(var(--primary))]" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <Card className="glass-card border-white/5 overflow-hidden rounded-[4rem] shadow-2xl">
        <CardHeader className="p-12 md:p-20 pb-10">
          <CardTitle className="text-3xl md:text-5xl leading-[1.2] font-black font-headline tracking-tight">{q.questionText}</CardTitle>
        </CardHeader>
        <CardContent className="px-12 md:px-20 space-y-6 pb-16">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleAnswer(idx)}
              className={cn(
                "w-full flex items-center justify-between p-8 rounded-[2.5rem] border-2 text-right transition-all duration-500 group shadow-xl",
                !isAnswered && "border-white/5 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]",
                isAnswered && idx === q.correctAnswerIndex && "border-green-500 bg-green-500/10 text-green-400 scale-[1.05] shadow-[0_0_40px_rgba(34,197,94,0.2)]",
                isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && "border-red-500 bg-red-500/10 text-red-400 scale-[0.98]",
                isAnswered && idx !== selectedAnswer && idx !== q.correctAnswerIndex && "opacity-20 grayscale"
              )}
            >
              <span className="text-xl font-bold tracking-tight">{option}</span>
              <div className={cn(
                "h-8 w-8 rounded-2xl border-2 flex items-center justify-center shrink-0 ml-6 transition-all duration-500",
                isAnswered && idx === q.correctAnswerIndex ? "bg-green-500 border-green-500 scale-110" : "border-white/10"
              )}>
                {isAnswered && idx === q.correctAnswerIndex && <CheckCircle2 className="h-5 w-5 text-white" />}
                {isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && <XCircle className="h-5 w-5 text-red-500" />}
              </div>
            </button>
          ))}
        </CardContent>
        {isAnswered && (
          <CardFooter className="flex flex-col items-start gap-12 p-16 md:p-20 bg-primary/5 border-t border-white/5 backdrop-blur-3xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent font-black text-sm uppercase tracking-[0.3em]">
                <Lightbulb className="h-6 w-6" /> {t.analysisLabel}
              </div>
              <p className="text-2xl leading-relaxed text-muted-foreground font-bold italic opacity-90">{q.explanation}</p>
            </div>
            <Button onClick={nextQuestion} className="h-24 w-full rounded-[2.5rem] font-black text-3xl shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 group">
              {currentIndex === questions.length - 1 ? t.btnFinish : t.btnNext}
              {dir === 'rtl' ? <ArrowLeft className="h-8 w-8 mr-4 group-hover:translate-x-[-10px] transition-transform" /> : <ArrowRight className="h-8 w-8 ml-4 group-hover:translate-x-[10px] transition-transform" />}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
