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
import { Search, BookOpen, Library, ShieldCheck, ClipboardCheck, ArrowRight, Zap, AlertTriangle, LayoutDashboard, Target } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Academic search index data
const searchableItems = [
  // Dashboard
  { id: 'dash', title: 'Dashboard & Log', titleAr: 'لوحة التحكم والسجل الأكاديمي', type: 'System', href: '/dashboard', icon: LayoutDashboard },
  // Curriculum
  { id: 'c1', title: 'Stage 1: Foundation (Routine)', titleAr: 'المرحلة الأولى: التأسيس والروتين', type: 'Curriculum', href: '/curriculum', icon: BookOpen },
  { id: 'c2', title: 'Stage 2: Residential Areas', titleAr: 'المرحلة الثانية: المناطق السكنية', type: 'Curriculum', href: '/curriculum', icon: BookOpen },
  { id: 'c3', title: 'Stage 3: High Speeds & Merging', titleAr: 'المرحلة الثالثة: السرعات العالية', type: 'Curriculum', href: '/curriculum', icon: BookOpen },
  { id: 'c4', title: 'Stage 4: Smart Parking', titleAr: 'المرحلة الرابعة: المواقف الذكية', type: 'Curriculum', href: '/curriculum', icon: BookOpen },
  // Library
  { id: 'l1', title: 'Defensive Driving Art', titleAr: 'فن القيادة الدفاعية', type: 'Library', href: '/library', icon: Library },
  { id: 'l2', title: 'Weight Transfer Dynamics', titleAr: 'فيزياء نقل الوزن عند الكبح', type: 'Library', href: '/library', icon: Library },
  { id: 'l3', title: 'Golden Vision Rule', titleAr: 'قاعدة النظر الذهبية', type: 'Library', href: '/library', icon: Library },
  // Signs
  { id: 's1', title: 'Regulatory Signs (Mandatory)', titleAr: 'الإشارات التنظيمية (الإلزامية)', type: 'Signs', href: '/traffic-signs', icon: ShieldCheck },
  { id: 's2', title: 'Warning Signs (Dangers)', titleAr: 'الإشارات التحذيرية (المخاطر)', type: 'Signs', href: '/traffic-signs', icon: ShieldCheck },
  { id: 's3', title: 'Road Markings & Yellow Box', titleAr: 'علامات الطريق والمربع الأصفر', type: 'Signs', href: '/traffic-signs', icon: ShieldCheck },
  // Rules
  { id: 'r1', title: 'Immediate Failure Items (IF)', titleAr: 'بنود الرسوب الفوري (IF)', type: 'Rules', href: '/rules', icon: AlertTriangle },
  { id: 'r2', title: 'Minor & Evaluation Errors', titleAr: 'الأخطاء البسيطة والتقييمية', type: 'Rules', href: '/rules', icon: ClipboardCheck },
  { id: 'r3', title: 'DSSSM Smart Monitoring', titleAr: 'نظام DSSSM لمراقبة السلوك', type: 'Rules', href: '/rules', icon: Zap },
  // Assessment
  { id: 'ass', title: 'Smart RTA Simulator', titleAr: 'محاكي اختبار RTA الذكي', type: 'Assessment', href: '/assessment', icon: Target },
];

export function GlobalSearch({ children }: { children?: React.ReactNode }) {
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
    title: language === 'ar' ? "البحث الأكاديمي الموحد" : "Unified Academic Search",
    placeholder: language === 'ar' ? "ابحث عن المنهج، الإشارات، أو القواعد المعتمدة..." : "Search curriculum, signs, or approved rules...",
    noResults: language === 'ar' ? "لم يتم العثور على نتائج تطابق بحثك." : "No matching academic records found.",
    quickLinks: language === 'ar' ? "روابط أكاديمية سريعة" : "Quick Academic Links",
    searchBtn: language === 'ar' ? "البحث" : "Search"
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className="flex items-center gap-3 h-12 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/10 transition-all w-full sm:w-auto shadow-sm">
            <Search className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-black hidden sm:inline uppercase tracking-widest">{t.searchBtn}</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl glass-card border-white/10 rounded-[3rem] p-0 gap-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-0">
          <DialogTitle className="sr-only">{t.title}</DialogTitle>
        </DialogHeader>
        
        <div className="p-8 border-b border-white/5 bg-primary/5">
          <div className="relative">
            <Search className={cn("absolute top-1/2 -translate-y-1/2 h-6 w-6 text-primary", dir === 'rtl' ? 'right-6' : 'left-6')} />
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className={cn(
                "h-16 rounded-2xl bg-background/60 border-primary/20 text-xl font-bold placeholder:font-normal shadow-inner",
                dir === 'rtl' ? "pr-16 pl-6 text-right" : "pl-16 pr-6"
              )}
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4 custom-scrollbar bg-black/20">
          {query.trim() === '' ? (
            <div className="p-4 space-y-6">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] px-2">{t.quickLinks}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchableItems.slice(0, 8).map(item => (
                  <Link 
                    key={item.id} 
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-white/10 transition-all group shadow-sm"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">{language === 'ar' ? item.titleAr : item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map(item => (
                <Link 
                  key={item.id} 
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between p-5 rounded-[1.5rem] hover:bg-primary/10 group transition-all border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                      <div className="font-black text-lg tracking-tight group-hover:text-primary transition-colors">{language === 'ar' ? item.titleAr : item.title}</div>
                      <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md w-fit mt-1">{item.type}</div>
                    </div>
                  </div>
                  <ArrowRight className={cn("h-6 w-6 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1", dir === 'rtl' && "rotate-180 group-hover:-translate-x-1")} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center text-muted-foreground italic font-medium flex flex-col items-center gap-4">
              <AlertTriangle className="h-12 w-12 opacity-20" />
              {t.noResults}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
