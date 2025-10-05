'use client';

export default function GlobalError({ error, reset }: { error: Error & {digest?: string}, reset: () => void }) {
  console.error('App error:', error?.message, 'Digest:', (error as any)?.digest);
  return (
    <html>
      <body>
        <main className="container py-16">
          <h1 className="h2">Что-то пошло не так</h1>
          <p className="text-gray-600 mt-2">Мы уже работаем над этим. Попробуйте обновить страницу.</p>
          <button className="btn mt-6" onClick={() => reset()}>Обновить</button>
        </main>
      </body>
    </html>
  );
}
