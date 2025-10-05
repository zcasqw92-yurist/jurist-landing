'use client';

import { useState } from 'react';
<<<<<<< HEAD
import { useRouter } from 'next/navigation';
=======
>>>>>>> 02d4efd4ab02edd7c5e6cdc4be0cdd647712658c

export default function LeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
<<<<<<< HEAD
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();               // <- БЛОКИРУЕМ обычную отправку (чтобы НЕ было ?sent=1)
    setMsg('');
    setLoading(true);
=======
  const [msg, setMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSending(true);
>>>>>>> 02d4efd4ab02edd7c5e6cdc4be0cdd647712658c
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment }),
      });
      const data = await res.json();
<<<<<<< HEAD

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
=======
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Ошибка отправки');
      setMsg('Заявка принята! Мы свяжемся с вами.');
      setName(''); setPhone(''); setComment('');
    } catch (err: any) {
      setMsg(err?.message || 'Ошибка отправки');
    } finally {
      setSending(false);
>>>>>>> 02d4efd4ab02edd7c5e6cdc4be0cdd647712658c
    }
  }

  return (
<<<<<<< HEAD
    <form onSubmit={onSubmit} /* ВАЖНО: без action и method! */
          className="space-y-3">
=======
    <form onSubmit={onSubmit} className="space-y-3 w-full max-w-md" id="lead-form">
>>>>>>> 02d4efd4ab02edd7c5e6cdc4be0cdd647712658c
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
<<<<<<< HEAD
      />
      <button type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-black text-white">
        {loading ? 'Отправляем…' : 'Разобрать мой случай'}
      </button>

      {msg && <p className="text-sm {msg.startsWith('Ошибка') ? 'text-red-600' : 'text-green-600'}">{msg}</p>}
=======
        rows={4}
      />
      <button
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
        disabled={sending}
        type="submit"
      >
        {sending ? 'Отправляем…' : 'Разобрать мой случай'}
      </button>
      {msg && <p className={/ошиб/i.test(msg) ? 'text-red-600' : 'text-green-600'}>{msg}</p>}
>>>>>>> 02d4efd4ab02edd7c5e6cdc4be0cdd647712658c
    </form>
  );
}
