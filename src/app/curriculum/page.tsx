
"use client"

import Image from "next/image"
import { CheckCircle2, BookOpen, Clock, Target, ArrowRight, ArrowLeft, Zap, GraduationCap, ShieldCheck, Gauge, Eye, Settings, Compass, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function CurriculumPage() {
  const { language, dir } = useLanguage();

  const t = {
    title: language === 'ar' ? "دليل تعليم قيادة السيارات في دبي" : "Dubai Driving Education Guide",
    description: language === 'ar' 
      ? "دليل شامل ومصمم لمساعدتك على فهم رحلتك في الحصول على رخصة القيادة في دبي، من ميدان التدريب وحتى الطرق السريعة."
      : "A comprehensive guide designed to help you understand your journey to obtaining a driver's license in Dubai, from the training yard to the highways.",
    stages: [
      {
        title: language === 'ar' ? "المرحلة الأولى: الخطوات الأساسية (ميدان التدريب)" : "Stage 1: Basic Steps (Training Field)",
        description: language === 'ar' ? "التعرف على المركبة وكيفية التحكم بها في بيئة آمنة وخاضعة للتحكم قبل الانتقال للطرق الحقيقية." : "Getting to know the vehicle and how to control it in a safe environment before moving to real roads.",
        topics: language === 'ar' 
          ? [
              "فحص المركبة من الخارج (الإطارات، الأضواء، السوائل)",
              "الدخول الصحيح للمركبة وفهم لوحة الأجهزة",
              "ضبط وضعية الجلوس، المرايا، وعجلة القيادة",
              "أجهزة التحكم الأساسية (الوقود، الفرامل، القابض)",
              "الانطلاق والوقوف والمحافظة على المسار"
            ]
          : [
              "Outside vehicle check (tires, lights, fluids)",
              "Correct entry and understanding the dashboard",
              "Adjusting seating, mirrors, and steering wheel",
              "Basic controls (Gas, Brake, Clutch)",
              "Launching, stopping, and lane maintenance"
            ],
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
        color: "from-blue-500/20 to-transparent",
        icon: <Gauge className="h-6 w-6" />
      },
      {
        title: language === 'ar' ? "المرحلة الثانية: الطرق العامة (مراوح خفيفة)" : "Stage 2: General Roads (Light Traffic)",
        description: language === 'ar' ? "تطبيق ما تعلمته في بيئة مرورية بسيطة للربط بين المهارات الأساسية والواقع." : "Applying what you learned in a simple traffic environment to bridge basic skills and reality.",
        topics: language === 'ar' 
          ? [
              "التعرف على النقاط العمياء وكيفية تجنبها",
              "الخروج الآمن من الطرق الجانبية",
              "إتقان الدوران لليمين واليسار بسلاسة",
              "التعامل مع معابر المشاة وإعطاء الأولوية",
              "المحافظة على السرعة المناسبة للطريق"
            ]
          : [
              "Blind spots identification and avoidance",
              "Safe exit from side roads",
              "Mastering smooth right and left turns",
              "Handling pedestrian crossings and priorities",
              "Maintaining road-appropriate speed"
            ],
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
        color: "from-purple-500/20 to-transparent",
        icon: <Eye className="h-6 w-6" />
      },
      {
        title: language === 'ar' ? "المرحلة الثالثة: الطرق العامة (كثافة عالية)" : "Stage 3: General Roads (Heavy Traffic)",
        description: language === 'ar' ? "التعامل مع الازدحام المروري، الإشارات الضوئية المعقدة، والدوارات الكبيرة." : "Handling traffic congestion, complex traffic lights, and large roundabouts.",
        topics: language === 'ar' 
          ? [
              "فهم ألوان الإشارات الضوئية ونقطة 'اللا عودة'",
              "تطبيق قانون الثانيتين لمسافة الأمان",
              "تغيير المسار وأداء الدوران للخلف (U-Turn)",
              "قواعد الدخول والخروج من الدوارات بأمان",
              "تحديات القيادة الليلية واستخدام الأضواء"
            ]
          : [
              "Traffic light logic and the 'point of no return'",
              "Applying the 2-second safety distance rule",
              "Lane changing and U-Turn maneuvers",
              "Rules for safe roundabout entry and exit",
              "Night driving challenges and light usage"
            ],
        image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=800",
        color: "from-amber-500/20 to-transparent",
        icon: <Compass className="h-6 w-6" />
      },
      {
        title: language === 'ar' ? "المرحلة الرابعة: المناورات الخاصة (المواقف)" : "Stage 4: Special Maneuvers (Parking)",
        description: language === 'ar' ? "إتقان أنواع مواقف السيارات المختلفة، القيادة على المنحدرات، وحالات الطوارئ." : "Mastering different types of parking, hill driving, and emergency situations.",
        topics: language === 'ar' 
          ? [
              "المواقف الجانبية (60°) والعمودية (90°)",
              "المواقف الموازية للرصيف بدقة",
              "الحركة على المنحدرات دون الرجوع للخلف",
              "تقنيات الفرملة الطارئة والسيطرة المفاجئة",
              "الفحص الدوري للسوائل الأساسية للمحرك"
            ]
          : [
              "60° angle and 90° vertical parking",
              "Precise parallel parking to the curb",
              "Slope movement without rolling back",
              "Emergency braking and sudden control",
              "Routine engine fluid inspection"
            ],
        image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800",
        color: "from-green-500/20 to-transparent",
        icon: <Settings className="h-6 w-6" />
      },
      {
        title: language === 'ar' ? "المرحلة الخامسة: الاختبارات النهائية" : "Stage 5: Final Tests",
        description: language === 'ar' ? "الخطوات الأخيرة لإثبات كفاءتك والحصول على الرخصة الرسمية من هيئة الطرق والمواصلات." : "Final steps to prove your competence and obtain the official license from the RTA.",
        topics: language === 'ar' 
          ? [
              "فحص الساحة الداخلي واختبار المناورات",
              "فحص الطريق الداخلي لتقييم المهارات المكتسبة",
              "اختبار RTA النهائي (نظري وعملي)",
              "القيادة المتقدمة على الطرق السريعة (120 دقيقة)",
              "التعامل مع الرياح الجانبية والسرعات العالية"
            ]
          : [
              "Internal yard test and maneuver screening",
              "Internal road test for overall skills assessment",
              "Final RTA test (Theory and Practical)",
              "Advanced highway driving (120 minutes)",
              "Handling crosswinds and high speeds"
            ],
        image: "https://images.unsplash.com/photo-1453133451515-5ff7c1ef5f63?auto=format&fit=crop&q=80&w=800",
        color: "from-red-500/20 to-transparent",
        icon: <ShieldCheck className="h-6 w-6" />
      }
    ],
    tipsTitle: language === 'ar' ? "نصائح ذهبية للنجاح" : "Pro Tips for Success",
    tips: [
      {
        title: language === 'ar' ? "السلامة أولاً" : "Safety First",
        text: language === 'ar' ? "حزام الأمان دائماً، لا هواتف، ولا قيادة تحت أي تأثير مشتت." : "Seat belt always, no phones, and no driving under any distracting influence.",
        icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
      },
      {
        title: language === 'ar' ? "الممارسة المنتظمة" : "Regular Practice",
        text: language === 'ar' ? "ابدأ بالطرق الهادئة ثم تدرج، واطلب من مدربك تصحيح أخطائك." : "Start with quiet roads then progress, and ask your instructor to correct errors.",
        icon: <Target className="h-5 w-5 text-blue-500" />
      },
      {
        title: language === 'ar' ? "الانتباه والتركيز" : "Attention & Focus",
        text: language === 'ar' ? "ركز على الطريق، راقب المشاة، وتوقع الأخطار قبل حدوثها." : "Focus on the road, watch pedestrians, and anticipate hazards before they happen.",
        icon: <Eye className="h-5 w-5 text-purple-500" />
      },
      {
        title: language === 'ar' ? "قوانين المرور" : "Traffic Laws",
        text: language === 'ar' ? "احترم حدود السرعة، التزم بالإشارات، وأعطِ الأولوية للمشاة." : "Respect speed limits, stick to signs, and give priority to pedestrians.",
        icon: <ShieldCheck className="h-5 w-5 text-green-500" />
      }
    ],
    conclusionTitle: language === 'ar' ? "الخاتمة" : "Conclusion",
    conclusionText: language === 'ar' 
      ? "هذا الدليل يوفر لك الأساس الذي تحتاجه لبدء رحلتك. القيادة الآمنة مسؤولية شخصية ومجتمعية. نتمنى لك رحلة ممتعة وقيادة آمنة."
      : "This guide provides you with the foundation you need to start your journey. Safe driving is a personal and social responsibility. We wish you an enjoyable journey and safe driving.",
    stageLabel: language === 'ar' ? "المرحلة" : "Stage"
  };

  return (
    <div className="container mx-auto px-6 py-20 space-y-32">
      {/* Header Section */}
      <div className="max-w-4xl space-y-8 animate-reveal-up">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.5em] border border-primary/20">
          <GraduationCap className="h-4 w-4" />
          {language === 'ar' ? 'أكاديمية القيادة' : 'DRIVING ACADEMY'}
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter leading-[0.9] smart-gradient-text">
          {t.title}
        </h1>
        <p className="text-2xl text-muted-foreground leading-relaxed font-medium max-w-2xl opacity-80">
          {t.description}
        </p>
      </div>

      {/* Stages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {t.stages.map((stage, idx) => (
          <div 
            key={idx} 
            className={cn(
              "relative group animate-reveal-up",
              `delay-${(idx + 1) * 100}`
            )}
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Card className="h-full overflow-hidden border-white/5 bg-card/40 rounded-[3.5rem] shadow-2xl relative z-10 hover:border-primary/30 transition-all duration-700 hover:-translate-y-4">
              <div className="relative h-72 w-full overflow-hidden">
                <Image 
                  src={stage.image} 
                  alt={stage.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t via-background/20 to-transparent", stage.color)} />
                <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-xl text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 shadow-2xl">
                  {t.stageLabel} 0{idx + 1}
                </div>
                <div className="absolute bottom-8 left-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-2xl">
                  {stage.icon}
                </div>
              </div>
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-4xl font-headline font-black tracking-tight group-hover:text-primary transition-colors leading-[1.1]">{stage.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-10 space-y-10">
                <p className="text-xl text-muted-foreground font-medium leading-relaxed opacity-80">{stage.description}</p>
                <div className="grid grid-cols-1 gap-4">
                  {stage.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl group/topic hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                      <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover/topic:bg-primary group-hover/topic:text-black transition-all">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover/topic:opacity-100">{topic}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
                    <Clock className="h-4 w-4" /> Comprehensive
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
                    <Target className="h-4 w-4" /> RTA Standards
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Success Tips Section */}
      <section className="space-y-16 py-20">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-7xl font-black font-headline smart-gradient-text tracking-tighter">
            {t.tipsTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.tips.map((tip, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
              <div className="mb-8 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-2xl font-black font-headline mb-4">{tip.title}</h3>
              <p className="text-muted-foreground font-medium opacity-70 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <div className="relative p-20 rounded-[4rem] overflow-hidden border border-white/5 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <Info className="h-64 w-64" />
        </div>
        <div className="max-w-3xl space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tight leading-none">
            {t.conclusionTitle}
          </h2>
          <p className="text-2xl text-muted-foreground font-medium leading-relaxed italic">
            &quot;{t.conclusionText}&quot;
          </p>
          <div className="pt-8 flex gap-6">
            <div className="h-1 w-24 bg-primary rounded-full" />
            <div className="h-1 w-12 bg-primary/30 rounded-full" />
            <div className="h-1 w-6 bg-primary/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

