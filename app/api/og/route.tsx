import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get parameters from URL
  const title = searchParams.get('title') || 'Grip op vrijwilligers, focus op geluk';
  const subtitle = searchParams.get('subtitle') || 'Het complete platform voor vrijwilligersmanagement';
  const type = searchParams.get('type') || 'default'; // default, article, quiz

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
        {/* Background gradient */}
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

        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(59, 162, 115, 0.15)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 209, 102, 0.1)',
            filter: 'blur(40px)',
          }}
        />

        {/* Content */}
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
          {/* Top section with logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Logo mark */}
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
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              Daar
            </span>

            {/* Type badge */}
            {type === 'article' && (
              <div
                style={{
                  marginLeft: 'auto',
                  backgroundColor: 'rgba(255, 209, 102, 0.2)',
                  color: '#FFD166',
                  padding: '8px 20px',
                  borderRadius: 100,
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Kennisbank
              </div>
            )}
            {type === 'quiz' && (
              <div
                style={{
                  marginLeft: 'auto',
                  backgroundColor: 'rgba(131, 212, 200, 0.2)',
                  color: '#83D4C8',
                  padding: '8px 20px',
                  borderRadius: 100,
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Geluksmonitor
              </div>
            )}
          </div>

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '900px',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 50 ? 52 : 64,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 28,
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '32px',
              }}
            >
              {/* Stats */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#3BA273',
                  }}
                />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>
                  667% ROI
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#FFD166',
                  }}
                />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>
                  156u bespaard/jaar
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#83D4C8',
                  }}
                />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>
                  90% tevredenheid
                </span>
              </div>
            </div>

            <span
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 20,
              }}
            >
              daar.nl
            </span>
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
