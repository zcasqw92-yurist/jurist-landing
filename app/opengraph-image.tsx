import { ImageResponse } from 'next/og';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ fontSize: 56, background: 'white', color: 'black', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        Юридическая помощь — претензии и возврат денег
      </div>
    ),
    { ...size }
  );
}
