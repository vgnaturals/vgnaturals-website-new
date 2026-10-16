import type {Metadata} from 'next';
import PageHero from '@/components/PageHero';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {buyerGuides} from '@/data/buyer-guides';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const post=buyerGuides[slug];if(!post)notFound();
 return {title:post.title,description:post.summary,alternates:{canonical:`/blog/${slug}`},openGraph:{title:post.title,description:post.summary,type:'article',url:`/blog/${slug}`,images:[{url:'/catalogue-assets/botanical-farm-field-landscape.jpg',alt:'VG Naturals farm'}]}};
}
export function generateStaticParams(){return Object.keys(buyerGuides).map(slug=>({slug}));}
export default async function Article({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const post=buyerGuides[slug];if(!post)notFound();
 const url=`https://www.vgnaturals.com/blog/${slug}`;
 const schema={'@context':'https://schema.org','@type':'Article','@id':url+'#article',headline:post.title,description:post.summary,mainEntityOfPage:url,author:{'@type':'Organization','@id':'https://www.vgnaturals.com/#organization',name:'VG Naturals'},publisher:{'@id':'https://www.vgnaturals.com/#organization'},inLanguage:'en-IN'};
 return <><PageHero eyebrow="Buyer guide" title={post.title} description={post.summary}/><article className="section container article-body">
 <nav aria-label="Breadcrumb" className="text-sm"><Link href="/">Home</Link> / <Link href="/blog">Buyer Guides</Link> / <span>{post.title}</span></nav>
 <p className="mt-6 text-sm text-gray-600">By VG Naturals · Product and B2B sourcing guidance</p>
 {slug==='tulsi-vs-basil' && <div className="overflow-x-auto mt-8"><table className="w-full text-left"><caption className="text-left font-semibold mb-3">VG Naturals product identities</caption><thead><tr className="bg-green-50"><th scope="col" className="p-4">Range</th><th scope="col" className="p-4">Listed botanical name</th><th scope="col" className="p-4">Product forms</th></tr></thead><tbody>{[['Tulsi','Ocimum sanctum'],['Basil','Ocimum basilicum']].map(([name,botanical])=><tr key={name} className="border-b"><th scope="row" className="p-4">{name}</th><td className="p-4 italic">{botanical}</td><td className="p-4">Essential oil, hydrosol, herbal tea and fresh leaves</td></tr>)}</tbody></table></div>}
 <div className="my-8 max-w-4xl">{post.sections.map(section=><section key={section.heading} className="mb-8"><h2 className="text-2xl">{section.heading}</h2><p className="mt-4 leading-8">{section.text}</p></section>)}</div>
 <aside className="card p-6 my-8" aria-labelledby="related-range"><h2 id="related-range" className="text-2xl">Explore the Relevant Products</h2><ul className="mt-4 flex flex-wrap gap-4">{post.links.map(link=><li key={link.href}><Link className="text-green-900 underline" href={link.href}>{link.label}</Link></li>)}</ul></aside>
 <Link className="btn" href="/bulk-supply">Discuss Your Sourcing Requirement</Link>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
 </article></>;
}
