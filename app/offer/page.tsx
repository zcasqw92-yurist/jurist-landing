import Container from '@/components/Container'

export const metadata = { title: 'Публичная оферта' }

export default function Page(){
  return (
    <Container className="py-10 prose max-w-none">
      <h1>Публичная оферта</h1>
      <p>Данный документ является предложением заключить договор оказания юридических услуг. Договор считается заключённым с момента оплаты счета или акцепта в переписке.</p>
    </Container>
  )
}
