"use client";
import Link from 'next/link';
import {useState} from 'react';
import type {Product} from '@/data/products';
import {useCart} from './CartProvider';
export default function ProductCard({product:p}:{product:Product}){
 const [index,setIndex]=useState(0);const [added,setAdded]=useState(false);const {add}=useCart();const variant=p.variants[index];
 const purchasable=p.status==='ready'&&!!variant;
 return <article className="card shop-card">
  <Link href={'/products/'+p.slug} className="shop-card-image">{p.image?<img src={p.image} alt={p.name+' — VG Naturals'} loading="lazy" className="product-photo"/>:<div className="product-photo flex items-center justify-center">Image on enquiry</div>}<span className="product-badge">{p.status==='fresh'?'Check availability':p.status==='coming-soon'?'Coming Soon':p.category}</span></Link>
  <div className="p-4 shop-card-body"><h3><Link href={'/products/'+p.slug}>{p.name}</Link></h3><p className="italic text-sm text-gray-600 mt-2">{p.botanicalName}</p>
   {p.variants.length>0?<><label htmlFor={'pack-'+p.slug} className="sr-only">{p.name} pack size</label><select id={'pack-'+p.slug} value={index} onChange={e=>{setIndex(Number(e.target.value));setAdded(false)}} className="field mt-4">{p.variants.map((v,i)=><option key={v.label} value={i}>{v.label} — ₹{v.price}</option>)}</select><p className="product-price">₹{variant?.price}</p></>:<p className="product-price">Price on enquiry</p>}
   {p.variants.length > 0 && <p className="text-xs text-gray-600 mb-3">Packaging and courier charges are not included.</p>}
   {purchasable?<button type="button" className="btn w-full" onClick={()=>{add({slug:p.slug,name:p.name,variant:variant.label,price:variant.price,image:p.image});setAdded(true)}}>{added?'Added · Add Another':'Add to Cart'}</button>:<Link className="btn w-full" href={'/products/'+p.slug}>{p.status==='fresh'?'Check Availability':'Enquire Now'}</Link>}
   <p role="status" className="text-xs text-green-900 mt-2">{added?'Added to your cart.':''}</p><Link className="product-details-link" href={'/products/'+p.slug}>View product details →</Link>
  </div>
 </article>;
}
