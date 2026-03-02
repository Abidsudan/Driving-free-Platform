"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck, LogOut, LayoutDashboard, Languages } from "lucide-react"
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-background border-b border-white/5 h-16 md:h-20 flex items-center shadow-2xl">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex items-center justify-center bg-white rounded-2xl p-1 shadow-2xl w-32 md:w-40 h-10 md:h-12 overflow-hidden transition-transform active:scale-95">
              {logo?.imageUrl ? (
                <Image 
                  src={logo.imageUrl} 
                  alt="Driving Free" 
                  width={140}
                  height={50}
                  className="object-contain"
                  priority
                  unoptimized
                />
              ) : (
                <span className="font-black text-primary">DRIVING FREE</span>
              )}
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-2 bg-secondary/30 p-1 rounded-full border border-white/5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-black transition-all",
                  pathname === item.href 
                    ? "bg-primary text-white shadow-lg shadow-primary/25" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {language === 'ar' ? item.nameAr : item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="rounded-xl hover:bg-white/5 text-muted-foreground"
            >
              <Languages className="h-5 w-5" />
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer border-2 border-primary/20 hover:border-primary transition-all">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      {user.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={dir === 'rtl' ? 'start' : 'end'} className="w-56 glass-card border-white/10 mt-4">
                  <DropdownMenuLabel className="font-bold py-3">
                    {language === 'ar' ? 'حسابك الأكاديمي' : 'Academic Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer py-3 flex items-center gap-3">
                      <LayoutDashboard className="h-4 w-4 text-primary" /> 
                      {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer py-3 text-red-400 flex items-center gap-3">
                    <LogOut className="h-4 w-4" /> 
                    {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button className="rounded-xl font-black px-6 shadow-xl shadow-primary/20">
                  {language === 'ar' ? 'دخول' : 'Login'}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="fixed bottom-6 left-6 right-6 z-[9999] lg:hidden">
        <div className="flex h-16 items-center justify-around bg-background/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] border border-white/10 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 gap-1 h-12 rounded-2xl transition-all",
                  isActive ? "text-accent bg-accent/10" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                <span className="text-[8px] font-black uppercase tracking-tighter">
                  {language === 'ar' ? item.nameAr : item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
