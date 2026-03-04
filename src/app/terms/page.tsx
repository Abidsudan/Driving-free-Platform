
'use client';

import { FileCheck, AlertCircle, Gavel } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function TermsPage() {
  const { language } = useLanguage()

  const content = language === 'ar' ? {
    title: "الشروط والأحكام",
    intro: "باستخدامك لمنصة Driving Free، فإنك توافق على الالتزام بالشروط التالية المصممة لضمان بيئة تعليمية آمنة وعلمية.",
    sections: [
      {
        title: "١. الاستخدام التعليمي",
        text: "هذه المنصة مخصصة للأغراض التعليمية والأكاديمية فقط. نتائج الاختبارات والمحاكاة هي للتدريب ولا تغني عن الاختبارات الرسمية من هيئة الطرق والمواصلات (RTA)."
      },
      {
        title: "٢. الحساب الشخصي",
        text: "أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكافة الأنشطة التي تحدث تحته."
      },
      {
        title: "٣. حقوق الملكية",
        text: "كافة المحتويات العلمية والمنهج الدراسي والذكاء الاصطناعي مملوكة لـ Driving Free ويمنع نسخها أو إعادة توزيعها دون إذن مسبق."
      }
    ]
  } : {
    title: "Terms & Conditions",
    intro: "By using the Driving Free platform, you agree to comply with the following terms designed to ensure a safe and scientific learning environment.",
    sections: [
      {
        title: "1. Educational Use",
        text: "This platform is for educational and academic purposes only. Test results and simulations are for training and do not replace official RTA tests."
      },
      {
        title: "2. Personal Account",
        text: "You are responsible for maintaining the confidentiality of your account details and all activities under your account."
      },
      {
        title: "3. Property Rights",
        text: "All scientific content, curriculum, and AI are owned by Driving Free. Copying or redistribution is prohibited without prior permission."
      }
    ]
  };

  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl animate-fade-in">
      <div className="text-center mb-16 space-y-4">
        <div className="academic-badge mx-auto"><FileCheck className="h-3 w-3" /> {content.title}</div>
        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter">{content.title}</h1>
        <p className="text-xl text-muted-foreground">{content.intro}</p>
      </div>

      <div className="space-y-12">
        {content.sections.map((s, i) => (
          <div key={i} className="glass-card p-10 rounded-[3rem] border-white/5">
            <h2 className="text-2xl font-black mb-4 text-primary">{s.title}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
