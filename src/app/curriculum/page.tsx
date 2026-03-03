"use client"

import Image from "next/image"
import { BookOpen, Map, Zap, Construction, Gauge, Navigation, CheckCircle2, ShieldCheck, Award, Info, ChevronRight, ArrowDownCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/components/language-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function CurriculumPage() {
  const { language, dir } = useLanguage();

  const t = {
    title: language === 'ar' ? "المنهج الأكاديمي المطور" : "Advanced Academic Curriculum",
    description: language === 'ar' 
      ? "هيكل تعليمي متكامل ينقسم إلى تدريب الطريق (الميدان والشوارع العامة) وامتحان المواقف الذكي، مصمم وفق أحدث معايير RTA."
      : "A comprehensive educational structure divided into Road Training (Field and Public Streets) and the Smart Parking Exam.",
    part1Title: language === 'ar' ? "القسم الأول: مهارات الطريق" : "Part 1: Road Skills",
    part2Title: language === 'ar' ? "القسم الثاني: المواقف الذكية" : "Part 2: Smart Parking",
    stageLabel: language === 'ar' ? "المرحلة" : "Stage",
    roadStages: [
      {
        id: "stage-1",
        title: language === 'ar' ? "المرحلة الأولى: الخطوات الأساسية (الميدان)" : "Stage 1: Basic Steps (Training Field)",
        desc: language === 'ar' ? "التعرف على المركبة والتحكم بها في بيئة آمنة." : "Getting to know the vehicle and controlling it in a safe environment.",
        icon: Gauge,
        details: [
          { sub: language === 'ar' ? "1.01 فحص المركبة من الخارج (P.O.W.D.E.R.S)" : "1.01 Exterior Check (P.O.W.D.E.R.S)", desc: language === 'ar' ? "فحص الإطارات (P)، الزيوت (O)، الماء (W)، الأضرار (D)، الكهرباء (E)، المطاط/المساحات (R)، والوقود (S)." : "Checking Petrol, Oil, Water, Damage, Electrics, Rubber, and Spares." },
          { sub: language === 'ar' ? "1.03 لوحة الأجهزة (الطبلون)" : "1.03 Instrument Panel", desc: language === 'ar' ? "فهم مؤشرات التحذير (الحمراء والبرتقالية)، مقياس سرعة الدوران، وحرارة المحرك الفيزيائية." : "Understanding warning lights, tachometer, and engine thermal physics." },
          { sub: language === 'ar' ? "1.05 الجلوس الصحيح والهندسة" : "1.05 Correct Seating & Geometry", desc: language === 'ar' ? "ضبط المسافة لضمان انثناء بسيط في الركبة، وزاوية الظهر (100-110 درجة) لتقليل وقت رد الفعل." : "Adjusting for knee bend and 100-110° backrest angle to optimize reaction time." },
          { sub: language === 'ar' ? "1.10 ضبط المرايا والزوايا" : "1.10 Mirror Adjustment & Angles", desc: language === 'ar' ? "تأمين رؤية شاملة وتغطية النقاط العمياء عبر ضبط المرايا الثلاث (نظام 90 درجة للمرايا الجانبية)." : "Securing comprehensive vision and covering blind spots (90° side mirror system)." },
        ]
      },
      {
        id: "stage-2",
        title: language === 'ar' ? "المرحلة الثانية: الطرق العامة (كثافة خفيفة)" : "Stage 2: Public Roads (Light Traffic)",
        desc: language === 'ar' ? "تطبيق مهارات التحكم في بيئة مرورية حقيقية وبسيطة." : "Applying control skills in a real and simple traffic environment.",
        icon: Navigation,
        details: [
          { sub: language === 'ar' ? "2.01 النقاط العمياء (Blind Spots)" : "2.01 Blind Spots", desc: language === 'ar' ? "التزام بنظرة الكتف السريعة (Head Check) للتحقق من المناطق التي لا تظهر في المرايا قبل أي مناورة." : "Strict commitment to the shoulder 'Head Check' before any maneuver." },
          { sub: language === 'ar' ? "2.03 الخروج من طريق جانبي" : "2.03 Exiting a Side Road", desc: language === 'ar' ? "الاندماج الآمن باختيار فجوة زمنية (Time Gap) لا تقل عن 4 ثوانٍ مع حركة المرور الرئيسية." : "Safe integration by choosing a minimum 4-second time gap with main traffic." },
          { sub: language === 'ar' ? "2.12 معابر المشاة والبروتوكول" : "2.12 Pedestrian Crossings Protocol", desc: language === 'ar' ? "الاحترام الكامل لحقوق المشاة والأولوية المطلقة لهم بمجرد لمسهم للشارع (قاعدة الوقوف التام)." : "Full respect for pedestrian rights once they touch the street (Total Stop Rule)." },
        ]
      },
      {
        id: "stage-3",
        title: language === 'ar' ? "المرحلة الثالثة: الطرق العامة (كثافة عالية)" : "Stage 3: Public Roads (Heavy Traffic)",
        desc: language === 'ar' ? "التعامل المتقدم مع الازدحام، السرعات العالية، والإشارات المعقدة." : "Advanced handling of congestion, high speeds, and complex signals.",
        icon: Zap,
        details: [
          { sub: language === 'ar' ? "3.04 مسافة الأمان وقانون الثانيتين" : "3.04 Safety Distance & 2-Sec Rule", desc: language === 'ar' ? "تطبيق قانون الثانيتين ومضاعفتها في الظروف الجوية السيئة لتجنب الاصطدام الفيزيائي الخلفي." : "Applying the two-second rule and doubling it in bad weather to avoid collisions." },
          { sub: language === 'ar' ? "3.08 تغيير المسار (نظام M.S.M)" : "3.08 Lane Changing (M.S.M System)", desc: language === 'ar' ? "نظام (Mirror, Signal, Manoeuvre) - الانتقال الانسيابي مع التسارع الإيجابي لعدم عرقلة السير." : "Mirror, Signal, Manoeuvre - Fluid transition with positive acceleration." },
          { sub: language === 'ar' ? "3.12 الدوارات والتموضع" : "3.12 Roundabouts & Positioning", desc: language === 'ar' ? "تحديد المسار الصحيح بناءً على المخرج، إعطاء الأولوية لليسار، واستخدام إشارة الخروج يميناً." : "Lane selection based on exit, giving priority to left, and signaling for exit." },
        ]
      }
    ],
    parkingStage: {
      id: "stage-4",
      title: language === 'ar' ? "المرحلة الرابعة: امتحان المواقف الذكي" : "Stage 4: Smart Parking Exam",
      desc: language === 'ar' ? "إتقان المناورات الخمس الأساسية في الميدان الذكي المجهز بالحساسات." : "Mastering the five basic maneuvers in the sensor-equipped smart field.",
      icon: Construction,
      details: [
        { sub: language === 'ar' ? "المواقف المتوازية (Parallel)" : "Parallel Parking", desc: language === 'ar' ? "ركن المركبة في مساحة ضيقة باستخدام نقاط مرجعية (Reference Points) دقيقة وحساسات." : "Parking in a tight space using precise Reference Points and smart sensors." },
        { sub: language === 'ar' ? "المواقف العمودية (90 Degree)" : "Perpendicular Parking", desc: language === 'ar' ? "الدخول في الموقف بزاوية قائمة لضمان التوسيط الكامل داخل خطوط الميدان الذكي." : "Entering at a right angle to ensure perfect centering within smart field lines." },
        { sub: language === 'ar' ? "المرتفع (Hill Start)" : "Hill Start", desc: language === 'ar' ? "الوقوف والانطلاق من المنحدر دون رجوع المركبة للخلف باستخدام فرامل اليد ونقاط توازن القوة." : "Starting on an incline without rolling back using handbrake and balance points." },
      ]
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 space-y-24 animate-fade-in">
      {/* Hero Header */}
      <div className="max-w-5xl space-y-8">
        <div className="academic-badge glass-card">
          <BookOpen className="h-4 w-4" />
          {language === 'ar' ? "خارطة الطريق للاحتراف" : "Professional Roadmap"}
        </div>
        <h1 className="font-headline text-5xl md:text-9xl font-black leading-[0.85] tracking-tighter smart-gradient-text">{t.title}</h1>
        <p className="text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl opacity-80">
          {t.description}
        </p>
      </div>

      <Tabs defaultValue="road" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-3xl mx-auto h-20 p-2 bg-secondary/40 rounded-[2.5rem] border border-white/5 mb-24 shadow-2xl">
          <TabsTrigger value="road" className="rounded-[2rem] font-black text-xl flex items-center gap-4 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Map className="h-6 w-6" /> {t.part1Title}
          </TabsTrigger>
          <TabsTrigger value="parking" className="rounded-[2rem] font-black text-xl flex items-center gap-4 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Construction className="h-6 w-6" /> {t.part2Title}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="road" className="space-y-16">
          {t.roadStages.map((stage, idx) => (
            <Card key={stage.id} className="overflow-hidden border-white/5 bg-card/40 backdrop-blur-3xl rounded-[4rem] group hover:border-primary/30 transition-all duration-700 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-4 relative h-80 lg:h-auto overflow-hidden">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl || ""} 
                    alt={stage.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-30 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-card/90 to-transparent lg:block hidden" />
                  <div className="absolute top-10 left-10 bg-primary text-white h-20 w-20 rounded-[2rem] flex items-center justify-center font-black text-4xl shadow-2xl shadow-primary/40">
                    {idx + 1}
                  </div>
                  <div className="absolute bottom-10 left-10 text-white/80 font-black text-sm uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                    {t.stageLabel} {idx + 1}
                  </div>
                </div>

                <div className="lg:col-span-8 p-10 md:p-20 space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="p-5 rounded-3xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <stage.icon className="h-10 w-10" />
                      </div>
                      <CardTitle className="text-4xl md:text-6xl font-headline font-black tracking-tighter">{stage.title}</CardTitle>
                    </div>
                    <p className="text-2xl text-muted-foreground leading-relaxed font-medium opacity-80">{stage.desc}</p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {stage.details.map((detail, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-white/5 mb-4">
                        <AccordionTrigger className="hover:no-underline py-6 px-8 rounded-[2rem] group/trigger data-[state=open]:bg-white/5 data-[state=open]:border-primary/20 border border-transparent transition-all">
                          <div className="flex items-center gap-6 text-left">
                            <div className="h-12 w-12 rounded-2xl bg-secondary/60 flex items-center justify-center font-black text-xl text-primary group-hover/trigger:bg-primary group-hover/trigger:text-white transition-all">
                              {i + 1}
                            </div>
                            <span className="font-black text-xl group-hover/trigger:text-primary transition-colors tracking-tight">{detail.sub}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-xl leading-relaxed py-8 px-12 border-l-4 border-primary/30 ml-14 mt-2 font-medium opacity-90">
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

        <TabsContent value="parking">
          <Card className="overflow-hidden border-white/5 bg-accent/5 backdrop-blur-3xl rounded-[5rem] group hover:border-accent/40 transition-all duration-1000 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative h-80 lg:h-auto overflow-hidden">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === "scientific-library")?.imageUrl || ""} 
                  alt={t.parkingStage.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card/90 to-transparent lg:block hidden" />
                <div className="absolute top-12 left-12 bg-accent text-accent-foreground h-24 w-24 rounded-[2.5rem] flex items-center justify-center font-black text-5xl shadow-2xl shadow-accent/40">
                  4
                </div>
              </div>

              <div className="lg:col-span-8 p-12 md:p-24 space-y-16">
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="p-6 rounded-[2rem] bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <t.parkingStage.icon className="h-12 w-12" />
                    </div>
                    <CardTitle className="text-5xl md:text-7xl font-headline font-black text-accent tracking-tighter">{t.parkingStage.title}</CardTitle>
                  </div>
                  <p className="text-3xl text-muted-foreground leading-relaxed italic font-medium opacity-80">{t.parkingStage.desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {t.parkingStage.details.map((detail, i) => (
                    <div key={i} className="p-10 rounded-[3rem] bg-black/40 border border-white/5 space-y-6 hover:border-accent/50 hover:-translate-y-2 transition-all group/item shadow-xl">
                      <div className="flex items-center gap-4 text-accent">
                        <Award className="h-8 w-8 group-hover/item:scale-125 transition-transform" />
                        <h4 className="font-black text-2xl uppercase tracking-tighter">{detail.sub}</h4>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed font-medium">{detail.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Final */}
      <div className="mt-32 p-20 md:p-32 rounded-[6rem] glass-card border-primary/20 text-center space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-64 -mt-64" />
        <div className="relative z-10 space-y-10">
          <h2 className="text-5xl md:text-8xl font-headline font-black tracking-tighter leading-none">
            {language === 'ar' ? "هل أنت مستعد للمحاكاة النهائية؟" : "Ready for the Final Simulation?"}
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-medium leading-relaxed opacity-80">
            {language === 'ar' 
              ? "بعد دراسة هذه المراحل الأكاديمية والعملية، يمكنك الآن اختبار معرفتك في محاكي RTA الذكي الذي يغطي كامل بنك الأسئلة المطور."
              : "After studying these academic and practical phases, you can now test your knowledge in the Smart RTA simulator covering the entire updated question bank."}
          </p>
          <div className="pt-12">
            <Link href="/assessment" className="inline-flex items-center justify-center h-24 px-20 rounded-[2.5rem] bg-primary text-white font-black text-3xl shadow-[0_20px_80px_rgba(59,130,246,0.5)] hover:bg-primary/90 transition-all active:scale-95 group">
              {language === 'ar' ? "ابدأ التقييم الشامل الآن" : "Start Full Assessment Now"}
              <Zap className="ml-5 h-8 w-8 fill-white group-hover:scale-125 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
