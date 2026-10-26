import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { botanicalRanges, getBotanicalRange } from '@/data/botanical-ranges';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import PageHero from '@/components/PageHero';
import TulsiBuyingDetails from '@/components/TulsiBuyingDetails';

export function generateStaticParams() { return botanicalRanges.map(r => ({ slug: r.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getBotanicalRange((await params).slug); if (!r) notFound();
  const title = r.slug === 'tulsi' ? 'Tulsi (Ocimum sanctum) | Oil, Tea & Leaves in India' : `${r.name} Products in India | Retail & Bulk Enquiries`;
  const description = `${r.name} (${r.botanical}) products from VG Naturals, Lucknow. Compare listed packs and enquire about bulk supply and delivery to your Indian PIN code.`;
  return { title, description, alternates: { canonical: `/botanicals/${r.slug}` }, openGraph: { title, description, url: `/botanicals/${r.slug}`, type: 'website' } };
}
export default async function BotanicalRange({ params }: { params: Promise<{ slug: string }> }) {
  const r = getBotanicalRange((await params).slug); if (!r) notFound();
  const range = products.filter(p => p.slug.includes(r.slug));
  const url = `https://www.vgnaturals.com/botanicals/${r.slug}`;
  const schema = [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url+'#collection', url, name: `${r.name} products from VG Naturals`, description: r.introduction, publisher: { '@id': 'https://www.vgnaturals.com/#organization' }, mainEntity: { '@type': 'ItemList', itemListElement: range.map((p,i) => ({ '@type': 'ListItem', position: i+1, name: p.name, url: `https://www.vgnaturals.com/products/${p.slug}` })) } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.vgnaturals.com/' }, { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.vgnaturals.com/products' }, { '@type': 'ListItem', position: 3, name: r.name, item: url } ] },
  ];
  return <><PageHero eyebrow="Botanical range · India enquiries" title={`${r.name} products for retail and bulk sourcing`} description={r.introduction}/>
    <section className="section container">
      <nav aria-label="Breadcrumb" className="text-sm mb-6"><Link href="/">Home</Link> / <Link href="/products">Products</Link> / <span>{r.name}</span></nav>
      <h2>{r.name}: botanical identity and product forms</h2><p className="mt-4 mb-8 max-w-4xl leading-7">{r.identity}</p>
      <div className="grid-products">{range.map(p=><ProductCard key={p.slug} product={p}/>)}</div>
      {r.slug === 'tulsi' && <TulsiBuyingDetails />}
      {r.slug === 'basil' && <aside className="card p-6 mt-8"><h2 className="text-2xl">Fresh Basil leaves for kitchens and bulk buyers</h2><p className="mt-3 leading-7">Looking for fresh sweet basil for pesto, pasta or pizza preparations? Compare the current leaf pack with our separate oil, hydrosol and tea listings. For restaurant or wholesale supply, share the required weight, delivery frequency and PIN code; harvest and delivery need confirmation.</p><Link className="inline-block mt-4 underline text-green-900" href="/blog/fresh-basil-leaves-buying-storage-guide">Fresh Basil leaves: uses, prices, storage and buying questions</Link></aside>}
      <section className="mt-12 card p-6 sm:p-8" aria-labelledby="india-enquiry">
        <h2 id="india-enquiry">{r.name} sourcing enquiries from across India</h2>
        <p className="mt-4 leading-7">VG NATURALS PRIVATE LIMITED is based in Lucknow, Uttar Pradesh. We welcome enquiries from buyers across India. Share your city and PIN code so the team can confirm courier feasibility, packaging charges, freight and dispatch timing. An enquiry does not guarantee stock or service to every destination.</p>
        <p className="mt-3 leading-7">For a useful quotation, include the product name, quantity and unit, intended application, required date and any specification or document requirements. Retail pack prices are separate from bulk quotations. Fresh leaves require harvest and delivery confirmation.</p>
        <div className="mt-5 flex flex-wrap gap-4"><Link className="btn" href={'/bulk-supply?product='+encodeURIComponent(r.name+' products')}>Request {r.name} bulk quote</Link><Link className="btn btn-outline" href="/sourcing-guide">Compare packs and buying terms</Link></div>
      </section>
      <section className="mt-12" aria-labelledby="range-questions"><h2 id="range-questions">{r.name} buyer questions</h2><div className="mt-6 space-y-6">{r.questions.map(([q,a])=><section key={q}><h3 className="text-xl font-semibold">{q}</h3><p className="mt-2 max-w-4xl leading-7">{a}</p></section>)}</div></section>
      <nav aria-label="Other botanical ranges" className="mt-10 flex flex-wrap gap-5">{botanicalRanges.filter(x=>x.slug!==r.slug).map(x=><Link className="underline text-green-900" key={x.slug} href={'/botanicals/'+x.slug}>{x.name} products — {x.botanical}</Link>)}<Link className="underline" href="/contact">Contact our Lucknow team</Link></nav>
    </section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
  </>;
}
