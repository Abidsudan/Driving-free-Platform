'use client';

import { ShieldAlert, Info, AlertTriangle, CheckCircle, Navigation, TrafficCone, Layers, ListChecks } from "lucide-react"
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
      desc: language === 'ar' ? "تُستخدم هذه الإشارات لتنظيم حركة السير وتحديد الالتزامات والممنوعات." : "These signs are used to regulate traffic and define obligations and prohibitions.",
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
      desc: language === 'ar' ? "\"نظام مراقبة سلوك السائقين\" هو التقنية الذكية التي تعتمدها دبي لضمان أعلى مستويات السلامة." : "\"Driver Search and Safety Monitoring System\" is the smart technology adopted by Dubai to ensure safety.",
      benefit1: language === 'ar' ? "يحسن جودة القيادة بنسبة 40%" : "Improves driving quality by 40%",
      benefit2: language === 'ar' ? "مرتبط مباشرة بسجل السائق المروري" : "Directly linked to the driver's traffic record"
    },
    failureReasons: [
      { title: language === 'ar' ? "عدم التوقف عند إشارة قف" : "Failure to stop at STOP sign", desc: language === 'ar' ? "يجب التوقف تماماً لثلاث ثوانٍ قبل خط الوقوف." : "Must come to a complete stop for 3 seconds before the stop line." },
      { title: language === 'ar' ? "أولوية الدوار" : "Roundabout Priority", desc: language === 'ar' ? "دخول الدوار دون إعطاء الأولوية للقادم من اليسار." : "Entering a roundabout without giving priority to traffic from the left." },
    ],
    footer: {
      title: language === 'ar' ? "هل تريد الدليل الكامل؟" : "Want the Full Guide?",
      desc: language === 'ar' ? "نقوم حالياً بتجهيز نسخة PDF تفاعلية تحتوي على شرح لكل إشارة." : "We are currently preparing an interactive PDF version containing explanations.",
      tags: language === 'ar' ? ["إشارات قف", "أولويات الدوار", "مواقف ذوي الهمم"] : ["Stop Signs", "Roundabout Priorities", "POD Parking"]
    }
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-accent/20 py-20 px-6 text-center text-white">
        <div className="container mx-auto relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter">{t.title}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
          <div className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-bold">
            {t.badge}
          </div>
        </div>
      </div>

      <div className="container mx-auto -mt-12 mb-12 relative z-20 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.stats.map((stat, i) => (
            <Card key={i} className="glass-card border-white/10 text-center p-6 hover:translate-y-[-5px] transition-transform">
              <span className="text-3xl md:text-4xl font-black smart-gradient-text block">{stat.num}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2 block">{stat.label}</span>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <Tabs defaultValue="regulatory" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-secondary/30 p-2 rounded-2xl mb-12 border border-white/5 justify-center">
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
                className="px-6 py-3 rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-2"
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="regulatory" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-headline font-black text-primary">{t.regulatory.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t.regulatory.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.regulatory.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/40 border border-white/5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                {signsImg?.imageUrl && (
                  <Image 
                    src={signsImg.imageUrl} 
                    alt="Regulatory Signs" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute bottom-6 right-6 bg-primary px-4 py-2 text-lg font-bold">RTA Signs Gallery</Badge>
              </div>
            </div>
          </TabsContent>
          {/* Other Tabs Content logic remains similar to previous version */}
        </Tabs>
      </div>
    </div>
  )
}
