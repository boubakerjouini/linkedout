'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { GeneratorCard } from '@/components/generator-card';
import { GeneratorSkeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Zap, AlertCircle, RefreshCw } from 'lucide-react';

interface GeneratedPost {
  content: string;
  hashtags: string;
  toxic_level: number;
  mode: string;
}

const topicSuggestions = [
  'Waking up at 4am to meditate',
  'Getting rejected from Harvard',
  'Hiring my first employee',
  'A failure that changed my life',
  'Why I deleted LinkedIn (posted on LinkedIn)',
  'Selling my startup for $0',
  'My morning routine',
  'Cold DMing 100 people',
];

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [postCount, setPostCount] = useState(3);

  const handleGenerate = async () => {
    if (!prompt.trim() || prompt.trim().length < 5) {
      setError('Please enter a topic or description (at least 5 characters).');
      return;
    }

    setLoading(true);
    setPosts([]);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim(), count: postCount }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setPosts(data.posts || []);

      setTimeout(() => {
        document.getElementById('generated-posts')?.scrollIntoView({
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

  const handleSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
    setPosts([]);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#f5c842]" />
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase text-[#1c1917]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Generator Mode
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#1c1917] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Describe.{' '}
            <span style={{ color: '#f5c842', WebkitTextStroke: '1px #1c1917' }}>
              Generate.
            </span>{' '}
            Post.
          </h1>
          <p className="text-[#44403c] text-lg">
            Enter any topic. Get 3 satirical LinkedIn posts in different cringe modes — ready to copy and deploy.
          </p>
        </div>

        {/* Input Form */}
        <div
          className="border border-[#e8e4dc] border-l-4 border-l-[#f5c842] bg-[#fafaf7] mb-8"
          style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8e4dc] bg-[#f0ede7]">
            <span
              className="text-xs font-semibold tracking-wider uppercase text-[#44403c]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Topic / Description
            </span>
            <div className="flex items-center gap-3">
              <span
                className="text-xs text-[#78716c]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Posts:
              </span>
              {[1, 3, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setPostCount(n)}
                  className="px-2.5 py-1 text-xs font-bold border transition-all"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: postCount === n ? '#f5c842' : 'transparent',
                    borderColor: postCount === n ? '#1c1917' : '#e8e4dc',
                    color: '#1c1917',
                    boxShadow: postCount === n ? '2px 2px 0px 0px #1c1917' : 'none',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-5 py-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 'Getting fired from my first startup' or 'Waking up at 4am every day'"
              className="w-full text-base text-[#1c1917] bg-transparent focus:outline-none placeholder:text-[#78716c] border-none"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#e8e4dc]">
            <span
              className="text-xs text-[#78716c]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ⌘+Enter to generate
            </span>
            <Button
              variant="secondary"
              size="md"
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
            >
              <Zap size={16} />
              {loading ? 'Generating…' : `Generate ${postCount} Post${postCount > 1 ? 's' : ''}`}
            </Button>
          </div>
        </div>

        {/* Topic Suggestions */}
        {posts.length === 0 && !loading && (
          <div className="mb-10">
            <p
              className="text-xs font-semibold tracking-wider uppercase text-[#78716c] mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Topic Suggestions
            </p>
            <div className="flex flex-wrap gap-2">
              {topicSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestion(suggestion)}
                  className="px-3 py-1.5 text-sm text-[#44403c] border border-[#e8e4dc] bg-[#f0ede7] hover:border-[#f5c842] hover:bg-[#fef8e3] transition-all duration-150"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-[#f9ddd9] border border-[#e8472a] mb-6">
            <AlertCircle size={16} className="text-[#e8472a] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#e8472a] font-medium">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && <GeneratorSkeleton />}

        {/* Results */}
        {posts.length > 0 && !loading && (
          <div id="generated-posts">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  className="text-2xl font-bold text-[#1c1917]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Generated Posts
                </h2>
                <p
                  className="text-xs text-[#78716c] mt-0.5"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Topic: &ldquo;{prompt}&rdquo;
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGenerate}
                disabled={loading}
              >
                <RefreshCw size={14} />
                Regenerate
              </Button>
            </div>

            <div className="space-y-5">
              {posts.map((post, i) => (
                <GeneratorCard key={i} post={post} index={i} />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-[#f0ede7] border border-[#e8e4dc]">
              <p
                className="text-xs text-[#78716c] text-center"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                ⚠ Satire. For entertainment only. Please use responsibly.
                <br />
                LinkedOut is not responsible for any career damage from actually posting these.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
