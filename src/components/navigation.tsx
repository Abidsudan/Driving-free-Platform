
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck, CarFront } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const navItems = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "المنهج", href: "/curriculum", icon: BookOpen },
  { name: "المكتبة", href: "/library", icon: Library },
  { name: "القواعد", href: "/rules", icon: ShieldCheck },
  { name: "التقييم", href: "/assessment", icon: ClipboardCheck },
]

export function Navigation() {
  const pathname = usePathname()
  const logo = PlaceHolderImages.find(img => img.id === "site-logo")

  return (
    <>
      {/* Desktop Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-[100] hidden border-b border-white/5 bg-background/40 backdrop-blur-2xl md:block">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-16 h-16 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center bg-primary/10 rounded-2xl overflow-hidden">
              {logo?.imageUrl ? (
                <Image 
                  src={logo.imageUrl} 
                  alt="Driving Free Logo" 
                  fill 
                  className="object-contain p-1"
                  priority
                  unoptimized // Added because external links might need direct bypass
                />
              ) : (
                <CarFront className="h-8 w-8 text-primary" />
              )}
            </div>
            <span className="font-headline text-2xl font-black tracking-tighter">
              <span className="text-accent">DRIVING</span> FREE <span className="text-primary/80">ACADEME</span>
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-300",
                  pathname === item.href 
                    ? "text-accent bg-accent/10 border border-accent/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-6 left-6 right-6 z-[100] md:hidden">
        <div className="flex h-20 items-center justify-between px-4 bg-background/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 gap-1.5 h-full rounded-2xl transition-all duration-300",
                  isActive ? "text-accent bg-accent/10 scale-105" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
                <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
