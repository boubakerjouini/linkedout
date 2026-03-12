'use client';

import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-none bg-[#e8e4dc]',
        className
      )}
      {...props}
    />
  );
}

export function RoastSkeleton() {
  return (
    <div
      className="p-6 border border-[#e8e4dc] border-l-4 border-l-[#e8472a] bg-[#fafaf7]"
      style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-7 w-48" />
        </div>
        <Skeleton className="h-8 w-28" />
      </div>

      {/* Divider */}
      <div className="border-t border-[#e8e4dc] mb-6" />

      {/* Roast text lines */}
      <div className="space-y-3 mb-6">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-[92%]" />
        <Skeleton className="h-5 w-[85%]" />
        <Skeleton className="h-5 w-[78%]" />
      </div>

      {/* Score bar */}
      <div className="bg-[#f0ede7] p-4 mb-4">
        <div className="flex justify-between mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="h-3 bg-[#e8e4dc] w-full">
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}

export function GeneratorSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 border border-[#e8e4dc] border-l-4 border-l-[#f5c842] bg-[#fafaf7]"
          style={{ boxShadow: '4px 4px 0px 0px #1c1917' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} className="h-5 w-5 rounded-full" />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[94%]" />
            <Skeleton className="h-4 w-[88%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>

          {/* Hashtags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { Skeleton };
