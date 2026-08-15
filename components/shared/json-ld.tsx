/**
 * Server component that outputs a Schema.org JSON-LD script tag.
 * Evaluates entirely server-side without client JavaScript requirements.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Array<unknown>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
