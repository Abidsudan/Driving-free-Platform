"use client"

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Card } from '@/components/ui/card';
import { Trophy, Clock, Target, LayoutDashboard, Zap, GraduationCap, ShieldCheck, ArrowRight, Search, FileCheck, Star } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { getDailyDrivingTip, type DailyTipOutput } from '@/ai/flows/get-daily-tip';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';
import { GlobalSearch } from '@/components/global-search';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { language, dir } = useLanguage();
  const [dailyTip, setDailyTip] = useState<DailyTipOutput | null>(null);

  const t = {
    loading: language === 'ar' ? "مزامنة البيانات الأكاديمية..." : "Syncing Academic Records...",
    welcome: language === 'ar' ? "مرحباً بك،" : "Welcome,",
    pro: language === 'ar' ? "مدرب أكاديمي معتمد" : "Certified Academic Trainer",
    efficiency: language === 'ar' ? "مؤشر الكفاءة" : "Efficiency Index",
    dailyTip: language === 'ar' ? "نصيحة المعلم الذكي اليومية" : "AI Tutor Daily Insight",
    recent: language === 'ar' ? "السجل الأكاديمي للنتائج" : "Academic Assessment Log",
    noData: language === 'ar' ? "لم يتم رصد أي محاولات تقييم بعد." : "No assessment attempts recorded yet.",
    proofBtn: language === 'ar' ? "إثبات العمل كمدرب (رسمي)" : "Official Trainer Proof Portal",
    searchPlaceholder: language === 'ar' ? "ابحث عن المنهج، القواعد، أو الإشارات في بنك المعلومات..." : "Search Curriculum, Rules, or Signs in the knowledge base..."
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
        <span className="font-black text-muted-foreground uppercase tracking-widest">{t.loading}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-12 text-center space-y-8">
        <div className="inline-flex p-8 rounded-full bg-primary/10 mb-4 shadow-inner">
          <GraduationCap className="h-16 w-16 text-primary" />
        </div>
        <h2 className="text-4xl font-black font-headline">{language === 'ar' ? "يرجى تسجيل الدخول للوصول للوحة التحكم" : "Please Login to Access Dashboard"}</h2>
        <Link href="/auth">
          <Button size="lg" className="h-16 px-12 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">سجل دخولك الآن</Button>
        </Link>
      </div>
    );
  }

  const averageScore = attempts && attempts.length > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions * 100), 0) / attempts.length)
    : 0;

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in pb-32">
      
      {/* Central Academic Search - High Visibility */}
      <div className="max-w-5xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <Card className="relative glass-card p-6 md:p-10 rounded-[3rem] border-primary/30 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-headline">{language === 'ar' ? "محرك البحث الأكاديمي" : "Academic Search Engine"}</h2>
                <p className="text-sm text-muted-foreground font-medium">{language === 'ar' ? "ابحث في 300+ سؤال وقاعدة مرورية معتمدة." : "Search across 300+ approved questions and traffic rules."}</p>
              </div>
            </div>
            <GlobalSearch>
              <div className="w-full text-left cursor-text bg-background/60 border-2 border-white/10 h-20 rounded-[1.5rem] flex items-center px-8 text-muted-foreground font-bold group-hover:border-primary/50 transition-all shadow-inner text-lg">
                {t.searchPlaceholder}
              </div>
            </GlobalSearch>
          </Card>
        </div>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-card/40 p-10 md:p-16 rounded-[4rem] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12">
          <LayoutDashboard className="h-80 w-80" />
        </div>
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
            <Star className="h-4 w-4 fill-current" /> {t.pro}
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-none">
            {t.welcome} <span className="smart-gradient-text">{user.displayName?.split(' ')[0]}</span>
          </h1>
        </div>
        <div className="flex items-center gap-8 glass-card p-8 rounded-[2.5rem] border-accent/30 relative z-10 shadow-2xl">
           <div className="text-center">
              <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{t.efficiency}</span>
              <span className="text-5xl font-black text-accent">{averageScore}%</span>
           </div>
           <div className="h-16 w-px bg-white/10" />
           <Trophy className="h-12 w-12 text-accent animate-float" />
        </div>
      </div>

      {/* Primary Action: Trainer Proof Portal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/verification/trainer" className="md:col-span-2 group">
          <Card className="h-full bg-gradient-to-br from-accent to-accent/80 border-none p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl hover:scale-[1.01] transition-all duration-500">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck className="h-80 w-80" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-10">
              <div className="space-y-6">
                <div className="h-20 w-20 bg-white/20 rounded-3xl flex items-center justify-center text-white shadow-xl">
                  <FileCheck className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter">{t.proofBtn}</h2>
                  <p className="text-white/80 font-bold text-xl mt-4 opacity-90">{language === 'ar' ? 'استخرج الآن مستند اعتمادك كمدرب رقمي رسمي موثق.' : 'Generate your official digital trainer certification document now.'}</p>
                </div>
              </div>
              <Button size="lg" className="bg-white text-accent hover:bg-slate-100 rounded-2xl h-20 px-12 font-black text-xl w-full md:w-auto shadow-2xl active:scale-95 transition-all">
                {language === 'ar' ? 'دخول البوابة الرسمية' : 'Enter Official Portal'} 
                <ArrowRight className={cn("ml-3 h-8 w-8", dir === 'rtl' && "rotate-180")} />
              </Button>
            </div>
          </Card>
        </Link>

        {/* AI Insight Sidebar */}
        <Card className="glass-card border-primary/30 p-10 rounded-[3.5rem] flex flex-col justify-between gap-8 bg-primary/5">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest bg-primary/10 w-fit px-4 py-2 rounded-xl">
              <Zap className="h-5 w-5 fill-current" /> {t.dailyTip}
            </div>
            {dailyTip ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-black leading-tight">{dailyTip.title}</h3>
                <p className="text-muted-foreground text-lg italic leading-relaxed border-l-4 border-primary/20 pl-4">"{dailyTip.content}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-8 bg-white/5 animate-pulse rounded-lg w-3/4" />
                <div className="h-24 bg-white/5 animate-pulse rounded-2xl" />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 pt-6">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground text-[10px] font-black uppercase tracking-tighter">RTA STANDARDS</div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground text-[10px] font-black uppercase tracking-tighter">ACADEMIC GUIDE</div>
          </div>
        </Card>
      </div>

      {/* Assessment Log */}
      <div className="space-y-10">
        <h2 className="text-4xl font-black font-headline flex items-center gap-4 tracking-tighter">
          <Clock className="h-10 w-10 text-primary" /> {t.recent}
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {isAttemptsLoading ? (
            <div className="py-24 text-center text-muted-foreground animate-pulse font-black uppercase tracking-widest">Fetching Academic Records...</div>
          ) : attempts && attempts.length > 0 ? (
            attempts.map((attempt) => (
              <Card key={attempt.id} className="glass-card p-8 border-white/5 hover:border-primary/40 transition-all rounded-[2.5rem] shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-6">
                    <div className={cn("p-5 rounded-2xl shadow-xl", attempt.score / attempt.totalQuestions >= 0.8 ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400")}>
                      <Target className="h-10 w-10" />
                    </div>
                    <div className={dir === 'rtl' ? "text-right" : "text-left"}>
                      <h4 className="font-black text-2xl tracking-tight">{attempt.topic || "تقييم RTA الأكاديمي"}</h4>
                      <p className="text-sm font-bold text-muted-foreground mt-2 opacity-60">
                        {format(new Date(attempt.startTime), 'do MMMM yyyy • HH:mm', { locale: language === 'ar' ? ar : enUS })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="text-center">
                      <span className="block text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">SCORE</span>
                      <span className="text-4xl font-black tracking-tighter">{attempt.score} <span className="text-sm opacity-30">/ {attempt.totalQuestions}</span></span>
                    </div>
                    <div className={cn("px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-lg", attempt.score / attempt.totalQuestions >= 0.8 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-orange-500/20 text-orange-400 border border-orange-500/30")}>
                      {attempt.score / attempt.totalQuestions >= 0.8 ? (language === 'ar' ? 'ناجح' : 'Passed') : (language === 'ar' ? 'تحت المراجعة' : 'In Review')}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-24 glass-card rounded-[4rem] border-dashed border-2 border-white/10 flex flex-col items-center gap-8 shadow-inner">
              <GraduationCap className="h-24 w-24 text-muted-foreground opacity-10" />
              <p className="text-muted-foreground font-black text-2xl max-w-md mx-auto leading-relaxed">{t.noData}</p>
              <Link href="/assessment">
                <Button size="lg" className="h-20 px-16 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/30">ابدأ التقييم الأكاديمي الأول</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
