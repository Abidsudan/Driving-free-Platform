'use client';

import { useLanguage } from "@/components/language-provider"

export default function Home() {
  const { language } = useLanguage()

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <h1 className="text-2xl font-headline font-bold text-muted-foreground">
        {language === 'ar' ? 'لا يظهر اي شئ هنا' : 'Nothing appears here'}
      </h1>
    </div>
  )
}
