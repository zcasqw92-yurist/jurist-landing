import Image from 'next/image';
import { loadSettings, type HeroSettings } from '@/lib/settings';

// Раз в 60 секунд страница может пересобираться со свежими данными из БД
export const revalidate = 300; // ISR. Если хочешь всегда свежие — см. ниже вариант с dynamic.

export default async function Hero() {
  // 1) Грузим hero-настройки
  const hero = (await loadSettings<HeroSettings>('hero')) ?? {};

  // 2) Фоллбэки на случай, если ключа ещё нет
  const badge = hero.badge ?? 'Юрист · СПб · досудебные документы';
  const title = hero.title ?? 'Юрист в Санкт-Петербурге — досудебные претензии, жалобы, иски';
  const subtitle = hero.subtitle ?? 'Разберу ваш случай и укажу верные шаги...';
  const ctaPrimary = hero.ctaPrimary ?? 'Разобрать мой случай';
  const ctaSecondary = hero.ctaSecondary ?? 'Список услуг';

  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-sm text-gray-500 mb-3">{badge}</div>
          <h1 className="h1">{title}</h1>
          <p className="subtitle mt-4">{subtitle}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="#lead" className="btn btn-primary">{ctaPrimary}</a>
            <a href="#services" className="btn btn-ghost">{ctaSecondary}</a>
          </div>
        </div>

        <figure className="card p-2">
          <div className="relative">
            <span className="absolute right-3 top-3 z-10 text-xs bg-white/90 border border-gray-200 px-2 py-1 rounded-full">20+ кейсов</span>
            <Image
              src="/hero.jpg"
              alt="Досудебные претензии и возврат денег — СПб"
              width={800}
              height={480}
              className="rounded-xl border border-gray-200 w-full h-auto object-cover"
              priority
            />
          </div>
          <figcaption className="text-sm text-gray-600 px-2 pt-2">
            Досудебные претензии и возврат денег — СПб. Разбор случая бесплатно.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
