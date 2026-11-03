/**
 * Count a CRM-confirmed lead without sending name, phone, email, address,
 * order contents or internal CRM references to Google Analytics.
 * The same reference is counted once per browser session.
 */
export function recordCrmLeadSaved(leadType: 'enquiry' | 'order', savedReference: string): void {
  if (typeof window === 'undefined' || !savedReference.startsWith('website-')) return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== 'function') return;
  const key = 'vg-analytics-counted:' + savedReference;
  try {
    if (window.sessionStorage.getItem(key) === '1') return;
  } catch { /* Cookies or session storage may be unavailable. */ }
  try {
    w.gtag('event', 'vg_crm_lead_saved', {
      lead_type: leadType,
      lead_channel: 'website',
    });
    try { window.sessionStorage.setItem(key, '1'); } catch { /* optional dedupe */ }
  } catch { /* Never interrupt a successful enquiry/checkout because of analytics. */ }
}
