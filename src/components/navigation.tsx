
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "المنهج", href: "/curriculum", icon: BookOpen },
  { name: "المكتبة", href: "/library", icon: Library },
  { name: "القواعد", href: "/rules", icon: ShieldCheck },
  { name: "التقييم", href: "/assessment", icon: ClipboardCheck },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden border-b border-white/5 bg-background/60 backdrop-blur-xl md:block">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110 group-hover:rotate-3">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 text-white"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 10 10M12 22a10 10 0 0 1-10-10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background" />
            </div>
            <span className="font-headline text-2xl font-bold tracking-tighter transition-colors">
              <span className="text-accent">DRIVING</span> FREE <span className="text-primary/80">ACADEME</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/5",
                  pathname === item.href 
                    ? "text-accent bg-accent/10" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-background/80 backdrop-blur-xl md:hidden px-4 pb-4 pt-2">
        <div className="flex h-16 items-center justify-between px-2 bg-card/50 rounded-2xl border border-white/5 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 gap-1 h-full rounded-xl transition-all duration-300",
                  isActive ? "text-accent bg-accent/5 scale-105" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5px]")} />
                <span className="text-[10px] font-bold">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
