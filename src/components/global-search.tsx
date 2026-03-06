'use client';

import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Library, ShieldCheck, ClipboardCheck, ArrowRight, Zap, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// بيانات البحث المفهرسة (يمكن توسيعها مستقبلاً)
const searchableItems = [
  // المنهج
  { id: 'c1', title: 'Stage 1: Foundations', titleAr: 'المرحلة الأولى: التأسيس', type: 'Curriculum', href: '/curriculum', icon: BookOpen },
  { id: 'c2', title: 'Stage 2: Residential', titleAr: 'المرحلة الثانية: المناطق السكنية', type: 'Curriculum', href: '/curriculum', icon: BookOpen },
  { id: 'c3', title: 'Stage 3: Highways', titleAr: 'المرحلة الثالثة: الطرق العامة', type: 'Curriculum', href: '/curriculum', icon: BookOpen },
  { id: 'c4', title: 'Stage 4: Parking', titleAr: 'المرحلة الرابعة: المواقف', type: 'Curriculum', href: '/curriculum', icon: BookOpen },
  // المكتبة
  { id: 'l1', title: 'Defensive Driving', titleAr: 'القيادة الدفاعية', type: 'Library', href: '/library', icon: Library },
  { id: 'l2', title: 'Weight Transfer', titleAr: 'ديناميكيات نقل الوزن', type: 'Library', href: '/library', icon: Library },
  { id: 'l3', title: 'Vision Rule', titleAr: 'قاعدة النظر الذهبية', type: 'Library', href: '/library', icon: Library },
  // الإشارات
  { id: 's1', title: 'Regulatory Signs', titleAr: 'الإشارات التنظيمية', type: 'Signs', href: '/traffic-signs', icon: ShieldCheck },
  { id: 's2', title: 'Warning Signs', titleAr: 'الإشارات التحذيرية', type: 'Signs', href: '/traffic-signs', icon: ShieldCheck },
  { id: 's3', title: 'Road Markings', titleAr: 'علامات الطريق', type: 'Signs', href: '/traffic-signs', icon: ShieldCheck },
  // القواعد
  { id: 'r1', title: 'Immediate Failure (IF)', titleAr: 'الرسوب الفوري', type: 'Rules', href: '/rules', icon: AlertTriangle },
  { id: 'r2', title: 'Minor Errors', titleAr: 'الأخطاء البسيطة', type: 'Rules', href: '/rules', icon: ClipboardCheck },
  { id: 'r3', title: 'DSSSM System', titleAr: 'نظام مراقبة السلوك', type: 'Rules', href: '/rules', icon: Zap },
];

export function GlobalSearch() {
  const { language, dir } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof searchableItems>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchableItems.filter(item => {
      const target = language === 'ar' ? item.titleAr : item.title;
      return target.toLowerCase().includes(query.toLowerCase());
    });
    setResults(filtered);
  }, [query, language]);

  const t = {
    title: language === 'ar' ? "البحث الأكاديمي" : "Academic Search",
    placeholder: language === 'ar' ? "ابحث عن المنهج، الإشارات، أو القواعد..." : "Search curriculum, signs, or rules...",
    noResults: language === 'ar' ? "لم يتم العثور على نتائج." : "No results found.",
    quickLinks: language === 'ar' ? "روابط سريعة" : "Quick Links"
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground border border-white/5 transition-all">
          <Search className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl glass-card border-white/10 rounded-[2.5rem] p-0 gap-0 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-primary/5">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className={cn(
                "h-14 rounded-2xl bg-background/50 border-white/10 text-lg",
                dir === 'rtl' ? "pr-12 pl-4" : "pl-12 pr-4"
              )}
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {query.trim() === '' ? (
            <div className="p-4 space-y-4">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-2">{t.quickLinks}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchableItems.slice(0, 4).map(item => (
                  <Link 
                    key={item.id} 
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="font-bold text-sm">{language === 'ar' ? item.titleAr : item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.map(item => (
              <Link 
                key={item.id} 
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-base">{language === 'ar' ? item.titleAr : item.title}</div>
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.type}</div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))
          ) : (
            <div className="p-12 text-center text-muted-foreground italic">
              {t.noResults}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
