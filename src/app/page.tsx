import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Flame, Zap, TrendingUp, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "LinkedOut told me my post had 'maximum cringe.' Finally, an honest critic.",
    author: "Startup Founder",
    role: "Professional Thought Leader",
  },
  {
    quote: "I generated 5 posts and got 47,000 impressions. Thanks for nothing, value-adders.",
    author: "VP of Disruption",
    role: "Fortune 500 Visionary",
  },
  {
    quote: "The cringe score was 94/100. I framed it.",
    author: "Serial Entrepreneur",
    role: "8x Founder | Top Voice",
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Paste or Describe',
    description: 'Drop any LinkedIn post into the Roast input — or describe a topic for our Generator.',
    accent: '#e8472a',
  },
  {
    step: '02',
    title: 'AI Does Its Thing',
    description: 'Our brutally honest AI analyzes the content and either roasts it or generates satirical gold.',
    accent: '#f5c842',
  },
  {
    step: '03',
    title: 'Share the Results',
    description: 'Copy the roast, share the score, or post the generated content directly to LinkedIn.',
    accent: '#4caf74',
  },
];

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)' }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-4xl">
          {/* Section tag */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-[#e8472a]" />
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase text-[#e8472a]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              LinkedIn Post Tools
            </span>
          </div>

          {/* H1 */}
          <h1
            className="text-5xl md:text-7xl font-bold text-[#1c1917] leading-[1.05] mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            We Roast{' '}
            <span className="relative inline-block">
              <span className="relative z-10">LinkedIn Posts</span>
              <span
                className="absolute bottom-0 left-0 right-0 h-[5px] bg-[#e8472a]"
                style={{ bottom: '4px' }}
              />
            </span>
            <br />
            So You Don&apos;t Have To.
          </h1>

          {/* Lead */}
          <p className="text-xl text-[#44403c] leading-relaxed mb-10 max-w-2xl">
            Paste any LinkedIn post for a brutal AI roast — or generate your own peak LinkedIn content.{' '}
            <span className="text-[#78716c] italic">
              For educational purposes only.
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/roast"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-[#e8472a] text-[#fafaf7] border-2 border-[#1c1917] transition-all duration-150 hover:translate-x-[-3px] hover:translate-y-[-3px]"
              style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
            >
              <Flame size={18} />
              Roast a Post
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-[#f5c842] text-[#1c1917] border-2 border-[#1c1917] transition-all duration-150 hover:translate-x-[-3px] hover:translate-y-[-3px]"
              style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
            >
              <Zap size={18} />
              Generate Content
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="flex flex-wrap gap-0 border border-[#1c1917] bg-[#fafaf7]"
            style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
          >
            {[
              { value: '50K+', label: 'Posts Roasted' },
              { value: '94', label: 'Avg Cringe Score' },
              { value: '∞', label: 'Hustle Detected' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex-1 min-w-[120px] px-6 py-4 border-r border-[#e8e4dc] last:border-r-0"
              >
                <div
                  className="text-2xl font-bold text-[#e8472a]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs font-medium text-[#78716c] uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-[#f0ede7] border-y border-[#e8e4dc] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#1c1917]" />
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase text-[#44403c]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Features
            </span>
          </div>
          <h2
            className="text-4xl font-bold text-[#1c1917] mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Two Tools, One Purpose.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Roast Mode */}
            <div
              className="p-6 bg-[#fafaf7] border border-[#e8e4dc] border-l-4 border-l-[#e8472a] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
            >
              <div
                className="w-10 h-10 bg-[#f9ddd9] border border-[#e8472a] flex items-center justify-center mb-4"
              >
                <Flame size={18} className="text-[#e8472a]" />
              </div>
              <h3
                className="text-xl font-bold text-[#1c1917] mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Roast Mode
              </h3>
              <p
                className="text-xs font-bold tracking-widest uppercase text-[#e8472a] mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Paste. Roast. Share.
              </p>
              <p className="text-sm text-[#44403c] leading-relaxed">
                Feed any LinkedIn post to our AI. Get a brutally honest, two-sentence roast with a Cringe Score and level from LOW to MAXIMUM.
              </p>
            </div>

            {/* Generator Mode */}
            <div
              className="p-6 bg-[#fafaf7] border border-[#e8e4dc] border-l-4 border-l-[#f5c842] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
            >
              <div
                className="w-10 h-10 bg-[#fef8e3] border border-[#f5c842] flex items-center justify-center mb-4"
              >
                <Zap size={18} className="text-[#f5c842]" />
              </div>
              <h3
                className="text-xl font-bold text-[#1c1917] mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Generator Mode
              </h3>
              <p
                className="text-xs font-bold tracking-widest uppercase text-[#f5c842]"
                style={{ fontFamily: 'var(--font-mono)', marginBottom: '12px' }}
              >
                Describe. Generate. Post.
              </p>
              <p className="text-sm text-[#44403c] leading-relaxed">
                Describe any topic. Get 3 satirical LinkedIn posts in different modes: Hustle Gospel, Humble Brag, Failure Theater, and more.
              </p>
            </div>

            {/* Cringe Score */}
            <div
              className="p-6 bg-[#fafaf7] border border-[#e8e4dc] border-l-4 border-l-[#4caf74] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px]"
              style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
            >
              <div
                className="w-10 h-10 bg-[#e0f5e9] border border-[#4caf74] flex items-center justify-center mb-4"
              >
                <TrendingUp size={18} className="text-[#4caf74]" />
              </div>
              <h3
                className="text-xl font-bold text-[#1c1917] mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Cringe Score
              </h3>
              <p
                className="text-xs font-bold tracking-widest uppercase text-[#4caf74] mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Know Your Cringe Level
              </p>
              <p className="text-sm text-[#44403c] leading-relaxed">
                Every roast comes with a 0–100 Cringe Index and badge: LOW, MEDIUM, HIGH, or MAXIMUM. Wear your score proudly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-[#1c1917]" />
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase text-[#44403c]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            How It Works
          </span>
        </div>
        <h2
          className="text-4xl font-bold text-[#1c1917] mb-12"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Three Steps to Clarity.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {howItWorks.map((step) => (
            <div key={step.step} className="flex gap-4">
              <div
                className="text-4xl font-bold flex-shrink-0 leading-none"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: step.accent,
                }}
              >
                {step.step}
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-[#1c1917] mb-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#44403c] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-[#f0ede7] border-y border-[#e8e4dc] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#1c1917]" />
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase text-[#44403c]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Testimonials
            </span>
          </div>
          <h2
            className="text-4xl font-bold text-[#1c1917] mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What the Top Voices Say.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 bg-[#fafaf7] border border-[#e8e4dc]"
                style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
              >
                <Quote size={20} className="text-[#e8472a] mb-4" style={{ transform: 'scaleX(-1)' }} />
                <p
                  className="text-base italic text-[#1c1917] leading-relaxed mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-[#e8e4dc] pt-4">
                  <p className="text-sm font-bold text-[#1c1917]">{t.author}</p>
                  <p
                    className="text-xs text-[#78716c]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div
          className="p-12 bg-[#1c1917] text-[#fafaf7] relative overflow-hidden"
          style={{ boxShadow: '6px 6px 0px 0px #e8472a' }}
        >
          <div className="relative z-10 max-w-2xl">
            <span
              className="text-xs font-semibold tracking-[0.25em] uppercase text-[#e8472a] mb-4 block"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Ready to Start?
            </span>
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: '#fafaf7' }}
            >
              Your Post Won&apos;t Roast Itself.
            </h2>
            <p className="text-[#e8e4dc] mb-8 text-lg">
              Join thousands discovering their true Cringe Score. It&apos;s free, fast, and brutally accurate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/roast"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-[#e8472a] text-[#fafaf7] border-2 border-[#e8472a] transition-all duration-150 hover:bg-[#f5c842] hover:text-[#1c1917] hover:border-[#f5c842]"
              >
                <Flame size={18} />
                Start Roasting
              </Link>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold bg-transparent text-[#fafaf7] border-2 border-[#fafaf7] transition-all duration-150 hover:bg-[#fafaf7] hover:text-[#1c1917]"
              >
                <Zap size={18} />
                Generate Posts
              </Link>
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className="absolute top-6 right-8 text-7xl font-bold opacity-10"
            style={{ fontFamily: 'var(--font-display)', color: '#e8472a' }}
          >
            🔥
          </div>
          <div
            className="absolute bottom-6 right-24 text-5xl font-bold opacity-5"
            style={{ fontFamily: 'var(--font-mono)', color: '#f5c842' }}
          >
            MAX CRINGE
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#e8e4dc] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span
                className="text-xl font-bold text-[#1c1917]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Linked<span className="text-[#e8472a]">Out</span>
              </span>
              <p
                className="text-xs text-[#78716c] mt-1"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Satirical tools for a satirical platform.
              </p>
            </div>

            <div className="flex gap-6">
              <Link href="/roast" className="text-sm text-[#44403c] hover:text-[#e8472a] transition-colors">
                Roast Mode
              </Link>
              <Link href="/generate" className="text-sm text-[#44403c] hover:text-[#f5c842] transition-colors">
                Generate
              </Link>
            </div>

            <p
              className="text-xs text-[#78716c]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              © 2024 LinkedOut. For entertainment only.
              <br />
              Not affiliated with LinkedIn or Microsoft.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
