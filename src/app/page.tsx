
import Image from "next/image"
import Link from "next/link"
import { Shield, BookOpen, Library, GraduationCap, ChevronLeft, Star, Users, Clock, CheckCircle, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { cn } from "@/lib/utils"

export default function Home() {
  const instructorImg = PlaceHolderImages.find(img => img.id === "instructor-hero")
  const logo = PlaceHolderImages.find(img => img.id === "site-logo")

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 pt-12 md:pt-24 pb-20 animate-fade-in-up">
          <div className="flex-1 space-y-8 text-center lg:text-right">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              معتمد وفق معايير هيئة الطرق والمواصلات RTA
            </div>
            
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black leading-[1] tracking-tighter">
              احترف القيادة <br /> 
              <span className="text-gradient">بأسلوب علمي</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              أكاديمية تعليم القيادة الأولى في دبي التي تدمج بين النظرية الأكاديمية والخبرة الميدانية لضمان نجاحك من المرة الأولى.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 h-16 rounded-2xl shadow-2xl shadow-primary/30 group">
                <Link href="/curriculum" className="flex items-center gap-2">
                  ابدأ التعلم الآن <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-10 h-16 rounded-2xl glass-card border-white/10 hover:bg-white/5">
                <Link href="/assessment">خوض اختبار تجريبي</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative w-full aspect-square max-w-lg lg:max-w-none group">
            <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-[60px] group-hover:bg-primary/30 transition-all duration-700" />
            {instructorImg?.imageUrl && (
              <div className="relative z-10 w-full h-full overflow-hidden rounded-[3rem] border-2 border-white/10 shadow-2xl">
                <Image 
                  src={instructorImg.imageUrl} 
                  alt="Instructor" 
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="driving instructor"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            )}
            <div className="absolute -bottom-8 -left-8 z-20 glass-card p-6 md:p-8 rounded-[2rem] border-white/10 animate-fade-in-up stagger-2">
              <div className="flex items-center gap-4">
                <div className="bg-accent p-3 rounded-xl shadow-lg shadow-accent/20">
                  <Star className="h-6 w-6 text-background" fill="currentColor" />
                </div>
                <div>
                  <span className="block text-3xl font-black text-accent">+8 سنوات</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">خبرة تدريبية</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 py-20 px-8 rounded-[3rem] glass-card border-white/5 mb-32 animate-fade-in-up stagger-1">
          {[
            { label: "منهج RTA المحدث", value: "100%", icon: CheckCircle, color: "text-green-500" },
            { label: "نسبة النجاح", value: "92%", icon: Star, color: "text-accent" },
            { label: "ساعة تدريب", value: "5000+", icon: Clock, color: "text-primary" },
            { label: "خريج فخور", value: "1200+", icon: Users, color: "text-purple-500" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-3">
              <div className={cn("inline-flex p-3 rounded-2xl bg-white/5", stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-5xl font-black font-headline tracking-tighter">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Featured Sections */}
        <section className="space-y-16 pb-32">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="font-headline text-4xl md:text-6xl font-black tracking-tighter">رحلتك نحو التميز</h2>
            <p className="text-muted-foreground text-lg">أدوات تعليمية متطورة مصممة لتجعل منك سائقاً محترفاً وواعياً.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "المنهج الأكاديمي", 
                desc: "خارطة طريق تعليمية من 4 مراحل تأخذك من الصفر إلى الاحتراف الميداني.",
                icon: BookOpen,
                href: "/curriculum",
                color: "text-primary",
                bg: "bg-primary/10"
              },
              { 
                title: "المكتبة العلمية", 
                desc: "تعمق في فيزياء القيادة وسيكولوجية السائق عبر مقالات تقنية حصرية.",
                icon: Library,
                href: "/library",
                color: "text-accent",
                bg: "bg-accent/10"
              },
              { 
                title: "اختبارات الذكاء", 
                desc: "محاكي اختبارات RTA المدعوم بالذكاء الاصطناعي لتقييم جاهزيتك فوراً.",
                icon: GraduationCap,
                href: "/assessment",
                color: "text-purple-500",
                bg: "bg-purple-500/10"
              },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group">
                <Card className="h-full glass-card border-white/5 rounded-[2.5rem] overflow-hidden group-hover:translate-y-[-10px] transition-all duration-500">
                  <CardContent className="p-10 space-y-8">
                    <div className={cn("p-5 rounded-[2rem] w-fit shadow-xl transition-all duration-500 group-hover:rotate-6", item.bg, item.color)}>
                      <item.icon className="h-10 w-10" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-base">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                      اكتشف المزيد <ChevronLeft className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/5 pt-20 pb-12 overflow-hidden bg-card/20">
        <div className="container mx-auto px-6 text-center space-y-12">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-primary shadow-2xl shadow-primary/40 flex items-center justify-center">
              <Shield className="h-8 w-8 text-background" fill="currentColor" />
            </div>
            <span className="font-headline font-black text-3xl tracking-tighter">
              <span className="text-accent">DRIVING</span> FREE <span className="text-primary/80">ACADEME</span>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            <Link href="/curriculum" className="hover:text-primary">المنهج</Link>
            <Link href="/library" className="hover:text-primary">المكتبة</Link>
            <Link href="/rules" className="hover:text-primary">القواعد</Link>
            <Link href="/assessment" className="hover:text-primary">التقييم</Link>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground/60">
            <p>© {new Date().getFullYear()} أكاديمية القيادة الحرة. جميع الحقوق محفوظة.</p>
            <p>صمم بذكاء وحرفية لخدمة طلابنا في دبي</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
