"use client"

import { ShieldAlert, Info, AlertTriangle, CheckCircle, Navigation, TrafficCone, Layers, ListChecks, Activity, Sparkles, MoveRight, BookOpen, Microscope, Zap, ArrowUpRight } from "lucide-react"
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
    title: language === 'ar' ? "دليل البروتوكولات والرموز المرورية" : "Traffic Protocols & Symbols Guide",
    subtitle: language === 'ar' ? "الدليل الأكاديمي الشامل لجميع البروتوكولات والعلامات المرورية المعتمدة في دبي وفق معايير RTA الدولية." : "The comprehensive academic guide to all traffic protocols and signs in Dubai per international RTA standards.",
    badge: language === 'ar' ? "قاعدة بيانات تضم ١٧٠+ رمزاً مراداً" : "Database of 170+ Academic Symbols",
    stats: [
      { num: "42", label: language === 'ar' ? "إشارة تنظيمية" : "Regulatory Signs", icon: ShieldAlert },
      { num: "66", label: language === 'ar' ? "إشارة تحذيرية" : "Warning Signs", icon: AlertTriangle },
      { num: "35", label: language === 'ar' ? "إشارة إرشادية" : "Guide Signs", icon: Navigation },
      { num: "12", label: language === 'ar' ? "علامة طرق" : "Road Markings", icon: Layers },
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
      title: language === 'ar' ? "٠١- المجمع التنظيمي" : "01- Regulatory Complex",
      desc: language === 'ar' ? "تُستخدم هذه الإشارات لتنظيم تدفق الطاقة الحركية في المسارات الحيوية وتحديد الالتزامات الصارمة. تشمل إشارات التوقف الإلزامي وإفسح الطريق التي تضمن سلامة المجمع بأكمله." : "These signs are used to regulate kinetic energy flow in critical lanes and define strict obligations. Includes mandatory 'STOP' and 'GIVE WAY' signs ensuring overall system safety.",
      items: language === 'ar' ? ["توقف إلزامي (STOP)", "أولوية المرور", "ممنوع الاختراق", "المسارات الإجبارية"] : ["Mandatory STOP", "Traffic Priority", "No Breach", "Obligatory Lanes"]
    },
    warning: {
      title: language === 'ar' ? "٠٢- مجمع التحذير" : "02- Warning Complex",
      desc: language === 'ar' ? "تنبيه السائقين إلى متغيرات مفاجئة تتطلب استجابة عصبية سريعة ومعالجة مسبقة للمخاطر." : "Alerting drivers to sudden variables requiring rapid neural response and prior hazard processing.",
      content: language === 'ar' ? "هذا القسم التقني يحتوي على تحذيرات المنعطفات الحادة، عبور المشاة، والظروف البيئية المتغيرة. الإدراك السريع لهذه الإشارات يمنحك وقتاً كافياً للتصحيح الهيدروليكي." : "This technical section contains warnings for sharp curves, pedestrian crossings, and variable environmental conditions. Rapid perception gives you sufficient time for hydraulic correction."
    },
    road: [
      { title: language === 'ar' ? "بروتوكولات الترام" : "Tram Protocols", icon: TrafficCone, color: "text-blue-400" },
      { title: language === 'ar' ? "نقاط التحميل" : "Loading Nodes", icon: Navigation, color: "text-green-400" },
      { title: language === 'ar' ? "المسارات السطحية" : "Surface Vectors", icon: Layers, color: "text-purple-400" },
    ],
    dsssm: {
      title: "DSSSM Protocol",
      desc: language === 'ar' ? "نظام البحث عن السلامة ومراقبة السلوك هو النواة الذكية لدبي لضمان التميز التشغيلي على الطرق. يقوم النظام بتحليل الانحرافات اللحظية آلياً." : "Driver Safety Search & Status Monitoring is Dubai's core intelligence for operational excellence on roads. The system analyzes momentary deviations automatically.",
      benefit1: language === 'ar' ? "تحسين الأداء بنسبة ٤٠٪" : "Performance Optimization: 40%",
      benefit2: language === 'ar' ? "مزامنة السجل المروري الفورية" : "Real-time Traffic Record Sync"
    },
    failureReasons: [
      { title: language === 'ar' ? "خطيئة التوقف الصفري" : "Zero-Stop Violation", desc: language === 'ar' ? "الفشل في تحقيق سكون تام للمركبة لثلاث ثوانٍ عند خط الوقوف الأكاديمي." : "Failure to achieve absolute vehicle stillness for 3 seconds at the academic stop line." },
      { title: language === 'ar' ? "أولويات الدوران" : "Radius Priorities", desc: language === 'ar' ? "خرق بروتوكول الدخول للمنطقة الدائرية دون منح الأولوية للناقل الأيسر." : "Breaching circular entry protocol without granting priority to the left vector." },
      { title: language === 'ar' ? "تجاوز العتبة" : "Threshold Breach", desc: language === 'ar' ? "تجاوز حدود السرعة المبرمجة ولو بنسبة ضئيلة جداً أثناء بروتوكول الاختبار." : "Exceeding programmed speed limits even by a minimal percentage during the test protocol." },
      { title: language === 'ar' ? "النقطة المظلمة" : "Dark Point Ignorance", desc: language === 'ar' ? "إهمال إجراء الفحص البصري العميق للكتف عند تغيير المتجهات الجانبية." : "Neglecting deep visual shoulder checks when changing lateral vectors." },
    ],
    footer: {
      title: language === 'ar' ? "استخراج المجلد الكامل؟" : "Extract Full Volume?",
      desc: language === 'ar' ? "نقوم حالياً بتجهيز النسخة الرقمية التفاعلية الكاملة للمجلد الأكاديمي لشرح الإشارات الـ ١٧٠ المعتمدة." : "We are currently preparing the complete interactive digital version of the academic volume for 170 approved signs.",
      tags: language === 'ar' ? ["إشارات التوقف", "متجه الدوار", "مواقف ذوي الهمم", "مشاة النيون"] : ["Stop Protocols", "Roundabout Vector", "POD Nodes", "Neon Pedestrian Lines"]
    }
  }

  return (
    <div className="min-h-screen bg-[#020202] selection:bg-primary selection:text-black">
      {/* Cinematic Hero */}
      <section className="relative py-48 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-float opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full animate-float-slow opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)] opacity-30" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 contrast-150 brightness-50" />
        </div>

        <div className="container mx-auto relative z-10 text-center space-y-12">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.6em] animate-reveal-up opacity-0 shadow-2xl backdrop-blur-3xl mx-auto">
            <Activity className="h-4 w-4 animate-pulse" />
            {t.badge}
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black font-headline tracking-tighter smart-gradient-text animate-reveal-up opacity-0 [animation-delay:0.2s] uppercase leading-[0.8]">
            Traffic Rules <br /> & Protocols
          </h1>
          
          <p className="text-xl md:text-3xl text-muted-foreground/60 max-w-3xl mx-auto leading-relaxed font-medium animate-reveal-up opacity-0 [animation-delay:0.4s]">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* High-Tech Stats Hub */}
      <div className="container mx-auto -mt-32 relative z-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {t.stats.map((stat, i) => (
            <Card key={i} className="bg-black/40 backdrop-blur-3xl border-white/5 p-10 rounded-[3rem] hover:border-primary/30 transition-all duration-700 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />
              <div className="relative z-10 space-y-6">
                <div className="p-5 rounded-2xl bg-white/5 w-fit text-primary border border-white/10 group-hover:bg-primary group-hover:text-black transition-all">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-5xl font-black smart-gradient-text tracking-tighter block mb-1">{stat.num}</span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em] opacity-40 leading-none">{stat.label}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-48">
        <Tabs defaultValue="regulatory" className="w-full space-y-24">
          <TabsList className="flex flex-wrap h-auto gap-4 bg-transparent p-0 justify-center">
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
                className="px-8 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] bg-white/5 border border-white/10 data-[state=active]:bg-primary data-[state=active]:text-black transition-all duration-500 hover:bg-white/10 shadow-2xl"
              >
                <tab.icon className="h-4 w-4 mr-3" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative mt-24">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            {/* Regulatory Section */}
            <TabsContent value="regulatory" className="space-y-24 animate-reveal-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tighter uppercase leading-[0.9]">{t.regulatory.title}</h2>
                    <p className="text-2xl text-muted-foreground/60 leading-relaxed font-medium italic border-l-4 border-primary/20 pl-8">
                      {t.regulatory.desc}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {t.regulatory.items.map((item, i) => (
                      <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-500 flex items-center gap-6">
                        <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-transform" />
                        <span className="font-black text-[10px] uppercase tracking-[0.3em] group-hover:text-primary transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 group">
                  <Image 
                    src={signsImg?.imageUrl || ""} 
                    alt="Regulatory Signs" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">RTA SYMBOLS</p>
                       <h3 className="text-2xl font-black uppercase font-headline text-white tracking-widest leading-none">Standard Archive</h3>
                    </div>
                    <div className="p-6 rounded-3xl bg-primary text-black shadow-2xl">
                       <ArrowUpRight className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Warning Section */}
            <TabsContent value="warning" className="space-y-12 animate-reveal-up">
              <Card className="bg-black/60 backdrop-blur-3xl border-yellow-500/20 rounded-[5rem] overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full" />
                 <div className="p-20 space-y-16 relative z-10">
                    <div className="space-y-6">
                       <h2 className="text-5xl md:text-8xl font-headline font-black text-yellow-500 uppercase tracking-tighter leading-[0.8]">{t.warning.title}</h2>
                       <p className="text-[10px] font-black uppercase tracking-[1em] text-yellow-500/40">{t.warning.desc}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                       <div className="relative p-24 rounded-[4rem] bg-yellow-500/5 border border-yellow-500/10 flex flex-col items-center justify-center text-center space-y-10 group overflow-hidden">
                          <div className="absolute inset-0 bg-yellow-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                          <AlertTriangle className="h-32 w-32 text-yellow-500 relative z-10 group-hover:scale-110 transition-transform" />
                          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500/60 relative z-10 group-hover:text-yellow-500">Critical Sensor Protocol</p>
                       </div>
                       <p className="text-2xl text-muted-foreground/60 leading-relaxed font-medium">
                         {t.warning.content}
                       </p>
                    </div>
                 </div>
              </Card>
            </TabsContent>

            {/* Road Signs Section */}
            <TabsContent value="road" className="animate-reveal-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {t.road.map((item, i) => (
                  <Card key={i} className="bg-white/5 backdrop-blur-2xl border-white/5 p-16 rounded-[4rem] text-center hover:border-primary/30 transition-all duration-700 group relative">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <item.icon className={cn("h-20 w-20 mx-auto mb-10 transition-transform group-hover:scale-125 duration-700", item.color)} />
                    <h3 className="text-3xl font-black font-headline uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">{item.title}</h3>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Failure Reasons */}
            <TabsContent value="failure" className="animate-reveal-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {t.failureReasons.map((reason, i) => (
                  <Card key={i} className="border-red-500/10 bg-red-500/5 rounded-[4rem] hover:bg-red-500/10 transition-all duration-700 p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] -mr-16 -mt-16" />
                    <CardHeader className="flex flex-row items-center gap-8 mb-6 p-0">
                      <div className="p-6 bg-red-500/20 rounded-3xl group-hover:bg-red-500 group-hover:text-black transition-all">
                        <ShieldAlert className="h-8 w-8 text-red-500 group-hover:text-inherit" />
                      </div>
                      <CardTitle className="text-3xl font-black uppercase font-headline tracking-tighter leading-none">{reason.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-xl text-muted-foreground/60 leading-relaxed font-medium">{reason.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* DSSSM Section */}
            <TabsContent value="dsssm" className="animate-reveal-up">
              <Card className="bg-primary/5 backdrop-blur-3xl border-primary/20 rounded-[5rem] overflow-hidden group">
                 <div className="p-24 flex flex-col lg:flex-row gap-24 items-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.1),transparent_70%)]" />
                    <div className="flex-1 space-y-12 relative z-10">
                      <div className="space-y-6">
                        <h2 className="text-6xl md:text-8xl font-headline font-black text-primary uppercase leading-[0.8] tracking-tighter">{t.dsssm.title}</h2>
                        <p className="text-2xl text-muted-foreground/60 leading-relaxed font-medium italic">
                          {t.dsssm.desc}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="flex items-center gap-6 p-8 rounded-[2rem] bg-white/5 border border-white/5 group-hover:border-primary/20 transition-all">
                          <CheckCircle className="h-8 w-8 text-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                          <span className="font-black text-[10px] uppercase tracking-[0.2em]">{t.dsssm.benefit1}</span>
                        </div>
                        <div className="flex items-center gap-6 p-8 rounded-[2rem] bg-white/5 border border-white/5 group-hover:border-primary/20 transition-all">
                          <CheckCircle className="h-8 w-8 text-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                          <span className="font-black text-[10px] uppercase tracking-[0.2em]">{t.dsssm.benefit2}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[400px] h-[400px] bg-gradient-to-br from-primary to-accent rounded-[6rem] p-24 flex items-center justify-center shadow-[0_40px_100px_rgba(59,130,246,0.4)] relative overflow-hidden">
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/20" />
                      <Info className="h-48 w-48 text-white relative z-10 animate-float" />
                    </div>
                 </div>
              </Card>
            </TabsContent>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </Tabs>

        {/* Cinematic Deployment CTA */}
        <section className="mt-48 text-center space-y-16">
          <div className="space-y-8 max-w-4xl mx-auto">
             <div className="h-16 w-16 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-2xl animate-bounce">
                <ListChecks className="h-8 w-8" />
             </div>
             <h2 className="text-6xl md:text-[8rem] font-black font-headline tracking-tighter uppercase leading-[0.8] smart-gradient-text">{t.footer.title}</h2>
             <p className="text-2xl md:text-3xl text-muted-foreground/60 font-medium leading-relaxed">
                {t.footer.desc}
             </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {t.footer.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.5em] bg-white/5 border border-white/10 hover:bg-primary hover:text-black transition-all duration-500 cursor-default hover:-translate-y-2">
                {tag}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
