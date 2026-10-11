import type {Metadata} from 'next';
import Link from 'next/link';
import {products} from '@/data/products';
import ProductCollections from '@/components/ProductCollections';
export const metadata:Metadata={title:'Essential oil, hydrosol and other botanical items manufacturer',alternates:{canonical:'/'}};
const categories=[
 {name:'Essential Oils',slug:'essential-oils',image:'/catalogue-assets/image14.jpg'},
 {name:'Hydrosols',slug:'hydrosols',image:'/catalogue-assets/image21.png'},
 {name:'Herbal Teas',slug:'herbal-teas',image:'/images/basil-tea-bags.png'},
 {name:'Home Care',slug:'home-care',image:'/images/lemongrass-natural-room-freshener.png'},
 {name:'Fresh Botanicals',slug:'fresh-botanicals',image:'/catalogue-assets/image2.jpg'},
];
const plants=[
 {name:'Lemongrass',identity:'Essential oil, hydrosol, natural room freshener & tea bags',image:'/catalogue-assets/image21.png',search:'lemongrass'},
 {name:'Tulsi',identity:'Ocimum sanctum · Essential oil, hydrosol, herbal tea & fresh leaves',image:'/catalogue-assets/image8.jpg',search:'tulsi'},
 {name:'Basil',identity:'Ocimum basilicum · Essential oil, hydrosol, tea bags & fresh leaves',image:'/images/basil-tea-bags.png',search:'basil'},
];
export default function Home(){return <>
 <section className="store-hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">VG NATURALS PRIVATE LIMITED · LUCKNOW, INDIA</p><h1>Essential oil, hydrosol and other botanical items manufacturer</h1><p className="hero-description">Explore Lemongrass, Tulsi and Basil products for your brand, formulation or everyday botanical collection.</p><div className="flex flex-wrap gap-3"><Link href="/bulk-supply" className="btn">Request Bulk Quote</Link><Link href="/products" className="btn btn-outline">Explore Products</Link></div><p className="hero-note">Essential oils · Hydrosols · Herbal teas · Fresh botanicals</p></div><div className="hero-image"><img src="/images/vg-naturals-banner.png" alt="VG Naturals essential oils, hydrosols and herbal tea product range" width="896" height="1200" fetchPriority="high"/></div></div></section>
 <section className="section container category-section"><div className="section-heading"><p className="eyebrow">Find your botanical format</p><h2>Explore Our Product Categories</h2></div><div className="category-row">{categories.map(c=><Link key={c.slug} href={'/categories/'+c.slug} className="category-tile"><span><img src={c.image} alt={c.name} loading="lazy"/></span><h3>{c.name}</h3></Link>)}</div></section>
 <section className="section collection-section"><div className="container"><div className="section-heading"><p className="eyebrow">Choose your product</p><h2>Lemongrass, Tulsi & Basil Products</h2><p>Browse retail packs, check fresh availability or register interest in upcoming products.</p></div><ProductCollections products={products}/></div></section>
 <section className="section container"><div className="section-heading"><p className="eyebrow">Three botanical ranges</p><h2>Explore Lemongrass, Tulsi & Basil</h2></div><div className="plant-grid">{plants.map(p=><article key={p.name} className="plant-tile"><img src={p.image} alt={`VG Naturals ${p.name} products`} loading="lazy"/><div><h3>{p.name==='Lemongrass'?'Lemongrass Essential Oil, Hydrosol & Tea':p.name==='Tulsi'?'Tulsi Products — Ocimum sanctum':'Basil Products — Ocimum basilicum'}</h3><p>{p.identity}</p><Link href={'/products?search='+p.search}>Explore {p.name} →</Link></div></article>)}</div></section>
 <section className="section farm-story"><div className="container farm-story-grid"><img src="/catalogue-assets/image12.jpg" alt="Original VG Naturals farm photograph from the company catalogue" loading="lazy"/><div><p className="eyebrow">Our botanical roots</p><h2>From Cultivation to Botanical Products</h2><p>Our direction connects cultivation, sourcing, processing, product development and supply. Discover the farm photographs behind our botanical business and meet VG Naturals, Lucknow.</p><Link href="/about" className="btn btn-outline">Explore Our Farm & Story</Link></div></div></section>
 <section className="section container"><div className="bulk-banner"><div><p className="eyebrow">For manufacturers, formulators & distributors</p><h2>Botanical Ingredients for Your Business</h2><p>Share your product, quantity, application and delivery location. Our team will discuss availability and your bulk supply requirements.</p></div><Link href="/bulk-supply" className="btn btn-gold">Request Bulk Quote</Link></div></section>
 <section className="container catalogue-strip"><div><h2>Your Product Range, in One Catalogue</h2><p>View available botanical products and bring your requirements to our team.</p></div><Link href="/catalogue" className="btn btn-outline">View Catalogue</Link></section>
 </>}
