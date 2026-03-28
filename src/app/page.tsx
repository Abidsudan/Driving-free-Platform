"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { BookOpen, ShieldCheck, ClipboardCheck, ArrowLeft, ArrowRight, Star, GraduationCap, Zap, Trophy, MousePointer2, Beaker, Microchip, Activity, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const { language, dir } = useLanguage()
  const heroBg = PlaceHolderImages.find(img => img.id === "hero-bg")

  const t = {
    heroBadge: language === 'ar' ? "بروتوكول تدريب عصبي-معرفي معتمد | RTA-LAB-SYNC" : "Certified Neuro-Cognitive Protocol | RTA-LAB-SYNC",
    heroTitle: language === 'ar' ? "هندسة السائق المحترف عبر البحث العلمي" : "Engineering Professional Drivers through Science",
    heroDesc: language === 'ar' ? "المختبر الأول في دبي لتحويل الخبرة الميدانية إلى خوارزميات تعليمية تضمن استجابة عصبية دقيقة ونجاحاً من المحاولة الأولى." : "Dubai's premier lab transforming field experience into educational algorithms for precise neural response and first-attempt success.",
    btnStart: language === 'ar' ? "إطلاق المسار الأكاديمي" : "Launch Academic Pathway",
    btnAssessment: language === 'ar' ? "مختبر محاكاة المخاطر" : "Hazard Simulation Lab",
    stats: [
      { num: "100%", label: language === 'ar' ? "دقة البيانات" : "Data Accuracy", icon: ShieldCheck },
      { num: "98.4%", label: language === 'ar' ? "معدل النجاح" : "Success Rate", icon: Trophy },
      { num: "5K+", label: language === 'ar' ? "ساعات تحليل" : "Analysis Hours", icon: Activity },
      { num: "OPEN", label: language === 'ar' ? "وصول أكاديمي" : "Academic Access", icon: Star },
    ],
    methodTitle: language === 'ar' ? "المنهج العلمي: من الميدان إلى المختبر" : "The Scientific Method: Field to Lab",
    methodDesc: language === 'ar' ? "نحن لا نعلم القيادة فحسب، بل نقوم بهندسة السلوك البشري خلف المقود." : "We don't just teach driving; we engineer human behavior behind the wheel.",
    diagnosticsTitle: language === 'ar' ? "التشخيصات المخبرية للطلاب" : "Student Lab Diagnostics",
    features: [
      {
        title: language === 'ar' ? "بروتوكولات التدريب المعرفي" : "Cognitive Training Protocols",
        desc: language === 'ar' ? "منهجية DRV-X المكونة من 6 مستويات لتشفير القواعد المرورية وفهم فيزياء المركبة." : "DRV-X 6-level methodology for encoding traffic rules and vehicle physics.",
        icon: Microchip,
        href: "/curriculum",
        color: "bg-blue-500/10 text-blue-500",
        code: "REF: ACAD-DRV-101"
      },
      {
        title: language === 'ar' ? "مستودع الأبحاث العلمية" : "Scientific Research Repository",
        desc: language === 'ar' ? "دراسات تقنية حول ديناميكيات الوزن، سيكولوجية الأزمات، وهندسة العوامل البشرية." : "Technical studies on weight dynamics, crisis psychology, and human factor engineering.",
        icon: Beaker,
        href: "/library",
        color: "bg-amber-500/10 text-amber-500",
        code: "REF: LIB-RES-404"
      },
      {
        title: language === 'ar' ? "محاكي الإدراك الذكي" : "Cognitive Perception Simulator",
        desc: language === 'ar' ? "بيئة افتراضية مدعومة بالذكاء الاصطناعي لتحليل سرعة رد الفعل واتخاذ القرار في أجزاء من الثانية." : "AI-powered virtual environment for analyzing reaction speed and split-second decision making.",
        icon: Activity,
        href: "/assessment",
        color: "bg-green-500/10 text-green-500",
        code: "REF: SIM-PERC-909"
      }
    ]
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        {heroBg?.imageUrl && (
          <Image 
            src={heroBg.imageUrl} 
            alt="Scientific Driving Context" 
            fill 
            className="object-cover opacity-20 scale-105 animate-pulse-slow"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        
        {/* Instrument Metadata Overlay */}
        <div className="absolute top-32 right-10 hidden lg:block opacity-20 font-code text-[10px] space-y-1">
          <div>SYSTEM_STATUS: ACTIVE</div>
          <div>CORE_SYNC: VERIFIED_BY_RTA_LAB</div>
          <div>LATENCY: 14MS</div>
          <div>TIMESTAMP: 2026.03.28</div>
        </div>

        <div className="container relative z-10 px-6 mx-auto text-center space-y-10">
          <div className="academic-badge animate-fade-in mx-auto glass-card flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {t.heroBadge}
          </div>
          
          <h1 className="text-5xl md:text-9xl font-black font-headline tracking-tighter max-w-6xl mx-auto leading-[0.85] smart-gradient-text">
            {t.heroTitle}
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium opacity-80 border-l-2 border-primary/20 pl-6 text-left inline-block">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <Link href="/curriculum" className="w-full sm:w-auto">
              <Button size="lg" className="h-20 px-16 rounded-[2rem] font-black text-xl bg-primary hover:bg-primary/90 shadow-[0_20px_80px_rgba(59,130,246,0.4)] w-full group overflow-hidden relative">
                <span className="relative z-10 flex items-center">
                  {t.btnStart}
                  <Zap className="ml-3 h-6 w-6 fill-current group-hover:scale-125 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </Link>
            <Link href="/assessment" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-20 px-16 rounded-[2rem] font-black text-xl glass-card border-white/10 w-full hover:bg-white/10 group">
                {t.btnAssessment}
                <Activity className="ml-3 h-6 w-6 group-hover:text-primary transition-colors" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar - Scientific Format */}
      <section className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 rounded-[4rem] glass-card border-white/10">
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2 group relative">
              <div className="absolute -top-4 -right-4 text-[8px] font-code opacity-20">METRIC_0{i+1}</div>
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

      {/* The Scientific Method Section */}
      <section className="container mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="academic-badge"><Beaker className="h-3 w-3" /> RESEARCH_PHASE_01</div>
          <h2 className="text-4xl md:text-7xl font-headline font-black tracking-tighter">{t.methodTitle}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">{t.methodDesc}</p>
          <div className="space-y-6">
            {[
              { t: "Data Acquisition", d: "Collecting 5000+ hours of RTA examiner patterns." },
              { t: "Neural Mapping", d: "Structuring curriculum to align with human learning curves." },
              { t: "Validation", d: "Simulating high-stress scenarios for split-second precision." }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="h-12 w-12 rounded-full border border-primary/30 flex items-center justify-center font-black text-primary shrink-0">0{i+1}</div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm mb-1">{step.t}</h4>
                  <p className="text-muted-foreground text-sm font-medium">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square rounded-[4rem] overflow-hidden glass-card border-primary/20 p-1">
          <div className="absolute inset-0 bg-primary/5 animate-pulse" />
          <div className="h-full w-full bg-black/40 rounded-[3.8rem] flex items-center justify-center">
            <Activity className="h-48 w-48 text-primary opacity-20 animate-float" />
            <div className="absolute bottom-10 left-10 right-10 p-6 glass-card rounded-3xl border-primary/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest">Neural Link Sync</span>
                <span className="text-[10px] font-code text-primary">98.4%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[98.4%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Elite Engineering Tone */}
      <section className="container mx-auto px-6 py-20 space-y-20 bg-primary/[0.02] rounded-[5rem]">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em]">
            SYSTEM_ARCHITECTURE
          </div>
          <h2 className="text-4xl md:text-7xl font-headline font-black tracking-tighter">{t.featuresTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.features.map((feature, i) => (
            <Link href={feature.href} key={i} className="group">
              <div className="h-full p-10 rounded-[3.5rem] glass-card border-white/5 hover:border-primary/40 transition-all duration-700 space-y-8 relative overflow-hidden">
                <div className="absolute top-6 right-8 font-code text-[8px] opacity-20">{feature.code}</div>
                <div className={cn("inline-flex p-5 rounded-2xl shadow-xl", feature.color)}>
                  <feature.icon className="h-10 w-10" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-headline font-black leading-tight group-hover:text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium opacity-70">{feature.desc}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs font-black text-primary group-hover:gap-5 transition-all uppercase tracking-widest">
                    {language === 'ar' ? 'بدء البروتوكول' : 'Initiate Protocol'}
                    {dir === 'rtl' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                  </div>
                  <BarChart3 className="h-4 w-4 text-muted-foreground opacity-30" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lab Diagnostics Section */}
      <section className="container mx-auto px-6 py-32 text-center space-y-16">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tighter">{t.diagnosticsTitle}</h2>
          <p className="text-muted-foreground font-medium">Real-time telemetry analysis of academic performance across the UAE.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { label: "Mean Perception Score", val: "84.2", unit: "P-INDEX" },
            { label: "IF Reduction Rate", val: "−68%", unit: "DELTA" },
            { label: "Active Research Nodes", val: "12", unit: "UNITS" }
          ].map((diag, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-card/20 border border-white/5 text-left space-y-4">
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{diag.label}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary">{diag.val}</span>
                <span className="text-[8px] font-code opacity-40">{diag.unit}</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full">
                <div className="h-full bg-primary/40 w-3/4 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-white/5 py-24 glass-card rounded-t-[4rem]">
        <div className="container mx-auto px-6 text-center space-y-10">
          <div className="bg-white rounded-2xl p-4 w-48 mx-auto shadow-2xl animate-float">
             <Image 
                src={PlaceHolderImages.find(img => img.id === "site-logo")?.imageUrl || ""} 
                alt="Driving Free Academe" 
                width={192}
                height={60}
                className="object-contain"
                unoptimized
              />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto font-bold text-lg leading-relaxed opacity-80 italic">
            "We don't just teach driving; we engineer the human-machine interface for maximum road safety."
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
            <span>© 2026 Driving Free Laboratory</span>
            <span className="hidden md:block text-primary">•</span>
            <span>Ref: UAE-DRV-CORE-V2</span>
            <span className="hidden md:block text-primary">•</span>
            <span>Academic Excellence</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
