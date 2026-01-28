import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const alt = 'Daar - Het Vrijwilligersplatform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#2D334A',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #2D334A 0%, #1E2433 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(59, 162, 115, 0.15)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '60px 80px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: '#3BA273',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="white"
                />
              </svg>
            </div>
            <span style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>
              Daar
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h1
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Grip op vrijwilligers,
              <br />
              focus op <span style={{ color: '#3BA273' }}>geluk.</span>
            </h1>
            <p style={{ fontSize: 28, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Het complete platform voor vrijwilligersmanagement
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>
                667% ROI
              </span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>
                156u bespaard/jaar
              </span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20 }}>
              daar.nl
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
