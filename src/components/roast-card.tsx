'use client';

import { CringeBadge, type CringeLevel } from '@/components/ui/cringe-badge';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Quote, Twitter, Linkedin, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RoastCardProps {
  roast: string;
  cringe_level: CringeLevel;
  cringe_score: number;
  originalPost?: string;
  onRoastAgain?: () => void;
}

const levelLabel: Record<CringeLevel, string> = {
  low: 'LOW 🟢',
  medium: 'MEDIUM 🟡',
  high: 'HIGH 🔴',
  maximum: 'MAXIMUM ☠️',
};

export function RoastCard({ roast, cringe_level, cringe_score, originalPost, onRoastAgain }: RoastCardProps) {
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    setAnimatedScore(0);
    const t = setTimeout(() => setAnimatedScore(cringe_score), 80);
    return () => clearTimeout(t);
  }, [cringe_score]);

  const scoreColor =
    cringe_level === 'low' ? '#4caf74'
    : cringe_level === 'medium' ? '#f5c842'
    : cringe_level === 'high' ? '#e8472a'
    : '#1c1917';

  const shareText = `Just got roasted by LinkedOut 🔥\n\n"${roast}"\n\nCringe Score: ${cringe_score}/100 — ${levelLabel[cringe_level]}\n\nTry yours 👇\nlinkedout-kappa.vercel.app/roast`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://linkedout-kappa.vercel.app/roast')}&summary=${encodeURIComponent(shareText)}`;

  const handleCopyRoast = async () => {
    await navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyShareText = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  return (
    <div
      className="border border-[#e8e4dc] border-l-4 border-l-[#e8472a] bg-[#fafaf7]"
      style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-6 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#e8472a] mb-1"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Roast Result
          </p>
          <h2 className="text-2xl font-bold text-[#1c1917]"
            style={{ fontFamily: 'var(--font-display)' }}>
            The Verdict
          </h2>
        </div>
        <CringeBadge level={cringe_level} score={cringe_score} />
      </div>

      <div className="h-px bg-[#e8e4dc] mx-6" />

      {/* Roast Text */}
      <div className="p-6">
        <div className="flex gap-3">
          <Quote size={20} className="text-[#e8472a] flex-shrink-0 mt-0.5" style={{ transform: 'scaleX(-1)' }} />
          <p className="text-[#1c1917] text-lg leading-relaxed italic"
            style={{ fontFamily: 'var(--font-display)' }}>
            {roast}
          </p>
        </div>
      </div>

      {/* Score Bar */}
      <div className="mx-6 mb-6 bg-[#f0ede7] p-4 border border-[#e8e4dc]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Cringe Index
          </span>
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

      {/* Original post preview */}
      {originalPost && (
        <div className="mx-6 mb-6 p-4 bg-[#f0ede7] border border-[#e8e4dc] border-l-2 border-l-[#e8e4dc]">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#78716c] mb-2"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Original Post
          </p>
          <p className="text-sm text-[#44403c] leading-relaxed line-clamp-4">{originalPost}</p>
        </div>
      )}

      {/* Share template preview */}
      <div className="mx-6 mb-6 p-4 bg-[#fef8e3] border border-[#f5c842]">
        <p className="text-xs font-semibold tracking-wider uppercase text-[#78716c] mb-2"
          style={{ fontFamily: 'var(--font-mono)' }}>
          📋 Ready-to-share template
        </p>
        <p className="text-sm text-[#1c1917] leading-relaxed whitespace-pre-line font-mono text-xs">
          {shareText}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 p-6 pt-0">
        {/* Copy roast */}
        <Button variant="primary" size="sm" onClick={handleCopyRoast}>
          <Copy size={14} />
          {copied ? 'Copied!' : 'Copy Roast'}
        </Button>

        {/* Share on Twitter/X */}
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm">
            <Twitter size={14} />
            Share on X
          </Button>
        </a>

        {/* Share on LinkedIn */}
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm">
            <Linkedin size={14} />
            Post on LinkedIn
          </Button>
        </a>

        {/* Copy full share text */}
        <Button variant="outline" size="sm" onClick={handleCopyShareText}>
          <Copy size={14} />
          Copy Share Text
        </Button>

        {onRoastAgain && (
          <Button variant="editorial" size="sm" onClick={onRoastAgain}>
            <RefreshCw size={14} />
            Roast Again
          </Button>
        )}
      </div>
    </div>
  );
}
