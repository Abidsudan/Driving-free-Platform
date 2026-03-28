"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck, LogOut, LayoutDashboard, Languages, Activity, Sparkles, User, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useUser, useAuth } from "@/firebase"
import { signOut } from "firebase/auth"
import { useLanguage } from "@/components/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", nameAr: "الرئيسية", href: "/", icon: Home },
  { name: "Curriculum", nameAr: "المنهج", href: "/curriculum", icon: BookOpen },
  { name: "Library", nameAr: "المكتبة", href: "/library", icon: Library },
  { name: "Traffic Signs", nameAr: "الإشارات", href: "/traffic-signs", icon: ShieldCheck },
  { name: "Assessment", nameAr: "التقييم", href: "/assessment", icon: ClipboardCheck },
]

export function Navigation() {
  const pathname = usePathname()
  const { user } = useUser()
  const auth = useAuth()
  const { language, setLanguage, dir } = useLanguage()
  const logo = PlaceHolderImages.find(img => img.id === "site-logo")

  const handleSignOut = () => signOut(auth)

  const t = {
    account: language === 'ar' ? 'حسابك الأكاديمي' : 'Academic Account',
    dashboard: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
    signOut: language === 'ar' ? 'تسجيل الخروج' : 'Sign Out',
    login: language === 'ar' ? 'دخول' : 'Login'
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-background/40 backdrop-blur-3xl border-b border-white/5 h-20 md:h-24 flex items-center shadow-2xl transition-all duration-500">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <div className="relative flex items-center justify-center bg-white rounded-2xl p-2 shadow-2xl w-32 md:w-44 h-12 md:h-14 overflow-hidden transition-all group-hover:scale-105 active:scale-95 border-2 border-white/10">
                <Image 
                  src="/site-logo.png" 
                  alt="Driving Free" 
                  width={150}
                  height={50}
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                  priority
                />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] leading-none mb-1">Dubai</span>
              <span className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] leading-none opacity-60">Academic Lab</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-3 bg-black/40 p-2 rounded-[2rem] border border-white/5 shadow-2xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-6 py-3 rounded-[1.5rem] text-[10px] font-extrabold uppercase tracking-widest transition-all duration-500 relative group/item",
                  pathname === item.href 
                    ? "bg-primary text-black shadow-2xl shadow-primary/40 scale-105" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {language === 'ar' ? item.nameAr : item.name}
                </div>
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-primary rounded-[1.5rem] animate-pulse-slow opacity-20" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-secondary/30 p-1 rounded-2xl border border-white/5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage('en')}
                className={cn(
                  "rounded-xl px-4 text-[10px] font-black uppercase tracking-widest transition-all",
                  language === 'en' ? "bg-white/10 text-white" : "text-muted-foreground"
                )}
              >
                EN
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage('ar')}
                className={cn(
                  "rounded-xl px-4 text-[10px] font-black uppercase tracking-widest transition-all",
                  language === 'ar' ? "bg-white/10 text-white font-headline" : "text-muted-foreground"
                )}
              >
                AR
              </Button>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative group cursor-pointer active:scale-95 transition-all">
                    <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Avatar className="h-12 w-12 border-2 border-primary/20 hover:border-primary transition-all relative z-10 bg-black shadow-2xl">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary font-black uppercase text-xs">
                        {user.displayName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={dir === 'rtl' ? 'start' : 'end'} className="w-72 glass-card border-white/10 mt-6 p-4 rounded-[2rem] shadow-2xl animate-reveal-up overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] -mr-16 -mt-16" />
                  <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-[0.4em] py-3 text-muted-foreground">
                    {t.account}
                  </DropdownMenuLabel>
                  <div className="px-3 py-4 flex items-center gap-4 border-b border-white/5 mb-2">
                     <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <User className="h-5 w-5 text-primary" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-black tracking-tight">{user.displayName || "User"}</span>
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none">Standard Tier</span>
                     </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer py-4 px-4 rounded-xl flex items-center gap-4 hover:bg-primary hover:text-black transition-all group">
                      <LayoutDashboard className="h-5 w-5 text-primary group-hover:text-black transition-colors" /> 
                      <span className="text-xs font-black uppercase tracking-[0.2em]">{t.dashboard}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5 my-2" />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer py-4 px-4 rounded-xl text-red-400 flex items-center gap-4 hover:bg-red-500/10 transition-all group">
                    <LogOut className="h-5 w-5" /> 
                    <span className="text-xs font-black uppercase tracking-[0.2em]">{t.signOut}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button className="premium-button rounded-2xl font-black px-10 h-14 bg-primary text-black hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-[0.3em]">
                  {t.login}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Nav Bar - Modern & Floating */}
      <nav className="fixed bottom-8 left-8 right-8 z-[9999] lg:hidden">
        <div className="flex h-20 items-center justify-around bg-black/60 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-full border border-white/10 px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center h-14 w-14 rounded-full transition-all relative overflow-hidden",
                  isActive ? "text-primary scale-110" : "text-muted-foreground opacity-60"
                )}
              >
                <Icon className={cn("h-6 w-6 relative z-10", isActive && "stroke-[2.5px] animate-float")} />
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 animate-reveal-up opacity-50" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

