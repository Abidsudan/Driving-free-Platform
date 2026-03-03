
'use client';

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Share2, 
  Copy, 
  Check, 
  Twitter, 
  MessageCircle, 
  Facebook,
  Linkedin,
  BookOpen,
  Library,
  ShieldCheck,
  ClipboardCheck
} from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { toast } from '@/hooks/use-toast';

export function ShareDialog({ children }: { children?: React.ReactNode }) {
  const { language, dir } = useLanguage();
  const [copied, setCopying] = useState(false);
  const logo = PlaceHolderImages.find(img => img.id === "site-logo");
  
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://drivingfree.online';
  
  const t = {
    title: language === 'ar' ? "شارك المعرفة الأكاديمية" : "Share Academic Knowledge",
    desc: language === 'ar' 
      ? "ساهم في بناء جيل من السائقين المحترفين في دبي. شارك المنصة مع زملائك." 
      : "Help build a generation of professional drivers in Dubai. Share the platform with your peers.",
    copy: language === 'ar' ? "نسخ الرابط" : "Copy Link",
    copied: language === 'ar' ? "تم النسخ!" : "Copied!",
    sectionsTitle: language === 'ar' ? "ماذا سيجدون في الداخل؟" : "What they will find inside:",
    sections: [
      { name: language === 'ar' ? "المنهج المتكامل" : "Integrated Curriculum", icon: BookOpen },
      { name: language === 'ar' ? "المكتبة العلمية" : "Scientific Library", icon: Library },
      { name: language === 'ar' ? "دليل الإشارات" : "Traffic Signs Guide", icon: ShieldCheck },
      { name: language === 'ar' ? "محاكي RTA" : "RTA Simulator", icon: ClipboardCheck },
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopying(true);
    toast({
      title: t.copied,
      description: language === 'ar' ? "رابط الأكاديمية جاهز للمشاركة." : "Academy link is ready to share.",
    });
    setTimeout(() => setCopying(false), 2000);
  };

  const shareText = language === 'ar' 
    ? "انضم إلي في أكاديمية Driving Free - أول منصة تعليمية أكاديمية للقيادة في دبي وفق معايير RTA." 
    : "Join me at Driving Free Academy - Dubai's first academic driving platform based on RTA standards.";

  const socialLinks = [
    { 
      name: "WhatsApp", 
      icon: MessageCircle, 
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + siteUrl)}`,
      color: "bg-green-500 hover:bg-green-600" 
    },
    { 
      name: "X / Twitter", 
      icon: Twitter, 
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`,
      color: "bg-black hover:bg-black/80" 
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`,
      color: "bg-blue-700 hover:bg-blue-800" 
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="icon" className="rounded-xl glass-card border-white/10">
            <Share2 className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md glass-card border-white/10 rounded-[2.5rem] overflow-hidden p-0 gap-0">
        <div className="bg-primary/10 p-8 text-center space-y-6 border-b border-white/5">
          <div className="bg-white rounded-2xl p-3 w-40 mx-auto shadow-2xl">
            {logo?.imageUrl && (
              <Image 
                src={logo.imageUrl} 
                alt="Logo" 
                width={160} 
                height={40} 
                className="object-contain"
                unoptimized
              />
            )}
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-black font-headline">{t.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm font-medium">
              {t.desc}
            </DialogDescription>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all active:scale-95 ${link.color} text-white`}
              >
                <link.icon className="h-6 w-6" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1">{t.sectionsTitle}</span>
            <div className="grid grid-cols-2 gap-3">
              {t.sections.map((section, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <section.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold">{section.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Input 
              value={siteUrl} 
              readOnly 
              className="rounded-xl bg-background/50 border-white/10 h-12 text-xs font-medium"
            />
            <Button onClick={handleCopy} className="h-12 px-6 rounded-xl font-black shrink-0">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
