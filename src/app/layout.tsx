
import type {Metadata} from 'next';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { LanguageProvider } from '@/components/language-provider';
import Script from 'next/script';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Driving Free | أكاديمية القيادة الحرة',
  description: 'أكاديمية تعليم القيادة العلمية والعملية في دبي - منهج أكاديمي متطور وخبرة ميدانية واسعة',
};

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<any>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // Wait for params to comply with Next.js 15 standards
  await params;

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
        <Script 
          src="https://www.google.com/recaptcha/enterprise.js?render=6LentHosAAAAAPU47L-1tuSMFhiUQTlPguCQ15aS" 
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background overflow-x-hidden">
        <LanguageProvider>
          <FirebaseClientProvider>
            <Navigation />
            <main className="flex-1 pt-16 md:pt-20 pb-20 md:pb-0">
              {children}
            </main>
            <Toaster />
          </FirebaseClientProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
