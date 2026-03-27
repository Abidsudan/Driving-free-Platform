"use client"

import { useState, useRef, useEffect, useMemo } from 'react';
import { askDrivingTutor, type TutorOutput } from '@/ai/flows/driving-tutor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sparkles, Send, Bot, User, RefreshCw, Info, ArrowLeft, ArrowRight, Zap, GraduationCap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
  reference?: string;
}

export default function TutorPage() {
  const { language, dir } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = useMemo(() => ({
    title: language === 'ar' ? "المعلم الذكي: مرشدك الأكاديمي" : "AI Tutor: Your Academic Mentor",
    desc: language === 'ar' ? "اسأل عن أي قاعدة مرورية، فيزياء القيادة، أو نصائح لاختبار RTA." : "Ask about any traffic rule, driving physics, or RTA test tips.",
    placeholder: language === 'ar' ? "مثال: متى يجب فحص النقطة العمياء؟" : "Example: When should I check the blind spot?",
    welcome: language === 'ar' ? "مرحباً بك في المختبر الأكاديمي! أنا مرشدك الرقمي المعتمد، كيف يمكنني مساعدتك في رحلتك اليوم؟" : "Welcome to the Academic Lab! I am your certified digital mentor, how can I assist you in your journey today?",
    reference: language === 'ar' ? "المرجع:" : "Reference:",
    error: language === 'ar' ? "عذراً، حدث خطأ أثناء الاتصال بالمعلم الذكي." : "Sorry, an error occurred while connecting to the AI Tutor."
  }), [language]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', content: t.welcome }]);
    }
  }, [language, messages.length, t.welcome]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await askDrivingTutor({
        question: userMessage,
        language: language
      });

      setMessages(prev => [...prev, { 
        role: 'model', 
        content: result.answer,
        reference: result.reference 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl h-[calc(100vh-140px)] flex flex-col space-y-8 animate-reveal-up opacity-0">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 glass-card p-10 rounded-[3rem] border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32" />
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="p-6 rounded-[2rem] bg-primary/10 border border-primary/20 shadow-2xl shadow-primary/20">
            <Bot className="h-12 w-12 text-primary animate-float" />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tight smart-gradient-text">{t.title}</h1>
            <p className="text-lg text-muted-foreground font-medium opacity-60 leading-tight">{t.desc}</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-4 bg-black/40 p-6 rounded-[2rem] border border-white/5 shadow-2xl">
          <div className="text-center px-4">
            <span className="block text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Status</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-xs font-black text-white uppercase tracking-widest">ONLINE</span>
            </div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="text-center px-4">
            <span className="block text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Knowledge</span>
            <span className="text-xs font-black text-accent uppercase tracking-widest">RTA v2.0</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative group">
        <div className="absolute -inset-1 bg-gradient-to-b from-primary/10 to-transparent blur-2xl opacity-20 pointer-events-none" />
        <Card className="flex-1 glass-card border-white/5 flex flex-col overflow-hidden rounded-[4rem] shadow-2xl relative z-10">
          <CardContent 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex items-start gap-8 animate-reveal-up",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "p-5 rounded-2xl shrink-0 shadow-2xl transition-transform hover:scale-110",
                  msg.role === 'user' 
                    ? "bg-primary text-black" 
                    : "bg-accent/20 text-accent border border-accent/20"
                )}>
                  {msg.role === 'user' ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                </div>
                <div className={cn(
                  "relative group/msg",
                  msg.role === 'user' ? "items-end text-right" : "items-start text-left"
                )}>
                  <div className={cn(
                    "p-8 rounded-[3rem] text-lg leading-relaxed font-medium shadow-2xl border transition-all duration-500",
                    msg.role === 'user' 
                      ? "bg-secondary/60 border-primary/20 rounded-tr-none hover:bg-secondary/80" 
                      : "bg-background/80 border-accent/20 rounded-tl-none hover:bg-background/90"
                  )}>
                    {msg.content}
                    {msg.reference && (
                      <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3 text-[10px] font-black text-accent uppercase tracking-[0.4em] opacity-60 group-hover/msg:opacity-100 transition-opacity">
                        <Info className="h-4 w-4 shrink-0" />
                        <span>{t.reference} <span className="text-white">{msg.reference}</span></span>
                      </div>
                    )}
                  </div>
                  <span className="block text-[8px] font-black text-muted-foreground uppercase tracking-[0.5em] mt-3 mx-4 opacity-40 group-hover/msg:opacity-100 transition-opacity">
                    {msg.role === 'user' ? 'Transmission Sent' : 'AI Analysis Generated'}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-8 animate-reveal-up">
                <div className="bg-accent/20 text-accent p-5 rounded-2xl border border-accent/20">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
                <div className="bg-background/80 border border-accent/20 p-8 rounded-[3rem] rounded-tl-none">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-10 bg-black/40 border-t border-white/5 backdrop-blur-3xl">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex w-full gap-6 items-center max-w-5xl mx-auto"
            >
              <div className="relative flex-1 group/input">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2rem] blur group-hover/input:opacity-100 opacity-0 transition-opacity" />
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="relative flex-1 h-20 px-10 rounded-[2rem] bg-background/50 border-white/10 focus:border-primary/50 text-xl font-medium focus:ring-0 placeholder:text-muted-foreground/40"
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                size="icon" 
                className="h-20 w-20 rounded-[2rem] bg-primary text-black hover:bg-primary/90 shadow-2xl shadow-primary/20 group/btn transition-all active:scale-95"
                disabled={isLoading || !input.trim()}
              >
                <Send className={cn("h-8 w-8 transition-transform group-hover/btn:scale-125 group-hover/btn:rotate-12", dir === 'rtl' && "rotate-180")} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
