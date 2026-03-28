"use client"

import Image from "next/image"
import Link from "next/link"
import { 
  BookOpen, Map, Zap, Construction, Gauge, Navigation, 
  ShieldCheck, Award, Info, ChevronRight, CheckCircle2, 
  Sparkles, Target, Eye, Settings, Car, ShieldAlert,
  Move, LayoutDashboard, Star, Camera, Compass, Microchip, BrainCircuit
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
    title: language === 'ar' ? "بروتوكولات التدريب الأكاديمي | DRV-X" : "Academic Training Protocols | DRV-X",
    description: language === 'ar' 
      ? "مسار تعليمي مهندس لفك شفرة الاستجابات الحركية ومزامنة الإدراك البصري مع فيزياء المركبة."
      : "An engineered pathway to decode motor responses and sync visual perception with vehicle physics.",
    part1Title: language === 'ar' ? "مهارات الطريق (DRV-ROAD)" : "Road Skills (DRV-ROAD)",
    part2Title: language === 'ar' ? "المواقف الذكية (PRK-SMART)" : "Smart Parking (PRK-SMART)",
    skillsLabel: language === 'ar' ? "المهارات الإدراكية المكتسبة:" : "Unlocked Cognitive Skills:",
    ctaTitle: language === 'ar' ? "هل أنت مستعد للاعتماد؟" : "Ready for Certification?",
    ctaDesc: language === 'ar' 
      ? "انتقل إلى مختبر المحاكاة لتأكيد المهارات المكتسبة في البروتوكولات الأكاديمية."
      : "Proceed to the Simulation Lab to verify skills acquired in the academic protocols.",
    btnCta: language === 'ar' ? "إطلاق التقييم المعرفي" : "Launch Cognitive Assessment",
    roadStages: [
      {
        id: "DRV-101",
        title: language === 'ar' ? "الوحدة 101: التأسيس والتحكم (Foundation)" : "Module 101: Foundations & Control",
        desc: language === 'ar' ? "معايرة أبعاد المركبة وبناء روتين أمان ثابت (D-S-M-B)." : "Calibrating vehicle dimensions and building a solid safety routine (D-S-M-B).",
        icon: Gauge,
        visualId: "stage-1-visual",
        skills: language === 'ar' ? ["المسح البصري", "التنسيق الحركي", "الوعي المحيطي"] : ["Visual Scanning", "Motor Coordination", "Spatial Awareness"],
        details: [
          { 
            sub: language === 'ar' ? "الروتين المسبق المعياري" : "Standard Pre-Drive Protocol", 
            desc: language === 'ar' 
              ? `التسلسل الإلزامي لمزامنة السائق مع المركبة:
                • Doors: التحقق الرقمي من الانغلاق.
                • Seat: هندسة الجلوس (انثناء الركبة 110 درجة).
                • Mirrors: تغطية 90% من الزوايا الميتة.
                • Seatbelt: تأمين الهيكل البشري.` 
              : "Mandatory sequence for driver-vehicle sync: Doors, Seat (110° flex), Mirrors (90% coverage), and Seatbelt.",
            tip: language === 'ar' ? "تحريك الكتلة قبل التأمين يعتبر فشلاً في البروتوكول الأمني." : "Mass movement before securing is a security protocol failure."
          }
        ]
      },
      {
        id: "DRV-202",
        title: language === 'ar' ? "الوحدة 202: المناطق الحضرية (Residential)" : "Module 202: Urban Environments",
        desc: language === 'ar' ? "إدارة المساحات وتوقع المخاطر في البيئات منخفضة السرعة (40 كم/س)." : "Space management and hazard anticipation in low-speed environments (40km/h).",
        icon: Compass,
        visualId: "stage-2-visual",
        skills: language === 'ar' ? ["إدارة المخاطر", "التواصل البصري", "تقدير المسافات"] : ["Risk Management", "Eye Contact", "Distance Estimation"],
        details: [
          { 
            sub: language === 'ar' ? "قانون الـ 1.5 متر الهيكلي" : "1.5m Structural Rule", 
            desc: language === 'ar' 
              ? `• مسافة الأمان: الحفاظ على 1.5 متر كعازل فيزيائي من الأجسام الثابتة.
                • التقاطعات: بروتوكول التوقف التام (3 ثوانٍ) لضمان سكون العجلات.` 
              : "Maintain 1.5m physical buffer from fixed objects. STOP protocol: 3s full wheel stasis."
          }
        ]
      },
      {
        id: "DRV-303",
        title: language === 'ar' ? "الوحدة 303: الطرق السريعة (Highways)" : "Module 303: High-Speed Operations",
        desc: language === 'ar' ? "إتقان الاندماج الديناميكي والسرعات العالية (80-100 كم/س)." : "Mastering dynamic merging and high-speed operations (80-100km/h).",
        icon: Zap,
        visualId: "stage-3-visual",
        skills: language === 'ar' ? ["اتخاذ القرار السريع", "الثبات الانفعالي", "مزامنة السرعة"] : ["Split-second Decision", "Emotional Stability", "Speed Syncing"],
        details: [
          { 
            sub: language === 'ar' ? "خوارزمية تغيير المسار" : "Lane Change Algorithm", 
            desc: language === 'ar' 
              ? `التسلسل: (Mirrors -> Signal -> Shoulder Check -> Move).
                التركيز: الحفاظ على الزخم الإيجابي أثناء الانتقال.` 
              : "Sequence: (Mirrors -> Signal -> Shoulder Check -> Move). Focus: Maintaining positive momentum."
          }
        ]
      }
    ],
    parkingStage: {
      id: "PRK-404",
      title: language === 'ar' ? "الوحدة 404: المواقف الذكية (Smart Parking)" : "Module 404: Smart Parking Tech",
      desc: language === 'ar' ? "إتقان المناورات الفيزيائية الخمس باستخدام النقاط المرجعية." : "Mastering five physical maneuvers using reference point logic.",
      icon: Construction,
      visualId: "stage-4-visual",
      skills: language === 'ar' ? ["الرؤية العكسية", "دقة التوجيه", "إدراك الأبعاد"] : ["Reverse Vision", "Steering Precision", "Dimension Perception"],
      details: [
        { sub: "Parallel Logic", desc: language === 'ar' ? "استخدام خوارزمية النقاط المرجعية (Reference Points) للركن المثالي." : "Utilizing reference point algorithms for perfect parking." }
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-16 animate-fade-in pb-32">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="academic-badge mx-auto glass-card flex items-center gap-3">
          <Microchip className="h-4 w-4 text-primary animate-pulse" />
          SYSTEM_VERSION: DRV-X-2026
        </div>
        <h1 className="text-4xl md:text-8xl font-black font-headline tracking-tighter leading-tight smart-gradient-text">
          {t.title}
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto opacity-80 leading-relaxed">
          {t.description}
        </p>
      </div>

      <Tabs defaultValue="road" className="w-full max-w-6xl mx-auto">
        <TabsList className="flex w-full h-auto p-2 bg-secondary/20 rounded-[2.5rem] border border-white/5 mb-16 shadow-2xl backdrop-blur-xl">
          <TabsTrigger value="road" className="flex-1 py-6 rounded-[2rem] font-black text-sm md:text-xl flex items-center justify-center gap-4 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <Map className="h-6 w-6" /> 
            {t.part1Title}
          </TabsTrigger>
          <TabsTrigger value="parking" className="flex-1 py-6 rounded-[2rem] font-black text-sm md:text-xl flex items-center justify-center gap-4 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all">
            <Construction className="h-6 w-6" /> 
            {t.part2Title}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="road" className="space-y-12">
          {t.roadStages.map((stage, idx) => (
            <Card key={stage.id} className="tech-container group hover:border-primary/30 transition-all duration-700 overflow-hidden bg-card/10">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden border-r border-white/5">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id === stage.visualId)?.imageUrl || ""} 
                    alt={stage.title} 
                    fill 
                    className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-transparent to-transparent" />
                  <div className="absolute top-8 left-8 bg-primary/20 backdrop-blur-xl border border-primary/30 text-white px-6 py-2 rounded-2xl font-code text-xs shadow-2xl">
                    MODULE_{stage.id}
                  </div>
                </div>

                <div className="lg:col-span-8 p-8 md:p-16 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-5">
                      <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                        <stage.icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter">{stage.title}</h2>
                    </div>
                    <p className="text-xl text-muted-foreground font-medium opacity-70 leading-relaxed">{stage.desc}</p>
                  </div>

                  {/* Cognitive Skills Unlocked */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{t.skillsLabel}</span>
                    <div className="flex flex-wrap gap-3">
                      {stage.skills.map((skill, i) => (
                        <div key={i} className="px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary/80">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {stage.details.map((detail, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-none bg-white/5 rounded-[2rem] overflow-hidden">
                        <AccordionTrigger className="hover:no-underline py-6 px-8 hover:bg-white/5">
                          <div className="flex items-center gap-4">
                            <BrainCircuit className="h-5 w-5 text-primary/40 group-data-[state=open]:text-primary transition-colors" />
                            <span className="font-black text-lg md:text-xl tracking-tight">{detail.sub}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-12 pb-10 pt-4 space-y-6">
                          <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line border-l-2 border-primary/20 pl-6">
                            {detail.desc}
                          </p>
                          {detail.tip && (
                            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex gap-4 items-start shadow-xl">
                              <ShieldAlert className="h-6 w-6 text-red-500 shrink-0" />
                              <p className="text-sm md:text-base font-bold text-red-200/80 leading-relaxed">{detail.tip}</p>
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
          <Card className="tech-container bg-accent/5 hover:border-accent/30 overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4 relative h-64 lg:h-auto border-r border-white/5">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === t.parkingStage.visualId)?.imageUrl || ""} 
                  alt={t.parkingStage.title} 
                  fill 
                  className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-8 left-8 bg-accent text-accent-foreground px-6 py-2 rounded-2xl font-code text-xs shadow-2xl">
                  MODULE_{t.parkingStage.id}
                </div>
              </div>
              <div className="lg:col-span-8 p-8 md:p-20 space-y-12">
                <div className="flex items-center gap-6">
                  <div className="p-5 rounded-2xl bg-accent/10 text-accent">
                    <t.parkingStage.icon className="h-10 w-10" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-headline font-black text-accent tracking-tighter">{t.parkingStage.title}</h2>
                </div>
                
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{t.skillsLabel}</span>
                  <div className="flex flex-wrap gap-3">
                    {t.parkingStage.skills.map((skill, i) => (
                      <div key={i} className="px-4 py-2 rounded-xl bg-accent/5 border border-accent/10 text-[10px] font-bold uppercase tracking-widest text-accent/80">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {t.parkingStage.details.map((detail, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 space-y-4 hover:border-accent/40 transition-all shadow-xl">
                      <div className="flex items-center gap-4 text-accent">
                        <Target className="h-6 w-6" />
                        <h4 className="font-black text-xl tracking-tight uppercase">{detail.sub}</h4>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed opacity-80">{detail.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lab CTA Section */}
      <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[5rem] glass-card border-primary/30 text-center space-y-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="relative z-10 space-y-8">
          <div className="inline-flex p-6 rounded-3xl bg-primary/10 text-primary mb-4 animate-float">
            <Microchip className="h-12 w-12" />
          </div>
          <h2 className="text-4xl md:text-7xl font-headline font-black tracking-tighter leading-none">
            {t.ctaTitle}
          </h2>
          <p className="text-xl md:text-3xl text-muted-foreground font-medium opacity-70 max-w-3xl mx-auto leading-relaxed">
            {t.ctaDesc}
          </p>
          <div className="pt-12">
            <Link href="/assessment" className="inline-flex items-center justify-center h-24 px-16 md:px-24 rounded-[3rem] bg-primary text-white font-black text-2xl md:text-4xl shadow-2xl shadow-primary/40 hover:bg-primary/90 active:scale-95 group transition-all">
              {t.btnCta}
              <Zap className="ml-5 h-8 w-8 md:h-10 md:w-10 fill-white group-hover:scale-125 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
