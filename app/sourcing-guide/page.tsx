import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { products } from '@/data/products';

const url = 'https://www.vgnaturals.com/sourcing-guide';
export const metadata: Metadata = {
  title: 'Botanical Product Buying Guide | Packs & Bulk Enquiries',
  description: 'Compare VG Naturals essential oils, hydrosols, herbal teas and fresh botanicals. Check listed packs, bulk quote requirements and Lucknow collection guidance.',
  alternates: { canonical: '/sourcing-guide' },
  openGraph: { title: 'VG Naturals Botanical Product Buying Guide', description: 'Listed packs, product availability and a practical checklist for B2B enquiries.', url, type: 'website' },
};
const questions = [
  ['How do I request a bulk quotation from VG Naturals?', 'Send the exact product name, required quantity and unit, intended application, delivery PIN code and required date. Include your company name and any specification or documentation requirements. Bulk prices, minimum order quantities, packaging, freight and dispatch timing are confirmed in the quotation.'],
  ['Are the listed retail prices also the wholesale prices?', 'No. The prices below are for the listed retail packs. Bulk prices are quoted separately for your quantity and requirements. Packaging and courier charges are not included in the listed prices; ask for the final payable amount before confirming an order.'],
  ['Can I buy lemongrass, tulsi and basil products in Lucknow?', 'VG Naturals is based in Aurangabad Jagir, Lucknow. The listed range includes essential oils, hydrosols, teas and selected home-care products. Fresh Tulsi and Basil leaves require harvest and delivery confirmation. Call +91 90442 10088 before visiting or arranging collection.'],
  ['Are Tulsi and Basil the same product in this catalogue?', 'No. VG Naturals lists Tulsi as Ocimum sanctum and Basil as Ocimum basilicum. Specify the product and botanical name in your enquiry so the team can quote the correct range.'],
  ['What should a manufacturer ask before evaluating a sample?', 'Share the intended application and required specification. Ask which batch information, composition details, technical documents and sample options are available for that exact product. Document availability and suitability must be confirmed; a product listing does not establish a particular certification or grade.'],
  ['Can I order fresh leaves or Coming Soon products immediately?', 'Fresh leaves depend on harvest availability, destination and delivery timing. Coming Soon items are for registering interest only; no immediate stock or launch date is promised. Ask the team to confirm status before making purchase plans.'],
  ['Does a website enquiry confirm my order or delivery date?', 'An enquiry or order request starts a conversation with the team. Confirm availability, final quotation, payment arrangements and dispatch timing with VG Naturals before treating an order as confirmed.'],
];
export default function SourcingGuide() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url + '#page',
    url, name: 'VG Naturals Botanical Product Buying Guide',
    about: { '@id': 'https://www.vgnaturals.com/#organization' },
    mainEntity: { '@type': 'ItemList', itemListElement: products.map((p, i) => ({
      '@type': 'ListItem', position: i + 1, name: p.name, url: 'https://www.vgnaturals.com/products/' + p.slug,
    })) },
  };
  return <><PageHero eyebrow="Buyer guide" title="Buying botanical products from VG Naturals" description="Compare the listed range and prepare a clear enquiry for retail packs, samples or B2B bulk supply." />
    <article className="section container">
      <nav aria-label="Breadcrumb" className="text-sm"><Link href="/">Home</Link> / <span>Buying guide</span></nav>
      <p className="mt-6 max-w-4xl leading-7">VG NATURALS PRIVATE LIMITED supplies botanical products from Lucknow, Uttar Pradesh. Use the catalogue below to identify your product and pack, then share your quantity and delivery location for confirmation. Listed packs and prices come from the same catalogue used on our product pages.</p>
      <section className="mt-10" aria-labelledby="range-heading">
        <h2 id="range-heading">Product range, listed packs and availability</h2>
        <p className="my-4 leading-7">Retail packs listed does not guarantee immediate stock. Packaging and courier charges are extra. Bulk quantities and prices are confirmed separately.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <caption className="text-left mb-3 text-sm">VG Naturals catalogue — follow a product link for its full details and FAQs.</caption>
            <thead><tr className="bg-green-50">{['Product','Category','Listed packs','Ordering status'].map(h=><th key={h} scope="col" className="p-4">{h}</th>)}</tr></thead>
            <tbody>{products.map(p=><tr key={p.slug} className="border-b border-green-100">
              <th scope="row" className="p-4"><Link href={'/products/'+p.slug} className="underline text-green-900">{p.name}</Link></th>
              <td className="p-4">{p.category}</td>
              <td className="p-4">{p.variants.length ? p.variants.map(v=>v.label+' — ₹'+v.price).join(' / ') : 'Not yet listed'}</td>
              <td className="p-4">{p.status==='ready' ? 'Retail packs listed; confirm stock' : p.status==='fresh' ? 'Confirm harvest and delivery' : 'Coming Soon — register interest'}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className="mt-10 card p-6 sm:p-8" aria-labelledby="quote-heading">
        <h2 id="quote-heading">A bulk enquiry your purchasing team can copy</h2>
        <p className="mt-4 leading-7">Product and botanical name: …<br/>Required quantity and unit: …<br/>Application or product specification: …<br/>Sample or bulk requirement: …<br/>Company and contact name: …<br/>Delivery city and PIN code: …<br/>Required date: …<br/>Documents or packaging requirements: …</p>
        <Link href="/bulk-supply" className="btn mt-5">Send a bulk enquiry</Link>
      </section>
      <section className="mt-10" aria-labelledby="answers-heading">
        <h2 id="answers-heading">Questions buyers ask before ordering</h2>
        <div className="mt-6 space-y-6">{questions.map(([q,a])=><section key={q}><h3 className="text-xl font-semibold">{q}</h3><p className="mt-2 max-w-4xl leading-7">{a}</p></section>)}</div>
      </section>
      <section className="mt-10 card p-6 sm:p-8" aria-labelledby="location-heading">
        <h2 id="location-heading">Lucknow location and product enquiries</h2>
        <address className="mt-4 not-italic leading-7">VG NATURALS PRIVATE LIMITED, 1248 Royal City Phase 2, Aurangabad Jagir, B R A University, Lucknow – 226025, Uttar Pradesh, India.</address>
        <p className="mt-3 leading-7">For courier enquiries, share your PIN code so the team can check delivery feasibility and charges. Please call before travelling to confirm stock and whether a visit or collection can be arranged.</p>
        <div className="mt-5 flex flex-wrap gap-4"><a className="btn" href="tel:+919044210088">Call +91 90442 10088</a><Link className="btn" href="/contact">Contact and directions</Link><a className="underline self-center" href="mailto:vgnaturalspvtltd@gmail.com">vgnaturalspvtltd@gmail.com</a></div>
      </section>
      <p className="mt-8 leading-7">More product guidance: <Link className="underline" href="/blog/tulsi-vs-basil">Tulsi and Basil identities</Link> · <Link className="underline" href="/blog/essential-oil-bulk-buying">Essential oil buying checklist</Link> · <Link className="underline" href="/blog/what-is-a-hydrosol">Hydrosol sourcing guide</Link>.</p>
    </article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
  </>;
}
