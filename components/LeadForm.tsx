'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();               // <- БЛОКИРУЕМ обычную отправку (чтобы НЕ было ?sent=1)
    setMsg('');
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment }),
      });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Ошибка отправки');
      }

      // вариант 1: показать сообщение без перезагрузки
      setMsg('Заявка принята! Мы свяжемся с вами.');
      setName(''); setPhone(''); setComment('');

      // вариант 2 (если хочешь): плавный редирект на ?sent=1 без повторной отправки
      // router.replace('/?sent=1');
    } catch (err: any) {
      setMsg(err?.message || 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} /* ВАЖНО: без action и method! */
          className="space-y-3">
      <input
        className="w-full border rounded p-2"
        placeholder="Ваше имя"
        value={name}
        onChange={e=>setName(e.target.value)}
        required
      />
      <input
        className="w-full border rounded p-2"
        placeholder="Телефон"
        value={phone}
        onChange={e=>setPhone(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Коротко о ситуации"
        value={comment}
        onChange={e=>setComment(e.target.value)}
      />
      <button type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-black text-white">
        {loading ? 'Отправляем…' : 'Разобрать мой случай'}
      </button>

      {msg && <p className="text-sm {msg.startsWith('Ошибка') ? 'text-red-600' : 'text-green-600'}">{msg}</p>}
    </form>
  );
}
