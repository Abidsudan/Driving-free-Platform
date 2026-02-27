
import { ShieldAlert, Info, AlertTriangle, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RulesPage() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12 animate-fade-in">
      <div className="space-y-4">
        <h1 className="font-headline text-4xl font-bold">القواعد والإشارات المرورية</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          دليل شامل يستند إلى دليل RTA الرسمي ونظام DSSSM. فهم القواعد هو الخطوة الأولى لتجنب الرسوب الفوري والحصول على الرخصة.
        </p>
      </div>

      <Tabs defaultValue="failure" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto bg-secondary/50 p-1">
          <TabsTrigger value="failure" className="py-4 font-bold data-[state=active]:bg-primary">أسباب الرسوب الفوري</TabsTrigger>
          <TabsTrigger value="dsssm" className="py-4 font-bold data-[state=active]:bg-primary">نظام DSSSM</TabsTrigger>
          <TabsTrigger value="signs" className="py-4 font-bold data-[state=active]:bg-primary">إشارات RTA الأساسية</TabsTrigger>
        </TabsList>

        <TabsContent value="failure" className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "عدم التوقف عند إشارة قف", desc: "يجب التوقف تماماً لثلاث ثوانٍ قبل خط الوقوف." },
              { title: "عدم الالتزام بالأولوية في الدوار", desc: "دخول الدوار دون إعطاء الأولوية للقادم من اليسار." },
              { title: "تجاوز السرعة المقررة", desc: "تجاوز سرعة الطريق المحددة حتى بمقدار بسيط خلال الاختبار." },
              { title: "استخدام الهاتف أو الانشغال", desc: "أي تشتت ذهني أثناء القيادة يؤدي للرسوب المباشر." },
              { title: "عدم فحص النقطة العمياء", desc: "إهمال فحص الكتف عند تغيير المسار أو الانعطاف." },
              { title: "التدخل المباشر للمفحص", desc: "إذا اضطر المفحص لاستخدام المكابح أو المقود لتجنب خطر." },
            ].map((rule, i) => (
              <Card key={i} className="border-red-500/20 bg-red-500/5">
                <CardHeader className="flex flex-row items-center gap-4">
                  <ShieldAlert className="h-6 w-6 text-red-500" />
                  <CardTitle className="text-lg">{rule.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rule.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dsssm" className="mt-8">
          <Card className="bg-card/50 border-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-accent">نظام مراقبة سلوك السائقين (DSSSM)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" /> ما هو هذا النظام؟
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  هو نظام ذكي تستخدمه هيئة الطرق والمواصلات لمراقبة وتقييم أداء السائقين بشكل مستمر. يهدف النظام إلى تقليل الحوادث من خلال رصد المخالفات السلوكية مثل الانحراف المفاجئ، التتابع القريب، وعدم الالتزام بخط السير.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-primary">المخالفات المرصودة آلياً:</h4>
                  <ul className="space-y-3">
                    {["تجاوز الإشارة الحمراء", "استخدام الهاتف المحمول", "عدم ربط حزام الأمان"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <AlertTriangle className="h-4 w-4 text-orange-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-accent">كيفية الحفاظ على سجل نظيف:</h4>
                  <ul className="space-y-3">
                    {["الالتزام بمسافات الأمان", "استخدام الإشارات قبل 5 ثوانٍ", "القيادة بهدوء وسلاسة"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signs" className="mt-8">
           <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
              <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-headline font-bold">دليل الإشارات المرئية</h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                هذا القسم يتضمن أكثر من 150 إشارة مرورية. حالياً نقوم بتحديث الصور بجودة 4K لتناسب تجربة المستخدم المتطورة لدينا.
              </p>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
