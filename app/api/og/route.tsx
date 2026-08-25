import { ImageResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Tonmoy Infrastructure and Vision';
  const type = (searchParams.get('type') || 'TECHNOLOGY INFRASTRUCTURE').toUpperCase();
  const status = searchParams.get('status') || '';
  const description = searchParams.get('description') || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          color: '#ffffff',
          padding: '60px 70px',
          fontFamily: 'sans-serif',
          border: '2px solid #27272a',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#E5484D',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '24px',
              }}
            >
              T
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: '#E5484D',
              }}
            >
              TIV
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                letterSpacing: '0.15em',
                color: '#a1a1aa',
                textTransform: 'uppercase',
                border: '1px solid #3f3f46',
                padding: '4px 12px',
              }}
            >
              {type}
            </div>
            {status ? (
              <div
                style={{
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  color: status.includes('Stable') ? '#34d399' : '#fbbf24',
                  border: `1px solid ${status.includes('Stable') ? '#059669' : '#d97706'}`,
                  padding: '4px 12px',
                }}
              >
                {status}
              </div>
            ) : null}
          </div>
        </div>

        {/* Center Title & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: title.length > 35 ? '48px' : '58px',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#f4f4f5',
              letterSpacing: '-0.02em',
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                fontSize: '20px',
                color: '#a1a1aa',
                lineHeight: 1.4,
                maxWidth: '900px',
              }}
            >
              {description.slice(0, 140)}
              {description.length > 140 ? '...' : ''}
            </div>
          ) : (
            <div
              style={{
                fontSize: '20px',
                color: '#71717a',
                lineHeight: 1.4,
              }}
            >
              Building practical software, internet infrastructure, networking systems, and emerging technologies.
            </div>
          )}
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #27272a',
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontFamily: 'monospace',
              color: '#71717a',
            }}
          >
            tonmoyinfrastructure.org · Tonmoy Infrastructure and Vision
          </div>
          <div
            style={{
              fontSize: '14px',
              fontFamily: 'monospace',
              color: '#a1a1aa',
            }}
          >
            Verified Technical Entity
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
