
"use client"

import { Microscope, ArrowLeft, CheckCircle2, AlertTriangle, Gauge, Eye, Settings, Compass, Info, ShieldCheck, Thermometer, Wind, Zap, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function VehicleControlResearch() {
  const { language, dir } = useLanguage()

  const t = {
    back: language === 'ar' ? "العودة للمكتبة العلمية" : "Back to Scientific Library",
    category: language === 'ar' ? "فيزياء القيادة" : "Driving Physics",
    title: language === 'ar' ? "إتقان التحكم في المركبة: من الأساسيات إلى القيادة الآمنة" : "Mastering Vehicle Control: From Basics to Safe Driving",
    intro: language === 'ar' 
      ? "إن إتقان التحكم في المركبة هو حجر الزاوية في فن القيادة الآمنة والواثقة. لا يقتصر الأمر على معرفة كيفية تحريك السيارة، بل يشمل فهماً عميقاً لكيفية استجابتها لأوامرك كصائق، وكيفية التفاعل مع متغيرات الطريق والبيئة المحيطة."
      : "Mastering vehicle control is the cornerstone of safe and confident driving. It's not just about moving the car; it includes a deep understanding of how it responds to your commands as a driver and how to interact with road and environmental variables.",
    part1: {
      title: language === 'ar' ? "الجزء الأول: أساسيات التحكم في المركبة" : "Part 1: Basics of Vehicle Control",
      desc: language === 'ar' ? "قبل الانطلاق على الطريق، من الضروري التعرف على الأدوات الأساسية التي تمنحك السيطرة على سيارتك." : "Before hitting the road, it's essential to familiarize yourself with the basic tools that give you control over your car.",
      seating: {
        title: language === 'ar' ? "1. وضعية الجلوس الصحيحة: أساس التحكم" : "1. Correct Seating Position: The Control Foundation",
        points: language === 'ar' 
          ? [
              { label: "المقعد", text: "اضبط مقعدك بحيث تصل قدماك بسهولة إلى الدواسات مع وجود انحناءة بسيطة في الركبة. يجب أن يكون ظهرك مستنداً بشكل مريح على ظهر المقعد بزاوية تقارب 100-110 درجة." },
              { label: "عجلة القيادة", text: "عند إمساك المقود بيديك كلتاهما (في موضع الساعة 9 و 3)، يجب أن تكون ذراعاك مثنيتين قليلاً." },
              { label: "المرايا", text: "اضبط المرايا الجانبية والمستوسطى لتقليل النقاط العمياء وتوفير رؤية محيطية واسعة دون الحاجة إلى تحريك رأسك بشكل كبير." }
            ]
          : [
              { label: "The Seat", text: "Adjust your seat so your feet easily reach the pedals with a slight bend in the knee. Your back should rest comfortably against the seat back at an angle of roughly 100-110 degrees." },
              { label: "Steering Wheel", text: "When holding the wheel with both hands (at 9 and 3 o'clock position), your arms should be slightly bent." },
              { label: "Mirrors", text: "Adjust side and center mirrors to minimize blind spots and provide wide peripheral vision without needing to move your head significantly." }
            ]
      },
      tools: {
        title: language === 'ar' ? "2. أدوات التحكم الرئيسية" : "2. Main Control Tools",
        points: language === 'ar' 
          ? [
              { title: "عجلة القيادة (المقود)", text: "هي أداتك الأساسية لتوجيه السيارة. يجب أن تكون حركة يديك سلسة ومتناسقة. القاعدة الذهبية هي 'انظر حيث تريد أن تذهب'، فبشكل لا إرادي، ستتبع يداك اتجاه نظرك." },
              { title: "دواسة الوقود (البنزين)", text: "تتحكم في سرعة المحرك، وبالتالي سرعة السيارة. يجب استخدامها بنعومة وتدرج. الضغط المفاجئ يؤدي إلى استهلاك زائد للوقود وقد يفقدك السيطرة." },
              { title: "دواسة الفرامل (المكابح)", text: "تستخدم لإبطاء السيارة أو إيقافها تماماً. تعلم أن تضغط عليها بشكل تدريجي لتجنب التوقف المفاجئ الذي قد يربكك ويربك السائقين خلفك." },
              { title: "ناقل الحركة (الجير)", text: "الأوتوماتيكي يتميز بالبساطة، حيث تختار الوضعية المناسبة (P للركن، R للرجوع للخلف، N للحياد، D للقيادة). اليدوي (العادي) يتطلب مهارة أكبر في التنسيق بين دواسة القابض (الكلتش) وناقل الحركة لتغيير السرعات بسلاسة." }
            ]
          : [
              { title: "Steering Wheel", text: "Your primary tool for directing the car. Your hand movements should be smooth and coordinated. The golden rule is 'look where you want to go' - your hands will subconsciously follow your gaze." },
              { title: "Gas Pedal (Accelerator)", text: "Controls engine speed, and thus car speed. It must be used smoothly and gradually. Sudden pressing leads to excess fuel consumption and may cause loss of control." },
              { title: "Brake Pedal", text: "Used to slow or stop the car. Learn to press it gradually to avoid sudden stops that could confuse you and drivers behind you." },
              { title: "Transmission (Gear)", text: "Automatic is simple: select P (Park), R (Reverse), N (Neutral), or D (Drive). Manual (Normal) requires skill in coordinating the clutch and gear stick to change speeds smoothly." }
            ]
      }
    },
    part2: {
      title: language === 'ar' ? "الجزء الثاني: تقنيات القيادة على الطريق" : "Part 2: Road Driving Techniques",
      safetyDist: {
        title: language === 'ar' ? "1. الحفاض على مسافة آمنة" : "1. Maintaining Safe Distance",
        text: language === 'ar' 
          ? "تُعرف بـ 'قاعدة الثواني الثلاث'، وهي من أهم قواعد السلامة. اختر علامة ثابتة على جانب الطريق (شجرة، لافتة). عندما تتجاوزها السيارة أمامك، ابدأ بالعد 'واحد، اثنان، ثلاثة'. إذا وصلت إلى نفس العلامة قبل أن تنهي العد، فأنت قريب جداً وعليك إبطاء السرعة. في الظروف الجوية السيئة (مطر، ضباب)، يجب مضاعفة هذه المسافة إلى 5 أو 6 ثوانٍ."
          : "Known as the 'Three-second rule', it's a vital safety rule. Pick a fixed marker (tree, sign). When the car ahead passes it, count 'one-one-thousand, two-one-thousand, three-one-thousand'. If you pass before finishing, you're too close. In bad weather (rain, fog), double this distance to 5 or 6 seconds."
      },
      blindSpots: {
        title: language === 'ar' ? "2. التعامل مع النقاط العمياء" : "2. Handling Blind Spots",
        text: language === 'ar' 
          ? "النقاط العمياء هي المناطق حول سيارتك التي لا يمكنك رؤيتها من خلال المرايا. قبل تغيير المسار أو الانعطاف، قم دائماً بإلقاء نظرة سريعة فوق كتفك للتحقق من هذه المناطق بالإضافة إلى النظر في المرايا."
          : "Blind spots are areas around your car that you can't see in mirrors. Before changing lanes or turning, always check over your shoulder in addition to the mirrors."
      },
      curves: {
        title: language === 'ar' ? "3. التحكم في المنعطفات والمنحنيات" : "3. Control in Curves and Turns",
        before: language === 'ar' ? "خفف من سرعتك إلى الحد المناسب قبل الدخول في المنعطف." : "Reduce speed to the appropriate level before entering the turn.",
        during: language === 'ar' ? "حافظ على سرعة ثابتة ووجّه نظرك ومقودك بسلاسة باتجاه المخرج الذي تود الوصول إليه." : "Maintain a steady speed and direct your gaze and wheel smoothly toward your intended exit.",
        after: language === 'ar' ? "ابدأ بزيادة سرعتك تدريجياً بعد أن تستقيم عجلة القيادة." : "Begin increasing speed gradually after the steering wheel straightens."
      },
      weather: {
        title: language === 'ar' ? "4. القيادة في الظروف الجوية السيئة" : "4. Driving in Bad Weather",
        points: language === 'ar' 
          ? [
              { label: "تقليل السرعة", text: "الطرق المبتلة تزيد من مسافة التوقف اللازمة." },
              { label: "زيادة مسافة الأمان", text: "كما ذكرنا سابقاً، اترك مسافة أكبر بينك وبين المركبات الأخرى." },
              { label: "استخدام الأضواء", text: "قم بتشغيل المصابيح الأمامية لزيادة وضوح رؤيتك ولتكون مرئياً للسائقين الآخرين." },
              { label: "تجنب الحركات المفاجئة", text: "كن لطيفاً في استخدامك للمقود والفرامل والوقود لتجنب الانزلاق." }
            ]
          : [
              { label: "Reduce Speed", text: "Wet roads increase required stopping distance." },
              { label: "Increase Gap", text: "Leave a larger gap between you and other vehicles." },
              { label: "Lights", text: "Turn on headlights to see better and be seen by others." },
              { label: "Smooth Movements", text: "Be gentle with the wheel, brakes, and gas to avoid skidding." }
            ]
      }
    },
    part3: {
      title: language === 'ar' ? "الجزء الثالث: الصيانة ودورها في التحكم" : "Part 3: Maintenance and Control",
      desc: language === 'ar' ? "إن الأمثل للتحكم في المركبة لا يعتمد فقط على مهاراتك، بل أيضاً على الحالة الفنية للسيارة." : "Optimal vehicle control depends not just on your skills, but also the car's technical condition.",
      points: language === 'ar' 
        ? [
            { label: "الإطارات", text: "تأكد من أن ضغط الهواء في الإطارات مناسب وأن عمق النقشة جيد. الإطارات هي نقطة الاتصال الوحيدة بين سيارتك والطريق، وحالتها تؤثر بشكل مباشر على التماسك والتحكم." },
            { label: "الفرامل", text: "قم بفحص نظام الفرامل بشكل دوري للتأكد من كفاءته. أي تأخير في استجابة الفرامل يمكن أن يكون له عواقب وخيمة." },
            { label: "السوائل", text: "تحقق بانتظام من مستويات زيت المحرك، سائل تبريد المحرك، وسائل الفرامل. هذه السوائل ضرورية لعمل أجزاء السيارة الحيوية بكفاءة." }
          ]
        : [
            { label: "Tires", text: "Check tire pressure and tread depth. Tires are the only contact point between car and road; their condition directly affects grip and control." },
            { label: "Brakes", text: "Periodically check the brake system for efficiency. Any delay in braking response can have dire consequences." },
            { label: "Fluids", text: "Regularly check engine oil, coolant, and brake fluid levels. These are essential for the car's vital components to function efficiently." }
          ]
    },
    conclusionTitle: language === 'ar' ? "الخاتمة" : "Conclusion",
    conclusionText: language === 'ar' 
      ? "إن التحكم في المركبة مهارة تُصقل مع الممارسة والوعي. من خلال فهم وتطبيق هذه المبادئ، من وضعية الجلوس الصحيحة إلى الحفاظ على سيارتك، يمكنك أن تصبح سائقاً أكثر أماناً وثقة، قادراً على التعامل مع مختلف مواقف القيادة ببراعة وهدوء. تذكر دائماً أن القيادة مسؤولية، والتحكم الجيد هو مفتاح الوفاء بهذه المسؤولية."
      : "Vehicle control is a skill refined with practice and awareness. By understanding and applying these principles, from correct seating to car maintenance, you can become a safer, more confident driver, capable of handling various driving situations with skill and calm. Always remember that driving is a responsibility, and good control is key to fulfilling it."
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
          <Microscope className="h-4 w-4" /> {t.category}
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
        <div className="lg:col-span-2 space-y-24">
          {/* Part 1 */}
          <section className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-black font-headline tracking-tighter uppercase text-white flex items-center gap-6">
                <span className="text-primary opacity-20">01</span> {t.part1.title}
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                {t.part1.desc}
              </p>
            </div>

            <div className="space-y-12">
              <h3 className="text-2xl font-black font-headline text-primary/80 uppercase tracking-tight">{t.part1.seating.title}</h3>
              <div className="grid grid-cols-1 gap-8">
                {t.part1.seating.points.map((p, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{p.label}</span>
                    <p className="text-muted-foreground font-medium leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-2xl font-black font-headline text-primary/80 uppercase tracking-tight">{t.part1.tools.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.part1.tools.points.map((p, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4 hover:border-primary/20 transition-all">
                    <h4 className="text-lg font-black text-white">{p.title}</h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Part 2 */}
          <section className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-black font-headline tracking-tighter uppercase text-white flex items-center gap-6">
                <span className="text-primary opacity-20">02</span> {t.part2.title}
              </h2>
            </div>

            <div className="p-12 rounded-[3.5rem] bg-primary/5 border border-primary/10 space-y-8">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-primary text-black">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black font-headline uppercase">{t.part2.safetyDist.title}</h3>
              </div>
              <p className="text-xl text-muted-foreground/80 font-medium leading-relaxed">
                {t.part2.safetyDist.text}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 space-y-6">
                <div className="p-4 rounded-xl bg-white/5 w-fit text-primary">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black font-headline uppercase">{t.part2.blindSpots.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{t.part2.blindSpots.text}</p>
              </div>

              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 space-y-6">
                <div className="p-4 rounded-xl bg-white/5 w-fit text-primary">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black font-headline uppercase">{t.part2.curves.title}</h3>
                <ul className="space-y-4 text-sm text-muted-foreground font-medium italic">
                  <li>• {t.part2.curves.before}</li>
                  <li>• {t.part2.curves.during}</li>
                  <li>• {t.part2.curves.after}</li>
                </ul>
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-2xl font-black font-headline text-white uppercase flex items-center gap-4">
                <AlertTriangle className="h-6 w-6 text-primary" /> {t.part2.weather.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.part2.weather.points.map((p, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="space-y-2">
                       <span className="text-[10px] font-black text-primary uppercase tracking-widest">{p.label}</span>
                       <p className="text-sm font-medium text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Part 3 */}
          <section className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-black font-headline tracking-tighter uppercase text-white flex items-center gap-6">
                <span className="text-primary opacity-20">03</span> {t.part3.title}
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                {t.part3.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {t.part3.points.map((p, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                   <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                      {i === 0 ? <Wind className="h-8 w-8" /> : i === 1 ? <ShieldCheck className="h-8 w-8" /> : <Thermometer className="h-8 w-8" />}
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-2xl font-black font-headline uppercase">{p.label}</h4>
                      <p className="text-lg text-muted-foreground font-medium leading-relaxed">{p.text}</p>
                   </div>
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
               <div className="relative z-10 space-y-8">
                  <h2 className="text-4xl font-black font-headline uppercase">{t.conclusionTitle}</h2>
                  <p className="text-2xl text-muted-foreground/80 font-medium leading-relaxed italic max-w-3xl">
                    &quot;{t.conclusionText}&quot;
                  </p>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar / Stats */}
        <div className="space-y-12">
          <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-10 sticky top-24">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">Research ID</span>
              <p className="text-xl font-black font-headline text-white">VC-2024-ACAD-01</p>
            </div>
            
            <div className="space-y-6">
               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <span>Scientific Rigor</span>
                  <span className="text-primary">100%</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-primary" />
               </div>
            </div>

            <div className="space-y-8">
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Difficulty Level</p>
                    <p className="text-lg font-black font-headline text-white uppercase">Advanced</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 text-primary">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Peer Reviewed</p>
                    <p className="text-lg font-black font-headline text-white uppercase">Validated</p>
                  </div>
               </div>
            </div>

            <button className="w-full py-6 rounded-2xl bg-primary text-black font-black uppercase text-[10px] tracking-[0.5em] hover:scale-[1.02] transition-transform shadow-2xl">
              {language === 'ar' ? "تنزيل الورقة العلمية" : "Download Whitepaper"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
