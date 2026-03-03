import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { LanguageProvider } from '@/components/language-provider';
import Script from 'next/script';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Driving Free | Professional Driving Academy',
  description: 'Academic and practical driving education in Dubai - Advanced curriculum and field expertise.',
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
            <Toaster />
          </FirebaseClientProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
