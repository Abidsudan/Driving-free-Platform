'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp, initiateGoogleSignIn } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GraduationCap, LogIn, UserPlus, Loader2, ShieldCheck, Zap, Sparkles, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { language } = useLanguage();

  const t = {
    loginTitle: language === 'ar' ? 'تسجيل الدخول' : 'Sign In',
    signupTitle: language === 'ar' ? 'إنشاء حساب' : 'Sign Up',
    welcomeLogin: language === 'ar' ? 'مرحباً بك مجدداً في المنصة التعليمية' : 'Welcome back to the Academic Platform',
    welcomeSignup: language === 'ar' ? 'انضم إلينا لتبدأ رحلتك التعليمية الموثقة' : 'Join us to start your verified learning journey',
    emailLabel: language === 'ar' ? 'البريد الإلكتروني' : 'Email Address',
    passwordLabel: language === 'ar' ? 'كلمة المرور' : 'Password',
    btnActionLogin: language === 'ar' ? 'تسجيل الدخول' : 'Access Dashboard',
    btnActionSignup: language === 'ar' ? 'إنشاء الحساب' : 'Create Account',
    orContinue: language === 'ar' ? 'أو عبر' : 'Or continue with',
    googleSignIn: language === 'ar' ? 'متابعة باستخدام Google' : 'Continue with Google',
    switchSignup: language === 'ar' ? 'ليس لديك حساب؟ سجل الآن' : "Don't have an account? Sign Up",
    switchLogin: language === 'ar' ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Sign In',
    processing: language === 'ar' ? 'جاري المعالجة...' : 'Processing Authentication...'
  };

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isLogin) {
        await initiateEmailSignIn(auth, email, password, language);
      } else {
        await initiateEmailSignUp(auth, email, password, language);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await initiateGoogleSignIn(auth, language);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#020202]">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-0 w-full h-full">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-float" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full animate-float-slow" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="w-full max-w-[500px] relative z-10 space-y-8">
        <div className="text-center space-y-6 animate-reveal-up opacity-0">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              <ShieldCheck className="h-4 w-4" />
              SECURE ACCESS PROTOCOL
           </div>
           <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none smart-gradient-text uppercase">
              {language === 'ar' ? 'المنصة الذكية' : 'Academic Lab'}
           </h1>
        </div>

        <Card className="glass-card border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden rounded-[3rem] animate-reveal-up opacity-0 [animation-delay:0.2s]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary animate-pulse" />
          
          <CardHeader className="text-center space-y-4 pt-16 pb-8 px-12">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <GraduationCap className="h-12 w-12 text-black relative z-10" />
               <Sparkles className="absolute top-2 right-2 h-4 w-4 text-black/40 animate-pulse" />
            </div>
            <CardTitle className="text-4xl font-headline font-black tracking-tight uppercase whitespace-pre-line leading-tight">
              {isLogin ? t.loginTitle : t.signupTitle}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground font-medium opacity-60 leading-relaxed max-w-[320px] mx-auto">
              {isLogin ? t.welcomeLogin : t.welcomeSignup}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-10 px-12 pb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="font-black text-[10px] uppercase tracking-[0.4em] text-muted-foreground ml-2">{t.emailLabel}</Label>
                <div className="relative group">
                   <Input 
                    id="email" 
                    type="email" 
                    placeholder="student@academy.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 h-16 px-6 focus:border-primary focus:ring-0 rounded-2xl transition-all duration-500 font-bold"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary opacity-40">
                     <Activity className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between ml-2">
                   <Label htmlFor="password" className="font-black text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{t.passwordLabel}</Label>
                   {isLogin && <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 cursor-pointer hover:text-primary transition-colors">Recover?</span>}
                </div>
                <div className="relative group">
                   <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-white/5 border-white/10 h-16 px-6 focus:border-primary focus:ring-0 rounded-2xl transition-all duration-500 font-bold"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary opacity-40">
                     <Zap className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-18 text-xs font-black uppercase tracking-[0.4em] rounded-[2rem] bg-primary text-black hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-primary/20 active:scale-95 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-3"><Loader2 className="h-5 w-5 animate-spin" /> {t.processing}</span>
                ) : (
                  <span className="flex items-center gap-4">
                    {isLogin ? <LogIn className="h-5 w-5 group-hover:translate-x-1 transition-transform" /> : <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />}
                    {isLogin ? t.btnActionLogin : t.btnActionSignup}
                  </span>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-white/5" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.5em]">
                <span className="bg-[#0c0c0c] px-6 text-muted-foreground">{t.orContinue}</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-18 border-white/10 hover:bg-white/5 gap-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] glass-card transition-all duration-500"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
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
          
          <CardFooter className="flex justify-center border-t border-white/5 py-12 bg-white/5 backdrop-blur-3xl">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95"
              disabled={isLoading}
            >
              {isLogin ? (
                 <span className="flex items-center gap-3">INITIALIZE NEW MEMBER <Zap className="h-4 w-4" /></span>
              ) : (
                <span className="flex items-center gap-3">RETURN TO TERMINAL <Zap className="h-4 w-4" /></span>
              )}
            </button>
          </CardFooter>
        </Card>

        <p className="text-center text-[9px] font-black text-muted-foreground uppercase tracking-[0.6em] opacity-40 animate-reveal-up opacity-0 [animation-delay:0.4s]">
           Dubai RTA Integrated Learning Environment • v2.0.4
        </p>
      </div>
    </div>
  );
}

