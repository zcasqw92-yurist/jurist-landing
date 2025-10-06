// lib/analytics.ts
declare global {
  interface Window {
    ym?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

/** Отправка события lead в Метрику и GA4 */
export function trackLead() {
  try {
    const ymId = Number(process.env.NEXT_PUBLIC_YM_ID);
    if (window.ym && ymId) window.ym(ymId, 'reachGoal', 'lead');
  } catch {}
  try {
    if (window.gtag) window.gtag('event', 'lead', { event_category: 'form', event_label: 'lead_submit' });
  } catch {}
}
