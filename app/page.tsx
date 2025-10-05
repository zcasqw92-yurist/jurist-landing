// app/page.tsx
import * as React from "react";

export default function Page() {
  return (
    <main className="min-h-screen grid place-items-center p-10">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">Юридический лендинг работает ✅</h1>
        <p className="text-gray-600">Главная страница подключена. Сейчас вернём дизайн.</p>
      </div>
    </main>
  );
}

// Строчка ниже помечает файл как модуль даже для строгих конфигов.
export {};
