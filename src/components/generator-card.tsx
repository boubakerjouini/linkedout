'use client';

import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useState } from 'react';

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

const toxicLabels: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Mildly Cringey', color: '#4caf74', bg: '#e0f5e9' },
  2: { label: 'Somewhat Toxic', color: '#f5c842', bg: '#fef8e3' },
  3: { label: 'Very Toxic', color: '#e8472a', bg: '#f9ddd9' },
  4: { label: 'Extremely Toxic', color: '#c43d22', bg: '#f9ddd9' },
  5: { label: '⚡ ULTRA TOXIC', color: '#1c1917', bg: '#1c1917' },
};

export function GeneratorCard({ post, index }: GeneratorCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const toxic = toxicLabels[post.toxic_level] || toxicLabels[3];
  const hashtags = post.hashtags.split(' ').filter(h => h.startsWith('#'));

  const handleCopy = async () => {
    const fullPost = `${post.content}\n\n${post.hashtags}`;
    await navigator.clipboard.writeText(fullPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="border border-[#e8e4dc] border-l-4 border-l-[#f5c842] bg-[#fafaf7] transition-all duration-200 hover:translate-x-[-1px] hover:translate-y-[-1px]"
      style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold tracking-[0.12em] uppercase text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Post #{index + 1}
          </span>
          {post.mode && (
            <span
              className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[#f0ede7] text-[#44403c] border border-[#e8e4dc]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {post.mode}
            </span>
          )}
        </div>

        {/* Toxic Level */}
        <span
          className="px-3 py-1 text-[10px] font-bold tracking-[0.1em] uppercase border border-dashed"
          style={{
            fontFamily: 'var(--font-mono)',
            color: post.toxic_level === 5 ? '#fafaf7' : toxic.color,
            backgroundColor: toxic.bg,
            borderColor: toxic.color,
            transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
          }}
        >
          {toxic.label}
        </span>
      </div>

      {/* LinkedIn-style fake UI */}
      <div className="mx-5 mb-3 p-4 bg-[#f0ede7] border border-[#e8e4dc]">
        {/* Fake profile */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 bg-[#e8472a] flex items-center justify-center text-[#fafaf7] text-sm font-bold flex-shrink-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            T
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1c1917]">Thought Leader 🚀</p>
            <p
              className="text-[10px] text-[#78716c]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Founder | Visionary | Top Voice | 500+ connections
            </p>
          </div>
        </div>

        {/* Post content */}
        <p className="text-sm text-[#1c1917] leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hashtags.map((tag, i) => (
              <span
                key={i}
                className="text-xs text-[#e8472a] hover:underline cursor-pointer"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Fake engagement bar */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e8e4dc]">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              {['🔥', '💡', '👏'].map((emoji, i) => (
                <span
                  key={i}
                  className="w-5 h-5 rounded-full bg-[#fafaf7] border border-[#e8e4dc] flex items-center justify-center text-[10px]"
                >
                  {emoji}
                </span>
              ))}
            </div>
            <span
              className="text-[10px] text-[#78716c] ml-1"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {Math.floor(Math.random() * 9000 + 1000).toLocaleString()}
            </span>
          </div>
          <span
            className="text-[10px] text-[#78716c]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {Math.floor(Math.random() * 500 + 50)} comments
          </span>
        </div>
      </div>

      {/* Fake action bar */}
      <div className="mx-5 mb-4 flex gap-1">
        <button
          onClick={() => setLiked(!liked)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold border border-[#e8e4dc] hover:bg-[#f0ede7] transition-colors"
          style={{
            color: liked ? '#e8472a' : '#78716c',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <ThumbsUp size={12} />
          Like
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#78716c] border border-[#e8e4dc] hover:bg-[#f0ede7] transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <MessageSquare size={12} />
          Comment
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#78716c] border border-[#e8e4dc] hover:bg-[#f0ede7] transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Share2 size={12} />
          Share
        </button>
      </div>

      {/* Copy action */}
      <div className="px-5 pb-5">
        <Button variant="secondary" size="sm" className="w-full" onClick={handleCopy}>
          <Copy size={14} />
          {copied ? '✓ Copied to Clipboard' : 'Copy This Post'}
        </Button>
      </div>
    </div>
  );
}
