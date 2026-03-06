
'use client';

import { useUser } from '@/firebase';
import { useLanguage } from '@/components/language-provider';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Award, Printer, Download, MapPin, Globe, Calendar, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

export default function TrainerVerificationPage() {
  const { user, isUserLoading } = useUser();
  const { language, dir } = useLanguage();
  const logo = PlaceHolderImages.find(img => img.id === "site-logo");

  const t = {
    title: language === 'ar' ? "إثبات عمل وتفويض أكاديمي" : "Employment & Academic Authorization",
    subtitle: language === 'ar' ? "شهادة اعتماد مدرب رقمي" : "Digital Trainer Certification",
    certify: language === 'ar' 
      ? "تشهد أكاديمية Driving Free الرقمية في دبي بأن المذكور أدناه يعمل لديها بصفة مدرب أكاديمي معتمد." 
      : "Driving Free Digital Academy in Dubai hereby certifies that the individual named below is a registered and certified Academic Trainer.",
    details: {
      name: language === 'ar' ? "اسم المدرب:" : "Trainer Name:",
      id: language === 'ar' ? "رقم الاعتماد:" : "Certification ID:",
      date: language === 'ar' ? "تاريخ الإصدار:" : "Issue Date:",
      status: language === 'ar' ? "الحالة:" : "Status:",
      active: language === 'ar' ? "نشط - معتمد" : "Active - Certified"
    },
    footer: language === 'ar' 
      ? "هذه وثيقة رقمية صادرة من النظام ولا تتطلب توقيعاً خطياً. يمكن التحقق من صحتها عبر رمز الاستجابة السريع." 
      : "This is a digitally issued document and does not require a physical signature. Validity can be verified via the QR code.",
    printBtn: language === 'ar' ? "طباعة الوثيقة" : "Print Document"
  };

  if (isUserLoading) return <div className="p-20 text-center animate-pulse">Loading Document...</div>;
  if (!user) return <div className="p-20 text-center">Please login to view your proof.</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl animate-fade-in">
      <div className="flex justify-between items-center mb-8 no-print">
        <h1 className="text-2xl font-black">{t.title}</h1>
        <Button onClick={handlePrint} className="rounded-xl gap-2 font-black">
          <Printer className="h-4 w-4" /> {t.printBtn}
        </Button>
      </div>

      {/* Official Certificate Paper */}
      <div className="bg-white text-slate-900 rounded-none shadow-2xl p-12 md:p-20 relative overflow-hidden border-[16px] border-slate-100 min-h-[1000px] flex flex-col">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <ShieldCheck className="h-[600px] w-[600px] rotate-12" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 relative z-10 border-b-2 border-slate-100 pb-8">
          <div className="bg-white p-2 rounded-lg shadow-sm w-48">
            <Image 
              src={logo?.imageUrl || ""} 
              alt="Driving Free Logo" 
              width={180} 
              height={60} 
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="text-right space-y-1">
            <div className="text-xs font-black uppercase tracking-widest text-primary">Driving Free Academe</div>
            <div className="flex items-center justify-end gap-2 text-[10px] text-slate-500 font-bold">
              <MapPin className="h-3 w-3" /> Dubai, United Arab Emirates
            </div>
            <div className="flex items-center justify-end gap-2 text-[10px] text-slate-500 font-bold">
              <Globe className="h-3 w-3" /> drivingfree.online
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-4 mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
            <Award className="h-3 w-3" /> {t.subtitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">{t.title}</h2>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-12 relative z-10">
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            {t.certify}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-10 rounded-3xl border border-slate-100">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.details.name}</span>
                <div className="text-2xl font-black text-slate-800">{user.displayName || "Certified Trainer"}</div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.details.id}</span>
                <div className="text-sm font-mono font-bold text-slate-600">{user.uid.toUpperCase()}</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.details.date}</span>
                <div className="text-xl font-bold text-slate-800">
                  {format(new Date(), 'do MMMM yyyy', { locale: language === 'ar' ? ar : enUS })}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.details.status}</span>
                <div className="flex items-center gap-2 text-green-600 font-black">
                  <UserCheck className="h-5 w-5" /> {t.details.active}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stamp & Verification */}
        <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
          <div className="max-w-xs space-y-4">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Verification</div>
            <div className="h-24 w-24 bg-slate-100 rounded-xl flex items-center justify-center p-2 border-2 border-slate-50">
              {/* Mock QR Code */}
              <div className="grid grid-cols-4 gap-1 w-full h-full opacity-20">
                {Array.from({length: 16}).map((_, i) => <div key={i} className="bg-slate-900 rounded-sm" />)}
              </div>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight font-bold italic">
              {t.footer}
            </p>
          </div>

          <div className="text-center space-y-4 px-10">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin-slow absolute -top-4 -left-4 opacity-20" />
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <ShieldCheck className="h-10 w-10" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-black uppercase tracking-widest text-slate-800">Department of Academic Standards</div>
              <div className="text-[10px] font-bold text-slate-400">Driving Free Academe, Dubai</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          main { padding-top: 0 !important; }
          header, footer, nav { display: none !important; }
          .container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .bg-white { box-shadow: none !important; border: none !important; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
