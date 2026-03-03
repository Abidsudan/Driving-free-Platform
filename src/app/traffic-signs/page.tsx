'use client';

import { ShieldAlert, Info, AlertTriangle, CheckCircle, Navigation, TrafficCone, Layers, ListChecks, ArrowDownCircle } from "lucide-react"
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
      desc: language === 'ar' ? "تُستخدم هذه الإشارات لتنظيم حركة السير وتحديد الالتزامات والممنوعات. تشمل إشارات \"قف\" و\"إفسح الطريق\"." : "These signs are used to regulate traffic and define obligations and prohibitions.",
      items: language === 'ar' ? ["قف (STOP)", "إفسح الطريق", "ممنوع الدخول", "اتجاه إلزامي"] : ["STOP", "Give Way", "No Entry", "Mandatory Direction"]
    },
    warning: {
      title: language === 'ar' ? "٢- الإشارات التحذيرية" : "2- Warning Signs",
      desc: language === 'ar' ? "تنبيه السائقين إلى مخاطر محتملة على الطريق تتطلب الحذر الشديد." : "Alerting drivers to potential road hazards that require extreme caution.",
      content: language === 'ar' ? "هذا القسم يحتوي على تحذيرات المنعطفات الحادة، مناطق عبور المشاة، والظروف الجوية المتغيرة." : "This section contains warnings for sharp curves, pedestrian crossings, and changing weather conditions."
    },
    road: [
      { title: language === 'ar' ? "علامات الترام" : "Tram Signs", icon: TrafficCone, color: "text-blue-400" },
      { title: language === 'ar' ? "منطقة عبور المشاة" : "Pedestrian Crossing", icon: Navigation, color: "text-green-400" },
      { title: language === 'ar' ? "خطوط سطح الطريق" : "Road Surface Markings", icon: Layers, color: "text-purple-400" },
    ],
    dsssm: {
      title: "DSSSM System",
      desc: language === 'ar' ? "\"نظام مراقبة سلوك السائقين\" هو التقنية الذكية التي تعتمدها دبي لضمان أعلى مستويات السلامة." : "\"Driver Search and Safety Monitoring System\" is the smart technology adopted by Dubai.",
      benefit1: language === 'ar' ? "يحسن جودة القيادة بنسبة 40%" : "Improves driving quality by 40%",
      benefit2: language === 'ar' ? "مرتبط مباشرة بسجل السائق المروري" : "Directly linked to the driver's traffic record"
    },
    failureReasons: [
      { title: language === 'ar' ? "عدم التوقف عند إشارة قف" : "Failure to stop at STOP sign", desc: language === 'ar' ? "يجب التوقف تماماً لثلاث ثوانٍ قبل خط الوقوف." : "Must come to a complete stop for 3 seconds before the stop line." },
      { title: language === 'ar' ? "أولوية الدوار" : "Roundabout Priority", desc: language === 'ar' ? "دخول الدوار دون إعطاء الأولوية للقادم من اليسار." : "Entering a roundabout without giving priority to traffic from the left." },
    ],
    footer: {
      title: language === 'ar' ? "هل تريد الدليل الكامل؟" : "Want the Full Guide?",
      desc: language === 'ar' ? "نقوم حالياً بتجهيز نسخة PDF تفاعلية تحتوي على شرح لكل إشارة من الإشارات الـ 170 المعتمدة في دبي." : "We are currently preparing an interactive PDF version containing explanations for all 170 approved signs.",
      tags: language === 'ar' ? ["إشارات قف", "أولويات الدوار", "مواقف ذوي الهمم", "خطوط المشاة الصفراء"] : ["Stop Signs", "Roundabout Priorities", "POD Parking", "Yellow Pedestrian Lines"]
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
              <span className="text-xs font-black text-muted-foreground uppercase tracking-[0.4em] mt-4 block opacity-60">{stat.label}</span>
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
              { id: "failure", label: t.tabs.failure, icon: ShieldAlert },
              { id: "dsssm", label: t.tabs.dsssm, icon: Info },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="px-8 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all flex items-center gap-3"
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
                    <div key={i} className="flex items-center gap-4 p-6 rounded-[2rem] bg-secondary/40 border border-white/5 shadow-xl hover:border-primary/30 transition-all group">
                      <div className="h-3 w-3 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                      <span className="font-black text-lg tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10 group">
                {signsImg?.imageUrl && (
                  <Image 
                    src={signsImg.imageUrl} 
                    alt="Regulatory Signs" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <Badge className="absolute bottom-10 right-10 bg-primary px-8 py-4 text-xl font-black rounded-3xl shadow-2xl">RTA Signs Gallery</Badge>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="warning">
            <Card className="glass-card border-yellow-500/20 rounded-[4rem] overflow-hidden shadow-2xl">
               <div className="bg-yellow-500/10 p-12 md:p-20 border-b border-yellow-500/20 text-center">
                  <h2 className="text-5xl md:text-8xl font-headline font-black text-yellow-500 tracking-tighter mb-6">{t.warning.title}</h2>
                  <p className="text-2xl text-muted-foreground font-medium opacity-80">{t.warning.desc}</p>
               </div>
               <CardContent className="p-16 md:p-32">
                  <div className="text-center space-y-10">
                    <AlertTriangle className="h-32 w-32 text-yellow-500 mx-auto animate-pulse" />
                    <p className="max-w-3xl mx-auto text-3xl text-muted-foreground leading-relaxed font-bold italic">
                      {t.warning.content}
                    </p>
                  </div>
               </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="road" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {t.road.map((item, i) => (
                <Card key={i} className="glass-card border-white/5 p-12 rounded-[4rem] text-center hover:border-primary/50 hover:-translate-y-4 transition-all duration-700 shadow-2xl group">
                  <item.icon className={cn("h-20 w-20 mx-auto mb-8 transition-transform group-hover:scale-125", item.color)} />
                  <h3 className="text-3xl font-black font-headline tracking-tighter">{item.title}</h3>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="failure" className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {t.failureReasons.map((reason, i) => (
                <Card key={i} className="border-red-500/20 bg-red-500/5 rounded-[4rem] p-12 md:p-16 hover:bg-red-500/10 transition-all duration-700 shadow-2xl group border-2">
                  <CardHeader className="p-0 mb-10 flex flex-row items-center gap-8">
                    <div className="p-6 bg-red-500/20 rounded-[2rem] group-hover:scale-110 transition-transform">
                      <ShieldAlert className="h-10 w-10 text-red-500" />
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium opacity-80">{reason.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dsssm" className="space-y-12">
            <Card className="glass-card border-primary/20 rounded-[5rem] overflow-hidden shadow-2xl">
               <div className="p-16 md:p-32 bg-primary/5 flex flex-col md:flex-row gap-20 items-center">
                  <div className="flex-1 space-y-10">
                    <h2 className="text-6xl md:text-9xl font-headline font-black text-primary tracking-tighter leading-none">{t.dsssm.title}</h2>
                    <p className="text-3xl text-muted-foreground leading-relaxed italic font-bold opacity-90">
                      {t.dsssm.desc}
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-green-500/10 border border-green-500/20 shadow-xl">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <span className="font-black text-xl tracking-tight">{t.dsssm.benefit1}</span>
                      </div>
                      <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-green-500/10 border border-green-500/20 shadow-xl">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <span className="font-black text-xl tracking-tight">{t.dsssm.benefit2}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-96 aspect-square bg-gradient-to-br from-primary to-accent rounded-[4rem] p-16 flex items-center justify-center shadow-[0_40px_100px_rgba(0,0,0,0.4)] rotate-6 group hover:rotate-0 transition-all duration-1000">
                    <Info className="h-48 w-48 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
               </div>
            </Card>
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
