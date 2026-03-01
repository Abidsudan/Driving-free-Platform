
'use client';

import Image from "next/image"
import Link from "next/link"
import { BookOpen, Library, GraduationCap, ChevronLeft, CircleCheckBig, ArrowUpRight, Target, Users, Clock, Shield, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

export default function Home() {
  const { language, dir } = useLanguage()
  const instructorImg = PlaceHolderImages.find(img => img.id === "instructor-hero")
  const logo = PlaceHolderImages.find(img => img.id === "site-logo")

  const t = {
    heroBadge: language === 'ar' ? "منصة تعليمية معتمدة وفق معايير RTA دبي" : "Certified platform following RTA Dubai standards",
    heroTitle: language === 'ar' ? "احترف القيادة" : "Master Driving",
    heroTitleSpan: language === 'ar' ? "بمنهج أكاديمي" : "Academically",
    heroDesc: language === 'ar' 
      ? "الأكاديمية الأولى في دبي التي تحول خبرة ميدانية عميقة إلى منهج علمي تفاعلي يضمن لك النجاح من المحاولة الأولى."
      : "Dubai's premier academy transforming deep field experience into a scientific interactive curriculum for first-attempt success.",
    btnStart: language === 'ar' ? "ابدأ رحلة التعلم" : "Start Learning",
    btnQuiz: language === 'ar' ? "خوض اختبار ذكاء RTA" : "Take AI RTA Test",
    statsConfidence: language === 'ar' ? "ثقة وأمان" : "Trust & Safety",
    statsExperience: language === 'ar' ? "خبرة تدريبية موثقة" : "Certified Experience",
    statsStudents: language === 'ar' ? "طلاب ناجحون في دبي" : "Successful Students in Dubai",
    statRta: language === 'ar' ? "منهج RTA المطور" : "Advanced RTA Curriculum",
    statAi: language === 'ar' ? "دقة محاكي الذكاء" : "AI Simulator Accuracy",
    statHours: language === 'ar' ? "ساعة تدريب ميداني" : "Field Training Hours",
    statGrads: language === 'ar' ? "خريج رخصة قيادة" : "Licensed Graduates",
    featureTitle: language === 'ar' ? "بوابتك لإتقان القيادة" : "Your Gateway to Driving Mastery",
    featureDesc: language === 'ar' ? "أدوات تعليمية رقمية صممت لتبسيط المفاهيم الفيزيائية والقواعد المعقدة لهيئة الطرق والمواصلات." : "Digital tools designed to simplify complex RTA rules and physical concepts.",
    exploreNow: language === 'ar' ? "استكشف الآن" : "Explore Now",
    footerDesc: language === 'ar' ? "نحن نؤمن أن القيادة ليست مجرد مهارة، بل هي علم يجمع بين الفيزياء والسلوك البشري لضمان حياة آمنة للجميع في دبي." : "We believe driving is not just a skill, but a science combining physics and human behavior for safe lives in Dubai.",
    footerRights: language === 'ar' ? "© 2026 Driving Free • دبي ، الإمارات العربية المتحدة" : "© 2026 Driving Free • Dubai, UAE",
    footerStatus: language === 'ar' ? "النظام يعمل بكفاءة كاملة" : "System running at full capacity"
  }

  const sections = [
    { 
      title: language === 'ar' ? "المنهج الأكاديمي" : "Academic Curriculum", 
      desc: language === 'ar' ? "رحلة تعليمية منظمة من 4 مستويات تغطي كل ما تحتاجه من فحص المركبة إلى القيادة في الطرق السريعة." : "A structured 4-level journey covering everything from vehicle checks to highway driving.",
      icon: BookOpen,
      href: "/curriculum",
      color: "text-primary",
      bg: "bg-primary/10",
      accent: "border-primary/20"
    },
    { 
      title: language === 'ar' ? "المكتبة التقنية" : "Technical Library", 
      desc: language === 'ar' ? "مقالات علمية حصرية تتناول فيزياء كبح المركبات وسيكولوجية السائق تحت الضغط المروري." : "Exclusive scientific articles on vehicle braking physics and driver psychology under traffic pressure.",
      icon: Library,
      href: "/library",
      color: "text-accent",
      bg: "bg-accent/10",
      accent: "border-accent/20"
    },
    { 
      title: language === 'ar' ? "محاكي RTA الذكي" : "Smart RTA Simulator", 
      desc: language === 'ar' ? "نظام توليد أسئلة بالذكاء الاصطناعي يحاكي الاختبار النظري الحقيقي بدقة مذهلة." : "AI question generation system that accurately simulates the real theory test.",
      icon: GraduationCap,
      href: "/assessment",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      accent: "border-purple-500/20"
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 pt-16 md:pt-32 pb-24 animate-fade-in-up">
          <div className={cn("flex-1 space-y-10 text-center", dir === 'rtl' ? "lg:text-right" : "lg:text-left")}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold tracking-wide backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              {t.heroBadge}
            </div>
            
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter">
              {t.heroTitle} <br /> 
              <span className="text-gradient">{t.heroTitleSpan}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              {t.heroDesc}
            </p>
            
            <div className={cn("flex flex-col sm:flex-row items-center gap-6 justify-center", dir === 'rtl' ? "lg:justify-start" : "lg:justify-end")}>
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xl px-12 h-20 rounded-[2rem] shadow-2xl shadow-primary/40 group overflow-hidden relative">
                <Link href="/curriculum" className="flex items-center gap-3 relative z-10">
                  {t.btnStart} 
                  {dir === 'rtl' ? <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" /> : <ArrowUpRight className="h-6 w-6" />}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-xl px-12 h-20 rounded-[2rem] glass-card border-white/10 hover:bg-white/5 font-bold">
                <Link href="/assessment">{t.btnQuiz}</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative w-full aspect-square max-w-xl lg:max-w-none group">
            <div className="absolute inset-0 bg-primary/30 rounded-[4rem] blur-[80px] group-hover:bg-primary/40 transition-all duration-1000" />
            {instructorImg?.imageUrl && (
              <div className="relative z-10 w-full h-full overflow-hidden rounded-[4rem] border-2 border-white/20 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]">
                <Image 
                  src={instructorImg.imageUrl} 
                  alt="Professional Instructor" 
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  data-ai-hint="dubai driving instructor"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
            )}
            
            {/* Experience Floating Badge */}
            <div className={cn("absolute z-20 glass-card p-8 rounded-[2.5rem] border-white/20 animate-fade-in-up stagger-2 shadow-2xl shadow-black/50", dir === 'rtl' ? "-bottom-10 -left-10" : "-bottom-10 -right-10")}>
                <div className="flex items-center gap-5">
                    <div className="bg-accent p-4 rounded-2xl shadow-xl shadow-accent/30">
                        <Zap className="h-8 w-8 text-background" fill="currentColor" />
                    </div>
                    <div>
                        <span className="block text-4xl font-black text-accent tracking-tighter">{t.statsConfidence}</span>
                        <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">{t.statsExperience}</span>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 py-24 px-12 rounded-[4rem] glass-card border-white/10 mb-40 animate-fade-in-up stagger-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          {[
            { label: t.statRta, value: "100%", icon: CircleCheckBig, color: "text-primary" },
            { label: t.statAi, value: "98%", icon: Target, color: "text-accent" },
            { label: t.statHours, value: "5000+", icon: Clock, color: "text-indigo-400" },
            { label: t.statGrads, value: "1200+", icon: Users, color: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-4 group">
              <div className={cn("inline-flex p-4 rounded-3xl bg-white/5 transition-transform group-hover:scale-110 group-hover:rotate-6", stat.color)}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl md:text-6xl font-black font-headline tracking-tighter transition-all group-hover:text-primary">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Featured Sections */}
        <section className="space-y-24 pb-48">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter">{t.featureTitle}</h2>
            <p className="text-muted-foreground text-xl font-medium">{t.featureDesc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {sections.map((item, i) => (
              <Link key={i} href={item.href} className="group">
                <Card className={cn("h-full glass-card rounded-[3rem] overflow-hidden group-hover:translate-y-[-15px] transition-all duration-700", item.accent)}>
                  <CardContent className="p-12 space-y-10">
                    <div className={cn("p-6 rounded-[2.5rem] w-fit shadow-2xl transition-all duration-700 group-hover:rotate-12 group-hover:scale-110", item.bg, item.color)}>
                      <item.icon className="h-12 w-12" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-black group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg font-medium">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 text-primary font-black text-lg group-hover:gap-5 transition-all">
                      <span>{t.exploreNow}</span> 
                      {dir === 'rtl' ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 pt-32 pb-16 overflow-hidden bg-card/40 backdrop-blur-3xl">
        <div className="container mx-auto px-6 text-center space-y-16">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" className="flex flex-col items-center gap-4 group">
              <div className="relative flex items-center justify-center w-52 h-24 bg-white rounded-3xl transition-transform duration-500 group-hover:scale-105 p-3 shadow-2xl overflow-hidden">
                {logo?.imageUrl ? (
                  <Image 
                    src={logo.imageUrl} 
                    alt="Driving Free Official Logo" 
                    width={192}
                    height={96}
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <Shield className="h-16 w-16 text-primary" fill="currentColor" />
                )}
              </div>
              <span className="font-headline font-black text-4xl tracking-tighter">
                DRIVING FREE
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md font-medium">{t.footerDesc}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 text-sm font-black text-muted-foreground uppercase tracking-[0.4em]">
            <Link href="/curriculum" className="hover:text-primary transition-colors">{language === 'ar' ? "المنهج" : "Curriculum"}</Link>
            <Link href="/library" className="hover:text-primary transition-colors">{language === 'ar' ? "المكتبة" : "Library"}</Link>
            <Link href="/rules" className="hover:text-primary transition-colors">{language === 'ar' ? "القواعد" : "Rules"}</Link>
            <Link href="/assessment" className="hover:text-primary transition-colors">{language === 'ar' ? "التقييم" : "Assessment"}</Link>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
            <p>{t.footerRights}</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.footerStatus}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
