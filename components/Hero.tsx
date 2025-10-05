// components/Hero.tsx
import Image from "next/image";
import { getSupabaseAdmin } from "@/lib/supabase";

export const revalidate = 3; // обновление каждые 3 секунд (ISR)

export default async function Hero() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("settings").select("value").eq("key", "hero").single();
  const hero = data?.value ?? {};

  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-sm text-gray-500 mb-3">{hero.badge ?? "Юрист · СПб · досудебные документы"}</div>
          <h1 className="h1">{hero.title ?? "Юрист в Санкт-Петербурге — досудебные претензии, жалобы, иски"}</h1>
          <p className="subtitle mt-4">
            {hero.subtitle ?? "Разберу ваш случай и укажу верные шаги: без лишних походов в суд."}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="#lead" className="btn btn-primary">
              {hero.ctaPrimary ?? "Разобрать мой случай"}
            </a>
            <a href="#services" className="btn btn-ghost">
              {hero.ctaSecondary ?? "Список услуг"}
            </a>
          </div>
        </div>

        <figure className="card p-2">
          <div className="relative">
            <span className="absolute right-3 top-3 z-10 text-xs bg-white/90 border border-gray-200 px-2 py-1 rounded-full">
              20+ кейсов
            </span>
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
