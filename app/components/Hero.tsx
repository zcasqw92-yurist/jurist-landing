import Image from "next/image";
import LeadForm from "./LeadForm";

export default function Hero({ sent }: { sent: boolean }) {
  return (
    <section className="bg-gray-50 py-12 md:py-16 border-b">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* ЛЕВО: заголовок и кнопки */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-600">
            Юрист • СПб • досудебные документы
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Юрист в Санкт-Петербурге — досудебные претензии, жалобы, иски
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Разберу ваш случай и укажу верные шаги: без лишних походов в суд.
            Работаю по ЗоЗПП и ГК РФ. Быстро, минимально, по делу.
          </p>

          <div className="mt-6 flex gap-3">
            <a href="#lead" className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition">
              Разобрать мой случай
            </a>
            <a href="#services" className="rounded-md border px-4 py-2 hover:bg-gray-50 transition">
              Список услуг
            </a>
          </div>

          {sent && (
            <p className="mt-4 text-green-600">
              Заявка отправлена, мы свяжемся с вами.
            </p>
          )}
        </div>

        {/* ПРАВО: карточка с фото + форма во втором экране */}
        <div className="md:ml-auto">
          <div className="rounded-2xl bg-white border shadow-sm p-4 md:p-6">
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src="/hero.png"
                alt="Досудебные претензии и возврат денег — СПб"
                width={1000}
                height={700}
                className="w-full h-auto"
                priority
              />
              <div className="absolute top-3 right-3 rounded-full bg-white/90 border px-3 py-1 text-sm">
                20+ кейсов
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Досудебные претензии и возврат денег — СПб. Разбор случая бесплатно.
            </div>
          </div>
        </div>
      </div>

      {/* Сразу после героя — компактная форма (дублируем CTA) */}
      <div id="lead" className="max-w-3xl mx-auto px-6 mt-10">
        <div className="rounded-2xl bg-white border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-3">Разберём ваш случай бесплатно</h2>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
