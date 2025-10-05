'use client'

import { useEffect, useState } from 'react'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const YM_ID = process.env.NEXT_PUBLIC_YM_COUNTER_ID

export default function ConsentBanner(){
  const [visible, setVisible] = useState(false)

  useEffect(()=>{
    const v = localStorage.getItem('cookie-consent')
    if(!v){ setVisible(true) }
  },[])

  function accept(){
    localStorage.setItem('cookie-consent', 'true')
    setVisible(false)
    // Dynamically load analytics only after consent
    if (GA_ID){
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(s)
      const inline = document.createElement('script')
      inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`
      document.head.appendChild(inline)
    }
    if (YM_ID){
      const s = document.createElement('script')
      s.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];
        k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
        ym(${YM_ID}, 'init', {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});
      `
      document.head.appendChild(s)
      const nos = document.createElement('noscript')
      nos.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${YM_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`
      document.body.appendChild(nos)
    }
  }

  if(!visible) return null
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 max-w-lg card p-4">
      <p className="text-sm">Мы используем файлы cookie и аналогичные технологии для анализа и улучшения сайта. Нажимая «Согласен», вы разрешаете сбор обезличенных данных об использовании сайта.</p>
      <div className="mt-3 flex gap-2 justify-end">
        <button onClick={()=>setVisible(false)} className="px-3 py-2 rounded-md border">Отклонить</button>
        <button onClick={accept} className="px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Согласен</button>
      </div>
    </div>
  )
}
