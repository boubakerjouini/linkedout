'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
  {
    variants: {
      variant: {
        primary: [
          'bg-[#e8472a] text-[#fafaf7] border-2 border-[#1c1917]',
          '[box-shadow:4px_4px_0px_0px_#1c1917]',
          'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:6px_6px_0px_0px_#1c1917]',
          'active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:2px_2px_0px_0px_#1c1917]',
        ],
        secondary: [
          'bg-[#f5c842] text-[#1c1917] border-2 border-[#1c1917]',
          '[box-shadow:4px_4px_0px_0px_#1c1917]',
          'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:6px_6px_0px_0px_#1c1917]',
          'active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:2px_2px_0px_0px_#1c1917]',
        ],
        editorial: [
          'bg-[#1c1917] text-[#fafaf7] border-2 border-[#1c1917]',
          '[box-shadow:4px_4px_0px_0px_#44403c]',
          'hover:bg-[#e8472a] hover:[box-shadow:4px_4px_0px_0px_#1c1917]',
          'active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:2px_2px_0px_0px_#1c1917]',
        ],
        ghost: [
          'bg-transparent text-[#1c1917] border-2 border-[#e8e4dc]',
          'hover:bg-[#f0ede7] hover:border-[#1c1917]',
          'active:bg-[#e8e4dc]',
        ],
        sage: [
          'bg-[#4caf74] text-[#fafaf7] border-2 border-[#1c1917]',
          '[box-shadow:4px_4px_0px_0px_#1c1917]',
          'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:[box-shadow:6px_6px_0px_0px_#1c1917]',
          'active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:2px_2px_0px_0px_#1c1917]',
        ],
        outline: [
          'bg-transparent text-[#e8472a] border-2 border-[#e8472a]',
          '[box-shadow:4px_4px_0px_0px_#e8472a]',
          'hover:bg-[#f9ddd9]',
          'active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:2px_2px_0px_0px_#e8472a]',
        ],
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
