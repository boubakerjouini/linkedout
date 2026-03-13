'use client';

import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, MessageSquare, Share2, Twitter, Linkedin } from 'lucide-react';
import { useState, useMemo } from 'react';

interface GeneratedPost {
  content: string;
  hashtags: string;
  toxic_level: number;
  mode: string;
}

interface GeneratorCardProps {
  post: GeneratedPost;
  index: number;
}

const toxicLabels: Record<number, { label: string; color: string; bg: string; border: string }> = {
  1: { label: '1/5 — Mildly Cringey',   color: '#4caf74', bg: '#e0f5e9', border: '#4caf74' },
  2: { label: '2/5 — Somewhat Toxic',   color: '#f5c842', bg: '#fef8e3', border: '#f5c842' },
  3: { label: '3/5 — Very Toxic',       color: '#e8472a', bg: '#f9ddd9', border: '#e8472a' },
  4: { label: '4/5 — Extremely Toxic',  color: '#c43d22', bg: '#f9ddd9', border: '#c43d22' },
  5: { label: '5/5 — ULTRA TOXIC ⚡',   color: '#fafaf7', bg: '#1c1917', border: '#1c1917' },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://linkedout-kappa.vercel.app';

export function GeneratorCard({ post, index }: GeneratorCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const toxic = toxicLabels[post.toxic_level] || toxicLabels[3];
  const hashtags = post.hashtags.split(' ').filter((h: string) => h.startsWith('#'));

  const fullPost = `${post.content}\n\n${post.hashtags}`;

  const engagement = useMemo(() => ({
    likes: (Math.floor(Math.random() * 9000 + 500)).toLocaleString(),
    comments: Math.floor(Math.random() * 500 + 20),
  }), []);

  const shareText = `Look what LinkedOut generated for me 😂\n\n"${post.content.slice(0, 200)}..."\n\nGenerate your own toxic LinkedIn post 👇\n${BASE_URL}/generate`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${BASE_URL}/generate`)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="border border-[#e8e4dc] border-l-4 border-l-[#f5c842] bg-[#fafaf7]"
      style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Post #{index + 1}
          </span>
          {post.mode && (
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[#f0ede7] text-[#44403c] border border-[#e8e4dc]"
              style={{ fontFamily: 'var(--font-mono)' }}>
              {post.mode}
            </span>
          )}
        </div>
        {/* Toxic level badge */}
        <span
          className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase border"
          style={{
            fontFamily: 'var(--font-mono)',
            color: toxic.color,
            backgroundColor: toxic.bg,
            borderColor: toxic.border,
          }}
        >
          {toxic.label}
        </span>
      </div>

      <div className="h-px bg-[#e8e4dc] mx-5" />

      {/* Fake LinkedIn post UI */}
      <div className="mx-5 my-4 border border-[#e8e4dc] bg-white">
        {/* Fake profile header */}
        <div className="flex items-center gap-3 p-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-[#e8e4dc] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#78716c]" style={{ fontFamily: 'var(--font-mono)' }}>YOU</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1c1917]">Your Name</p>
            <p className="text-xs text-[#78716c]">LinkedIn Thought Leader • 1st</p>
          </div>
        </div>

        {/* Post content */}
        <div className="px-4 pb-3">
          <p className="text-sm text-[#1c1917] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
          {hashtags.length > 0 && (
            <p className="mt-2 text-sm" style={{ color: '#0a66c2' }}>
              {hashtags.join(' ')}
            </p>
          )}
        </div>

        {/* Fake engagement */}
        <div className="px-4 py-2 border-t border-[#e8e4dc] flex items-center justify-between">
          <span className="text-[10px] text-[#78716c]" style={{ fontFamily: 'var(--font-mono)' }}>
            👍❤️🔥 {engagement.likes}
          </span>
          <span className="text-[10px] text-[#78716c]" style={{ fontFamily: 'var(--font-mono)' }}>
            {engagement.comments} comments
          </span>
        </div>

        {/* Fake action bar */}
        <div className="flex border-t border-[#e8e4dc]">
          {[
            { icon: <ThumbsUp size={12} />, label: 'Like', action: () => setLiked(!liked), active: liked },
            { icon: <MessageSquare size={12} />, label: 'Comment', action: () => {}, active: false },
            { icon: <Share2 size={12} />, label: 'Share', action: () => {}, active: false },
          ].map((btn) => (
            <button key={btn.label}
              onClick={btn.action}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold hover:bg-[#f0ede7] transition-colors"
              style={{ color: btn.active ? '#e8472a' : '#78716c', fontFamily: 'var(--font-mono)' }}>
              {btn.icon}{btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={handleCopy} className="flex-1">
          <Copy size={14} />
          {copied ? '✓ Copied!' : 'Copy Post'}
        </Button>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm">
            <Twitter size={14} />
            Share on X
          </Button>
        </a>
        <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm">
            <Linkedin size={14} />
            Post on LinkedIn
          </Button>
        </a>
      </div>
    </div>
  );
}
