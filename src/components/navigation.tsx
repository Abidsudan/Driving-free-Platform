
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
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-headline text-2xl font-bold tracking-tighter transition-colors group-hover:text-primary">
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
