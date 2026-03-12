'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Flame, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/roast', label: 'Roast Mode', icon: Flame, accent: 'coral' },
  { href: '/generate', label: 'Generate', icon: Zap, accent: 'citrus' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#e8e4dc] bg-[#fafaf7]/95 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 bg-[#1c1917] flex items-center justify-center transition-transform group-hover:rotate-3"
              style={{ boxShadow: '2px 2px 0px 0px #e8472a' }}
            >
              <span
                className="text-[#fafaf7] text-xs font-bold"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                LO
              </span>
            </div>
            <span
              className="text-xl font-bold text-[#1c1917]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Linked<span className="text-[#e8472a]">Out</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-all duration-150',
                    isActive
                      ? link.accent === 'coral'
                        ? 'bg-[#f9ddd9] text-[#e8472a] border border-[#e8472a]'
                        : link.accent === 'citrus'
                        ? 'bg-[#fef8e3] text-[#1c1917] border border-[#f5c842]'
                        : 'bg-[#f0ede7] text-[#1c1917] border border-[#e8e4dc]'
                      : 'text-[#44403c] hover:text-[#1c1917] hover:bg-[#f0ede7]'
                  )}
                >
                  {Icon && (
                    <Icon
                      size={14}
                      className={
                        isActive
                          ? link.accent === 'coral'
                            ? 'text-[#e8472a]'
                            : link.accent === 'citrus'
                            ? 'text-[#f5c842]'
                            : ''
                          : ''
                      }
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/roast"
              className="px-4 py-2 text-sm font-semibold bg-[#e8472a] text-[#fafaf7] border-2 border-[#1c1917] transition-all duration-150 hover:translate-x-[-1px] hover:translate-y-[-1px]"
              style={{ boxShadow: '3px 3px 0px 0px #1c1917' }}
            >
              Try Now →
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#1c1917]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#e8e4dc] bg-[#fafaf7]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-semibold border',
                    isActive
                      ? 'bg-[#f9ddd9] text-[#e8472a] border-[#e8472a]'
                      : 'text-[#44403c] border-[#e8e4dc] hover:bg-[#f0ede7]'
                  )}
                >
                  {Icon && <Icon size={16} />}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
