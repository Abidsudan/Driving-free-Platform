
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const stages = [
  {
    title: "المرحلة الأولى: الأساسيات والبيئة المحيطة",
    description: "فهم مكونات المركبة، وضعيات الجلوس الصحيحة، واستخدام المرايا.",
    topics: ["فحص المركبة قبل التحرك", "وضعيات المقود والدواسات", "فهم لوحة العدادات"],
    image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
  },
  {
    title: "المرحلة الثانية: التحكم والمناورة",
    description: "إتقان التحرك، التوقف، الانعطافات، والتعامل مع التقاطعات البسيطة.",
    topics: ["قاعدة 2 ثانية للمسافات", "تقنيات الدوران الصحيحة", "فهم نقاط العمياء"],
    image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
  },
  {
    title: "المرحلة الثالثة: قواعد الطريق السريع",
    description: "الانتقال بين المسارات، دخول وخروج الطرق السريعة، والسرعات العالية.",
    topics: ["قاعدة 2 ثانية للمسافات", "تقنيات الدوران الصحيحة", "فهم نقاط العمياء"],
    image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
  },
  {
    title: "المرحلة الرابعة: اختبار المدينة المتقدم",
    description: "المحاكاة الكاملة لاختبار RTA العملي والتركيز على أسباب الرسوب الفوري.",
    topics: ["القيادة في المناطق المزدحمة", "أولويات الدوارات المعقدة", "الوقوف الاضطراري"],
    image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
  }
]

export default function CurriculumPage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="max-w-3xl space-y-4">
        <h1 className="font-headline text-4xl font-bold">المنهج الأكاديمي المتكامل</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          هيكل تعليمي منطقي يأخذك من الصفر وحتى الحصول على رخصة القيادة، مصمم وفقاً لمعايير RTA وأحدث النظريات العلمية في تدريب السائقين.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {stages.map((stage, idx) => (
          <div key={idx} className="relative">
            <Card className="h-full overflow-hidden border-border/50 bg-card/40">
              <div className="relative h-48 w-full">
                {stage.image && (
                  <Image 
                    src={stage.image} 
                    alt={stage.title} 
                    fill 
                    className="object-cover"
                    data-ai-hint="driving lesson stage"
                  />
                )}
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  المرحلة {idx + 1}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{stage.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{stage.description}</p>
                <div className="space-y-3">
                  {stage.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
