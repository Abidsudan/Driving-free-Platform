
'use client';

import { GraduationCap, Award, BrainCircuit, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function AboutPage() {
  const { language } = useLanguage()
  const instructor = PlaceHolderImages.find(img => img.id === "instructor-hero")

  const t = {
    title: language === 'ar' ? "من نحن" : "About Us",
    subtitle: language === 'ar' ? "الأكاديمية الرقمية الأولى للقيادة في دبي" : "Dubai's First Digital Driving Academy",
    history: language === 'ar' 
      ? "تأسست Driving Free برؤية واضحة: تحويل تعليم القيادة من مجرد ممارسة إلى علم يجمع بين الفيزياء والسلوك البشري." 
      : "Driving Free was founded with a clear vision: to transform driving education from mere practice into a science combining physics and human behavior.",
    stats: [
      { num: "5000+", label: language === 'ar' ? "طالب أكاديمي" : "Academic Students", icon: Users },
      { num: "98%", label: language === 'ar' ? "نسبة النجاح" : "Success Rate", icon: Award },
      { num: "AI", label: language === 'ar' ? "محاكي ذكي" : "AI Powered", icon: BrainCircuit },
    ]
  }

  return (
    <div className="container mx-auto px-6 py-20 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="academic-badge"><GraduationCap className="h-3 w-3" /> {t.subtitle}</div>
          <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-none">{t.title}</h1>
          <p className="text-2xl text-muted-foreground leading-relaxed font-medium">
            {t.history}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10">
            {t.stats.map((s, i) => (
              <div key={i} className="glass-card p-6 text-center rounded-3xl border-white/10">
                <s.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-black smart-gradient-text">{s.num}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-white/10">
          <Image 
            src={instructor?.imageUrl || ""} 
            alt="About Instructor" 
            fill 
            className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            data-ai-hint="driving mentor"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </div>
    </div>
  )
}
