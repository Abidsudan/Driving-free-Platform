"use client"

import { useState, useMemo } from "react"
import { 
  ShieldAlert, Info, AlertTriangle, Navigation, TrafficCone, 
  ListChecks, Activity, Zap, ShieldCheck, Search, ChevronUp,
  MapPin, CircleSlash, ArrowDownToLine, ArrowLeftRight, HelpCircle,
  Construction, Timer, ParkingCircle, Ban, ArrowBigLeft
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

// Comprehensive Sign Data Structure
const TRAFFIC_SIGNS_DATA = (language: 'ar' | 'en') => [
  // REGULATORY SIGNS
  {
    id: "reg-1",
    category: "regulatory",
    subCategory: "mandatory",
    name: { ar: "قف", en: "STOP" },
    desc: { ar: "يجب التوقف تماماً عند خط الوقوف لثلاث ثوانٍ على الأقل.", en: "Must come to a complete stop at the stop line for at least 3 seconds." },
    color: "#ef4444",
    icon: ShieldAlert
  },
  {
    id: "reg-2",
    category: "regulatory",
    subCategory: "mandatory",
    name: { ar: "إفسح الطريق", en: "GIVE WAY" },
    desc: { ar: "إعطاء الأولوية للقادم من الطريق الرئيسي.", en: "Give priority to traffic on the main road." },
    color: "#eab308",
    icon: AlertTriangle
  },
  {
    id: "reg-3",
    category: "regulatory",
    subCategory: "prohibitory",
    name: { ar: "ممنوع الدخول", en: "NO ENTRY" },
    desc: { ar: "يُحظر الدخول في هذا الاتجاه نهائياً.", en: "Entry in this direction is strictly prohibited." },
    color: "#ef4444",
    icon: Ban
  },
  {
    id: "reg-4",
    category: "regulatory",
    subCategory: "prohibitory",
    name: { ar: "ممنوع الوقوف", en: "NO PARKING" },
    desc: { ar: "ممنوع الوقوف في هذا المكان باستثناء حالات معينة.", en: "No parking permitted here except in specific conditions." },
    color: "#ef4444",
    icon: CircleSlash
  },
  // WARNING SIGNS
  {
    id: "warn-1",
    category: "warning",
    subCategory: "hazard",
    name: { ar: "منعطف حاد لليسار", en: "SHARP BEND LEFT" },
    desc: { ar: "تحذير من وجود منعطف حاد يتطلب خفض السرعة.", en: "Warning of a sharp bend requiring reduced speed." },
    color: "#eab308",
    icon: ArrowBigLeft
  },
  {
    id: "warn-2",
    category: "warning",
    subCategory: "hazard",
    name: { ar: "أعمال طريق", en: "ROAD WORKS" },
    desc: { ar: "انتبه لوجود أعمال صيانة أو إنشاءات أمامك.", en: "Watch out for road maintenance or construction ahead." },
    color: "#eab308",
    icon: Construction
  },
  {
    id: "warn-3",
    category: "warning",
    subCategory: "hazard",
    name: { ar: "مطبات صناعية", en: "SPEED HUMPS" },
    desc: { ar: "خفف السرعة لوجود مطبات للتحكم في السرعة.", en: "Reduce speed for traffic calming humps." },
    color: "#eab308",
    icon: ArrowDownToLine
  },
  // GUIDE SIGNS
  {
    id: "guide-1",
    category: "guide",
    subCategory: "info",
    name: { ar: "موقف سيارات", en: "PARKING" },
    desc: { ar: "منطقة مخصصة لوقوف المركبات.", en: "Designated area for vehicle parking." },
    color: "#3b82f6",
    icon: ParkingCircle
  },
  {
    id: "guide-2",
    category: "guide",
    subCategory: "info",
    name: { ar: "محطة وقود", en: "PETROL STATION" },
    desc: { ar: "محطة قريبة للتزود بالوقود.", en: "Nearby facility for fueling your vehicle." },
    color: "#3b82f6",
    icon: Timer
  },
  {
    id: "guide-3",
    category: "guide",
    subCategory: "info",
    name: { ar: "مخرج طوارئ", en: "EMERGENCY EXIT" },
    desc: { ar: "مسار مخصص للخروج في حالات الطوارئ.", en: "Dedicated path for emergency egress." },
    color: "#22c55e",
    icon: MapPin
  },
  // ROAD SIGNS
  {
    id: "road-1",
    category: "road",
    subCategory: "markings",
    name: { ar: "خطوط متصلة", en: "SOLID LINES" },
    desc: { ar: "يمنع التجاوز أو تغيير المسار.", en: "Overtaking or lane changing is prohibited." },
    color: "#ffffff",
    icon: ArrowLeftRight
  },
  {
    id: "road-2",
    category: "road",
    subCategory: "markings",
    name: { ar: "أسهم التوجيه", en: "DIRECTIONAL ARROWS" },
    desc: { ar: "تحديد الاتجاهات المسموح بها لكل مسار.", en: "Defines allowed directions for each lane." },
    color: "#ffffff",
    icon: Navigation
  }
]

export default function TrafficSignsPage() {
  const { language, dir } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const t = {
    title: language === 'ar' ? "دليل الإشارات والرموز المرورية" : "TRAFFIC SIGNS & SYMBOLS GUIDE",
    subtitle: language === 'ar' ? "الدليل الشامل لجميع الإشارات والعلامات المرورية المعتمدة في دولة الإمارات العربية المتحدة" : "The comprehensive guide to all official traffic signs and markings in the UAE",
    badge: language === 'ar' ? "يحتوي على أكثر من 170 إشارة ورمز مروري" : "COMPREHENSIVE 170+ DATABASE",
    searchPlaceholder: language === 'ar' ? "ابحث عن إشارة أو رمز..." : "Search signs or symbols...",
    stats: [
      { num: "42", label: language === 'ar' ? "إشارة تنظيمية" : "REGULATORY", icon: ListChecks, color: "text-blue-500" },
      { num: "66", label: language === 'ar' ? "إشارة تحذيرية" : "WARNING", icon: AlertTriangle, color: "text-amber-500" },
      { num: "35", label: language === 'ar' ? "إشارة إرشادية" : "GUIDE", icon: Navigation, color: "text-green-500" },
      { num: "12", label: language === 'ar' ? "علامة طرق" : "ROAD MARKS", icon: TrafficCone, color: "text-slate-500" },
    ],
    tabs: {
      all: language === 'ar' ? "الكل" : "ALL",
      regulatory: language === 'ar' ? "التنظيمية" : "REGULATORY",
      warning: language === 'ar' ? "التحذيرية" : "WARNING",
      guide: language === 'ar' ? "الإرشادية" : "GUIDE",
      road: language === 'ar' ? "علامات الطريق" : "ROAD MARKS",
    },
    sections: {
      regulatory: {
        title: language === 'ar' ? "الإشارات التنظيمية" : "Regulatory Signs",
        desc: language === 'ar' ? "تحدّد هذه الإشارات القوانين والالتزامات المرورية الصارمة." : "These signs define strict traffic laws and obligations.",
      },
      warning: {
        title: language === 'ar' ? "الإشارات التحذيرية" : "Warning Signs",
        desc: language === 'ar' ? "تنبيه السائقين لمخاطر محتملة تتطلب الانتباه والحذر." : "Alerting drivers to potential hazards requiring attention.",
      },
      guide: {
        title: language === 'ar' ? "الإشارات الإرشادية" : "Guide Signs",
        desc: language === 'ar' ? "توجّه السائقين نحو الوجهات والخدمات الأساسية." : "Directing drivers towards key destinations and services.",
      },
      road: {
        title: language === 'ar' ? "علامات الطريق" : "Road Markings",
        desc: language === 'ar' ? "توضّح حدود القيادة والأسهم الإرشادية على سطح الطريق." : "Clarifying driving boundaries and guidance arrows on road surface.",
      }
    }
  }

  const signs = useMemo(() => TRAFFIC_SIGNS_DATA(language), [language])

  const filteredSigns = useMemo(() => {
    return signs.filter(sign => {
      const matchesSearch = 
        sign.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.desc[language].toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTab = activeTab === "all" || sign.category === activeTab
      return matchesSearch && matchesTab
    })
  }, [signs, searchQuery, activeTab, language])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-primary/30 overflow-x-hidden pt-20 pb-40">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-24 animate-reveal-up">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card border-white/10 text-[10px] font-black tracking-[0.5em] text-primary uppercase">
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            {t.badge}
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] smart-gradient-text">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto opacity-70">
            {t.subtitle}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-32 animate-reveal-up delay-200">
          {t.stats.map((stat, i) => (
            <div key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={cn("p-4 rounded-2xl w-fit mx-auto mb-6 bg-secondary/40 group-hover:bg-primary group-hover:text-black transition-all", stat.color)}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-5xl font-black smart-gradient-text mb-2">{stat.num}</div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter Container */}
        <div className="sticky top-24 z-50 max-w-5xl mx-auto animate-reveal-up delay-400 mb-20 px-4">
          <div className="glass-card p-4 rounded-[3rem] border-white/10 shadow-2xl backdrop-blur-3xl flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={cn(
                  "h-16 bg-white/5 border-white/5 rounded-full text-lg focus:ring-primary/20 transition-all",
                  dir === 'rtl' ? "pr-12 pl-6" : "pl-14 pr-6"
                )}
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="h-16 bg-transparent p-0 gap-2">
                {Object.entries(t.tabs).map(([key, label]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="h-full px-8 rounded-full font-black text-[10px] tracking-widest uppercase data-[state=active]:bg-primary data-[state=active]:text-black transition-all"
                  >
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Signs Grid Explorer */}
        <div className="space-y-32">
          {['regulatory', 'warning', 'guide', 'road'].map((category) => {
            const categorySigns = filteredSigns.filter(s => s.category === category)
            if (categorySigns.length === 0 && activeTab !== "all") return null

            return (
              <section key={category} id={category} className="animate-reveal-up">
                <div className="max-w-4xl mb-16 space-y-4">
                  <div className="h-1 w-20 bg-primary rounded-full mb-8 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                  <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tight uppercase">
                    {t.sections[category as keyof typeof t.sections].title}
                  </h2>
                  <p className="text-xl text-muted-foreground font-medium opacity-60">
                    {t.sections[category as keyof typeof t.sections].desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {categorySigns.map((sign, idx) => (
                    <div key={sign.id} className="group relative glass-card p-1 rounded-[2.5rem] border-white/5 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-full bg-[#0a0a0a] rounded-[2.3rem] p-10 flex flex-col items-center justify-between text-center min-h-[420px]">
                        {/* Sign Visual Representation */}
                        <div className="relative mb-12 transform group-hover:scale-110 transition-transform duration-700">
                           <div className="absolute inset-0 blur-[40px] opacity-20 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: sign.color }} />
                           <div className="relative p-10 rounded-full border-4 border-white/10 group-hover:border-primary/50 transition-colors shadow-2xl backdrop-blur-xl">
                              <sign.icon className="h-20 w-20" style={{ color: sign.color }} />
                           </div>
                           <div className="mt-4 flex gap-1 justify-center italic opacity-20 group-hover:opacity-40 transition-opacity">
                              <div className="w-10 h-1 rounded-full bg-white/40" />
                              <div className="w-4 h-1 rounded-full bg-white/40" />
                           </div>
                        </div>

                        <div className="space-y-4 w-full">
                           <Badge variant="outline" className="mb-2 bg-white/5 border-white/10 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1">
                              {sign.subCategory}
                           </Badge>
                           <h3 className="text-2xl font-black font-headline tracking-tighter leading-tight group-hover:text-primary transition-colors">
                              {sign.name[language]}
                           </h3>
                           <p className="text-sm text-muted-foreground font-medium leading-relaxed opacity-60 line-clamp-3">
                              {sign.desc[language]}
                           </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                           <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                             <HelpCircle className="h-3 w-3" />
                             {language === 'ar' ? 'تفاصيل أكثر' : 'VIEW DETAILS'}
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {categorySigns.length === 0 && (
                    <div className="col-span-full py-40 text-center space-y-6 glass-card rounded-[4rem] border-dashed border-white/5">
                       <Search className="h-16 w-16 text-muted-foreground mx-auto opacity-20" />
                       <p className="text-muted-foreground font-medium tracking-widest text-lg uppercase opacity-40">
                         {language === 'ar' ? "لا توجد نتائج مطابقة" : "No signs match your search"}
                       </p>
                    </div>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-10 right-10 z-[100] h-16 w-16 glass-card border-primary/20 rounded-full flex items-center justify-center text-primary shadow-2xl hover:bg-primary hover:text-black transition-all hover:scale-110 active:scale-90 animate-bounce-slow"
      >
        <ChevronUp className="h-8 w-8" />
      </button>

      {/* RTA Disclaimer */}
      <div className="container mx-auto px-6 mt-40">
        <div className="glass-card p-12 rounded-[4rem] border-primary/20 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32" />
          <div className="p-8 bg-primary/10 rounded-[3rem] border border-primary/20">
             <ShieldCheck className="h-20 w-20 text-primary" />
          </div>
          <div className="space-y-6 relative z-10 text-center lg:text-left">
            <h4 className="text-4xl font-black font-headline tracking-tighter uppercase smart-gradient-text">
              {language === 'ar' ? 'معايير هيئة الطرق والمواصلات' : 'OFFICIAL RTA STANDARDS'}
            </h4>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl opacity-80">
              {language === 'ar' 
                ? 'تم تصميم هذا الدليل وفقاً لأحدث المخططات والمعايير الصادرة عن هيئة الطرق والمواصلات في دبي. يرجى الملاحظة أن هذه المعلومات إرشادية ويجب الرجوع دائماً للوائح المباشرة.' 
                : 'This guide is curated based on the latest RTA Dubai specifications. These icons and descriptions are for educational purposes to ensure maximum safety and regulatory compliance during driving tests.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
               {["CERTIFIED DATA", "REAL-TIME SYNC", "EXAM READY"].map(tag => (
                 <span key={tag} className="text-[10px] font-black text-primary px-6 py-2 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-[0.3em]">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


