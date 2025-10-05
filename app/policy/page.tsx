import Container from '@/components/Container'

export const metadata = { title: 'Политика конфиденциальности' }

export default function Page(){
  return (
    <Container className="py-10 prose max-w-none">
      <h1>Политика конфиденциальности</h1>
      <p>Мы обрабатываем персональные данные в соответствии с законодательством РФ. Контакты для обращений: <a href="mailto:info@example.com">info@example.com</a>.</p>
      <p>Цели обработки: обратная связь по заявкам, исполнение договора, улучшение сервиса. Срок хранения — в пределах, необходимых для указанных целей.</p>
    </Container>
  )
}
