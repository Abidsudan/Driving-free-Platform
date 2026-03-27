
"use client"

import Image from "next/image"
import { CheckCircle2, BookOpen, Clock, Target, ArrowRight, ArrowLeft, Zap, GraduationCap, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function CurriculumPage() {
  const { language, dir } = useLanguage();

  const t = {
    title: language === 'ar' ? "المنهج الأكاديمي المتكامل" : "Integrated Academic Curriculum",
    description: language === 'ar' 
      ? "هيكل تعليمي منطقي يأخذك من الصفر وحتى الحصول على رخصة القيادة، مصمم وفقاً لمعايير RTA وأحدث النظريات العلمية في تدريب السائقين."
      : "A logical educational structure that takes you from zero to obtaining a driver's license, designed according to RTA standards and the latest scientific theories in driver training.",
    stages: [
      {
        title: language === 'ar' ? "المرحلة الأولى: الأساسيات والبيئة المحيطة" : "Stage 1: Basics & Environment",
        description: language === 'ar' ? "فهم مكونات المركبة، وضعيات الجلوس الصحيحة، واستخدام المرايا." : "Understanding vehicle components, correct seating positions, and mirror usage.",
        topics: language === 'ar' 
          ? ["فحص المركبة قبل التحرك", "وضعيات المقود والدواسات", "فهم لوحة العدادات"]
          : ["Pre-trip vehicle inspection", "Steering and pedal positions", "Understanding the dashboard"],
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
        color: "from-blue-500/20 to-transparent"
      },
      {
        title: language === 'ar' ? "المرحلة الثانية: التحكم والمناورة" : "Stage 2: Control & Maneuvering",
        description: language === 'ar' ? "إتقان التحرك، التوقف، الانعطافات، والتعامل مع التقاطعات البسيطة." : "Mastering movement, stopping, turns, and handling simple intersections.",
        topics: language === 'ar' 
          ? ["قاعدة 2 ثانية للمسافات", "تقنيات الدوران الصحيحة", "فهم نقاط العمياء"]
          : ["2-second distance rule", "Correct turning techniques", "Understanding blind spots"],
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
        color: "from-amber-500/20 to-transparent"
      },
      {
        title: language === 'ar' ? "المرحلة الثالثة: قواعد الطريق السريع" : "Stage 3: Highway Regulations",
        description: language === 'ar' ? "الانتقال بين المسارات، دخول وخروج الطرق السريعة، والسرعات العالية." : "Lane changing, entering and exiting highways, and high speeds.",
        topics: language === 'ar' 
          ? ["التسارع الآمن", "فهم إشارات الطرق السريعة", "إدارة المخاطر العالية"]
          : ["Safe acceleration", "Understanding highway signs", "High-risk management"],
        image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=800",
        color: "from-green-500/20 to-transparent"
      },
      {
        title: language === 'ar' ? "المرحلة الرابعة: اختبار المدينة المتقدم" : "Stage 4: Advanced City Test",
        description: language === 'ar' ? "المحاكاة الكاملة لاختبار RTA العملي والتركيز على أسباب الرسوب الفوري." : "Full simulation of the RTA practical test focusing on instant failure reasons.",
        topics: language === 'ar' 
          ? ["القيادة في المناطق المزدحمة", "أولويات الدوارات المعقدة", "الوقوف الاضطراري"]
          : ["Driving in congested areas", "Complex roundabout priorities", "Emergency stopping"],
        image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800",
        color: "from-primary/20 to-transparent"
      }
    ],
    stageLabel: language === 'ar' ? "المرحلة" : "Stage"
  };

  return (
    <div className="container mx-auto px-6 py-20 space-y-32">
      <div className="max-w-4xl space-y-8 animate-reveal-up">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.5em] border border-primary/20">
          <GraduationCap className="h-4 w-4" />
          {language === 'ar' ? 'المسار الأكاديمي' : 'ACADEMIC PATHWAY'}
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] smart-gradient-text">
          {t.title}
        </h1>
        <p className="text-2xl text-muted-foreground leading-relaxed font-medium max-w-2xl opacity-80">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {t.stages.map((stage, idx) => (
          <div 
            key={idx} 
            className={cn(
              "relative group animate-reveal-up",
              idx === 0 && "delay-100",
              idx === 1 && "delay-200",
              idx === 2 && "delay-300",
              idx >= 3 && "delay-400"
            )}
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Card className="h-full overflow-hidden border-white/5 bg-card/40 rounded-[3.5rem] shadow-2xl relative z-10 hover:border-primary/30 transition-all duration-700 hover:-translate-y-4">
              <div className="relative h-72 w-full overflow-hidden">
                <Image 
                  src={stage.image} 
                  alt={stage.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t via-background/20 to-transparent", stage.color)} />
                <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-xl text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 shadow-2xl">
                  {t.stageLabel} 0{idx + 1}
                </div>
              </div>
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-4xl font-headline font-black tracking-tight group-hover:text-primary transition-colors">{stage.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <p className="text-xl text-muted-foreground font-medium leading-relaxed opacity-80">{stage.description}</p>
                <div className="grid grid-cols-1 gap-4">
                  {stage.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl group/topic hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover/topic:bg-primary group-hover/topic:text-black transition-all">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-widest opacity-60 group-hover/topic:opacity-100">{topic}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
                    <Clock className="h-4 w-4" /> 12 Hours
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
                    <Target className="h-4 w-4" /> Assessment Ready
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

