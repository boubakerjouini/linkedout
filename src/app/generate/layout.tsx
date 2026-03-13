import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://linkedout-kappa.vercel.app';

export const metadata: Metadata = {
  title: 'Generate — LinkedOut',
  description: 'Generate peak LinkedIn content with AI. Choose your toxicity level — from Humble Brag to Hustle Gospel.',
  openGraph: {
    title: 'Generate — LinkedOut',
    description: 'Generate peak LinkedIn content with AI. Choose your toxicity level.',
    url: `${BASE_URL}/generate`,
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generate — LinkedOut',
    description: 'Generate peak LinkedIn content with AI. Choose your toxicity level.',
    images: ['/api/og'],
  },
};

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
