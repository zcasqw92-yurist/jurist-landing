import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  const data = await req.formData()
  const name = (data.get('name') || '').toString().slice(0, 200)
  const phone = (data.get('phone') || '').toString().slice(0, 100)
  const message = (data.get('message') || '').toString().slice(0, 1000)
  const website = (data.get('website') || '').toString()

  // Simple honeypot check
  if (website) {
    return NextResponse.json({ ok: true })
  }

  // Here you can forward to email/CRM/Telegram bot via a webhook.
  // For now, we just log on the server and return success.
  console.log('New lead:', { name, phone, message, ts: new Date().toISOString() })

  return NextResponse.redirect(new URL('/?sent=1', req.url), { status: 303 })
}
