
'use client';

import { useState } from 'react';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GraduationCap, LogIn, UserPlus } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      initiateEmailSignIn(auth, email, password);
    } else {
      initiateEmailSignUp(auth, email, password);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 flex justify-center items-center min-h-[80vh] animate-fade-in">
      <Card className="w-full max-w-md glass-card border-primary/20">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب أكاديمي'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'مرحباً بك مجدداً في أكاديمية القيادة الحرة' 
              : 'انضم إلينا لتبدأ رحلتك التعليمية الموثقة'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50 border-white/10"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-bold">
              {isLogin ? (
                <span className="flex items-center gap-2"><LogIn className="h-5 w-5" /> دخول</span>
              ) : (
                <span className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> تسجيل</span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-white/5 pt-6">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline text-sm font-bold"
          >
            {isLogin ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب بالفعل؟ سجل دخولك'}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
