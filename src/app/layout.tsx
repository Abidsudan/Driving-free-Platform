
import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { LanguageProvider } from '@/components/language-provider';
import Script from 'next/script';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Driving Free | الأكاديمية الرقمية للقيادة في دبي',
  description: 'أول أكاديمية رقمية متخصصة في تعليم القيادة بأسلوب علمي حديث وفق معايير RTA دبي. منهج متكامل، مكتبة علمية، ومحاكي اختبار ذكي.',
  metadataBase: new URL('https://drivingfree.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Driving Free | Professional Driving Academy',
    description: 'Engineering Professional Drivers through Science. Accredited Digital Academy per RTA Standards.',
    url: 'https://drivingfree.online',
    siteName: 'Driving Free',
    images: [
      {
        url: 'https://i.ibb.co/Y7x5sZwJ/1000124780-Photo-Grid.png',
        width: 1200,
        height: 630,
        alt: 'Driving Free Academe Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driving Free Academe',
    description: 'The #1 platform in Dubai for academic driving education.',
    images: ['https://i.ibb.co/Y7x5sZwJ/1000124780-Photo-Grid.png'],
  },
};

export default async function RootLayout(props: {
  children: ReactNode;
}) {
  const { children } = props;
  
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <Script 
          src="https://www.google.com/recaptcha/enterprise.js?render=6LentHosAAAAAPU47L-1tuSMFhiUQTlPguCQ15aS" 
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background overflow-x-hidden">
        <LanguageProvider>
          <FirebaseClientProvider>
            <Navigation />
            <main className="flex-1 pt-16 md:pt-20">
              {children}
            </main>
            <Footer />
            <Toaster />
          </FirebaseClientProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
