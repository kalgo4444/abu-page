import { ImageResponse } from 'next/og';

export const alt = 'Abdulaziz — Front-end dasturchi portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#ffffff',
        color: '#111111',
        padding: '72px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 28, letterSpacing: 3 }}>
        FRONT-END · NEXT.JS · TYPESCRIPT
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 110, fontWeight: 800, lineHeight: 0.9 }}>
          ABDULAZIZ
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 38, color: '#707072' }}>
          Front-end dasturchi
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 12,
          background: '#111111',
        }}
      />
    </div>,
    size
  );
}
