'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SiteNav } from '@/components/navigation/site-nav';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="tiv-container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Tonmoy Infrastructure and Vision — Home"
        >
          <span className="flex h-8 w-8 items-center justify-center bg-brand font-display text-sm font-bold text-brand-foreground">
            T
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            Tonmoy Infrastructure and Vision
          </span>
          <span className="font-display text-sm font-semibold tracking-tight sm:hidden">
            TIV
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <SiteNav />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
