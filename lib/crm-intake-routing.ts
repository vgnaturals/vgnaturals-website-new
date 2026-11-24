/**
 * P0 Supabase intake CANARY for VG Naturals website enquiries and checkout.
 * Production stays on the already-live legacy endpoint until owner confirms
 * same reference in Supabase CRM Active and retry remains duplicate-free.
 * No secrets. Supabase Edge enforces Origin, consent, request validation,
 * rate controls and atomic idempotent record creation.
 */
export const supabaseIntakeUrl='https://ptlvcleylqkyithxthfb.supabase.co/functions/v1/vg-crm-intake';
export const currentIntakeFallback='https://vg-naturals-business.roundmars256.chatgpt.site/api/website-leads';
export function selectCrmIntakeEndpoint(search:string):string {
 const params=new URLSearchParams(search.startsWith('?')?search.slice(1):search);
 if(params.get('crmCanary')==='supabase')return supabaseIntakeUrl;
 return process.env.NEXT_PUBLIC_CRM_LEADS_ENDPOINT||currentIntakeFallback;
}

/**
 * Checkout is a high-intent transactional request. The former ChatGPT Sites
 * fallback is not a reliable order receiver (browser network failure).
 * Only checkout moves to the verified VG Naturals Supabase intake; enquiries
 * retain their independently gated existing/canary routing.
 */
export function selectCheckoutCrmIntakeEndpoint():string{
 return supabaseIntakeUrl;
}
