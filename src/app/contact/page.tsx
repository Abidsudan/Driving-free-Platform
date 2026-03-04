
'use client';

import { Mail, MessageSquare, MapPin, Send, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { language } = useLanguage()
  const [isSending, setIsSending] = useState(false)

  const t = {
    title: language === 'ar' ? "اتصل بنا" : "Contact Us",
    subtitle: language === 'ar' ? "نحن هنا لمساعدتك في رحلتك الأكاديمية" : "We are here to help your academic journey",
    name: language === 'ar' ? "الاسم" : "Full Name",
    email: language === 'ar' ? "البريد الإلكتروني" : "Email Address",
    message: language === 'ar' ? "رسالتك" : "Your Message",
    btn: language === 'ar' ? "إرسال الرسالة" : "Send Message",
    success: language === 'ar' ? "تم الإرسال بنجاح!" : "Message Sent Successfully!",
    successDesc: language === 'ar' ? "سيتواصل معك فريقنا الأكاديمي قريباً." : "Our academic team will contact you soon."
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      toast({
        title: t.success,
        description: t.successDesc,
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-none">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>

          <div className="space-y-8">
            {[
              { icon: Mail, label: "Email", value: "info@drivingfree.online" },
              { icon: MapPin, label: "Location", value: "Dubai, United Arab Emirates" },
              { icon: MessageSquare, label: "Live Support", value: "Available 24/7 for AI Help" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-3xl glass-card border-white/5">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</div>
                  <div className="font-bold text-lg">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-10 md:p-16 rounded-[4rem] border-primary/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest ml-1">{t.name}</label>
              <Input required className="h-14 rounded-2xl bg-background/50 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest ml-1">{t.email}</label>
              <Input type="email" required className="h-14 rounded-2xl bg-background/50 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest ml-1">{t.message}</label>
              <Textarea required className="min-h-[150px] rounded-3xl bg-background/50 border-white/10" />
            </div>
            <Button disabled={isSending} className="w-full h-16 rounded-2xl font-black text-lg shadow-xl shadow-primary/30">
              {isSending ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Send className="h-5 w-5 mr-2" /> {t.btn}</>}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
