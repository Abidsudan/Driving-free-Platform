
import Image from "next/image"
import Link from "next/link"
import { Shield, BookOpen, Library, GraduationCap, ChevronLeft, Star, Users, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

export default function Home() {
  const instructorImg = PlaceHolderImages.find(img => img.id === "instructor-hero")

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-12 space-y-20 md:space-y-32">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 animate-fade-in-up">
        <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-right">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>معتمد وفق معايير هيئة الطرق والمواصلات RTA</span>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
            احترف القيادة <br /> 
            <span className="text-accent bg-clip-text">بأسلوب أكاديمي</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
            نقدم لك خلاصة خبرة 8 سنوات في تدريب القيادة في دبي. منهج علمي شامل يضمن لك النجاح من المرة الأولى وفهم قواعد الطريق بعمق.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 w-full sm:w-auto shadow-lg shadow-primary/20">
              <Link href="/curriculum">ابدأ رحلتك التعليمية</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14 w-full sm:w-auto glass-card">
              <Link href="/assessment">اختبر معلوماتك</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 relative w-full aspect-square max-w-md lg:max-w-none">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-[120px] opacity-50" />
          {instructorImg?.imageUrl && (
            <div className="relative z-10 w-full h-full overflow-hidden rounded-[2.5rem] border-4 border-white/10 shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
              <Image 
                src={instructorImg.imageUrl} 
                alt="Instructor" 
                fill
                priority
                className="object-cover"
                data-ai-hint="driving instructor"
              />
            </div>
          )}
          <div className="absolute -bottom-6 -right-4 md:-right-6 z-20 bg-card p-4 md:p-6 rounded-2xl border shadow-2xl animate-bounce">
            <span className="block text-2xl md:text-3xl font-bold text-accent">+8 سنوات</span>
            <span className="text-xs md:text-sm text-muted-foreground">خبرة ميدانية في دبي</span>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-16 border-y border-white/5 bg-secondary/10 rounded-[3rem]">
        {[
          { label: "منهج RTA المحدث", value: "100%", icon: CheckCircle },
          { label: "نسبة نجاح طلابنا", value: "92%", icon: Star },
          { label: "ساعة تدريب علمي", value: "5000+", icon: Clock },
          { label: "طالب متخرج", value: "1200+", icon: Users },
        ].map((stat, i) => (
          <div key={i} className="text-center space-y-1">
            <div className="flex justify-center mb-2">
              <stat.icon className="h-5 w-5 text-accent opacity-50" />
            </div>
            <div className="text-2xl md:text-4xl font-headline font-bold text-primary">{stat.value}</div>
            <div className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Main Sections Grid */}
      <section className="space-y-12 md:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="font-headline text-3xl md:text-5xl font-bold">استكشف أقسام الأكاديمية</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">محتوى هيكلي مصمم بعناية ليناسب جميع مستويات المتدربين</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { 
              title: "المنهج الأكاديمي", 
              desc: "4 مراحل تدريبية تبدأ من الأساسيات وحتى اختبار المدينة والقيادة المتقدمة.",
              icon: BookOpen,
              href: "/curriculum",
              color: "text-primary",
              bg: "bg-primary/10"
            },
            { 
              title: "المكتبة العلمية", 
              desc: "مقالات ودراسات تقنية معمقة حول ديناميكيات المركبة والقيادة الوقائية الحديثة.",
              icon: Library,
              href: "/library",
              color: "text-accent",
              bg: "bg-accent/10"
            },
            { 
              title: "قواعد DSSSM", 
              desc: "فهم دقيق وشامل لنظام مراقبة سلوك السائقين واللوائح المرورية في دبي.",
              icon: Shield,
              href: "/rules",
              color: "text-green-500",
              bg: "bg-green-500/10"
            },
          ].map((item, i) => (
            <Link key={i} href={item.href} className="block group">
              <Card className="h-full glass-card overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className={cn("p-4 rounded-2xl w-fit transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", item.bg, item.color)}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    استكشف القسم <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Instructor Showcase */}
      <section className="bg-secondary/30 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden border border-white/5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col lg:row items-center gap-12 lg:gap-20 lg:flex-row">
          <div className="flex-1 space-y-8">
            <h2 className="font-headline text-3xl md:text-5xl font-bold leading-tight">لماذا أكاديمية <br/>القيادة الحرة؟</h2>
            <div className="space-y-6">
              {[
                "دليل شامل لجميع أسباب الرسوب الفوري في الاختبار العملي.",
                "شرح مفصل لنظام نقاط المخالفات والقيادة الآمنة.",
                "محاكاة دقيقة للاختبار النظري باستخدام الذكاء الاصطناعي.",
                "تركيز على سيكولوجية السائق واتخاذ القرار السريع.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 rounded-full bg-accent/20 p-1.5 transition-colors group-hover:bg-accent">
                    <GraduationCap className="h-4 w-4 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full lg:max-w-md">
            <div className="glass-card p-8 md:p-12 rounded-[2rem] text-center relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                كلمة المؤسس
              </div>
              <p className="text-lg md:text-xl italic text-muted-foreground leading-relaxed mb-8 pt-4">
                "القيادة ليست مجرد تحريك مقود، بل هي فن وعلم يبدأ من العقل. هدفي هو بناء جيل من السائقين الواعين الذين يدركون تماماً قوانين دبي ويقودون بأمان واحترافية."
              </p>
              <div className="space-y-1">
                <div className="font-bold text-xl md:text-2xl text-primary">خبير تدريب القيادة</div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest">مؤسس أكاديمية القيادة الحرة</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="py-12 text-center text-muted-foreground text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} أكاديمية القيادة الحرة. جميع الحقوق محفوظة.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/rules" className="hover:text-primary">القواعد</Link>
          <Link href="/library" className="hover:text-primary">المكتبة</Link>
          <Link href="/assessment" className="hover:text-primary">التقييم</Link>
        </div>
      </footer>
    </div>
  )
}
