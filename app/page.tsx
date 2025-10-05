import Image from 'next/image'
import Container from '@/components/Container'
import { jsonLd } from '@/lib/seo'

export default function Home() {
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Юрист СПб',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: '/logo.svg',
    sameAs: [
      'https://t.me/',
      'https://wa.me/'
    ]
  }

  const jsonLdLocal = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LegalService'],
    name: 'Юрист СПб',
    image: ['/og-image.png'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Санкт‑Петербург',
      addressRegion: 'Ленинградская область',
      streetAddress: 'Невский пр.',
      postalCode: '190000',
      addressCountry: 'RU'
    },
    areaServed: ['Санкт‑Петербург', 'Ленинградская область', 'Россия'],
    telephone: '+7-812-000-00-00',
    openingHours: 'Mo-Su 09:00-21:00',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  }

  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + '/' },
    ]
  }

  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Можно ли вернуть деньги без суда?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, в ряде случаев достаточно грамотно составленной досудебной претензии и фиксирования переписки/фактов. Оценю шансы и подскажу стратегию именно для вашей ситуации.'
        }
      },
      {
        '@type': 'Question',
        name: 'Сколько стоит подготовка досудебной претензии?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Стоимость зависит от сложности фактов и документов. Базовый диапазон виден на странице, точную цену подтверждаю после короткого разбора.'
        }
      },
      {
        '@type': 'Question',
        name: 'Работаете ли вы удалённо по России?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, большинство задач решаю дистанционно: документы, переписка, консультации. Лично — по СПб/ЛО.'
        }
      }
    ]
  }

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white border-b border-slate-200">
        <Container className="py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Юрист в Санкт‑Петербурге — досудебные претензии, жалобы, иски</h1>
            <p className="mt-4 text-lg text-slate-700">Верну ваши деньги и защищу права законно и без лишних нервов. Работаю по ЗоЗПП и ГК РФ. Быстро включаюсь, даю понятный план действий.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#cta" className="px-6 py-3 rounded-full bg-brand-600 text-white text-center hover:bg-brand-700">Разобрать мой случай</a>
              <a href="#services" className="px-6 py-3 rounded-full border text-center hover:bg-slate-50">Смотреть услуги</a>
            </div>
            <ul className="mt-6 text-sm text-slate-600 space-y-1">
              <li>• Реальные кейсы и понятные сроки</li>
              <li>• Работаю официально, договор/чек</li>
              <li>• Удобно: дистанционно или лично</li>
            </ul>
          </div>
          <div className="relative h-64 md:h-96">
            <Image src="/og-image.png" alt="Юридическая помощь по возврату денег и защите прав" fill className="object-cover rounded-2xl border border-slate-200" priority />
          </div>
        </Container>
      </section>

      <section id="services" className="mt-14">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold">Чем помогаю</h2>
          <p className="mt-2 text-slate-600">Коротко и по делу — услуги, которые чаще всего решают проблему.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {title:'Досудебные претензии', text:'Возврат денег за товар/услугу, предоплату, депозит. Сильная формулировка, плавный заход к переговорам.'},
              {title:'Жалобы в госорганы', text:'Роспотребнадзор, Прокуратура, ФНС. По делу, с доказательствами и ссылкой на нормы.'},
              {title:'Исковые заявления', text:'Когда без суда нельзя: грамотно структурированное исковое с приложениями.'},
              {title:'Сопровождение переговоров', text:'Коммуникация с контрагентом/службой поддержки, фиксация позиции.'},
              {title:'Правовой разбор', text:'Проверю документы и стратегию, чтобы вы не теряли время и деньги.'},
              {title:'Шаблоны и инструкции', text:'Готовые решения под ваши кейсы — быстро и понятно.'}
            ].map((s, i)=>(
              <div key={i} className="card p-5">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
                <a href="#cta" className="mt-4 inline-block text-brand-700 hover:underline">Узнать стоимость →</a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="cases" className="mt-16">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold">Коротко о результатах</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {k:'Возврат депозита аренды', v:'+70 000 ₽', d:'Претензия + переговоры — деньги вернули без суда.'},
              {k:'Магазин не вернул предоплату', v:'+32 900 ₽', d:'Правильно собранные факты, претензия — возврат в 7 дней.'},
              {k:'Неоказанная услуга', v:'100% оплаты', d:'Жалоба + претензия — сделали возврат и извинились.'},
            ].map((c, i)=>(
              <div key={i} className="card p-5">
                <div className="text-sm text-slate-500">{c.k}</div>
                <div className="text-2xl font-semibold mt-1">{c.v}</div>
                <p className="mt-2 text-sm text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="prices" className="mt-16">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold">Цены и форматы</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {t:'Разбор + план', p:'Бесплатно', d:'Короткий созвон/переписка — понимаете, что делать дальше.'},
              {t:'Досудебная претензия', p:'от 2 000 ₽', d:'Готовый документ с формулировками и приложениями.'},
              {t:'Сопровождение', p:'от 5 000 ₽', d:'Переписка, ответы на возражения, инструкции — до результата.'},
            ].map((p, i)=>(
              <div key={i} className="card p-5">
                <div className="text-lg font-semibold">{p.t}</div>
                <div className="text-2xl mt-1">{p.p}</div>
                <p className="mt-2 text-sm text-slate-600">{p.d}</p>
                <a href="#cta" className="mt-4 inline-block px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Зафиксировать цену</a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="mt-16">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold">Частые вопросы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              {q:'Можно ли вернуть деньги без суда?', a:'Да, если правильно зафиксировать факты и направить претензию. Часто удаётся договориться быстро.'},
              {q:'Сколько стоит претензия?', a:'От 2 000 ₽ — итоговая цена зависит от объёма документов и сложности.'},
              {q:'Работаете ли по договору?', a:'Да, всё официально. Договор, чек, защита персональных данных.'},
              {q:'Как быстро получите результат?', a:'Первые сдвиги обычно в течение 3–7 дней после отправки претензии/жалобы.'},
            ].map((f, i)=>(
              <div key={i} className="card p-5">
                <div className="font-semibold">{f.q}</div>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="cta" className="mt-16 mb-20">
        <Container>
          <div className="card p-6 md:p-8">
            <div className="md:flex items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-semibold">Разберём ваш случай бесплатно</h2>
                <p className="mt-2 text-slate-600">Оставьте контакты — свяжусь, задам 3–5 ключевых вопросов и скажу, как лучше поступить.</p>
                <ul className="mt-3 text-sm text-slate-600 space-y-1">
                  <li>• Конфиденциально, без спама</li>
                  <li>• Подготовлю план и стоимость</li>
                </ul>
              </div>
              <div className="md:w-1/2 mt-6 md:mt-0">
                <form action="/api/lead" method="post" className="grid gap-3" aria-label="Форма заявки">
                  <label className="text-sm">Имя
                    <input name="name" required placeholder="Иван" className="mt-1 w-full rounded-md border px-3 py-2" />
                  </label>
                  <label className="text-sm">Телефон
                    <input name="phone" required placeholder="+7" className="mt-1 w-full rounded-md border px-3 py-2" inputMode="tel" />
                  </label>
                  <label className="text-sm">Ваш вопрос (кратко)
                    <textarea name="message" placeholder="Коротко — что случилось?" className="mt-1 w-full rounded-md border px-3 py-2 min-h-[96px]"></textarea>
                  </label>
                  {/* honeypot */}
                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <button className="mt-1 px-4 py-3 rounded-md bg-brand-600 text-white hover:bg-brand-700">Отправить заявку</button>
                </form>
                <p className="mt-2 text-xs text-slate-500">Нажимая «Отправить заявку», вы соглашаетесь с Политикой и Согласием на обработку персональных данных.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(jsonLdOrganization)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(jsonLdLocal)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(jsonLdBreadcrumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(jsonLdFAQ)} />
    </>
  )
}
