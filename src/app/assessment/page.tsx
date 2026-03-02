
'use client';

import { AssessmentQuiz } from "@/components/assessment-quiz"
import { ClipboardCheck, ShieldAlert, Award } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function AssessmentPage() {
  const { language } = useLanguage();

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
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-bold">{t.title}</h1>
        <p className="text-lg text-muted-foreground">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {t.features.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-border/50">
            <item.icon className="h-10 w-10 text-accent mb-4" />
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <AssessmentQuiz />
      
      <div className="max-w-2xl mx-auto mt-20 p-8 rounded-3xl bg-accent/5 border border-accent/20">
        <h2 className="text-2xl font-headline font-bold text-accent mb-4">{t.whyTitle}</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>{t.whyText}</p>
          <ul className="list-disc px-6 space-y-2 text-sm">
            {t.whyList.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
