
"use client"

import { Zap, ArrowLeft, Route, RotateCcw, FastForward, MoveHorizontal, SquareParking, RefreshCw, Undo2, Info, CheckCircle2, AlertTriangle, ShieldCheck, Microscope } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function BasicManeuversResearch() {
  const { language, dir } = useLanguage()

  const t = {
    back: language === 'ar' ? "العودة للمكتبة العلمية" : "Back to Scientific Library",
    category: language === 'ar' ? "الفنيات التشغيلية" : "Operational Techniques",
    title: language === 'ar' ? "المناورات الأساسية: الهندسة الحركية في القيادة" : "Basic Maneuvers: Kinetic Engineering in Driving",
    intro: language === 'ar' 
      ? "تعتبر المناورات الأساسية هي الجزيئات الحركية التي تشكل نسيج القيادة اليومية. إتقان هذه المناورات ليس مجرد مهارة تقنية، بل هو هندسة دقيقة للتوقيت، المسافة، والتعامل مع الكتلة المتحركة في بيئة ديناميكية."
      : "Basic maneuvers are the kinetic molecules that form the fabric of daily driving. Mastering these is not just a technical skill, but a precise engineering of timing, distance, and handling moving mass in a dynamic environment.",
    
    lesson1: {
      title: language === 'ar' ? "الدرس الأول: القيادة عبر التقاطعات" : "Lesson 1: Driving Through Intersections",
      subtitle: language === 'ar' ? "إدارة التدفق المروري" : "Traffic Flow Management",
      steps: language === 'ar' ? [
        { label: "الاقتراب", text: "خفض السرعة تدريجياً، فحص الإشارات (قف/إعطاء أولوية)، وتحديد المسار بناءً على وجهتك." },
        { label: "عند التقاطع", text: "إعطاء الأولوية لمن وصل أولاً أو القادم من اليمين. التوقف التام عند العلامات التحذيرية." },
        { label: "الانعطاف", text: "استخدام الإشارات مبكراً، التأكد من خلو المسار من المشاة، والدخول لأقرب مسار صحيح." }
      ] : [
        { label: "Approach", text: "Reduce speed gradually, check signs (Stop/Yield), and select lane based on destination." },
        { label: "At Intersection", text: "Give priority to first arrivals or those coming from the right. Complete stop at warnings." },
        { label: "Turning", text: "Use signals early, ensure path clear of pedestrians, and enter the nearest correct lane." }
      ]
    },

    lesson2: {
      title: language === 'ar' ? "الدرس الثاني: القيادة عبر الدوارات" : "Lesson 2: Roundabout Navigation",
      subtitle: language === 'ar' ? "ديناميكية الدوران" : "Rotational Dynamics",
      points: language === 'ar' ? [
        "الأولوية دائماً للمركبات الموجودة داخل الدوار.",
        "اختر المسار الصحيح قبل الدخول بناءً على مخرجك المقصود.",
        "استخدم إشارة الانعطاف اليمنى عند الاقتراب من مخرجك مباشرة."
      ] : [
        "Priority is always for vehicles inside the roundabout.",
        "Choose the correct lane before entry based on your intended exit.",
        "Use right signal immediately when approaching your exit."
      ]
    },

    lesson3: {
      title: language === 'ar' ? "الدرس الثالث: التجاوز الآمن" : "Lesson 3: Safe Overtaking",
      subtitle: language === 'ar' ? "إزاحة الكتلة المتسارعة" : "Accelerated Mass Displacement",
      alert: language === 'ar' ? "لا تتجاوز أبداً عند التقاطعات، المنعطفات الحادة، أو قمم التلال." : "Never overtake at intersections, sharp curves, or hill crests.",
      steps: language === 'ar' ? [
        "التقييم: هل التجاوز قانوني؟ فحص المرآة والنقطة العمياء وحركة المرور المقابلة.",
        "التنفيذ: تشغيل الإشارة، زيادة السرعة تدريجياً، الحفاظ على مسافة جانبية آمنة.",
        "العودة: لا تعد لمسارك إلا بعد رؤية السيارة المتجاوزة بالكامل في المرآة."
      ] : [
        "Assessment: Is it legal? Check mirrors, blind spots, and oncoming traffic.",
        "Execution: Signal, increase speed gradually, maintain safe lateral distance.",
        "Return: Do not return to lane until the overtaken car is fully visible in mirrors."
      ]
    },

    lesson4: {
      title: language === 'ar' ? "الدرس الرابع: الانتقال بين المسارات" : "Lesson 4: Lane Changes",
      subtitle: language === 'ar' ? "المزامنة الجانبية" : "Lateral Synchronization",
      text: language === 'ar' 
        ? "تغيير المسار يتطلب مزامنة السرعة مع المسار الجديد. استخدم قاعدة 'مرآة - إشارة - كتف' لضمان انتقال سلس وآمن دون إرباك حركة المرور."
        : "Changing lanes requires synchronizing speed with the new lane. Use the 'Mirror - Signal - Shoulder' rule to ensure smooth transition."
    },

    lesson5: {
      title: language === 'ar' ? "الدرس الخامس: تقنيات الركن (الاصطفاف)" : "Lesson 5: Parking Techniques",
      types: [
        {
          title: language === 'ar' ? "الركن المتوازي" : "Parallel Parking",
          desc: language === 'ar' ? "المحاذاة بجانب السيارة الأمامية، الرجوع بزاوية 45 درجة، ثم تصويب العجلة." : "Align with front car, reverse at 45 degrees, then straighten wheel."
        },
        {
          title: language === 'ar' ? "الركن العمودي" : "Perpendicular Parking",
          desc: language === 'ar' ? "الدوران عندما توازي مقدمة سيارتك خط بداية مكان الركن." : "Turn when your front matches the parking spot's boundary line."
        },
        {
          title: language === 'ar' ? "الركن بزاوية" : "Angle Parking",
          desc: language === 'ar' ? "نسخة أسهل من الركن العمودي تتوافق مع تدفق حركة المرور." : "An easier version of perpendicular parking aligned with traffic flow."
        }
      ]
    },

    lesson6: {
      title: language === 'ar' ? "الدرس السادس: الدوران والمناورة" : "Lesson 6: Turning & Maneuvering",
      threePoint: language === 'ar' ? "الدوران بثلاث نقاط: للأمام يساراً، للخلف يميناً، ثم للأمام يساراً." : "3-Point Turn: Forward left, reverse right, then forward left.",
      uTurn: language === 'ar' ? "دورة كاملة (U-Turn): تغيير اتجاه كامل في الشوارع الواسعة بما يكفي." : "U-Turn: Complete direction change in sufficiently wide streets."
    },

    lesson7: {
      title: language === 'ar' ? "الدرس السابع: الرجوع للخلف (الريوس)" : "Lesson 7: Reversing Strategy",
      points: language === 'ar' ? [
        "لا تعتمد كلياً على المرايا؛ أدر رأسك وانظر للخلف مباشرة.",
        "تحكم في السرعة عبر الفرامل أكثر من البنزين.",
        "تذكر: توجيه المقود لليمين يحرك خلفية السيارة لليمين."
      ] : [
        "Don't rely solely on mirrors; turn your head and look back.",
        "Control speed via brakes more than accelerator.",
        "Remember: steering right moves the rear of the car right."
      ]
    },

    conclusion: language === 'ar' 
      ? "المناورات هي لغة التخاطب بين السائق والطريق. إتقانها يحول القيادة من مهمة مجهدة إلى تناغم حركي دقيق يضمن سلامة الجميع."
      : "Maneuvers are the language of communication between driver and road. Mastering them transforms driving from a stressful task into precise kinetic harmony."
  }

  return (
    <div className="container mx-auto px-6 py-24 space-y-24 animate-reveal-up overflow-hidden">
      {/* Navigation */}
      <Link 
        href="/library" 
        className="inline-flex items-center gap-4 text-primary font-black uppercase tracking-[0.3em] text-[10px] group"
      >
        <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-black transition-all">
          <ArrowLeft className="h-4 w-4" />
        </div>
        {t.back}
      </Link>

      {/* Hero Header */}
      <div className="space-y-12">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.5em]">
          <Zap className="h-4 w-4" /> {t.category}
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter smart-gradient-text uppercase leading-[0.9] max-w-5xl">
          {t.title}
        </h1>
        <p className="text-2xl text-muted-foreground/60 leading-relaxed font-medium max-w-3xl border-l-[3px] border-primary/20 pl-8 italic">
          &quot;{t.intro}&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-32">
          
          {/* Lesson 1: Intersections */}
          <section className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-black font-headline tracking-tighter uppercase text-white flex items-center gap-6">
                <span className="text-primary opacity-20 text-6xl">01</span> {t.lesson1.title}
              </h2>
              <div className="inline-block px-4 py-1 rounded-sm bg-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.3em]">
                {t.lesson1.subtitle}
              </div>
            </div>

            {/* Technical Illustration for Intersection */}
            <div className="relative group overflow-hidden rounded-[3rem] border border-white/5 aspect-[21/9] bg-black/40">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
               <img 
                 src="/intersection-maneuver.png" 
                 alt="Technical Intersection Maneuver Illustration"
                 className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
               />
               <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Visual Identification</p>
                     <p className="text-white font-black font-headline uppercase leading-none">Intersection Schematic v1.02</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md">
                     <Route className="h-4 w-4 text-primary" />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {t.lesson1.steps.map((s, i) => (
                <div key={i} className="flex gap-8 p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                   <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0 font-black">
                      {i + 1}
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xl font-black font-headline uppercase text-white">{s.label}</h4>
                      <p className="text-muted-foreground font-medium leading-relaxed">{s.text}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lesson 2: Roundabouts */}
          <section className="space-y-16">
            <div className="p-16 rounded-[4rem] bg-black/40 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <RotateCcw className="h-64 w-64 text-primary" />
              </div>

              {/* Technical Schematic for Roundabout */}
              <div className="mb-16 relative aspect-[21/9] bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
                 
                 {/* CSS Roundabout Schematic */}
                 <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center p-8">
                    <div className="w-full h-full rounded-full border-4 border-dashed border-primary/20 animate-spin-slow" />
                    <div className="absolute w-2/3 h-2/3 rounded-full border-2 border-primary/40 flex items-center justify-center">
                       <div className="w-1/2 h-1/2 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <RotateCcw className="h-8 w-8 text-primary opacity-50" />
                       </div>
                    </div>
                    {/* Directional Arrows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                       <div className="h-12 w-[1px] bg-primary/40 relative">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary" />
                       </div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                       <div className="h-12 w-[1px] bg-primary/40 relative" />
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
                       <div className="w-12 h-[1px] bg-primary/40 relative" />
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
                       <div className="w-12 h-[1px] bg-primary/40 relative" />
                    </div>
                 </div>

                 <div className="absolute top-8 left-8 flex items-center gap-4">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">Schematic Active</span>
                 </div>
              </div>

              <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                   <h2 className="text-4xl font-black font-headline tracking-tighter uppercase text-white">{t.lesson2.title}</h2>
                   <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">{t.lesson2.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                   {t.lesson2.points.map((p, i) => (
                     <div key={i} className="flex items-start gap-4 text-lg text-muted-foreground font-medium">
                        <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                        <span>{p}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </section>

          {/* Lesson 3: Overtaking */}
          <section className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-black font-headline tracking-tighter uppercase text-white flex items-center gap-6">
                <span className="text-primary opacity-20 text-6xl">03</span> {t.lesson3.title}
              </h2>
            </div>

            <div className="p-10 rounded-3xl bg-red-500/5 border border-red-500/20 flex items-center gap-6">
               <AlertTriangle className="h-8 w-8 text-red-500" />
               <p className="text-red-500 font-black uppercase text-xs tracking-widest">{t.lesson3.alert}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {t.lesson3.steps.map((s, i) => (
                 <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Step 0{i+1}</span>
                    <p className="text-muted-foreground font-medium leading-relaxed">{s}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Lesson 4 & 6: Dynamics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <section className="p-12 rounded-[3.5rem] bg-gradient-to-br from-primary/5 to-transparent border border-white/5 space-y-8">
                <div className="p-4 rounded-2xl bg-primary text-black w-fit">
                   <MoveHorizontal className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black font-headline uppercase text-white">{t.lesson4.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed italic border-l-2 border-primary/20 pl-6">
                   {t.lesson4.text}
                </p>
             </section>

             <section className="p-12 rounded-[3.5rem] bg-black/40 border border-white/5 space-y-8">
                <div className="p-4 rounded-2xl bg-white/5 text-primary w-fit">
                   <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black font-headline uppercase text-white">{t.lesson6.title}</h3>
                <div className="space-y-4 text-sm text-muted-foreground font-semibold italic">
                   <p>• {t.lesson6.threePoint}</p>
                   <p>• {t.lesson6.uTurn}</p>
                </div>
             </section>
          </div>

          {/* Lesson 5: Parking */}
          <section className="space-y-16">
            <h2 className="text-4xl font-black font-headline tracking-tighter uppercase text-white">{t.lesson5.title}</h2>
            <div className="grid grid-cols-1 gap-6">
               {t.lesson5.types.map((type, i) => (
                 <div key={i} className="p-10 rounded-[3rem] bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.07] transition-all">
                    <div className="space-y-4">
                       <h4 className="text-2xl font-black font-headline uppercase text-primary">{type.title}</h4>
                       <p className="text-muted-foreground font-medium leading-relaxed max-w-xl">{type.desc}</p>
                    </div>
                    <SquareParking className="h-12 w-12 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                 </div>
               ))}
            </div>
          </section>

          {/* Lesson 7: Reversing */}
          <section className="p-16 rounded-[4rem] bg-primary/5 border border-primary/10 space-y-12">
             <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-primary text-black">
                   <Undo2 className="h-6 w-6" />
                </div>
                <h2 className="text-4xl font-black font-headline uppercase text-white">{t.lesson7.title}</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.lesson7.points.map((p, i) => (
                   <div key={i} className="p-8 rounded-3xl bg-black/40 border border-white/5 space-y-4">
                      <div className="h-1 w-8 bg-primary/30" />
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed">{p}</p>
                   </div>
                ))}
             </div>
          </section>

          {/* Conclusion */}
          <section className="pt-24 border-t border-white/5">
            <div className="p-16 rounded-[4rem] bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-16 opacity-10">
                  <ShieldCheck className="h-48 w-48 text-primary" />
               </div>
               <div className="relative z-10 space-y-8 text-center md:text-left">
                  <h2 className="text-4xl font-black font-headline uppercase">{language === 'ar' ? "خلاصة الدليل" : "Guide Summary"}</h2>
                  <p className="text-2xl text-muted-foreground/80 font-medium leading-relaxed italic max-w-4xl mx-auto md:mx-0">
                    &quot;{t.conclusion}&quot;
                  </p>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar / Stats */}
        <div className="space-y-12">
          <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-10 sticky top-24">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">Engineering ID</span>
              <p className="text-xl font-black font-headline text-white">BM-2024-MAN-07</p>
            </div>
            
            <div className="space-y-6">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <span>Maneuver Precision</span>
                  <span className="text-primary">98.5%</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[98.5%] bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
               </div>
            </div>

            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 text-primary">
                    <Microscope className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technical Class</p>
                    <p className="text-lg font-black font-headline text-white uppercase">Operational</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 text-primary">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Protocol Status</p>
                    <p className="text-lg font-black font-headline text-white uppercase">Certified</p>
                  </div>
               </div>
            </div>

            <button className="w-full py-6 rounded-2xl bg-primary text-black font-black uppercase text-[10px] tracking-[0.5em] hover:scale-[1.02] transition-transform shadow-2xl">
              {language === 'ar' ? "تنزيل المجلد الفني" : "Download Technical Folder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
