'use client';

import { CringeBadge, type CringeLevel } from '@/components/ui/cringe-badge';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Quote, Twitter, Linkedin, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RoastCardProps {
  roast: string;
  cringe_level: CringeLevel;
  cringe_score: number;
  originalPost?: string;
  onRoastAgain?: () => void;
}

const BASE_URL = 'https://linkedout-kappa.vercel.app';

const TEMPLATES = [
  { id: 1, label: 'Editorial Cream' },
  { id: 2, label: 'Dark Ink'        },
  { id: 3, label: 'Score Focus'     },
  { id: 4, label: 'Stamp Style'     },
];

export function RoastCard({ roast, cringe_level, cringe_score, originalPost, onRoastAgain }: RoastCardProps) {
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [activeTemplate, setActiveTemplate] = useState(1);

  useEffect(() => {
    setAnimatedScore(0);
    const t = setTimeout(() => setAnimatedScore(cringe_score), 80);
    return () => clearTimeout(t);
  }, [cringe_score]);

  const scoreColor =
    cringe_level === 'low'     ? '#4caf74'
    : cringe_level === 'medium'  ? '#f5c842'
    : cringe_level === 'high'    ? '#e8472a'
    : '#1c1917';

  const ogUrl = `${BASE_URL}/api/og?roast=${encodeURIComponent(roast)}&score=${cringe_score}&level=${cringe_level}&t=${activeTemplate}`;

  // Twitter: max ~260 chars
  const tweetText = `Got roasted by LinkedOut 🔥\n\n"${roast.slice(0, 160)}${roast.length > 160 ? '...' : ''}"\n\nScore: ${cringe_score}/100\n${BASE_URL}/roast`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  // LinkedIn share with og image
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(BASE_URL + '/roast')}`;

  const handleCopyRoast = async () => {
    await navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    const res = await fetch(ogUrl);
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `linkedout-roast-${cringe_level}.png`;
    a.click();
  };

  const prev = () => setActiveTemplate(t => t === 1 ? 4 : t - 1);
  const next = () => setActiveTemplate(t => t === 4 ? 1 : t + 1);

  return (
    <div className="border border-[#e8e4dc] border-l-4 border-l-[#e8472a] bg-[#fafaf7]"
      style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}>

      {/* Header */}
      <div className="flex items-start justify-between p-6 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#e8472a] mb-1"
            style={{ fontFamily: 'var(--font-mono)' }}>Roast Result</p>
          <h2 className="text-2xl font-bold text-[#1c1917]"
            style={{ fontFamily: 'var(--font-display)' }}>The Verdict</h2>
        </div>
        <CringeBadge level={cringe_level} score={cringe_score} />
      </div>

      <div className="h-px bg-[#e8e4dc] mx-6" />

      {/* Roast Text */}
      <div className="p-6">
        <div className="flex gap-3">
          <Quote size={20} className="text-[#e8472a] flex-shrink-0 mt-0.5" style={{ transform: 'scaleX(-1)' }} />
          <p className="text-[#1c1917] text-lg leading-relaxed italic"
            style={{ fontFamily: 'var(--font-display)' }}>{roast}</p>
        </div>
      </div>

      {/* Score Bar */}
      <div className="mx-6 mb-6 bg-[#f0ede7] p-4 border border-[#e8e4dc]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}>Cringe Index</span>
          <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-mono)', color: scoreColor }}>
            {cringe_score}/100
          </span>
        </div>
        <div className="h-2.5 bg-[#e8e4dc] w-full overflow-hidden">
          <div className="h-full transition-all duration-1000 ease-out"
            style={{ width: `${animatedScore}%`, backgroundColor: scoreColor }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#78716c]" style={{ fontFamily: 'var(--font-mono)' }}>Authentic</span>
          <span className="text-[10px] text-[#78716c]" style={{ fontFamily: 'var(--font-mono)' }}>Peak LinkedIn</span>
        </div>
      </div>

      {/* Share Image Preview */}
      <div className="mx-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Share Card — {TEMPLATES[activeTemplate - 1].label}
          </p>
          <div className="flex items-center gap-2">
            <button onClick={prev}
              className="p-1.5 border border-[#e8e4dc] hover:bg-[#f0ede7] transition-colors">
              <ChevronLeft size={14} className="text-[#78716c]" />
            </button>
            <span className="text-xs font-mono text-[#78716c]">{activeTemplate}/4</span>
            <button onClick={next}
              className="p-1.5 border border-[#e8e4dc] hover:bg-[#f0ede7] transition-colors">
              <ChevronRight size={14} className="text-[#78716c]" />
            </button>
          </div>
        </div>

        {/* Image preview */}
        <div className="relative border border-[#e8e4dc] overflow-hidden"
          style={{ boxShadow: '3px 3px 0px 0px #1c1917' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogUrl}
            alt="Share card preview"
            className="w-full h-auto block"
            style={{ aspectRatio: '1200/630' }}
          />
        </div>
      </div>

      {/* Share actions */}
      <div className="mx-6 mb-6 p-4 bg-[#f0ede7] border border-[#e8e4dc]">
        <p className="text-xs font-semibold tracking-wider uppercase text-[#78716c] mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}>Share your roast</p>
        <div className="flex flex-wrap gap-2">
          {/* Download image */}
          <Button variant="primary" size="sm" onClick={handleDownload}>
            <Download size={14} />
            Download Card
          </Button>

          {/* Twitter — text only (image attachment manual) */}
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              <Twitter size={14} />
              Post on X
            </Button>
          </a>

          {/* LinkedIn */}
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              <Linkedin size={14} />
              Post on LinkedIn
            </Button>
          </a>

          {/* Copy roast text */}
          <Button variant="outline" size="sm" onClick={handleCopyRoast}>
            <Copy size={14} />
            {copied ? 'Copied!' : 'Copy Text'}
          </Button>
        </div>
        <p className="text-[10px] text-[#78716c] mt-3" style={{ fontFamily: 'var(--font-mono)' }}>
          💡 Tip: Download the card image, then attach it manually when posting on X or LinkedIn for the best visual impact.
        </p>
      </div>

      {/* Original post + Roast Again */}
      {originalPost && (
        <div className="mx-6 mb-6 p-4 bg-[#f0ede7] border border-[#e8e4dc] border-l-2 border-l-[#e8e4dc]">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#78716c] mb-2"
            style={{ fontFamily: 'var(--font-mono)' }}>Original Post</p>
          <p className="text-sm text-[#44403c] leading-relaxed line-clamp-4">{originalPost}</p>
        </div>
      )}

      {onRoastAgain && (
        <div className="px-6 pb-6">
          <Button variant="editorial" size="sm" onClick={onRoastAgain}>
            <RefreshCw size={14} />
            Roast Again
          </Button>
        </div>
      )}
    </div>
  );
}
