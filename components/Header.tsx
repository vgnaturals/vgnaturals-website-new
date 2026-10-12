"use client";
import Link from 'next/link';
import {useState} from 'react';
import {Phone} from 'lucide-react';
import {useCart} from './CartProvider';
const links=[['/','Home'],['/products','Products'],['/categories','Categories'],['/industries','Industries'],['/bulk-supply','Bulk Supply'],['/coming-soon','Coming Soon'],['/about','About Us'],['/catalogue','Catalogue'],['/blog','Blog'],['/contact','Contact']];
export default function Header(){
 const [open,setOpen]=useState(false);const {items}=useCart();
 return <header className="site-header">
  <div className="announcement">
   <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
    <p>Lemongrass · Tulsi · Basil <span>Retail packs & B2B bulk enquiries</span></p>
    <a href="tel:+919044210088" aria-label="Call VG Naturals at +91 90442 10088" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#edcf87] px-4 py-2 text-xs font-bold text-[#122f25] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><Phone size={16} aria-hidden="true" />Call Now · +91 90442 10088</a>
   </div>
  </div>
  <div className="container header-main">
   <Link href="/" className="brand"><img src="/catalogue-assets/vg-naturals-leaf-gold-logo.png" alt="VG Naturals" width="64" height="64"/><span>VG Naturals<small>Pure • Natural • Organic Care</small></span></Link>
   <form action="/products" className="header-search" role="search"><label htmlFor="header-search" className="sr-only">Search products</label><input id="header-search" name="search" placeholder="Search oils, hydrosols, teas…"/><button type="submit" aria-label="Search products">Search</button></form>
   <div className="header-actions"><Link href="/cart" className="cart-link">Cart <span>{items.reduce((a,b)=>a+b.qty,0)}</span></Link><Link href="/bulk-supply" className="btn header-quote">Request Bulk Quote</Link><button className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button></div>
  </div>
  <nav className="desktop-menu container" aria-label="Main navigation">{links.map(([url,label])=><Link key={url} href={url}>{label}</Link>)}</nav>
  {open&&<nav id="mobile-menu" className="mobile-menu container" aria-label="Mobile navigation">{links.map(([url,label])=><Link key={url} href={url} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/bulk-supply" className="btn" onClick={()=>setOpen(false)}>Request Bulk Quote</Link></nav>}
 </header>;
}
