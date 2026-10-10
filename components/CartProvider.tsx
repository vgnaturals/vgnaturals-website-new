"use client";
import {createContext,useContext,useEffect,useState,ReactNode} from 'react';
type Item={slug:string;name:string;variant:string;price:number;qty:number;image:string};
type Context={items:Item[];add:(item:Omit<Item,'qty'>)=>void;remove:(slug:string,variant:string)=>void;change:(slug:string,variant:string,qty:number)=>void;clear:()=>void};
const Cart=createContext<Context|null>(null);
export function CartProvider({children}:{children:ReactNode}){const [items,setItems]=useState<Item[]>([]);const [ready,setReady]=useState(false);useEffect(()=>{try{const raw=localStorage.getItem('vg-cart');if(raw)setItems(JSON.parse(raw))}catch{}setReady(true)},[]);useEffect(()=>{if(ready)localStorage.setItem('vg-cart',JSON.stringify(items))},[items,ready]);const add=(v:Omit<Item,'qty'>)=>setItems(old=>{const found=old.find(x=>x.slug===v.slug&&x.variant===v.variant);return found?old.map(x=>x===found?{...x,qty:x.qty+1}:x):[...old,{...v,qty:1}]});const remove=(s:string,v:string)=>setItems(old=>old.filter(x=>x.slug!==s||x.variant!==v));const change=(s:string,v:string,q:number)=>setItems(old=>old.map(x=>x.slug===s&&x.variant===v?{...x,qty:Math.max(1,q)}:x));return <Cart.Provider value={{items,add,remove,change,clear:()=>setItems([])}}>{children}</Cart.Provider>}
export function useCart(){const c=useContext(Cart);if(!c)throw Error('CartProvider missing');return c}
