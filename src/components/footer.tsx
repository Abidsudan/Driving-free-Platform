
'use client';

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Twitter, Instagram, Linkedin, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react"

export function Footer() {
  const { language, dir } = useLanguage()
  const logo = PlaceHolderImages.find(img => img.id === "site-logo")

  const t = {
    desc: language === 'ar' 
      ? "أول أكاديمية رقمية في دبي تحول الخبرة الميدانية إلى منهج أكاديمي ذكي يضمن النجاح من المرة الأولى." 
      : "The #1 platform in Dubai transforming field experience into a smart academic curriculum for guaranteed success.",
    quickLinks: language === 'ar' ? "روابط سريعة" : "Quick Links",
    legal: language === 'ar' ? "قانوني" : "Legal",
    contact: language === 'ar' ? "اتصل بنا" : "Contact",
    about: language === 'ar' ? "من نحن" : "About Us",
    privacy: language === 'ar' ? "سياسة الخصوصية" : "Privacy Policy",
    terms: language === 'ar' ? "الشروط والأحكام" : "Terms & Conditions",
    rights: language === 'ar' ? "جميع الحقوق محفوظة © 2026 Driving Free" : "All Rights Reserved © 2026 Driving Free",
    location: language === 'ar' ? "دبي، الإمارات العربية المتحدة" : "Dubai, UAE",
  }

  return (
    <footer className="bg-card/30 border-t border-white/5 pt-20 pb-10 rounded-t-[4rem] backdrop-blur-xl mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Desc */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="bg-white rounded-xl p-2 w-40 shadow-xl overflow-hidden">
                <Image 
                  src={logo?.imageUrl || ""} 
                  alt="Driving Free Logo" 
                  width={160} 
                  height={40} 
                  className="object-contain"
                  unoptimized
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed opacity-80">
              {t.desc}
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-headline font-black text-sm uppercase tracking-widest text-primary">{t.quickLinks}</h4>
            <ul className="space-y-4">
              {['curriculum', 'library', 'traffic-signs', 'assessment'].map((link) => (
                <li key={link}>
                  <Link href={`/${link}`} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 transition-colors capitalize">
                    <ExternalLink className="h-3 w-3" />
                    {link.replace('-', ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="font-headline font-black text-sm uppercase tracking-widest text-primary">{t.legal}</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t.privacy}</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t.terms}</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t.about}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-headline font-black text-sm uppercase tracking-widest text-primary">{t.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                {t.location}
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-accent" />
                info@drivingfree.online
              </li>
              <li className="flex items-center gap-3 text-primary text-xs font-black">
                <ShieldCheck className="h-4 w-4" />
                RTA STANDARDS COMPLIANT
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 text-center">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.5em]">
            {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
