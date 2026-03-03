"use client"

import { BookOpen, FileText, Clock, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function LibraryPage() {
  const { language } = useLanguage()

  const t = {
    badge: language === 'ar' ? "مراجع أكاديمية موثقة" : "Verified Academic References",
    title: language === 'ar' ? "المكتبة العلمية" : "Scientific Library",
    desc: language === 'ar' ? "تعمق في الجانب التقني والعلمي لعالم القيادة من خلال دراسات ومقالات أعدها خبراء الميدان." : "Deep dive into the technical and scientific world of driving through studies by field experts.",
    readMore: language === 'ar' ? "اقرأ المقال الكامل" : "Read Full Article",
    searchTitle: language === 'ar' ? "هل تبحث عن موضوع محدد؟" : "Looking for a specific topic?",
    searchDesc: language === 'ar' ? "مكتبتنا العلمية هي نتاج سنوات من الخبرة الميدانية والدراسة الأكاديمية." : "Our scientific library is the result of years of field experience and academic study.",
    tags: language === 'ar' 
      ? ["الإسعافات الأولية", "صيانة المحرك", "القيادة الليلية", "توفير الوقود", "ديناميكا الهواء", "سيكولوجية السائق"]
      : ["First Aid", "Engine Maintenance", "Night Driving", "Fuel Efficiency", "Aerodynamics", "Driver Psychology"],
    articles: [
      {
        title: language === 'ar' ? "التحكم في المركبة: من الأساسيات إلى القيادة الآمنة" : "Vehicle Control: From Basics to Safe Driving",
        category: language === 'ar' ? "أساسيات القيادة" : "Driving Basics",
        type: language === 'ar' ? "درس شامل" : "Comprehensive Lesson",
        readTime: language === 'ar' ? "20 دقيقة" : "20 mins",
        desc: language === 'ar' 
          ? "إتقان التحكم في المركبة هو حجر الزاوية في فن القيادة الآمنة والواثقة. يغطي هذا الدرس وضعيات الجلوس الصحيحة، أدوات التحكم الرئيسية، وديناميكيات الحركة."
          : "Mastering vehicle control is the cornerstone of safe and confident driving. This lesson covers correct seating, primary controls, and movement dynamics."
      },
      {
        title: language === 'ar' ? "القيادة الدفاعية: فن استباق المخاطر" : "Defensive Driving: Art of Anticipation",
        category: language === 'ar' ? "سلوك السائق" : "Driver Behavior",
        type: language === 'ar' ? "دليل إرشادي" : "Instructional Guide",
        readTime: language === 'ar' ? "15 دقيقة" : "15 mins",
        desc: language === 'ar' 
          ? "القيادة الدفاعية هي ممارسة تهدف لتقليل المخاطر من خلال التنبؤ بأخطاء الآخرين والتعامل مع الظروف الصعبة بتركيز تام."
          : "Defensive driving aims to reduce risk by predicting others' mistakes and handling difficult conditions with total focus."
      },
      {
        title: language === 'ar' ? "ديناميكيات نقل الوزن عند الكبح" : "Weight Transfer Dynamics in Braking",
        category: language === 'ar' ? "فيزياء القيادة" : "Driving Physics",
        type: language === 'ar' ? "مقال علمي" : "Scientific Article",
        readTime: language === 'ar' ? "12 دقيقة" : "12 mins",
        desc: language === 'ar' 
          ? "دراسة تقنية حول كيفية تأثر توازن المركبة عند استخدام المكابح المفاجئة وكيفية تجنب الانزلاق."
          : "Technical study on how vehicle balance is affected during sudden braking and how to avoid skidding."
      },
      {
        title: language === 'ar' ? "سيكولوجية اتخاذ القرار في الأزمات" : "Crisis Decision-Making Psychology",
        category: language === 'ar' ? "سلوك السائق" : "Driver Behavior",
        type: language === 'ar' ? "دراسة حالة" : "Case Study",
        readTime: language === 'ar' ? "10 دقيقة" : "10 mins",
        desc: language === 'ar' 
          ? "فهم العمليات الذهنية التي يمر بها السائق لتجنب الاصطدام وكيفية الحفاظ على الهدوء تحت الضغط."
          : "Understanding the mental processes a driver undergoes to avoid collisions and how to remain calm under pressure."
      },
      {
        title: language === 'ar' ? "فيزياء الليل: الضوء والإدراك البصري" : "Physics of the Night: Light & Visual Perception",
        category: language === 'ar' ? "فيزياء القيادة" : "Driving Physics",
        type: language === 'ar' ? "دراسة علمية" : "Scientific Study",
        readTime: language === 'ar' ? "18 دقيقة" : "18 mins",
        desc: language === 'ar' 
          ? "كيف يتغير إدراك المسافات والسرعات تحت الأضواء الاصطناعية، وتأثير إجهاد العين على وقت الاستجابة."
          : "How distance and speed perception change under artificial lighting, and the impact of eye fatigue on response time."
      },
      {
        title: language === 'ar' ? "القيادة الاقتصادية: الديناميكا الهوائية" : "Eco-Driving: Aerodynamics & Efficiency",
        category: language === 'ar' ? "تكنولوجيا المركبات" : "Vehicle Tech",
        type: language === 'ar' ? "بحث تقني" : "Technical Paper",
        readTime: language === 'ar' ? "14 دقيقة" : "14 mins",
        desc: language === 'ar' 
          ? "دراسة حول علاقة مقاومة الهواء باستهلاك الوقود وكيفية تحسين انسيابية القيادة على الطرق السريعة."
          : "Study on the relationship between air resistance and fuel consumption and how to optimize driving flow on highways."
      },
      {
        title: language === 'ar' ? "احتكاك الإطارات: علم التماسك والسطوح" : "Tyre Friction: The Science of Grip",
        category: language === 'ar' ? "فيزياء القيادة" : "Driving Physics",
        type: language === 'ar' ? "مقال فني" : "Technical Article",
        readTime: language === 'ar' ? "11 دقيقة" : "11 mins",
        desc: language === 'ar' 
          ? "تحليل لمعامل الاحتكاك بين المطاط والأسفلت في درجات الحرارة المرتفعة بدبي."
          : "Analysis of the friction coefficient between rubber and asphalt in Dubai's high-temperature conditions."
      },
      {
        title: language === 'ar' ? "الانزلاق المائي: النجاة من المفاجآت" : "Hydroplaning: Surviving Sudden Surprises",
        category: language === 'ar' ? "إدارة المخاطر" : "Risk Management",
        type: language === 'ar' ? "دليل الطوارئ" : "Emergency Guide",
        readTime: language === 'ar' ? "9 دقيقة" : "9 mins",
        desc: language === 'ar' 
          ? "التفسير العلمي لفقدان التماسك على الأسطح المبللة وكيفية استعادة السيطرة برياضيات الحركة."
          : "Scientific explanation of losing grip on wet surfaces and how to regain control using motion mathematics."
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {t.articles.map((item, idx) => (
          <div key={idx} className="group">
            <Card className="h-full bg-card/40 backdrop-blur-xl border-white/5 hover:border-primary/30 hover:bg-card/60 transition-all cursor-pointer relative overflow-hidden rounded-[2rem]">
              <CardHeader className="flex flex-row items-start justify-between relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-[0.2em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {item.category}
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </div>
                <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <BookOpen className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between text-[10px] font-bold pt-4 border-t border-white/5 uppercase tracking-widest">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" /> {item.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {item.readTime}
                    </span>
                  </div>
                  <span className="text-primary group-hover:underline">{t.readMore}</span>
                </div>
              </CardContent>
            </Card>
          </div>
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
