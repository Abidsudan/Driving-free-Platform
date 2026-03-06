"use client"

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Target, BookOpen, Lightbulb, CheckCircle2, Star, ChevronRight, LayoutDashboard, Zap, FileCheck, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
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
    nextStep: language === 'ar' ? "توصيات ذكية" : "Smart Recommendations",
    proofBtn: language === 'ar' ? "إثبات العمل كمدرب (رسمي)" : "Official Trainer Proof Portal"
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-pulse">
        <Zap className="h-12 w-12 text-primary animate-bounce" />
        <span className="font-black text-muted-foreground">{t.loading}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-12 text-center space-y-8">
        <div className="inline-flex p-8 rounded-full bg-primary/10 mb-4 animate-float">
          <GraduationCap className="h-16 w-16 text-primary" />
        </div>
        <h2 className="text-4xl font-black font-headline">{language === 'ar' ? "تتطلب الوصول الأكاديمي" : "Access Denied"}</h2>
        <p className="text-muted-foreground max-w-md mx-auto">{language === 'ar' ? "يرجى تسجيل الدخول لتتمكن من تتبع تقدمك والحصول على التحليلات الذكية." : "Please login to track your progress and get smart insights."}</p>
        <Link href="/auth">
          <Button size="lg" className="h-16 px-12 rounded-2xl font-black text-lg">سجل دخولك الآن</Button>
        </Link>
      </div>
    );
  }

  const averageScore = attempts && attempts.length > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions * 100), 0) / attempts.length)
    : 0;

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in pb-32">
      {/* Proof Banner - High Priority */}
      <div className="relative group overflow-hidden rounded-[3rem] p-8 md:p-12 bg-gradient-to-br from-accent via-accent/80 to-primary/40 shadow-[0_32px_64px_-16px_rgba(245,158,11,0.5)] border border-white/20">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
          <ShieldCheck className="h-64 w-64 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest">
              <Star className="h-3 w-3 fill-current" /> {language === 'ar' ? 'اعتماد مدرب رسمي' : 'Official Trainer Credentials'}
            </div>
            <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white leading-tight">
              {language === 'ar' ? 'هل تحتاج إلى إثبات عملك؟' : 'Need Employment Proof?'}
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-bold max-w-xl">
              {language === 'ar' ? 'استخرج شهادة اعتمادك الرقمية الموثقة بصفة مدرب أكاديمي في دبي الآن.' : 'Generate your official digital certification as an academic trainer in Dubai instantly.'}
            </p>
          </div>
          <Link href="/verification/trainer" className="w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto h-20 px-12 rounded-[2rem] bg-white text-accent hover:bg-white/90 font-black text-xl md:text-2xl shadow-2xl active:scale-95 transition-all group">
              {t.proofBtn}
              {dir === 'rtl' ? <ArrowRight className="mr-4 h-8 w-8 rotate-180 group-hover:-translate-x-2 transition-transform" /> : <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-2 transition-transform" />}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Stats Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-card/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/5 shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest">
            <LayoutDashboard className="h-4 w-4" /> {t.pro}
          </div>
          <h1 className="text-5xl font-black font-headline tracking-tighter">
            {t.welcome} <span className="smart-gradient-text">{user.displayName?.split(' ')[0] || "User"}</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 glass-card p-6 rounded-3xl border-accent/20">
           <div className="text-center">
              <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t.success}</span>
              <span className="text-3xl font-black text-accent">{averageScore}%</span>
           </div>
           <div className="h-12 w-px bg-white/10" />
           <div className="bg-accent/20 p-4 rounded-2xl">
            <Trophy className="h-8 w-8 text-accent animate-float" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Insight Card */}
        <Card className="lg:col-span-2 glass-card border-primary/20 p-8 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
          <CardHeader className="p-0 mb-6">
            <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-tighter">
              <Zap className="h-4 w-4" /> {t.dailyTip}
            </div>
            {dailyTip && <CardTitle className="text-2xl font-black font-headline mt-4">{dailyTip.title}</CardTitle>}
          </CardHeader>
          <CardContent className="p-0">
            {dailyTip ? (
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg italic">"{dailyTip.content}"</p>
                <div className="inline-block px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                  {dailyTip.category}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-white/5 animate-pulse rounded-lg" />
                <div className="h-20 w-full bg-white/5 animate-pulse rounded-lg" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phase Progress */}
        <Card className="glass-card border-accent/20 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="bg-accent/10 p-3 rounded-2xl">
                <Star className="h-6 w-6 text-accent fill-accent" />
              </div>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.level}</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black font-headline">{t.levelTitle}</h3>
              <p className="text-xs text-muted-foreground">{language === 'ar' ? 'أساسيات فيزياء المركبة والبيئة المحيطة' : 'Vehicle Physics and Environment Foundations'}</p>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <Progress value={25} className="h-3 bg-secondary" />
            <p className="text-[10px] text-center text-muted-foreground font-black uppercase tracking-widest">باقي 3 مراحل للاحتراف الكامل</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-black font-headline flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            {t.recent}
          </h2>
          
          <div className="space-y-4">
            {isAttemptsLoading ? (
              <div className="text-center py-20 text-muted-foreground animate-pulse">جاري تحديث السجلات...</div>
            ) : attempts && attempts.length > 0 ? (
              attempts.map((attempt) => (
                <Card key={attempt.id} className="glass-card p-6 border-white/5 hover:border-primary/40 transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "p-4 rounded-2xl",
                        attempt.score / attempt.totalQuestions >= 0.8 ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"
                      )}>
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div className={dir === 'rtl' ? "text-right" : "text-left"}>
                        <h4 className="font-black text-lg">{attempt.topic || "تقييم RTA الذكي"}</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                          {format(new Date(attempt.startTime), 'do MMM yyyy • HH:mm', { locale: language === 'ar' ? ar : enUS })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="text-center">
                        <span className="block text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">النتيجة</span>
                        <span className="text-2xl font-black">{attempt.score} <span className="text-xs text-muted-foreground">/ {attempt.totalQuestions}</span></span>
                      </div>
                      <div className={cn(
                        "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest",
                        attempt.score / attempt.totalQuestions >= 0.8 ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"
                      )}>
                        {attempt.score / attempt.totalQuestions >= 0.8 ? (language === 'ar' ? 'ناجح' : 'Passed') : (language === 'ar' ? 'مراجعة' : 'Review')}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-20 glass-card rounded-[3rem] border-dashed space-y-6">
                <Target className="h-16 w-16 text-primary/20 mx-auto" />
                <p className="text-muted-foreground font-bold">{t.noData}</p>
                <Link href="/assessment">
                  <Button className="rounded-2xl h-14 px-8 font-black">{t.btnStart}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Recommendations */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black font-headline flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-2xl">
              <Lightbulb className="h-6 w-6 text-accent" />
            </div>
            {t.nextStep}
          </h2>
          
          <div className="space-y-6">
            {[
              { title: "أكمل أساسيات الفيزياء", icon: Zap, status: "top" },
              { title: "دراسة إشارات المنع", icon: ShieldCheck, status: "new" },
              { title: "اختبار المحاكاة الكامل", icon: FileCheck, status: "locked" }
            ].map((step, i) => (
              <div key={i} className="glass-card p-6 rounded-[2.5rem] hover:border-primary/50 cursor-pointer relative group">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary transition-colors">
                    <step.icon className="h-5 w-5 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm">{step.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">توصية الذكاء الاصطناعي</p>
                  </div>
                </div>
                {step.status === "top" && (
                  <div className="absolute -top-3 right-6 bg-accent text-[8px] font-black text-accent-foreground px-3 py-1 rounded-full uppercase tracking-widest">
                    موصى به بشدة
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
