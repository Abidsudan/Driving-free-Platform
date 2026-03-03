
"use client"

import Image from "next/image"
import { CheckCircle2, BookOpen, ShieldCheck, Zap, Target, Gauge, Car, Construction, Map, Award, Eye, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/components/language-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CurriculumPage() {
  const { language } = useLanguage();

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
          { sub: language === 'ar' ? "1.01 فحص المركبة من الخارج" : "1.01 Exterior Check", desc: language === 'ar' ? "فحص الإطارات، الأضواء، المرايا، وتسريبات الزيوت لضمان سلامة الرحلة." : "Checking tires, lights, mirrors, and oil leaks to ensure trip safety." },
          { sub: language === 'ar' ? "1.02 الدخول للمركبة" : "1.02 Entering the Vehicle", desc: language === 'ar' ? "فتح الباب بحذر، التأكد من خلو الطريق، والدخول بسلاسة مع إغلاق الباب بإحكام." : "Opening the door carefully, checking the road, and entering smoothly while closing the door firmly." },
          { sub: language === 'ar' ? "1.03 لوحة الأجهزة (الطبلون)" : "1.03 Instrument Panel", desc: language === 'ar' ? "فهم عداد السرعة، مقياس الوقود، الحرارة، وأضواء التحذير الفنية." : "Understanding the speedometer, fuel gauge, temperature, and technical warning lights." },
          { sub: language === 'ar' ? "1.05 الجلوس الصحيح" : "1.05 Correct Seating", desc: language === 'ar' ? "ضبط المسافة مع الدواسات، زاوية الظهر (100-110 درجة)، ومسند الرأس لحماية الرقبة." : "Adjusting distance to pedals, backrest angle (100-110°), and headrest for neck protection." },
          { sub: language === 'ar' ? "1.07 أجهزة التحكم" : "1.07 Basic Controls", desc: language === 'ar' ? "إتقان وظائف الدواسات (وقود، فرامل، كلتش) وفرامل اليد وناقل الحركة." : "Mastering pedal functions (fuel, brake, clutch), handbrake, and gear shifter." },
          { sub: language === 'ar' ? "1.10 ضبط المرايا" : "1.10 Mirror Adjustment", desc: language === 'ar' ? "تأمين رؤية شاملة وتغطية النقاط العمياء عبر ضبط المرايا الثلاث بدقة." : "Securing comprehensive vision and covering blind spots by precisely adjusting the three mirrors." },
          { sub: language === 'ar' ? "1.12 الانطلاق والوقوف" : "1.12 Launching & Stopping", desc: language === 'ar' ? "تحريك المركبة وإيقافها بسلاسة تامة دون أي اهتزازات مفاجئة." : "Moving and stopping the vehicle perfectly smoothly without any sudden jerks." },
        ]
      },
      {
        id: "stage-2",
        title: language === 'ar' ? "المرحلة الثانية: الطرق العامة (كثافة خفيفة)" : "Stage 2: Public Roads (Light Traffic)",
        desc: language === 'ar' ? "تطبيق مهارات التحكم في بيئة مرورية حقيقية وبسيطة." : "Applying control skills in a real and simple traffic environment.",
        icon: Navigation,
        details: [
          { sub: language === 'ar' ? "2.01 النقاط العمياء" : "2.01 Blind Spots", desc: language === 'ar' ? "التزام بنظرة الكتف للتحقق من المناطق التي لا تظهر في المرايا قبل أي مناورة." : "Committing to the shoulder check to verify areas not visible in mirrors before any maneuver." },
          { sub: language === 'ar' ? "2.03 الخروج من طريق جانبي" : "2.03 Exiting a Side Road", desc: language === 'ar' ? "الاندماج الآمن مع حركة المرور الرئيسية باختيار فجوة زمنية مناسبة." : "Safe integration with main traffic by choosing an appropriate time gap." },
          { sub: language === 'ar' ? "2.08 الدوران لليسار" : "2.08 Left Turns", desc: language === 'ar' ? "عبور التقاطعات والانعطاف يساراً بشكل واسع وسلس مع إعطاء الأولوية." : "Crossing intersections and turning left widely and smoothly while giving priority." },
          { sub: language === 'ar' ? "2.12 معابر المشاة" : "2.12 Pedestrian Crossings", desc: language === 'ar' ? "الاحترام الكامل لحقوق المشاة والأولوية المطلقة لهم بمجرد لمسهم للشارع." : "Full respect for pedestrian rights and absolute priority once they touch the street." },
        ]
      },
      {
        id: "stage-3",
        title: language === 'ar' ? "المرحلة الثالثة: الطرق العامة (كثافة عالية)" : "Stage 3: Public Roads (Heavy Traffic)",
        desc: language === 'ar' ? "التعامل المتقدم مع الازدحام، السرعات العالية، والإشارات المعقدة." : "Advanced handling of congestion, high speeds, and complex signals.",
        icon: Zap,
        details: [
          { sub: language === 'ar' ? "3.02 الإشارات الضوئية" : "3.02 Traffic Lights", desc: language === 'ar' ? "التفاعل القانوني مع الألوان الثلاثة وتقدير 'نقطة اللاعودة' عند اللون الأصفر." : "Legal interaction with the three colors and estimating the 'point of no return' at yellow." },
          { sub: language === 'ar' ? "3.04 مسافة الأمان" : "3.04 Safety Distance", desc: language === 'ar' ? "تطبيق قانون الثانيتين ومضاعفتها في الظروف الجوية السيئة لتجنب الاصطدام." : "Applying the two-second rule and doubling it in bad weather to avoid collisions." },
          { sub: language === 'ar' ? "3.08 تغيير المسار" : "3.08 Lane Changing", desc: language === 'ar' ? "الانتقال الانسيابي باستخدام نظام (إشارة، مرايا، كتف) مع التسارع الإيجابي." : "Fluid transition using the (signal, mirrors, shoulder) system with positive acceleration." },
          { sub: language === 'ar' ? "3.12 الدوارات" : "3.12 Roundabouts", desc: language === 'ar' ? "تحديد المسار الصحيح، إعطاء الأولوية لليسار، واستخدام إشارة الخروج يميناً." : "Choosing the correct lane, giving priority to the left, and using the right exit signal." },
          { sub: language === 'ar' ? "3.14 القيادة الليلية" : "3.14 Night Driving", desc: language === 'ar' ? "التعامل مع ضعف الرؤية، استخدام المصابيح بشكل صحيح، وتقليل السرعة." : "Handling poor visibility, using lights correctly, and reducing speed." },
        ]
      }
    ],
    parkingStage: {
      id: "stage-4",
      title: language === 'ar' ? "المرحلة الرابعة: امتحان المواقف الذكي" : "Stage 4: Smart Parking Exam",
      desc: language === 'ar' ? "إتقان المناورات الخمس الأساسية في الميدان الذكي المجهز بالحساسات." : "Mastering the five basic maneuvers in the sensor-equipped smart field.",
      icon: Construction,
      details: [
        { sub: language === 'ar' ? "المواقف المتوازية (Parallel)" : "Parallel Parking", desc: language === 'ar' ? "ركن المركبة في مساحة ضيقة بين سيارتين باستخدام علامات دقيقة وحساسات ذكية." : "Parking the vehicle in a tight space between two cars using precise markers and smart sensors." },
        { sub: language === 'ar' ? "المواقف العمودية (90 Degree)" : "Perpendicular Parking", desc: language === 'ar' ? "الدخول في الموقف بزاوية قائمة لضمان توسيط المركبة تماماً داخل الخطوط." : "Entering the parking spot at a right angle to ensure the vehicle is perfectly centered." },
        { sub: language === 'ar' ? "المواقف المائلة (60 Degree)" : "Angle Parking", desc: language === 'ar' ? "مناورة الدخول والخروج من المواقف المائلة المعتمدة في المراكز التجارية." : "Maneuvering in and out of angled parking spots common in shopping malls." },
        { sub: language === 'ar' ? "الوقوف الاضطراري (Emergency)" : "Emergency Stop", desc: language === 'ar' ? "التفاعل الفوري مع إشارة التوقف المفاجئ والسيطرة على المركبة بذكاء." : "Instant reaction to a sudden stop signal and controlling the vehicle intelligently." },
        { sub: language === 'ar' ? "المرتفع (Hill Start)" : "Hill Start", desc: language === 'ar' ? "الوقوف والانطلاق من المنحدر دون رجوع المركبة للخلف باستخدام فرامل اليد." : "Stopping and starting on an incline without the vehicle rolling back using the handbrake." },
      ]
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-16 animate-fade-in">
      {/* Hero Header */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
          <BookOpen className="h-4 w-4" />
          {language === 'ar' ? "خارطة الطريق للاحتراف" : "Professional Roadmap"}
        </div>
        <h1 className="font-headline text-4xl md:text-7xl font-black leading-tight tracking-tighter">{t.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-2xl">
          {t.description}
        </p>
      </div>

      <Tabs defaultValue="road" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-2xl mx-auto h-16 p-2 bg-secondary/30 rounded-3xl border border-white/5 mb-16">
          <TabsTrigger value="road" className="rounded-2xl font-black text-lg flex items-center gap-3 data-[state=active]:bg-primary">
            <Map className="h-5 w-5" /> {t.part1Title}
          </TabsTrigger>
          <TabsTrigger value="parking" className="rounded-2xl font-black text-lg flex items-center gap-3 data-[state=active]:bg-accent">
            <Construction className="h-5 w-5" /> {t.part2Title}
          </TabsTrigger>
        </TabsList>

        {/* Section 1: Road Training */}
        <TabsContent value="road" className="space-y-12">
          <div className="grid grid-cols-1 gap-12">
            {t.roadStages.map((stage, idx) => (
              <Card key={stage.id} className="overflow-hidden border-white/5 bg-card/40 backdrop-blur-xl rounded-[3rem] group hover:border-primary/30 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden">
                    <Image 
                      src={PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl || ""} 
                      alt={stage.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-card/90 to-transparent lg:block hidden" />
                    <div className="absolute top-8 left-8 bg-primary text-white h-14 w-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-primary/40">
                      {idx + 1}
                    </div>
                    <div className="absolute bottom-8 left-8 text-white/80 font-black text-xs uppercase tracking-widest">
                      {t.stageLabel} {idx + 1}
                    </div>
                  </div>

                  <div className="lg:col-span-8 p-8 md:p-12 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                          <stage.icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-3xl md:text-4xl font-headline font-black tracking-tight">{stage.title}</CardTitle>
                      </div>
                      <p className="text-xl text-muted-foreground leading-relaxed font-medium">{stage.desc}</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {stage.details.map((detail, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border-white/5">
                          <AccordionTrigger className="hover:no-underline py-5 group">
                            <div className="flex items-center gap-5 text-left">
                              <div className="h-10 w-10 rounded-xl bg-secondary/50 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                {i + 1}
                              </div>
                              <span className="font-black text-lg group-hover:text-primary transition-colors">{detail.sub}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8 pl-14 border-l-4 border-primary/20 ml-5">
                            {detail.desc}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Section 2: Smart Parking */}
        <TabsContent value="parking">
          <Card className="overflow-hidden border-white/5 bg-accent/5 backdrop-blur-xl rounded-[4rem] group hover:border-accent/30 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === "scientific-library")?.imageUrl || ""} 
                  alt={t.parkingStage.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card/90 to-transparent lg:block hidden" />
                <div className="absolute top-10 left-10 bg-accent text-accent-foreground h-16 w-16 rounded-3xl flex items-center justify-center font-black text-3xl shadow-2xl">
                  4
                </div>
              </div>

              <div className="lg:col-span-8 p-8 md:p-16 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="p-5 rounded-3xl bg-accent/10 text-accent">
                      <t.parkingStage.icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-4xl md:text-5xl font-headline font-black text-accent">{t.parkingStage.title}</CardTitle>
                  </div>
                  <p className="text-2xl text-muted-foreground leading-relaxed italic">{t.parkingStage.desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.parkingStage.details.map((detail, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 space-y-4 hover:border-accent/50 transition-all">
                      <div className="flex items-center gap-3 text-accent">
                        <Award className="h-5 w-5" />
                        <h4 className="font-black text-lg uppercase tracking-tighter">{detail.sub}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{detail.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Final */}
      <div className="mt-20 p-16 rounded-[5rem] glass-card border-primary/20 text-center space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl md:text-6xl font-headline font-black">
            {language === 'ar' ? "هل أنت مستعد للمحاكاة النهائية؟" : "Ready for the Final Simulation?"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {language === 'ar' 
              ? "بعد دراسة هذه المراحل الأكاديمية والعملية، يمكنك الآن اختبار معرفتك في محاكي RTA الذكي الذي يغطي كامل بنك الأسئلة المطور."
              : "After studying these academic and practical phases, you can now test your knowledge in the Smart RTA simulator covering the entire updated question bank."}
          </p>
          <div className="pt-8">
            <a href="/assessment" className="inline-flex items-center justify-center h-20 px-16 rounded-3xl bg-primary text-white font-black text-2xl shadow-[0_20px_50px_rgba(59,130,246,0.4)] hover:bg-primary/90 transition-all active:scale-95 group">
              {language === 'ar' ? "ابدأ التقييم الشامل الآن" : "Start Full Assessment Now"}
              <Zap className="ml-4 h-6 w-6 fill-white group-hover:scale-125 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
