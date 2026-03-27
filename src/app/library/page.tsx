
"use client"

import { BookOpen, FileText, Clock, Sparkles, MoveRight, BookMarked, Microscope, Brain, Zap, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export default function LibraryPage() {
  const { language, dir } = useLanguage()

  const t = {
    badge: language === 'ar' ? "أبحاث أكاديمية موثقة" : "Verified Academic Research",
    title: language === 'ar' ? "المكتبة العلمية" : "Scientific Library",
    desc: language === 'ar' ? "تعمق في الجانب التقني والعلمي لعالم القيادة من خلال دراسات ومقالات أعدها خبراء الميدان في دبي." : "Deep dive into the technical and scientific world of driving through studies by elite field experts in Dubai.",
    readMore: language === 'ar' ? "فتح الملف البحثي" : "Open Research File",
    searchTitle: language === 'ar' ? "استكشاف المجمع العلمي" : "Explore Scientific Complex",
    searchDesc: language === 'ar' ? "مكتبتنا العلمية هي نتاج سنوات من الخبرة الميدانية والدراسة الأكاديمية المكثفة." : "Our scientific library is the result of years of field experience and intensive academic study.",
    tags: language === 'ar' 
      ? ["فيزياء الحركة", "مومنتوم المركبة", "القيادة الليلية", "الديناميكا الحرارية", "سيكولوجية السائق"]
      : ["Motion Physics", "Vehicle Momentum", "Night Dynamics", "Thermodynamics", "Driver Psychology"],
    articles: [
      {
        title: language === 'ar' ? "الديناميكا المتطورة: من الأساسيات إلى الاحتراف" : "Advanced Dynamics: From Basics to Mastery",
        category: language === 'ar' ? "فيزياء القيادة" : "Driving Physics",
        type: language === 'ar' ? "بحث شامل" : "Comprehensive Research",
        readTime: language === 'ar' ? "25 دقيقة" : "25 mins",
        icon: Microscope,
        desc: language === 'ar' 
          ? "إتقان التحكم في المركبة هو حجر الزاوية في فن القيادة الآمنة. يغطي هذا البحث وضعيات الجلوس العلمية، أدوات التحكم الدقيقة، وديناميكيات نقل الوزن."
          : "Mastering vehicle control is the cornerstone of safe driving. This research covers scientific seating, precision controls, and weight transfer dynamics."
      },
      {
        title: language === 'ar' ? "القيادة الاستباقية: فن المعالجة الذهنية" : "Proactive Driving: Mental Processing Art",
        category: language === 'ar' ? "سلوك بشري" : "Human Behavior",
        type: language === 'ar' ? "دليل استراتيجي" : "Strategic Guide",
        readTime: language === 'ar' ? "15 دقيقة" : "15 mins",
        icon: Brain,
        desc: language === 'ar' 
          ? "الممارسة التي تهدف لتقليل المخاطر من خلال التنبؤ الكهرومغناطيسي لأخطاء الآخرين والتعامل مع الظروف الصعبة بتركيز مطلق."
          : "The practice aimed at reducing risks through electromagnetic prediction of others' mistakes and handling conditions with absolute focus."
      },
      {
        title: language === 'ar' ? "توزيع القوى عند الكبح المفاجئ" : "Force Distribution in Sudden Braking",
        category: language === 'ar' ? "الميكانيكا الحركية" : "Kinetic Mechanics",
        type: language === 'ar' ? "ورقة فنية" : "Technical Paper",
        readTime: language === 'ar' ? "12 دقيقة" : "12 mins",
        icon: Zap,
        desc: language === 'ar' 
          ? "تحليل فني عميق حول كيفية تأثر توازن المركبة عند استخدام المكابح في المنعطفات وكيفية تجنب فقدان التماسك الهيدروليكي."
          : "Deep technical analysis of how vehicle balance is affected when braking in corners and how to avoid losing hydraulic traction."
      },
      {
        title: language === 'ar' ? "الرؤية المحيطية والتركيز الذهني" : "Peripheral Vision and Mental Focus",
        category: language === 'ar' ? "العلوم العصبية" : "Neuroscience",
        type: language === 'ar' ? "دراسة أكاديمية" : "Academic Study",
        readTime: language === 'ar' ? "10 دقيقة" : "10 mins",
        icon: Sparkles,
        desc: language === 'ar' 
          ? "فهم العمليات العصبية التي يمر بها السائق لتجنب الاصطدام وكيفية تدريب العين على اكتشاف المخاطر الجانبية بسرعة فائقة."
          : "Understanding neural processes a driver undergoes to avoid collisions and training the eye to detect lateral hazards rapidly."
      }
    ]
  }

  return (
    <div className="container mx-auto px-6 py-24 space-y-24 animate-reveal-up overflow-hidden">
      {/* Cinematic Header */}
      <div className="relative space-y-8 text-center max-w-4xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl backdrop-blur-3xl animate-float">
            <BookMarked className="h-4 w-4" /> {t.badge}
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter smart-gradient-text uppercase leading-none">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/60 leading-relaxed font-medium">
            {t.desc}
          </p>
        </div>
      </div>

      {/* Research Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/5 blur-[150px] pointer-events-none" />
        
        {t.articles.map((item, idx) => (
          <div key={idx} className={cn(
            "group animate-reveal-up",
            idx === 0 && "delay-100",
            idx === 1 && "delay-200",
            idx === 2 && "delay-300",
            idx === 3 && "delay-400",
            idx >= 4 && "delay-500"
          )}>
            <Card className="h-full bg-black/40 backdrop-blur-3xl border-white/5 hover:border-primary/30 transition-all duration-700 cursor-pointer overflow-hidden rounded-[3.5rem] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <CardHeader className="p-12 space-y-10 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    {item.category}
                  </div>
                  <div className="p-5 rounded-[2rem] bg-white/5 text-primary border border-white/10 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-2xl">
                    <item.icon className="h-7 w-7" />
                  </div>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-headline font-black leading-[1.1] group-hover:text-primary transition-colors tracking-tighter uppercase">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="px-12 pb-12 space-y-10 relative z-10">
                <p className="text-muted-foreground/60 leading-relaxed text-lg font-medium">
                  {item.desc}
                </p>
                
                <div className="flex items-center justify-between pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.4em]">
                  <div className="flex items-center gap-8 text-muted-foreground/40">
                    <span className="flex items-center gap-3">
                      <FileText className="h-4 w-4" /> {item.type}
                    </span>
                    <span className="flex items-center gap-3">
                      <Clock className="h-4 w-4" /> {item.readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-primary group-hover:gap-5 transition-all">
                    <span>{t.readMore}</span>
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Discovery Complex */}
      <div className="mt-32 p-20 rounded-[5rem] bg-white/[0.02] border border-white/5 text-center relative overflow-hidden backdrop-blur-xl group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 space-y-12 max-w-3xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tighter uppercase leading-none">{t.searchTitle}</h2>
            <p className="text-muted-foreground/60 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              {t.searchDesc}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {t.tags.map((tag, i) => (
              <div key={i} className="px-8 py-4 rounded-[1.5rem] bg-black/40 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer backdrop-blur-md text-muted-foreground hover:text-primary">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

