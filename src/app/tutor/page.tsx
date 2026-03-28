'use client';

import { useState, useRef, useEffect } from 'react';
import { askDrivingTutor, type TutorOutput } from '@/ai/flows/driving-tutor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Sparkles, Send, Bot, User, RefreshCw, Info, ArrowLeft, ArrowRight, Microchip, Activity, Beaker, ShieldAlert } from 'lucide-react';
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
    title: language === 'ar' ? "المعلم الذكي: بروتوكول الإرشاد المعرفي" : "AI Tutor: Cognitive Guidance Protocol",
    desc: language === 'ar' ? "استعلم عن فيزياء القيادة، هندسة المخاطر، أو تفكيك قواعد RTA المعقدة." : "Inquire about driving physics, risk engineering, or deconstructing complex RTA rules.",
    placeholder: language === 'ar' ? "أدخل استفساراً أكاديمياً..." : "Enter an academic inquiry...",
    welcome: language === 'ar' ? "تمت مزامنة المعلم الذكي. جاهز لتحليل استفساراتك حول هندسة القيادة وبروتوكولات الأمان." : "AI Tutor synced. Ready to analyze your inquiries on driving engineering and safety protocols.",
    reference: language === 'ar' ? "المصدر المعياري:" : "Standard Reference:",
    error: language === 'ar' ? "عذراً، حدث خطأ في معالجة الاستعلام الأكاديمي." : "Sorry, an error occurred in processing the academic inquiry.",
    protocols: [
      { id: "haz", label: language === 'ar' ? "تحليل إدراك المخاطر" : "Simulate Hazard Perception", icon: ShieldAlert, prompt: language === 'ar' ? "اشرح لي بروتوكول التعامل مع مخاطر الطريق المفاجئة في دبي." : "Explain the protocol for handling sudden road hazards in Dubai." },
      { id: "rta", label: language === 'ar' ? "تفكيك قاعدة RTA 4.2" : "Deconstruct RTA Rule 4.2", icon: Microchip, prompt: language === 'ar' ? "ما هو التحليل التقني للقاعدة 4.2 في دليل هيئة الطرق؟" : "What is the technical analysis of Rule 4.2 in the RTA manual?" },
      { id: "phy", label: language === 'ar' ? "فيزياء الكبح الحراري" : "Thermal Braking Physics", icon: Beaker, prompt: language === 'ar' ? "كيف تؤثر حرارة دبي العالية على مسافات الكبح الفيزيائية؟" : "How does high Dubai heat affect physical braking distances?" }
    ]
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

  const handleSend = async (customPrompt?: string) => {
    const userMessage = customPrompt || input.trim();
    if (!userMessage || isLoading) return;

    if (!customPrompt) setInput('');
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
    <div className="container mx-auto px-4 py-8 max-w-5xl h-[calc(100vh-140px)] flex flex-col gap-6 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
          <Microchip className="h-3 w-3" /> AGENT_SYNC: VERIFIED
        </div>
        <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tighter">
          {t.title}
        </h1>
        <p className="text-muted-foreground text-sm font-medium">{t.desc}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Protocol Sidebar */}
        <div className="lg:w-72 space-y-4 hidden lg:block">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">Standard Inquiry Protocols</span>
          <div className="space-y-2">
            {t.protocols.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => handleSend(protocol.prompt)}
                disabled={isLoading}
                className="w-full p-4 rounded-2xl glass-card border-white/5 hover:border-primary/40 text-left transition-all group flex items-center gap-4"
              >
                <div className="p-2 rounded-xl bg-primary/5 group-hover:bg-primary/20 text-primary">
                  <protocol.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold leading-tight">{protocol.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Card className="flex-1 glass-card border-white/5 flex flex-col overflow-hidden rounded-[3rem] shadow-2xl bg-card/20">
          <CardContent 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-primary/20"
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex items-start gap-6 animate-fade-in",
                  msg.role === 'user' ? (dir === 'rtl' ? "flex-row" : "flex-row-reverse") : (dir === 'rtl' ? "flex-row-reverse" : "flex-row")
                )}
              >
                <div className={cn(
                  "p-4 rounded-2xl shrink-0 shadow-xl",
                  msg.role === 'user' ? "bg-primary text-white" : "bg-accent/20 text-accent border border-accent/20"
                )}>
                  {msg.role === 'user' ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                </div>
                <div className={cn(
                  "max-w-[85%] p-6 rounded-[2rem] text-lg leading-relaxed shadow-xl",
                  msg.role === 'user' 
                    ? "bg-secondary/40 border border-white/5" 
                    : "bg-background/60 border border-accent/10"
                )}>
                  {msg.content}
                  {msg.reference && (
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-start gap-3">
                      <div className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Info className="h-3 w-3" /> {t.reference}
                      </div>
                      <span className="text-xs font-mono font-medium opacity-60">{msg.reference}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={cn("flex items-start gap-6", dir === 'rtl' ? "flex-row-reverse" : "flex-row")}>
                <div className="bg-accent/20 text-accent p-4 rounded-2xl shadow-xl">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
                <div className="bg-background/60 border border-accent/10 p-6 rounded-[2rem] shadow-xl">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-accent/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-8 bg-black/20 border-t border-white/5">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex w-full gap-4 items-center"
            >
              <div className="relative flex-1">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="h-16 pl-8 pr-8 rounded-2xl bg-background/50 border-white/10 focus:border-primary/50 text-lg font-medium shadow-inner"
                  disabled={isLoading}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <Button 
                type="submit" 
                size="icon" 
                className="h-16 w-16 rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 active:scale-95 transition-all"
                disabled={isLoading || !input.trim()}
              >
                {dir === 'rtl' ? <Send className="h-8 w-8 rotate-180" /> : <Send className="h-8 w-8" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
