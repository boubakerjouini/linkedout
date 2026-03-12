'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const surfaceVariants = cva(
  'relative transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-[#fafaf7] border border-[#e8e4dc]',
        putty: 'bg-[#f0ede7] border border-[#e8e4dc]',
        roast: 'bg-[#fafaf7] border border-[#e8e4dc] border-l-4 border-l-[#e8472a]',
        generator: 'bg-[#fafaf7] border border-[#e8e4dc] border-l-4 border-l-[#f5c842]',
        sage: 'bg-[#fafaf7] border border-[#e8e4dc] border-l-4 border-l-[#4caf74]',
        coral: 'bg-[#f9ddd9] border border-[#e8472a]/20',
        citrus: 'bg-[#fef8e3] border border-[#f5c842]/40',
        ink: 'bg-[#1c1917] text-[#fafaf7] border border-[#1c1917]',
      },
      shadow: {
        none: '',
        sm: '[box-shadow:2px_2px_0px_0px_#1c1917]',
        md: '[box-shadow:4px_4px_0px_0px_#1c1917]',
        lg: '[box-shadow:6px_6px_0px_0px_#1c1917]',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      shadow: 'md',
      rounded: 'none',
      padding: 'md',
    },
  }
);

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {}

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant, shadow, rounded, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(surfaceVariants({ variant, shadow, rounded, padding, className }))}
        {...props}
      />
    );
  }
);

Surface.displayName = 'Surface';

export { Surface, surfaceVariants };
