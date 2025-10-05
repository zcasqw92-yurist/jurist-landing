'use client';
import { useState } from 'react';

const items = [
  { q: 'Сколько стоит претензия?', a: 'Работа считается по задаче. Базовая подготовка претензии — от 1500 ₽. Итоговая стоимость зависит от объёма и сроков.' },
  { q: 'Нужны оригиналы?', a: 'Для претензии достаточно сканов/фото. Оригиналы сохраняйте для возможного суда.' },
  { q: 'Сроки?', a: 'Обычно 1–3 рабочих дня с момента получения всех данных.' },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section">
      <div className="container">
        <h2 className="h2 mb-6">Частые вопросы</h2>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="card">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left font-medium"
              >
                {it.q}
              </button>
              {open === i && <p className="mt-3 text-gray-700">{it.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
