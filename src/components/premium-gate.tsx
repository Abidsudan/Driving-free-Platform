
"use client"

import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PremiumGateProps {
  children: React.ReactNode
  isLocked?: boolean
  title?: string
}

export function PremiumGate({ children, isLocked = true, title = "محتوى حصري للمشتركين" }: PremiumGateProps) {
  if (!isLocked) return <>{children}</>

  return (
    <div className="relative overflow-hidden rounded-xl border border-accent/20">
      <div className="select-none blur-sm grayscale pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 p-6 text-center backdrop-blur-[2px]">
        <div className="mb-4 rounded-full bg-accent/20 p-4 ring-2 ring-accent">
          <Lock className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mb-2 font-headline text-xl font-bold text-accent">{title}</h3>
        <p className="mb-6 max-w-[280px] text-sm text-muted-foreground">
          استكشف المنهج الأكاديمي الكامل واحصل على نصائح الخبراء لاجتياز اختبار RTA من المرة الأولى.
        </p>
        <Button variant="default" className="bg-primary hover:bg-primary/90 px-8">
          اشترك الآن للوصول الكامل
        </Button>
      </div>
    </div>
  )
}
