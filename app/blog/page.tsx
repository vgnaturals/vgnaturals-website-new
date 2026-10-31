import type {Metadata} from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import QuoteStrip from '@/components/QuoteStrip';
import {buyerGuides} from '@/data/buyer-guides';

export const metadata:Metadata={
 title:'Essential Oil, Hydrosol & Botanical Buyer Guides',
 description:'Practical essential oil, hydrosol and fresh botanical sourcing guides for Indian manufacturers, cosmetic formulators, wholesalers and buyers in Lucknow. Compare products and request bulk quotes.',
 alternates:{canonical:'/blog'},
 openGraph:{title:'Essential Oil & Hydrosol Buyer Guides | VG Naturals',description:'Compare Lemongrass, Tulsi and Basil sourcing requirements, samples, documentation and B2B quotes from VG Naturals, Lucknow.',url:'/blog',type:'website'}
};

const topicGroups=[
 {title:'Essential oil buying',description:'Compare botanical identities, evaluation samples, specification requests and bulk terms.',href:'/categories/essential-oils',guide:'/blog/essential-oil-bulk-buying',label:'Essential oil bulk buying checklist'},
 {title:'Hydrosols for formulators',description:'Understand water-based botanical products, preservation questions and batch information.',href:'/categories/hydrosols',guide:'/blog/lemongrass-hydrosol-bulk-supply-cosmetic-formulators',label:'Lemongrass hydrosol wholesale guide'},
 {title:'Fresh leaves & teas',description:'Select harvested Tulsi or Basil leaves versus finished herbal-tea packs and confirm availability.',href:'/categories/fresh-botanicals',guide:'/blog/fresh-tulsi-leaves-buying-guide',label:'Fresh Tulsi leaves buying guide'}
];
const quickAnswers=[
 {question:'What essential oils does VG Naturals list?',answer:'Lemongrass (Cymbopogon flexuosus), Tulsi (Ocimum sanctum) and Sweet Basil (Ocimum basilicum) essential oils. Each is a separate product; buyers should request the botanical identity and required specifications.'},
 {question:'What should a manufacturer share for a bulk quotation?',answer:'Send the exact product, botanical name, intended use, quantity and unit, documents needed, packaging, delivery PIN code and required date. MOQ, availability, taxes, freight and final price are confirmed separately.'},
 {question:'Can I source botanical ingredients outside Lucknow?',answer:'VG Naturals is based in Lucknow, Uttar Pradesh and accepts enquiries from businesses across India. Dispatch feasibility, delivery timeline and charges depend on the product and destination; there are no implied branches in other cities.'}
];
export default function Blog(){
 const articles=Object.entries(buyerGuides).sort((a,b)=>(b[1].updated||'').localeCompare(a[1].updated||''));
 const base='https://www.vgnaturals.com';
 const schema={'@context':'https://schema.org','@graph':[
  {'@type':'CollectionPage','@id':base+'/blog#collection',name:'Essential Oil, Hydrosol & Botanical Buyer Guides',url:base+'/blog',description:'Buying guidance for manufacturers, formulators and botanical sourcing teams in India.',inLanguage:'en-IN',publisher:{'@id':base+'/#organization'},mainEntity:{'@type':'ItemList',itemListElement:articles.map(([slug,post],index)=>({'@type':'ListItem',position:index+1,name:post.title,url:base+'/blog/'+slug}))}},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:base+'/'},{'@type':'ListItem',position:2,name:'Buyer Guides',item:base+'/blog'}]}
 ]};
 return <><PageHero eyebrow="Manufacturer & buyer resources" title="Essential Oil, Hydrosol & Botanical Buying Guides" description="Straight answers for cosmetic manufacturers, soap makers, formulators, distributors, restaurants and bulk buyers in India. Compare the product you actually need before sending an enquiry."/>
 <section className="section container">
  <nav aria-label="Breadcrumb" className="text-sm mb-7"><Link href="/">Home</Link> / <span>Buyer Guides</span></nav>
  <div className="card p-6 sm:p-10">
   <p className="eyebrow">Start here</p>
   <h2 className="mt-3">How to source botanical ingredients from VG Naturals</h2>
   <p className="mt-4 leading-8 max-w-4xl">VG NATURALS PRIVATE LIMITED is based in Lucknow, Uttar Pradesh. Our published range includes Lemongrass, Tulsi and Sweet Basil products across essential oils, hydrosols, herbal teas and fresh leaves. A buyer should first identify the exact plant and product form: an essential oil, a water-based hydrosol, a packaged tea and fresh leaves cannot be priced or evaluated as interchangeable items.</p>
   <p className="mt-4 leading-8 max-w-4xl">For B2B purchasing, compare the botanical identity, intended use, pack quantity, documents required, stock and freight—not only a headline price. Published small-pack prices are not wholesale rates. Request available batch information and confirm specifications, MOQ and commercial terms before ordering. These guides answer common sourcing questions without implying that any certification or technical report is automatically available.</p>
   <div className="mt-6 flex flex-wrap gap-3"><Link className="btn" href="/bulk-supply">Request a B2B quote</Link><Link className="btn btn-outline" href="/sourcing-guide">See the full product sourcing guide</Link></div>
  </div>
  <div className="mt-12">
   <p className="eyebrow">Choose a product format</p><h2 className="mt-2">Buying guides by requirement</h2>
   <div className="grid gap-5 md:grid-cols-3 mt-6">{topicGroups.map(group=><section key={group.title} className="card p-6"><h3 className="text-xl">{group.title}</h3><p className="mt-3 leading-7">{group.description}</p><p className="mt-4"><Link href={group.guide} className="text-link">{group.label} →</Link></p><p className="mt-3"><Link href={group.href} className="underline">Browse matching products</Link></p></section>)}</div>
  </div>
  <div className="mt-12">
   <h2>Essential oil, hydrosol or fresh botanicals: what do you need?</h2>
   <div className="overflow-x-auto mt-5"><table className="w-full text-left"><caption className="text-left text-sm mb-3">Practical comparison for procurement enquiries</caption><thead><tr className="bg-green-50"><th scope="col" className="p-4">Product form</th><th scope="col" className="p-4">Typical enquiry</th><th scope="col" className="p-4">What to confirm</th></tr></thead><tbody>
    <tr className="border-b"><th scope="row" className="p-4"><Link className="underline" href="/categories/essential-oils">Essential oil</Link></th><td className="p-4">Fragrance or ingredient evaluation</td><td className="p-4">Botanical species, composition requirements, batch documents, quantity unit</td></tr>
    <tr className="border-b"><th scope="row" className="p-4"><Link className="underline" href="/categories/hydrosols">Hydrosol</Link></th><td className="p-4">Water-based formulation ingredient</td><td className="p-4">Ingredients, preservation status, handling and shelf-life information</td></tr>
    <tr className="border-b"><th scope="row" className="p-4"><Link className="underline" href="/categories/herbal-teas">Herbal tea</Link></th><td className="p-4">Packaged beverage for resale or hospitality</td><td className="p-4">Ingredients, pouch count, labels, stock and packing</td></tr>
    <tr><th scope="row" className="p-4"><Link className="underline" href="/categories/fresh-botanicals">Fresh leaves</Link></th><td className="p-4">Harvested Tulsi or Basil material</td><td className="p-4">Fresh availability, quantity, handling and delivery feasibility</td></tr>
   </tbody></table></div>
  </div>
  <div className="mt-12" aria-labelledby="buyer-questions"><h2 id="buyer-questions">Quick answers for Indian botanical buyers</h2><div className="grid gap-5 md:grid-cols-3 mt-6">{quickAnswers.map(item=><section className="card p-6" key={item.question}><h3 className="text-xl">{item.question}</h3><p className="mt-3 leading-7">{item.answer}</p></section>)}</div><p className="mt-5">Need local pickup or a supply enquiry? <Link href="/contact" className="underline">See the VG Naturals Lucknow address, map and contact details</Link>. If you are based elsewhere in India, send the delivery PIN code so availability and freight can be checked.</p></div>
  <div className="mt-12"><p className="eyebrow">The botanical journal</p><h2 className="mt-2">Read all {articles.length} detailed buyer guides</h2><div className="editorial-grid journal-grid mt-6">{articles.map(([slug,post])=><Link href={'/blog/'+slug} key={slug} className="editorial-card"><img src={slug.includes('tulsi')?'/catalogue-assets/tulsi-essential-oil-ocimum-sanctum.jpg':slug.includes('lemongrass')?'/catalogue-assets/lemongrass-hydrosol-spray-bottle.png':'/catalogue-assets/botanical-farm-field-landscape.jpg'} alt={slug.includes('tulsi')?'VG Naturals Tulsi product photograph':slug.includes('lemongrass')?'VG Naturals Lemongrass hydrosol product photograph':'VG Naturals botanical farm photograph'} loading="lazy"/><div><p className="eyebrow">B2B &amp; product guidance</p><h3>{post.title}</h3><p>{post.summary}</p>{post.updated&&<p className="mt-3 text-sm">Updated <time dateTime={post.updated}>{new Date(post.updated+'T00:00:00Z').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}</time></p>}<span className="text-link">Read guide →</span></div></Link>)}</div></div>
 </section>
 <QuoteStrip/>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
 </>;
}
