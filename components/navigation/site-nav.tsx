'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
      { label: 'OpenMail', href: '/products/openmail' },
      { label: 'Mercura', href: '/products/mercura' },
      { label: 'M31A', href: '/products/m31a' },
      { label: 'Octate', href: '/products/octate' },
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
      { label: 'Courier Network', href: '/infrastructure/courier' },
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

  return (
    <nav className="hidden items-center lg:flex" aria-label="Primary">
      <ul className="flex items-center">
        {navItems.map((item, i) => (
          <li
            key={item.href}
            className="relative"
            onMouseEnter={() => item.children && setOpenIndex(i)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <Link
              href={item.href}
              className={cn(
                'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                pathname.startsWith(item.href)
                  ? 'text-brand'
                  : 'text-foreground hover:text-brand'
              )}
            >
              {item.label}
              {item.children && (
                <ChevronDown
                  className={cn(
                    'h-3 w-3 transition-transform',
                    openIndex === i && 'rotate-180'
                  )}
                />
              )}
            </Link>

            {item.children && openIndex === i && (
              <div className="absolute left-0 top-full z-50 min-w-[220px] border border-border bg-popover pt-1 shadow-md">
                <div className="px-3 py-2">
                  <span className="tiv-meta">{item.label}</span>
                </div>
                <ul className="pb-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-brand"
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
        ))}
      </ul>
    </nav>
  );
}
