import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f4ece0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          fontFamily: 'serif',
          color: '#1f1b17',
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7, fontStyle: 'italic' }}>
          Personal Trainer &amp; Chinesiologa
        </div>
        <div
          style={{
            fontSize: 140,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
          }}
        >
          Alessia
        </div>
        <div style={{ fontSize: 28, color: '#b5532a' }}>
          postura · recupero · percorsi
        </div>
      </div>
    ),
    { ...size },
  );
}
