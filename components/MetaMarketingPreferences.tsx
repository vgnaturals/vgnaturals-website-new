'use client';

const consentStorageKey = 'vg-meta-marketing-choice';

export default function MetaMarketingPreferences() {
  if (!/^\d{10,20}$/.test(process.env.NEXT_PUBLIC_META_PIXEL_ID || '')) return null;

  function changePreference() {
    try { window.localStorage.removeItem(consentStorageKey); } catch { /* Optional browser storage. */ }
    window.location.reload();
  }

  return <button type="button" onClick={changePreference} className="mt-4 rounded border border-green-800 px-3 py-2 text-sm text-green-900">
    Change optional marketing analytics preference
  </button>;
}
