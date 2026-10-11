"use client";
import {useState} from 'react';
import type {Product} from '@/data/products';
import ProductCard from './ProductCard';
const tabs=[['ready','Ready Products'],['fresh','Fresh Botanicals'],['coming-soon','Coming Soon']] as const;
export default function ProductCollections({products}:{products:Product[]}){
 const [status,setStatus]=useState<Product['status']>('ready');
 return <><div className="collection-tabs" role="group" aria-label="Product availability">{tabs.map(([value,label])=><button type="button" key={value} aria-pressed={status===value} aria-controls="collection-panel" onClick={()=>setStatus(value)}>{label}</button>)}</div><div id="collection-panel" className="grid-products">{products.filter(p=>p.status===status).map(p=><ProductCard key={p.slug} product={p}/>)}</div></>;
}
