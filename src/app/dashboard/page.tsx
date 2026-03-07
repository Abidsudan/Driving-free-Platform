"use client"

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Target, Lightbulb, Star, LayoutDashboard, Zap, GraduationCap, ShieldCheck, ArrowRight, Search, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { getDailyDrivingTip, type DailyTipOutput } from '@/ai/flows/get-daily-tip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';
import { GlobalSearch } from '@/components/global-search';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { language, dir } = useLanguage();
  const [dailyTip, setDailyTip] = useState<DailyTipOutput | null>(null);

  const t = {
    loading: language === 'ar' ? "مزامنة البيانات..." : "Syncing Data...",
    welcome: language === 'ar' ? "أهلاً بك،" : "Welcome,",
    pro: language === 'ar' ? "السائق الأكاديمي" : "Academic Driver",
    efficiency: language === 'ar' ? "مؤشر الكفاءة" : "Efficiency Index",
    dailyTip: language === 'ar' ? "نصيحة الذكاء الاصطناعي" : "Daily AI Tip",
    level: language === 'ar' ? "المرحلة الحالية" : "Current Phase",
    recent: language === 'ar' ? "السجل الأكاديمي" : "Recent Log",
    noData: language === 'ar' ? "ابدأ تقييمك الأول الآن." : "Start your first assessment.",
    btnStart: language === 'ar' ? "ابدأ التقييم" : "Start Quiz",
    proofBtn: language === 'ar' ? "إثبات العمل كمدرب (رسمي)" : "Official Trainer Proof Portal",
    searchPlaceholder: language === 'ar' ? "ابحث عن المنهج، القواعد، أو الإشارات..." : "Search Curriculum, Rules, or Signs..."
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Zap className="h-12 w-12 text-primary animate-pulse" />
        <span className="font-black text-muted-foreground">{t.loading}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-12 text-center space-y-8">
        <div className="inline-flex p-8 rounded-full bg-primary/10 mb-4">
          <GraduationCap className="h-16 w-16 text-primary" />
        </div>
        <h2 className="text-4xl font-black">{language === 'ar' ? "يرجى تسجيل الدخول" : "Please Login"}</h2>
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
      
      {/* Dynamic Search Bar - High Prominence */}
      <div className="max-w-5xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative glass-card p-4 md:p-6 rounded-[2.5rem] border-primary/20 flex flex-col md:flex-row items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-2xl shrink-0">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 w-full">
              <GlobalSearch>
                <div className="w-full text-left cursor-text bg-background/50 border border-white/10 h-16 rounded-2xl flex items-center px-6 text-muted-foreground font-bold group-hover:border-primary/50 transition-all">
                  {t.searchPlaceholder}
                </div>
              </GlobalSearch>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-card/40 p-8 md:p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12">
          <LayoutDashboard className="h-64 w-64" />
        </div>
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest">
            <Star className="h-4 w-4 fill-current" /> {t.pro}
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter">
            {t.welcome} <span className="smart-gradient-text">{user.displayName?.split(' ')[0]}</span>
          </h1>
        </div>
        <div className="flex items-center gap-6 glass-card p-6 rounded-3xl border-accent/20 relative z-10">
           <div className="text-center">
              <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t.efficiency}</span>
              <span className="text-4xl font-black text-accent">{averageScore}%</span>
           </div>
           <div className="h-12 w-px bg-white/10" />
           <Trophy className="h-10 w-10 text-accent animate-bounce" />
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Proof Portal */}
        <Link href="/verification/trainer" className="group">
          <Card className="h-full bg-gradient-to-br from-accent to-accent/80 border-none p-10 rounded-[3rem] relative overflow-hidden shadow-2xl hover:scale-[1.02] transition-all">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-64 w-64" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                  <FileCheck className="h-8 w-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">{t.proofBtn}</h2>
                <p className="text-white/80 font-bold text-lg">{language === 'ar' ? 'استخرج شهادة اعتمادك الرسمية الآن.' : 'Get your official certification now.'}</p>
              </div>
              <Button size="lg" className="bg-white text-accent hover:bg-white/90 rounded-2xl h-16 font-black text-lg w-full md:w-auto">
                {language === 'ar' ? 'دخول البوابة' : 'Enter Portal'} <ArrowRight className={cn("ml-2 h-6 w-6", dir === 'rtl' && "rotate-180")} />
              </Button>
            </div>
          </Card>
        </Link>

        {/* AI Tip Card */}
        <Card className="glass-card border-primary/20 p-10 rounded-[3rem] flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest">
              <Zap className="h-5 w-5 fill-current" /> {t.dailyTip}
            </div>
            {dailyTip ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-black">{dailyTip.title}</h3>
                <p className="text-muted-foreground text-lg italic leading-relaxed">"{dailyTip.content}"</p>
              </div>
            ) : (
              <div className="h-24 bg-white/5 animate-pulse rounded-2xl" />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase">RTA STANDARDS</div>
            <div className="px-4 py-2 rounded-xl bg-accent/10 text-accent text-[10px] font-black uppercase">ACADEMIC GUIDE</div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="space-y-8">
        <h2 className="text-3xl font-black font-headline flex items-center gap-4">
          <Clock className="h-8 w-8 text-primary" /> {t.recent}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {isAttemptsLoading ? (
            <div className="py-20 text-center text-muted-foreground animate-pulse">جاري جلب السجلات الأكاديمية...</div>
          ) : attempts && attempts.length > 0 ? (
            attempts.map((attempt) => (
              <Card key={attempt.id} className="glass-card p-6 border-white/5 hover:border-primary/30 transition-all rounded-3xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-5">
                    <div className={cn("p-4 rounded-2xl", attempt.score / attempt.totalQuestions >= 0.8 ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400")}>
                      <Target className="h-8 w-8" />
                    </div>
                    <div className={dir === 'rtl' ? "text-right" : "text-left"}>
                      <h4 className="font-black text-xl">{attempt.topic || "تقييم RTA"}</h4>
                      <p className="text-xs font-bold text-muted-foreground mt-1">
                        {format(new Date(attempt.startTime), 'do MMMM yyyy • HH:mm', { locale: language === 'ar' ? ar : enUS })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <span className="block text-[10px] font-black text-muted-foreground uppercase mb-1">النتيجة</span>
                      <span className="text-3xl font-black">{attempt.score} <span className="text-sm opacity-40">/ {attempt.totalQuestions}</span></span>
                    </div>
                    <div className={cn("px-6 py-2 rounded-2xl text-xs font-black uppercase", attempt.score / attempt.totalQuestions >= 0.8 ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400")}>
                      {attempt.score / attempt.totalQuestions >= 0.8 ? (language === 'ar' ? 'ناجح' : 'Passed') : (language === 'ar' ? 'مراجعة' : 'Review')}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 glass-card rounded-[3rem] border-dashed border-2 flex flex-col items-center gap-6">
              <GraduationCap className="h-20 w-20 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground font-black text-xl">{t.noData}</p>
              <Link href="/assessment">
                <Button className="h-16 px-12 rounded-2xl font-black text-lg">ابدأ التقييم الأول</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
