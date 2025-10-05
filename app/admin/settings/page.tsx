'use client';
import { useEffect, useState } from 'react';

type KV = { key: string; value: any };

export default function AdminSettings() {
  const [items, setItems] = useState<KV[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true); setMsg(null);
    const res = await fetch('/api/admin/settings', { cache: 'no-store' });
    const data = await res.json();
    setLoading(false);
    if (!res.ok || !data.ok) { setMsg(data.error || 'Ошибка загрузки'); return; }
    setItems(data.settings || []);
  }

  useEffect(() => { load(); }, []);

  async function save(key: string, value: any) {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ key, value })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) setMsg(data.error || 'Ошибка сохранения');
    else setMsg('Сохранено');
  }

  const hero = items.find(i => i.key === 'hero')?.value || {};
  const contacts = items.find(i => i.key === 'contacts')?.value || {};

  return (
    <main className="container py-10 space-y-6">
      <h1 className="h2">Настройки сайта</h1>
      {loading && <p>Загрузка…</p>}
      {msg && <p className="text-sm">{msg}</p>}

      {/* Hero */}
      <div className="card space-y-3">
        <h2 className="font-semibold text-lg">Hero</h2>
        <input className="input" placeholder="Бейдж" defaultValue={hero.badge}
               onBlur={e => save('hero', { ...hero, badge: e.target.value })} />
        <input className="input" placeholder="Заголовок" defaultValue={hero.title}
               onBlur={e => save('hero', { ...hero, title: e.target.value })} />
        <textarea className="input" placeholder="Подзаголовок" defaultValue={hero.subtitle}
               onBlur={e => save('hero', { ...hero, subtitle: e.target.value })} />
        <div className="grid md:grid-cols-2 gap-3">
          <input className="input" placeholder="CTA Primary" defaultValue={hero.ctaPrimary}
                 onBlur={e => save('hero', { ...hero, ctaPrimary: e.target.value })} />
          <input className="input" placeholder="CTA Secondary" defaultValue={hero.ctaSecondary}
                 onBlur={e => save('hero', { ...hero, ctaSecondary: e.target.value })} />
        </div>
      </div>

      {/* Contacts */}
      <div className="card space-y-3">
        <h2 className="font-semibold text-lg">Контакты</h2>
        <input className="input" placeholder="Телефон" defaultValue={contacts.phone}
               onBlur={e => save('contacts', { ...contacts, phone: e.target.value })} />
        <input className="input" placeholder="Email" defaultValue={contacts.email}
               onBlur={e => save('contacts', { ...contacts, email: e.target.value })} />
      </div>
    </main>
  );
}
