import type {Metadata} from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import QuoteStrip from '@/components/QuoteStrip';
import {buyerGuides} from '@/data/buyer-guides';
export const metadata:Metadata={title:'Botanical Buyer Guides | Essential Oils & Hydrosols',description:'Practical buying guides for Indian manufacturers, formulators and botanical buyers: product identities, evaluation packs, bulk quotations and sourcing questions.',alternates:{canonical:'/blog'}};
export default function Blog(){
 const articles=Object.entries(buyerGuides).sort((a,b)=>(b[1].updated||'').localeCompare(a[1].updated||''));
 return <><PageHero eyebrow="Buyer resources" title="The Botanical Journal" description="Practical answers for manufacturers, formulators and botanical buyers. Choose the right product, prepare a clear enquiry and compare supply requirements."/>
 <section className="section container"><div className="card p-6 mb-8"><h2>Start with the product catalogue</h2><p className="mt-3 leading-7">Compare listed packs, ordering status and the information needed for a bulk enquiry.</p><Link href="/sourcing-guide" className="text-link mt-4 inline-block">Open the product buying guide →</Link></div>
 <div className="editorial-grid journal-grid">{articles.map(([slug,post])=><Link href={'/blog/'+slug} key={slug} className="editorial-card"><img src="/catalogue-assets/botanical-farm-field-landscape.jpg" alt="VG Naturals botanical farm" loading="lazy"/><div><p className="eyebrow">B2B &amp; product guidance</p><h2>{post.title}</h2><p>{post.summary}</p>{post.updated&&<p className="mt-3 text-sm">Updated <time dateTime={post.updated}>{new Date(post.updated+'T00:00:00Z').toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}</time></p>}<span className="text-link">Read guide →</span></div></Link>)}</div></section><QuoteStrip/></>;
}
