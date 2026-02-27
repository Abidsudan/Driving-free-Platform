
import { AssessmentQuiz } from "@/components/assessment-quiz"
import { ClipboardCheck, ShieldAlert, Award } from "lucide-react"

export default function AssessmentPage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="font-headline text-4xl font-bold">التقييم المعرفي الذكي</h1>
        <p className="text-lg text-muted-foreground">
          استعد لاختبار RTA النظري من خلال محاكي يعمل بالذكاء الاصطناعي. احصل على تقييم فوري لمستواك المعرفي وشرح علمي لكل إجابة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: ClipboardCheck, title: "محاكاة واقعية", text: "أسئلة تتبع نفس نمط اختبارات دبي الرسمية." },
          { icon: ShieldAlert, title: "تحليل الأخطاء", text: "شرح مفصل للقواعد لضمان عدم تكرار الخطأ." },
          { icon: Award, title: "معدل الإدراك", text: "قياس دقيق لمدى جاهزيتك للاختبار الحقيقي." },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-secondary/20 border border-border/50">
            <item.icon className="h-10 w-10 text-accent mb-4" />
            <h3 className="font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>

      <AssessmentQuiz />
      
      <div className="max-w-2xl mx-auto mt-20 p-8 rounded-3xl bg-accent/5 border border-accent/20">
        <h2 className="text-2xl font-headline font-bold text-accent mb-4">لماذا هذا التقييم؟</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            تعتمد هيئة الطرق والمواصلات (RTA) في دبي على بنك أسئلة واسع يركز على الفهم لا الحفظ. نظامنا يستخدم الذكاء الاصطناعي لتوليد أسئلة تغطي:
          </p>
          <ul className="list-disc pr-6 space-y-2 text-sm">
            <li>نظام DSSSM لمراقبة سلوك السائقين.</li>
            <li>قواعد التجاوز والأولويات في التقاطعات المعقدة.</li>
            <li>التعامل مع حالات الطوارئ والظروف الجوية المختلفة.</li>
            <li>التعرف السريع على إشارات المرور التحذيرية والتنظيمية.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
