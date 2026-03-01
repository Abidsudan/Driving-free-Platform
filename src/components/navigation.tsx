"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck, CarFront, User, LogOut, LayoutDashboard, Languages, Sparkles } from "lucide-react"
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
  { name: "الرئيسية", nameEn: "Home", href: "/", icon: Home },
  { name: "المنهج", nameEn: "Curriculum", href: "/curriculum", icon: BookOpen },
  { name: "المكتبة", nameEn: "Library", href: "/library", icon: Library },
  { name: "القواعد", nameEn: "Rules", href: "/rules", icon: ShieldCheck },
  { name: "التقييم", nameEn: "Assessment", href: "/assessment", icon: ClipboardCheck },
  { name: "المعلم الذكي", nameEn: "AI Tutor", href: "/tutor", icon: Sparkles },
]

export function Navigation() {
  const pathname = usePathname()
  const { user } = useUser()
  const auth = useAuth()
  const { language, setLanguage } = useLanguage()
  const logo = PlaceHolderImages.find(img => img.id === "site-logo")

  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <>
      {/* Desktop Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-[100] hidden border-b border-white/5 bg-background/40 backdrop-blur-2xl md:block">
        <div className="container mx-auto flex h-24 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-48 h-24 transition-all duration-500 group-hover:scale-105 flex items-center justify-center">
              {logo?.imageUrl ? (
                <Image 
                  src={logo.imageUrl} 
                  alt="Driving Free Logo" 
                  width={160}
                  height={96}
                  className="object-contain"
                  priority
                  unoptimized
                />
              ) : (
                <CarFront className="h-12 w-12 text-primary" />
              )}
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-300 flex items-center gap-2",
                  pathname === item.href 
                    ? "text-accent bg-accent/10 border border-accent/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {item.icon === Sparkles && <Sparkles className="h-4 w-4" />}
                {language === 'ar' ? item.name : item.nameEn}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 mr-4 border-r border-white/10 pr-4 rtl:mr-0 rtl:ml-4 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-4">
              {/* Desktop Language Buttons */}
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setLanguage('ar')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                    language === 'ar' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"
                  )}
                >
                  AR
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                    language === 'en' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"
                  )}
                >
                  EN
                </button>
              </div>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 cursor-pointer border-2 border-primary/20 hover:border-primary/50 transition-all">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary font-bold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-card border-white/10 mt-2">
                    <DropdownMenuLabel className="font-headline font-bold">
                      {language === 'ar' ? 'حسابي' : 'My Account'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" /> {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400 focus:text-red-400 flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth">
                  <button className="px-8 py-2.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                  </button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-6 right-6 z-[100] md:hidden">
        <div className="flex h-20 items-center justify-between px-2 bg-background/80 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 gap-1 h-full rounded-2xl transition-all duration-300",
                  isActive ? "text-accent bg-accent/10 scale-105" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                <span className="text-[8px] font-black uppercase tracking-tighter">
                  {language === 'ar' ? item.name : item.nameEn}
                </span>
              </Link>
            )
          })}
          
          {/* Mobile Tutor Icon */}
          <Link
            href="/tutor"
            className={cn(
              "flex flex-col items-center justify-center flex-1 gap-1 h-full rounded-2xl transition-all duration-300",
              pathname === "/tutor" ? "text-accent bg-accent/10 scale-105" : "text-muted-foreground"
            )}
          >
            <Sparkles className={cn("h-5 w-5", pathname === "/tutor" && "stroke-[2.5px]")} />
            <span className="text-[8px] font-black uppercase tracking-tighter">
              {language === 'ar' ? "المعلم" : "Tutor"}
            </span>
          </Link>

          <Link
            href={user ? "/dashboard" : "/auth"}
            className={cn(
              "flex flex-col items-center justify-center flex-1 gap-1 h-full rounded-2xl transition-all duration-300",
              pathname === "/auth" || pathname === "/dashboard" ? "text-accent bg-accent/10 scale-105" : "text-muted-foreground"
            )}
          >
            <User className={cn("h-5 w-5", (pathname === "/auth" || pathname === "/dashboard") && "stroke-[2.5px]")} />
            <span className="text-[8px] font-black uppercase tracking-tighter">
              {user ? (language === 'ar' ? "لوحتي" : "Panel") : (language === 'ar' ? "دخول" : "Login")}
            </span>
          </Link>
        </div>
      </nav>
    </>
  )
}
