/**
 * Count a CRM-confirmed lead without sending name, phone, email, address,
 * order contents or internal CRM references to Google Analytics.
 * The same reference is counted once per browser session.
 */
export function recordCrmLeadSaved(leadType: 'enquiry' | 'order', savedReference: string): void {
  if (typeof window === 'undefined' || !savedReference.startsWith('website-')) return;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __vgMetaPixelOwned?: boolean;
  };
  const key = 'vg-analytics-counted:' + savedReference;
  try {
    if (window.sessionStorage.getItem(key) === '1') return;
  } catch { /* Cookies or session storage may be unavailable. */ }
  let tracked = false;
  if (typeof w.gtag === 'function') {
    try {
      w.gtag('event', 'vg_crm_lead_saved', {
        lead_type: leadType,
        lead_channel: 'website',
      });
      tracked = true;
    } catch { /* GA4 failure must never interrupt a successful enquiry. */ }
  }
  // Standard Meta Lead event only for a CRM-confirmed new record, after
  // optional marketing consent. No customer or order information is sent.
  if (w.__vgMetaPixelOwned && typeof w.fbq === 'function') {
    try {
      w.fbq('track', 'Lead');
      tracked = true;
    } catch { /* Meta failure must never interrupt a successful enquiry. */ }
  }
  if (tracked) {
    try { window.sessionStorage.setItem(key, '1'); } catch { /* optional dedupe */ }
  }
}
