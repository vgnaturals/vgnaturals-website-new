'use client';

import {useEffect, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';

// A Meta Pixel/Dataset ID is a public identifier, NOT an access token.
// Intentionally disabled until the owner verifies the actual ID in Events Manager.
// Never copy IDs from another business or the connected Facebook Page ID.
const pixelId = (process.env.NEXT_PUBLIC_META_PIXEL_ID || '').trim();
const validPixelId = /^\d{10,20}$/.test(pixelId);
const consentStorageKey = 'vg-meta-marketing-choice';

type Consent = 'loading' | 'unset' | 'accepted' | 'declined';
type PixelWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  __vgMetaPixelOwned?: boolean;
};

/**
 * Meta Pixel: optional, consent-gated and no-op without a verified ID.
 * - PageView on the first approved load and on subsequent App Router navigation.
 * - Do not initialise when another source (for example GTM) already owns fbq.
 * - Lead is only sent by recordCrmLeadSaved after confirmed CRM acknowledgement.
 * - No customer PII, order amounts, or browser form fields are transmitted by us.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);
  const [consent, setConsent] = useState<Consent>('loading');

  useEffect(() => {
    if (!validPixelId) return;
    try {
      const stored = window.localStorage.getItem(consentStorageKey);
      setConsent(stored === 'accepted' ? 'accepted' : stored === 'declined' ? 'declined' : 'unset');
    } catch {
      setConsent('unset');
    }
  }, []);

  useEffect(() => {
    if (!validPixelId || consent !== 'accepted' || pathname === lastPath.current) return;
    lastPath.current = pathname;
    const win = window as PixelWindow;
    if (win.__vgMetaPixelOwned && typeof win.fbq === 'function') {
      try { win.fbq('track', 'PageView'); } catch { /* Analytics must never disrupt navigation. */ }
    }
  }, [pathname, consent]);

  if (!validPixelId) return null;

  const decide = (value: 'accepted' | 'declined') => {
    try { window.localStorage.setItem(consentStorageKey, value); } catch { /* Keep an in-memory choice. */ }
    setConsent(value);
  };

  // ID is strictly numeric before interpolation. If GTM has already installed
  // fbq, do not install a duplicate Pixel or emit duplicate initial PageViews.
  const pixelBootstrap = `(function(){
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;
      n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.__vgMetaPixelOwned=true;
    fbq('init','${pixelId}');
    fbq('track','PageView');
  })();`;

  return <>
    {consent === 'unset' && (
      <aside
        role="region"
        aria-label="Optional marketing analytics choice"
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-green-700 bg-[#173c2a] p-4 text-white shadow-xl"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <p className="max-w-2xl text-sm leading-relaxed">
            May we use an optional Meta Pixel to understand visits and confirmed website enquiries?
            We do not share your enquiry contact details with this Pixel.{' '}
            <Link className="underline" href="/privacy-policy">Privacy policy</Link>.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => decide('declined')} className="rounded border border-white px-3 py-2 text-sm">Decline</button>
            <button type="button" onClick={() => decide('accepted')} className="rounded bg-white px-3 py-2 text-sm font-semibold text-[#173c2a]">Allow optional marketing analytics</button>
          </div>
        </div>
      </aside>
    )}
    {consent === 'accepted' && (
      <Script id="vg-meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{__html: pixelBootstrap}} />
    )}
  </>;
}
