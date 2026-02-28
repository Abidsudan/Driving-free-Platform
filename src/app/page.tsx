
import Image from "next/image"
import Link from "next/link"
import { Shield, BookOpen, Library, GraduationCap, ChevronLeft, Star, Users, Clock, CheckCircle, ArrowUpRight, Zap, Target } from "lucide-react"
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
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 pt-16 md:pt-32 pb-24 animate-fade-in-up">
          <div className="flex-1 space-y-10 text-center lg:text-right">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold tracking-wide backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              منصة تعليمية معتمدة وفق معايير RTA دبي
            </div>
            
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter">
              احترف القيادة <br /> 
              <span className="text-gradient">بمنهج أكاديمي</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              الأكاديمية الأولى في دبي التي تحول سنوات الخبرة الميدانية الطويلة إلى منهج علمي تفاعلي يضمن لك النجاح من المحاولة الأولى.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-6">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xl px-12 h-20 rounded-[2rem] shadow-2xl shadow-primary/40 group overflow-hidden relative">
                <Link href="/curriculum" className="flex items-center gap-3 relative z-10">
                  ابدأ رحلة التعلم <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-xl px-12 h-20 rounded-[2rem] glass-card border-white/10 hover:bg-white/5 font-bold">
                <Link href="/assessment">خوض اختبار ذكاء RTA</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative w-full aspect-square max-w-xl lg:max-w-none group">
            <div className="absolute inset-0 bg-primary/30 rounded-[4rem] blur-[80px] group-hover:bg-primary/40 transition-all duration-1000" />
            {instructorImg?.imageUrl && (
              <div className="relative z-10 w-full h-full overflow-hidden rounded-[4rem] border-2 border-white/20 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]">
                <Image 
                  src={instructorImg.imageUrl} 
                  alt="Professional Instructor" 
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  data-ai-hint="dubai driving instructor"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
            )}
            
            {/* Students Floating Card */}
            <div className="absolute -top-10 -right-10 z-20 glass-card p-6 rounded-[2rem] border-white/20 animate-fade-in-up stagger-3 hidden md:block">
              <div className="flex -space-x-3 rtl:space-x-reverse mb-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                    <Image src={`https://picsum.photos/seed/${i+10}/100/100`} alt="student" width={40} height={40} />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background bg-accent text-background flex items-center justify-center text-xs font-black">
                  +1k
                </div>
              </div>
              <p className="text-xs font-bold text-muted-foreground">طلاب ناجحون في دبي</p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 py-24 px-12 rounded-[4rem] glass-card border-white/10 mb-40 animate-fade-in-up stagger-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          {[
            { label: "منهج RTA المطور", value: "100%", icon: CheckCircle, color: "text-primary" },
            { label: "دقة محاكي الذكاء", value: "98%", icon: Target, color: "text-accent" },
            { label: "ساعة تدريب ميداني", value: "5000+", icon: Clock, color: "text-indigo-400" },
            { label: "خريج رخصة قيادة", value: "1200+", icon: Users, color: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-4 group">
              <div className={cn("inline-flex p-4 rounded-3xl bg-white/5 transition-transform group-hover:scale-110 group-hover:rotate-6", stat.color)}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-4xl md:text-6xl font-black font-headline tracking-tighter transition-all group-hover:text-primary">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Featured Sections */}
        <section className="space-y-24 pb-48">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-headline text-5xl md:text-7xl font-black tracking-tighter">بوابتك لإتقان القيادة</h2>
            <p className="text-muted-foreground text-xl font-medium">أدوات تعليمية رقمية صممت لتبسيط المفاهيم الفيزيائية والقواعد المعقدة لهيئة الطرق والمواصلات.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "المنهج الأكاديمي", 
                desc: "رحلة تعليمية منظمة من 4 مستويات تغطي كل ما تحتاجه من فحص المركبة إلى القيادة في الطرق السريعة.",
                icon: BookOpen,
                href: "/curriculum",
                color: "text-primary",
                bg: "bg-primary/10",
                accent: "border-primary/20"
              },
              { 
                title: "المكتبة التقنية", 
                desc: "مقالات علمية حصرية تتناول فيزياء كبح المركبات وسيكولوجية السائق تحت الضغط المروري.",
                icon: Library,
                href: "/library",
                color: "text-accent",
                bg: "bg-accent/10",
                accent: "border-accent/20"
              },
              { 
                title: "محاكي RTA الذكي", 
                desc: "نظام توليد أسئلة بالذكاء الاصطناعي يحاكي الاختبار النظري الحقيقي بدقة مذهلة.",
                icon: GraduationCap,
                href: "/assessment",
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                accent: "border-purple-500/20"
              },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group">
                <Card className={cn("h-full glass-card border-white/5 rounded-[3rem] overflow-hidden group-hover:translate-y-[-15px] transition-all duration-700", item.accent)}>
                  <CardContent className="p-12 space-y-10">
                    <div className={cn("p-6 rounded-[2.5rem] w-fit shadow-2xl transition-all duration-700 group-hover:rotate-12 group-hover:scale-110", item.bg, item.color)}>
                      <item.icon className="h-12 w-12" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-black group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg font-medium">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 text-primary font-black text-lg group-hover:gap-5 transition-all">
                      استكشف الآن <ChevronLeft className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 pt-32 pb-16 overflow-hidden bg-card/40 backdrop-blur-3xl">
        <div className="container mx-auto px-6 text-center space-y-16">
          <div className="flex flex-col items-center gap-8">
            <Link href="/" className="flex flex-col items-center gap-4 group">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl overflow-hidden bg-primary shadow-2xl shadow-primary/40 transition-transform duration-500 group-hover:rotate-12">
                <Shield className="h-10 w-10 text-background" fill="currentColor" />
              </div>
              <span className="font-headline font-black text-4xl tracking-tighter">
                <span className="text-accent">DRIVING</span> FREE <span className="text-primary/80">ACADEME</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md font-medium">نحن نؤمن أن القيادة ليست مجرد مهارة، بل هي علم يجمع بين الفيزياء والسلوك البشري لضمان حياة آمنة للجميع في دبي.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 text-sm font-black text-muted-foreground uppercase tracking-[0.4em]">
            <Link href="/curriculum" className="hover:text-primary transition-colors">المنهج</Link>
            <Link href="/library" className="hover:text-primary transition-colors">المكتبة</Link>
            <Link href="/rules" className="hover:text-primary transition-colors">القواعد</Link>
            <Link href="/assessment" className="hover:text-primary transition-colors">التقييم</Link>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} أكاديمية القيادة الحرة • دبي ، الإمارات العربية المتحدة</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              النظام يعمل بكفاءة كاملة عبر drivingfreee.online
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
