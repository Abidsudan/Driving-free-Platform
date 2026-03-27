"use client"

import { ShieldAlert, Info, AlertTriangle, CheckCircle, Navigation, TrafficCone, Layers, ListChecks, Activity, Zap, ShieldCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function TrafficSignsPage() {
  const { language, dir } = useLanguage()

  const t = {
    title: language === 'ar' ? "دليل الإشارات والرموز المرورية" : "Traffic Signs & Symbols Guide",
    subtitle: language === 'ar' ? "الدليل الشامل لجميع الإشارات والعلامات المرورية المعتمدة في دبي وفق معايير RTA" : "Comprehensive guide to all traffic signs and markings in Dubai per RTA standards",
    badge: language === 'ar' ? "يحتوي على أكثر من 170 إشارة ورمز مروري" : "Contains over 170 traffic signs and symbols",
    stats: [
      { num: "42", label: language === 'ar' ? "إشارة تنظيمية" : "Regulatory Signs", icon: ListChecks },
      { num: "66", label: language === 'ar' ? "إشارة تحذيرية" : "Warning Signs", icon: AlertTriangle },
      { num: "35", label: language === 'ar' ? "إشارة إرشادية" : "Guide Signs", icon: Navigation },
      { num: "12", label: language === 'ar' ? "علامة طرق" : "Road Markings", icon: TrafficCone },
    ],
    tabs: {
      failure: language === 'ar' ? "الرسوب الفوري" : "Instant Failure",
      dsssm: language === 'ar' ? "نظام DSSSM" : "DSSSM System",
      regulatory: language === 'ar' ? "التنظيمية" : "Regulatory",
      warning: language === 'ar' ? "التحذيرية" : "Warning",
      guide: language === 'ar' ? "الإرشادية" : "Guide",
      road: language === 'ar' ? "علامات الطريق" : "Road Signs",
    },
    regulatory: {
      title: language === 'ar' ? "الإشارات التنظيمية" : "Regulatory Signs",
      desc: language === 'ar' ? "تُستخدم هذه الإشارات لتنظيم حركة السير وتحديد الالتزامات والممنوعات." : "These signs are used to regulate traffic and define obligations and prohibitions.",
      items: language === 'ar' ? ["قف (STOP)", "إفسح الطريق", "ممنوع الدخول", "اتجاه إلزامي", "ممنوع الوقوف", "تجاوز السرعة القصوى"] : ["STOP", "Give Way", "No Entry", "Mandatory Direction", "No Parking", "Maximum Speed Limit"]
    },
    warning: {
      title: language === 'ar' ? "الإشارات التحذيرية" : "Warning Signs",
      desc: language === 'ar' ? "تنبيه السائقين إلى مخاطر محتملة على الطريق تتطلب الحذر الشديد." : "Alerting drivers to potential road hazards that require extreme caution.",
    },
    failure: {
      title: language === 'ar' ? "أسباب الرسوب الفوري" : "Instant Failure Reasons",
      items: [
        { title: language === 'ar' ? "عدم التوقف عند إشارة قف" : "Failure to stop at STOP sign", desc: language === 'ar' ? "يجب التوقف تماماً لثلاث ثوانٍ قبل خط الوقوف." : "Must come to a complete stop for 3 seconds before the stop line." },
        { title: language === 'ar' ? "أولوية الدوار" : "Roundabout Priority", desc: language === 'ar' ? "دخول الدوار دون إعطاء الأولوية للقادم من اليسار." : "Entering a roundabout without giving priority to traffic from the left." },
      ]
    }
  }

  return (
    <div className="container mx-auto px-6 py-20 space-y-32">
      <div className="space-y-8 max-w-4xl animate-reveal-up opacity-0 text-center mx-auto mb-20">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.5em] border border-primary/20">
          <Activity className="h-4 w-4 animate-pulse" />
          {language === 'ar' ? 'المكتبة المرورية' : 'TRAFFIC LIBRARY'}
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] smart-gradient-text">
          {t.title}
        </h1>
        <p className="text-2xl text-muted-foreground leading-relaxed font-medium opacity-80">
          {t.subtitle}
        </p>
        <div className="inline-block px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.3em] text-accent">
          {t.badge}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-reveal-up opacity-0 [animation-delay:0.2s]">
        {t.stats.map((stat, i) => (
          <div key={i} className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16" />
            <div className="p-4 bg-secondary/40 rounded-2xl w-fit mx-auto mb-6 group-hover:bg-primary group-hover:text-black transition-all">
              <stat.icon className="h-8 w-8" />
            </div>
            <span className="text-5xl font-black smart-gradient-text block mb-2">{stat.num}</span>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="animate-reveal-up opacity-0 [animation-delay:0.4s]">
        <Tabs defaultValue="regulatory" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-4 bg-black/40 p-4 rounded-[2.5rem] mb-20 border border-white/5 justify-center backdrop-blur-3xl">
            {[
              { id: "regulatory", label: t.tabs.regulatory, icon: ListChecks },
              { id: "warning", label: t.tabs.warning, icon: AlertTriangle },
              { id: "guide", label: t.tabs.guide, icon: Navigation },
              { id: "road", label: t.tabs.road, icon: TrafficCone },
              { id: "failure", label: t.tabs.failure, icon: ShieldAlert },
              { id: "dsssm", label: t.tabs.dsssm, icon: Info },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] data-[state=active]:bg-primary data-[state=active]:text-black flex items-center gap-3 transition-all active:scale-95"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="regulatory" className="animate-reveal-up outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-5xl font-headline font-black smart-gradient-text">{t.regulatory.title}</h2>
                  <p className="text-xl text-muted-foreground font-medium leading-relaxed opacity-80">
                    {t.regulatory.desc}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {t.regulatory.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] bg-secondary/40 border border-white/5 hover:border-primary/30 transition-all group">
                       <div className="h-3 w-3 rounded-full bg-primary group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                       <span className="font-black text-xs uppercase tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 group">
                <Image 
                  src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800" 
                  alt="Regulatory Signs" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-12 right-12 left-12 p-8 glass-card border-white/10 rounded-[2.5rem] backdrop-blur-3xl">
                   <p className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-2">Category Highlight</p>
                   <h4 className="text-2xl font-black font-headline">RTA REGULATORY BOARD</h4>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="failure" className="animate-reveal-up outline-none">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {t.failure.items.map((reason, i) => (
                  <div key={i} className="glass-card p-12 rounded-[4rem] border-red-500/20 relative group hover:border-red-500 transition-all">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] -mr-16 -mt-16" />
                     <div className="p-6 bg-red-500/10 rounded-3xl w-fit mb-8 group-hover:bg-red-500 group-hover:text-black transition-all">
                        <ShieldAlert className="h-10 w-10 text-red-500 group-hover:text-black" />
                     </div>
                     <h3 className="text-3xl font-black font-headline mb-4 tracking-tight">{reason.title}</h3>
                     <p className="text-xl text-muted-foreground font-medium leading-relaxed opacity-60">{reason.desc}</p>
                     <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4 text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">
                        <Zap className="h-4 w-4" /> AUTO-FAIL CRITERIA
                     </div>
                  </div>
                ))}
             </div>
          </TabsContent>

          <TabsContent value="warning" className="animate-reveal-up outline-none text-center py-20">
             <AlertTriangle className="h-24 w-24 text-accent mx-auto animate-float mb-8" />
             <h2 className="text-4xl font-black font-headline mb-4 uppercase tracking-tighter">{t.warning.title}</h2>
             <p className="text-xl text-muted-foreground font-medium opacity-60 max-w-2xl mx-auto leading-relaxed">{t.warning.desc}</p>
             <div className="mt-12 inline-block px-10 py-5 rounded-[2rem] glass-card border-accent/20 text-accent font-black text-sm uppercase tracking-[0.4em]">
                Database Syncing...
             </div>
          </TabsContent>
          
          <TabsContent value="dsssm" className="animate-reveal-up outline-none">
             <div className="glass-card p-16 rounded-[4rem] border-primary/20 flex flex-col md:flex-row gap-16 items-center">
                <div className="p-10 bg-primary/10 rounded-[3rem] border border-primary/20 shadow-2xl shadow-primary/20">
                   <ShieldCheck className="h-24 w-24 text-primary animate-pulse" />
                </div>
                <div className="space-y-8">
                   <h2 className="text-5xl font-black font-headline tracking-tighter smart-gradient-text">SMART DSSSM PROTOCOL</h2>
                   <p className="text-2xl text-muted-foreground font-medium leading-relaxed opacity-80">
                      Driver Search and Safety Monitoring System: Advanced real-time behavioral analysis for the RTA testing ecosystem.
                   </p>
                   <div className="flex flex-wrap gap-4">
                      {["BEHAVIORAL SCAN", "HAZARD RECOGNITION", "PRECISION CONTROL"].map((tag) => (
                         <div key={tag} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-primary">
                            {tag}
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

