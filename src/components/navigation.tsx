
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Library, ShieldCheck, ClipboardCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "المنهج الأكاديمي", href: "/curriculum", icon: BookOpen },
  { name: "المكتبة العلمية", href: "/library", icon: Library },
  { name: "القواعد والإشارات", href: "/rules", icon: ShieldCheck },
  { name: "التقييم المعرفي", href: "/assessment", icon: ClipboardCheck },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden border-b bg-background/80 backdrop-blur-md md:block">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-headline text-2xl font-bold tracking-tight text-accent">
              DRIVING FREE <span className="text-primary">ACADEME</span>
            </span>
          </Link>
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent underline underline-offset-8 decoration-2" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md md:hidden">
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  isActive ? "text-accent" : "text-muted-foreground"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
