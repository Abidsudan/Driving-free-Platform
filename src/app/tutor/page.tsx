'use client';

import { useState, useRef, useEffect } from 'react';
import { askDrivingTutor, type TutorOutput } from '@/ai/flows/driving-tutor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sparkles, Send, Bot, User, RefreshCw, Info, ArrowLeft, ArrowRight } from 'lucide-react';
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

  const t = {
    title: language === 'ar' ? "المعلم الذكي: معلمك الخاص" : "AI Tutor: Your Personal Mentor",
    desc: language === 'ar' ? "اسأل عن أي قاعدة مرورية، فيزياء القيادة، أو نصائح لاختبار RTA." : "Ask about any traffic rule, driving physics, or RTA test tips.",
    placeholder: language === 'ar' ? "مثال: متى يجب فحص النقطة العمياء؟" : "Example: When should I check the blind spot?",
    welcome: language === 'ar' ? "مرحباً بك! أنا معلمك الذكي، كيف يمكنني مساعدتك في رحلتك الأكاديمية اليوم؟" : "Welcome! I am your AI Tutor, how can I assist you in your academic journey today?",
    reference: language === 'ar' ? "المرجع:" : "Reference:",
    error: language === 'ar' ? "عذراً، حدث خطأ أثناء الاتصال بالمعلم الذكي." : "Sorry, an error occurred while connecting to the AI Tutor."
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', content: t.welcome }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-140px)] flex flex-col animate-fade-in">
      <div className="text-center mb-6 space-y-2">
        <h1 className="text-3xl font-headline font-black flex items-center justify-center gap-3">
          <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          <span className="text-gradient">{t.title}</span>
        </h1>
        <p className="text-muted-foreground text-sm font-medium">{t.desc}</p>
      </div>

      <Card className="flex-1 glass-card border-white/5 flex flex-col overflow-hidden rounded-[2.5rem] shadow-2xl">
        <CardContent 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-primary/20"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={cn(
                "flex items-start gap-4 animate-fade-in",
                msg.role === 'user' ? (dir === 'rtl' ? "flex-row" : "flex-row-reverse") : (dir === 'rtl' ? "flex-row-reverse" : "flex-row")
              )}
            >
              <div className={cn(
                "p-3 rounded-2xl shrink-0",
                msg.role === 'user' ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
              )}>
                {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={cn(
                "max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-secondary/40 border border-white/5" 
                  : "bg-background/60 border border-accent/10"
              )}>
                {msg.content}
                {msg.reference && (
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2 text-[10px] font-bold text-accent/70 uppercase tracking-widest">
                    <Info className="h-3 w-3 shrink-0" />
                    <span>{t.reference} {msg.reference}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={cn("flex items-start gap-4", dir === 'rtl' ? "flex-row-reverse" : "flex-row")}>
              <div className="bg-accent/20 text-accent p-3 rounded-2xl">
                <RefreshCw className="h-5 w-5 animate-spin" />
              </div>
              <div className="bg-background/60 border border-accent/10 p-5 rounded-3xl">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 bg-card/20 border-t border-white/5">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex w-full gap-4 items-center"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 h-14 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 text-base"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-14 w-14 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              disabled={isLoading || !input.trim()}
            >
              {dir === 'rtl' ? <Send className="h-6 w-6 rotate-180" /> : <Send className="h-6 w-6" />}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
