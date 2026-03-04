
"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  BookOpen, Map, Zap, Construction, Gauge, Navigation, 
  ShieldCheck, Award, Info, ChevronRight, CheckCircle2, 
  Sparkles, Target, Eye, Settings, Car, ShieldAlert,
  Move, LayoutDashboard, Star, Camera, Compass
} from "lucide-react"
import { Card } from "@/components/ui/card"
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
      ? "هيكل تعليمي متكامل يجمع بين فيزياء المركبة وفن القيادة الميدانية بأسلوب علمي حديث."
      : "A comprehensive educational structure combining vehicle physics and field driving art.",
    part1Title: language === 'ar' ? "مهارات الطريق" : "Road Skills",
    part2Title: language === 'ar' ? "المواقف الذكية" : "Smart Parking",
    ctaTitle: language === 'ar' ? "هل أنت مستعد للاحتراف؟" : "Ready for Mastery?",
    ctaDesc: language === 'ar' 
      ? "انتقل الآن إلى المحاكي الذكي لتجربة اختبار RTA النظري الحقيقي."
      : "Proceed now to the Smart Simulator for the real RTA theory experience.",
    btnCta: language === 'ar' ? "ابدأ التقييم الشامل" : "Start Full Assessment",
    examinerTip: language === 'ar' ? "نصيحة الفاحص 🚦" : "Examiner Tip 🚦",
    instructorNote: language === 'ar' ? "ملاحظة فنية للمدرب 🛠️" : "Technical Instructor Note 🛠️",
    roadStages: [
      {
        id: "stage-1",
        title: language === 'ar' ? "المرحلة الأولى: التأسيس والتحكم" : "Stage 1: Foundations & Control",
        desc: language === 'ar' ? "فهم أبعاد المركبة، أدوات التحكم، وبناء روتين أمان ثابت." : "Understanding vehicle dimensions, controls, and building a solid safety routine.",
        icon: Gauge,
        visualId: "stage-1-visual",
        details: [
          { 
            sub: language === 'ar' ? "الروتين المسبق (D-S-M-B)" : "Pre-Driving Routine (D-S-M-B)", 
            desc: language === 'ar' 
              ? `بمجرد دخولك للسيارة، اتبع هذا التسلسل الإلزامي:
                • الأبواب: تأكد من إغلاق جميع الأبواب بإحكام.
                • تعديل المقعد: اضبط المسافة بحيث تضغط الفرامل بالكامل مع انحناء بسيط في الركبة.
                • المرايا: الوسطى تكشف الزجاج الخلفي، والجانبية تكشف 10% من هيكل السيارة.
                • حزام الأمان: اربط حزامك وتأكد من ربط مرافقيك.` 
              : "Mandatory sequence: Doors (closed), Seat (knee flex), Mirrors (road view), and Seatbelt usage.",
            tip: language === 'ar' ? "تحريك السيارة قبل ربط حزام الأمان لك أو لمرافقك يُعتبر خطأً ورسوباً فورياً." : "Moving before buckling up is an immediate fail."
          },
          { 
            sub: language === 'ar' ? "أدوات التحكم وقاعدة القدم الواحدة" : "Controls & One-Foot Rule", 
            desc: language === 'ar' 
              ? `• قاعدة القدم الواحدة: استخدم القدم اليمنى فقط للبنزين والفرامل. اليسرى تبقى مرتاحة.
                • ناقل الحركة (الجير): (P) للوقوف، (R) للرجوع، (N) للمحايد، (D) للقيادة.` 
              : "Use only the right foot for gas/brake. Gear positions: P (Park), R (Reverse), N (Neutral), D (Drive).",
            note: language === 'ar' ? "استخدام قدمين في سيارة أوتوماتيكية خطر جداً ويؤدي للرسوب الفوري." : "Using two feet in an automatic is dangerous and leads to failure."
          }
        ]
      },
      {
        id: "stage-2",
        title: language === 'ar' ? "المرحلة الثانية: الطرق السكنية (40 كم/س)" : "Stage 2: Residential Roads (40km/h)",
        desc: language === 'ar' ? "إدارة المساحات وتوقع المخاطر في البيئات الهادئة والتقاطعات." : "Space management and hazard anticipation in quiet areas and junctions.",
        icon: Compass,
        visualId: "stage-2-visual",
        details: [
          { 
            sub: language === 'ar' ? "قاعدة الـ 1.5 متر والتجاوز" : "1.5m Rule & Overtaking", 
            desc: language === 'ar' 
              ? `• السرعة: التزم بـ 40 كم/ساعة كحد أقصى.
                • المسافة الجانبية: اترك 1.5 متر عند المرور بجانب سيارات مركونة لتجنب فتح الأبواب المفاجئ.
                • التجاوز: ممنوع إلا للضرورة (عائق ثابت) وباتباع (مرآة-إشارة-كتف).` 
              : "Maintain 40km/h max. Keep 1.5m side distance from parked cars. Overtake only for fixed obstacles."
          },
          { 
            sub: language === 'ar' ? "تقاطعات T-Junctions" : "Handling T-Junctions", 
            desc: language === 'ar' 
              ? `• علامة قف (STOP): توقف تام (سكون العجلات) لـ 3 ثوانٍ قبل الخط.
                • علامة افسح الطريق (Give Way): خفف واستعد للتوقف للقادمين من الطريق الرئيسي.` 
              : "STOP sign: Full wheel stop for 3 seconds. Give Way: Slow down and yield to main road traffic."
          }
        ]
      },
      {
        id: "stage-3",
        title: language === 'ar' ? "المرحلة الثالثة: القيادة المتقدمة (60-80 كم/س)" : "Stage 3: Advanced Road (60-80km/h)",
        desc: language === 'ar' ? "إتقان السرعات العالية، الاندماج في الطرق السريعة، والدوارات." : "Mastering high speeds, highway merging, and complex roundabouts.",
        icon: Zap,
        visualId: "stage-3-visual",
        details: [
          { 
            sub: language === 'ar' ? "الاندماج والتسارع الإيجابي" : "Merging & Positive Acceleration", 
            desc: language === 'ar' 
              ? `الخطأ الأكبر هو الدخول ببطء! بمجرد استقامة السيارة في الطريق الرئيسي، اضغط بقوة لتصل لسرعة الشارع لتتجنب الاصطدام الخلفي.` 
              : "Avoid entering slowly. Once straightened on the main road, accelerate firmly to match street speed to avoid collisions."
          },
          { 
            sub: language === 'ar' ? "إتقان الدوارات (Roundabouts)" : "Mastering Roundabouts", 
            desc: language === 'ar' 
              ? `• الأولوية: دائماً للقادم من اليسار (داخل الدوار).
                • الإشارات: يمين للمخرج الأول، بدون إشارة للدخول للأمام مع إشارة يمين قبل الخروج.` 
              : "Priority to the left. Right signal for 1st exit. No entry signal for straight, right signal before exit.",
            tip: language === 'ar' ? "فخ المسار الأيسر: عند الخروج لليسار، انتقل فوراً للمسار الأيمن بمبادرة منك لتجنب مخالفة الالتزام باليمين." : "Left Lane Trap: After a left exit, move immediately back to the right lane."
          }
        ]
      }
    ],
    parkingStage: {
      id: "stage-4",
      title: language === 'ar' ? "المرحلة الرابعة: المواقف الذكية" : "Stage 4: Smart Parking",
      desc: language === 'ar' ? "إتقان مناورات الركن الخمس باستخدام النقاط المرجعية والتقنيات الذكية." : "Mastering five parking maneuvers using reference points and smart tech.",
      icon: Construction,
      visualId: "stage-4-visual",
      details: [
        { sub: language === 'ar' ? "الموقف المتوازي (Parallel)" : "Parallel Parking", desc: language === 'ar' ? "ركن المركبة في مساحة محدودة بين سيارتين باستخدام نقاط مرجعية دقيقة." : "Parking in limited space using precise reference points." },
        { sub: language === 'ar' ? "الموقف العمودي (90 Degree)" : "Perpendicular Parking", desc: language === 'ar' ? "الدخول في الموقف بزاوية قائمة مع الحفاظ على التوسيط الكامل." : "Entering stall at 90 degrees with perfect centering." }
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-16 animate-fade-in pb-32">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="academic-badge mx-auto glass-card flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          {language === 'ar' ? "دليل الاحتراف المعرفي" : "Professional Knowledge Guide"}
        </div>
        <h1 className="text-4xl md:text-7xl font-black font-headline tracking-tighter smart-gradient-text leading-tight">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
          {t.description}
        </p>
      </div>

      <Tabs defaultValue="road" className="w-full max-w-5xl mx-auto">
        <TabsList className="flex w-full h-auto p-1.5 bg-secondary/20 rounded-2xl md:rounded-full border border-white/5 mb-12 shadow-xl backdrop-blur-md">
          <TabsTrigger value="road" className="flex-1 py-4 md:py-5 rounded-xl md:rounded-full font-black text-xs md:text-lg flex items-center justify-center gap-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <Map className="h-4 w-4 md:h-6 md:w-6" /> 
            {t.part1Title}
          </TabsTrigger>
          <TabsTrigger value="parking" className="flex-1 py-4 md:py-5 rounded-xl md:rounded-full font-black text-xs md:text-lg flex items-center justify-center gap-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all">
            <Construction className="h-4 w-4 md:h-6 md:w-6" /> 
            {t.part2Title}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="road" className="space-y-10">
          {t.roadStages.map((stage, idx) => (
            <Card key={stage.id} className="tech-container group hover:border-primary/20 transition-all duration-700 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-4 relative h-48 lg:h-auto overflow-hidden">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id === stage.visualId)?.imageUrl || ""} 
                    alt={stage.title} 
                    fill 
                    className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                    data-ai-hint="driving instruction"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/40 to-transparent" />
                  <div className="absolute top-6 left-6 bg-primary/20 backdrop-blur-xl border border-primary/30 text-white h-12 w-12 md:h-16 md:w-16 rounded-2xl flex items-center justify-center font-black text-xl md:text-3xl shadow-2xl">
                    {idx + 1}
                  </div>
                </div>

                <div className="lg:col-span-8 p-6 md:p-12 space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <stage.icon className="h-6 w-6 md:h-8 md:w-8" />
                      </div>
                      <h2 className="text-2xl md:text-4xl font-headline font-black tracking-tight">{stage.title}</h2>
                    </div>
                    <p className="text-sm md:text-lg text-muted-foreground font-medium italic opacity-70">{stage.desc}</p>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-3">
                    {stage.details.map((detail, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-none bg-white/5 rounded-2xl overflow-hidden">
                        <AccordionTrigger className="hover:no-underline py-5 px-6 hover:bg-white/5 text-left">
                          <div className="flex items-center gap-4">
                            <div className="h-2 w-2 rounded-full bg-primary/40 group-data-[state=open]:bg-primary transition-colors" />
                            <span className="font-black text-xs md:text-lg tracking-tight">{detail.sub}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 md:px-12 pb-6 pt-2 space-y-5">
                          <p className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line opacity-80">
                            {detail.desc}
                          </p>
                          {detail.tip && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 items-start">
                              <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <p className="text-xs md:text-sm font-bold text-red-200/80">{detail.tip}</p>
                            </div>
                          )}
                          {detail.note && (
                            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex gap-3 items-start">
                              <Settings className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                              <p className="text-xs md:text-sm font-bold text-accent/80">{detail.note}</p>
                            </div>
                          )}
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
          <Card className="tech-container bg-accent/5 hover:border-accent/20 overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative h-48 lg:h-auto">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === t.parkingStage.visualId)?.imageUrl || ""} 
                  alt={t.parkingStage.title} 
                  fill 
                  className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000"
                  data-ai-hint="parking sensors"
                />
                <div className="absolute top-8 left-8 bg-accent text-accent-foreground h-16 w-16 rounded-2xl flex items-center justify-center font-black text-3xl shadow-2xl">
                  4
                </div>
              </div>
              <div className="lg:col-span-8 p-8 md:p-16 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-accent/10 text-accent">
                    <t.parkingStage.icon className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-headline font-black text-accent tracking-tighter">{t.parkingStage.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.parkingStage.details.map((detail, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-3 hover:border-accent/30 transition-all">
                      <div className="flex items-center gap-3 text-accent">
                        <Target className="h-5 w-5" />
                        <h4 className="font-black text-base uppercase tracking-tight">{detail.sub}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed opacity-70">{detail.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Final */}
      <div className="max-w-4xl mx-auto p-10 md:p-20 rounded-[4rem] glass-card border-primary/20 text-center space-y-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-6xl font-headline font-black tracking-tighter leading-none">
            {t.ctaTitle}
          </h2>
          <p className="text-base md:text-2xl text-muted-foreground font-medium opacity-70 max-w-2xl mx-auto">
            {t.ctaDesc}
          </p>
          <div className="pt-10">
            <Link href="/assessment" className="inline-flex items-center justify-center h-20 md:h-24 px-12 md:px-20 rounded-[2.5rem] bg-primary text-white font-black text-xl md:text-3xl shadow-2xl shadow-primary/30 hover:bg-primary/90 active:scale-95 group transition-all">
              {t.btnCta}
              <Zap className="ml-4 h-6 w-6 md:h-8 md:w-8 fill-white group-hover:scale-125 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
