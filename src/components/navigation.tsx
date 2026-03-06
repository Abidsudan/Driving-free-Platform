"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck, LogOut, LayoutDashboard, Languages, Share2, Menu, FileCheck } from "lucide-react"
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
import { ShareDialog } from "@/components/share-dialog"

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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-background/80 backdrop-blur-3xl border-b border-white/5 h-20 md:h-24 flex items-center shadow-2xl">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex items-center justify-center bg-white rounded-2xl p-2 shadow-2xl w-40 md:w-48 h-12 md:h-14 overflow-hidden transition-all active:scale-95 group-hover:shadow-primary/20">
              {logo?.imageUrl ? (
                <Image 
                  src={logo.imageUrl} 
                  alt="Driving Free" 
                  width={180}
                  height={60}
                  className="object-contain"
                  priority
                  unoptimized
                />
              ) : (
                <span className="font-black text-primary tracking-tighter">DRIVING FREE</span>
              )}
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1 bg-secondary/40 p-1.5 rounded-full border border-white/5 shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all uppercase tracking-widest",
                  pathname === item.href 
                    ? "bg-primary text-white shadow-[0_8px_24px_-4px_rgba(59,130,246,0.5)] scale-105" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {language === 'ar' ? item.nameAr : item.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black transition-all uppercase tracking-widest flex items-center gap-2",
                  pathname === "/dashboard" 
                    ? "bg-accent text-accent-foreground shadow-xl scale-105" 
                    : "text-accent hover:bg-accent/10"
                )}
              >
                <LayoutDashboard className="h-3 w-3" />
                {language === 'ar' ? "لوحة التحكم" : "Dashboard"}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <ShareDialog>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl hover:bg-white/10 text-muted-foreground hidden sm:flex h-12 w-12"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </ShareDialog>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="rounded-2xl hover:bg-white/10 text-muted-foreground h-12 w-12"
            >
              <Languages className="h-5 w-5" />
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-12 w-12 cursor-pointer border-2 border-primary/20 hover:border-primary hover:scale-110 transition-all shadow-xl">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary font-black">
                      {user.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={dir === 'rtl' ? 'start' : 'end'} className="w-64 glass-card border-white/10 mt-6 rounded-[2rem] p-3">
                  <DropdownMenuLabel className="font-black py-4 px-4 text-sm uppercase tracking-widest text-primary">
                    {language === 'ar' ? 'حسابك الأكاديمي' : 'Academic Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer py-4 flex items-center gap-4 rounded-2xl hover:bg-primary/10 px-4">
                      <LayoutDashboard className="h-5 w-5 text-primary" /> 
                      <span className="font-bold">{language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/verification/trainer" className="cursor-pointer py-4 flex items-center gap-4 rounded-2xl hover:bg-accent/10 px-4">
                      <FileCheck className="h-5 w-5 text-accent" /> 
                      <span className="font-bold">{language === 'ar' ? 'إثبات العمل' : 'Trainer Proof'}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer py-4 text-red-400 flex items-center gap-4 rounded-2xl hover:bg-red-500/10 px-4">
                    <LogOut className="h-5 w-5" /> 
                    <span className="font-bold">{language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button className="rounded-2xl font-black px-8 h-12 shadow-xl shadow-primary/20 text-sm uppercase tracking-widest">
                  {language === 'ar' ? 'دخول' : 'Login'}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="fixed bottom-8 left-8 right-8 z-[9999] lg:hidden">
        <div className="flex h-20 items-center justify-around bg-background/90 backdrop-blur-3xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] rounded-[2.5rem] border border-white/10 px-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 gap-1.5 h-14 rounded-3xl transition-all",
                  isActive ? "text-accent bg-accent/10 shadow-inner" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-6 w-6", isActive && "stroke-[3px]")} />
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {language === 'ar' ? item.nameAr : item.name}
                </span>
              </Link>
            )
          })}
          {user && (
            <Link
              href="/dashboard"
              className={cn(
                "flex flex-col items-center justify-center flex-1 gap-1.5 h-14 rounded-3xl transition-all",
                pathname === "/dashboard" ? "text-accent bg-accent/10 shadow-inner" : "text-muted-foreground"
              )}
            >
              <LayoutDashboard className={cn("h-6 w-6", pathname === "/dashboard" && "stroke-[3px]")} />
              <span className="text-[10px] font-black uppercase tracking-tighter">
                {language === 'ar' ? "لوحة" : "Dash"}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}
