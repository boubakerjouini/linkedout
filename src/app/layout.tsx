import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://linkedout-kappa.vercel.app';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  style: ['normal', 'italic'],
  variable: '--nf-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--nf-body',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--nf-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LinkedOut — Roast & Satirize LinkedIn Posts',
  description: 'The AI-powered tool that roasts LinkedIn posts with brutal honesty and generates peak LinkedIn content. For educational purposes only.',
  keywords: ['linkedin', 'roast', 'satire', 'ai', 'post generator', 'cringe'],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'LinkedOut — Roast & Satirize LinkedIn Posts',
    description: 'Paste any LinkedIn post for a brutal AI roast — or generate your own peak LinkedIn content.',
    type: 'website',
    url: BASE_URL,
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'LinkedOut — Roast LinkedIn Posts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedOut — Roast & Satirize LinkedIn Posts',
    description: 'Paste any LinkedIn post for a brutal AI roast — or generate your own peak LinkedIn content.',
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
