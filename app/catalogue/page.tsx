import type {Metadata} from 'next';
import Link from 'next/link';
import {products} from '@/data/products';
import PageHero from '@/components/PageHero';
import QuoteStrip from '@/components/QuoteStrip';

export const metadata:Metadata={
  title:'VG Naturals Product Catalogue | Current Prices & Bulk Supply',
  description:'Browse our updated five-page VG Naturals catalogue. Current Lemongrass, Tulsi and Sweet Basil oils, hydrosols, teas and fresh botanicals with prices from the live product list.',
  alternates:{canonical:'/catalogue'}
};

const pdf='/VG_Naturals_Ready_to_Share_Product_Catalogue.pdf?v=20261102';
const pages=[
  {title:'From Our Farm to Your Product — Cover',image:'/catalogue/vg-naturals-botanical-product-catalogue-cover.svg'},
  {title:'Lemongrass Collection — Cymbopogon flexuosus',image:'/catalogue/lemongrass-products-price-catalogue.svg'},
  {title:'Tulsi Collection — Ocimum sanctum',image:'/catalogue/tulsi-ocimum-sanctum-products-price-catalogue.svg'},
  {title:'Sweet Basil Collection — Ocimum basilicum',image:'/catalogue/basil-ocimum-basilicum-products-price-catalogue.svg'},
  {title:'B2B Bulk Supply & Contact',image:'/catalogue/vg-naturals-b2b-bulk-supply-contact.svg'}
];
const groupNames=[
  {title:'Lemongrass',id:'lemongrass',botanical:'Cymbopogon flexuosus'},
  {title:'Tulsi',id:'tulsi',botanical:'Ocimum sanctum'},
  {title:'Sweet Basil',id:'basil',botanical:'Ocimum basilicum'}
];
const groups=groupNames.map(g=>({...g,items:products.filter(p=>(p.status==='ready'||p.status==='fresh')&&(
 p.slug.startsWith(g.id+'-')||(g.id==='tulsi'&&['herbal-tulsi-tea-pouch','fresh-tulsi-leaves'].includes(p.slug))||(g.id==='basil'&&p.slug==='fresh-basil-leaves')
))}));
const inr=(price:number)=>'₹'+price.toLocaleString('en-IN');

export default function Catalogue(){
 return <>
  <PageHero eyebrow="Product Catalogue • Updated 2 November 2026" title="From Our Farm to Your Product" description="Explore our refreshed five-page VG Naturals catalogue with current retail-pack prices, original farm-linked brand story and straightforward bulk enquiry information."/>
  <section className="section container">
   <div className="card p-5 sm:p-8 mb-8">
    <p className="eyebrow">Current product prices</p>
    <h2 className="mt-2">Catalogue pricing matches our product pages</h2>
    <p className="mt-3 leading-7 max-w-4xl">Prices in the catalogue PDF and page images are generated from the same product records used throughout this website. Fresh botanicals require harvest and delivery confirmation; coming-soon products are excluded from the ready-to-share catalogue. Packaging and courier charges are additional. Applicable taxes and bulk pricing are confirmed on enquiry.</p>
    <div className="flex flex-wrap gap-3 mt-5"><a href={pdf} className="btn" target="_blank" rel="noopener noreferrer">View Updated Catalogue (PDF)</a><a href={pdf} download="VG_Naturals_Product_Catalogue_Updated.pdf" className="btn btn-outline">Download Latest PDF</a><Link href="/bulk-supply" className="btn btn-outline">Request Bulk Quote</Link></div>
    <p className="mt-4 text-sm text-gray-600">Last synchronized: 2 November 2026. If an earlier PDF was saved or shared, please replace it with this edition.</p>
   </div>
   <div className="catalogue-feature">
    <img src={pages[0].image} alt="VG Naturals updated farm-to-product botanical catalogue cover" width="1055" height="1491"/>
    <div><p className="eyebrow">Five-page product catalogue</p><h2>Lemongrass, Tulsi &amp; Sweet Basil</h2><p>Browse essential oils, hydrosols, herbal tea products, natural home-care formats and fresh leaves. Current retail pack prices and clear availability notes are included.</p><p className="mt-4">For a manufacturer quotation, share product, botanical identity, quantity, intended application, required documents and delivery PIN code.</p><Link className="text-link mt-4 inline-block" href="/products">Browse live product pages →</Link></div>
   </div>
  </section>
  <section className="section container" aria-labelledby="catalogue-page-images">
   <div className="section-heading"><p className="eyebrow">Browse the brochure</p><h2 id="catalogue-page-images">Updated Catalogue Pages</h2><p>Each image below reflects the same prices as the downloadable PDF.</p></div>
   <div className="grid md:grid-cols-2 gap-8">{pages.map((p,i)=><figure className="card" key={p.title}><a href={p.image} target="_blank" rel="noopener noreferrer" aria-label={'Open full image: '+p.title}><img src={p.image} alt={'VG Naturals catalogue page '+(i+1)+': '+p.title} width="1055" height="1491" loading="lazy" className="block w-full h-auto"/></a><figcaption className="p-5 text-sm font-semibold">{String(i+1).padStart(2,'0')} · {p.title}</figcaption></figure>)}</div>
  </section>
  <section className="section container" aria-labelledby="catalogue-live-prices">
   <div className="section-heading"><p className="eyebrow">Exact listed prices</p><h2 id="catalogue-live-prices">Prices by Botanical Collection</h2><p>Live prices shown directly from VG Naturals product records, separate from quotations for bulk quantities.</p></div>
   {groups.map(g=><section key={g.id} className="mb-10"><h3 className="text-2xl mb-2">{g.title} <span className="font-normal italic text-gray-500">({g.botanical})</span></h3><div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="bg-green-50"><th scope="col" className="p-3">Product</th><th scope="col" className="p-3">Pack / Current price</th><th scope="col" className="p-3">Availability</th></tr></thead><tbody>{g.items.map(p=><tr key={p.slug} className="border-b"><td className="p-3"><Link className="underline text-green-900" href={'/products/'+p.slug}>{p.name}</Link></td><td className="p-3">{p.variants.map(v=>v.label+' — '+inr(v.price)).join(' / ')}</td><td className="p-3">{p.status==='fresh'?'Check harvest availability':'Ready product'}</td></tr>)}</tbody></table></div></section>)}
  </section>
  <QuoteStrip/>
 </>;
}
