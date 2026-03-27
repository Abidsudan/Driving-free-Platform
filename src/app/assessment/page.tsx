
"use client"

import { AssessmentQuiz } from "@/components/assessment-quiz"
import { ClipboardCheck, ShieldAlert, Award, Target, Zap, GraduationCap, ShieldCheck, Activity, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function AssessmentPage() {
  const { language, dir } = useLanguage();

  const t = {
    title: language === 'ar' ? "التقييم المعرفي الذكي" : "Smart Cognitive Assessment",
    description: language === 'ar' 
      ? "استعد لاختبار RTA النظري من خلال محاكي يعمل بالذكاء الاصطناعي. احصل على تقييم فوري لمستواك المعرفي وشرح علمي لكل إجابة."
      : "Prepare for the RTA theory test with an AI-powered simulator. Get an instant assessment of your knowledge level and a scientific explanation for every answer.",
    features: [
      { 
        icon: ClipboardCheck, 
        title: language === 'ar' ? "محاكاة واقعية" : "Realistic Simulation", 
        text: language === 'ar' ? "أسئلة تتبع نفس نمط اختبارات دبي الرسمية." : "Questions follow the exact pattern of official Dubai tests."
      },
      { 
        icon: ShieldAlert, 
        title: language === 'ar' ? "تحليل الأخطاء" : "Error Analysis", 
        text: language === 'ar' ? "شرح مفصل للقواعد لضمان عدم تكرار الخطأ." : "Detailed rule explanations to ensure errors aren't repeated."
      },
      { 
        icon: Award, 
        title: language === 'ar' ? "معدل الإدراك" : "Perception Rate", 
        text: language === 'ar' ? "قياس دقيق لمدى جاهزيتك للاختبار الحقيقي." : "Precise measurement of your readiness for the real test."
      },
    ],
    whyTitle: language === 'ar' ? "لماذا هذا التقييم؟" : "Why this Assessment?",
    whyText: language === 'ar' 
      ? "تعتمد هيئة الطرق والمواصلات (RTA) في دبي على بنك أسئلة واسع يركز على الفهم لا الحفظ. نظامنا يستخدم الذكاء الاصطناعي لتوليد أسئلة تغطي:"
      : "The RTA in Dubai relies on an extensive question bank focusing on understanding rather than memorization. Our AI system generates questions covering:",
    whyList: language === 'ar' 
      ? [
          "نظام DSSSM لمراقبة سلوك السائقين.",
          "قواعد التجاوز والأولويات في التقاطعات المعقدة.",
          "التعامل مع حالات الطوارئ والظروف الجوية المختلفة.",
          "التعرف السريع على إشارات المرور التحذيرية والتنظيمية."
        ]
      : [
          "DSSSM system for monitoring driver behavior.",
          "Overtaking rules and priorities at complex intersections.",
          "Handling emergencies and varying weather conditions.",
          "Rapid recognition of warning and regulatory traffic signs."
        ]
  };

  return (
    <div className="container mx-auto px-6 py-20 space-y-32">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16 animate-reveal-up opacity-0">
        <div className="space-y-8 max-w-2xl">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.5em] border border-primary/20">
            <Activity className="h-4 w-4 animate-pulse" />
            {language === 'ar' ? 'نظام التقييم الذكي' : 'SMART ASSESSMENT SYSTEM'}
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] smart-gradient-text">
            {t.title}
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed font-medium opacity-80">
            {t.description}
          </p>
        </div>
        <div className="flex-1 flex justify-end">
           <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
              <div className="relative h-64 w-64 rounded-[3.5rem] bg-black/40 border border-white/5 flex items-center justify-center backdrop-blur-3xl shadow-2xl">
                <Target className="h-32 w-32 text-primary animate-float" />
                <div className="absolute -top-4 -right-4 bg-accent p-4 rounded-2xl shadow-2xl rotate-12">
                  <Zap className="h-8 w-8 text-black" />
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-reveal-up opacity-0 [animation-delay:0.2s]">
        {t.features.map((item, i) => (
          <div key={i} className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-primary/30 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16" />
            <div className="p-6 rounded-[2rem] bg-secondary/40 border border-white/5 w-fit mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all shadow-2xl">
              <item.icon className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black font-headline mb-4 tracking-tight">{item.title}</h3>
            <p className="text-muted-foreground font-medium leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="animate-reveal-up opacity-0 [animation-delay:0.4s]">
        <AssessmentQuiz />
      </div>
      
      <div className="max-w-4xl mx-auto mt-20 p-16 rounded-[4rem] glass-card border-accent/20 relative group animate-reveal-up opacity-0 [animation-delay:0.6s]">
        <div className="absolute top-0 left-0 w-3 h-full bg-accent shadow-[0_0_30px_rgba(255,191,0,0.4)]" />
        <div className="flex flex-col md:flex-row gap-16 relative z-10">
          <div className="space-y-8 flex-1">
            <h2 className="text-5xl font-black font-headline tracking-tighter text-accent flex items-center gap-6">
              <Sparkles className="h-10 w-10 animate-pulse" />
              {t.whyTitle}
            </h2>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed opacity-80">{t.whyText}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.whyList.map((li, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-2 rounded-lg bg-accent/20 text-accent">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest opacity-60 leading-tight">{li}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

