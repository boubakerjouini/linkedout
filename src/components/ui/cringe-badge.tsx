'use client';

import { cn } from '@/lib/utils';

type CringeLevel = 'low' | 'medium' | 'high' | 'maximum';

const cringeConfig: Record<CringeLevel, {
  label: string;
  color: string;
  bg: string;
  border: string;
  rotate: string;
}> = {
  low: {
    label: 'LOW CRINGE',
    color: '#4caf74',
    bg: '#e0f5e9',
    border: '#4caf74',
    rotate: '-rotate-1',
  },
  medium: {
    label: 'MED CRINGE',
    color: '#f5c842',
    bg: '#fef8e3',
    border: '#f5c842',
    rotate: 'rotate-1',
  },
  high: {
    label: 'HIGH CRINGE',
    color: '#e8472a',
    bg: '#f9ddd9',
    border: '#e8472a',
    rotate: '-rotate-2',
  },
  maximum: {
    label: '⚠ MAXIMUM ⚠',
    color: '#1c1917',
    bg: '#1c1917',
    border: '#1c1917',
    rotate: 'rotate-2',
  },
};

interface CringeBadgeProps {
  level: CringeLevel;
  score?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CringeBadge({ level, score, className, size = 'md' }: CringeBadgeProps) {
  const config = cringeConfig[level];

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-3',
  };

  const scoreSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const isMaximum = level === 'maximum';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'cringe-stamp inline-flex items-center gap-2 transition-transform hover:scale-105',
          config.rotate,
          sizeClasses[size]
        )}
        style={{
          color: isMaximum ? '#fafaf7' : config.color,
          backgroundColor: config.bg,
          borderColor: config.border,
          borderWidth: '2px',
          borderStyle: 'dashed',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {isMaximum && <span className="animate-pulse">🔥</span>}
        {config.label}
        {isMaximum && <span className="animate-pulse">🔥</span>}
      </span>
      {score !== undefined && (
        <span
          className={cn(scoreSize[size], 'font-semibold tabular-nums')}
          style={{
            fontFamily: 'var(--font-mono)',
            color: config.color,
          }}
        >
          {score}/100
        </span>
      )}
    </div>
  );
}

export type { CringeLevel };
