import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { LanguageProvider } from '@/components/language-provider';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Cairo, Inter, Space_Grotesk } from 'next/font/google';

const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'Driving Free | Professional Driving Academy',
  description: 'Academic and practical driving education in Dubai - Advanced curriculum and field expertise.',
  openGraph: {
    title: 'Driving Free | Professional Driving Academy',
    description: 'Academic and practical driving education in Dubai - Advanced curriculum and field expertise.',
    url: 'https://drivingfree.online',
    siteName: 'Driving Free',
    images: [
      {
        url: 'https://drivingfree.online/logo.png',
        width: 1200,
        height: 630,
        alt: 'Driving Free Academy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driving Free | Professional Driving Academy',
    description: 'Academic and practical driving education in Dubai - Advanced curriculum and field expertise.',
    images: ['https://drivingfree.online/logo.png'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${cairo.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
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
