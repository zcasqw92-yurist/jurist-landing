import { ImageResponse } from 'next/og';
export const size = { width: 1200, height: 600 };
export const contentType = 'image/png';
export default function TwitterImage() {
  return new ImageResponse(
    (
      <div style={{ fontSize: 48, background: 'white', color: 'black', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        Юридическая помощь — претензии
      </div>
    ),
    { ...size }
  );
}
