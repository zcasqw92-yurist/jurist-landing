// app/page.tsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import LeadForm from "./components/LeadForm";

// Next 15: searchParams — Promise
export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const sp = (await searchParams) ?? {};
  const sentRaw = Array.isArray(sp.sent) ? sp.sent[0] : sp.sent;
  const sent = sentRaw === "1";

  return (
    <main className="min-h-screen">
      <Header />
      <Hero sent={sent} />

      {/* Чем помогаю / услуги */}
      <section id="services" className="py-14 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Чем помогаю</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold">Досудебные претензии</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>Возврат денег (товары/услуги)</li>
                <li>Просрочка исполнения / некачественная услуга</li>
                <li>Поставки / подряд / аренда</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-6">
              <h3 className="font-semibold">Жалобы и заявления</h3>
              <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                <li>Роспотребнадзор, прокуратура, ЦБ, маркетплейсы</li>
                <li>Незаконные удержания, штрафы, навязанные услуги</li>
                <li>Оспаривание отказов и списаний</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Кейсы */}
      <section id="cases" className="py-14 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Недавние кейсы</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 bg-white border rounded-2xl">
              <h4 className="font-semibold">Возврат предоплаты</h4>
              <p className="text-gray-600 mt-2">Просрочка → претензия → возврат за 10 дней.</p>
            </div>
            <div className="p-6 bg-white border rounded-2xl">
              <h4 className="font-semibold">Маркетплейс</h4>
              <p className="text-gray-600 mt-2">Жалоба + претензия → снятие копий, компенсация.</p>
            </div>
            <div className="p-6 bg-white border rounded-2xl">
              <h4 className="font-semibold">Ремонт/услуги</h4>
              <p className="text-gray-600 mt-2">Некачественно? Претензия → перерасчёт и возврат.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold">Частые вопросы</h2>
          <div className="mt-6 space-y-4">
            <details className="p-4 border rounded-2xl">
              <summary className="font-medium">Сколько стоит претензия?</summary>
              <p className="text-gray-600 mt-2">Базовые случаи — фикс; сложные — по оценке.</p>
            </details>
            <details className="p-4 border rounded-2xl">
              <summary className="font-medium">Нужны оригиналы?</summary>
              <p className="text-gray-600 mt-2">Для претензии хватит копий/сканов. Оригиналы — в суд.</p>
            </details>
            <details className="p-4 border rounded-2xl">
              <summary className="font-medium">Сроки?</summary>
              <p className="text-gray-600 mt-2">Обычно 1–3 рабочих дня после получения материалов.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Нижний CTA + форма */}
      <section id="contacts" className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold">Нужна помощь сейчас?</h2>
            <p className="text-gray-600 mt-2">Оставьте контакты — предложу план действий под вашу ситуацию.</p>
            <a href="#lead" className="inline-block mt-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition">
              Разобрать мой случай
            </a>
          </div>
          <div className="max-w-xl md:ml-auto">
            <div className="rounded-2xl border p-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t py-8 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4">
          <div>© {new Date().getFullYear()} jurist.spb</div>
          <div className="flex gap-4">
            <a href="/policy" className="hover:text-gray-900">Политика конфиденциальности</a>
            <a href="/offer" className="hover:text-gray-900">Оферта</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
