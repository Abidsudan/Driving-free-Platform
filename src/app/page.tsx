
"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { BookOpen, ShieldCheck, ClipboardCheck, ArrowLeft, ArrowRight, Star, GraduationCap, Share2, Zap, Trophy, MousePointer2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ShareDialog } from "@/components/share-dialog"

export default function Home() {
  const { language, dir } = useLanguage()
  const heroBg = PlaceHolderImages.find(img => img.id === "hero-bg")

  const t = {
    heroBadge: language === 'ar' ? "أكاديمية رقمية معتمدة وفق معايير RTA" : "Accredited Digital Academy per RTA Standards",
    heroTitle: language === 'ar' ? "صناعة السائق المحترف بالعلم" : "Engineering Professional Drivers through Science",
    heroDesc: language === 'ar' ? "المنصة الأولى في دبي التي تحول الخبرة الميدانية إلى منهج أكاديمي ذكي يضمن لك النجاح من المحاولة الأولى." : "The #1 platform in Dubai transforming field experience into a smart academic curriculum.",
    btnStart: language === 'ar' ? "ابدأ المنهج الأكاديمي" : "Start Academic Curriculum",
    btnAssessment: language === 'ar' ? "محاكي اختبار RTA" : "RTA Test Simulator",
    stats: [
      { num: "100%", label: language === 'ar' ? "دقة المنهج" : "Curriculum Accuracy", icon: ShieldCheck },
      { num: "98%", label: language === 'ar' ? "نسبة النجاح" : "Success Rate", icon: Trophy },
      { num: "5000+", label: language === 'ar' ? "ساعة تدريب" : "Training Hours", icon: Zap },
      { num: "FREE", label: language === 'ar' ? "مجاني للجميع" : "Free for Everyone", icon: Star },
    ],
    featuresTitle: language === 'ar' ? "بوابتك للتميز الأكاديمي" : "Your Gateway to Academic Excellence",
    features: [
      {
        title: language === 'ar' ? "المنهج المتكامل" : "Integrated Curriculum",
        desc: language === 'ar' ? "رحلة تعليمية من 6 مستويات تغطي فيزياء المركبة وقواعد الطرق السريعة." : "A 6-level educational journey covering vehicle physics and highway rules.",
        icon: BookOpen,
        href: "/curriculum",
        color: "bg-blue-500/10 text-blue-500"
      },
      {
        title: language === 'ar' ? "المكتبة العلمية" : "Scientific Library",
        desc: language === 'ar' ? "دراسات حصرية حول سيكولوجية السائق وديناميكيات نقل الوزن." : "Exclusive studies on driver psychology and weight transfer dynamics.",
        icon: GraduationCap,
        href: "/library",
        color: "bg-amber-500/10 text-amber-500"
      },
      {
        title: language === 'ar' ? "محاكي الذكاء" : "AI Simulator",
        desc: language === 'ar' ? "مولد أسئلة ذكي يحاكي الاختبار النظري الحقيقي لهيئة الطرق والمواصلات." : "Smart question generator simulating the real RTA theory test accurately.",
        icon: ClipboardCheck,
        href: "/assessment",
        color: "bg-green-500/10 text-green-500"
      }
    ]
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {heroBg?.imageUrl && (
          <Image 
            src={heroBg.imageUrl} 
            alt="Dubai Highway" 
            fill 
            className="object-cover opacity-20 scale-105 animate-pulse-slow"
            priority
            data-ai-hint="dubai highway"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        
        <div className="container relative z-10 px-6 mx-auto text-center space-y-10">
          <div className="academic-badge animate-fade-in mx-auto glass-card">
            <ShieldCheck className="h-4 w-4" />
            {t.heroBadge}
          </div>
          
          <h1 className="text-5xl md:text-9xl font-black font-headline tracking-tighter max-w-6xl mx-auto leading-[0.9] smart-gradient-text">
            {t.heroTitle}
          </h1>
          
          <p className="text-lg md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium opacity-80">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link href="/curriculum" className="w-full sm:w-auto">
              <Button size="lg" className="h-20 px-12 rounded-[2rem] font-black text-xl bg-primary hover:bg-primary/90 shadow-[0_20px_80px_rgba(59,130,246,0.4)] w-full group">
                {t.btnStart}
                <Zap className="ml-3 h-6 w-6 fill-current group-hover:scale-125 transition-transform" />
              </Button>
            </Link>
            <Link href="/assessment" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-20 px-12 rounded-[2rem] font-black text-xl glass-card border-white/10 w-full hover:bg-white/10">
                {t.btnAssessment}
                <MousePointer2 className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 rounded-[4rem] glass-card border-white/10">
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2 group">
              <div className="mx-auto w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-3xl md:text-5xl font-black smart-gradient-text leading-none">{stat.num}</span>
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-2 block">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-32 space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-7xl font-headline font-black tracking-tighter">{t.featuresTitle}</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-[0_0_20px_hsl(var(--primary))]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.features.map((feature, i) => (
            <Link href={feature.href} key={i} className="group">
              <div className="h-full p-10 rounded-[3.5rem] glass-card border-white/5 hover:border-primary/40 transition-all duration-700 space-y-8 relative overflow-hidden">
                <div className={cn("inline-flex p-5 rounded-2xl shadow-xl", feature.color)}>
                  <feature.icon className="h-10 w-10" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-headline font-black leading-tight group-hover:text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium opacity-70">{feature.desc}</p>
                </div>
                
                <div className="flex items-center gap-3 text-xs font-black text-primary group-hover:gap-5 transition-all uppercase tracking-widest pt-4">
                  {language === 'ar' ? 'استكشف الآن' : 'Explore Now'}
                  {dir === 'rtl' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-white/5 py-24 glass-card rounded-t-[4rem]">
        <div className="container mx-auto px-6 text-center space-y-10">
          <div className="bg-white rounded-2xl p-4 w-48 mx-auto shadow-2xl animate-float">
             <Image 
                src={PlaceHolderImages.find(img => img.id === "site-logo")?.imageUrl || ""} 
                alt="Driving Free" 
                width={192}
                height={60}
                className="object-contain"
                unoptimized
              />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto font-bold text-lg leading-relaxed opacity-80">
            {language === 'ar' 
              ? "نحن نؤمن أن القيادة علم يجمع بين الفيزياء والسلوك البشري. هدفنا بناء جيل من السائقين المحترفين في دبي."
              : "We believe driving is a science of physics and human behavior. Our goal is professional drivers in Dubai."}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
            <span>© 2026 Driving Free</span>
            <span className="hidden md:block text-primary">•</span>
            <span>Dubai, UAE</span>
            <span className="hidden md:block text-primary">•</span>
            <span>Academic Excellence</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
