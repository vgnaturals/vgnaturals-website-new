"use client";
import {useCart} from '@/components/CartProvider';
import EnquiryForm from '@/components/EnquiryForm';
import Link from 'next/link';
export default function Checkout(){
 const {items}=useCart();
 const total=items.reduce((s,x)=>s+x.qty*x.price,0);
 const summary=items.map(x=>`${x.name} | ${x.variant} | Quantity: ${x.qty} | Unit price: ₹${x.price} | Line subtotal: ₹${x.qty*x.price}`).join('\n');
 return <section className="section container"><h1>Request Your Order</h1><p className="my-5 max-w-3xl leading-7">Send your cart and customer details to VG Naturals by email. Our team will confirm product availability, delivery charges and the final quotation before you pay. No online payment is collected here.</p>{items.length===0?<div className="card p-7"><p>Your cart is empty. Add products before sending an order request.</p><Link className="btn mt-5" href="/products">Browse Products</Link></div>:<div className="grid lg:grid-cols-2 gap-8"><div className="card p-7 self-start"><h2>Order Summary</h2>{items.map(x=><p className="my-3" key={x.slug+x.variant}>{x.name} · {x.variant} × {x.qty} — ₹{x.qty*x.price}</p>)}<p className="font-bold mt-4">Products subtotal: ₹{total}</p><p className="text-sm my-3 leading-6">Packaging and courier charges are not included. Packaging, courier and applicable GST will be confirmed in your quotation.</p><Link className="btn btn-outline mt-4" href="/cart">Edit Cart</Link></div><div className="card p-7"><h2 className="mb-5">Customer &amp; Delivery Details</h2><EnquiryForm orderSummary={summary} subtotal={total}/></div></div>}</section>;
}
