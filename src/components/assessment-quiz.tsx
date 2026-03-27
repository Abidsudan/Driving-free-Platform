"use client"

import { useState } from "react"
import { generateQuizQuestions, type GenerateQuizQuestionsOutput } from "@/ai/flows/generate-quiz-questions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, RefreshCw, Trophy, Target, Lightbulb, Zap, ArrowRight, ArrowLeft, Sparkles, Activity, ShieldCheck } from "lucide-react"
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

  const t = {
    loadingTitle: language === 'ar' ? "جاري التحليل وتوليد الأسئلة..." : "Analyzing and Generating Questions...",
    loadingSubtitle: language === 'ar' ? "الذكاء الاصطناعي يقوم ببناء محاكاة فريدة لك" : "AI is building a unique simulation for you",
    resultTitle: language === 'ar' ? "معدل الكفاءة المعرفية" : "Cognitive Efficiency Rate",
    strengthTitle: language === 'ar' ? "نقاط القوة" : "Key Strengths",
    strengthDesc: language === 'ar' ? "أداء ممتاز في فهم قواعد السرعة والمسافات الآمنة." : "Excellent performance in understanding speed rules and safe distances.",
    adviceTitle: language === 'ar' ? "نصيحة الخبير" : "Expert Advice",
    adviceDesc: language === 'ar' ? "راجع قوانين الأولوية في المناطق السكنية المزدحمة." : "Review priority laws in congested residential areas.",
    btnRetry: language === 'ar' ? "إعادة التقييم" : "Retry Assessment",
    btnDashboard: language === 'ar' ? "لوحة التحكم" : "Dashboard",
    simulatorTitle: language === 'ar' ? "محاكي اختبار RTA الذكي" : "Smart RTA Test Simulator",
    simulatorDesc: language === 'ar' ? "استخدم قوة الذكاء الاصطناعي لاختبار مستواك المعرفي وتوقع نتيجتك في اختبار RTA النظري الحقيقي في دبي." : "Use AI power to test your knowledge and predict your result in the real RTA theory test in Dubai.",
    btnStart: language === 'ar' ? "ابدأ المحاكاة الآن" : "Start Simulation Now",
    statsLabel: language === 'ar' ? "5 أسئلة تقنية • تحليل فوري • مجاني بالكامل" : "5 Technical Questions • Instant Analysis • 100% Free",
    questionLabel: language === 'ar' ? "السؤال" : "Question",
    ofLabel: language === 'ar' ? "من" : "of",
    analysisLabel: language === 'ar' ? "التحليل العلمي" : "Scientific Analysis",
    btnFinish: language === 'ar' ? "إنهاء المحاكاة" : "Finish Simulation",
    btnNext: language === 'ar' ? "السؤال التالي" : "Next Question"
  };

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
      <div className="flex flex-col items-center justify-center py-48 text-center gap-12 animate-reveal-up">
        <div className="relative">
          <RefreshCw className="h-32 w-32 animate-spin text-primary opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <div className="absolute -inset-8 bg-primary/10 blur-[60px] rounded-full animate-float" />
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-black font-headline tracking-tight leading-none smart-gradient-text">{t.loadingTitle}</h3>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.5em] font-black opacity-60">{t.loadingSubtitle}</p>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const finalScore = score + (selectedAnswer === questions![currentIndex].correctAnswerIndex ? 1 : 0);
    const cognitiveRate = (finalScore / (questions?.length || 1)) * 100
    return (
      <Card className="max-w-4xl mx-auto glass-card rounded-[4rem] overflow-hidden animate-reveal-up border-primary/20 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
        <CardContent className="p-20 text-center space-y-16">
          <div className="relative inline-block">
             <Trophy className="h-32 w-32 text-accent mx-auto animate-float shadow-2xl" />
             <div className="absolute -inset-8 bg-accent/20 blur-[60px] rounded-full -z-10" />
          </div>
          <div className="space-y-4">
            <h2 className="text-6xl font-black font-headline tracking-tighter">{t.resultTitle}</h2>
            <div className="text-9xl font-black smart-gradient-text tracking-[ -0.05em]">{Math.round(cognitiveRate)}%</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <div className="glass-card p-10 rounded-[3rem] border-white/5 space-y-4 text-center group hover:border-primary/30 transition-all">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto group-hover:bg-primary group-hover:text-black transition-all">
                <Zap className="h-8 w-8 text-primary group-hover:text-black" />
              </div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary">{t.strengthTitle}</h4>
              <p className="text-muted-foreground font-medium leading-relaxed opacity-80">{t.strengthDesc}</p>
            </div>
            <div className="glass-card p-10 rounded-[3rem] border-white/5 space-y-4 text-center group hover:border-accent/30 transition-all">
              <div className="p-4 bg-accent/10 rounded-2xl w-fit mx-auto group-hover:bg-accent group-hover:text-black transition-all">
                <Lightbulb className="h-8 w-8 text-accent group-hover:text-black" />
              </div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-accent">{t.adviceTitle}</h4>
              <p className="text-muted-foreground font-medium leading-relaxed opacity-80">{t.adviceDesc}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button onClick={startQuiz} size="lg" className="premium-button h-20 px-16 text-black bg-primary hover:bg-primary/90 text-2xl font-black rounded-[2rem] w-full sm:w-auto shadow-2xl shadow-primary/20">{t.btnRetry}</Button>
            {user && (
              <Button variant="outline" asChild className="h-20 px-16 text-white rounded-[2rem] border-white/10 glass-card text-2xl font-black hover:bg-white/5 w-full sm:w-auto">
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
      <div className="max-w-5xl mx-auto p-20 text-center glass-card rounded-[4rem] border-primary/10 space-y-12 relative overflow-hidden animate-reveal-up">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -mr-48 -mt-48" />
        <div className="inline-flex p-10 rounded-[2.5rem] bg-primary/10 text-primary border border-primary/20 shadow-2xl shadow-primary/20 animate-float relative z-10">
          <Target className="h-20 w-20" />
        </div>
        <div className="space-y-6 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black font-headline leading-none tracking-tighter smart-gradient-text">{t.simulatorTitle}</h2>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium opacity-80">
            {t.simulatorDesc}
          </p>
        </div>
        <div className="relative z-10 space-y-8">
          <Button size="lg" onClick={startQuiz} className="premium-button h-24 px-20 text-black bg-primary hover:bg-primary/90 rounded-[2.5rem] text-3xl font-black shadow-2xl shadow-primary/30 active:scale-95">
            {t.btnStart}
          </Button>
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-white/10" />
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] opacity-60">{t.statsLabel}</p>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </div>
    )
  }

  const q = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-reveal-up px-6 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] opacity-80">{t.questionLabel} {currentIndex + 1} {t.ofLabel} {questions.length}</span>
          <h3 className="text-3xl md:text-4xl font-black font-headline text-white tracking-tight uppercase">{q.category}</h3>
        </div>
        <div className="h-20 w-20 rounded-[2rem] glass-card flex items-center justify-center text-3xl font-black text-primary border-primary/20 shadow-2xl">
          {currentIndex + 1}
        </div>
      </div>
      
      <div className="relative py-4">
        <Progress value={progress} className="h-4 bg-secondary rounded-full overflow-hidden border border-white/5 p-1" />
        <div className="absolute top-1/2 left-[calc(progress)] w-3 h-3 bg-primary rounded-full blur-sm" />
      </div>
      
      <Card className="glass-card border-white/10 overflow-hidden rounded-[4rem] shadow-2xl relative group">
        <div className="absolute top-0 left-0 w-2 h-full bg-primary opacity-20 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="p-16 pb-12">
          <CardTitle className="text-3xl md:text-5xl leading-[1.1] font-black font-headline tracking-tighter">{q.questionText}</CardTitle>
        </CardHeader>
        <CardContent className="px-16 space-y-6 pb-16">
          {q.options.map((option, idx) => (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleAnswer(idx)}
              className={cn(
                "w-full flex items-center justify-between p-8 rounded-[2.5rem] border-2 text-right transition-all group/option relative overflow-hidden",
                !isAnswered && "border-white/5 hover:border-primary/50 hover:bg-primary/5 bg-white/5 shadow-xl",
                isAnswered && idx === q.correctAnswerIndex && "border-green-500 bg-green-500/20 text-green-400 scale-[1.02] shadow-[0_0_40px_rgba(34,197,94,0.2)]",
                isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && "border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_40px_rgba(239,68,68,0.2)]",
                isAnswered && idx !== selectedAnswer && idx !== q.correctAnswerIndex && "opacity-20 grayscale scale-[0.98]"
              )}
            >
              <span className="text-xl md:text-2xl font-bold relative z-10">{option}</span>
              <div className={cn(
                "h-10 w-10 rounded-full border-2 flex items-center justify-center relative z-10 shrink-0",
                isAnswered && idx === q.correctAnswerIndex ? "bg-green-500 border-green-500 shadow-lg" : "border-white/10"
              )}>
                {isAnswered && idx === q.correctAnswerIndex && <CheckCircle2 className="h-6 w-6 text-white" />}
                {isAnswered && idx === selectedAnswer && idx !== q.correctAnswerIndex && <XCircle className="h-6 w-6 text-red-500" />}
              </div>
              {!isAnswered && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 -translate-x-full group-hover/option:animate-shimmer" />
              )}
            </button>
          ))}
        </CardContent>
        {isAnswered && (
          <CardFooter className="flex flex-col items-stretch gap-12 p-16 bg-black/40 border-t border-white/5 backdrop-blur-3xl animate-reveal-up">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent font-black text-[10px] uppercase tracking-[0.5em]">
                <Lightbulb className="h-5 w-5" /> {t.analysisLabel}
              </div>
              <p className="text-2xl leading-relaxed text-muted-foreground font-medium italic opacity-90 border-l-4 border-accent/20 pl-8">&quot;{q.explanation}&quot;</p>
            </div>
            <Button onClick={nextQuestion} className="premium-button h-24 w-full rounded-[2.5rem] font-black text-3xl text-black bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all active:scale-[0.98]">
              {currentIndex === questions.length - 1 ? t.btnFinish : t.btnNext}
              {dir === 'rtl' ? <ArrowLeft className="h-8 w-8 mr-6" /> : <ArrowRight className="h-8 w-8 ml-6" />}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

