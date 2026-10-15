'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; meta?: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Work',
    href: '/work',
    children: [
      { label: 'All Projects', href: '/projects', meta: '01' },
      { label: 'Products', href: '/products' },
      { label: 'OpenMail', href: '/projects/openmail' },
      { label: 'Mercura', href: '/projects/mercura' },
      { label: 'M31A', href: '/projects/m31a' },
      { label: 'Octate', href: '/projects/octate' },
      { label: 'Runstead (Venture)', href: '/projects/runstead', meta: 'Venture' },
      { label: 'Releases', href: '/releases' },
    ],
  },
  {
    label: 'Infrastructure',
    href: '/infrastructure',
    children: [
      { label: 'Solutions Hub', href: '/solutions', meta: '01' },
      { label: 'Infrastructure Overview', href: '/infrastructure', meta: '02' },
      { label: 'Data Centers', href: '/infrastructure/data-centers' },
      { label: 'Logistics Architecture', href: '/infrastructure/courier' },
      { label: 'Domains', href: '/infrastructure/domains' },
      { label: 'Hosting', href: '/infrastructure/hosting' },
      { label: 'Networking', href: '/infrastructure/networking' },
      { label: 'Optical Systems', href: '/infrastructure/optical' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    label: 'Research',
    href: '/research',
    children: [
      { label: 'Research Portal', href: '/research', meta: '01' },
      { label: 'AI & Machine Learning', href: '/technology/ai', meta: '02' },
      { label: 'Research Areas', href: '/research/areas' },
      { label: 'Experiments', href: '/research/experiments' },
      { label: 'Whitepaper', href: '/research/whitepaper' },
      { label: 'Publications', href: '/research/publications' },
    ],
  },
  {
    label: 'TIV I/O',
    href: '/io',
  },
  {
    label: 'Open Source',
    href: '/open-source',
  },
  {
    label: 'Transparency',
    href: '/transparency',
    children: [
      { label: 'Portal', href: '/transparency', meta: '01' },
      { label: 'Financial Reports', href: '/transparency/financials' },
      { label: 'Portfolio Economics', href: '/transparency/financials/portfolio-economics' },
      { label: 'Economics Methodology', href: '/transparency/financials/portfolio-economics/methodology' },
      { label: 'Governance', href: '/transparency/governance' },
      { label: 'Security Center', href: '/security' },
      { label: 'Annual Reports', href: '/transparency/annual-reports' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About TIV', href: '/about', meta: '01' },
      { label: 'Founder & Leadership', href: '/about/leadership' },
      { label: 'Technology Stack', href: '/technology' },
      { label: 'Legal & Policies', href: '/legal' },
    ],
  },
];

export function SiteNav() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const closeDropdown = useCallback(() => {
    setOpenIndex(null);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [closeDropdown]);

  // Close on route change
  useEffect(() => {
    closeDropdown();
  }, [pathname, closeDropdown]);

  const handleMouseEnter = (i: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (navItems[i]?.children) {
      setOpenIndex(i);
    }
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenIndex(null);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
      triggerRefs.current[index]?.focus();
    } else if (e.key === 'ArrowDown' && openIndex === index) {
      // Focus first item in dropdown
      const menu = navRef.current?.querySelector(`[data-dropdown-index="${index}"]`);
      const firstLink = menu?.querySelector('a') as HTMLElement | null;
      if (firstLink) {
        e.preventDefault();
        firstLink.focus();
      }
    }
  };

  return (
    <nav ref={navRef} className="hidden items-center lg:flex" aria-label="Primary">
      <ul className="flex items-center">
        {navItems.map((item, i) => {
          const isCategoryActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const isOpen = openIndex === i;

          return (
            <li
              key={item.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    'px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand',
                    isCategoryActive
                      ? 'text-brand'
                      : 'text-foreground hover:text-brand'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>

                {item.children && (
                  <button
                    ref={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-label={`Toggle ${item.label} sub-menu`}
                    className={cn(
                      'p-1 text-muted-foreground hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand rounded-sm',
                      isOpen && 'text-brand'
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 transition-transform duration-200',
                        isOpen && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>

              {item.children && isOpen && (
                <div
                  data-dropdown-index={i}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      closeDropdown();
                      triggerRefs.current[i]?.focus();
                    }
                  }}
                  className="absolute left-0 top-full z-50 min-w-[240px] border border-border bg-popover pt-1 shadow-md animate-in fade-in-50 duration-150"
                  role="menu"
                  aria-label={`${item.label} sub-menu`}
                >
                  <div className="px-3 py-2 border-b border-border/40">
                    <span className="tiv-meta text-[10px]">{item.label} Directory</span>
                  </div>
                  <ul className="py-1">
                    {item.children.map((child) => (
                      <li key={child.href} role="none">
                        <Link
                          href={child.href}
                          role="menuitem"
                          prefetch={false}
                          className={cn(
                            'flex items-center justify-between px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-brand focus-visible:bg-muted focus-visible:text-brand focus-visible:outline-none',
                            pathname === child.href && 'text-brand font-medium bg-brand/5'
                          )}
                          aria-current={pathname === child.href ? 'page' : undefined}
                        >
                          <span>{child.label}</span>
                          {child.meta && (
                            <span className="font-mono text-xs text-muted-foreground/60">
                              {child.meta}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
