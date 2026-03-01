
'use client';

import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, Target, ArrowRight, User, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  const attemptsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'users', user.uid, 'quizAttempts'),
      orderBy('startTime', 'desc')
    );
  }, [db, user]);

  const { data: attempts, isLoading: isAttemptsLoading } = useCollection(attemptsQuery);

  if (isUserLoading) {
    return <div className="container mx-auto p-12 text-center">جاري تحميل بياناتك...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-12 text-center space-y-6">
        <h2 className="text-2xl font-bold">يجب تسجيل الدخول للوصول إلى لوحة التحكم</h2>
        <Link href="/auth">
          <button className="px-8 py-3 bg-primary rounded-xl font-bold">انتقل لصفحة الدخول</button>
        </Link>
      </div>
    );
  }

  const averageScore = attempts && attempts.length > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions * 100), 0) / attempts.length)
    : 0;

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-black tracking-tighter">
            مرحباً، <span className="text-gradient">{user.displayName || 'أيها السائق المحترف'}</span>
          </h1>
          <p className="text-muted-foreground">تابع تقدمك الأكاديمي وسجل إنجازاتك في القيادة.</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-white/5">
           <div className="text-right">
              <span className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">معدل النجاح العام</span>
              <span className="text-2xl font-black text-accent">{averageScore}%</span>
           </div>
           <Trophy className="h-10 w-10 text-accent" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="glass-card border-primary/20 p-6 space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <Target className="h-6 w-6" />
            <h3 className="font-bold">الاختبارات المنجزة</h3>
          </div>
          <div className="text-5xl font-black">{attempts?.length || 0}</div>
          <p className="text-xs text-muted-foreground">سجل حافل بالتطوير الذاتي</p>
        </Card>

        <Card className="glass-card border-accent/20 p-6 space-y-4">
          <div className="flex items-center gap-3 text-accent">
            <BookOpen className="h-6 w-6" />
            <h3 className="font-bold">المرحلة الأكاديمية</h3>
          </div>
          <div className="text-3xl font-black">المستوى 1</div>
          <Progress value={25} className="h-2" />
          <p className="text-xs text-muted-foreground">أكمل المنهج لتصل للمستوى الاحترافي</p>
        </Card>

        <Card className="glass-card border-purple-500/20 p-6 space-y-4">
          <div className="flex items-center gap-3 text-purple-400">
            <Clock className="h-6 w-6" />
            <h3 className="font-bold">وقت التعلم</h3>
          </div>
          <div className="text-3xl font-black">نشط الآن</div>
          <p className="text-xs text-muted-foreground">مواظبة متميزة على اكتساب المهارات</p>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" /> سجل التدريب والاختبارات
        </h2>
        
        <div className="grid gap-4">
          {isAttemptsLoading ? (
            <div className="text-center py-12">جاري جلب السجلات...</div>
          ) : attempts && attempts.length > 0 ? (
            attempts.map((attempt) => (
              <Card key={attempt.id} className="bg-card/40 border-white/5 hover:bg-card/60 transition-all">
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${attempt.score / attempt.totalQuestions >= 0.8 ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      <Trophy className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold">{attempt.topic || 'اختبار تقييم عام'}</h4>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(attempt.startTime), 'do MMMM yyyy HH:mm', { locale: ar })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <span className="block text-xs font-bold text-muted-foreground uppercase">النتيجة</span>
                      <span className="text-xl font-black">{attempt.score} / {attempt.totalQuestions}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-xs font-bold text-muted-foreground uppercase">الحالة</span>
                      <span className={`text-sm font-bold ${attempt.score / attempt.totalQuestions >= 0.8 ? 'text-green-400' : 'text-orange-400'}`}>
                        {attempt.score / attempt.totalQuestions >= 0.8 ? 'ناجح' : 'يحتاج مراجعة'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground">لا توجد سجلات بعد. ابدأ أول اختبار لك الآن!</p>
              <Link href="/assessment">
                <Button variant="outline" className="mt-4">خوض التقييم</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
