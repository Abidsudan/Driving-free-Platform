"use client"

import { useState, useMemo } from "react"
import { 
  ShieldAlert, Info, AlertTriangle, Navigation, TrafficCone, 
  ListChecks, Activity, Zap, ShieldCheck, Search, ChevronUp,
  MapPin, CircleSlash, ArrowDownToLine, ArrowLeftRight, HelpCircle,
  Construction, Timer, ParkingCircle, Ban, ArrowBigLeft,
  Scan, Crosshair, Cpu, Database
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

// Enhanced Sign Data Structure with Refined Tech-Colors
const TRAFFIC_SIGNS_DATA = (language: 'ar' | 'en') => [
  {
    id: "reg-1",
    category: "regulatory",
    subCategory: "MANDATORY",
    name: { ar: "قف", en: "STOP" },
    desc: { ar: "يجب التوقف تماماً عند خط الوقوف لثلاث ثوانٍ على الأقل.", en: "Must come to a complete stop at the stop line for at least 3 seconds." },
    color: "hsl(0, 100%, 65%)", // Vibrant Red
    icon: ShieldAlert,
    priority: "CRITICAL"
  },
  {
    id: "reg-2",
    category: "regulatory",
    subCategory: "MANDATORY",
    name: { ar: "إفسح الطريق", en: "GIVE WAY" },
    desc: { ar: "إعطاء الأولوية للقادم من الطريق الرئيسي.", en: "Give priority to traffic on the main road." },
    color: "hsl(38, 100%, 60%)", // Electrical Amber
    icon: AlertTriangle,
    priority: "HIGH"
  },
  {
    id: "reg-3",
    category: "regulatory",
    subCategory: "PROHIBITORY",
    name: { ar: "ممنوع الدخول", en: "NO ENTRY" },
    desc: { ar: "يُحظر الدخول في هذا الاتجاه نهائياً.", en: "Entry in this direction is strictly prohibited." },
    color: "hsl(0, 100%, 60%)",
    icon: Ban,
    priority: "STRICT"
  },
  {
    id: "reg-4",
    category: "regulatory",
    subCategory: "PROHIBITORY",
    name: { ar: "ممنوع الوقوف", en: "NO PARKING" },
    desc: { ar: "ممنوع الوقوف في هذا المكان باستثناء حالات معينة.", en: "No parking permitted here except in specific conditions." },
    color: "hsl(217, 91%, 60%)", // Tech Blue
    icon: CircleSlash,
    priority: "MODERATE"
  },
  {
    id: "warn-1",
    category: "warning",
    subCategory: "HAZARD",
    name: { ar: "منعطف حاد لليسار", en: "SHARP BEND LEFT" },
    desc: { ar: "تحذير من وجود منعطف حاد يتطلب خفض السرعة.", en: "Warning of a sharp bend requiring reduced speed." },
    color: "hsl(45, 100%, 55%)",
    icon: ArrowBigLeft,
    priority: "CAUTION"
  },
  {
    id: "warn-2",
    category: "warning",
    subCategory: "HAZARD",
    name: { ar: "أعمال طريق", en: "ROAD WORKS" },
    desc: { ar: "انتبه لوجود أعمال صيانة أو إنشاءات أمامك.", en: "Watch out for road maintenance or construction ahead." },
    color: "hsl(30, 100%, 60%)",
    icon: Construction,
    priority: "OPERATIONAL"
  },
  {
    id: "warn-3",
    category: "warning",
    subCategory: "HAZARD",
    name: { ar: "مطبات صناعية", en: "SPEED HUMPS" },
    desc: { ar: "خفف السرعة لوجود مطبات للتحكم في السرعة.", en: "Reduce speed for traffic calming humps." },
    color: "hsl(35, 100%, 58%)",
    icon: ArrowDownToLine,
    priority: "PHYSICAL"
  },
  {
    id: "guide-1",
    category: "guide",
    subCategory: "INFORMATION",
    name: { ar: "موقف سيارات", en: "PARKING" },
    desc: { ar: "منطقة مخصصة لوقوف المركبات.", en: "Designated area for vehicle parking." },
    color: "hsl(220, 100%, 65%)",
    icon: ParkingCircle,
    priority: "STATIC"
  },
  {
    id: "guide-2",
    category: "guide",
    subCategory: "SERVICES",
    name: { ar: "محطة وقود", en: "PETROL STATION" },
    desc: { ar: "محطة قريبة للتزود بالوقود.", en: "Nearby facility for fueling your vehicle." },
    color: "hsl(160, 100%, 50%)", // Emerald Green
    icon: Timer,
    priority: "ESSENTIAL"
  },
  {
    id: "guide-3",
    category: "guide",
    subCategory: "EMERGENCY",
    name: { ar: "مخرج طوارئ", en: "EMERGENCY EXIT" },
    desc: { ar: "مسار مخصص للخروج في حالات الطوارئ.", en: "Dedicated path for emergency egress." },
    color: "hsl(140, 100%, 60%)",
    icon: MapPin,
    priority: "LIFE-SAVING"
  },
  {
    id: "road-1",
    category: "road",
    subCategory: "MARKINGS",
    name: { ar: "خطوط متصلة", en: "SOLID LINES" },
    desc: { ar: "يمنع التجاوز أو تغيير المسار.", en: "Overtaking or lane changing is prohibited." },
    color: "hsl(180, 20%, 90%)", // Pale White/Tech
    icon: ArrowLeftRight,
    priority: "LINEAR"
  },
  {
    id: "road-2",
    category: "road",
    subCategory: "GEOMETRY",
    name: { ar: "أسهم التوجيه", en: "DIRECTIONAL ARROWS" },
    desc: { ar: "تحديد الاتجاهات المسموح بها لكل مسار.", en: "Defines allowed directions for each lane." },
    color: "hsl(180, 20%, 80%)",
    icon: Navigation,
    priority: "SPATIAL"
  }
]

export default function TrafficSignsPage() {
  const { language, dir } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const t = {
    title: language === 'ar' ? "دليل الإشارات والرموز المرورية" : "RESEARCH ACADEMY: TRAFFIC SIGNS",
    subtitle: language === 'ar' ? "تحليل تقني ومعماري للإشارات المرورية وأنظمة السلامة الذكية في دولة الإمارات" : "Advanced technical and architectural analysis of traffic signals and smart safety systems in the UAE.",
    badge: language === 'ar' ? "القاعدة المعرفية الشاملة" : "INTELLIGENT KNOWLEDGE BASE v2.4",
    searchPlaceholder: language === 'ar' ? "أدخل الكلمة المفتاحية للبحث..." : "Enter keyword to search sign database...",
    stats: [
      { num: "42", label: language === 'ar' ? "بروتوكول تنظيمي" : "REGULATORY", icon: ListChecks, color: "text-blue-500", glow: "shadow-blue-500/20" },
      { num: "66", label: language === 'ar' ? "تحذير استباقي" : "WARNING", icon: AlertTriangle, color: "text-accent", glow: "shadow-accent/20" },
      { num: "35", label: language === 'ar' ? "بيانات إرشادية" : "GUIDE", icon: Navigation, color: "text-emerald-500", glow: "shadow-emerald-500/20" },
      { num: "12", label: language === 'ar' ? "هندسة طريق" : "ROAD MARKS", icon: TrafficCone, color: "text-slate-400", glow: "shadow-slate-400/20" },
    ],
    tabs: {
      all: language === 'ar' ? "جميع البيانات" : "ALL DATA",
      regulatory: language === 'ar' ? "التنظيمية" : "REGULATORY",
      warning: language === 'ar' ? "التحذيرية" : "WARNING",
      guide: language === 'ar' ? "الإرشادية" : "GUIDE",
      road: language === 'ar' ? "علامات الطريق" : "ROAD MARKS",
    },
    sections: {
      regulatory: {
        title: language === 'ar' ? "الإشارات التنظيمية" : "Regulatory Systems",
        desc: language === 'ar' ? "تحدّد هذه الإشارات القوانين والالتزامات المرورية الصارمة." : "Logical constraints and legal imperatives defining road compliance.",
      },
      warning: {
        title: language === 'ar' ? "الإشارات التحذيرية" : "Preemptive Alerts",
        desc: language === 'ar' ? "تنبيه السائقين لمخاطر محتملة تتطلب الانتباه والحذر." : "Proactive hazard detection signatures for environmental awareness.",
      },
      guide: {
        title: language === 'ar' ? "الإشارات الإرشادية" : "Navigation Nodes",
        desc: language === 'ar' ? "توجّه السائقين نحو الوجهات والخدمات الأساسية." : "Spatial guidance vectors and essential infrastructure information.",
      },
      road: {
        title: language === 'ar' ? "علامات الطريق" : "Geometric Markings",
        desc: language === 'ar' ? "توضّح حدود القيادة والأسهم الإرشادية على سطح الطريق." : "Surface topography markers and lane delimitation geometry.",
      }
    }
  }

  const signs = useMemo(() => TRAFFIC_SIGNS_DATA(language), [language])

  const filteredSigns = useMemo(() => {
    return signs.filter(sign => {
      const matchesSearch = 
        sign.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.desc[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTab = activeTab === "all" || sign.category === activeTab
      return matchesSearch && matchesTab
    })
  }, [signs, searchQuery, activeTab, language])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden pt-32 pb-40">
      {/* Dynamic Background Architecture */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 blur-[200px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 blur-[250px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent bg-[length:100%_4px] animate-scanline pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Academic Hero Header */}
        <div className="max-w-5xl mx-auto text-center space-y-12 mb-32 animate-reveal-up">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full glass-card border-white/10 text-[11px] font-black tracking-[0.6em] text-primary uppercase group cursor-default">
            <Cpu className="h-4 w-4 animate-spin-slow group-hover:text-accent transition-colors" />
            <span className="opacity-80">{t.badge}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>
          
          <div className="relative">
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-10 filter blur-2xl flex gap-10 pointer-events-none">
                <Scan className="h-40 w-40 text-primary" />
             </div>
             <h1 className="text-6xl md:text-9xl font-black font-headline tracking-tighter leading-[0.8] smart-gradient-text uppercase">
               {t.title}
             </h1>
          </div>
          
          <p className="text-xl md:text-3xl text-muted-foreground font-light max-w-4xl mx-auto leading-relaxed border-l-2 border-primary/20 pl-8 italic">
            "{t.subtitle}"
          </p>

          <div className="flex justify-center gap-8 text-[10px] font-black tracking-widest text-primary/40 uppercase">
             <div className="flex items-center gap-2"><Database className="h-3 w-3" /> INFRASTRUCTURE LAYER 01</div>
             <div className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> RTA PROTOCOL 8.4</div>
          </div>
        </div>

        {/* Lab Stats Interface */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-40 animate-reveal-up delay-100">
          {t.stats.map((stat, i) => (
            <div key={i} className={cn(
              "glass-card p-10 rounded-[3rem] border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden",
              stat.glow
            )}>
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                 <Crosshair className="h-12 w-12" />
              </div>
              <div className={cn("p-5 rounded-3xl w-fit mb-8 bg-secondary/50 group-hover:bg-primary group-hover:text-black transition-all border border-white/5", stat.color)}>
                <stat.icon className="h-10 w-10" />
              </div>
              <div className="text-6xl font-black tracking-tighter smart-gradient-text mb-4 group-hover:scale-110 transition-transform origin-left">
                {stat.num}
              </div>
              <div className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.4em] opacity-60">
                {stat.label}
              </div>
              <div className="mt-4 flex gap-1 opacity-20">
                 {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="h-1 w-4 bg-white/20 rounded-full" />
                 ))}
              </div>
            </div>
          ))}
        </div>

        {/* Futuristic Search & Control Center */}
        <div className="sticky top-24 z-50 max-w-6xl mx-auto mb-32 px-4 group">
          <div className="glass-card p-6 rounded-[4rem] border-white/10 shadow-2xl backdrop-blur-[100px] flex flex-col xl:flex-row gap-8 items-center ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all">
            <div className="relative w-full xl:flex-1">
              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-3">
                 <div className="w-1 h-6 bg-primary rounded-full animate-pulse" />
                 <Search className="h-6 w-6 text-primary" />
              </div>
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={cn(
                  "h-20 bg-white/5 border-none rounded-full text-xl font-medium tracking-tight placeholder:text-white/20 focus-visible:ring-0 transition-all",
                  dir === 'rtl' ? "pr-20 pl-8 text-right" : "pl-20 pr-8"
                )}
              />
              <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:block">
                 <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-black text-[9px] tracking-widest px-4 py-1">
                   {filteredSigns.length} RESULTS
                 </Badge>
              </div>
            </div>
            
            <div className="w-px h-12 bg-white/10 hidden xl:block" />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full xl:w-auto">
              <TabsList className="h-20 bg-black/20 p-2 gap-3 rounded-full border border-white/5">
                {Object.entries(t.tabs).map(([key, label]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="h-full px-12 rounded-full font-black text-[10px] tracking-[0.2em] uppercase data-[state=active]:bg-primary data-[state=active]:text-black transition-all hover:bg-white/5 active:scale-95"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Cinematic Signs Explorer */}
        <div className="space-y-48">
          {['regulatory', 'warning', 'guide', 'road'].map((category) => {
            const categorySigns = filteredSigns.filter(s => s.category === category)
            if (categorySigns.length === 0 && activeTab !== "all") return null

            return (
              <section key={category} id={category} className="animate-reveal-up relative">
                {/* Section Header with Tech Line */}
                <div className="max-w-5xl mb-24 relative">
                  <div className="absolute -left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-transparent to-transparent opacity-20" />
                  <div className="flex items-center gap-6 mb-8 group cursor-default">
                     <div className="h-px w-24 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                     <span className="text-primary font-black text-[11px] tracking-[0.5em] uppercase opacity-50 flex items-center gap-3">
                        <Scan className="h-3 w-3" /> CATEGORY IDENTIFIED
                     </span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter uppercase mb-6 smart-gradient-text leading-tight">
                    {t.sections[category as keyof typeof t.sections].title}
                  </h2>
                  <p className="text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl opacity-60">
                    {t.sections[category as keyof typeof t.sections].desc}
                  </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                  {categorySigns.map((sign, idx) => (
                    <div key={sign.id} className="group relative glass-card p-1.5 rounded-[3.5rem] border-white/5 hover:border-primary/40 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/10">
                      <div className="relative h-full bg-[#080808] rounded-[3.3rem] p-12 flex flex-col items-center justify-between text-center min-h-[500px] overflow-hidden">
                        
                        {/* Background Data Mask */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700">
                           <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                        </div>

                        {/* Sign Visual Architecture */}
                        <div className="relative mb-16 transform group-hover:scale-105 transition-transform duration-700">
                           <div className="absolute inset-0 blur-[60px] opacity-20 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: sign.color }} />
                           <div className="relative p-12 rounded-[50%_20%_50%_20%] border-2 border-white/10 group-hover:border-primary/50 group-hover:rounded-full transition-all duration-700 shadow-2xl backdrop-blur-2xl bg-black/20">
                              <sign.icon className="h-24 w-24 filter drop-shadow-lg" style={{ color: sign.color }} />
                           </div>
                           
                           {/* Priority Tag HUD */}
                           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md">
                              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sign.color }} />
                              <span className="text-[9px] font-black tracking-[0.2em] text-white/50 uppercase">{sign.priority}</span>
                           </div>
                        </div>

                        <div className="space-y-6 w-full relative z-10">
                           <Badge variant="outline" className="mb-4 bg-white/5 border-white/10 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-1.5 group-hover:bg-primary group-hover:text-black transition-all">
                              {sign.subCategory}
                           </Badge>
                           <h3 className="text-3xl font-black font-headline tracking-tighter leading-tight group-hover:text-primary transition-colors mb-2">
                              {sign.name[language]}
                           </h3>
                           <p className="text-sm text-muted-foreground font-light leading-relaxed opacity-60 line-clamp-4 group-hover:opacity-100 transition-opacity">
                              {sign.desc[language]}
                           </p>
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/5 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                           <div className="flex gap-1">
                              {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-primary/20 rounded-full" />)}
                           </div>
                           <button className="flex items-center gap-3 text-[11px] font-black text-primary uppercase tracking-[0.4em] hover:text-white transition-colors">
                             <HelpCircle className="h-4 w-4" />
                             {language === 'ar' ? 'توصيف فني' : 'TECHNICAL SPECS'}
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {categorySigns.length === 0 && (
                    <div className="col-span-full py-60 text-center space-y-12 glass-card rounded-[5rem] border-dashed border-white/10 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30" />
                       <Search className="h-24 w-24 text-primary/20 mx-auto animate-pulse" />
                       <div className="space-y-4 relative z-10">
                          <p className="text-white/30 font-black tracking-[0.5em] text-2xl uppercase">
                            {language === 'ar' ? "لم يتم العثور على تطابقات" : "NULL SEARCH RESULT"}
                          </p>
                          <p className="text-muted-foreground font-mono text-sm opacity-40">Error: Database query returned 0 valid signatures.</p>
                       </div>
                    </div>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      {/* Floating Action HUD */}
      <button 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-12 right-12 z-[100] h-20 w-20 glass-card border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:bg-primary hover:text-black transition-all hover:scale-110 active:scale-95 group"
      >
        <ChevronUp className="h-10 w-10 group-hover:-translate-y-1 transition-transform" />
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent animate-ping opacity-75" />
      </button>

      {/* RTA Academic Disclaimer */}
      <div className="container mx-auto px-6 mt-60 mb-20">
        <div className="glass-card p-20 rounded-[5rem] border-primary/20 relative overflow-hidden flex flex-col lg:flex-row gap-20 items-center">
          <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-primary/5 blur-[120px] -mr-32" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <div className="relative group">
             <div className="absolute inset-0 bg-primary blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
             <div className="p-12 bg-primary/10 rounded-[4.5rem] border border-primary/20 relative backdrop-blur-3xl">
                <ShieldCheck className="h-32 w-32 text-primary" />
             </div>
          </div>

          <div className="space-y-10 relative z-10 text-center lg:text-left flex-1">
            <div className="space-y-4">
               <h4 className="text-5xl md:text-7xl font-black font-headline tracking-tighter uppercase smart-gradient-text">
                 {language === 'ar' ? 'معايير هيئة الطرق والمواصلات' : 'RTA DATA INTEGRITY'}
               </h4>
               <div className="h-1 w-32 bg-accent rounded-full mx-auto lg:mx-0 shadow-[0_0_10px_rgba(255,165,0,0.5)]" />
            </div>
            
            <p className="text-2xl text-muted-foreground font-light leading-relaxed opacity-80 max-w-4xl italic">
              {language === 'ar' 
                ? 'تم تصميم هذا الدليل وفقاً لأحدث المخططات والمعايير الصادرة عن هيئة الطرق والمواصلات في دبي. يرجى الملاحظة أن هذه المعلومات إرشادية ويجب الرجوع دائماً للوائح المباشرة.' 
                : 'Structural representation and schematic documentation synthesized from RTA Dubai regulatory protocols. This curriculum serves as a technical baseline for behavioral assessment and infrastructure awareness.'}
            </p>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
               {[
                 { label: "CERTIFIED DATA", icon: Database },
                 { label: "CRYPTO-SYNC", icon: Zap },
                 { label: "LAB READY", icon: Cpu }
               ].map(tag => (
                 <span key={tag.label} className="text-[11px] font-black text-primary px-8 py-3 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-[0.4em] flex items-center gap-3">
                   <tag.icon className="h-3 w-3" />
                   {tag.label}
                 </span>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
