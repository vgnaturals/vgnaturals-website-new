import type {Metadata} from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata:Metadata={
  title:'Contact VG Naturals | Essential Oil & Hydrosol Supplier in Lucknow',
  description:'Contact VG Naturals Private Limited in Lucknow for Lemongrass, Tulsi and Basil essential oils, hydrosols and botanical bulk supply. Call, WhatsApp or request a sourcing quotation.',
  alternates:{canonical:'/contact'},
  openGraph:{title:'Contact VG Naturals — Lucknow | B2B Botanical Sourcing',description:'Reach VG Naturals for botanical ingredient samples, product information and bulk quotations from Lucknow.',url:'/contact',type:'website'}
};

const businessAddress='1248 Royal City Phase 2, Aurangabad Jagir, B R A University, Lucknow – 226025, Uttar Pradesh, India';
const mapsUrl='https://maps.app.goo.gl/DKijZJYgtTrcKpzG9';
const buyerQuestions=[
  {q:'Where is VG Naturals based?',a:'VG NATURALS PRIVATE LIMITED is based in Aurangabad Jagir, Lucknow, Uttar Pradesh, India. Please call before visiting; product collection or in-person appointments must be confirmed by the team.'},
  {q:'Can a cosmetic manufacturer request a bulk quotation?',a:'Yes. For Lemongrass, Tulsi or Sweet Basil essential oils and hydrosols, send the product name, botanical identity, intended application, quantity and unit, required documents, preferred packaging and delivery PIN code. Available batches, specifications, MOQ and commercial terms are confirmed separately.'},
  {q:'Does VG Naturals accept enquiries from buyers outside Lucknow?',a:'Yes. Manufacturers, formulators, distributors and wholesalers elsewhere in India can enquire about listed products. Delivery feasibility, freight, dispatch and stock depend on the specific product and destination.'}
];
const schema={'@context':'https://schema.org','@graph':[
  {'@type':'ContactPage','@id':'https://www.vgnaturals.com/contact#page',url:'https://www.vgnaturals.com/contact',name:'Contact VG Naturals Pvt Ltd in Lucknow',inLanguage:'en-IN',about:{'@id':'https://www.vgnaturals.com/#organization'}},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://www.vgnaturals.com/'},{'@type':'ListItem',position:2,name:'Contact',item:'https://www.vgnaturals.com/contact'}]}
]};

export default function Contact(){
  return <>
    <PageHero eyebrow="Contact VG Naturals" title="Essential Oil & Hydrosol Supplier in Lucknow" description="Contact our Lucknow team about Lemongrass, Tulsi and Sweet Basil products, evaluation packs and B2B ingredient sourcing. We confirm availability and commercial terms for each request."/>
    <section className="section container contact-page">
      <nav aria-label="Breadcrumb" className="text-sm mb-6"><Link href="/">Home</Link> / <span>Contact</span></nav>
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <p className="eyebrow">Our business</p>
          <h2 className="mt-3">VG NATURALS PRIVATE LIMITED</h2>
          <p className="mt-4 leading-8">VG Naturals supplies essential oils, hydrosols, herbal teas and selected fresh botanicals. We welcome enquiries from manufacturers, cosmetic formulators, soap makers, private-label brands, distributors and other business buyers. For a useful quotation, share the exact product, quantity and application.</p>
          <address className="mt-5 not-italic leading-7">{businessAddress}</address>
          <p className="mt-3 text-sm leading-6">Our listed address is in Lucknow. Please contact the team before visiting or arranging collection; an online enquiry does not guarantee walk-in inventory.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn" href="tel:+919044210088">Call +91 90442 10088</a>
            <a className="btn btn-outline" href="https://wa.me/919044210088?text=Hello%20VG%20Naturals%2C%20I%20want%20to%20enquire%20about%20bulk%20essential%20oils%20or%20hydrosols.">WhatsApp our team</a>
            <a className="btn btn-outline" href={mapsUrl} target="_blank" rel="noopener noreferrer">View business location on Google Maps</a>
          </div>
          <p className="mt-4 text-sm">Email: <a className="underline" href="mailto:vgnaturalspvtltd@gmail.com">vgnaturalspvtltd@gmail.com</a></p>
        </div>
        <aside className="card p-6">
          <p className="eyebrow">For B2B buyers</p>
          <h2 className="mt-3">Request an accurate bulk quote</h2>
          <p className="mt-3 leading-7">Include your company name, product and botanical name, required quantity, application, preferred packaging, document requirements, delivery PIN code and target delivery date. Retail-pack prices do not represent bulk quotations.</p>
          <Link href="/bulk-supply" className="btn mt-5">Submit a bulk enquiry</Link>
          <h3 className="text-xl mt-7">Products commonly requested</h3>
          <ul className="mt-3 space-y-3">
            <li><Link href="/products/lemongrass-essential-oil" className="underline">Lemongrass Essential Oil — Cymbopogon flexuosus</Link></li>
            <li><Link href="/products/lemongrass-hydrosol" className="underline">Lemongrass Hydrosol</Link></li>
            <li><Link href="/products/tulsi-essential-oil" className="underline">Tulsi Essential Oil — Ocimum sanctum</Link></li>
            <li><Link href="/products/basil-essential-oil" className="underline">Sweet Basil Essential Oil — Ocimum basilicum</Link></li>
          </ul>
        </aside>
      </div>
      <section className="mt-12" aria-labelledby="sourcing-questions">
        <h2 id="sourcing-questions">Questions buyers ask before contacting us</h2>
        <div className="grid gap-5 md:grid-cols-3 mt-5">{buyerQuestions.map(item=><article className="card p-6" key={item.q}><h3 className="text-xl">{item.q}</h3><p className="mt-3 leading-7">{item.a}</p></article>)}</div>
      </section>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
  </>;
}
