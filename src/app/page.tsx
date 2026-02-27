import Image from "next/image"
import Link from "next/link"
import { Shield, BookOpen, Library, GraduationCap, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

export default function Home() {
  const instructorImg = PlaceHolderImages.find(img => img.id === "instructor-hero")

  return (
    <div className="container mx-auto px-6 py-10 space-y-24">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 animate-fade-in">
        <div className="flex-1 space-y-8 text-center lg:text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>معتمد وفق معايير هيئة الطرق والمواصلات RTA</span>
          </div>
          <h1 className="font-headline text-5xl lg:text-7xl font-bold leading-tight">
            احتراف القيادة <br /> 
            <span className="text-accent">بأسلوب أكاديمي</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
            نقدم لك خلاصة خبرة 8 سنوات في تدريب القيادة في دبي. منهج علمي شامل يضمن لك النجاح من المرة الأولى وفهم قواعد الطريق بعمق.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 w-full sm:w-auto">
              <Link href="/curriculum">ابدأ رحلتك التعليمية</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14 w-full sm:w-auto">
              <Link href="/assessment">اختبر معلوماتك</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 relative w-full aspect-square max-w-md lg:max-w-none">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]" />
          <Image 
            src={instructorImg?.imageUrl || ""} 
            alt="Instructor" 
            width={600} 
            height={600}
            className="relative z-10 rounded-3xl object-cover shadow-2xl border-4 border-accent/20"
            data-ai-hint="driving instructor"
          />
          <div className="absolute -bottom-6 -right-6 z-20 bg-card p-6 rounded-2xl border shadow-xl animate-bounce">
            <span className="block text-3xl font-bold text-accent">+8 سنوات</span>
            <span className="text-sm text-muted-foreground">خبرة ميدانية في دبي</span>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border/50">
        {[
          { label: "منهج RTA المحدث", value: "100%" },
          { label: "نسبة نجاح طلابنا", value: "92%" },
          { label: "ساعة تدريب علمي", value: "5000+" },
          { label: "طالب متخرج", value: "1200+" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-headline font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Main Sections Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-headline text-4xl font-bold">استكشف أقسام الأكاديمية</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">محتوى هيكلي مصمم بعناية ليناسب جميع مستويات المتدربين</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "المنهج الأكاديمي", 
              desc: "4 مراحل تدريبية تبدأ من الأساسيات وحتى اختبار المدينة.",
              icon: BookOpen,
              href: "/curriculum",
              color: "text-primary"
            },
            { 
              title: "المكتبة العلمية", 
              desc: "مقالات ودراسات تقنية حول ديناميكيات المركبة والقيادة الوقائية.",
              icon: Library,
              href: "/library",
              color: "text-accent"
            },
            { 
              title: "قواعد DSSSM", 
              desc: "فهم دقيق لنظام مراقبة سلوك السائقين واللوائح المرورية.",
              icon: Shield,
              href: "/rules",
              color: "text-green-500"
            },
          ].map((item, i) => (
            <Card key={i} className="group hover:border-primary/50 transition-all duration-300 bg-card/50 overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className={cn("p-4 rounded-2xl bg-secondary w-fit", item.color)}>
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                <Link href={item.href} className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                  استكشف القسم <ChevronLeft className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Instructor Showcase */}
      <section className="bg-secondary/30 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="font-headline text-4xl font-bold">لماذا أكاديمية القيادة الحرة؟</h2>
            <div className="space-y-6">
              {[
                "دليل شامل لجميع أسباب الرسوب الفوري في الاختبار العملي.",
                "شرح مفصل لنظام نقاط المخالفات والقيادة الآمنة.",
                "محاكاة دقيقة للاختبار النظري باستخدام الذكاء الاصطناعي.",
                "تركيز على سيكولوجية السائق واتخاذ القرار السريع.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-accent p-1">
                    <GraduationCap className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <p className="text-lg leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full text-center">
            <div className="bg-background/80 backdrop-blur-md p-10 rounded-3xl border border-accent/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-accent mb-4">رسالة من المدرب</h3>
              <p className="text-lg italic text-muted-foreground leading-relaxed mb-8">
                "القيادة ليست مجرد تحريك مقود، بل هي فن وعلم يبدأ من العقل. هدفي هو بناء جيل من السائقين الواعين الذين يدركون تماماً قوانين دبي ويقودون بأمان واحترافية."
              </p>
              <div className="font-bold text-xl">خبير تدريب القيادة في دبي</div>
              <div className="text-muted-foreground">مؤسس أكاديمية القيادة الحرة</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
