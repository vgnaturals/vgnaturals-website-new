import Link from 'next/link';
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

const explore = [
  ['/products', 'All products'], ['/categories', 'Categories'], ['/industries', 'Industries'],
  ['/about', 'Our story'], ['/blog', 'Journal'], ['/coming-soon', 'Coming soon'],
];
const business = [
  ['/bulk-supply', 'Bulk supply'], ['/catalogue', 'Product catalogue'], ['/contact', 'Contact us'],
];
const policies = [
  ['/privacy-policy', 'Privacy'], ['/terms-and-conditions', 'Terms'],
  ['/shipping-policy', 'Shipping'], ['/refund-policy', 'Refunds'],
];
const whatsapp = 'https://wa.me/919044210088?text=' + encodeURIComponent('Hello VG Naturals, I would like to discuss a product requirement.');
const linkStyle = 'inline-flex min-h-9 items-center text-sm text-[#cfdbd1] transition-colors hover:text-[#edcf87] focus-visible:outline-[#edcf87]';

export default function Footer() {
  return (
    <footer className="border-t border-[#dce3d5] bg-[#122f25] text-white">
      <div className="bg-[#eef1e7] text-[#214b36]">
        <div className="container flex flex-col gap-6 py-9 md:flex-row md:items-center md:justify-between md:py-11">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#61734f]">Let’s grow your product range</p>
            <h2 className="font-serif text-2xl font-normal sm:text-3xl">Your next botanical ingredient starts here.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#53604e]">Tell us what you need, how much, and where. We’ll help you take the next step.</p>
          </div>
          <Link href="/bulk-supply" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-4 self-start rounded-full bg-[#214b36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#163726] md:self-center">
            Request Bulk Quote <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-x-7 gap-y-10 lg:grid-cols-[1.35fr_0.7fr_0.85fr_1.3fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label="VG Naturals home" className="inline-flex rounded-2xl bg-[#faf9f4] p-3">
              <img src="/catalogue-assets/vg-naturals-leaf-gold-logo.png" alt="VG Naturals" width={88} height={88} loading="lazy" className="h-[88px] w-[88px] object-contain" />
            </Link>
            <p className="mt-5 text-sm font-semibold tracking-wide text-[#edcf87]">Pure • Natural • Organic Care</p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-[#cfdbd1]">Essential oils, hydrosols and botanical products from Lucknow, India. For your business and everyday needs.</p>
            <div className="mt-5 flex gap-3">
              <a href="https://www.instagram.com/vgnaturalspvtltd/" aria-label="VG Naturals on Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"><Instagram size={19} aria-hidden="true" /></a>
              <a href="https://www.facebook.com/profile.php?id=61593880927070" aria-label="VG Naturals on Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"><Facebook size={19} aria-hidden="true" /></a>
              <a href={whatsapp} aria-label="Chat with VG Naturals on WhatsApp" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"><MessageCircle size={19} aria-hidden="true" /></a>
            </div>
          </div>

          <nav aria-label="Footer explore">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#edcf87]">Explore</h3>
            <ul className="space-y-1">{explore.map(([href, label]) => <li key={href}><Link href={href} className={linkStyle}>{label}</Link></li>)}</ul>
          </nav>

          <nav aria-label="Footer business">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#edcf87]">For your business</h3>
            <ul className="space-y-1">{business.map(([href, label]) => <li key={href}><Link href={href} className={linkStyle}>{label}</Link></li>)}</ul>
            <Link href="/catalogue" className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[#edcf87]/50 text-sm text-[#edcf87]">View catalogue <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </nav>

          <div className="col-span-2 min-w-0 lg:col-span-1">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#edcf87]">Let’s talk</h3>
            <a href="tel:+919044210088" className="flex min-h-11 items-center gap-3 text-lg font-medium hover:text-[#edcf87]"><Phone size={17} className="shrink-0 text-[#edcf87]" aria-hidden="true" />+91 90442 10088</a>
            <a href="mailto:vgnaturalspvtltd@gmail.com" className="mt-2 flex min-h-11 items-center gap-3 text-sm text-[#cfdbd1] hover:text-[#edcf87]"><Mail size={17} className="shrink-0 text-[#edcf87]" aria-hidden="true" /><span className="break-all">vgnaturalspvtltd@gmail.com</span></a>
            <div className="mt-5 flex gap-3 border-t border-white/10 pt-5"><MapPin size={18} className="mt-1 shrink-0 text-[#edcf87]" aria-hidden="true" /><address className="text-sm not-italic leading-7 text-[#cfdbd1]">1248 Royal City Phase 2,<br />Aurangabad Jagir, B R A University,<br />Lucknow – 226025, Uttar Pradesh, India</address></div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-6 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-6 text-[#aebfb2]">© {new Date().getFullYear()} VG Naturals Private Limited.</p>
          <nav aria-label="Footer policies" className="flex flex-wrap gap-x-5 gap-y-1">{policies.map(([href, label]) => <Link href={href} key={href} className="inline-flex min-h-9 items-center text-xs text-[#cfdbd1] hover:text-[#edcf87]">{label}</Link>)}</nav>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-[#aebfb2]">Product availability and commercial terms are subject to confirmation.</p>
      </div>
    </footer>
  );
}
