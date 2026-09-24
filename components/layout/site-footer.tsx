import Link from 'next/link';
import { Shield, FileText } from 'lucide-react';

const footerNav = {
  Work: [
    { label: 'Products', href: '/products' },
    { label: 'Projects', href: '/projects' },
    { label: 'Releases', href: '/releases' },
    { label: 'Open Source', href: '/open-source' },
  ],
  Infrastructure: [
    { label: 'Solutions Hub', href: '/solutions' },
    { label: 'Overview', href: '/infrastructure' },
    { label: 'Data Centers', href: '/infrastructure/data-centers' },
    { label: 'Courier Network', href: '/infrastructure/courier' },
    { label: 'Hosting', href: '/infrastructure/hosting' },
    { label: 'Networking', href: '/infrastructure/networking' },
    { label: 'Optical Systems', href: '/infrastructure/optical' },
    { label: 'Status', href: '/status' },
  ],
  Research: [
    { label: 'Research Portal', href: '/research' },
    { label: 'AI & Machine Learning', href: '/technology/ai' },
    { label: 'Research Areas', href: '/research/areas' },
    { label: 'Experiments', href: '/research/experiments' },
    { label: 'Whitepaper', href: '/research/whitepaper' },
    { label: 'Publications', href: '/research/publications' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Governance', href: '/about/governance' },
    { label: 'Timeline', href: '/about/timeline' },
    { label: 'Careers', href: '/careers' },
  ],
  'Trust & Legal': [
    { label: 'Transparency', href: '/transparency' },
    { label: 'Financials', href: '/transparency/financials' },
    { label: 'Portfolio Economics', href: '/transparency/financials/portfolio-economics' },
    { label: 'Security Center', href: '/security' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Licenses', href: '/licenses' },
  ],
  Contact: [
    { label: 'Inquiries', href: '/contact' },
    { label: 'Media Kit', href: '/media' },
    { label: 'Investors', href: '/investors' },
    { label: 'Security Reports', href: '/security' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Large TIV wordmark */}
      <div
        className="pointer-events-none absolute -bottom-8 right-0 select-none opacity-[0.03]"
        aria-hidden="true"
      >
        <span className="font-display text-[12rem] font-bold leading-none tracking-tighter md:text-[18rem]">
          TIV
        </span>
      </div>

      <div className="tiv-container relative py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center bg-brand font-display text-sm font-bold text-brand-foreground">
                T
              </span>
              <span className="font-display text-sm font-semibold tracking-tight">
                TIV
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building infrastructure that people can understand, operate, own,
              and depend on.
            </p>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="tiv-meta mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="tiv-meta">
            © {new Date().getFullYear()} Tonmoy Infrastructure and Vision
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/trust"
              className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
              Trust Center
            </Link>
            <Link
              href="/transparency"
              className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Transparency
            </Link>
            <Link
              href="/sitemap"
              className="text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              Site Map
            </Link>
            <span className="tiv-meta">STATUS: ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
