'use client';

import { AssessmentQuiz } from "@/components/assessment-quiz"
import { ClipboardCheck, ShieldAlert, Award, Database } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function AssessmentPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? "التقييم المعرفي الذكي" : "Smart Cognitive Assessment",
    description: language === 'ar' 
      ? "استعد لاختبار RTA النظري من خلال محاكي يعمل بالذكاء الاصطناعي مدعوم ببنك أسئلة يضم أكثر من 112 سؤالاً تقنياً."
      : "Prepare for the RTA theory test with an AI-powered simulator powered by an expanded bank of 112+ technical questions.",
    features: [
      { 
        icon: Database, 
        title: language === 'ar' ? "بنك أسئلة شامل" : "Expanded Question Bank", 
        text: language === 'ar' ? "يغطي نظام النقاط، الميكانيكا، والقيادة الدفاعية." : "Covers points system, mechanics, and defensive driving."
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
    whyTitle: language === 'ar' ? "ماذا يغطي هذا التقييم؟" : "What does this assessment cover?",
    whyText: language === 'ar' 
      ? "لقد قمنا بدمج أحدث معايير الاختبارات النظرية لتشمل:"
      : "We have integrated the latest theoretical test standards to include:",
    whyList: language === 'ar' 
      ? [
          "نظام النقاط والمخالفات (سحب الرخصة لمدة سنة أو سنتين).",
          "فيزياء ناقل الحركة (التروس L و 1 و 2).",
          "بروتوكولات الطوارئ والحوادث مع وجود إصابات.",
          "هندسة الجلوس الصحيحة وفحص ما قبل الرحلة."
        ]
      : [
          "Points system and violations (1 or 2 year withdrawal).",
          "Transmission physics (Gears L, 1, and 2).",
          "Emergency protocols and accidents with injuries.",
          "Correct seating geometry and pre-trip inspections."
        ]
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-4">
          <Database className="h-3 w-3" />
          {language === 'ar' ? "تم تحديث بنك الأسئلة" : "Question Bank Updated"}
        </div>
        <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter">{t.title}</h1>
        <p className="text-lg text-muted-foreground font-medium">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {t.features.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-8 rounded-[2.5rem] glass-card border-white/5 group hover:border-primary/30 transition-all">
            <item.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-black text-xl mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <AssessmentQuiz />
      
      <div className="max-w-3xl mx-auto mt-20 p-10 rounded-[3rem] bg-accent/5 border border-accent/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ClipboardCheck className="h-32 w-32" />
        </div>
        <h2 className="text-3xl font-headline font-black text-accent mb-6 relative z-10">{t.whyTitle}</h2>
        <div className="space-y-6 text-muted-foreground leading-relaxed relative z-10">
          <p className="text-lg font-medium">{t.whyText}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.whyList.map((li, i) => (
              <li key={i} className="flex items-start gap-3 bg-black/20 p-4 rounded-2xl border border-white/5">
                <div className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />
                <span className="text-sm font-bold">{li}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
