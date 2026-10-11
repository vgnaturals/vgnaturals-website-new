"use client";
import Link from 'next/link';
import {useState} from 'react';
import {useCart} from './CartProvider';
const links=[['/','Home'],['/products','Products'],['/categories','Categories'],['/industries','Industries'],['/bulk-supply','Bulk Supply'],['/coming-soon','Coming Soon'],['/about','About Us'],['/catalogue','Catalogue'],['/blog','Blog'],['/contact','Contact']];
export default function Header(){
 const [open,setOpen]=useState(false);const {items}=useCart();
 return <header className="site-header">
  <div className="announcement">Lemongrass · Tulsi · Basil <span>Retail packs & B2B bulk enquiries</span></div>
  <div className="container header-main">
   <Link href="/" className="brand"><img src="/catalogue-assets/image5.png" alt="VG Naturals" width="64" height="64"/><span>VG Naturals<small>Pure • Natural • Organic Care</small></span></Link>
   <form action="/products" className="header-search" role="search"><label htmlFor="header-search" className="sr-only">Search products</label><input id="header-search" name="search" placeholder="Search oils, hydrosols, teas…"/><button type="submit" aria-label="Search products">Search</button></form>
   <div className="header-actions"><Link href="/cart" className="cart-link">Cart <span>{items.reduce((a,b)=>a+b.qty,0)}</span></Link><Link href="/bulk-supply" className="btn header-quote">Request Bulk Quote</Link><button className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button></div>
  </div>
  <nav className="desktop-menu container" aria-label="Main navigation">{links.map(([url,label])=><Link key={url} href={url}>{label}</Link>)}</nav>
  {open&&<nav id="mobile-menu" className="mobile-menu container" aria-label="Mobile navigation">{links.map(([url,label])=><Link key={url} href={url} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/bulk-supply" className="btn" onClick={()=>setOpen(false)}>Request Bulk Quote</Link></nav>}
 </header>;
}
