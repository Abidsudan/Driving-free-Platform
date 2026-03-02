
"use client"

import { BookOpen, FileText, Clock, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"

const articles = [
  {
    title: "التحكم في المركبة: من الأساسيات إلى القيادة الآمنة",
    category: "أساسيات القيادة",
    type: "درس شامل",
    readTime: "20 دقيقة",
    desc: "إتقان التحكم في المركبة هو حجر الزاوية في فن القيادة الآمنة والواثقة. يغطي هذا الدرس وضعيات الجلوس الصحيحة، أدوات التحكم الرئيسية، وديناميكيات الحركة."
  },
  {
    title: "القيادة الدفاعية: فن استباق المخاطر",
    category: "سلوك السائق",
    type: "دليل إرشادي",
    readTime: "15 دقيقة",
    desc: "القيادة الدفاعية هي ممارسة تهدف لتقليل المخاطر من خلال التنبؤ بأخطاء الآخرين والتعامل مع الظروف الصعبة بتركيز تام."
  },
  {
    title: "ديناميكيات نقل الوزن عند الكبح",
    category: "فيزياء القيادة",
    type: "مقال علمي",
    readTime: "12 دقيقة",
    desc: "دراسة تقنية حول كيفية تأثر توازن المركبة عند استخدام المكابح المفاجئة وكيفية تجنب الانزلاق."
  },
  {
    title: "سيكولوجية اتخاذ القرار في الأزمات",
    category: "سلوك السائق",
    type: "دراسة حالة",
    readTime: "10 دقيقة",
    desc: "فهم العمليات الذهنية التي يمر بها السائق لتجنب الاصطدام وكيفية الحفاظ على الهدوء تحت الضغط."
  }
]

export default function LibraryPage() {
  const { language } = useLanguage()

  const t = {
    badge: language === 'ar' ? "مراجع أكاديمية موثقة" : "Verified Academic References",
    title: language === 'ar' ? "المكتبة العلمية" : "Scientific Library",
    desc: language === 'ar' ? "تعمق في الجانب التقني والعلمي لعالم القيادة من خلال دراسات ومقالات أعدها خبراء الميدان." : "Deep dive into the technical and scientific world of driving through studies by field experts.",
    readMore: language === 'ar' ? "اقرأ المقال الكامل" : "Read Full Article",
    searchTitle: language === 'ar' ? "هل تبحث عن موضوع محدد؟" : "Looking for a specific topic?",
    searchDesc: language === 'ar' ? "مكتبتنا العلمية هي نتاج سنوات من الخبرة الميدانية والدراسة الأكاديمية." : "Our scientific library is the result of years of field experience and academic study."
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
        {articles.map((item, idx) => (
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
            {["الإسعافات الأولية", "صيانة المحرك", "القيادة الليلية", "توفير الوقود", "ديناميكا الهواء", "سيكولوجية السائق"].map((tag, i) => (
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
