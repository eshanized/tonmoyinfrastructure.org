'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavGroup {
  label: string;
  href: string;
  children?: { label: string; href: string; external?: boolean }[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Work',
    href: '/work',
    children: [
      { label: 'All Projects', href: '/projects' },
      { label: 'Products', href: '/products' },
      { label: 'OpenMail', href: '/projects/openmail' },
      { label: 'Mercura', href: '/projects/mercura' },
      { label: 'M31A', href: '/projects/m31a' },
      { label: 'Octate', href: '/projects/octate' },
      { label: 'Kyro', href: '/projects/kyro' },
      { label: 'Kyro Downloads', href: '/projects/kyro/downloads' },
      { label: 'Kyro Official Website', href: 'https://kyro.tonmoyinfrastructure.org/', external: true },
      { label: 'Runstead (Venture)', href: '/projects/runstead' },
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
      { label: 'Research Portal', href: '/research' },
      { label: 'AI & Machine Learning', href: '/technology/ai' },
      { label: 'Research Areas', href: '/research/areas' },
      { label: 'Experiments', href: '/research/experiments' },
      { label: 'Whitepaper', href: '/research/whitepaper' },
      { label: 'Publications', href: '/research/publications' },
    ],
  },
  { label: 'TIV I/O', href: '/io' },
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const openerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close when pathname changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Manage body scroll and focus when opened/closed
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Move focus inside dialog
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
        openerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <Link
        href="/search/"
        prefetch={false}
        className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand lg:hidden"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Link>

      <button
        ref={openerRef}
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand lg:hidden"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-navigation-dialog"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div
          id="mobile-navigation-dialog"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-[100] lg:hidden"
        >
          {/* Overlay backdrop */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setOpen(false);
              openerRef.current?.focus();
            }}
          />

          <div className="relative flex h-full flex-col bg-background">
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <span className="font-display text-sm font-semibold text-foreground">
                Tonmoy Infrastructure and Vision
              </span>
              <button
                ref={closeButtonRef}
                onClick={() => {
                  setOpen(false);
                  openerRef.current?.focus();
                }}
                className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground hover:text-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              className="flex-1 overflow-y-auto px-6 py-4"
              aria-label="Mobile Navigation"
            >
              <ul className="space-y-1">
                {navGroups.map((group) => {
                  const isCurrent = pathname === group.href;
                  return (
                    <li key={group.href}>
                      {group.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedGroup(
                                expandedGroup === group.label ? null : group.label
                              )
                            }
                            aria-expanded={expandedGroup === group.label}
                            className="flex w-full items-center justify-between py-3 text-base font-medium text-foreground hover:text-brand transition-colors text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                          >
                            <span>{group.label}</span>
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 transition-transform duration-200 text-muted-foreground',
                                expandedGroup === group.label && 'rotate-180 text-brand'
                              )}
                              aria-hidden="true"
                            />
                          </button>
                          {expandedGroup === group.label && (
                            <ul className="ml-4 space-y-1 border-l border-border pl-4">
                              {group.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    prefetch={false}
                                    target={child.external ? '_blank' : undefined}
                                    rel={child.external ? 'noopener noreferrer' : undefined}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                      'block py-2.5 text-sm transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand',
                                      pathname === child.href
                                        ? 'text-brand font-medium'
                                        : 'text-muted-foreground'
                                    )}
                                    aria-current={pathname === child.href ? 'page' : undefined}
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
                          prefetch={false}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'block py-3 text-base font-medium transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand',
                            isCurrent ? 'text-brand' : 'text-foreground'
                          )}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {group.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-border px-6 py-4 flex items-center justify-between">
              <span className="tiv-meta">TIV INFRASTRUCTURE</span>
              <span className="font-mono text-xs text-muted-foreground">Jayapura Sovereign Facility</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
