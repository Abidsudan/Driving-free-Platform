
'use client';

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { BookOpen, ShieldCheck, ClipboardCheck, ArrowLeft, ArrowRight, Star, Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const { language, dir } = useLanguage()
  const heroBg = PlaceHolderImages.find(img => img.id === "hero-bg")

  const t = {
    heroBadge: language === 'ar' ? "منصة تعليمية معتمدة وفق معايير RTA" : "Accredited platform per RTA standards",
    heroTitle: language === 'ar' ? "احترف القيادة بمنهج أكاديمي" : "Master Driving with Academic Curriculum",
    heroDesc: language === 'ar' ? "الأكاديمية الأولى في دبي التي تحول الخبرة الميدانية العميقة إلى منهج علمي تفاعلي يضمن لك النجاح من المحاولة الأولى." : "The first academy in Dubai converting deep field experience into an interactive scientific curriculum ensuring your success from the first attempt.",
    btnStart: language === 'ar' ? "ابدأ رحلة التعلم" : "Start Learning Journey",
    btnAssessment: language === 'ar' ? "خوض اختبار RTA" : "Take RTA Test",
    stats: [
      { num: "100%", label: language === 'ar' ? "منهج RTA المطور" : "Advanced RTA Curriculum" },
      { num: "98%", label: language === 'ar' ? "دقة محاكي الذكاء" : "AI Simulator Accuracy" },
      { num: "5000+", label: language === 'ar' ? "ساعة تدريب ميداني" : "Field Training Hours" },
      { num: "1200+", label: language === 'ar' ? "خريج رخصة قيادة" : "License Graduates" },
    ],
    featuresTitle: language === 'ar' ? "بوابتك لإتقان القيادة" : "Your Gateway to Driving Mastery",
    featuresDesc: language === 'ar' ? "أدوات تعليمية رقمية صممت لتبسيط المفاهيم الفيزيائية والقواعد المعقدة لهيئة الطرق والمواصلات." : "Digital educational tools designed to simplify physical concepts and complex RTA regulations.",
    features: [
      {
        title: language === 'ar' ? "المنهج الأكاديمي" : "Academic Curriculum",
        desc: language === 'ar' ? "رحلة تعليمية منظمة من 4 مستويات تغطي كل ما تحتاجه من فحص المركبة إلى القيادة في الطرق السريعة." : "A structured 4-level journey covering everything from vehicle inspection to highway driving.",
        icon: BookOpen,
        href: "/curriculum",
        color: "bg-blue-500/10 text-blue-500"
      },
      {
        title: language === 'ar' ? "المكتبة التقنية" : "Technical Library",
        desc: language === 'ar' ? "مقالات علمية حصرية تتناول فيزياء كبح المركبات وسيكولوجية السائق تحت الضغط المروري." : "Exclusive scientific articles on vehicle braking physics and driver psychology under pressure.",
        icon: Star,
        href: "/library",
        color: "bg-amber-500/10 text-amber-500"
      },
      {
        title: language === 'ar' ? "محاكي RTA الذكي" : "Smart RTA Simulator",
        desc: language === 'ar' ? "نظام توليد أسئلة يحاكي الاختبار النظري الحقيقي بدقة مذهلة لبناء ثقتك قبل الاختبار." : "A question generation system accurately simulating the real theory test to build your confidence.",
        icon: ClipboardCheck,
        href: "/assessment",
        color: "bg-green-500/10 text-green-500"
      }
    ],
    footerNote: language === 'ar' ? "نحن نؤمن أن القيادة ليست مجرد مهارة، بل هي علم يجمع بين الفيزياء والسلوك البشري." : "We believe driving is not just a skill, but a science combining physics and human behavior."
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {heroBg?.imageUrl && (
          <Image 
            src={heroBg.imageUrl} 
            alt="Dubai Highway" 
            fill 
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        <div className="container relative z-10 px-6 text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
            <ShieldCheck className="h-4 w-4" />
            {t.heroBadge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter max-w-4xl mx-auto leading-tight">
            {t.heroTitle}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/curriculum">
              <Button size="lg" className="h-14 px-8 rounded-2xl font-bold text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 w-full sm:w-auto">
                {t.btnStart}
              </Button>
            </Link>
            <Link href="/assessment">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-bold text-lg border-white/10 hover:bg-white/5 w-full sm:w-auto">
                {t.btnAssessment}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-[2.5rem] glass-card border-white/10">
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <span className="block text-3xl md:text-4xl font-black text-gradient">{stat.num}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-32 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-headline font-black">{t.featuresTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.featuresDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.features.map((feature, i) => (
            <Link href={feature.href} key={i} className="group">
              <div className="h-full p-8 rounded-[2.5rem] glass-card border-white/5 hover:border-primary/20 transition-all space-y-6">
                <div className={cn("inline-flex p-4 rounded-2xl", feature.color)}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                  {language === 'ar' ? 'استكشف الآن' : 'Explore Now'}
                  {dir === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <footer className="container mx-auto px-6 py-20 border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="logo-container w-32 h-16 mx-auto opacity-50 grayscale hover:grayscale-0 transition-all">
            <Image 
              src={PlaceHolderImages.find(img => img.id === "site-logo")?.imageUrl || ""} 
              alt="Driving Free Logo" 
              width={128}
              height={64}
              className="object-contain"
            />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            {t.footerNote}
          </p>
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">
            © 2026 Driving Free • Dubai, UAE
          </p>
        </div>
      </footer>
    </div>
  )
}
