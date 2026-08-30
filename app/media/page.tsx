import { PageHeader } from '@/components/shared/page-header';
import { SectionHeader } from '@/components/shared/section-header';
import { Callout } from '@/components/shared/callout';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/shared/motion';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { getMediaAssets } from '@/lib/institutional';
import { generatePageMetadata } from '@/lib/seo';
import { generatePageGraph } from '@/lib/structured-data';
import { JsonLd } from '@/components/shared/json-ld';

export const metadata = generatePageMetadata({
  title: 'Media Kit & Brand Assets',
  description:
    'Official media kit for Tonmoy Infrastructure and Vision — vector brand marks, logotypes, color palettes, and press usage guidelines.',
  path: '/media',
  keywords: ['TIV media kit', 'brand assets', 'logos', 'press kit', 'brand guidelines'],
});

const typeIcons: Record<string, string> = {
  Logo: 'LOGO',
  Wordmark: 'TEXT',
  Color: 'COLOR',
  Guidelines: 'DOC',
  Screenshot: 'IMAGE',
  Document: 'DOC',
};

export default function MediaPage() {
  const assets = getMediaAssets();

  const pageGraph = generatePageGraph({
    title: 'Media Kit & Brand Assets — Tonmoy Infrastructure and Vision',
    description:
      'Official media kit for Tonmoy Infrastructure and Vision — vector brand marks, logotypes, color palettes, and press usage guidelines.',
    path: '/media',
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Media Kit', item: '/media' },
    ],
  });

  return (
    <>
      <JsonLd data={pageGraph} />
      <PageHeader
        index="MEDIA"
        label="Press Kit"
        title="Media kit."
        description="Official brand assets for TIV. Logos, colors, and guidelines for press, partners, and community use. No unofficial or fabricated brand assets are included."
      />

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Breadcrumbs items={[{ label: 'Media' }]} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="tiv-container py-8">
          <Callout type="info" title="Official Assets Only">
            Only official TIV brand assets are listed here. No unofficial logos,
            mockups, or brand materials are provided. Downloadable files will be
            added when ready.
          </Callout>
        </div>
      </section>

      <section>
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="01"
              label="Assets"
              title="Brand materials."
              description="Official TIV brand assets for press and public use."
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {assets.map((asset) => (
              <StaggerItem key={asset.slug}>
                <div className="group relative flex h-full flex-col bg-card p-6 transition-colors hover:bg-card/80">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  <span className="tiv-meta">{typeIcons[asset.type] || asset.type}</span>
                  <h3 className="mt-2 font-display text-base font-medium tracking-tight transition-colors group-hover:text-brand">
                    {asset.name}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {asset.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                      {asset.format}
                    </span>
                    {asset.downloadUrl ? (
                      <a
                        href={asset.downloadUrl}
                        className="text-sm font-medium text-brand hover:underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground/60">
                        Not yet downloadable
                      </span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Brand color preview */}
      <section className="border-t border-border bg-secondary/30">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="02"
              label="Color"
              title="Coral Red."
              description="The primary TIV brand color."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-4 border border-border bg-card p-6">
                <div className="h-16 w-16 bg-brand" />
                <div>
                  <span className="tiv-meta">PRIMARY</span>
                  <p className="mt-1 font-mono text-sm">#E5484D</p>
                  <p className="text-xs text-muted-foreground">Coral Red</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Logo preview */}
      <section className="border-t border-border">
        <div className="tiv-container py-16 md:py-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="Logo"
              title="TIV logo mark."
              description="The TIV logo — a square with the letter T in Coral Red."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-wrap gap-8 border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center bg-brand font-display text-lg font-bold text-brand-foreground">
                  T
                </span>
                <span className="font-display text-lg font-semibold tracking-tight">TIV</span>
              </div>
              <div className="flex items-center gap-3 border-l border-border pl-8">
                <span className="flex h-12 w-12 items-center justify-center border-2 border-brand font-display text-lg font-bold text-brand">
                  T
                </span>
                <span className="font-display text-lg font-semibold tracking-tight">TIV</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
