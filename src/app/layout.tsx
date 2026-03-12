import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LinkedOut — Roast & Satirize LinkedIn Posts',
  description: 'The AI-powered tool that roasts LinkedIn posts with brutal honesty and generates peak LinkedIn content. For educational purposes only.',
  keywords: ['linkedin', 'roast', 'satire', 'ai', 'post generator', 'cringe'],
  openGraph: {
    title: 'LinkedOut — Roast & Satirize LinkedIn Posts',
    description: 'Paste any LinkedIn post for a brutal AI roast — or generate your own peak LinkedIn content.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
