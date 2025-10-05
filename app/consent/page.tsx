import Container from '@/components/Container'

export const metadata = { title: 'Согласие на обработку персональных данных' }

export default function Page(){
  return (
    <Container className="py-10 prose max-w-none">
      <h1>Согласие на обработку персональных данных</h1>
      <p>Отправляя форму на сайте, вы даёте согласие на обработку персональных данных в целях связи по вашему обращению, заключения и исполнения договора.</p>
    </Container>
  )
}
