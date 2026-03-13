import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://linkedout-kappa.vercel.app';

export const metadata: Metadata = {
  title: 'Roast Mode — LinkedOut',
  description: 'Paste any LinkedIn post and get a brutally honest AI roast with a cringe score. How LinkedIn are you really?',
  openGraph: {
    title: 'Roast Mode — LinkedOut',
    description: 'Paste any LinkedIn post and get a brutally honest AI roast with a cringe score.',
    url: `${BASE_URL}/roast`,
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roast Mode — LinkedOut',
    description: 'Paste any LinkedIn post and get a brutally honest AI roast with a cringe score.',
    images: ['/api/og'],
  },
};

export default function RoastLayout({ children }: { children: React.ReactNode }) {
  return children;
}
