'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Target, BookOpen, Lightbulb, CheckCircle2, ChevronLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { getDailyDrivingTip, type DailyTipOutput } from '@/ai/flows/get-daily-tip';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const [dailyTip, setDailyTip] = useState<DailyTipOutput | null>(null);

  const attemptsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'users', user.uid, 'quizAttempts'),
      orderBy('startTime', 'desc')
    );
  }, [db, user]);

  const { data: attempts, isLoading: isAttemptsLoading } = useCollection(attemptsQuery);

  useEffect(() => {
    getDailyDrivingTip().then(setDailyTip).catch(console.error);
  }, []);

  if (isUserLoading) {
    return <div className="container mx-auto p-12 text-center text-muted-foreground animate-pulse">جاري تحميل بياناتك الأكاديمية...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-12 text-center space-y-6">
        <div className="inline-flex p-6 rounded-full bg-primary/10 mb-4">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-3xl font-headline font-bold">يجب تسجيل الدخول للوصول إلى لوحة التحكم</h2>
        <p className="text-muted-foreground max-w-md mx-auto">انضم إلينا اليوم لتبدأ في تتبع تقدمك والحصول على تقييمات الذكاء الاصطناعي.</p>
        <Link href="/auth">
          <Button size="lg" className="px-12 h-14 rounded-2xl font-bold">انتقل لصفحة الدخول</Button>
        </Link>
      </div>
    );
  }

  const averageScore = attempts && attempts.length > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions * 100), 0) / attempts.length)
    : 0;

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-black tracking-tighter">
            مرحباً، <span className="text-gradient">{user.displayName || 'أيها السائق المحترف'}</span>
          </h1>
          <p className="text-muted-foreground">أهلاً بك في فضاء التميز الأكاديمي. سجلاتك محدثة وجاهزة.</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-secondary/30 border border-white/5 backdrop-blur-xl">
           <div className="text-right">
              <span className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">معدل النجاح العام</span>
              <span className="text-2xl font-black text-accent">{averageScore}%</span>
           </div>
           <div className="bg-accent/20 p-3 rounded-2xl">
            <Trophy className="h-8 w-8 text-accent" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Tip Card */}
        <Card className="lg:col-span-2 glass-card border-primary/20 overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-tighter mb-2">
              <Lightbulb className="h-4 w-4" /> نصيحة الخبير اليومية (ذكاء اصطناعي)
            </div>
            {dailyTip ? (
              <>
                <CardTitle className="text-2xl font-headline group-hover:text-primary transition-colors">{dailyTip.title}</CardTitle>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold mt-2 uppercase">{dailyTip.category}</div>
              </>
            ) : (
              <div className="h-8 w-48 bg-white/5 animate-pulse rounded-lg" />
            )}
          </CardHeader>
          <CardContent>
            {dailyTip ? (
              <p className="text-muted-foreground leading-relaxed italic">"{dailyTip.content}"</p>
            ) : (
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/5 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-white/5 animate-pulse rounded" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Level Stats */}
        <Card className="glass-card border-accent/20 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="bg-accent/10 p-3 rounded-2xl">
              <Star className="h-6 w-6 text-accent" fill="currentColor" />
            </div>
            <span className="text-xs font-bold text-muted-foreground">المرحلة الحالية</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black font-headline">المستوى 1</h3>
            <p className="text-xs text-muted-foreground">الأساسيات والبيئة المحيطة</p>
          </div>
          <Progress value={25} className="h-2 bg-secondary" />
          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">باقي 3 مراحل للاحتراف</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Records Section */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-headline font-bold flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            سجل التدريب المعرفي
          </h2>
          
          <div className="grid gap-4">
            {isAttemptsLoading ? (
              <div className="text-center py-12 text-muted-foreground">جاري جلب السجلات من الأرشيف...</div>
            ) : attempts && attempts.length > 0 ? (
              attempts.map((attempt) => (
                <Card key={attempt.id} className="bg-card/40 border-white/5 hover:border-primary/20 hover:bg-card/60 transition-all group">
                  <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-5 w-full md:w-auto text-right">
                      <div className={`p-4 rounded-2xl shadow-inner ${attempt.score / attempt.totalQuestions >= 0.8 ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{attempt.topic || 'اختبار تقييم عام'}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(attempt.startTime), 'do MMMM yyyy • HH:mm', { locale: ar })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <div className="text-center">
                        <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">النتيجة</span>
                        <span className="text-2xl font-black tabular-nums">{attempt.score} <span className="text-sm font-medium text-muted-foreground">/ {attempt.totalQuestions}</span></span>
                      </div>
                      <div className="text-center">
                        <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">الحالة</span>
                        <span className={`text-sm font-black flex items-center gap-1 ${attempt.score / attempt.totalQuestions >= 0.8 ? 'text-green-400' : 'text-orange-400'}`}>
                          {attempt.score / attempt.totalQuestions >= 0.8 ? (
                            <><CheckCircle2 className="h-4 w-4" /> ناجح</>
                          ) : (
                            <><Target className="h-4 w-4" /> مراجعة</>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-20 bg-secondary/10 rounded-[3rem] border border-dashed border-white/10 space-y-6">
                <div className="bg-primary/5 p-6 rounded-full inline-block">
                  <Target className="h-12 w-12 text-primary/40" />
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-medium">لا توجد سجلات أكاديمية حالياً. ابدأ أول خطوة لك!</p>
                  <Link href="/assessment">
                    <Button variant="link" className="text-primary font-bold gap-2">
                      خوض التقييم الأول <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Suggestions */}
        <div className="space-y-8">
          <h2 className="text-2xl font-headline font-bold flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-xl">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            خطواتك التالية
          </h2>
          
          <div className="grid gap-6">
            {[
              { title: "أكمل المرحلة الأولى", desc: "دراسة فيزياء المركبة وكيفية الفحص قبل الرحلة.", icon: CheckCircle2, status: "suggested" },
              { title: "دراسة إشارات المرور", desc: "تحدي الـ 150 إشارة مرورية المعتمدة في دبي.", icon: Lightbulb, status: "new" },
              { title: "اختبار الـ RTA النظري", desc: "محاكاة شاملة لـ 40 سؤال في ظروف زمنية واقعية.", icon: Trophy, status: "locked" },
            ].map((step, i) => (
              <div key={i} className="relative p-6 rounded-[2rem] bg-card/40 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {step.status === "suggested" && (
                  <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-primary text-[8px] font-black text-white uppercase tracking-tighter shadow-lg shadow-primary/20">
                    موصى به
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
