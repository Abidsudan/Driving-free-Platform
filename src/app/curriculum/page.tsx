
"use client"

import Image from "next/image"
import Link from "next/link"
import { BookOpen, Map, Zap, Construction, Gauge, Navigation, ShieldCheck, Award, Info, ChevronRight, CheckCircle2 } from "lucide-react"
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
      ? "هيكل تعليمي متكامل مصمم وفق أحدث معايير دبي (RTA)، يجمع بين فيزياء المركبة وفن القيادة الميدانية."
      : "A comprehensive educational structure designed per Dubai (RTA) standards, combining vehicle physics and field driving art.",
    part1Title: language === 'ar' ? "مهارات الطريق" : "Road Skills",
    part2Title: language === 'ar' ? "المواقف الذكية" : "Smart Parking",
    stageLabel: language === 'ar' ? "المرحلة" : "Stage",
    roadStages: [
      {
        id: "stage-1",
        title: language === 'ar' ? "المرحلة الأولى: أساسيات التحكم" : "Stage 1: Control Foundations",
        desc: language === 'ar' ? "التعرف الميكانيكي والهندسي على المركبة في بيئة آمنة." : "Mechanical and engineering familiarity with the vehicle in a safe environment.",
        icon: Gauge,
        details: [
          { sub: language === 'ar' ? "1.01 فحص المركبة (P.O.W.D.E.R.S)" : "1.01 Vehicle Check (P.O.W.D.E.R.S)", desc: language === 'ar' ? "البروتوكول العالمي لفحص Petrol (الوقود)، Oil (الزيت)، Water (الماء)، Damage (الأضرار)، Electrics (الكهرباء)، Rubber (المطاط)، و Spares (الاحتياط)." : "The global protocol for checking Petrol, Oil, Water, Damage, Electrics, Rubber, and Spares." },
          { sub: language === 'ar' ? "1.05 هندسة الجلوس والتحكم" : "1.05 Seating Geometry & Control", desc: language === 'ar' ? "ضبط المقعد بزاوية 100-110 درجة لضمان انثناء الركبة وسرعة الاستجابة الفيزيائية للدواسات." : "Adjusting the seat to 100-110° to ensure knee flex and rapid physical response to pedals." },
          { sub: language === 'ar' ? "1.10 ضبط الرؤية الشاملة" : "1.10 Comprehensive Vision Setup", desc: language === 'ar' ? "تقنية الـ 90 درجة للمرايا الجانبية لتقليل البقع العمياء وتأمين مجال رؤية محيطي واسع." : "The 90° side mirror technique to minimize blind spots and secure a wide peripheral field of view." },
        ]
      },
      {
        id: "stage-2",
        title: language === 'ar' ? "المرحلة الثانية: الاندماج المروري" : "Stage 2: Traffic Integration",
        desc: language === 'ar' ? "تطبيق القيادة الدفاعية في الشوارع ذات الكثافة الخفيفة." : "Applying defensive driving in light traffic streets.",
        icon: Navigation,
        details: [
          { sub: language === 'ar' ? "2.01 بروتوكول البقعة العمياء" : "2.01 Blind Spot Protocol", desc: language === 'ar' ? "قاعدة (نظرة الكتف) الإلزامية قبل أي انحراف، حيث أن المرايا لا تغطي كامل الزوايا الفيزيائية للمركبة." : "The mandatory 'Shoulder Check' rule before any deviation, as mirrors don't cover all physical angles." },
          { sub: language === 'ar' ? "2.03 الاندماج الآمن (Time Gap)" : "2.03 Safe Integration (Time Gap)", desc: language === 'ar' ? "اختيار فجوة زمنية لا تقل عن 4 ثوانٍ عند الخروج من طريق جانبي لضمان عدم إرباك السير الرئيسي." : "Choosing a time gap of at least 4 seconds when exiting a side road to ensure no disruption to main traffic." },
          { sub: language === 'ar' ? "2.12 معابر المشاة والأولوية" : "2.12 Pedestrian Crossings & Priority", desc: language === 'ar' ? "الاحترام الكامل لحقوق المشاة وقاعدة الوقوف التام بمجرد ملامستهم لسطح الطريق." : "Full respect for pedestrian rights and the total stop rule once they touch the road surface." },
        ]
      },
      {
        id: "stage-3",
        title: language === 'ar' ? "المرحلة الثالثة: المناورات المتقدمة" : "Stage 3: Advanced Maneuvers",
        desc: language === 'ar' ? "التعامل مع الكثافة العالية، الطرق السريعة، والدوارات المعقدة." : "Handling heavy traffic, highways, and complex roundabouts.",
        icon: Zap,
        details: [
          { sub: language === 'ar' ? "3.04 قانون المسافة الآمنة" : "3.04 Safe Distance Law", desc: language === 'ar' ? "قاعدة الثانيتين في الظروف المثالية ومضاعفتها في الظروف الجوية السيئة لتجنب الاصطدامات الخلفية." : "The two-second rule in ideal conditions and doubling it in bad weather to avoid rear-end collisions." },
          { sub: language === 'ar' ? "3.08 تغيير المسار (M.S.M)" : "3.08 Lane Changing (M.S.M)", desc: language === 'ar' ? "نظام (Mirror, Signal, Manoeuvre) - الانتقال الانسيابي مع التسارع الإيجابي للحفاظ على تدفق السير." : "The Mirror, Signal, Manoeuvre system - smooth transition with positive acceleration to maintain flow." },
          { sub: language === 'ar' ? "3.12 هندسة الدوارات" : "3.12 Roundabout Engineering", desc: language === 'ar' ? "تحديد المسارات بناءً على المخرج، وإعطاء الأولوية المطلقة لجهة اليسار مع إشارة الخروج الإلزامية." : "Lane selection based on exit, giving absolute priority to the left with a mandatory exit signal." },
        ]
      }
    ],
    parkingStage: {
      id: "stage-4",
      title: language === 'ar' ? "المرحلة الرابعة: الميدان الذكي" : "Stage 4: Smart Field",
      desc: language === 'ar' ? "إتقان مناورات المواقف الخمس باستخدام الحساسات والذكاء الاصطناعي." : "Mastering the five parking maneuvers using sensors and AI.",
      icon: Construction,
      details: [
        { sub: language === 'ar' ? "المواقف المتوازية (Parallel)" : "Parallel Parking", desc: language === 'ar' ? "ركن المركبة في مساحة محدودة باستخدام نقاط مرجعية (Reference Points) دقيقة تضمن التوسيط الكامل." : "Parking in a limited space using precise Reference Points ensuring perfect centering." },
        { sub: language === 'ar' ? "المواقف العمودية (90 Degree)" : "Perpendicular Parking", desc: language === 'ar' ? "الدخول في الموقف بزاوية قائمة مع الحفاظ على مسافة متساوية من الخطوط الجانبية الذكية." : "Entering at a right angle while maintaining equal distance from the smart side lines." },
        { sub: language === 'ar' ? "المنحدر (Hill Start)" : "Hill Start", desc: language === 'ar' ? "توازن القوة بين المحرك وفرامل اليد للانطلاق من المرتفع دون أي رجوع للخلف." : "Power balance between engine and handbrake to start on an incline without rolling back." },
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 space-y-16 animate-fade-in pb-32">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="academic-badge mx-auto glass-card">
          <BookOpen className="h-4 w-4" />
          {language === 'ar' ? "دليل الاحتراف المعتمد" : "Professional Mastery Guide"}
        </div>
        <h1 className="text-4xl md:text-7xl font-black font-headline tracking-tighter leading-tight smart-gradient-text">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          {t.description}
        </p>
      </div>

      <Tabs defaultValue="road" className="w-full max-w-5xl mx-auto">
        <TabsList className="flex w-full h-auto p-1 bg-secondary/40 rounded-2xl md:rounded-full border border-white/5 mb-12 shadow-xl">
          <TabsTrigger value="road" className="flex-1 py-3 md:py-4 rounded-xl md:rounded-full font-black text-sm md:text-lg flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <Map className="h-5 w-5 shrink-0" /> 
            <span className="truncate">{t.part1Title}</span>
          </TabsTrigger>
          <TabsTrigger value="parking" className="flex-1 py-3 md:py-4 rounded-xl md:rounded-full font-black text-sm md:text-lg flex items-center justify-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all">
            <Construction className="h-5 w-5 shrink-0" /> 
            <span className="truncate">{t.part2Title}</span>
          </TabsTrigger>
        </TabsList>

        {/* Road Skills Content */}
        <TabsContent value="road" className="space-y-10">
          {t.roadStages.map((stage, idx) => (
            <Card key={stage.id} className="overflow-hidden border-white/5 bg-card/40 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[4rem] group hover:border-primary/20 transition-all duration-500 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-4 relative h-48 lg:h-auto overflow-hidden">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl || ""} 
                    alt={stage.title} 
                    fill 
                    className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/20 to-transparent" />
                  <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-primary text-white h-14 w-14 md:h-20 md:w-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center font-black text-2xl md:text-4xl shadow-2xl">
                    {idx + 1}
                  </div>
                </div>

                <div className="lg:col-span-8 p-6 md:p-12 lg:p-16 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <stage.icon className="h-6 w-6 md:h-8 md:w-8" />
                      </div>
                      <h2 className="text-2xl md:text-4xl font-headline font-black tracking-tight">{stage.title}</h2>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground font-medium">{stage.desc}</p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {stage.details.map((detail, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-white/5 mb-3">
                        <AccordionTrigger className="hover:no-underline py-4 px-5 rounded-2xl hover:bg-white/5 border border-transparent transition-all">
                          <div className="flex items-center gap-4 text-left">
                            <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center font-black text-sm text-primary">
                              {i + 1}
                            </div>
                            <span className="font-bold text-sm md:text-base tracking-tight">{detail.sub}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed py-4 px-6 border-l-2 border-primary/30 ml-9 mt-1 font-medium italic">
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
          <Card className="overflow-hidden border-white/5 bg-accent/5 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[4rem] group hover:border-accent/30 transition-all duration-500 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative h-48 lg:h-auto overflow-hidden">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === "scientific-library")?.imageUrl || ""} 
                  alt={t.parkingStage.title} 
                  fill 
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/20 to-transparent" />
                <div className="absolute top-10 left-10 bg-accent text-accent-foreground h-20 w-20 rounded-[2rem] flex items-center justify-center font-black text-4xl shadow-2xl">
                  4
                </div>
              </div>

              <div className="lg:col-span-8 p-6 md:p-12 lg:p-16 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent">
                      <t.parkingStage.icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl md:text-5xl font-headline font-black text-accent tracking-tight">{t.parkingStage.title}</h2>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground font-medium italic">{t.parkingStage.desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {t.parkingStage.details.map((detail, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3 hover:border-accent/40 transition-all shadow-lg">
                      <div className="flex items-center gap-3 text-accent">
                        <Award className="h-5 w-5" />
                        <h4 className="font-black text-sm md:text-base uppercase tracking-tight">{detail.sub}</h4>
                      </div>
                      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-medium">{detail.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Final */}
      <div className="max-w-4xl mx-auto p-8 md:p-16 rounded-[3rem] glass-card border-primary/20 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter">
            {language === 'ar' ? "هل أنت مستعد للاختبار؟" : "Ready for the Test?"}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-medium opacity-80">
            {language === 'ar' 
              ? "بعد إتقان هذه المراحل، حان الوقت لتجربة المحاكي الذكي الذي يغطي كامل بنك الأسئلة المطور."
              : "After mastering these stages, it's time to try the Smart Simulator covering the entire updated question bank."}
          </p>
          <div className="pt-6">
            <Link href="/assessment" className="inline-flex items-center justify-center h-16 md:h-20 px-8 md:px-12 rounded-2xl md:rounded-[2rem] bg-primary text-white font-black text-lg md:text-2xl shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 group">
              {language === 'ar' ? "ابدأ التقييم الشامل" : "Start Full Assessment"}
              <Zap className="ml-3 h-5 w-5 md:h-6 md:w-6 fill-white group-hover:scale-125 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
