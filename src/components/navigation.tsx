
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck, CarFront, User, LogOut, LayoutDashboard } from "lucide-react"
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

const navItems = [
  { name: "الرئيسية", nameEn: "Home", href: "/", icon: Home },
  { name: "المنهج", nameEn: "Curriculum", href: "/curriculum", icon: BookOpen },
  { name: "المكتبة", nameEn: "Library", href: "/library", icon: Library },
  { name: "القواعد", nameEn: "Rules", href: "/rules", icon: ShieldCheck },
  { name: "التقييم", nameEn: "Assessment", href: "/assessment", icon: ClipboardCheck },
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
      {/* Desktop Navigation - Enhanced visibility and Z-index */}
      <header className="fixed top-0 left-0 right-0 z-[999] hidden border-b border-white/10 bg-background/90 backdrop-blur-2xl md:block shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <div className="logo-container w-40 h-14">
              {logo?.imageUrl ? (
                <Image 
                  src={logo.imageUrl} 
                  alt="Driving Free Logo" 
                  width={140}
                  height={56}
                  className="object-contain"
                  priority
                  unoptimized
                />
              ) : (
                <div className="flex items-center gap-2">
                  <CarFront className="h-6 w-6 text-primary" />
                  <span className="font-headline font-black text-lg text-primary uppercase">Driving Free</span>
                </div>
              )}
            </div>
          </Link>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-300 flex items-center gap-2",
                  pathname === item.href 
                    ? "text-accent bg-accent/10 border border-accent/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {language === 'ar' ? item.name : item.nameEn}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-4 border-r border-white/10 pr-4 rtl:mr-0 rtl:ml-4 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-4">
              <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setLanguage('ar')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-black transition-all",
                    language === 'ar' ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  AR
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-black transition-all",
                    language === 'en' ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
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
                        {user.displayName?.charAt(0) || user.email?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-card border-white/10 mt-2 z-[1000]">
                    <DropdownMenuLabel className="font-headline font-bold">
                      {language === 'ar' ? 'حسابي' : 'My Account'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" /> {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400 flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth">
                  <button className="px-6 py-2 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    {language === 'ar' ? 'دخول' : 'Login'}
                  </button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation - Ensuring high visibility and Z-index */}
      <nav className="fixed bottom-6 left-6 right-6 z-[999] md:hidden">
        <div className="flex h-20 items-center justify-between px-2 bg-background/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {navItems.map((item) => {
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
                <span className="text-[8px] font-black uppercase">
                  {language === 'ar' ? item.name : item.nameEn}
                </span>
              </Link>
            )
          })}
          
          <Link
            href={user ? "/dashboard" : "/auth"}
            className={cn(
              "flex flex-col items-center justify-center flex-1 gap-1 h-full rounded-2xl transition-all duration-300",
              (pathname === "/auth" || pathname === "/dashboard") ? "text-accent bg-accent/10 scale-105" : "text-muted-foreground"
            )}
          >
            <User className={cn("h-5 w-5", (pathname === "/auth" || pathname === "/dashboard") && "stroke-[2.5px]")} />
            <span className="text-[8px] font-black uppercase">
              {user ? (language === 'ar' ? "لوحتي" : "Panel") : (language === 'ar' ? "دخول" : "Login")}
            </span>
          </Link>
        </div>
      </nav>
    </>
  )
}
