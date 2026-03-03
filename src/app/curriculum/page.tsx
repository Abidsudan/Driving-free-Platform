
"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  BookOpen, Map, Zap, Construction, Gauge, Navigation, 
  ShieldCheck, Award, Info, ChevronRight, CheckCircle2, 
  Sparkles, Target, Eye, Settings, Car, ShieldAlert,
  Thermometer, Fuel, Search, LogIn, UserCheck, Play, Move, SquareSlash,
  UserCircle, AlertCircle
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
      ? "هيكل تعليمي متكامل يجمع بين فيزياء المركبة وفن القيادة الميدانية بأسلوب علمي حديث، مصمم لضمان الاحتراف المعرفي والنجاح الميداني."
      : "A comprehensive educational structure combining vehicle physics and field driving art, designed for cognitive mastery and field success.",
    part1Title: language === 'ar' ? "مهارات الطريق" : "Road Skills",
    part2Title: language === 'ar' ? "المواقف الذكية" : "Smart Parking",
    ctaTitle: language === 'ar' ? "هل أنت مستعد للاحتراف؟" : "Ready for Mastery?",
    ctaDesc: language === 'ar' 
      ? "بعد إتمام المنهج المعرفي، انتقل إلى المحاكي الذكي لتجربة اختبار RTA النظري الحقيقي."
      : "After completing the cognitive curriculum, proceed to the Smart Simulator for the real RTA theory experience.",
    btnCta: language === 'ar' ? "ابدأ التقييم الشامل" : "Start Full Assessment",
    examinerTip: language === 'ar' ? "نصيحة الفاحص 🚦" : "Examiner Tip 🚦",
    instructorNote: language === 'ar' ? "ملاحظة فنية للمدرب 🛠️" : "Technical Instructor Note 🛠️",
    roadStages: [
      {
        id: "stage-1",
        title: language === 'ar' ? "المرحلة الأولى: البداية والتأسيس" : "Stage 1: The Beginning & Foundations",
        desc: language === 'ar' ? "بناء روتين أمان ثابت وفهم أبعاد المركبة قبل تشغيل المحرك." : "Building a consistent safety routine and understanding vehicle dimensions before starting.",
        icon: Gauge,
        details: [
          { 
            sub: language === 'ar' ? "الروتين المسبق (قاعدة أبواب - مقعد - مرايا - حزام)" : "Pre-Driving Routine (D-S-M-B)", 
            desc: language === 'ar' 
              ? `بمجرد دخولك للسيارة، هناك تسلسل إلزامي:
                • الأبواب: تأكد من إغلاق جميع الأبواب بإحكام (تحقق من لوحة العدادات).
                • تعديل المقعد: اضبط المسافة بحيث تضغط الفرامل بالكامل مع انحناء بسيط في الركبة.
                • الظهر: اضبط زاوية الظهر لراحة اليدين (100-110 درجة) مع انحناء خفيف في المرفقين.
                • مسند الرأس: يجب أن يكون في مستوى منتصف رأسك لحماية الرقبة.
                • المرايا: الوسطى تكشف الزجاج الخلفي كاملاً، والجانبية تكشف 90% من الطريق و10% من هيكل السيارة.
                • حزام الأمان: اربط حزامك وتأكد من ربط المرافقين لحزامهم.` 
              : "Mandatory sequence: Doors (fully closed), Seat (knee flex), Back (100-110 degrees), Headrest (mid-head), Mirrors (Max road view), and Seatbelt usage.",
            tip: language === 'ar' ? "تحريك السيارة قبل ربط حزام الأمان لك أو لمرافقك يُعتبر خطأً ورسوباً فورياً." : "Moving the car before buckling up yourself or passengers is an immediate fail."
          },
          { 
            sub: language === 'ar' ? "أدوات التحكم وبروتوكول الانطلاق" : "Controls & Moving Off Protocol", 
            desc: language === 'ar' 
              ? `• قاعدة القدم الواحدة: استخدم القدم اليمنى فقط للبنزين والفرامل. اليسرى تبقى مرتاحة تماماً.
                • ناقل الحركة (P, R, N, D).
                • بروتوكول الانطلاق: 1. فرامل قدم، 2. غيّر لـ (D)، 3. أنزل الهاند بريك، 4. مرايا وإشارة، 5. نظرة الكتف (حاسمة)، 6. انطلق بنعومة.` 
              : "One-foot rule: Right foot for Gas/Brake. Gear positions (P,R,N,D). Moving off: 1. Brake, 2. Shift to D, 3. Release Handbrake, 4. Mirrors/Signal, 5. Crucial Shoulder Check, 6. Smooth roll.",
            tip: language === 'ar' ? "استخدام قدمين في سيارة أوتوماتيكية خطر جداً ويؤدي للرسوب." : "Using two feet in an automatic car is extremely dangerous and leads to failure."
          },
          { 
            sub: language === 'ar' ? "بروتوكول التوقف الآمن" : "Safe Stopping Protocol", 
            desc: language === 'ar' 
              ? `1. افحص المرآة الوسطى واليمنى، وأعطِ إشارة لليمين.
                2. ارفع قدمك عن البنزين واضغط الفرامل بتدرج لتجنب التوقف العنيف.
                3. بعد الوقوف: اسحب فرامل اليد أولاً، ثم ضع الجير على (P)، ثم ارفع قدمك عن الفرامل.` 
              : "1. Mirrors & Right Signal. 2. Gradual Braking. 3. After stopping: Handbrake FIRST, then shift to P, then release foot brake.",
            note: language === 'ar' ? "سحب فرامل اليد قبل وضع الجير على P يضمن تحميل وزن السيارة على الفرامل وليس ناقل الحركة." : "Pulling the handbrake before shifting to P ensures the vehicle weight is held by the brakes."
          }
        ]
      },
      {
        id: "stage-2",
        title: language === 'ar' ? "المرحلة الثانية: الطرق الداخلية والتقاطعات" : "Stage 2: Internal Roads & Junctions",
        desc: language === 'ar' ? "إدارة المساحات والسرعة في المناطق السكنية والتعامل الاحترافي مع التقاطعات." : "Managing space and speed in residential areas and professional handling of junctions.",
        icon: Navigation,
        details: [
          { 
            sub: language === 'ar' ? "القيادة في المناطق السكنية (40 كم/ساعة)" : "Driving in Residential Areas (40km/h)", 
            desc: language === 'ar' 
              ? `تتطلب المناطق الداخلية إدارة صارمة للمساحات وتوقعاً مستمراً للمخاطر:
                • السرعة: التزم بـ 40 كم/ساعة كحد أقصى لضمان مسافة توقف آمنة.
                • التموضع: حافظ على مسارك في الجهة اليمنى وتجنب الاقتراب من الخط الفاصل.
                • قاعدة الـ 1.5 متر: عند المرور بجانب سيارات مركونة، اترك مسافة لا تقل عن 1.5 متر لتفادي فتح الأبواب المفاجئ.` 
              : "Residential areas require strict space management: Max 40km/h speed, keeping to the right, and the 1.5m side distance rule when passing parked cars." 
          },
          { 
            sub: language === 'ar' ? "فن التعامل مع تقاطعات (T-Junctions)" : "Handling T-Junctions", 
            desc: language === 'ar' 
              ? `• علامة قف (STOP): توقف تام (سكون العجلات) قبل الخط، حتى لو كان الطريق خالياً. تفقد (يسار - يمين - يسار).
                • علامة افسح الطريق (Give Way): خفف السرعة واستعد للتوقف. الأولوية للقادمين في الطريق الرئيسي.
                • لغة التواصل: استخدم التواصل البصري (Eye Contact) أو إشارات اليد الودية لتسهيل الحركة المرورية.` 
              : "STOP sign requires a full wheel stop before the line. Give Way sign requires yielding priority to the main road. Use eye contact to facilitate flow." 
          },
          { 
            sub: language === 'ar' ? "التجاوز والاندماج الآمن" : "Overtaking & Safe Merging", 
            desc: language === 'ar' 
              ? `• التجاوز للضرورة فقط: يُسمح به عند وجود عائق ثابت (سيارة متوقفة تماماً).
                • خطوات التجاوز: (مرآة - إشارة - نظرة كتف - مناورة حذرة - العودة للمسار).
                • الاندماج: ابحث عن فجوة زمنية آمنة لا تجبر الآخرين على تغيير سرعتهم.` 
              : "Overtaking is for static obstacles only. Follow the (Mirror-Signal-Shoulder) protocol. Merge without forcing others to brake." 
          }
        ]
      },
      {
        id: "stage-3",
        title: language === 'ar' ? "المرحلة الثالثة: الطرق العامة والسرعات" : "Stage 3: Public Roads & High Speeds",
        desc: language === 'ar' ? "التعامل مع الازدحام، الإشارات الضوئية المعقدة، والقيادة الدفاعية المتقدمة." : "Handling congestion, complex signals, and advanced defensive driving.",
        icon: Zap,
        details: [
          { 
            sub: language === 'ar' ? "بروتوكول الإشارات الضوئية" : "Traffic Signal Protocol", 
            desc: language === 'ar' 
              ? `• الأحمر: توقف تام قبل الخط.
                • الأصفر: استعد للتوقف (لا تسرع لاختراقها).
                • الأخضر: انطلق بحذر بعد التأكد من خلو التقاطع.
                • نقطة اللاعودة: تقدير المسافة التي يصبح فيها العبور آمناً أفضل من الفرملة العنيفة.` 
              : "Red: Full stop. Yellow: Prepare to stop. Green: Proceed with caution. Learn the 'Point of No Return'." 
          },
          { 
            sub: language === 'ar' ? "القيادة الدفاعية ومسافة الأمان" : "Defensive Driving & Safety Distance", 
            desc: language === 'ar' 
              ? `• قانون الثانيتين: اترك مسافة ثانيتين في الظروف الطبيعية.
                • ضاعف المسافة (4 ثوانٍ) في المطر أو الضباب.
                • المراقبة البعيدة: انظر لمسافة 15-20 مركبة أمامك لتوقع المخاطر مبكراً.` 
              : "2-second rule in ideal conditions, 4 seconds in rain. Scan 15-20 vehicles ahead to anticipate hazards." 
          },
          { 
            sub: language === 'ar' ? "الدوارات والـ U-Turn" : "Roundabouts & U-Turns", 
            desc: language === 'ar' 
              ? `• الدوارات: حدد مخرجك مبكراً، التزم بمسارك، والأولوية دائماً لليسار (داخل الدوار).
                • U-Turn: تأكد من الشاخصة المسموحة، التموضع في أقصى اليسار، ودوران كامل وسلس.` 
              : "Roundabouts: Choose lane early, yield to the left. U-Turns: Check signs, position left, and execute a smooth rotation." 
          }
        ]
      }
    ],
    parkingStage: {
      id: "stage-4",
      title: language === 'ar' ? "المرحلة الرابعة: المواقف الذكية (Smart Parking)" : "Stage 4: Smart Parking Exam",
      desc: language === 'ar' ? "إتقان مناورات المواقف الخمس باستخدام التقنيات الذكية والنقاط المرجعية." : "Mastering the five parking maneuvers using smart tech and reference points.",
      icon: Construction,
      details: [
        { sub: language === 'ar' ? "المواقف المتوازية (Parallel)" : "Parallel Parking", desc: language === 'ar' ? "ركن المركبة في مساحة محدودة بين سيارتين باستخدام نقاط مرجعية دقيقة تضمن التوسيط الكامل." : "Parking in a limited space between two cars using precise reference points for perfect centering." },
        { sub: language === 'ar' ? "المواقف العمودية (90 Degree)" : "Perpendicular Parking", desc: language === 'ar' ? "الدخول في الموقف بزاوية قائمة مع الحفاظ على مسافة متساوية من الخطوط الجانبية الذكية." : "Entering the stall at a 90-degree angle while maintaining equal distance from smart side lines." },
        { sub: language === 'ar' ? "توازن المرتفع (Hill Start)" : "Hill Start Mastery", desc: language === 'ar' ? "توازن القوة بين المحرك وفرامل اليد للانطلاق من المرتفع دون أي رجوع للخلف." : "Balancing power between engine and handbrake to launch on an incline without rolling back." },
        { sub: language === 'ar' ? "الوقوف الاضطراري (Emergency)" : "Emergency Braking", desc: language === 'ar' ? "الاستجابة الفورية والتحكم التام لإيقاف المركبة في أقصر مسافة ممكنة عند ظهور خطر مفاجئ." : "Immediate response and total control to stop the vehicle in the shortest distance when a sudden hazard appears." }
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 space-y-16 animate-fade-in pb-32 overflow-x-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="academic-badge mx-auto glass-card flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          {language === 'ar' ? "دليل الاحتراف المعرفي الشامل" : "Professional Knowledge Guide"}
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

        <TabsContent value="road" className="space-y-12">
          {t.roadStages.map((stage, idx) => (
            <Card key={stage.id} className="overflow-hidden border-white/5 bg-card/30 backdrop-blur-2xl rounded-[3rem] group hover:border-primary/20 transition-all duration-700 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-4 relative h-56 lg:h-auto overflow-hidden">
                  <Image 
                    src={idx === 0 ? PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl || "" : PlaceHolderImages.find(img => img.id === "hero-bg")?.imageUrl || ""} 
                    alt={stage.title} 
                    fill 
                    className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/40 to-transparent" />
                  <div className="absolute top-8 left-8 md:top-12 md:left-12 bg-primary/20 backdrop-blur-xl border border-primary/30 text-white h-16 w-16 md:h-24 md:w-24 rounded-[2rem] flex items-center justify-center font-black text-2xl md:text-5xl shadow-2xl">
                    {idx + 1}
                  </div>
                </div>

                <div className="lg:col-span-8 p-8 md:p-12 lg:p-16 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-5">
                      <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner">
                        <stage.icon className="h-6 w-6 md:h-10 md:w-10" />
                      </div>
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-headline font-black tracking-tighter leading-tight">{stage.title}</h2>
                    </div>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-medium opacity-70 leading-relaxed italic">{stage.desc}</p>
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
                        <AccordionContent className="px-8 md:px-16 pb-8 pt-2 space-y-6">
                          <div className="text-muted-foreground text-sm md:text-lg leading-relaxed font-medium opacity-80 whitespace-pre-line">
                            {detail.desc}
                          </div>
                          
                          {(detail as any).tip && (
                            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-4 items-start">
                              <ShieldAlert className="h-6 w-6 text-red-500 shrink-0 mt-1" />
                              <div>
                                <h5 className="font-black text-red-500 text-sm uppercase tracking-widest mb-1">{t.examinerTip}</h5>
                                <p className="text-sm md:text-base font-bold text-red-200/80">{(detail as any).tip}</p>
                              </div>
                            </div>
                          )}

                          {(detail as any).note && (
                            <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 flex gap-4 items-start">
                              <Settings className="h-6 w-6 text-accent shrink-0 mt-1" />
                              <div>
                                <h5 className="font-black text-accent text-sm uppercase tracking-widest mb-1">{t.instructorNote}</h5>
                                <p className="text-sm md:text-base font-bold text-accent/80">{(detail as any).note}</p>
                              </div>
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
                    <h2 className="text-3xl md:text-6xl font-headline font-black text-accent tracking-tighter leading-none">{t.parkingStage.title}</h2>
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
            {t.ctaTitle}
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground font-medium opacity-70 max-w-2xl mx-auto">
            {t.ctaDesc}
          </p>
          <div className="pt-10">
            <Link href="/assessment" className="inline-flex items-center justify-center h-20 md:h-24 px-12 md:px-20 rounded-[2.5rem] bg-primary text-white font-black text-xl md:text-3xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 group">
              {t.btnCta}
              <Zap className="ml-4 h-6 w-6 md:h-8 md:w-8 fill-white group-hover:scale-125 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
