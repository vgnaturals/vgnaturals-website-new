import type {Metadata} from 'next';
import Link from 'next/link';
import {products} from '@/data/products';
import ProductCollections from '@/components/ProductCollections';
export const metadata:Metadata={title:'Essential oil, hydrosol and other botanical items manufacturer',alternates:{canonical:'/'}};
const categories=[
 {name:'Essential Oils',slug:'essential-oils',image:'/catalogue-assets/lemongrass-essential-oil-bottles.jpg'},
 {name:'Hydrosols',slug:'hydrosols',image:'/catalogue-assets/lemongrass-hydrosol-spray-bottle.png'},
 {name:'Herbal Teas',slug:'herbal-teas',image:'/images/basil-tea-bags.png'},
 {name:'Home Care',slug:'home-care',image:'/images/lemongrass-natural-room-freshener.png'},
 {name:'Fresh Botanicals',slug:'fresh-botanicals',image:'/catalogue-assets/botanical-plant-leaves-close-up.jpg'},
];
const plants=[
 {name:'Lemongrass',identity:'Essential oil, hydrosol, natural room freshener & tea bags',image:'/catalogue-assets/lemongrass-hydrosol-spray-bottle.png',search:'lemongrass'},
 {name:'Tulsi',identity:'Ocimum sanctum · Essential oil, hydrosol, herbal tea & fresh leaves',image:'/catalogue-assets/tulsi-essential-oil-ocimum-sanctum.jpg',search:'tulsi'},
 {name:'Basil',identity:'Ocimum basilicum · Essential oil, hydrosol, tea bags & fresh leaves',image:'/images/basil-tea-bags.png',search:'basil'},
];
const buyerAnswers = [["What does VG Naturals supply?", "VG NATURALS PRIVATE LIMITED supplies Lemongrass, Tulsi and Basil essential oils and hydrosols, herbal teas, selected home-fragrance products and fresh Tulsi and Basil leaves. We are based in Lucknow, Uttar Pradesh, India, and welcome enquiries from manufacturers, formulators, distributors and wholesalers."], ["Are Tulsi and Basil the same product?", "Our Tulsi products are listed as Ocimum sanctum. Our Basil products are listed separately as Ocimum basilicum. Specify the botanical name and product form when requesting a sample or quotation."], ["Can I order samples before discussing bulk supply?", "Listed small packs for essential oils and hydrosols are 50 ml at \u20b9300 and 100 ml at \u20b9450. These are evaluation-pack prices, not bulk rates. Bulk pricing, MOQ, specifications and availability are confirmed for each enquiry."], ["What information is needed for a bulk quotation?", "Share the product name, botanical identity where applicable, required quantity, intended application, packaging requirement and delivery city or PIN code. Our team can then discuss availability and commercial terms."], ["Are fresh leaves and upcoming products immediately available?", "Fresh Tulsi and Basil leaves require harvest and delivery feasibility confirmation before ordering. Products marked Coming Soon are open for enquiries only; they are not available for checkout."]];
export default function Home(){return <>
 <section className="store-hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">VG NATURALS PRIVATE LIMITED · LUCKNOW, INDIA</p><h1>Essential oil, hydrosol and other botanical items manufacturer</h1><p className="hero-description">Explore Lemongrass, Tulsi and Basil products for your brand, formulation or everyday botanical collection.</p><div className="flex flex-wrap gap-3"><Link href="/bulk-supply" className="btn">Request Bulk Quote</Link><Link href="/products" className="btn btn-outline">Explore Products</Link></div><p className="hero-note">Essential oils · Hydrosols · Herbal teas · Fresh botanicals</p></div><div className="hero-image"><img src="/images/vg-naturals-banner.png" alt="VG Naturals essential oils, hydrosols and herbal tea product range" width="896" height="1200" fetchPriority="high"/></div></div></section>
 <section className="section container category-section"><div className="section-heading"><p className="eyebrow">Find your botanical format</p><h2>Explore Our Product Categories</h2></div><div className="category-row">{categories.map(c=><Link key={c.slug} href={'/categories/'+c.slug} className="category-tile"><span><img src={c.image} alt={c.name} loading="lazy"/></span><h3>{c.name}</h3></Link>)}</div></section>
 <section className="section collection-section"><div className="container"><div className="section-heading"><p className="eyebrow">Choose your product</p><h2>Lemongrass, Tulsi & Basil Products</h2><p>Browse retail packs, check fresh availability or register interest in upcoming products.</p></div><ProductCollections products={products}/></div></section>
 <section className="section container"><div className="section-heading"><p className="eyebrow">Three botanical ranges</p><h2>Explore Lemongrass, Tulsi & Basil</h2></div><div className="plant-grid">{plants.map(p=><article key={p.name} className="plant-tile"><img src={p.image} alt={`VG Naturals ${p.name} products`} loading="lazy"/><div><h3>{p.name==='Lemongrass'?'Lemongrass Essential Oil, Hydrosol & Tea':p.name==='Tulsi'?'Tulsi Products — Ocimum sanctum':'Basil Products — Ocimum basilicum'}</h3><p>{p.identity}</p><Link href={'/products?search='+p.search}>Explore {p.name} →</Link></div></article>)}</div></section>
 <section className="section farm-story"><div className="container farm-story-grid"><img src="/catalogue-assets/botanical-farm-field-landscape.jpg" alt="Original VG Naturals farm photograph from the company catalogue" loading="lazy"/><div><p className="eyebrow">Our botanical roots</p><h2>From Cultivation to Botanical Products</h2><p>Our direction connects cultivation, sourcing, processing, product development and supply. Discover the farm photographs behind our botanical business and meet VG Naturals, Lucknow.</p><Link href="/about" className="btn btn-outline">Explore Our Farm & Story</Link></div></div></section>
 <section className="section container" aria-labelledby="buyer-answers"><div className="section-heading"><p className="eyebrow">Sourcing from VG Naturals</p><h2 id="buyer-answers">Essential Oil &amp; Hydrosol Buyer Questions</h2></div><div className="grid gap-5 md:grid-cols-2">{buyerAnswers.map(([question,answer])=><article key={question} className="card p-6"><h3 className="text-xl">{question}</h3><p className="mt-3 leading-7">{answer}</p></article>)}</div><div className="mt-6 flex flex-wrap gap-4"><Link href="/bulk-supply" className="btn">Discuss a Bulk Requirement</Link><Link href="/blog/tulsi-vs-basil" className="btn btn-outline">Tulsi &amp; Basil Guide</Link><Link href="/contact" className="btn btn-outline">Contact Our Lucknow Team</Link></div></section>
 <section className="section" aria-labelledby="google-reviews-heading">
  <div className="container">
   <div className="grid gap-8 rounded-2xl border border-[#dfe6d8] bg-white p-6 sm:p-10 md:grid-cols-2 md:items-center">
    <div>
     <p className="eyebrow">Customer feedback</p>
     <h2 id="google-reviews-heading" className="mt-3 font-serif font-normal">Find us on Google Reviews</h2>
     <p className="mt-4 max-w-xl text-sm leading-7 text-[#5a6854]">Explore customer feedback on our Google Business Profile. Already tried our products or worked with our team? We welcome your honest experience.</p>
     <a href="https://maps.app.goo.gl/DKijZJYgtTrcKpzG9" target="_blank" rel="noopener noreferrer" className="btn mt-6">View reviews on Google <span className="ml-2" aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
    </div>
    <div className="rounded-xl bg-[#f2f4ec] p-6 sm:p-8">
     <svg aria-hidden="true" className="mb-4 h-9 w-9 text-[#214b36]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M7 20l-4 1 1-4V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H7Z"/></svg>
     <h3 className="text-xl">Your experience matters</h3>
     <p className="mt-3 text-sm leading-7 text-[#5a6854]">Tell others about the products you tried, your sourcing experience or the support you received.</p>
     <a href="https://maps.app.goo.gl/DKijZJYgtTrcKpzG9" target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-5">Share your experience <span className="ml-2" aria-hidden="true">↗</span><span className="sr-only"> on Google Maps (opens in a new tab)</span></a>
     <p className="mt-3 text-xs leading-5 text-[#5a6854]">Open our Google listing, choose Reviews, then Write a review.</p>
    </div>
   </div>
  </div>
 </section>
 </>}
