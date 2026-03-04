
'use client';

import { ShieldAlert, Info, AlertTriangle, CheckCircle, Navigation, TrafficCone, Layers, ListChecks, ArrowDownCircle, Car, Map, Compass, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function TrafficSignsPage() {
  const { language, dir } = useLanguage()
  const signsImg = PlaceHolderImages.find(img => img.id === "rta-signs")

  const t = {
    title: language === 'ar' ? "🚦 دليل الإشارات والرموز المرورية" : "🚦 Traffic Signs & Symbols Guide",
    subtitle: language === 'ar' ? "الدليل الشامل لجميع الإشارات والعلامات المرورية المعتمدة في دبي وفق معايير RTA" : "Comprehensive guide to all traffic signs and markings in Dubai per RTA standards",
    badge: language === 'ar' ? "يحتوي على أكثر من 170 إشارة ورمز مروري" : "Contains over 170 traffic signs and symbols",
    stats: [
      { num: "42", label: language === 'ar' ? "إشارة تنظيمية" : "Regulatory Signs" },
      { num: "66", label: language === 'ar' ? "إشارة تحذيرية" : "Warning Signs" },
      { num: "35", label: language === 'ar' ? "إشارة إرشادية" : "Guide Signs" },
      { num: "12", label: language === 'ar' ? "علامة طرق" : "Road Markings" },
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
      title: language === 'ar' ? "١- الإشارات التنظيمية" : "1- Regulatory Signs",
      desc: language === 'ar' ? "تُستخدم هذه الإشارات لتنظيم حركة السير وتحديد الالتزامات والممنوعات. تجاهل هذه الإشارات يؤدي غالباً للرسوب الفوري." : "These signs are used to regulate traffic and define obligations and prohibitions. Ignoring these signs often leads to immediate failure.",
      items: [
        { n: language === 'ar' ? "قف (STOP)" : "STOP", d: language === 'ar' ? "توقف كامل للعجلات 3 ثوانٍ" : "Full 3s wheel stop" },
        { n: language === 'ar' ? "إفسح الطريق" : "Give Way", d: language === 'ar' ? "إعطاء الأولوية للطريق الرئيسي" : "Yield to main road traffic" },
        { n: language === 'ar' ? "ممنوع الدخول" : "No Entry", d: language === 'ar' ? "طريق محظور تماماً" : "Strictly prohibited path" },
        { n: language === 'ar' ? "اتجاه إلزامي" : "Mandatory Dir", d: language === 'ar' ? "اتبع السهم الموضح فقط" : "Follow the indicated arrow" }
      ]
    },
    warning: {
      title: language === 'ar' ? "٢- الإشارات التحذيرية" : "2- Warning Signs",
      desc: language === 'ar' ? "تنبيه السائقين إلى مخاطر محتملة على الطريق تتطلب الحذر الشديد وتخفيف السرعة." : "Alerting drivers to potential road hazards that require extreme caution and speed reduction.",
      items: [
        { n: language === 'ar' ? "منعطف حاد" : "Sharp Curve", d: language === 'ar' ? "خفف السرعة قبل المنعطف" : "Slow down before curve" },
        { n: language === 'ar' ? "عبور مشاة" : "Pedestrian Crossing", d: language === 'ar' ? "استعد للتوقف الكامل" : "Prepare for full stop" },
        { n: language === 'ar' ? "مطب صناعي" : "Speed Hump", d: language === 'ar' ? "تجاوز المطب ببطء" : "Cross hump slowly" },
        { n: language === 'ar' ? "منطقة مدارس" : "School Zone", d: language === 'ar' ? "احذر عبور الأطفال" : "Watch for children crossing" }
      ]
    },
    guide: {
      title: language === 'ar' ? "٣- الإشارات الإرشادية" : "3- Guide Signs",
      desc: language === 'ar' ? "توفر معلومات عن الوجهات، المسافات، والخدمات المتاحة على الطريق." : "Provides information about destinations, distances, and road services.",
      items: [
        { n: language === 'ar' ? "إشارة الوجهات" : "Destination Sign", d: language === 'ar' ? "توضح المناطق والشوارع" : "Shows areas and streets" },
        { n: language === 'ar' ? "موقف حافلات" : "Bus Stop", d: language === 'ar' ? "ممنوع الوقوف لغير الحافلات" : "Buses only parking" },
        { n: language === 'ar' ? "محطة وقود" : "Petrol Station", d: language === 'ar' ? "خدمة متوفرة قريباً" : "Upcoming service" }
      ]
    },
    road: [
      { title: language === 'ar' ? "خطوط التوقف" : "Stop Lines", icon: TrafficCone, color: "text-red-400", d: language === 'ar' ? "الوقوف قبل الخط تماماً" : "Stop before the line" },
      { title: language === 'ar' ? "المربع الأصفر" : "Yellow Box", icon: Compass, color: "text-yellow-400", d: language === 'ar' ? "ممنوع التوقف داخله" : "No stopping inside" },
      { title: language === 'ar' ? "خطوط المشاة" : "Zebra Cross", icon: Users, color: "text-green-400", d: language === 'ar' ? "الأولوية للمشاة دائماً" : "Pedestrian priority" },
    ],
    footer: {
      title: language === 'ar' ? "دليل الإشارات الشامل (PDF)" : "Full Signs Guide (PDF)",
      desc: language === 'ar' ? "نقوم حالياً بتجهيز نسخة PDF تفاعلية تحتوي على شرح لكل إشارة من الإشارات الـ 170 المعتمدة في دبي وفق أحدث معايير RTA." : "We are currently preparing an interactive PDF version containing explanations for all 170 approved signs in Dubai per latest RTA standards.",
      tags: language === 'ar' ? ["إشارات قف", "أولويات الدوار", "مواقف ذوي الهمم", "خطوط المشاة"] : ["Stop Signs", "Roundabout Priorities", "POD Parking", "Pedestrian Lines"]
    }
  }

  return (
    <div className="min-h-screen animate-fade-in pb-40">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-accent/20 py-32 px-6 text-center text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\' fill=\'%23ffffff\'/%3E%3C/svg%3E")' }} />
        <div className="container mx-auto relative z-10 space-y-10">
          <h1 className="text-5xl md:text-9xl font-black font-headline tracking-tighter leading-none">{t.title}</h1>
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-bold opacity-90">{t.subtitle}</p>
          <div className="inline-block px-8 py-3 rounded-full bg-white/20 backdrop-blur-2xl border border-white/30 text-lg font-black uppercase tracking-widest shadow-2xl">
            {t.badge}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto -mt-20 mb-24 relative z-20 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat, i) => (
            <Card key={i} className="glass-card border-white/10 text-center p-10 hover:translate-y-[-10px] transition-all duration-700 shadow-2xl group">
              <span className="text-5xl md:text-7xl font-black smart-gradient-text block leading-none group-hover:scale-110 transition-transform">{stat.num}</span>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-4 block opacity-60">{stat.label}</span>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        <Tabs defaultValue="regulatory" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-3 bg-secondary/40 p-3 rounded-[3rem] mb-20 border border-white/5 justify-center shadow-2xl max-w-5xl mx-auto">
            {[
              { id: "regulatory", label: t.tabs.regulatory, icon: ListChecks },
              { id: "warning", label: t.tabs.warning, icon: AlertTriangle },
              { id: "guide", label: t.tabs.guide, icon: Navigation },
              { id: "road", label: t.tabs.road, icon: TrafficCone },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="px-8 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-3"
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="regulatory" className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <h2 className="text-5xl md:text-7xl font-headline font-black text-primary tracking-tighter leading-none">{t.regulatory.title}</h2>
                <p className="text-2xl text-muted-foreground leading-relaxed font-medium opacity-80">
                  {t.regulatory.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {t.regulatory.items.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2 p-6 rounded-[2rem] bg-secondary/40 border border-white/5 shadow-xl hover:border-primary/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                        <span className="font-black text-lg tracking-tight">{item.n}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-bold uppercase">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10">
                {signsImg?.imageUrl && (
                  <Image 
                    src={signsImg.imageUrl} 
                    alt="Regulatory Signs" 
                    fill 
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <Badge className="absolute bottom-10 right-10 bg-primary px-8 py-4 text-xl font-black rounded-3xl shadow-2xl">RTA Signs Gallery</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="warning" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.warning.items.map((item, i) => (
                <Card key={i} className="bg-yellow-500/5 border-yellow-500/20 p-8 rounded-[3rem] text-center hover:bg-yellow-500/10 transition-all group">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-black mb-2">{item.n}</h3>
                  <p className="text-xs text-muted-foreground font-medium">{item.d}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guide" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {t.guide.items.map((item, i) => (
                <Card key={i} className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-primary/40 transition-all">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Navigation className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">{item.n}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.d}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="road" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {t.road.map((item, i) => (
                <Card key={i} className="glass-card border-white/5 p-12 rounded-[4rem] text-center hover:border-primary/50 hover:-translate-y-4 transition-all duration-700 shadow-2xl group">
                  <item.icon className={cn("h-20 w-20 mx-auto mb-8 transition-transform group-hover:scale-125", item.color)} />
                  <h3 className="text-3xl font-black font-headline tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-muted-foreground font-bold">{item.d}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Section */}
        <div className="mt-40 p-20 md:p-32 rounded-[6rem] bg-card/40 border border-white/5 text-center space-y-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 animate-pulse-slow" />
          <div className="relative z-10 inline-flex p-8 rounded-[3rem] bg-primary/10 text-primary mb-4 animate-float">
            <ListChecks className="h-16 w-16" />
          </div>
          <h2 className="relative z-10 text-5xl md:text-8xl font-headline font-black tracking-tighter leading-none">{t.footer.title}</h2>
          <p className="relative z-10 text-2xl text-muted-foreground max-w-3xl mx-auto font-medium opacity-80">
            {t.footer.desc}
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-6">
            {t.footer.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="px-10 py-4 rounded-full text-sm font-black uppercase tracking-[0.3em] bg-white/5 hover:bg-primary hover:text-white transition-all cursor-default shadow-xl border border-white/10">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
