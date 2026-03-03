"use client"

import Image from "next/image"
import { CheckCircle2, Info, BookOpen, ShieldCheck, Zap, Target, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/components/language-provider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CurriculumPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? "المنهج الأكاديمي التفصيلي" : "Detailed Academic Curriculum",
    description: language === 'ar' 
      ? "هيكل تعليمي منطقي يأخذك من الصفر وحتى الحصول على رخصة القيادة، مصمم وفقاً لمعايير RTA وأحدث النظريات العلمية في تدريب السائقين. هذا المنهج ليس مجرد تعليمات، بل هو دراسة لفيزياء الحركة وسلوك الطريق."
      : "A logical educational structure that takes you from zero to obtaining a driver's license, designed according to RTA standards and the latest scientific theories in driver training. This curriculum is a study of motion physics and road behavior.",
    stageLabel: language === 'ar' ? "المرحلة" : "Stage",
    learnMore: language === 'ar' ? "التفاصيل الأكاديمية للدرس" : "Academic Lesson Details",
    stages: [
      {
        title: language === 'ar' ? "المرحلة الأولى: هندسة المركبة والبيئة" : "Stage 1: Vehicle Engineering & Environment",
        description: language === 'ar' ? "تأسيس القاعدة المعرفية حول ميكانيكا المركبة وكيفية تهيئة بيئة القيادة المثالية." : "Establishing the knowledge base on vehicle mechanics and how to create the ideal driving environment.",
        icon: Gauge,
        details: language === 'ar' ? [
          {
            sub: "فحص ما قبل الانطلاق (P.O.W.D.E.R.S)",
            desc: "دراسة بروتوكول الفحص الشامل: البنزين، الزيت، الماء، الضرر الخارجي، الكهرباء، والمطاط (الإطارات). فهم ضغط الإطارات وتأثيره على التماسك."
          },
          {
            sub: "هندسة الجلوس ووضعيات القيادة",
            desc: "تطبيق قاعدة 'المعصم' لضبط المسافة مع المقود، وزاوية الظهر (100-110 درجة) لتقليل التعب وحماية العمود الفقري، وضبط مسند الرأس لمنع إصابات الرقبة."
          },
          {
            sub: "إدارة الرؤية والمجال البصري",
            desc: "ضبط المرايا الثلاث لتقليل النقاط العمياء (Blind Spots). شرح مفهوم 'الرؤية المحيطية' و'الرؤية المركزية' في استيعاب الطريق."
          }
        ] : [
          {
            sub: "Pre-trip Inspection (P.O.W.D.E.R.S)",
            desc: "Studying the comprehensive inspection protocol: Petrol, Oil, Water, Damage, Electrics, and Rubber (Tyres). Understanding tyre pressure's impact on grip."
          },
          {
            sub: "Seating Geometry & Driving Positions",
            desc: "Applying the 'wrist rule' for steering distance, backrest angle (100-110°) to minimize fatigue, and headrest adjustment to prevent whiplash."
          },
          {
            sub: "Vision Management & Visual Field",
            desc: "Adjusting the three mirrors to minimize blind spots. Explaining 'peripheral' vs 'central' vision in road perception."
          }
        ],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة الثانية: فيزياء التحكم والمناورة" : "Stage 2: Physics of Control & Maneuvering",
        description: language === 'ar' ? "الانتقال من الميكانيكا الساكنة إلى ديناميكيات الحركة والتحكم في عزم الدوران." : "Moving from static mechanics to movement dynamics and torque control.",
        icon: Zap,
        details: language === 'ar' ? [
          {
            sub: "قاعدة الثانيتين (2-Second Rule)",
            desc: "التفسير العلمي لمسافة الأمان: كيف تزيد هذه المسافة بناءً على مربع السرعة، وكيفية مضاعفتها في الظروف الرطبة لتجنب الاصطدام الخلفي."
          },
          {
            sub: "ديناميكيات الانعطاف ونقل الوزن",
            desc: "فهم كيف ينتقل ثقل المركبة عند الكبح (إلى الأمام) وعند التسارع (إلى الخلف). كيفية استخدام المكابح قبل المنعطف وليس داخله للحفاظ على التوازن."
          },
          {
            sub: "إدارة النقاط العمياء (Shoulder Check)",
            desc: "بروتوكول 'فحص الكتف' الإلزامي: متى وكيف يتم، ولماذا تعجز المرايا عن تغطية الزاوية الحادة (45 درجة) بجانب المركبة."
          }
        ] : [
          {
            sub: "The 2-Second Rule",
            desc: "Scientific explanation of following distance: how it increases based on the square of speed, and doubling it in wet conditions to avoid rear-end collisions."
          },
          {
            sub: "Cornering Dynamics & Weight Transfer",
            desc: "Understanding vehicle weight shift during braking (forward) and acceleration (backward). How to brake before the turn, not inside it, to maintain balance."
          },
          {
            sub: "Blind Spot Management (Shoulder Check)",
            desc: "The mandatory shoulder check protocol: when and how to perform it, and why mirrors fail to cover the acute 45° angle beside the vehicle."
          }
        ],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة الثالثة: قواعد الطرق السريعة" : "Stage 3: Highway Regulations & Flow",
        description: language === 'ar' ? "إتقان السرعات العالية، الانتقال بين المسارات، وإدارة التدفق المروري الكثيف." : "Mastering high speeds, lane transitions, and managing heavy traffic flow.",
        icon: Gauge,
        details: language === 'ar' ? [
          {
            sub: "بروتوكول منحدرات التسارع (Joining)",
            desc: "كيفية الوصول إلى سرعة الطريق (100-120 كم/س) داخل منحدر الدخول لضمان الاندماج الآمن دون عرقلة التدفق المروري."
          },
          {
            sub: "تغيير المسار المتقدم (M.S.M)",
            desc: "تطبيق نظام: مرآة (Mirror) -> إشارة (Signal) -> مناورة (Maneuver). شرح توقيت الإشارة (5 ثوانٍ على الأقل) قبل البدء في التحرك."
          },
          {
            sub: "إدارة المسار السريع والتجاوز",
            desc: "فهم أن المسار الأيسر هو للتجاوز فقط. بروتوكول العودة للمسار الأوسط بعد التجاوز لتجنب المخالفات المرورية في دبي."
          }
        ] : [
          {
            sub: "Acceleration Ramp Protocol (Joining)",
            desc: "How to reach road speed (100-120 km/h) within the entry ramp to ensure safe merging without obstructing traffic flow."
          },
          {
            sub: "Advanced Lane Change (M.S.M)",
            desc: "Applying the system: Mirror -> Signal -> Maneuver. Explaining the signaling timing (at least 5 seconds) before initiating movement."
          },
          {
            sub: "Fast Lane Management & Overtaking",
            desc: "Understanding that the leftmost lane is for overtaking only. The protocol for returning to the middle lane after overtaking to avoid fines in Dubai."
          }
        ],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة الرابعة: اختبار المدينة والدوارات" : "Stage 4: City Test & Roundabout Logic",
        description: language === 'ar' ? "التعامل مع التقاطعات المعقدة، الدوارات المتعددة المسارات، وإدارة المخاطر الحضرية." : "Handling complex intersections, multi-lane roundabouts, and urban risk management.",
        icon: Target,
        details: language === 'ar' ? [
          {
            sub: "منطق الدوارات في دبي",
            desc: "تحديد المسار الصحيح قبل دخول الدوار بناءً على المخرج المطلوب. قواعد الأولوية للقادم من اليسار واستخدام الإشارات داخل وخارج الدوار."
          },
          {
            sub: "إدراك المخاطر (Hazard Perception)",
            desc: "تطوير 'المسح البصري' للتعرف على المخاطر الكامنة: مشاة يقتربون من الرصيف، مركبات مركونة قد تتحرك فجأة، وتغيير الأضواء المرورية."
          },
          {
            sub: "بروتوكول الوقوف الاضطراري",
            desc: "كيفية التوقف التام في حالات الطوارئ مع الحفاظ على السيطرة على المقود، واستخدام أضواء التنبيه الرباعية (Hazard Lights) بشكل صحيح."
          }
        ] : [
          {
            sub: "Dubai Roundabout Logic",
            desc: "Selecting the correct lane before entry based on the desired exit. Priority rules for traffic from the left and signaling inside/outside the roundabout."
          },
          {
            sub: "Hazard Perception",
            desc: "Developing 'visual scanning' to recognize latent hazards: pedestrians approaching curbs, parked cars that might move, and changing traffic lights."
          },
          {
            sub: "Emergency Stop Protocol",
            desc: "How to come to a full stop in emergencies while maintaining steering control, and the correct usage of hazard lights."
          }
        ],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة الخامسة: الظروف القاسية والليل" : "Stage 5: Extreme Conditions & Night Physics",
        description: language === 'ar' ? "إدارة الرؤية المنخفضة، الانزلاق المائي، والقيادة تحت الضغط البيئي." : "Managing low visibility, hydroplaning, and driving under environmental pressure.",
        icon: ShieldCheck,
        details: language === 'ar' ? [
          {
            sub: "فيزياء الانزلاق المائي (Hydroplaning)",
            desc: "شرح كيف تفقد الإطارات التماس مع الأسفلت عند تجمع المياه، وكيفية استعادة السيطرة برفع القدم عن التسارع دون استخدام المكابح المفاجئة."
          },
          {
            sub: "الرؤية الليلية والإجهاد البصري",
            desc: "كيفية التعامل مع وهج الأضواء العالية، تقنيات النظر إلى 'الخط الجانبي' عند مواجهة مركبة مبهرة، وتأثير التعب على وقت الاستجابة (Response Time)."
          },
          {
            sub: "الرياح العرضية والضباب",
            desc: "استراتيجيات القيادة في العواصف الرملية والضباب في دبي: استخدام أضواء الضباب الخلفية، تقليل السرعة، وزيادة مسافة الأمان إلى 4 ثوانٍ."
          }
        ] : [
          {
            sub: "Hydroplaning Physics",
            desc: "Explaining how tyres lose contact with asphalt in standing water, and regaining control by easing off acceleration without sudden braking."
          },
          {
            sub: "Night Vision & Visual Fatigue",
            desc: "Handling high-beam glare, techniques for looking at the 'side line' when facing dazzling lights, and fatigue's impact on response time."
          },
          {
            sub: "Crosswinds & Fog",
            desc: "Strategies for sandstorms and fog in Dubai: using rear fog lights, reducing speed, and increasing following distance to 4 seconds."
          }
        ],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة السادسة: إتقان اختبار الطريق النهائي" : "Stage 6: Final Road Test Mastery",
        description: language === 'ar' ? "المحاكاة النهائية، ضبط النفس، وتجنب الأخطاء التي تؤدي للرسوب الفوري." : "Final simulation, self-control, and avoiding instant failure errors.",
        icon: BookOpen,
        details: language === 'ar' ? [
          {
            sub: "قائمة الأخطاء الكبرى (Major Errors)",
            desc: "تحليل الأسباب الستة للرسوب الفوري: عدم الوقوف عند 'قف'، التدخل اليدوي للفاحص، تجاوز السرعة، تعريض الآخرين للخطر، صعود الرصيف، وتجاوز الإشارة الحمراء."
          },
          {
            sub: "سيكولوجية الاختبار والثقة",
            desc: "تقنيات التنفس والتركيز لتقليل التوتر أثناء وجود الفاحص. كيفية إظهار الثقة من خلال التحكم السلس في المقود والبدالات."
          },
          {
            sub: "بروتوكول ما بعد النجاح",
            desc: "فهم مسؤولية السائق الجديد، قوانين النقاط السوداء في دبي، وكيفية الاستمرار في تطوير مهارات القيادة الدفاعية مدى الحياة."
          }
        ] : [
          {
            sub: "Major Errors Analysis",
            desc: "Analyzing the 6 reasons for instant failure: skipping STOP signs, examiner intervention, speeding, endangering others, hitting curbs, and running red lights."
          },
          {
            sub: "Test Psychology & Confidence",
            desc: "Breathing and focus techniques to reduce stress with the examiner. Showing confidence through smooth steering and pedal control."
          },
          {
            sub: "Post-Success Protocol",
            desc: "Understanding new driver responsibilities, black point laws in Dubai, and the lifelong journey of developing defensive driving skills."
          }
        ],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      }
    ]
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
          <BookOpen className="h-4 w-4" />
          {language === 'ar' ? "خارطة الطريق للاحتراف" : "Professional Roadmap"}
        </div>
        <h1 className="font-headline text-4xl md:text-6xl font-black leading-tight tracking-tighter">{t.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
          {t.description}
        </p>
      </div>

      {/* Stages Grid */}
      <div className="grid grid-cols-1 gap-12">
        {t.stages.map((stage, idx) => (
          <Card key={idx} className="overflow-hidden border-white/5 bg-card/40 backdrop-blur-xl rounded-[3rem] group hover:border-primary/30 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image Section */}
              <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden">
                {stage.image && (
                  <Image 
                    src={stage.image} 
                    alt={stage.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                    data-ai-hint="driving curriculum detail"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-card/90 to-transparent lg:block hidden" />
                <div className="absolute top-8 left-8 bg-primary text-white h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-2xl shadow-primary/40">
                  {idx + 1}
                </div>
                <div className="absolute bottom-8 left-8 text-white/80 font-black text-xs uppercase tracking-widest">
                  {t.stageLabel} {idx + 1}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:col-span-8 p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <stage.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-3xl font-headline font-black">{stage.title}</CardTitle>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{stage.description}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-xs font-black text-primary uppercase tracking-widest">
                    <Info className="h-4 w-4" />
                    {t.learnMore}
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {stage.details.map((detail, i) => (
                      <AccordionItem key={i} value={`item-${i}`} className="border-white/5">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-4 text-left">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                            <span className="font-bold text-base group-hover:text-primary transition-colors">{detail.sub}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6 pl-9 border-l-2 border-primary/20 ml-2.5">
                          {detail.desc}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-20 p-12 rounded-[4rem] glass-card border-primary/20 text-center space-y-6">
        <h2 className="text-3xl font-headline font-black">
          {language === 'ar' ? "هل أنت مستعد لاختبار معلوماتك؟" : "Ready to test your knowledge?"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === 'ar' 
            ? "بعد دراسة هذه المراحل المعمقة، يمكنك الانتقال إلى المحاكي الذكي لتجربة اختبار RTA النظري الحقيقي."
            : "After studying these in-depth stages, you can proceed to the Smart Simulator to experience the real RTA theory test."}
        </p>
        <div className="pt-4">
          <a href="/assessment" className="inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-primary text-white font-black text-xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
            {language === 'ar' ? "ابدأ التقييم الآن" : "Start Assessment Now"}
          </a>
        </div>
      </div>
    </div>
  )
}
