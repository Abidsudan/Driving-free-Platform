"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useLanguage } from "@/components/language-provider"

export default function CurriculumPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'ar' ? "المنهج الأكاديمي المتكامل" : "Integrated Academic Curriculum",
    description: language === 'ar' 
      ? "هيكل تعليمي منطقي يأخذك من الصفر وحتى الحصول على رخصة القيادة، مصمم وفقاً لمعايير RTA وأحدث النظريات العلمية في تدريب السائقين."
      : "A logical educational structure that takes you from zero to obtaining a driver's license, designed according to RTA standards and the latest scientific theories in driver training.",
    stages: [
      {
        title: language === 'ar' ? "المرحلة الأولى: الأساسيات والبيئة المحيطة" : "Stage 1: Basics & Environment",
        description: language === 'ar' ? "فهم مكونات المركبة، وضعيات الجلوس الصحيحة، واستخدام المرايا." : "Understanding vehicle components, correct seating positions, and mirror usage.",
        topics: language === 'ar' 
          ? ["فحص المركبة قبل التحرك", "وضعيات المقود والدواسات", "فهم لوحة العدادات"]
          : ["Pre-trip vehicle inspection", "Steering and pedal positions", "Understanding the dashboard"],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة الثانية: التحكم والمناورة" : "Stage 2: Control & Maneuvering",
        description: language === 'ar' ? "إتقان التحرك، التوقف، الانعطافات، والتعامل مع التقاطعات البية." : "Mastering movement, stopping, turns, and handling simple intersections.",
        topics: language === 'ar' 
          ? ["قاعدة 2 ثانية للمسافات", "تقنيات الدوران الصحيحة", "فهم نقاط العمياء"]
          : ["2-second distance rule", "Correct turning techniques", "Understanding blind spots"],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة الثالثة: قواعد الطريق السريع" : "Stage 3: Highway Regulations",
        description: language === 'ar' ? "الانتقال بين المسارات، دخول وخروج الطرق السريعة، والسرعات العالية." : "Lane changing, entering and exiting highways, and high speeds.",
        topics: language === 'ar' 
          ? ["التسارع الآمن", "فهم إشارات الطرق السريعة", "إدارة المخاطر العالية"]
          : ["Safe acceleration", "Understanding highway signs", "High-risk management"],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة الرابعة: اختبار المدينة المتقدم" : "Stage 4: Advanced City Test",
        description: language === 'ar' ? "المحاكاة الكاملة لاختبار RTA العملي والتركيز على أسباب الرسوب الفوري." : "Full simulation of the RTA practical test focusing on instant failure reasons.",
        topics: language === 'ar' 
          ? ["القيادة في المناطق المزدحمة", "أولويات الدوارات المعقدة", "الوقوف الاضطراري"]
          : ["Driving in congested areas", "Complex roundabout priorities", "Emergency stopping"],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة الخامسة: القيادة الليلية والظروف الصعبة" : "Stage 5: Night & Adverse Weather",
        description: language === 'ar' ? "إدارة الرؤية المنخفضة والتعامل مع الأمطار والرياح القوية في دبي." : "Managing low visibility and handling rain and strong winds in Dubai.",
        topics: language === 'ar' 
          ? ["استخدام الأضواء العالية والمنخفضة", "التحكم في الانزلاق المائي", "إدارة الإجهاد البصري"]
          : ["High and low beam usage", "Hydroplaning control", "Visual fatigue management"],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      },
      {
        title: language === 'ar' ? "المرحلة السادسة: إتقان اختبار الطريق النهائي" : "Stage 6: Final Road Test Mastery",
        description: language === 'ar' ? "التحضير النفسي والفني النهائي للحصول على الرخصة من المحاولة الأولى." : "Final psychological and technical preparation to get the license on the first try.",
        topics: language === 'ar' 
          ? ["بروتوكول الفحص النهائي", "تجنب أخطاء التدخل اليدوي", "الثقة خلف المقود"]
          : ["Final exam protocol", "Avoiding intervention errors", "Confidence behind the wheel"],
        image: PlaceHolderImages.find(img => img.id === "curriculum-stage")?.imageUrl
      }
    ],
    stageLabel: language === 'ar' ? "المرحلة" : "Stage"
  };

  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="max-w-3xl space-y-4">
        <h1 className="font-headline text-4xl font-bold">{t.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {t.stages.map((stage, idx) => (
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
                  {t.stageLabel} {idx + 1}
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
