'use client';

import { CringeBadge, type CringeLevel } from '@/components/ui/cringe-badge';
import { Button } from '@/components/ui/button';
import { Copy, Share2, RefreshCw, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RoastCardProps {
  roast: string;
  cringe_level: CringeLevel;
  cringe_score: number;
  originalPost?: string;
  onRoastAgain?: () => void;
}

export function RoastCard({ roast, cringe_level, cringe_score, originalPost, onRoastAgain }: RoastCardProps) {
  const [copied, setCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate bar from 0 → real score on mount
  useEffect(() => {
    setAnimatedScore(0);
    const t = setTimeout(() => setAnimatedScore(cringe_score), 80);
    return () => clearTimeout(t);
  }, [cringe_score]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'LinkedOut Roast',
        text: roast,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  const scoreWidth = `${animatedScore}%`;

  const scoreColor =
    cringe_level === 'low'
      ? '#4caf74'
      : cringe_level === 'medium'
      ? '#f5c842'
      : cringe_level === 'high'
      ? '#e8472a'
      : '#1c1917';

  return (
    <div
      className="border border-[#e8e4dc] border-l-4 border-l-[#e8472a] bg-[#fafaf7] transition-all duration-300"
      style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-6 pb-4">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.15em] uppercase text-[#e8472a] mb-1"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Roast Result
          </p>
          <h2
            className="text-2xl font-bold text-[#1c1917]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Verdict
          </h2>
        </div>
        <CringeBadge level={cringe_level} score={cringe_score} />
      </div>

      <div className="h-px bg-[#e8e4dc] mx-6" />

      {/* Roast Text */}
      <div className="p-6">
        <div className="flex gap-3">
          <Quote
            size={20}
            className="text-[#e8472a] flex-shrink-0 mt-0.5"
            style={{ transform: 'scaleX(-1)' }}
          />
          <p
            className="text-[#1c1917] text-lg leading-relaxed italic"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {roast}
          </p>
        </div>
      </div>

      {/* Cringe Score Bar */}
      <div className="mx-6 mb-6 bg-[#f0ede7] p-4 border border-[#e8e4dc]">
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-xs font-semibold tracking-wider uppercase text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Cringe Index
          </span>
          <span
            className="text-sm font-bold"
            style={{ fontFamily: 'var(--font-mono)', color: scoreColor }}
          >
            {cringe_score}/100
          </span>
        </div>
        <div className="h-2.5 bg-[#e8e4dc] w-full overflow-hidden">
          <div
            className="h-full transition-all duration-1000 ease-out"
            style={{
              width: scoreWidth,
              backgroundColor: scoreColor,
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span
            className="text-[10px] text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Authentic
          </span>
          <span
            className="text-[10px] text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Peak LinkedIn
          </span>
        </div>
      </div>

      {/* Original Post Preview */}
      {originalPost && (
        <div className="mx-6 mb-6 p-4 bg-[#f0ede7] border border-[#e8e4dc] border-l-2 border-l-[#e8e4dc]">
          <p
            className="text-xs font-semibold tracking-wider uppercase text-[#78716c] mb-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Original Post
          </p>
          <p className="text-sm text-[#44403c] leading-relaxed line-clamp-4">
            {originalPost}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 p-6 pt-0">
        <Button variant="primary" size="sm" onClick={handleCopy}>
          <Copy size={14} />
          {copied ? 'Copied!' : 'Copy Roast'}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 size={14} />
          Share
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
