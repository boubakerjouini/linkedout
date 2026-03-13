'use client';

import { useState, useRef } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { RoastCard } from '@/components/roast-card';
import { RoastSkeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Flame, AlertCircle, ClipboardPaste, Trash2 } from 'lucide-react';
import type { CringeLevel } from '@/components/ui/cringe-badge';

interface RoastResult {
  roast: string;
  cringe_level: CringeLevel;
  cringe_score: number;
}

const examplePosts = [
  `Excited to share that I just left my $500K/year job to pursue my passion of "connecting humans to their highest selves through synergistic mindfulness disruption." 

The corporate world wasn't ready for my vision. And honestly? That's their loss.

Grateful for the journey. The best is yet to come. 🚀

#Entrepreneurship #Passion #Hustle #Mindset #Blessed`,
  `I was rejected from 47 jobs before starting my company. 

Today we're doing $10M ARR.

The lesson? Never give up. Keep pushing. The universe rewards those who hustle.

But also — and I cannot stress this enough — hire a great team, be kind to people, and remember that success is a journey not a destination.

Thoughts?

#Startup #Entrepreneurship #Failure #Success`,
  `Just landed in Dubai for a MEETING. 

Quick 14-hour flight. Laptop open the whole time. Closed 3 deals at 35,000 feet.

Sleep is a social construct.

#Hustle #NeverStop #Dubai #Entrepreneurship #GrindNeverStops`,
];

export default function RoastPage() {
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoastResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRoast = async () => {
    if (!post.trim() || post.trim().length < 10) {
      setError('Please paste a real LinkedIn post (at least 10 characters).');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: post.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setResult(data);

      // Scroll to result
      setTimeout(() => {
        document.getElementById('roast-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (example: string) => {
    setPost(example);
    setResult(null);
    setError(null);
    textareaRef.current?.focus();
  };

  const handleClear = () => {
    setPost('');
    setResult(null);
    setError(null);
    textareaRef.current?.focus();
  };

  const handleRoastAgain = () => {
    handleRoast();
  };

  const charCount = post.length;
  const isOverLimit = charCount > 5000;

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#e8472a]" />
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase text-[#e8472a]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Roast Mode
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#1c1917] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Paste. Roast.{' '}
            <span className="text-[#e8472a]">Cringe.</span>
          </h1>
          <p className="text-[#44403c] text-lg">
            Drop any LinkedIn post below. Our AI will deliver a brutally honest 2-sentence roast and a Cringe Score.
          </p>
        </div>

        {/* Input Form */}
        <div
          className="border border-[#e8e4dc] border-l-4 border-l-[#e8472a] bg-[#fafaf7] mb-8"
          style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8e4dc] bg-[#f0ede7]">
            <span
              className="text-xs font-semibold tracking-wider uppercase text-[#44403c]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Input: LinkedIn Post
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigator.clipboard.readText().then(t => setPost(t))}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#44403c] hover:bg-[#e8e4dc] transition-colors border border-[#e8e4dc]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <ClipboardPaste size={12} />
                Paste
              </button>
              {post && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#78716c] hover:text-[#e8472a] hover:bg-[#f9ddd9] transition-colors border border-[#e8e4dc]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={post}
            onChange={(e) => {
              setPost(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Paste a LinkedIn post here…

Try something like: 'Excited to announce I just quit my 6-figure job to pursue my passion for disruptive synergy. The corporate world simply wasn't ready. 🚀 #Hustle'"
            aria-label="LinkedIn post to roast"
            className="w-full px-5 py-4 min-h-[220px] text-sm text-[#1c1917] bg-transparent focus:outline-none placeholder:text-[#78716c] resize-y"
            style={{ fontFamily: 'var(--font-body)', lineHeight: '1.7' }}
          />

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#e8e4dc]">
            <span
              className={`text-xs ${isOverLimit ? 'text-[#e8472a]' : 'text-[#78716c]'}`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {charCount.toLocaleString()} / 5,000 chars
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handleRoast}
              disabled={loading || !post.trim() || isOverLimit}
            >
              <Flame size={16} />
              {loading ? 'Roasting…' : 'Roast This Post'}
            </Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-[#f9ddd9] border border-[#e8472a] mb-6">
            <AlertCircle size={16} className="text-[#e8472a] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#e8472a] font-medium">{error}</p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && <RoastSkeleton />}

        {/* Result */}
        {result && !loading && (
          <div id="roast-result">
            <RoastCard
              roast={result.roast}
              cringe_level={result.cringe_level}
              cringe_score={result.cringe_score}
              originalPost={post}
              onRoastAgain={handleRoastAgain}
            />
          </div>
        )}

        {/* Example Posts */}
        {!result && !loading && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-[#e8e4dc]" />
              <span
                className="text-xs font-semibold tracking-wider uppercase text-[#78716c]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Try an Example
              </span>
              <div className="h-px flex-1 bg-[#e8e4dc]" />
            </div>
            <div className="space-y-3">
              {examplePosts.map((example, i) => (
                <button
                  key={i}
                  onClick={() => handleExample(example)}
                  className="w-full text-left p-4 bg-[#f0ede7] border border-[#e8e4dc] hover:border-[#e8472a] hover:bg-[#f9ddd9] transition-all duration-150 group"
                >
                  <p className="text-sm text-[#44403c] line-clamp-2 group-hover:text-[#1c1917]">
                    {example.split('\n')[0]}…
                  </p>
                  <span
                    className="text-xs text-[#e8472a] font-semibold mt-1 block"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    → Use this example
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
