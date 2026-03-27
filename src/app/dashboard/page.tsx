"use client"

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Target, BookOpen, Lightbulb, CheckCircle2, Star, ChevronRight, LayoutDashboard, Zap, GraduationCap, ShieldCheck, ClipboardCheck, ArrowUpRight, Activity, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { getDailyDrivingTip, type DailyTipOutput } from '@/ai/flows/get-daily-tip';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { language, dir } = useLanguage();
  const [dailyTip, setDailyTip] = useState<DailyTipOutput | null>(null);

  const t = {
    loading: language === 'ar' ? "مزامنة البيانات الذكية..." : "Syncing Smart Data...",
    welcome: language === 'ar' ? "أهلاً بك،" : "Welcome,",
    pro: language === 'ar' ? "السائق الأكاديمي" : "Academic Driver",
    success: language === 'ar' ? "مؤشر الكفاءة" : "Efficiency Index",
    dailyTip: language === 'ar' ? "نصيحة الذكاء الاصطناعي اليومية" : "Daily AI Insight",
    level: language === 'ar' ? "المرحلة الحالية" : "Current Phase",
    levelTitle: language === 'ar' ? "المرحلة 1: الأساسيات" : "Phase 1: Foundations",
    recent: language === 'ar' ? "السجل الأكاديمي الأخير" : "Recent Academic Log",
    noData: language === 'ar' ? "لا توجد بيانات حالياً. ابدأ تقييمك الأول." : "No data found. Start your first assessment.",
    btnStart: language === 'ar' ? "ابدأ التقييم" : "Start Assessment",
    nextStep: language === 'ar' ? "توصيات ذكية" : "Smart Recommendations"
  }

  const attemptsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'users', user.uid, 'quizAttempts'),
      orderBy('startTime', 'desc'),
      limit(5)
    );
  }, [db, user]);

  const { data: attempts, isLoading: isAttemptsLoading } = useCollection(attemptsQuery);

  useEffect(() => {
    getDailyDrivingTip(language).then(setDailyTip).catch(() => {});
  }, [language]);

  if (isUserLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 animate-pulse">
        <div className="relative">
          <Zap className="h-16 w-16 text-primary animate-bounce" />
          <div className="absolute inset-0 bg-primary blur-3xl opacity-20" />
        </div>
        <span className="font-black text-xl smart-gradient-text tracking-widest uppercase">{t.loading}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-12">
        <div className="relative inline-flex p-12 rounded-[3.5rem] bg-primary/5 mb-4 animate-float border border-primary/10">
          <GraduationCap className="h-24 w-24 text-primary" />
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
        </div>
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-6xl font-black font-headline tracking-tighter">{language === 'ar' ? "تتطلب الوصول الأكاديمي" : "Access Denied"}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">{language === 'ar' ? "يرجى تسجيل الدخول لتتمكن من تتبع تقدمك والحصول على التحليلات الذكية." : "Please login to track your progress and get smart insights."}</p>
        </div>
        <Link href="/auth">
          <Button size="lg" className="premium-button h-20 px-16 bg-primary text-black hover:bg-primary/90 shadow-2xl shadow-primary/30">
            {language === 'ar' ? "سجل دخولك الآن" : "Login to Access"}
          </Button>
        </Link>
      </div>
    );
  }

  const averageScore = attempts && attempts.length > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions * 100), 0) / attempts.length)
    : 0;

  return (
    <div className="container mx-auto px-6 py-16 space-y-20">
      {/* Smart Header Section */}
      <div className="relative group animate-reveal-up">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[4rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        <div className="relative flex flex-col md:flex-row justify-between items-stretch gap-12 glass-card p-12 rounded-[4rem] border-primary/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -mr-48 -mt-48" />
          
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
              <Activity className="h-4 w-4 animate-pulse" />
              {t.pro}
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tight leading-none">
                {t.welcome} <span className="smart-gradient-text tracking-tighter">{user.displayName?.split(' ')[0] || "User"}</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium opacity-60">Ready for your academic session today?</p>
            </div>
          </div>

          <div className="flex items-center gap-10 glass-card p-10 rounded-[3rem] border-white/10 shadow-2xl shadow-black relative z-10 bg-black/40">
             <div className="text-center space-y-2">
                <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-1">{t.success}</span>
                <span className="text-6xl font-black smart-gradient-text tracking-tighter">{averageScore}%</span>
             </div>
             <div className="h-20 w-px bg-white/10" />
             <div className="bg-primary/20 p-6 rounded-[2rem] shadow-xl shadow-primary/20 animate-glow border border-primary/30">
                <Trophy className="h-10 w-10 text-primary" />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* AI Insight Card */}
        <Card className="lg:col-span-2 glass-card border-primary/20 p-12 overflow-hidden relative group animate-reveal-up delay-200">
          <div className="absolute top-0 left-0 w-3 h-full bg-primary shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
          <CardHeader className="p-0 mb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
                <div className="p-3 bg-primary/20 rounded-2xl">
                  <Zap className="h-5 w-5 fill-primary" />
                </div>
                {t.dailyTip}
              </div>
              <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            </div>
            {dailyTip && <CardTitle className="text-4xl font-black font-headline mt-8 leading-[1.1]">{dailyTip.title}</CardTitle>}
          </CardHeader>
          <CardContent className="p-0">
            {dailyTip ? (
              <div className="space-y-10">
                <p className="text-muted-foreground leading-relaxed text-2xl font-medium italic opacity-90">&quot;{dailyTip.content}&quot;</p>
                <div className="flex items-center gap-6">
                  <div className="inline-block px-6 py-3 rounded-2xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.5em] border border-primary/20">
                    {dailyTip.category}
                  </div>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="h-12 w-3/4 bg-white/5 animate-pulse rounded-2xl" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phase Progress */}
        <Card className="glass-card border-accent/20 p-12 flex flex-col justify-between group animate-reveal-up delay-400">
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="bg-accent/10 p-5 rounded-[2rem] group-hover:bg-accent group-hover:text-black transition-all border border-accent/20 shadow-xl">
                <Star className="h-8 w-8 text-accent group-hover:text-black fill-current" />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">{t.level}</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black font-headline tracking-tighter">{t.levelTitle}</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed opacity-60">
                {language === 'ar' ? 'أساسيات فيزياء المركبة والبيئة المحيطة والتحكم الذكي.' : 'Vehicle physics, surrounding environment, and smart control fundamentals.'}
              </p>
            </div>
          </div>
          <div className="space-y-6 pt-12">
            <div className="flex items-end justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Progress</span>
              <span className="text-2xl font-black text-white">25%</span>
            </div>
            <div className="h-4 w-full bg-secondary rounded-full overflow-hidden border border-white/5 p-1">
              <div className="h-full w-1/4 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2 space-y-12 animate-reveal-up delay-500">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-black font-headline flex items-center gap-6">
              <div className="p-4 bg-primary/10 rounded-[1.5rem] border border-primary/20">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              {t.recent}
            </h2>
            <Link href="/assessment" className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              View All <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-6">
            {isAttemptsLoading ? (
              <div className="text-center py-32 text-muted-foreground font-black uppercase tracking-[0.5em] animate-pulse">Syncing Logs...</div>
            ) : attempts && attempts.length > 0 ? (
              attempts.map((attempt) => (
                <Card key={attempt.id} className="glass-card p-10 border-white/5 hover:border-primary/40 transition-all group overflow-hidden relative">
                   <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
                    <div className="flex items-center gap-8">
                      <div className={cn(
                        "p-6 rounded-[2rem] shadow-2xl transition-all duration-500 group-hover:scale-110",
                        attempt.score / attempt.totalQuestions >= 0.8 
                          ? "bg-green-500/20 text-green-400 border border-green-500/20 shadow-green-500/10" 
                          : "bg-orange-500/20 text-orange-400 border border-orange-500/20 shadow-orange-500/10"
                      )}>
                        <Trophy className="h-8 w-8" />
                      </div>
                      <div className={dir === 'rtl' ? "text-right" : "text-left"}>
                        <h4 className="font-black text-2xl tracking-tight group-hover:text-primary transition-colors">{attempt.topic || "Smart RTA Evaluation"}</h4>
                        <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-2 opacity-60">
                          {format(new Date(attempt.startTime), 'do MMM yyyy • HH:mm', { locale: language === 'ar' ? ar : enUS })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-16">
                      <div className="text-center">
                        <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] mb-2 opacity-40">{language === 'ar' ? 'النتيجة' : 'SCORE'}</span>
                        <span className="text-4xl font-black tracking-tighter">
                          {attempt.score} <span className="text-lg text-muted-foreground/40 font-bold">/ {attempt.totalQuestions}</span>
                        </span>
                      </div>
                      <div className={cn(
                        "px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] shadow-xl",
                        attempt.score / attempt.totalQuestions >= 0.8 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      )}>
                        {attempt.score / attempt.totalQuestions >= 0.8 ? (language === 'ar' ? 'ناجح' : 'Passed') : (language === 'ar' ? 'مراجعة' : 'Review')}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-32 glass-card rounded-[4rem] border-dashed border-white/10 space-y-10 relative overflow-hidden">
                <Target className="h-24 w-24 text-primary/20 mx-auto animate-float" />
                <p className="text-muted-foreground font-black text-xl uppercase tracking-[0.3em]">{t.noData}</p>
                <Link href="/assessment">
                  <Button className="premium-button h-16 px-12 bg-primary text-black hover:bg-primary/90 shadow-2xl relative z-10">{t.btnStart}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-12 animate-reveal-up opacity-0 [animation-delay:0.8s]">
          <h2 className="text-4xl font-black font-headline flex items-center gap-6">
            <div className="p-4 bg-accent/10 rounded-[1.5rem] border border-accent/20">
              <Lightbulb className="h-8 w-8 text-accent" />
            </div>
            {t.nextStep}
          </h2>
          
          <div className="space-y-8">
            {[
              { title: language === 'ar' ? "أكمل أساسيات الفيزياء" : "Finish Physics Basics", icon: Zap, category: "HIGH PRIORITY", status: "top" },
              { title: language === 'ar' ? "دراسة إشارات المنع" : "Study Prohibitory Signs", icon: ShieldCheck, category: "NEW CONTENT", status: "new" },
              { title: language === 'ar' ? "اختبار المحاكاة الكامل" : "Simulation Final", icon: ClipboardCheck, category: "LOCKED", status: "locked" }
            ].map((step, i) => (
              <div key={i} className="glass-card p-8 rounded-[3rem] hover:border-primary/50 cursor-pointer relative group transition-all duration-700 hover:-translate-y-2">
                <div className="flex items-center gap-6 relative z-10">
                  <div className="p-5 rounded-2xl bg-secondary border border-white/5 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-xl">
                    <step.icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.5em] opacity-80">{step.category}</span>
                    <h4 className="font-black text-xl tracking-tight leading-none group-hover:text-white transition-colors">{step.title}</h4>
                  </div>
                </div>
                {step.status === "top" && (
                  <div className="absolute -top-4 right-10 bg-accent text-[9px] font-black text-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-xl shadow-accent/20">
                    ESSENTIAL
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}