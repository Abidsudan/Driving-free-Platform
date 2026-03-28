"use client"

import { BookOpen, FileText, Clock, Sparkles, ShieldCheck, Zap, MessageCircle, Eye, Gauge, Settings, ArrowRightLeft, Navigation, Beaker, Thermometer, Wind, Brain, History } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function LibraryPage() {
  const { language, dir } = useLanguage()

  const t = {
    badge: language === 'ar' ? "مستودع الأبحاث الأكاديمية | V2.0" : "Academic Research Repository | V2.0",
    title: language === 'ar' ? "المكتبة العلمية والهندسية" : "Scientific & Engineering Library",
    desc: language === 'ar' ? "أبحاث محكمة ودراسات تقنية حول تفاعل الإنسان مع الآلة، وديناميكيات القيادة في الظروف المناخية القاسية." : "Peer-reviewed research and technical studies on human-machine interaction and driving dynamics in extreme climates.",
    readMore: language === 'ar' ? "تحليل الدراسة الكاملة" : "Analyze Full Study",
    searchTitle: language === 'ar' ? "الاستعلام في بنك الأبحاث" : "Query Research Bank",
    searchDesc: language === 'ar' ? "مكتبتنا هي نتاج 5000+ ساعة من تحليل بيانات المسار العملي في دبي." : "Our library is the result of 5000+ hours of practical track data analysis in Dubai.",
    abstractLabel: language === 'ar' ? "ملخص البحث (Abstract):" : "Research Abstract:",
    tags: language === 'ar' 
      ? ["القيادة الدفاعية", "هندسة العوامل البشرية", "فيزياء الكبح", "الديناميكا الهوائية", "سيكولوجية الأزمات"]
      : ["Defensive Driving", "Human Factors", "Braking Physics", "Aerodynamics", "Crisis Psychology"],
    articles: [
      {
        id: "RES-701",
        title: language === 'ar' ? "هندسة العوامل البشرية في تغيير المسار" : "Human Factor Engineering in Lane Transitions",
        category: language === 'ar' ? "سلوك السائق" : "Driver Behavior",
        type: language === 'ar' ? "ورقة بحثية" : "Research Paper",
        readTime: language === 'ar' ? "20 دقيقة" : "20 mins",
        icon: Brain,
        abstract: language === 'ar' 
          ? "دراسة تحليلية للوقت المستغرق في معالجة البيانات البصرية (البقعة العمياء) وتأثيره على ثبات المقود أثناء السرعات العالية (80-100 كم/س)."
          : "Analytical study of visual data processing time (Blind Spot) and its impact on steering stability during high speeds (80-100 km/h).",
        content: language === 'ar' ? {
          intro: "يُعد الانتقال بين المسارات عملية معقدة تتطلب تزامن العصب البصري مع الاستجابة الحركية. تنفيذها بوعي هندسي يضمن استدامة زخم المرور.",
          pillars: [
            { t: "المعايرة البصرية", d: "ضبط المرايا لتغطية 90% من الزوايا الميتة تقنياً." },
            { t: "بروتوكول الـ 5 ثوانٍ", d: "تفعيل الإشارة لتهيئة محيط المركبة للاستجابة." },
            { t: "التحقق الفيزيائي", d: "نظرة الكتف السريعة (0.5 ثانية) لمنع انحراف المقود." },
            { t: "مزامنة السرعة", d: "مطابقة سرعة المسار المستهدف لمنع الاصطدام الخلفي." }
          ],
          deep: "الاستنتاج: التجاوز عملية هندسية تمنع تماماً عند الخطوط المتصلة والتقاطعات لضمان سلامة الهيكل الإنشائي للطريق."
        } : {
          intro: "Lane transitions are complex operations requiring visual nerve synchronization with motor response. Execution with engineering mindfulness ensures traffic momentum.",
          pillars: [
            { t: "Visual Calibration", d: "Adjusting mirrors to technically cover 90% of dead zones." },
            { t: "5-Second Protocol", d: "Signal activation to prepare the vehicle's perimeter for response." },
            { t: "Physical Verification", d: "Quick shoulder check (0.5s) to prevent steering drift." },
            { t: "Speed Sync", d: "Matching target lane speed to prevent rear-end collisions." }
          ],
          deep: "Conclusion: Overtaking is an engineering process strictly prohibited at solid lines and junctions to ensure road structural integrity."
        }
      },
      {
        id: "RES-802",
        title: language === 'ar' ? "ديناميكيات نقل الوزن في المناخ الصحراوي" : "Weight Transfer Dynamics in Desert Climates",
        category: language === 'ar' ? "فيزياء القيادة" : "Driving Physics",
        type: language === 'ar' ? "دراسة تقنية" : "Technical Study",
        readTime: language === 'ar' ? "25 دقيقة" : "25 mins",
        icon: Thermometer,
        abstract: language === 'ar'
          ? "تحليل تأثير درجات الحرارة المرتفعة في دبي (45°+) على كفاءة المكابح وتوزيع وزن المركبة عند التوقف المفاجئ."
          : "Analyzing the impact of Dubai's extreme heat (45°C+) on braking efficiency and vehicle weight distribution during sudden stops.",
        content: language === 'ar' ? {
          intro: "فهم فيزياء التوقف هو مفتاح القيادة الاحترافية. نقل الوزن للأمام عند الكبح يغير من مركز ثقل المركبة بشكل جذري.",
          pillars: [
            { t: "هندسة الجلوس", d: "توزيع الضغط على البدالات عبر زاوية الركبة (110 درجة)." },
            { t: "معامل الاحتكاك", d: "تأثير الحرارة على تمدد الإطارات وتماسكها بالأسفلت." },
            { t: "قاعدة الثانيتين+", d: "زيادة مسافة الأمان لتعويض تراجع كفاءة الكبح الحراري." },
            { t: "التوزيع الهيدروليكي", d: "فهم عمل الـ ABS في منع انغلاق الإطارات تحت الضغط." }
          ],
          deep: "توصية: القيادة في دبي تتطلب وعياً حرارياً وفيزيائياً يتجاوز مجرد تحريك المركبة."
        } : {
          intro: "Understanding stop physics is the key to professional driving. Forward weight transfer during braking drastically shifts the vehicle's center of gravity.",
          pillars: [
            { t: "Seating Geometry", d: "Distributing pedal pressure via knee angle (110 degrees)." },
            { t: "Friction Coefficient", d: "Heat impact on tire expansion and asphalt grip." },
            { t: "2-Second Rule+", d: "Increasing safe distance to compensate for thermal braking decay." },
            { t: "Hydraulic Distribution", d: "Understanding ABS function in preventing lock-ups under pressure." }
          ],
          deep: "Recommendation: Driving in Dubai requires thermal and physical awareness beyond basic vehicle movement."
        }
      },
      {
        id: "RES-903",
        title: language === 'ar' ? "أبحاث الميدان: القيادة في الظروف القصوى" : "Field Research: Driving in Extreme Conditions",
        category: language === 'ar' ? "أبحاث دبي" : "Dubai Research",
        type: language === 'ar' ? "تقرير ميداني" : "Field Report",
        readTime: language === 'ar' ? "15 دقيقة" : "15 mins",
        icon: Wind,
        abstract: language === 'ar'
          ? "رصد ميداني لتأثير العواصف الرملية والضباب الكثيف على مسافات الرؤية وقدرة السائق على اتخاذ القرار."
          : "Field monitoring of sandstorms and dense fog impact on visibility distances and driver decision-making capacity.",
        desc: language === 'ar' 
          ? "تحليل لبروتوكولات الطوارئ عند انخفاض الرؤية لأقل من 50 متراً على الطرق السريعة (E11/E311)."
          : "Analysis of emergency protocols when visibility drops below 50m on major highways (E11/E311)."
      }
    ]
  }

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      {/* Header with Metadata */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
            <Beaker className="h-3 w-3" /> {t.badge}
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter">{t.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{t.desc}</p>
        </div>
        <div className="hidden lg:block glass-card p-4 rounded-2xl border-white/5 font-code text-[8px] space-y-1">
          <div>DATA_VOLUME: 5.2TB</div>
          <div>PEER_REVIEW: PASSED</div>
          <div>LAB_STATUS: SYNCED</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {t.articles.map((item, idx) => (
          <Card key={idx} className="bg-card/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-[3rem] group hover:border-primary/30 transition-all relative">
            <div className="absolute top-8 right-12 font-code text-[10px] opacity-20">{item.id}</div>
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-1 border-r border-white/5 bg-primary/5 flex items-center justify-center p-8">
                <item.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="lg:col-span-11 p-8 md:p-12 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="px-4 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                    {item.category}
                  </div>
                  <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{item.type} • {item.readTime}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-headline font-black tracking-tight">{item.title}</h2>
                
                <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-primary/40 space-y-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t.abstractLabel}</span>
                  <p className="text-muted-foreground italic font-medium leading-relaxed">"{item.abstract}"</p>
                </div>

                {item.content ? (
                  <div className="space-y-8 animate-fade-in">
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.content.intro}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {item.content.pillars.map((p, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-secondary/30 border border-white/5 space-y-3 hover:border-primary/20 transition-all">
                          <h4 className="font-black text-primary uppercase text-[10px] tracking-[0.2em]">{p.t}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed font-medium">{p.d}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-accent/5 border border-accent/20 italic text-accent font-medium text-lg flex gap-4 items-center">
                      <History className="h-6 w-6 shrink-0 opacity-40" />
                      {item.content.deep}
                    </div>
                  </div>
                ) : (
                  <p className="text-lg text-muted-foreground leading-relaxed">{(item as any).desc}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Query Section */}
      <div className="mt-20 p-16 rounded-[4rem] bg-card/40 border border-white/5 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute -top-20 -left-20 h-64 w-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter">{t.searchTitle}</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-xl leading-relaxed">
            {t.searchDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {t.tags.map((tag, i) => (
              <div key={i} className="px-8 py-3 rounded-full bg-background/50 border border-white/10 text-xs font-black uppercase tracking-widest hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer backdrop-blur-sm">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
