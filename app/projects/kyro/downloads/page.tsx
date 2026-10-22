import Link from 'next/link';
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Callout } from '@/components/shared/callout';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

const releaseUrl = 'https://github.com/eshanized/Kyro/releases/tag/v0.1.0';
const assetBase = 'https://github.com/eshanized/Kyro/releases/download/v0.1.0';

const downloads = [
  {
    name: 'Debian, Ubuntu, Linux Mint, Pop!_OS, Kali',
    format: '.deb',
    file: 'Kyro_0.1.0_amd64.deb',
    url: `${assetBase}/Kyro_0.1.0_amd64.deb`,
    command: 'sudo apt install ./Kyro_0.1.0_amd64.deb',
    recommended: true,
  },
  {
    name: 'Fedora, RHEL, CentOS Stream, Rocky, AlmaLinux',
    format: '.rpm',
    file: 'Kyro-0.1.0-1.x86_64.rpm',
    url: `${assetBase}/Kyro-0.1.0-1.x86_64.rpm`,
    command: 'sudo dnf install ./Kyro-0.1.0-1.x86_64.rpm',
  },
  {
    name: 'openSUSE Leap / Tumbleweed',
    format: '.rpm',
    file: 'Kyro-0.1.0-1.x86_64.rpm',
    url: `${assetBase}/Kyro-0.1.0-1.x86_64.rpm`,
    command: 'sudo zypper install ./Kyro-0.1.0-1.x86_64.rpm',
  },
  {
    name: 'Arch Linux, Manjaro, EndeavourOS, SteamOS',
    format: '.pkg.tar.zst',
    file: 'kyro-0.1.0-1-x86_64.pkg.tar.zst',
    url: `${assetBase}/kyro-0.1.0-1-x86_64.pkg.tar.zst`,
    command: 'sudo pacman -U kyro-0.1.0-1-x86_64.pkg.tar.zst',
  },
  {
    name: 'Universal Linux — AppImage',
    format: '.AppImage',
    file: 'Kyro_0.1.0_amd64.AppImage',
    url: `${assetBase}/Kyro_0.1.0_amd64.AppImage`,
    command: 'chmod +x Kyro_0.1.0_amd64.AppImage && ./Kyro_0.1.0_amd64.AppImage',
  },
  {
    name: 'Portable Linux archive',
    format: '.tar.gz',
    file: 'kyro-0.1.0-linux-x86_64.tar.gz',
    url: `${assetBase}/kyro-0.1.0-linux-x86_64.tar.gz`,
    command: 'Extract the archive and follow its included install instructions.',
  },
];

export const metadata = generatePageMetadata({
  title: 'Download Kyro v0.1.0 for Linux — Official Installers',
  description:
    'Download Kyro v0.1.0 for Linux x86_64. Official Debian/Ubuntu .deb, Fedora/RHEL .rpm, Arch package, AppImage, portable tarball, installer scripts, and SHA-256 checksums.',
  path: '/projects/kyro/downloads',
  keywords: [
    'download Kyro',
    'Kyro Linux download',
    'Kyro AppImage',
    'Kyro Debian package',
    'Kyro Ubuntu installer',
    'Kyro Arch Linux package',
    'Kyro Fedora RPM',
    'Kyro SHA256 checksum',
  ],
});

export default function KyroDownloadsPage() {
  const pageGraph = generatePageGraph({
    pagePath: '/projects/kyro/downloads',
    pageTitle: 'Download Kyro v0.1.0 for Linux — Tonmoy Infrastructure and Vision',
    pageDescription:
      'Official Kyro v0.1.0 Linux installers, portable package, and checksum manifest.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'Kyro', path: '/projects/kyro' },
      { name: 'Downloads', path: '/projects/kyro/downloads' },
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={pageGraph} />
      <PageHeader
        index="KYRO / DOWNLOADS"
        label="Public Linux Release"
        title="Download Kyro v0.1.0."
        description="Choose the Linux package for your distribution or use the portable AppImage. All files link to the published v0.1.0 assets in the official Kyro GitHub release."
        meta={[
          { label: 'VERSION', value: 'v0.1.0' },
          { label: 'PLATFORM', value: 'Linux x86_64' },
          { label: 'LICENSE', value: 'MIT' },
          { label: 'RELEASED', value: '21 Oct 2026' },
        ]}
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8 flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: 'Kyro', href: '/projects/kyro' },
              { label: 'Downloads' },
            ]}
          />
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects/kyro/"
              className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm hover:border-brand hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              Kyro project profile
            </Link>
            <a
              href="https://kyro.tonmoyinfrastructure.org/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm hover:border-brand hover:text-brand"
            >
              <Globe className="h-4 w-4" />
              Official Kyro download page
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      <main className="tiv-container py-12 md:py-16 space-y-10">
        <Callout type="info" title="Release scope">
          Kyro v0.1.0 provides Linux x86_64 installers. This release page does not list
          macOS or Windows packages because those assets are not included in v0.1.0.
          Kyro is an early public release with active development; do not treat it as a
          claim of stable production qualification.
        </Callout>

        <section aria-labelledby="linux-package-heading">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="tiv-meta-brand">OFFICIAL RELEASE ASSETS</span>
              <h2 id="linux-package-heading" className="mt-2 font-display text-2xl md:text-3xl">
                Linux installers.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Select a package for a 64-bit Linux system. Package installation may require administrator privileges.
              </p>
            </div>
            <a
              href={releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90"
            >
              Full release notes
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 space-y-3">
            {downloads.map((item) => (
              <article key={item.format + item.name} className="border border-border bg-card p-5 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      {item.recommended && (
                        <span className="border border-brand/40 bg-brand/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand">
                          Debian family
                        </span>
                      )}
                    </div>
                    <p className="mt-2 break-all font-mono text-xs text-muted-foreground">{item.file}</p>
                    <p className="mt-3 text-xs text-muted-foreground">Install / launch:</p>
                    <code className="mt-1 block overflow-x-auto rounded-sm bg-secondary/60 p-3 text-xs text-foreground">
                      {item.command}
                    </code>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 border border-brand bg-brand px-4 py-3 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    Download {item.format}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand" />
              <h2 className="font-display text-xl">Verify downloaded files.</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Download the published SHA-256 manifest, place it beside the downloaded release assets,
              and run the verification command to check local file integrity.
            </p>
            <a
              href={`${assetBase}/SHA256SUMS.txt`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Download SHA256SUMS.txt
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <code className="mt-3 block bg-secondary/60 p-3 text-xs text-foreground">
              sha256sum -c SHA256SUMS.txt
            </code>
          </div>

          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              <h2 className="font-display text-xl">Installer scripts.</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The v0.1.0 release also publishes install and uninstall scripts. Review remote scripts before running them,
              and use only the official release URLs.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href={`${assetBase}/install.sh`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand hover:underline"
              >
                install.sh <ExternalLink className="inline h-3.5 w-3.5" />
              </a>
              <a
                href={`${assetBase}/uninstall.sh`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand hover:underline"
              >
                uninstall.sh <ExternalLink className="inline h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Kyro is licensed under the MIT License. Review the official repository and release notes for prerequisites,
            provider setup, platform limitations, known issues, and the latest package versions.
          </p>
          <div className="mt-4 flex flex-wrap gap-5">
            <a href="https://kyro.tonmoyinfrastructure.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-brand hover:underline">
              Official website
            </a>
            <a href="https://github.com/eshanized/Kyro" target="_blank" rel="noopener noreferrer" className="text-sm text-brand hover:underline">
              Source repository
            </a>
            <a href={releaseUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand hover:underline">
              All releases
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
