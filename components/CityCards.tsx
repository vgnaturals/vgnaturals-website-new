'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cities,cityPath,pinMap} from '@/data/cities';
import {products} from '@/data/products';
export default function CityCards(){
 const pathname=usePathname()||'/';const parts=pathname.split('/').filter(Boolean);
 if(['crm','admin','api','checkout','cart','privacy-policy','terms-and-conditions','refund-policy','shipping-policy','cancellation-policy'].includes(parts[0]))return null;
 const slug=parts[0]==='products'?parts[1]:parts[0]==='india'?parts[2]:undefined;
 const p=products.find(x=>x.slug===slug&&x.status!=='coming-soon');
 const label=p?.name||'Botanical ingredients';
 return <section className="city-discovery" aria-labelledby="city-discovery-title"><div className="container"><p className="eyebrow">India-wide buyer enquiries</p><h2 id="city-discovery-title">{p?'Find '+p.name+' by city':'Explore VG Naturals by city'}</h2><p className="city-intro">Choose a destination to explore {p?p.name:'available products'} and request a quotation from our Lucknow team. Reference PINs open Google Maps; stock and actual delivery feasibility must be confirmed.</p><div className="city-grid">{cities.map(c=><article className="city-card" key={c.slug}><Link className="city-main-link" href={cityPath(c,p?.slug)} prefetch={false}><span className="city-state">{c.state}</span><h3>{p?label+' in '+c.name:c.name}</h3><span className="city-cta">Explore sourcing →</span></Link><a className="city-pin" href={pinMap(c)} target="_blank" rel="noopener noreferrer" aria-label={'Open '+c.name+' PIN '+c.pin+' in Google Maps'}>PIN {c.pin} ↗</a></article>)}</div><p className="city-note">PINs are locality references, not VG Naturals branch addresses or confirmed serviceability. <a href="https://www.indiapost.gov.in/locate-postoffice" target="_blank" rel="noopener noreferrer">Verify your exact PIN with India Post</a>.</p></div></section>
}
