
"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  BookOpen, Map, Zap, Construction, Gauge, Navigation, 
  ShieldCheck, Award, Info, ChevronRight, CheckCircle2, 
  Sparkles, Target, Eye, Settings, Car, ShieldAlert,
  Thermometer, Fuel, Search, LogIn, UserCheck, Play, Move, SquareSlash
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
    roadStages: [
      {
        id: "stage-1",
        title: language === 'ar' ? "المرحلة الأولى: الخطوات الأساسية" : "Stage 1: Foundational Steps",
        desc: language === 'ar' ? "التعرف الميكانيكي والهندسي على المركبة في بيئة آمنة ومغلقة." : "Mechanical and engineering familiarity with the vehicle in a safe environment.",
        icon: Gauge,
        details: [
          { 
            sub: language === 'ar' ? "فحص الجاهزية الخارجية" : "External Readiness Inspection", 
            desc: language === 'ar' 
              ? "التأكد من سلامة الإطارات من الانثقاب، عمل كافة الأضواء (الأمامية، الخلفية، والجانبية)، نظافة المرايا، والبحث عن أي تسريبات للزيوت أو السوائل أسفل الهيكل لضمان رحلة آمنة." 
              : "Checking tyres for punctures, verifying all lights, mirror cleanliness, and scanning for fluid or oil leaks under the chassis to ensure a safe journey." 
          },
          { 
            sub: language === 'ar' ? "بروتوكول الدخول الآمن" : "Safe Entry Protocol", 
            desc: language === 'ar' 
              ? "فتح الباب ببطء وحذر، مراقبة خلو الطريق من المركبات أو الدراجات المقتربة، الدخول بسلاسة، ثم إغلاق الباب بقوة كافية لضمان الإحكام والأمان." 
              : "Opening the door cautiously, monitoring traffic or bikes, entering smoothly, and closing the door firmly for security." 
          },
          { 
            sub: language === 'ar' ? "تحليل لوحة الأجهزة (الطبلون)" : "Instrument Cluster Analysis", 
            desc: language === 'ar' 
              ? "فهم عداد السرعة (km/h)، ومقياس الوقود، ومراقب حرارة المحرك، بالإضافة لفك رموز أضواء التحذير التي تنبهك فوراً لأي خلل فني طارئ." 
              : "Understanding the speedometer, fuel gauge, engine temperature monitor, and warning light symbols that signal technical issues immediately." 
          },
          { 
            sub: language === 'ar' ? "تهيئة مقصورة القيادة" : "Cabin Configuration", 
            desc: language === 'ar' 
              ? "ضمان إغلاق الأبواب، تفعيل قفل أمان الأطفال، تنظيف الزجاج داخلياً، والتأكد من خلو المقصورة من أي عوائق قد تحجب مجال الرؤية الأكاديمي." 
              : "Ensuring doors are locked, child safety locks are active, internal glass is clean, and the cabin is free of visual obstructions." 
          },
          { 
            sub: language === 'ar' ? "هندسة الجلوس الصحيح" : "Ergonomic Seating Geometry", 
            desc: language === 'ar' 
              ? "الجلوس بظهر مستقيم، ضبط مسافة المقعد لضمان انثناء خفيف في الركبة عند الضغط، ضبط مساند الرأس لحماية الرقبة، وإمساك المقود في موضع الساعة (9 و 3)." 
              : "Sitting with a straight back, adjusting pedal distance for knee flex, aligning headrests, and holding the wheel at the (9 and 3) position." 
          },
          { 
            sub: language === 'ar' ? "سلامة الركاب والحمولة" : "Passenger & Cargo Safety", 
            desc: language === 'ar' 
              ? "الالتزام بربط حزام الأمان لكافة الركاب، استخدام مقاعد الأطفال المخصصة، وعدم تجاوز الحد الأقصى للركاب المسجل في رخصة المركبة." 
              : "Mandatory seatbelt usage for all, using appropriate child seats, and adhering to the legal maximum passenger capacity." 
          },
          { 
            sub: language === 'ar' ? "فهم أجهزة التحكم" : "Mastering Primary Controls", 
            desc: language === 'ar' 
              ? "الاستخدام الدقيق لدواسة الوقود (يمين)، والفرامل (وسط)، والقابض/الكلتش (يسار في اليدوي)، بالإضافة لفرامل اليد وناقل الحركة لتوجيه طاقة المركبة." 
              : "Precise control of the gas (right), brake (center), and clutch (left in manual), along with the handbrake and gear lever." 
          },
          { 
            sub: language === 'ar' ? "تشغيل المحرك التقني" : "Technical Engine Start", 
            desc: language === 'ar' 
              ? "التأكد من وضعية P أو N، الضغط بقوة على الفرامل، التشغيل، ثم الانتظار لثوانٍ لضمان توزيع الزيت داخل أجزاء المحرك الحيوية." 
              : "Checking P or N position, firm brake pressure, starting the engine, and allowing oil circulation before movement." 
          },
          { 
            sub: language === 'ar' ? "معايرة المرايا الدقيقة" : "Precision Mirror Calibration", 
            desc: language === 'ar' 
              ? "ضبط المرآة الوسطى لكشف الزجاج الخلفي بالكامل، والمرايا الجانبية لكشف المسارات المجاورة مع ظهور جزء ضئيل جداً من هيكل المركبة لتقليل النقاط العمياء." 
              : "Adjusting the center mirror for full rear view, and side mirrors to cover adjacent lanes with minimal vehicle body visibility." 
          },
          { 
            sub: language === 'ar' ? "فن الانطلاق والتوقف" : "Smooth Launch & Stop Art", 
            desc: language === 'ar' 
              ? "تحريك ناقل الحركة لـ D أو R، تحرير فرامل اليد، رفع القدم عن الفرامل ببطء، والضغط على الوقود بتدرج ناعم يمنع الاهتزاز المفاجئ." 
              : "Shifting to D or R, releasing the handbrake, slowly releasing the foot brake, and applying gas with gradual smoothness." 
          },
          { 
            sub: language === 'ar' ? "السيطرة والمحافظة على المسار" : "Steering & Lane Maintenance", 
            desc: language === 'ar' 
              ? "النظر بعيداً للأمام لتوسيط المركبة، استخدام المقود بحركة انسيابية، وتجنب الحركات الحادة، مع تخفيف السرعة الإلزامي قبل دخول المنحنيات." 
              : "Looking far ahead for centering, smooth steering movements, avoiding sharp turns, and mandatory deceleration before curves." 
          }
        ]
      },
      {
        id: "stage-2",
        title: language === 'ar' ? "المرحلة الثانية: الطرق العامة (كثافة خفيفة)" : "Stage 2: Public Roads (Low Traffic)",
        desc: language === 'ar' ? "تطبيق مهارات التحكم في بيئة حية مع التركيز على المراقبة والاندماج." : "Applying skills in a live environment with focus on observation and integration.",
        icon: Navigation,
        details: [
          { 
            sub: language === 'ar' ? "بروتوكول النقطة العمياء" : "Blind Spot Protocol", 
            desc: language === 'ar' 
              ? "إدراك المناطق غير المرئية في المرايا، واستخدام 'نظرة الكتف' الإلزامية كخطوة تأكيد أخيرة قبل أي تغيير للمسار أو انعطاف." 
              : "Identifying invisible zones and performing the mandatory 'shoulder check' as a final verification before any lane change or turn." 
          },
          { 
            sub: language === 'ar' ? "الخروج من طريق جانبي" : "Side Road Exit Mastery", 
            desc: language === 'ar' 
              ? "التوقف، الفحص الدقيق، استخدام الإشارة مبكراً، والبحث عن فجوة زمنية آمنة تضمن الاندماج دون إجبار الآخرين على تخفيف سرعتهم." 
              : "Stopping, thorough checking, early signaling, and finding a safe time gap to merge without disrupting traffic flow." 
          },
          { 
            sub: language === 'ar' ? "فنون الدوران لليسار" : "Advanced Left Turn Art", 
            desc: language === 'ar' 
              ? "تفعيل الإشارة، فحص النقطة العمياء اليسرى، تخفيف السرعة، إعطاء الأولوية للقادم من المواجه، وتنفيذ الدوران بشكل واسع وسلس." 
              : "Signaling, blind spot check, deceleration, yielding to oncoming traffic, and executing a wide, smooth turn." 
          },
          { 
            sub: language === 'ar' ? "أولوية معابر المشاة" : "Pedestrian Crossing Sovereignty", 
            desc: language === 'ar' 
              ? "المسح البصري المستمر، الاستعداد للتوقف التام، ومنح الأولوية المطلقة للمشاة بمجرد ملامستهم لسطح الطريق، دون أي استعجال لهم." 
              : "Continuous visual scanning, preparing for a total stop, and granting absolute priority to pedestrians the moment they step on the road." 
          }
        ]
      },
      {
        id: "stage-3",
        title: language === 'ar' ? "المرحلة الثالثة: الطرق العامة (كثافة عالية)" : "Stage 3: Public Roads (High Traffic)",
        desc: language === 'ar' ? "التعامل مع الازدحام، السرعات العالية، والإشارات الضوئية المعقدة." : "Handling congestion, high speeds, and complex traffic signals.",
        icon: Zap,
        details: [
          { 
            sub: language === 'ar' ? "الإشارات الضوئية والتقاطعات" : "Traffic Signal Logic", 
            desc: language === 'ar' 
              ? "التوقف التام عند الأحمر، الاستعداد عند الأصفر، والانطلاق بحذر عند الأخضر. تعلم تقدير 'نقطة اللاعودة' لتفادي الفرملة العنيفة الخطرة." 
              : "Stopping at red, preparing at yellow, and cautious green launches. Learning the 'point of no return' to avoid dangerous hard braking." 
          },
          { 
            sub: language === 'ar' ? "قانون مسافة الأمان الفيزيائي" : "The Physics of Safety Distance", 
            desc: language === 'ar' 
              ? "تطبيق قاعدة الثانيتين في الظروف المثالية، ومضاعفتها (4 ثوانٍ أو أكثر) في المطر أو الضباب لتفادي الاصطدام الخلفي الناتج عن القصور الذاتي." 
              : "Applying the 2-second rule in ideal conditions, and doubling it (4+ seconds) in rain or fog to avoid inertia-based collisions." 
          },
          { 
            sub: language === 'ar' ? "فن الانتقال بين المسارات" : "Fluid Lane Changing Art", 
            desc: language === 'ar' 
              ? "نظام (إشارة، مرايا، كتف)، البحث عن فجوة آمنة، والانتقال بحركة مقود ناعمة مع الحفاظ على 'التسارع الإيجابي' لعدم إرباك السير." 
              : "Using (Signal, Mirror, Shoulder), finding gaps, and moving with smooth steering and 'positive acceleration' to maintain flow." 
          },
          { 
            sub: language === 'ar' ? "الدوران للخلف والدوارات" : "U-Turns & Roundabout Mastery", 
            desc: language === 'ar' 
              ? "اختيار المسار الصحيح مبكراً، إعطاء الأولوية للقادم من اليسار في الدوار، واستخدام إشارة الخروج الإلزامية لتعريف الآخرين بنيتك." 
              : "Early lane selection, yielding to the left in roundabouts, and using mandatory exit signals to clarify intentions." 
          },
          { 
            sub: language === 'ar' ? "تحديات القيادة الليلية" : "Night Driving Dynamics", 
            desc: language === 'ar' 
              ? "تشغيل الأنوار المنخفضة، تجنب الضوء العالي للمواجه، تقليل السرعة لمطابقة مدى الرؤية، ومضاعفة التركيز لاكتشاف الأجسام غير المضاءة." 
              : "Low beam usage, avoiding high beams for oncoming traffic, speed reduction for visibility range, and heightened focus." 
          }
        ]
      }
    ],
    parkingStage: {
      id: "stage-4",
      title: language === 'ar' ? "الميدان الذكي (المواقف)" : "Smart Field (Parking)",
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
