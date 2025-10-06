// lib/analytics.ts

// Безопасные врапперы (не упадут, если скрипты еще не подгружены)
function ymSafe(...args: any[]) {
  try { (window as any)?.ym?.(...args); } catch {}
}

function gtagSafe(...args: any[]) {
  try { (window as any)?.gtag?.(...args); } catch {}
}

// Простая защита от дублей событий (за 10 сек не дублируем)
function dedupe(key: string, ttlMs = 10_000) {
  try {
    const now = Date.now();
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const ts = Number(raw);
      if (!Number.isNaN(ts) && now - ts < ttlMs) return false;
    }
    sessionStorage.setItem(key, String(now));
  } catch {}
  return true;
}

type LeadPayload = {
  status?: 'success' | 'error';
  label?: string;          // например, 'lead_submit'
  value?: number;          // 1
  page?: string | null;    // window.location.pathname + search
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
};

// ВАЖНО: замените на ваш ID счётчика Метрики и GA4
const METRIKA_ID = 103459152;     // <-- ваш номер Я.Метрики
const GA4_ID = 'G-XXXXXXX';      // <-- ваш ID потока GA4 (должен быть подключён в layout)

export function trackLead(data: LeadPayload = {}) {
  if (typeof window === 'undefined') return;

  const {
    status = 'success',
    label = 'lead_submit',
    value = 1,
    page = window.location?.pathname + window.location?.search || '',
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  } = data;

  const key = `lead_${status}_${label}_${page}`;
  if (!dedupe(key)) return;

  // Яндекс.Метрика — цель 'lead' (можно различать по статусу)
  ymSafe(METRIKA_ID, 'reachGoal', status === 'success' ? 'lead' : 'lead_error', {
    label, page, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  });

  // GA4 — событие 'lead' или 'lead_error'
  gtagSafe('event', status === 'success' ? 'lead' : 'lead_error', {
    event_category: 'form',
    event_label: label,
    value,
    page_location: window.location?.href,
    page_path: page,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  });
}

// Универсальный трекер (пригодится для других CTA)
export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  const key = `evt_${name}_${JSON.stringify(params)}`;
  if (!dedupe(key, 3000)) return;

  ymSafe(METRIKA_ID, 'reachGoal', name, params);
  gtagSafe('event', name, params);
}
