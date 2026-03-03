
"use client"

import Image from "next/image"
import Link from "next/link"
import { BookOpen, Map, Zap, Construction, Gauge, Navigation, ShieldCheck, Award, Info, ChevronRight, CheckCircle2, Sparkles, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/components/language-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function CurriculumPage() {
  const { language, dir } = useLanguage();

  const t = {
    title: language === 'ar' ? "المنهج الأكاديمي المطور" : "Advanced Academic Curriculum",
    description: language === 'ar' 
      ? "هيكل تعليمي متكامل مصمم وفق أحدث معايير دبي (RTA)، يجمع بين فيزياء المركبة وفن القيادة الميدانية بأسلوب علمي حديث."
      : "A comprehensive educational structure designed per Dubai (RTA) standards, combining vehicle physics and field driving art.",
    part1Title: language === 'ar' ? "مهارات الطريق" : "Road Skills",
    part2Title: language === 'ar' ? "المواقف الذكية" : "Smart Parking",
    stageLabel: language === 'ar' ? "المرحلة" : "Stage",
    roadStages: [
      {
        id: "stage-1",
        title: language === 'ar' ? "التحكم التأسيسي" : "Control Foundations",
        desc: language === 'ar' ? "التعرف الميكانيكي والهندسي على المركبة في بيئة آمنة." : "Mechanical and engineering familiarity with the vehicle in a safe environment.",
        icon: Gauge,
        details: [
          { sub: language === 'ar' ? "فحص الجاهزية (P.O.W.D.E.R.S)" : "Vehicle Readiness (P.O.W.D.E.R.S)", desc: language === 'ar' ? "البروتوكول العالمي لفحص Petrol (الوقود)، Oil (الزيت)، Water (الماء)، Damage (الأضرار)، Electrics (الكهرباء)، Rubber (المطاط)، و Spares (الاحتياط)." : "The global protocol for checking Petrol, Oil, Water, Damage, Electrics, Rubber, and Spares." },
          { sub: language === 'ar' ? "هندسة الجلوس والتحكم" : "Seating Geometry & Control", desc: language === 'ar' ? "ضبط المقعد بزاوية 100-110 درجة لضمان انثناء الركبة وسرعة الاستجابة الفيزيائية للدواسات." : "Adjusting the seat to 100-110° to ensure knee flex and rapid physical response to pedals." },
          { sub: language === 'ar' ? "ضبط الرؤية المحيطية" : "Comprehensive Vision Setup", desc: language === 'ar' ? "تقنية الـ 90 درجة للمرايا الجانبية لتقليل البقع العمياء وتأمين مجال رؤية محيطي واسع." : "The 90° side mirror technique to minimize blind spots and secure a wide peripheral field of view." },
        ]
      },
      {
        id: "stage-2",
        title: language === 'ar' ? "الاندماج المروري" : "Traffic Integration",
        desc: language === 'ar' ? "تطبيق القيادة الدفاعية في الشوارع ذات الكثافة الخفيفة." : "Applying defensive driving in light traffic streets.",
        icon: Navigation,
        details: [
          { sub: language === 'ar' ? "بروتوكول البقعة العمياء" : "Blind Spot Protocol", desc: language === 'ar' ? "قاعدة (نظرة الكتف) الإلزامية قبل أي انحراف، حيث أن المرايا لا تغطي كامل الزوايا الفيزيائية للمركبة." : "The mandatory 'Shoulder Check' rule before any deviation, as mirrors don't cover all physical angles." },
          { sub: language === 'ar' ? "الاندماج الآمن (Time Gap)" : "Safe Integration (Time Gap)", desc: language === 'ar' ? "اختيار فجوة زمنية لا تقل عن 4 ثوانٍ عند الخروج من طريق جانبي لضمان عدم إرباك السير الرئيسي." : "Choosing a time gap of at least 4 seconds when exiting a side road to ensure no disruption to main traffic." },
          { sub: language === 'ar' ? "أولوية معابر المشاة" : "Pedestrian Crossings & Priority", desc: language === 'ar' ? "الاحترام الكامل لحقوق المشاة وقاعدة الوقوف التام بمجرد ملامستهم لسطح الطريق." : "Full respect for pedestrian rights and the total stop rule once they touch the road surface." },
        ]
      },
      {
        id: "stage-3",
        title: language === 'ar' ? "المناورات المتقدمة" : "Advanced Maneuvers",
        desc: language === 'ar' ? "التعامل مع الكثافة العالية، الطرق السريعة، والدوارات المعقدة." : "Handling heavy traffic, highways, and complex roundabouts.",
        icon: Zap,
        details: [
          { sub: language === 'ar' ? "قانون المسافة الآمنة" : "Safe Distance Law", desc: language === 'ar' ? "قاعدة الثانيتين في الظروف المثالية ومضاعفتها في الظروف الجوية السيئة لتجنب الاصطدامات الخلفية." : "The two-second rule in ideal conditions and doubling it in bad weather to avoid rear-end collisions." },
          { sub: language === 'ar' ? "تغيير المسار الانسيابي" : "Smooth Lane Changing", desc: language === 'ar' ? "نظام (Mirror, Signal, Manoeuvre) - الانتقال الانسيابي مع التسارع الإيجابي للحفاظ على تدفق السير." : "The Mirror, Signal, Manoeuvre system - smooth transition with positive acceleration to maintain flow." },
          { sub: language === 'ar' ? "هندسة الدوارات" : "Roundabout Engineering", desc: language === 'ar' ? "تحديد المسارات بناءً على المخرج، وإعطاء الأولوية المطلقة لجهة اليسار مع إشارة الخروج الإلزامية." : "Lane selection based on exit, giving absolute priority to the left with a mandatory exit signal." },
        ]
      }
    ],
    parkingStage: {
      id: "stage-4",
      title: language === 'ar' ? "الميدان الذكي" : "Smart Field",
      desc: language === 'ar' ? "إتقان مناورات المواقف الخمس باستخدام الحساسات والذكاء الاصطناعي." : "Mastering the five parking maneuvers using sensors and AI.",
      icon: Construction,
      details: [
        { sub: language === 'ar' ? "المواقف المتوازية (Parallel)" : "Parallel Parking", desc: language === 'ar' ? "ركن المركبة في مساحة محدودة باستخدام نقاط مرجعية (Reference Points) دقيقة تضمن التوسيط الكامل." : "Parking in a limited space using precise Reference Points ensuring perfect centering." },
        { sub: language === 'ar' ? "المواقف العمودية (90 Degree)" : "Perpendicular Parking", desc: language === 'ar' ? "الدخول في الموقف بزاوية قائمة مع الحفاظ على مسافة متساوية من الخطوط الجانبية الذكية." : "Entering at a right angle while maintaining equal distance from the smart side lines." },
        { sub: language === 'ar' ? "توازن المرتفع (Hill Start)" : "Hill Start Mastery", desc: language === 'ar' ? "توازن القوة بين المحرك وفرامل اليد للانطلاق من المرتفع دون أي رجوع للخلف." : "Power balance between engine and handbrake to start on an incline without rolling back." },
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 space-y-16 animate-fade-in pb-32 overflow-x-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="academic-badge mx-auto glass-card flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          {language === 'ar' ? "دليل الاحتراف المعرفي" : "Professional Mastery Guide"}
        </div>
        <h1 className="text-4xl md:text-7xl font-black font-headline tracking-tighter leading-tight smart-gradient-text">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
          {t.description}
        </p>
      </div>

      <Tabs defaultValue="road" className="w-full max-w-5xl mx-auto">
        <TabsList className="flex w-full h-auto p-1.5 bg-secondary/20 rounded-2xl md:rounded-full border border-white/5 mb-16 shadow-2xl backdrop-blur-md">
          <TabsTrigger value="road" className="flex-1 py-4 md:py-5 rounded-xl md:rounded-full font-black text-xs md:text-lg flex items-center justify-center gap-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all">
            <Map className="h-4 w-4 md:h-6 md:w-6 shrink-0" /> 
            <span className="truncate">{t.part1Title}</span>
          </TabsTrigger>
          <TabsTrigger value="parking" className="flex-1 py-4 md:py-5 rounded-xl md:rounded-full font-black text-xs md:text-lg flex items-center justify-center gap-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-xl transition-all">
            <Construction className="h-4 w-4 md:h-6 md:w-6 shrink-0" /> 
            <span className="truncate">{t.part2Title}</span>
          </TabsTrigger>
        </TabsList>

        {/* Road Skills Content */}
        <TabsContent value="road" className="space-y-12">
          {t.roadStages.map((stage, idx) => (
            <Card key={stage.id} className="overflow-hidden border-white/5 bg-card/30 backdrop-blur-2xl rounded-[3rem] group hover:border-primary/20 transition-all duration-700 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-4 relative h-56 lg:h-auto overflow-hidden">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl || ""} 
                    alt={stage.title} 
                    fill 
                    className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/40 to-transparent" />
                  <div className="absolute top-8 left-8 md:top-12 md:left-12 bg-primary/20 backdrop-blur-xl border border-primary/30 text-white h-16 w-16 md:h-24 md:w-24 rounded-[2rem] flex items-center justify-center font-black text-2xl md:text-5xl shadow-2xl">
                    {idx + 1}
                  </div>
                </div>

                <div className="lg:col-span-8 p-8 md:p-16 lg:p-20 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-5">
                      <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner">
                        <stage.icon className="h-6 w-6 md:h-10 md:w-10" />
                      </div>
                      <h2 className="text-2xl md:text-5xl font-headline font-black tracking-tighter">{stage.title}</h2>
                    </div>
                    <p className="text-base md:text-xl text-muted-foreground font-medium opacity-70 leading-relaxed italic">{stage.desc}</p>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {stage.details.map((detail, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-none bg-white/5 rounded-3xl overflow-hidden">
                        <AccordionTrigger className="hover:no-underline py-6 px-8 hover:bg-white/5 transition-all text-left">
                          <div className="flex items-center gap-5">
                            <div className="h-3 w-3 rounded-full bg-primary/40 group-data-[state=open]:bg-primary transition-colors" />
                            <span className="font-black text-sm md:text-xl tracking-tight text-foreground/90">{detail.sub}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm md:text-lg leading-relaxed px-16 pb-8 pt-2 font-medium opacity-80">
                          {detail.desc}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Smart Parking Content */}
        <TabsContent value="parking">
          <Card className="overflow-hidden border-white/5 bg-accent/5 backdrop-blur-2xl rounded-[3rem] md:rounded-[5rem] group hover:border-accent/20 transition-all duration-700 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative h-56 lg:h-auto overflow-hidden">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === "scientific-library")?.imageUrl || ""} 
                  alt={t.parkingStage.title} 
                  fill 
                  className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/40 to-transparent" />
                <div className="absolute top-12 left-12 bg-accent text-accent-foreground h-24 w-24 rounded-[2.5rem] flex items-center justify-center font-black text-5xl shadow-2xl">
                  4
                </div>
              </div>

              <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-accent/10 text-accent">
                      <t.parkingStage.icon className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl md:text-6xl font-headline font-black text-accent tracking-tighter">{t.parkingStage.title}</h2>
                  </div>
                  <p className="text-lg md:text-2xl text-muted-foreground font-medium italic opacity-80 leading-relaxed">{t.parkingStage.desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.parkingStage.details.map((detail, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 space-y-4 hover:border-accent/30 transition-all shadow-xl group">
                      <div className="flex items-center gap-4 text-accent">
                        <Target className="h-6 w-6 group-hover:scale-125 transition-transform" />
                        <h4 className="font-black text-lg uppercase tracking-tight">{detail.sub}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium opacity-70">{detail.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Final */}
      <div className="max-w-4xl mx-auto p-10 md:p-20 rounded-[4rem] glass-card border-primary/20 text-center space-y-10 relative overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.1)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tighter leading-none">
            {language === 'ar' ? "هل أنت مستعد للاحتراف؟" : "Ready for Mastery?"}
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground font-medium opacity-70 max-w-2xl mx-auto">
            {language === 'ar' 
              ? "بعد إتمام المنهج المعرفي، انتقل إلى المحاكي الذكي لتجربة اختبار RTA النظري الحقيقي."
              : "After completing the cognitive curriculum, proceed to the Smart Simulator for the real RTA theory experience."}
          </p>
          <div className="pt-10">
            <Link href="/assessment" className="inline-flex items-center justify-center h-20 md:h-24 px-12 md:px-20 rounded-[2.5rem] bg-primary text-white font-black text-xl md:text-3xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 group">
              {language === 'ar' ? "ابدأ التقييم الشامل" : "Start Full Assessment"}
              <Zap className="ml-4 h-6 w-6 md:h-8 md:w-8 fill-white group-hover:scale-125 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
