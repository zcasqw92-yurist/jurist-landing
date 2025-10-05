import Image from 'next/image';

export default function Hero() {
  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-sm text-gray-500 mb-3">Юрист · СПб · досудебные документы</div>
          <h1 className="h1">Юрист в Санкт-Петербурге — досудебные претензии, жалобы, иски</h1>
          <p className="subtitle mt-4">
            Разберу ваш случай и укажу верные шаги: без лишних походов в суд. Работаю по ЗоЗПП и ГК РФ. Быстро, по делу.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="#lead" className="btn btn-primary">Разобрать мой случай</a>
            <a href="#services" className="btn btn-ghost">Список услуг</a>
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
