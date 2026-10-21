import Link from 'next/link';
import type { Product } from '@/data/products';

const guidance: Record<string, string> = {
  'Essential Oils': 'For fragrance, soap and personal-care ingredient enquiries, share your intended application and request the available batch specifications before evaluating a sample.',
  Hydrosols: 'For water-based formulations, ask about composition, preservation, storage and available technical information before evaluating compatibility with your formulation.',
  'Herbal Teas': 'Retailers, cafes and hospitality buyers can ask about ingredients, pouch quantities, label information and wholesale supply before ordering.',
  'Fresh Botanicals': 'Fresh-leaf orders depend on harvest availability and delivery time. Share your required date, quantity and delivery PIN code before confirming an order.',
  'Home Care': 'For room-fragrance sourcing, ask about pack sizes, label directions and wholesale quantities. Confirm suitability for your intended setting before purchase.',
  Agriculture: 'Share the planting quantity, destination and preferred delivery date. Confirm planting-material availability and handling requirements with our team.',
};

export default function LocalSourcing({ product: p }: { product: Product }) {
  const upcoming = p.status === 'coming-soon';
  const quoteUrl = `/bulk-supply?product=${encodeURIComponent(p.name)}`;
  return <section aria-labelledby="local-sourcing-heading" className="mt-12 card p-6 sm:p-8">
    <p className="eyebrow">Local sourcing · Lucknow</p>
    <h2 id="local-sourcing-heading" className="mt-2">{upcoming ? `Can I enquire about ${p.name} in Lucknow?` : `Where can I buy ${p.name} in Lucknow?`}</h2>
    <p className="mt-4 leading-7">{upcoming
      ? `${p.name} is listed as Coming Soon at VG Naturals in Lucknow. You can register interest, but orders and immediate availability are not confirmed. Ask our team about the latest status before making purchase plans.`
      : `VG Naturals supplies ${p.name}${p.botanicalName ? ` (${p.botanicalName})` : ''} from Aurangabad Jagir, Lucknow, Uttar Pradesh. ${p.status === 'fresh' ? 'Supply is subject to harvest availability and delivery feasibility.' : 'Retail pack and B2B bulk enquiries are welcome.'}`}</p>
    {!upcoming && p.variants.length > 0 && <p className="mt-3 leading-7">Listed packs: {p.variants.map(v => `${v.label} at ₹${v.price}`).join(' · ')}. Packaging and courier charges are not included. Bulk pricing and minimum order quantities are confirmed separately on enquiry.</p>}
    <address className="mt-4 not-italic leading-7">VG NATURALS PRIVATE LIMITED, 1248 Royal City Phase 2, Aurangabad Jagir, B R A University, Lucknow – 226025, Uttar Pradesh, India.</address>
    <h3 className="mt-6 text-xl font-semibold">{upcoming ? 'What should I confirm before ordering?' : `Looking for ${p.name} near you?`}</h3>
    <p className="mt-3 leading-7">Check our Lucknow location on Google Maps to see the distance from you. Please call before travelling to confirm {upcoming ? 'product status' : 'stock'} and whether a visit or collection can be arranged. For courier enquiries, share your delivery PIN code so our team can confirm feasibility, charges and dispatch timing.</p>
    <p className="mt-3 leading-7">{guidance[p.category] || 'Share your intended use, quantity and delivery location. Ask our team to confirm product specifications and availability before ordering.'}</p>
    <div className="mt-5 flex flex-wrap gap-4"><a className="btn" href="tel:+919044210088">Call +91 90442 10088</a><a className="btn" href="https://maps.app.goo.gl/DKijZJYgtTrcKpzG9">View Lucknow location</a><Link className="btn" href={quoteUrl}>{upcoming ? 'Register Product Interest' : 'Request Product Quote'}</Link></div>
    <p className="mt-5 leading-7"><Link className="underline" href="/sourcing-guide">Compare listed packs and prepare your bulk enquiry</Link>.</p>
    <p className="mt-5 leading-7"><Link className="underline" href="/contact">Contact our Lucknow team</Link>{p.category === 'Essential Oils' && <> or read our <Link className="underline" href="/blog/essential-oil-bulk-buying">essential oil buying checklist</Link></>}{p.category === 'Hydrosols' && <> or read our <Link className="underline" href="/blog/what-is-a-hydrosol">hydrosol sourcing guide</Link></>}.</p>
  </section>;
}
