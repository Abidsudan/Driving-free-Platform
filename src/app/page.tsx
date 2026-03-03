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
    heroDesc: language === 'ar' ? "المنصة الأولى في دبي التي تحول الخبرة الميدانية إلى منهج أكاديمي ذكي يضمن لك النجاح من المحاولة الأولى." : "The #1 platform in Dubai transforming field experience into a smart academic curriculum ensuring first-attempt success.",
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
    ],
    shareTitle: language === 'ar' ? "ادعُ زملاءك للتعلم" : "Invite Peers to Learn",
    shareDesc: language === 'ar' ? "شارك الأكاديمية مع أصدقائك وساهم في تعزيز السلامة المرورية في دبي." : "Share the academy with your friends and help promote road safety in Dubai."
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {heroBg?.imageUrl && (
          <Image 
            src={heroBg.imageUrl} 
            alt="Dubai Highway" 
            fill 
            className="object-cover opacity-20 scale-110 animate-pulse-slow"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        
        <div className="container relative z-10 px-6 mx-auto text-center space-y-12">
          <div className="academic-badge animate-fade-in mx-auto glass-card">
            <ShieldCheck className="h-4 w-4" />
            {t.heroBadge}
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black font-headline tracking-tighter max-w-6xl mx-auto leading-[0.85] smart-gradient-text">
            {t.heroTitle}
          </h1>
          
          <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium opacity-80">
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

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* Stats Bar */}
      <section className="container mx-auto px-6 -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-[4rem] glass-card border-white/10">
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center space-y-3 group">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-4xl md:text-6xl font-black smart-gradient-text leading-none">{stat.num}</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-2 block">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-40 space-y-24">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-8xl font-headline font-black tracking-tighter">{t.featuresTitle}</h2>
          <div className="h-2 w-32 bg-primary mx-auto rounded-full shadow-[0_0_20px_hsl(var(--primary))] " />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {t.features.map((feature, i) => (
            <Link href={feature.href} key={i} className="group">
              <div className="h-full p-12 rounded-[4rem] glass-card border-white/5 hover:border-primary/40 hover:-translate-y-4 transition-all duration-700 space-y-10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className={cn("inline-flex p-6 rounded-3xl shadow-xl", feature.color)}>
                  <feature.icon className="h-12 w-12" />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-4xl font-headline font-black leading-tight group-hover:text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-xl font-medium">{feature.desc}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm font-black text-primary group-hover:gap-6 transition-all uppercase tracking-widest pt-4">
                  {language === 'ar' ? 'استكشف الآن' : 'Explore Now'}
                  {dir === 'rtl' ? <ArrowLeft className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Share CTA */}
      <section className="container mx-auto px-6 pb-40">
        <div className="p-20 md:p-32 rounded-[5rem] glass-card border-primary/20 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -ml-48 -mb-48" />
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-5xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter">{t.shareTitle}</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed opacity-80">{t.shareDesc}</p>
            <ShareDialog>
              <Button size="lg" className="h-24 px-16 rounded-[2.5rem] font-black text-2xl gap-4 shadow-2xl shadow-primary/40 active:scale-95 transition-all bg-primary hover:bg-primary/90">
                <Share2 className="h-8 w-8" />
                {language === 'ar' ? 'شارك الأكاديمية الآن' : 'Share Academy Now'}
              </Button>
            </ShareDialog>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-white/5 py-32 glass-card rounded-t-[5rem]">
        <div className="container mx-auto px-6 text-center space-y-12">
          <div className="bg-white rounded-[2.5rem] p-6 w-64 mx-auto shadow-2xl animate-float">
             <Image 
                src={PlaceHolderImages.find(img => img.id === "site-logo")?.imageUrl || ""} 
                alt="Driving Free" 
                width={256}
                height={80}
                className="object-contain"
                unoptimized
              />
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto font-bold text-xl leading-relaxed">
            {language === 'ar' 
              ? "نحن نؤمن أن القيادة علم يجمع بين الفيزياء والسلوك البشري. هدفنا بناء جيل من السائقين المحترفين في دبي."
              : "We believe driving is a science of physics and human behavior. Our goal is to build professional drivers in Dubai."}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 text-[12px] font-black text-muted-foreground uppercase tracking-[0.6em]">
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
