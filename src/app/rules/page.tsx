
'use client';

import { ShieldAlert, Info, AlertTriangle, CheckCircle, Navigation, TrafficCone, Layers, ListChecks, StopCircle, Zap, Car, EyeOff, Gauge } from "lucide-react"
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
    title: language === 'ar' ? "🚦 دليل الإشارات ومعايير التقييم" : "🚦 Traffic Signs & Evaluation Standards",
    subtitle: language === 'ar' ? "الدليل الأكاديمي الشامل لقواعد المرور ومعايير الرسوب الفوري وفق معايير RTA دبي" : "Comprehensive academic guide to traffic rules and immediate failure criteria per Dubai RTA standards",
    badge: language === 'ar' ? "محدث وفق آخر تعديلات دليل الفحص العملي" : "Updated per the latest practical test manual",
    stats: [
      { num: "IF1", label: language === 'ar' ? "مخالفات الوقوف" : "Stop Violations" },
      { num: "IF2", label: language === 'ar' ? "الاصطدام والتدخل" : "Collisions & Intervention" },
      { num: "IF3", label: language === 'ar' ? "الإشارات والسرعة" : "Signs & Speeding" },
      { num: "170+", label: language === 'ar' ? "إشارة مرورية" : "Traffic Signs" },
    ],
    tabs: {
      failure: language === 'ar' ? "الرسوب الفوري (IF)" : "Instant Failure (IF)",
      dsssm: language === 'ar' ? "نظام DSSSM" : "DSSSM System",
      regulatory: language === 'ar' ? "التنظيمية" : "Regulatory",
      warning: language === 'ar' ? "التحذيرية" : "Warning",
      road: language === 'ar' ? "علامات الطريق" : "Road Signs",
    },
    failureSections: [
      {
        code: "IF1",
        title: language === 'ar' ? "الإشارة الحمراء وخط التوقف" : "Red Light & Stop Line",
        items: language === 'ar' ? [
          "تجاوز الإشارة الحمراء أو علامة قف دون توقف تام (سكون العجلات بالكامل).",
          "الوقوف قبل خط التوقف بمسافة تزيد عن 3 أمتار وعدم القدرة على التقدم للتصحيح.",
          "الوقوف بعد خط التوقف بمسافة تزيد عن نصف متر (50 سم) مما يعيق حركة المشاة.",
          "فشل المتدرب في التوقف مرة أخرى في الموقع الصحيح بعد توقف مبدئي خاطئ."
        ] : [
          "Passing red light or STOP sign without a complete wheel stop.",
          "Stopping more than 3 meters before the line and failing to advance to the correct position.",
          "Stopping more than 0.5 meters (50cm) after the stop line, blocking pedestrian path.",
          "Failure to reposition correctly after an initial incorrect stop distance."
        ],
        icon: StopCircle,
        color: "border-red-500/30 bg-red-500/5"
      },
      {
        code: "IF2",
        title: language === 'ar' ? "الاصطدام وتدخل الفاحص" : "Collisions & Intervention",
        items: language === 'ar' ? [
          "الاصطدام بأي جسم ثابت (رصيف، حاجز) أو جسم متحرك (مركبة، مشاة، دراجة).",
          "تدخل الفاحص المباشر بالضغط على الفرامل أو كسم المقود لمنع خطر وشيك.",
          "إجبار مستخدمي الطريق الآخرين على التوقف المفاجئ أو الانحراف الحاد لتجنب مركبتك.",
          "إهمال فحص البقعة العمياء (Blind Spot) لأكثر من مرتين خلال الاختبار.",
          "انطفاء محرك المركبة بسبب سوء استخدام البدالات لأكثر من مرتين."
        ] : [
          "Collision with any fixed object (curb, barrier) or moving object (car, pedestrian).",
          "Examiner intervention (braking or steering) to prevent a hazard.",
          "Forcing other road users to brake suddenly or swerve to avoid you.",
          "Neglecting blind spot check more than 2 times during the test.",
          "Engine stalling due to trainee pedal error more than 2 times."
        ],
        icon: ShieldAlert,
        color: "border-orange-500/30 bg-orange-500/5"
      },
      {
        code: "IF3",
        title: language === 'ar' ? "مخالفة الإشارات والسرعة" : "Signs & Speed Violations",
        items: language === 'ar' ? [
          "عدم اتباع الإشارات الإلزامية (اتجاه السهم) أو المانعة (ممنوع الدخول).",
          "تجاوز السرعة المقررة للطريق بـ 5 كم/س أو أكثر لمدة 10 ثوانٍ متواصلة.",
          "دخول المربع الأصفر في التقاطعات وبقاء أي جزء من المركبة فيه عند توقف السير.",
          "القيادة عكس اتجاه السير أو تجاهل إرشادات الفاحص القانونية المباشرة."
        ] : [
          "Failure to follow mandatory signs (arrows) or prohibitory signs (No Entry).",
          "Exceeding speed limit by 5km/h or more for 10 consecutive seconds.",
          "Entering and remaining in the Yellow Box junction when traffic is blocked.",
          "Driving against traffic flow or ignoring legal examiner instructions."
        ],
        icon: Zap,
        color: "border-yellow-500/30 bg-yellow-500/5"
      }
    ],
    dsssm: {
      title: "DSSSM System",
      desc: language === 'ar' ? "\"نظام مراقبة سلوك السائقين\" هو التقنية الذكية التي تعتمدها دبي لضمان أعلى مستويات السلامة عبر رصد الانحرافات آلياً وربطها بملف المتدرب." : "\"Driver Search and Safety Monitoring System\" is the smart technology adopted by Dubai to ensure safety by monitoring deviations automatically and linking them to the trainee's file.",
      benefit1: language === 'ar' ? "رصد آلي للمخالفات التقنية والحركية" : "Automated monitoring of technical and motion violations",
      benefit2: language === 'ar' ? "تقييم موضوعي شفاف مبني على البيانات الميدانية" : "Transparent objective evaluation based on field data"
    },
    footer: {
      title: language === 'ar' ? "دليل النجاح من المرة الأولى" : "First-Time Success Guide",
      desc: language === 'ar' ? "فهم هذه القواعد يقلل نسبة القلق ويزيد من فرص نجاحك بنسبة 85%. نحن هنا لتدريبك على تفادي هذه الأخطاء تقنياً." : "Understanding these rules reduces anxiety and increases success chances by 85%. We train you to avoid these errors technically.",
      tags: language === 'ar' ? ["قاعدة الـ 3 أمتار", "المربع الأصفر", "فحص الكتف", "السرعة القانونية"] : ["3-Meter Rule", "Yellow Box", "Shoulder Check", "Legal Speed"]
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
        <Tabs defaultValue="failure" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-3 bg-secondary/40 p-3 rounded-[3rem] mb-20 border border-white/5 justify-center shadow-2xl max-w-5xl mx-auto">
            {[
              { id: "failure", label: t.tabs.failure, icon: ShieldAlert },
              { id: "regulatory", label: t.tabs.regulatory, icon: ListChecks },
              { id: "warning", label: t.tabs.warning, icon: AlertTriangle },
              { id: "road", label: t.tabs.road, icon: TrafficCone },
              { id: "dsssm", label: t.tabs.dsssm, icon: Info },
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

          <TabsContent value="failure" className="space-y-12">
            <div className="grid grid-cols-1 gap-8">
              {t.failureSections.map((section, idx) => (
                <Card key={idx} className={cn("rounded-[3rem] border-2 transition-all duration-500 overflow-hidden", section.color)}>
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
                      <div className="h-20 w-20 rounded-3xl bg-background/50 flex items-center justify-center text-primary shadow-xl">
                        <section.icon className="h-10 w-10" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="destructive" className="font-black px-3 py-1 rounded-lg">{section.code}</Badge>
                          <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter">{section.title}</h2>
                        </div>
                        <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">{language === 'ar' ? 'بنود الرسوب الفوري الإلزامية' : 'Mandatory Immediate Failure Items'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-background/40 border border-white/5 group hover:border-primary/30 transition-all">
                          <CheckCircle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                          <span className="text-lg font-medium leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regulatory" className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <h2 className="text-5xl md:text-7xl font-headline font-black text-primary tracking-tighter leading-none">{language === 'ar' ? '١- الإشارات التنظيمية' : '1- Regulatory Signs'}</h2>
                <p className="text-2xl text-muted-foreground leading-relaxed font-medium opacity-80">
                  {language === 'ar' ? 'تُستخدم هذه الإشارات لتنظيم حركة السير وتحديد الالتزامات والممنوعات الإلزامية التي يجب اتباعها بدقة.' : 'These signs are used to regulate traffic and define mandatory obligations and prohibitions that must be followed strictly.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { n: 'STOP', d: language === 'ar' ? 'توقف تام 3 ثوانٍ' : 'Complete 3s Stop' },
                    { n: 'Give Way', d: language === 'ar' ? 'افسح الطريق للقادم' : 'Yield to traffic' },
                    { n: 'No Entry', d: language === 'ar' ? 'ممنوع الدخول نهائياً' : 'Entry prohibited' },
                    { n: 'One Way', d: language === 'ar' ? 'طريق اتجاه واحد' : 'Single direction road' }
                  ].map((item, i) => (
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
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: language === 'ar' ? 'منعطف حاد' : 'Sharp Curve', icon: Navigation, desc: language === 'ar' ? 'تحذير من منحنى يتطلب تخفيف السرعة.' : 'Warning of curve requiring speed reduction.' },
                  { title: language === 'ar' ? 'عبور مشاة' : 'Pedestrian Crossing', icon: Users, desc: language === 'ar' ? 'منطقة عبور مشاة قادمة؛ استعد للتوقف.' : 'Upcoming pedestrian area; prepare to stop.' },
                  { title: language === 'ar' ? 'أعمال طرق' : 'Road Works', icon: Construction, desc: language === 'ar' ? 'تعديلات في المسارات أو عمال على الطريق.' : 'Lane changes or workers on road.' }
                ].map((item, i) => (
                  <Card key={i} className="glass-card p-10 rounded-[3rem] border-white/5 hover:border-accent/40 transition-all text-center space-y-6">
                    <item.icon className="h-16 w-16 text-accent mx-auto" />
                    <h3 className="text-2xl font-black">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
                  <div className="w-full md:w-96 aspect-square bg-gradient-to-br from-primary to-accent rounded-[4rem] p-16 flex items-center justify-center shadow-[0_40px_100px_rgba(0,0,0,0.4)] rotate-6">
                    <Info className="h-48 w-48 text-white opacity-40" />
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

function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function Construction(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="8" rx="1" />
      <path d="M17 14v7" />
      <path d="M7 14v7" />
      <path d="M17 3v3" />
      <path d="M7 3v3" />
      <path d="M10 14 2.3 6.3" />
      <path d="m14 6 7.7 7.7" />
      <path d="m8 6 8 8" />
    </svg>
  )
}
