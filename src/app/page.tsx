"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { BookOpen, ShieldCheck, ClipboardCheck, ArrowLeft, ArrowRight, Star, GraduationCap, Zap, Trophy, Globe, Activity, Sparkles, MoveRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const { language, dir } = useLanguage()

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
      { num: "FREE", label: language === 'ar' ? "مجاني للجميع" : "Free for Everyone", icon: Globe },
    ],
    featuresTitle: language === 'ar' ? "بوابتك للتميز الأكاديمي" : "Your Gateway to Academic Excellence",
    features: [
      {
        title: language === 'ar' ? "المنهج المتكامل" : "Integrated Curriculum",
        desc: language === 'ar' ? "رحلة تعليمية من 4 مستويات تغطي فيزياء المركبة وقواعد الطرق السريعة." : "A 4-level educational journey covering vehicle physics and highway rules.",
        icon: BookOpen,
        href: "/curriculum",
        color: "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-black"
      },
      {
        title: language === 'ar' ? "المكتبة العلمية" : "Scientific Library",
        desc: language === 'ar' ? "دراسات حصرية حول سيكولوجية السائق وديناميكيات نقل الوزن." : "Exclusive studies on driver psychology and weight transfer dynamics.",
        icon: GraduationCap,
        href: "/library",
        color: "bg-accent/20 text-accent group-hover:bg-accent group-hover:text-black"
      },
      {
        title: language === 'ar' ? "محاكي الذكاء" : "AI Simulator",
        desc: language === 'ar' ? "مولد أسئلة ذكي يحاكي الاختبار النظري الحقيقي لهيئة الطرق والمواصلات." : "Smart question generator simulating the real RTA theory test accurately.",
        icon: ClipboardCheck,
        href: "/assessment",
        color: "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-black"
      }
    ]
  }

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary selection:text-black bg-[#020202]">
      {/* Hero Section - Cinematic Entry */}
      <section className="relative min-h-screen flex items-center pt-32 pb-48 overflow-hidden">
        {/* Advanced Ambient Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-float opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full animate-float-slow opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-30" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-50" />
        </div>
        
        <div className="container relative z-10 px-6 mx-auto text-center space-y-16">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.5em] animate-reveal-up opacity-0 shadow-2xl backdrop-blur-3xl">
            <Activity className="h-4 w-4 animate-pulse" />
            {t.heroBadge}
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black font-headline tracking-tighter max-w-7xl mx-auto leading-[0.8] smart-gradient-text animate-reveal-up opacity-0 [animation-delay:0.2s] uppercase">
            {t.heroTitle}
          </h1>
          
          <p className="text-2xl md:text-4xl text-muted-foreground/60 max-w-5xl mx-auto leading-relaxed font-medium animate-reveal-up opacity-0 [animation-delay:0.4s]">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-12 animate-reveal-up opacity-0 [animation-delay:0.6s]">
            <Link href="/curriculum" className="w-full sm:w-auto">
              <Button size="lg" className="h-24 px-16 rounded-[2.5rem] bg-primary text-black hover:bg-white transition-all duration-500 shadow-[0_40px_100px_-20px_rgba(59,130,246,0.5)] active:scale-95 text-xs font-black uppercase tracking-[0.4em] group">
                  <span className="flex items-center gap-4">
                    {t.btnStart}
                    <Zap className="h-5 w-5 fill-black transition-transform group-hover:scale-125" />
                  </span>
              </Button>
            </Link>
            <Link href="/assessment" className="w-full sm:w-auto text-white">
              <Button size="lg" variant="outline" className="h-24 px-16 rounded-[2.5rem] glass-card border-white/10 hover:border-primary/50 transition-all duration-500 active:scale-95 text-xs font-black uppercase tracking-[0.4em] group">
                  <span className="flex items-center gap-4">
                    {t.btnAssessment}
                    <Sparkles className="h-5 w-5 text-primary opacity-40 group-hover:opacity-100 group-hover:animate-spin-slow transition-all" />
                  </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
           <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* High-Tech Stats Bar */}
      <section className="container mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-[4rem] bg-black/40 backdrop-blur-3xl border border-white/5 shadow-2xl">
          {t.stats.map((stat, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-8 p-10 rounded-[3rem] hover:bg-white/5 transition-all group relative overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />
              <div className="p-6 rounded-[2.5rem] bg-secondary/40 text-primary group-hover:bg-primary group-hover:text-black transition-all shadow-2xl relative z-10">
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="relative z-10">
                <span className="block text-5xl font-black smart-gradient-text tracking-tighter mb-1">{stat.num}</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] opacity-60 leading-none">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Portals Section */}
      <section className="container mx-auto px-6 py-64 space-y-48">
        <div className="text-center space-y-10 animate-reveal-up opacity-0">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.6em] mb-4 border border-primary/20">
            <Activity className="h-4 w-4" />
            ACADEMIC ECOSYSTEM
          </div>
          <h2 className="text-6xl md:text-9xl font-headline font-black tracking-tighter leading-none uppercase">
             {t.featuresTitle.split(' ').slice(0, 3).join(' ')} <br/>
             <span className="smart-gradient-text">{t.featuresTitle.split(' ').slice(3).join(' ')}</span>
          </h2>
          <div className="h-1 w-48 bg-primary/20 mx-auto rounded-full relative overflow-hidden">
             <div className="absolute inset-0 bg-primary animate-reveal-up" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {t.features.map((feature, i) => (
            <Link href={feature.href} key={i} className={cn(
              "group animate-reveal-up",
              i === 0 && "delay-100",
              i === 1 && "delay-200",
              i >= 2 && "delay-300"
            )}>
              <div className="h-full p-16 rounded-[5rem] glass-card border-white/5 hover:border-primary/20 transition-all duration-1000 relative overflow-hidden flex flex-col justify-between group-hover:-translate-y-6">
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="space-y-12 relative z-10">
                  <div className={cn("inline-flex p-10 rounded-[3rem] shadow-2xl transition-all duration-700 relative overflow-hidden group/icon", feature.color)}>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/icon:translate-y-0 transition-transform duration-500" />
                    <feature.icon className="h-14 w-14 relative z-10" />
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-5xl font-headline font-black tracking-tighter group-hover:text-primary transition-colors leading-[0.9] uppercase">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-xl font-medium opacity-60">{feature.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-16 relative z-10">
                  <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-primary uppercase tracking-[0.4em] group-hover:bg-primary group-hover:text-black transition-all">
                    {language === 'ar' ? 'دخول' : 'Access'}
                  </div>
                  <div className="h-px flex-1 bg-white/5" />
                  <MoveRight className={cn("h-8 w-8 text-primary/40 group-hover:text-primary transition-all duration-500 translate-x-0 group-hover:translate-x-4", dir === 'rtl' && "rotate-180")} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Immersive CTA Hero */}
      <section className="container mx-auto px-6 py-48">
        <div className="rounded-[6rem] glass-card p-32 text-center space-y-16 relative overflow-hidden bg-gradient-to-br from-primary/10 via-black to-accent/10 border-primary/10 shadow-[0_100px_200px_rgba(0,0,0,1)]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsla(217,91%,60%,0.15),transparent_70%)] animate-pulse-slow" />
          <div className="space-y-6 relative z-10">
             <p className="text-primary text-[10px] font-black uppercase tracking-[1em] mb-4">DEPLOYMENT READY</p>
             <h2 className="text-7xl md:text-[9rem] font-black font-headline tracking-[calc(-0.06em)] leading-[0.8] uppercase">
                {language === 'ar' ? 'رحلتك نحو' : 'START YOUR'} <br />
                <span className="smart-gradient-text">{language === 'ar' ? 'الاحتراف تبدأ هنا' : 'ELITE PATH'}</span>
             </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-10 relative z-10">
            <Link href="/auth">
              <Button size="lg" className="h-28 px-24 rounded-[3rem] bg-white text-black hover:bg-primary transition-all duration-500 shadow-2xl shadow-primary/20 text-xs font-black uppercase tracking-[0.5em] active:scale-95">
                {language === 'ar' ? 'التحق بالأكاديمية' : 'Join Academy'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="mt-auto border-t border-white/5 py-48 bg-black">
        <div className="container mx-auto px-6 space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
             <div className="space-y-12">
                <div className="bg-white rounded-[2.5rem] p-10 w-fit shadow-2xl shadow-white/5 animate-float transform group hover:scale-110 transition-transform cursor-pointer">
                   <Image 
                      src="/site-logo.png" 
                      alt="Driving Free" 
                      width={240}
                      height={80}
                      className="object-contain"
                    />
                </div>
                <p className="text-muted-foreground font-medium text-2xl leading-relaxed max-w-2xl opacity-60">
                   {language === 'ar' 
                     ? "نحن نؤمن أن القيادة علم يجمع بين الفيزياء والسلوك البشري. هدفنا بناء جيل من السائقين المحترفين في دبي عبر مناهج أكاديمية متقدمة."
                     : "Driving is a science blending physics and behavioral psychology. We engineer professional drivers in Dubai through advanced academic protocols."}
                </p>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                {[
                   { title: 'LAB', links: ['Curriculum', 'Assessment', 'Library'] },
                   { title: 'LEGAL', links: ['Terms', 'Privacy', 'Security'] },
                   { title: 'CONNECT', links: ['Twitter', 'Discord', 'Github'] }
                ].map((col) => (
                   <div key={col.title} className="space-y-8">
                      <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">{col.title}</h4>
                      <ul className="space-y-4">
                         {col.links.map(link => (
                            <li key={link}>
                               <Link href="#" className="text-sm font-black text-muted-foreground hover:text-white transition-colors uppercase tracking-widest leading-loose">{link}</Link>
                            </li>
                         ))}
                      </ul>
                   </div>
                ))}
             </div>
          </div>

          <div className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.8em] opacity-30">
              © 2026 DRIVING FREE ACADEMIC LAB • DUBAI (UAE)
            </div>
            <div className="flex items-center gap-8">
               <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all cursor-pointer">
                  <Globe className="h-5 w-5" />
               </div>
               <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all cursor-pointer">
                  <ShieldCheck className="h-5 w-5" />
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}