
'use client';

import { useState } from 'react';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp, initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GraduationCap, LogIn, UserPlus } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/components/language-provider';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { language } = useLanguage();

  const t = {
    loginTitle: language === 'ar' ? 'تسجيل الدخول' : 'Sign In',
    signupTitle: language === 'ar' ? 'إنشاء حساب' : 'Sign Up',
    welcomeLogin: language === 'ar' ? 'مرحباً بك مجدداً في Driving Free' : 'Welcome back to Driving Free',
    welcomeSignup: language === 'ar' ? 'انضم إلينا لتبدأ رحلتك التعليمية الموثقة' : 'Join us to start your verified learning journey',
    emailLabel: language === 'ar' ? 'البريد الإلكتروني' : 'Email Address',
    passwordLabel: language === 'ar' ? 'كلمة المرور' : 'Password',
    btnActionLogin: language === 'ar' ? 'دخول' : 'Login',
    btnActionSignup: language === 'ar' ? 'تسجيل' : 'Sign Up',
    orContinue: language === 'ar' ? 'أو عبر' : 'Or continue with',
    googleSignIn: language === 'ar' ? 'متابعة باستخدام Google' : 'Continue with Google',
    switchSignup: language === 'ar' ? 'ليس لديك حساب؟ سجل الآن' : "Don't have an account? Sign Up",
    switchLogin: language === 'ar' ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Sign In'
  };

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

  const handleGoogleSignIn = () => {
    initiateGoogleSignIn(auth);
  };

  return (
    <div className="container mx-auto px-6 py-20 flex justify-center items-center min-h-[80vh] animate-fade-in">
      <Card className="w-full max-w-md glass-card border-primary/20">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">
            {isLogin ? t.loginTitle : t.signupTitle}
          </CardTitle>
          <CardDescription>
            {isLogin ? t.welcomeLogin : t.welcomeSignup}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.emailLabel}</Label>
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
              <Label htmlFor="password">{t.passwordLabel}</Label>
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
                <span className="flex items-center gap-2"><LogIn className="h-5 w-5" /> {t.btnActionLogin}</span>
              ) : (
                <span className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> {t.btnActionSignup}</span>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">{t.orContinue}</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={handleGoogleSignIn}
            className="w-full h-12 border-white/10 hover:bg-white/5 gap-3"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t.googleSignIn}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-white/5 pt-6">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline text-sm font-bold"
          >
            {isLogin ? t.switchSignup : t.switchLogin}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
