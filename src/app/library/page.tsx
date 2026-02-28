
import { BookOpen, FileText, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const articles = [
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
    readTime: "15 دقيقة",
    desc: "فهم العمليات الذهنية التي يمر بها السائق في غضون أجزاء من الثانية لتجنب الاصطدام."
  },
  {
    title: "مستقبل القيادة الذاتية في دبي 2030",
    category: "تكنولوجيا",
    type: "تقرير",
    readTime: "10 دقيقة",
    desc: "نظرة على رؤية دبي للمواصلات الذكية وكيف سيحتاج السائق البشري للتفاعل مع المركبات الآلية."
  },
  {
    title: "ميكانيكا نظام التعليق والثبات",
    category: "تقنية المركبات",
    type: "فيديو توضيحي",
    readTime: "8 دقائق",
    desc: "شرح مرئي لكيفية عمل نظام التعليق في الحفاظ على ثبات المركبة في المنعطفات الحادة."
  }
]

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <h1 className="font-headline text-4xl font-bold">المكتبة العلمية</h1>
          <p className="text-xl text-muted-foreground">تعمق في الجانب التقني والعلمي لعالم القيادة.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-4 py-1">تقني</Badge>
          <Badge variant="secondary" className="px-4 py-1">أكاديمي</Badge>
          <Badge variant="secondary" className="px-4 py-1">موثق</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((item, idx) => (
          <div key={idx}>
            <Card className="h-full bg-card/40 border-border/50 hover:bg-card/60 transition-all cursor-pointer">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    {item.category}
                  </div>
                  <CardTitle className="text-2xl font-headline">{item.title}</CardTitle>
                </div>
                <BookOpen className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-border/30">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-4 w-4" /> {item.type}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Video className="h-4 w-4" /> {item.readTime}
                    </span>
                  </div>
                  <span className="font-bold text-primary">اقرأ المزيد</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-[2rem] bg-primary/5 border border-primary/20 text-center">
        <h2 className="text-3xl font-headline font-bold mb-6">هل تبحث عن موضوع محدد؟</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
          مكتبتنا يتم تحديثها أسبوعياً بدراسات جديدة حول السلامة المرورية في دبي وتقنيات القيادة المتقدمة.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {["الإسعافات الأولية", "صيانة المحرك", "القيادة الليلية", "توفير الوقود", "ديناميكا الهواء"].map((tag, i) => (
            <div key={i} className="px-6 py-2 rounded-full bg-background border border-border text-sm hover:border-primary transition-all cursor-pointer">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
