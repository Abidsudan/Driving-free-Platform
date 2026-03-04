
'use client';

import { Shield, Lock, Eye, FileText } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function PrivacyPage() {
  const { language } = useLanguage()

  const content = language === 'ar' ? {
    title: "سياسة الخصوصية",
    intro: "في Driving Free، نأخذ خصوصيتك على محمل الجد. توضح هذه الصفحة كيفية جمعنا واستخدامنا لبياناتك الشخصية.",
    sections: [
      {
        title: "١. البيانات التي نجمعها",
        text: "نجمع المعلومات التي تقدمها لنا مباشرة عند إنشاء حساب، مثل الاسم، البريد الإلكتروني، والتقدم في الاختبارات التعليمية."
      },
      {
        title: "٢. كيف نستخدم بياناتك",
        text: "نستخدم البيانات لتحسين تجربتك التعليمية، تتبع تقدمك الأكاديمي، وإرسال نصائح تعليمية مخصصة عبر الذكاء الاصطناعي."
      },
      {
        title: "٣. حماية البيانات",
        text: "نستخدم تقنيات تشفير متقدمة وخدمات Firebase الآمنة لضمان بقاء بياناتك محمية من الوصول غير المصرح به."
      }
    ]
  } : {
    title: "Privacy Policy",
    intro: "At Driving Free, we take your privacy seriously. This page explains how we collect and use your personal data.",
    sections: [
      {
        title: "1. Data We Collect",
        text: "We collect information you provide directly to us when creating an account, such as your name, email, and educational test progress."
      },
      {
        title: "2. How We Use Your Data",
        text: "We use the data to enhance your learning experience, track your academic progress, and send personalized AI-driven tips."
      },
      {
        title: "3. Data Security",
        text: "We use advanced encryption technologies and secure Firebase services to ensure your data is protected from unauthorized access."
      }
    ]
  };

  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl animate-fade-in">
      <div className="text-center mb-16 space-y-4">
        <div className="academic-badge mx-auto"><Shield className="h-3 w-3" /> {content.title}</div>
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
