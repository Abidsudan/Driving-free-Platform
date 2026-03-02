
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck, CarFront, LogOut, LayoutDashboard } from "lucide-react"
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
  const { language, setLanguage, dir } = useLanguage()
  const logo = PlaceHolderImages.find(img => img.id === "site-logo")

  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999] border-b border-white/10 bg-background/95 backdrop-blur-md shadow-xl">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex items-center justify-center bg-white rounded-xl p-1.5 md:p-2 shadow-lg overflow-hidden w-32 md:w-40 h-10 md:h-14">
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
                  <CarFront className="h-5 w-5 text-primary" />
                  <span className="font-headline font-black text-sm md:text-lg text-primary uppercase">Driving Free</span>
                </div>
              )}
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1">
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
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
              <button 
                onClick={() => setLanguage('ar')}
                className={cn(
                  "px-2 md:px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-black transition-all",
                  language === 'ar' ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                AR
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={cn(
                  "px-2 md:px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-black transition-all",
                  language === 'en' ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                )}
              >
                EN
              </button>
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 md:h-10 md:w-10 cursor-pointer border-2 border-primary/20 hover:border-primary/50 transition-all">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">
                      {user.displayName?.charAt(0) || user.email?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={dir === 'rtl' ? 'start' : 'end'} className="w-56 glass-card border-white/10 mt-2">
                  <DropdownMenuLabel className="font-bold">
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
                <button className="px-4 md:px-6 py-1.5 md:py-2 rounded-xl bg-primary text-primary-foreground font-black text-xs md:text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  {language === 'ar' ? 'دخول' : 'Login'}
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <nav className="fixed bottom-6 left-6 right-6 z-[9999] md:hidden">
        <div className="flex h-16 items-center justify-between px-2 bg-background/95 backdrop-blur-md shadow-2xl rounded-2xl border border-white/10 overflow-hidden">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 gap-1 h-full rounded-xl transition-all duration-300",
                  isActive ? "text-accent bg-accent/10 scale-105" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "stroke-[2.5px]")} />
                <span className="text-[7px] font-black uppercase">
                  {language === 'ar' ? item.name : item.nameEn}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
