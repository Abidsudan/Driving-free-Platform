
"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  BookOpen, Map, Zap, Construction, Gauge, Navigation, 
  ShieldCheck, Award, Info, ChevronRight, CheckCircle2, 
  Sparkles, Target, Eye, Settings, Stepper, Car
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
        title: language === 'ar' ? "الخطوات الأساسية (ميدان التدريب)" : "Foundational Steps (Training Field)",
        desc: language === 'ar' ? "التعرف الميكانيكي والهندسي على المركبة في بيئة آمنة ومغلقة." : "Mechanical and engineering familiarity with the vehicle in a safe, closed environment.",
        icon: Gauge,
        details: [
          { 
            sub: language === 'ar' ? "فحص المركبة من الخارج" : "External Vehicle Inspection", 
            desc: language === 'ar' ? "التأكد من سلامة الإطارات (عدم وجود انثقاب)، عمل جميع الأضواء، نظافة المرايا، والبحث عن أي تسريبات للسوائل أو الزيوت أسفل المركبة." : "Checking tyres for punctures, verifying all lights, mirror cleanliness, and scanning for fluid or oil leaks under the vehicle." 
          },
          { 
            sub: language === 'ar' ? "الدخول الآمن للمركبة" : "Safe Vehicle Entry", 
            desc: language === 'ar' ? "فتح الباب ببطء وحذر، التأكد من عدم وجود مركبات أو دراجات مقتربة، الدخول بسلاسة، وإغلاق الباب بقوة كافية لضمان الإحكام." : "Opening the door cautiously, checking for approaching traffic or bikes, entering smoothly, and closing the door firmly for security." 
          },
          { 
            sub: language === 'ar' ? "لوحة الأجهزة (الطبلون)" : "Instrument Cluster (Dashboard)", 
            desc: language === 'ar' ? "فهم عداد السرعة، مقياس الوقود، مقياس الحرارة، وأضواء التحذير التي تنبهك فوراً عند وجود مشاكل فنية." : "Understanding the speedometer, fuel gauge, temperature gauge, and warning lights that signal technical issues immediately." 
          },
          { 
            sub: language === 'ar' ? "مقصورة القيادة والرؤية" : "Cockpit & Vision Setup", 
            desc: language === 'ar' ? "إغلاق الأبواب بإحكام، تفعيل قفل الأطفال، تنظيف الزجاج داخلياً، وضمان خلو المقصورة من أي عوائق تحجب الرؤية." : "Ensuring doors are locked, child locks active, internal glass is clean, and the cabin is free of visual obstructions." 
          },
          { 
            sub: language === 'ar' ? "هندسة الجلوس الصحيح" : "Correct Seating Geometry", 
            desc: language === 'ar' ? "الجلوس بظهر مستقيم، ضبط المسافة لضمان انثناء خفيف في الركبة عند الضغط على الدواسات، وضبط مسند الرأس لحماية الرقبة." : "Sitting with a straight back, adjusting distance for slight knee flex on pedals, and aligning the headrest to protect the neck." 
          },
          { 
            sub: language === 'ar' ? "أجهزة التحكم والدواسات" : "Primary Controls & Pedals", 
            desc: language === 'ar' ? "الاستخدام الدقيق لدواسة الوقود (يمين)، الفرامل (وسط)، والقابض/الكلتش (يسار في اليدوي)، بالإضافة لفرامل اليد وناقل الحركة." : "Precise use of the gas pedal (right), brake (center), and clutch (left in manual), along with the handbrake and gear lever." 
          },
          { 
            sub: language === 'ar' ? "تشغيل المحرك والانطلاق" : "Engine Start & Launch", 
            desc: language === 'ar' ? "التأكد من وضعية P أو N، الضغط على الفرامل، تشغيل المحرك، الانتظار لثوانٍ لتوزع الزيت، ثم الانطلاق بتدرج ولطف." : "Checking P or N position, pressing the brake, starting the engine, allowing oil circulation, and launching with gradual smoothness." 
          },
          { 
            sub: language === 'ar' ? "المحافظة على المسار" : "Lane Keeping & Steering", 
            desc: language === 'ar' ? "النظر بعيداً للأمام للحفاظ على التوسيط، استخدام المقود بحركة انسيابية، وتجنب الحركات المفاجئة أو الحادة." : "Looking far ahead for centering, using smooth steering movements, and avoiding sudden or sharp turns." 
          }
        ]
      },
      {
        id: "stage-2",
        title: language === 'ar' ? "الطرق العامة (كثافة خفيفة)" : "Public Roads (Low Traffic)",
        desc: language === 'ar' ? "تطبيق مهارات التحكم في بيئة حية مع التركيز على المراقبة والاندماج." : "Applying control skills in a live environment with focus on observation and integration.",
        icon: Navigation,
        details: [
          { 
            sub: language === 'ar' ? "بروتوكول النقطة العمياء" : "Blind Spot Protocol", 
            desc: language === 'ar' ? "إدراك المناطق التي لا تغطيها المرايا، واستخدام 'نظرة الكتف' الإلزامية قبل أي تغيير للمسار أو انعطاف." : "Recognizing areas mirrors don't cover, and performing the mandatory 'shoulder check' before any lane change or turn." 
          },
          { 
            sub: language === 'ar' ? "الخروج من طريق جانبي" : "Exiting Side Roads", 
            desc: language === 'ar' ? "التوقف التام، فحص المرايا والنقاط العمياء، استخدام الإشارة، والبحث عن فجوة زمنية آمنة للاندماج دون إرباك الآخرين." : "Stopping completely, checking mirrors and blind spots, signaling, and finding a safe time gap to merge without disrupting others." 
          },
          { 
            sub: language === 'ar' ? "فنون الدوران لليسار" : "The Art of Left Turns", 
            desc: language === 'ar' ? "تفعيل الإشارة مبكراً، التموضع الصحيح، تخفيف السرعة، إعطاء الأولوية للقادم من المواجه، وتنفيذ الدوران بشكل واسع وسلس." : "Signaling early, correct positioning, slowing down, giving priority to oncoming traffic, and executing a wide, smooth turn." 
          },
          { 
            sub: language === 'ar' ? "أولوية معابر المشاة" : "Pedestrian Crossing Priority", 
            desc: language === 'ar' ? "المسح البصري المستمر، الاستعداد للتوقف التام، ومنح الأولوية المطلقة للمشاة بمجرد ملامستهم لسطح الطريق." : "Continuous visual scanning, preparing for a total stop, and giving absolute priority to pedestrians once they step onto the road." 
          }
        ]
      },
      {
        id: "stage-3",
        title: language === 'ar' ? "الطرق العامة (كثافة عالية)" : "Public Roads (High Traffic)",
        desc: language === 'ar' ? "التعامل مع الازدحام، السرعات العالية، والإشارات الضوئية المعقدة." : "Handling congestion, high speeds, and complex traffic signals.",
        icon: Zap,
        details: [
          { 
            sub: language === 'ar' ? "الإشارات الضوئية والتقاطعات" : "Traffic Lights & Intersections", 
            desc: language === 'ar' ? "التوقف التام عند الأحمر، الاستعداد عند الأصفر، والانطلاق بحذر عند الأخضر بعد التأكد من خلو التقاطع وتقدير 'نقطة اللاعودة'." : "Stopping at red, preparing at yellow, and launching at green after clearing the junction and judging the 'point of no return'." 
          },
          { 
            sub: language === 'ar' ? "قانون مسافة الأمان" : "The Safety Distance Law", 
            desc: language === 'ar' ? "تطبيق قاعدة الثانيتين في الظروف الطبيعية، ومضاعفتها إلى 4 ثوانٍ أو أكثر في حالات المطر، الضباب، أو الغبار." : "Applying the 2-second rule in normal conditions, and doubling it to 4+ seconds in rain, fog, or dust." 
          },
          { 
            sub: language === 'ar' ? "تغيير المسار الانسيابي" : "Smooth Lane Changing", 
            desc: language === 'ar' ? "استخدام نظام (إشارة، مرايا، كتف)، البحث عن فجوة آمنة، والانتقال بحركة مقود ناعمة مع الحفاظ على التسارع الإيجابي." : "Using the (Signal, Mirror, Shoulder) system, finding a safe gap, and moving with smooth steering while maintaining positive acceleration." 
          },
          { 
            sub: language === 'ar' ? "الدوران للخلف والدوارات" : "U-Turns & Roundabouts", 
            desc: language === 'ar' ? "اختيار المسار الصحيح مبكراً، إعطاء الأولوية للقادم من اليسار في الدوار، واستخدام إشارة الخروج الإلزامية لتعريف الآخرين بنيتك." : "Selecting the correct lane early, giving priority to traffic from the left in roundabouts, and using mandatory exit signals." 
          },
          { 
            sub: language === 'ar' ? "تحديات القيادة الليلية" : "Night Driving Challenges", 
            desc: language === 'ar' ? "تشغيل الأنوار المنخفضة عند الغروب، تجنب الضوء العالي عند وجود مواجه، ومطابقة السرعة مع المدى المحدود للرؤية." : "Activating low beams at sunset, avoiding high beams for oncoming traffic, and matching speed to the limited visibility range." 
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
