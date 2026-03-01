
'use client';

import { ShieldAlert, Info, AlertTriangle, CheckCircle, Navigation, TrafficCone, Map as MapIcon, Layers, ListChecks } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function RulesPage() {
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
    failureReasons: [
      { title: language === 'ar' ? "عدم التوقف عند إشارة قف" : "Failure to stop at STOP sign", desc: language === 'ar' ? "يجب التوقف تماماً لثلاث ثوانٍ قبل خط الوقوف." : "Must come to a complete stop for 3 seconds." },
      { title: language === 'ar' ? "أولوية الدوار" : "Roundabout Priority", desc: language === 'ar' ? "دخول الدوار دون إعطاء الأولوية للقادم من اليسار." : "Entering without giving way to the left." },
      { title: language === 'ar' ? "تجاوز السرعة" : "Speeding", desc: language === 'ar' ? "تجاوز سرعة الطريق المحددة ولو قليلاً أثناء الاختبار." : "Exceeding road speed limit even slightly." },
      { title: language === 'ar' ? "النقطة العمياء" : "Blind Spot", desc: language === 'ar' ? "إهمال فحص الكتف عند تغيير المسار." : "Neglecting shoulder check when changing lanes." },
    ]
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-accent/20 py-20 px-6 text-center text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\' fill=\'%23ffffff\'/%3E%3C/svg%3E")' }} />
        <div className="container mx-auto relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter">{t.title}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
          <div className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-bold">
            {t.badge}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto -mt-12 mb-12 relative z-20 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.stats.map((stat, i) => (
            <Card key={i} className="glass-card border-white/10 text-center p-6 hover:translate-y-[-5px] transition-transform">
              <span className="text-3xl md:text-4xl font-black text-gradient block">{stat.num}</span>
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

          {/* Regulatory Section */}
          <TabsContent value="regulatory" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-headline font-black text-primary">١- الإشارات التنظيمية</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  تُستخدم هذه الإشارات لتنظيم حركة السير وتحديد الالتزامات والممنوعات. تشمل إشارات "قف"، "إفسح الطريق"، والإشارات الإلزامية التي يجب على السائق اتباعها بدقة لتجنب المخالفات والحوادث.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["قف (STOP)", "إفسح الطريق", "ممنوع الدخول", "اتجاه إلزامي"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/40 border border-white/5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image 
                  src={signsImg?.imageUrl || ""} 
                  alt="Regulatory Signs" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute bottom-6 right-6 bg-primary px-4 py-2 text-lg font-bold">نموذج الإشارات</Badge>
              </div>
            </div>
          </TabsContent>

          {/* Warning Section */}
          <TabsContent value="warning" className="space-y-8">
            <Card className="glass-card border-yellow-500/20 overflow-hidden">
               <div className="bg-yellow-500/10 p-8 border-b border-yellow-500/20">
                  <h2 className="text-3xl font-headline font-black text-yellow-500">٢- الإشارات التحذيرية</h2>
                  <p className="text-muted-foreground mt-2">تنبيه السائقين إلى مخاطر محتملة على الطريق تتطلب الحذر الشديد.</p>
               </div>
               <CardContent className="p-8">
                  <div className="text-center py-12 space-y-6">
                    <AlertTriangle className="h-20 w-20 text-yellow-500 mx-auto animate-pulse" />
                    <p className="max-w-md mx-auto text-muted-foreground leading-relaxed">
                      هذا القسم يحتوي على تحذيرات المنعطفات الحادة، مناطق عبور المشاة، والظروف الجوية المتغيرة. الإدراك السريع لهذه الإشارات يمنحك وقتاً كافياً لاتخاذ القرار الصحيح.
                    </p>
                  </div>
               </CardContent>
            </Card>
          </TabsContent>

          {/* Road Signs Section */}
          <TabsContent value="road" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "علامات الترام", icon: TrafficCone, color: "text-blue-400" },
                { title: "منطقة عبور المشاة", icon: Navigation, color: "text-green-400" },
                { title: "خطوط سطح الطريق", icon: Layers, color: "text-purple-400" },
              ].map((item, i) => (
                <Card key={i} className="glass-card border-white/5 p-8 text-center hover:border-primary/50 transition-colors">
                  <item.icon className={cn("h-12 w-12 mx-auto mb-4", item.color)} />
                  <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Failure Reasons */}
          <TabsContent value="failure" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.failureReasons.map((reason, i) => (
                <Card key={i} className="border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-red-500/20 rounded-xl">
                      <ShieldAlert className="h-6 w-6 text-red-500" />
                    </div>
                    <CardTitle className="text-xl font-bold">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{reason.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* DSSSM Section */}
          <TabsContent value="dsssm" className="space-y-8">
            <Card className="glass-card border-primary/20 overflow-hidden">
               <div className="p-10 bg-primary/5 flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-6">
                    <h2 className="text-4xl font-headline font-black text-primary">نظام DSSSM</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed italic">
                      "نظام مراقبة سلوك السائقين" هو التقنية الذكية التي تعتمدها دبي لضمان أعلى مستويات السلامة. يقوم النظام برصد الانحرافات والقيادة المتهورة آلياً.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-bold">يحسن جودة القيادة بنسبة 40%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-bold">مرتبط مباشرة بسجل السائق المروري</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-64 aspect-square bg-gradient-to-br from-primary to-accent rounded-[3rem] p-10 flex items-center justify-center shadow-2xl rotate-3">
                    <Info className="h-32 w-32 text-white opacity-40" />
                  </div>
               </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Full Table Link */}
        <div className="mt-20 p-12 rounded-[3rem] bg-card/40 border border-white/5 text-center space-y-8">
          <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary">
            <ListChecks className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-headline font-black">{language === 'ar' ? "هل تريد الدليل الكامل؟" : "Want the Full Guide?"}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            نقوم حالياً بتجهيز نسخة PDF تفاعلية تحتوي على شرح لكل إشارة من الإشارات الـ 170 المعتمدة في دبي.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["إشارات قف", "أولويات الدوار", "مواقف ذوي الهمم", "خطوط المشاة الصفراء"].map((tag, i) => (
              <Badge key={i} variant="secondary" className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-primary hover:text-white transition-all cursor-default">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
