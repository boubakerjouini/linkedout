import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const COLORS = {
  cream: '#fafaf7',
  putty: '#f0ede7',
  mist: '#e8e4dc',
  coral: '#e8472a',
  coralLight: '#f9ddd9',
  citrus: '#f5c842',
  citrusLight: '#fef8e3',
  sage: '#4caf74',
  sageLight: '#e0f5e9',
  ink: '#1c1917',
  inkSec: '#44403c',
  inkTert: '#78716c',
};

const LEVEL_CONFIG = {
  low:     { color: COLORS.sage,   bg: COLORS.sageLight,   label: 'LOW',     sublabel: 'Relatively Human'    },
  medium:  { color: COLORS.citrus, bg: COLORS.citrusLight, label: 'MEDIUM',  sublabel: 'Humble Bragger'      },
  high:    { color: COLORS.coral,  bg: COLORS.coralLight,  label: 'HIGH',    sublabel: 'Motivational Warrior' },
  maximum: { color: COLORS.ink,    bg: COLORS.mist,        label: 'MAXIMUM', sublabel: 'Galaxy Brain Energy'  },
};

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max - 3) + '...' : text;
}

// Template 1 — Editorial Cream (default)
function Template1({ roast, score, level }: { roast: string; score: number; level: string }) {
  const cfg = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.medium;
  const barWidth = `${score}%`;

  return (
    <div
      style={{
        width: 1200, height: 630,
        backgroundColor: COLORS.cream,
        display: 'flex', flexDirection: 'column',
        fontFamily: 'serif',
        position: 'relative',
        border: `6px solid ${COLORS.ink}`,
      }}
    >
      {/* Left coral accent bar */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 12, height: '100%', backgroundColor: COLORS.coral }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '36px 60px 28px 72px', borderBottom: `2px solid ${COLORS.mist}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 32, height: 3, backgroundColor: COLORS.coral }} />
          <span style={{ fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: COLORS.coral, fontWeight: 700 }}>
            LINKEDOUT — ROAST RESULT
          </span>
        </div>
        {/* Cringe badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '10px 18px', border: `2px dashed ${cfg.color}`,
          backgroundColor: cfg.bg, transform: 'rotate(-2deg)' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em',
            color: cfg.color, fontWeight: 700 }}>{cfg.label}</span>
          <span style={{ fontFamily: 'monospace', fontSize: 9, color: cfg.color, marginTop: 2 }}>
            {cfg.sublabel}
          </span>
        </div>
      </div>

      {/* Roast quote */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center',
        padding: '40px 72px 32px 72px' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 80, color: COLORS.coral, lineHeight: 1, marginTop: -8, fontFamily: 'serif' }}>"</span>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 32, lineHeight: 1.45,
            color: COLORS.ink, fontStyle: 'italic', margin: 0, flex: 1 }}>
            {truncate(roast, 180)}
          </p>
        </div>
      </div>

      {/* Score bar + footer */}
      <div style={{ padding: '24px 72px 36px', borderTop: `1px solid ${COLORS.mist}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: COLORS.inkTert }}>CRINGE INDEX</span>
          <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: cfg.color }}>
            {score}/100
          </span>
        </div>
        <div style={{ height: 8, backgroundColor: COLORS.mist, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%',
            width: barWidth, backgroundColor: cfg.color }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: COLORS.inkTert }}>Authentic</span>
          <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
            color: COLORS.inkTert, letterSpacing: '0.05em' }}>linkedout-kappa.vercel.app</span>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: COLORS.inkTert }}>Peak LinkedIn</span>
        </div>
      </div>
    </div>
  );
}

// Template 2 — Dark Ink Editorial
function Template2({ roast, score, level }: { roast: string; score: number; level: string }) {
  const cfg = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.medium;

  return (
    <div style={{ width: 1200, height: 630, backgroundColor: COLORS.ink,
      display: 'flex', flexDirection: 'column', fontFamily: 'serif', position: 'relative' }}>
      {/* Coral top bar */}
      <div style={{ height: 8, backgroundColor: COLORS.coral, width: '100%' }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '32px 60px 24px' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: COLORS.coral, fontWeight: 700 }}>
          LINKEDOUT — ROAST RESULT
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 32, fontWeight: 700, color: cfg.color }}>
            {score}
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: COLORS.inkTert }}>/100</span>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '6px 14px',
            border: `1.5px dashed ${cfg.color}`, marginLeft: 8 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.15em', color: cfg.color }}>{cfg.label}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: '#2d2926', margin: '0 60px' }} />

      {/* Quote */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '36px 60px' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 72, color: COLORS.coral, lineHeight: 1,
            marginTop: -10, fontFamily: 'serif' }}>"</span>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 30, lineHeight: 1.5,
            color: COLORS.cream, fontStyle: 'italic', margin: 0, flex: 1 }}>
            {truncate(roast, 200)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '20px 60px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#44403c', letterSpacing: '0.1em' }}>
          linkedout-kappa.vercel.app
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#44403c' }}>{cfg.sublabel}</span>
      </div>
    </div>
  );
}

// Template 3 — Score Focus (big number)
function Template3({ roast, score, level }: { roast: string; score: number; level: string }) {
  const cfg = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.medium;

  return (
    <div style={{ width: 1200, height: 630, backgroundColor: cfg.bg,
      display: 'flex', fontFamily: 'serif', position: 'relative',
      border: `6px solid ${COLORS.ink}` }}>
      {/* Left half — Big score */}
      <div style={{ width: 420, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: cfg.color === COLORS.citrus ? COLORS.ink : cfg.color,
        padding: '40px 32px', position: 'relative' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
          CRINGE SCORE
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: 110, fontWeight: 900,
          color: '#fff', lineHeight: 1 }}>{score}</span>
        <span style={{ fontFamily: 'monospace', fontSize: 18, color: 'rgba(255,255,255,0.6)',
          marginTop: 4 }}>/100</span>
        <div style={{ marginTop: 24, padding: '10px 20px',
          border: '2px dashed rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.15em',
            fontWeight: 700, color: '#fff' }}>{cfg.label}</span>
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>
            {cfg.sublabel}
          </span>
        </div>
      </div>

      {/* Right half — Roast */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
        padding: '48px 52px', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: COLORS.coral, fontWeight: 700 }}>
          LINKEDOUT VERDICT
        </span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flex: 1,
          paddingTop: 24, paddingBottom: 24 }}>
          <span style={{ fontSize: 60, color: COLORS.coral, lineHeight: 1, marginTop: -6, fontFamily: 'serif' }}>"</span>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 26, lineHeight: 1.55,
            color: COLORS.ink, fontStyle: 'italic', margin: 0 }}>
            {truncate(roast, 160)}
          </p>
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: COLORS.inkTert }}>
          linkedout-kappa.vercel.app
        </span>
      </div>
    </div>
  );
}

// Template 4 — Stamp / Rubber stamp style
function Template4({ roast, score, level }: { roast: string; score: number; level: string }) {
  const cfg = LEVEL_CONFIG[level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG.medium;

  return (
    <div style={{ width: 1200, height: 630, backgroundColor: COLORS.cream,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', fontFamily: 'serif', padding: '0 80px',
      position: 'relative' }}>
      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 24, left: 24, width: 40, height: 40,
        borderTop: `3px solid ${COLORS.mist}`, borderLeft: `3px solid ${COLORS.mist}` }} />
      <div style={{ position: 'absolute', top: 24, right: 24, width: 40, height: 40,
        borderTop: `3px solid ${COLORS.mist}`, borderRight: `3px solid ${COLORS.mist}` }} />
      <div style={{ position: 'absolute', bottom: 24, left: 24, width: 40, height: 40,
        borderBottom: `3px solid ${COLORS.mist}`, borderLeft: `3px solid ${COLORS.mist}` }} />
      <div style={{ position: 'absolute', bottom: 24, right: 24, width: 40, height: 40,
        borderBottom: `3px solid ${COLORS.mist}`, borderRight: `3px solid ${COLORS.mist}` }} />

      {/* Big rotated stamp */}
      <div style={{ position: 'absolute', top: 48, right: 60, transform: 'rotate(12deg)',
        padding: '16px 28px', border: `4px solid ${cfg.color}`,
        backgroundColor: cfg.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.9 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 900,
          letterSpacing: '0.15em', color: cfg.color }}>{cfg.label}</span>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: cfg.color, marginTop: 2 }}>
          {score}/100
        </span>
      </div>

      {/* LINKEDOUT header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, width: '100%' }}>
        <div style={{ flex: 1, height: 2, backgroundColor: COLORS.mist }} />
        <span style={{ fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: COLORS.coral, fontWeight: 700 }}>
          LINKEDOUT
        </span>
        <div style={{ flex: 1, height: 2, backgroundColor: COLORS.mist }} />
      </div>

      {/* Quote */}
      <p style={{ fontFamily: 'Georgia, serif', fontSize: 34, lineHeight: 1.5,
        color: COLORS.ink, fontStyle: 'italic', textAlign: 'center', margin: 0, maxWidth: 900 }}>
        "{truncate(roast, 160)}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, width: '100%' }}>
        <div style={{ flex: 1, height: 2, backgroundColor: COLORS.mist }} />
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: COLORS.inkTert }}>
          linkedout-kappa.vercel.app
        </span>
        <div style={{ flex: 1, height: 2, backgroundColor: COLORS.mist }} />
      </div>
    </div>
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roast = searchParams.get('roast') || 'Your LinkedIn post is peak cringe.';
  const score = Math.max(0, Math.min(100, parseInt(searchParams.get('score') || '50')));
  const level = searchParams.get('level') || 'medium';
  const t = parseInt(searchParams.get('t') || '1');

  const props = { roast, score, level };

  const element =
    t === 2 ? <Template2 {...props} /> :
    t === 3 ? <Template3 {...props} /> :
    t === 4 ? <Template4 {...props} /> :
              <Template1 {...props} />;

  return new ImageResponse(element, {
    width: 1200,
    height: 630,
  });
}
