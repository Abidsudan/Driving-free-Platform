
"use client"

import { BookOpen, FileText, Clock, Sparkles, ShieldCheck, Zap, MessageCircle, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function LibraryPage() {
  const { language, dir } = useLanguage()

  const t = {
    badge: language === 'ar' ? "مراجع أكاديمية موثقة" : "Verified Academic References",
    title: language === 'ar' ? "المكتبة العلمية" : "Scientific Library",
    desc: language === 'ar' ? "تعمق في الجانب التقني والعلمي لعالم القيادة من خلال دراسات ومقالات أعدها خبراء الميدان." : "Deep dive into the technical and scientific world of driving through studies by field experts.",
    readMore: language === 'ar' ? "اقرأ المقال الكامل" : "Read Full Article",
    searchTitle: language === 'ar' ? "هل تبحث عن موضوع محدد؟" : "Looking for a specific topic?",
    searchDesc: language === 'ar' ? "مكتبتنا العلمية هي نتاج سنوات من الخبرة الميدانية والدراسة الأكاديمية." : "Our scientific library is the result of years of field experience and academic study.",
    tags: language === 'ar' 
      ? ["القيادة الدفاعية", "صيانة المحرك", "القيادة الليلية", "توفير الوقود", "ديناميكا الهواء", "سيكولوجية السائق"]
      : ["Defensive Driving", "Engine Maintenance", "Night Driving", "Fuel Efficiency", "Aerodynamics", "Driver Psychology"],
    articles: [
      {
        title: language === 'ar' ? "القيادة الدفاعية: فن استباق المخاطر" : "Defensive Driving: Art of Anticipation",
        category: language === 'ar' ? "سلوك السائق" : "Driver Behavior",
        type: language === 'ar' ? "دليل إرشادي شامل" : "Comprehensive Guide",
        readTime: language === 'ar' ? "15 دقيقة" : "15 mins",
        icon: ShieldCheck,
        content: language === 'ar' ? {
          intro: "القيادة الدفاعية هي أكثر من مجرّد معرفة قواعد المرور والتقنيات الأساسية للقيادة. وتهدف إلى تقليل مخاطر القيادة من خلال التعرّف على الحالات الخطرة بوقت مبكّر كافٍ لتجنبها.",
          pillars: [
            { t: "التركيز", d: "ركّز على القيادة 100% في الأوقات كافة." },
            { t: "المراقبة", d: "تفحص المشهد أمامك ومن جانبك وخلفك بشكل دائم." },
            { t: "التوقع", d: "توقع أفعال مستعملي الطريق الآخرين وكن مستعداً لغير المتوقع." },
            { t: "التواصل", d: "استعمل إشارات الانعطاف، التنبيه، وأنوار التحذير لتعريف الآخرين بنيتك." }
          ],
          deep: "إن النظر إلى مسافة 15-20 مركبة أمامك يتيح لك وقتاً أطول للتصرف. تذكر أن القيادة بمسؤولية وعناية وكياسة تجاه الآخرين هي مفتاح تقليل المخاطر."
        } : {
          intro: "Defensive driving is more than just knowing traffic rules. It aims to reduce risks by training drivers to recognize dangerous situations early enough to avoid them.",
          pillars: [
            { t: "Focus", d: "Maintain 100% focus on driving at all times." },
            { t: "Observation", d: "Scan the scene ahead, beside, and behind you constantly." },
            { t: "Anticipation", d: "Anticipate the actions of others and be ready for the unexpected." },
            { t: "Communication", d: "Use signals, horn, and hazard lights to let others know your intentions." }
          ],
          deep: "Looking 15-20 vehicles ahead gives you more time to act. Remember, driving responsibly and showing courtesy to others is the key to risk reduction."
        }
      },
      {
        title: language === 'ar' ? "ديناميكيات نقل الوزن عند الكبح" : "Weight Transfer Dynamics in Braking",
        category: language === 'ar' ? "فيزياء القيادة" : "Driving Physics",
        type: language === 'ar' ? "مقال علمي" : "Scientific Article",
        readTime: language === 'ar' ? "12 دقيقة" : "12 mins",
        icon: Zap,
        desc: language === 'ar' 
          ? "دراسة تقنية حول كيفية تأثر توازن المركبة عند استخدام المكابح المفاجئة وكيفية تجنب الانزلاق."
          : "Technical study on how vehicle balance is affected during sudden braking and how to avoid skidding."
      },
      {
        title: language === 'ar' ? "سيكولوجية اتخاذ القرار في الأزمات" : "Crisis Decision-Making Psychology",
        category: language === 'ar' ? "سلوك السائق" : "Driver Behavior",
        type: language === 'ar' ? "دراسة حالة" : "Case Study",
        readTime: language === 'ar' ? "10 دقيقة" : "10 mins",
        icon: MessageCircle,
        desc: language === 'ar' 
          ? "فهم العمليات الذهنية التي يمر بها السائق لتجنب الاصطدام وكيفية الحفاظ على الهدوء تحت الضغط."
          : "Understanding the mental processes a driver undergoes to avoid collisions and how to remain calm under pressure."
      },
      {
        title: language === 'ar' ? "فيزياء الليل: الضوء والإدراك البصري" : "Physics of the Night: Light & Visual Perception",
        category: language === 'ar' ? "فيزياء القيادة" : "Driving Physics",
        type: language === 'ar' ? "دراسة علمية" : "Scientific Study",
        readTime: language === 'ar' ? "18 دقيقة" : "18 mins",
        icon: Eye,
        desc: language === 'ar' 
          ? "كيف يتغير إدراك المسافات والسرعات تحت الأضواء الاصطناعية، وتأثير إجهاد العين على وقت الاستجابة."
          : "How distance and speed perception change under artificial lighting, and the impact of eye fatigue on response time."
      }
    ]
  }

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-3 w-3" /> {t.badge}
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-black">{t.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{t.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {t.articles.map((item, idx) => (
          <Card key={idx} className="bg-card/40 backdrop-blur-xl border-white/5 overflow-hidden rounded-[3rem] group hover:border-primary/30 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-1 border-r border-white/5 bg-primary/5 flex items-center justify-center p-8">
                <item.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="lg:col-span-11 p-8 md:p-12 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="px-4 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">
                    {item.category}
                  </div>
                  <span className="text-muted-foreground text-xs font-bold">{item.type} • {item.readTime}</span>
                </div>
                
                <h2 className="text-3xl font-headline font-black">{item.title}</h2>
                
                {item.content ? (
                  <div className="space-y-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.content.intro}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {item.content.pillars.map((p, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-secondary/30 border border-white/5 space-y-2">
                          <h4 className="font-black text-primary uppercase text-xs">{p.t}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 rounded-[2rem] bg-accent/5 border border-accent/20 italic text-accent font-medium">
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

      <div className="mt-20 p-12 rounded-[3rem] bg-card/40 border border-white/5 text-center relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-headline font-black mb-6">{t.searchTitle}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.searchDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {t.tags.map((tag, i) => (
              <div key={i} className="px-6 py-2.5 rounded-2xl bg-background/50 border border-white/10 text-xs font-bold hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer backdrop-blur-sm">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
