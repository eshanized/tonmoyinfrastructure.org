'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavGroup {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Work',
    href: '/work',
    children: [
      { label: 'All Projects', href: '/projects' },
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
      { label: 'Solutions Hub', href: '/solutions' },
      { label: 'Infrastructure Overview', href: '/infrastructure' },
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
      { label: 'Research Portal', href: '/research' },
      { label: 'Research Areas', href: '/research/areas' },
      { label: 'Experiments', href: '/research/experiments' },
      { label: 'Whitepaper', href: '/research/whitepaper' },
      { label: 'Publications', href: '/research/publications' },
    ],
  },
  { label: 'Open Source', href: '/open-source' },
  {
    label: 'Transparency',
    href: '/transparency',
    children: [
      { label: 'Portal', href: '/transparency' },
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
      { label: 'About TIV', href: '/about' },
      { label: 'Founder & Leadership', href: '/about/leadership' },
      { label: 'Technology Stack', href: '/technology' },
      { label: 'Legal & Policies', href: '/legal' },
    ],
  },
  { label: 'News', href: '/news' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Site Map', href: '/sitemap' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  return (
    <>
      <Link
        href="/search"
        className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-brand lg:hidden"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Link>

      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-brand lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-background"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <span className="font-display text-sm font-semibold">
                Tonmoy Infrastructure and Vision
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-brand"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              className="flex-1 overflow-y-auto px-6 py-4"
              aria-label="Mobile"
            >
              <ul className="space-y-1">
                {navGroups.map((group) => (
                  <li key={group.href}>
                    {group.children ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedGroup(
                              expandedGroup === group.label
                                ? null
                                : group.label
                            )
                          }
                          className="flex w-full items-center justify-between py-3 text-base font-medium"
                        >
                          {group.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform',
                              expandedGroup === group.label && 'rotate-180'
                            )}
                          />
                        </button>
                        {expandedGroup === group.label && (
                          <ul className="ml-4 space-y-1 border-l border-border pl-4">
                            {group.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-2.5 text-sm text-muted-foreground hover:text-brand"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={group.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 text-base font-medium hover:text-brand"
                      >
                        {group.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-border px-6 py-4">
              <span className="tiv-meta">STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
