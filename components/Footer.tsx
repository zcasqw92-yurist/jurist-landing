import Container from './Container'
import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="border-t border-slate-200 mt-16" id="contacts">
      <Container className="py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-3">Контакты</h3>
          <p><strong>Тел.:</strong> <a href="tel:+78120000000" className="hover:underline">+7 (812) 000-00-00</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/79000000000" className="hover:underline">написать</a></p>
          <p><strong>Адрес:</strong> Санкт‑Петербург, Невский пр.</p>
          <p className="mt-2 text-slate-500">Работаю по СПб и Ленобласти. Возможна дистанционная помощь по РФ.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Документы</h3>
          <ul className="space-y-1">
            <li><Link href="/policy" className="hover:underline">Политика конфиденциальности</Link></li>
            <li><Link href="/offer" className="hover:underline">Публичная оферта</Link></li>
            <li><Link href="/consent" className="hover:underline">Согласие на обработку ПД</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Навигация</h3>
          <ul className="space-y-1">
            <li><a href="#services" className="hover:underline">Услуги</a></li>
            <li><a href="#cases" className="hover:underline">Кейсы</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © 2025 «Юрист СПб». Все права защищены.
      </div>
    </footer>
  )
}
