"use client";
import {useEffect,useRef,useState,type FormEvent} from 'react';
import Link from 'next/link';
import {useCart} from '@/components/CartProvider';
import {emptyDelivery,normalizeDelivery,validateDelivery,validItems,orderContent,newOrderId,orderMessage,reusableReference,type Reference,type Delivery} from '@/lib/checkout';

const money=(n:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
const fields:{key:keyof Delivery;label:string;autoComplete:string;type?:string;wide?:boolean;placeholder?:string}[]=[
 {key:'name',label:'Full name',autoComplete:'name'},
 {key:'phone',label:'Mobile / WhatsApp',autoComplete:'tel',type:'tel',placeholder:'10-digit mobile number'},
 {key:'address',label:'House / building, street and area',autoComplete:'street-address',wide:true},
 {key:'pin',label:'PIN code',autoComplete:'postal-code',placeholder:'6-digit PIN code'},
 {key:'city',label:'City / town',autoComplete:'address-level2'},
 {key:'state',label:'State / union territory',autoComplete:'address-level1'},
 {key:'email',label:'Email (optional)',autoComplete:'email',type:'email'}
];
const storageKey='vg-checkout-reference-v1';
export default function Checkout(){
 const {items}=useCart();
 const [mounted,setMounted]=useState(false);
 const [delivery,setDelivery]=useState<Delivery>({...emptyDelivery});
 const [errors,setErrors]=useState<Partial<Record<keyof Delivery,string>>>({});
 const [review,setReview]=useState(false);
 const [reference,setReference]=useState<Reference|null>(null);
 const referenceRef=useRef<Reference|null>(null);
 const [confirmedContent,setConfirmedContent]=useState('');
 const [busy,setBusy]=useState(false);const busyRef=useRef(false);
 const [error,setError]=useState('');const [notice,setNotice]=useState('');
 const heading=useRef<HTMLHeadingElement>(null);
 const total=items.reduce((sum,x)=>sum+x.qty*x.price,0);
 const content=orderContent(delivery,items);
 const canSend=review&&!!reference&&confirmedContent===content&&validItems(items);
 useEffect(()=>{setMounted(true)},[]);
 useEffect(()=>{if(review)heading.current?.focus()},[review]);
 useEffect(()=>{
  if(review&&confirmedContent!==content){setReview(false);setNotice('Your cart or details changed. Confirm them again before sending.')}
 },[review,confirmedContent,content]);
 async function confirmDetails(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busyRef.current)return;
  const normalized=normalizeDelivery(delivery);const nextErrors=validateDelivery(normalized);
  setErrors(nextErrors);setError('');setNotice('');
  const invalidKey=Object.keys(nextErrors)[0];
  if(invalidKey){document.getElementById('delivery-'+invalidKey)?.focus();return}
  if(!validItems(items)){setError('Please use whole-number quantities between 1 and 9,999 in your cart. For larger orders, request a bulk quote.');return}
  busyRef.current=true;setBusy(true);
  try{
   const snapshot=orderContent(normalized,items);
   const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(snapshot));
   const fingerprint=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
   let previous:unknown=referenceRef.current;
   if(!previous){try{previous=JSON.parse(sessionStorage.getItem(storageKey)||'null')}catch{}}
   const now=Date.now();
   const next=reusableReference(previous,fingerprint,now)?previous:{id:newOrderId(),fingerprint,created:now};
   referenceRef.current=next;setReference(next);setDelivery(normalized);setConfirmedContent(snapshot);setReview(true);
   try{sessionStorage.setItem(storageKey,JSON.stringify(next))}catch{/* No customer details are stored here. */}
  }catch{setError('We could not generate your Order ID. Please retry, or call +91 90442 10088.')}
  finally{busyRef.current=false;setBusy(false)}
 }
 const message=reference?orderMessage(reference.id,delivery,items):'';
 async function copyId(){
  if(!reference)return;
  try{await navigator.clipboard.writeText(reference.id);setNotice('Order ID copied.')}
  catch{setNotice('Please select and copy the Order ID shown above.')}
 }
 return <section className="section container max-w-6xl">
  <p className="eyebrow">VG Naturals · Easy ordering</p><h1 className="mt-3 font-serif font-normal">Checkout</h1>
  <p className="mt-4 max-w-2xl leading-7 text-[#53604e]">Confirm your delivery details, then send your order request. Our team will confirm availability and the final amount before payment.</p>
  <ol aria-label="Checkout progress" className="my-8 grid grid-cols-2 gap-3 max-w-2xl">{['Delivery details','Review & send'].map((label,i)=><li key={label} aria-current={(review?1:0)===i?'step':undefined} className={'rounded-xl border px-4 py-3 text-sm font-semibold '+((review?1:0)===i?'border-[#214b36] bg-[#214b36] text-white':'border-[#d5dfcc] bg-white text-[#214b36]')}><span className="mr-2">{i+1}.</span>{label}</li>)}</ol>
  {!mounted?<p role="status">Loading your cart…</p>:!items.length?<div className="card p-7"><h2 className="text-2xl">Your cart is empty</h2><p className="my-4">Add a product to start your order.</p><Link href="/products" className="btn">Browse products</Link></div>:<div className="grid gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start">
   <div className="card p-5 sm:p-8 min-w-0">
    {!canSend?<>
     <h2 className="text-2xl font-serif font-normal">Where should we deliver?</h2><p className="mt-2 mb-6 text-sm leading-6 text-[#53604e]">Enter an Indian delivery address. Fields marked * are required.</p>
     <form onSubmit={confirmDetails} className="grid gap-5 sm:grid-cols-2">
      {fields.map(({key,label,autoComplete,type,wide,placeholder})=><label key={key} htmlFor={'delivery-'+key} className={'text-sm font-semibold '+(wide?'sm:col-span-2':'')}>{label}{key!=='email'?' *':''}
       <input id={'delivery-'+key} name={key} type={type||'text'} autoComplete={autoComplete} placeholder={placeholder} required={key!=='email'} maxLength={key==='address'?400:key==='pin'?6:key==='phone'?20:160} inputMode={key==='pin'?'numeric':undefined} aria-invalid={!!errors[key]} aria-describedby={errors[key]?key+'-error':undefined} className="field mt-2 font-normal" value={delivery[key]} onChange={e=>{setDelivery(d=>({...d,[key]:e.target.value}));setErrors(old=>({...old,[key]:undefined}))}}/>
       {errors[key]&&<span id={key+'-error'} className="mt-2 block text-red-700 text-xs">{errors[key]}</span>}
      </label>)}
      <details className="sm:col-span-2 rounded-xl border border-[#dfe5d8] p-4"><summary className="cursor-pointer text-sm font-semibold py-1">Company details or delivery note (optional)</summary>
       <label className="block mt-4 text-sm">Company<input name="company" autoComplete="organization" className="field mt-2" value={delivery.company} maxLength={160} onChange={e=>setDelivery(d=>({...d,company:e.target.value}))}/></label>
       <label className="block mt-4 text-sm">Delivery note<textarea name="notes" className="field mt-2" rows={3} value={delivery.notes} maxLength={1000} onChange={e=>setDelivery(d=>({...d,notes:e.target.value}))}/></label>
      </details>
      <label className="sm:col-span-2 flex items-start gap-3 text-sm leading-6 font-normal"><input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0"/><span>I agree to VG Naturals using these details for this order request. <Link href="/privacy-policy" className="underline">Privacy policy</Link>.</span></label>
      {error&&<p role="alert" className="sm:col-span-2 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={busy} className="btn sm:col-span-2 w-full">{busy?'Generating Order ID…':'Confirm delivery details →'}</button>
      <p className="sm:col-span-2 text-xs leading-5 text-[#53604e]">Next: your Order ID and a final review. No payment is collected at this step.</p>
     </form>
    </>:<>
     <p className="eyebrow">Delivery details confirmed</p><h2 ref={heading} tabIndex={-1} className="mt-3 text-2xl font-serif font-normal">Your request is ready to send</h2>
     <div className="my-6 rounded-xl border border-[#ccd9c0] bg-[#f0f4e9] p-4"><p className="text-xs font-semibold uppercase tracking-wider text-[#53604e]">Order ID</p><p className="mt-2 break-all font-mono text-base font-bold text-[#214b36] select-all">{reference!.id}</p>
      <button type="button" className="mt-2 min-h-11 text-sm font-semibold underline" onClick={copyId}>Copy Order ID</button>
      <p className="text-xs leading-5 text-[#53604e]">Not sent yet · Unpaid. Send below so our team receives your request.</p>
     </div>
     <div className="flex justify-between gap-4 items-center"><h3>Delivery details</h3><button type="button" className="text-sm underline min-h-11" onClick={()=>{setReview(false);setNotice('')}}>Edit details</button></div>
     <address className="not-italic text-sm leading-7 break-words"><strong>{delivery.name}</strong><br/>{delivery.phone}{delivery.email&&<><br/>{delivery.email}</>}{delivery.company&&<><br/>{delivery.company}</>}<br/>{delivery.address}<br/>{delivery.city}, {delivery.state} — {delivery.pin}<br/>India</address>
     {delivery.notes&&<p className="mt-3 text-sm leading-6 break-words">Note: {delivery.notes}</p>}
     <div className="mt-6 border-t border-[#e0e6d8] pt-6">
      <form action="https://formsubmit.co/vgnaturalspvtltd@gmail.com" method="POST" className="mt-4" onSubmit={()=>setNotice('Complete the verification to send your request. You will then return to your order confirmation page.')}>
       <input type="hidden" name="_next" value={'https://www.vgnaturals.com/order-confirmation?order='+encodeURIComponent(reference!.id)}/>
       <input type="hidden" name="_subject" value={'VG Naturals order request — '+reference!.id}/><input type="hidden" name="_template" value="table"/>
       <input type="hidden" name="order_id" value={reference!.id}/><input type="hidden" name="name" value={delivery.name}/>
       {delivery.email&&<input type="hidden" name="email" value={delivery.email}/>}<input type="hidden" name="phone" value={delivery.phone}/>
       <input type="hidden" name="order_request" value={message}/><input type="hidden" name="products_subtotal_INR" value={total}/>
       <input type="hidden" name="request_type" value="Order request — pending team confirmation, unpaid"/>
       <input type="hidden" name="source" value="https://www.vgnaturals.com/checkout"/>
       <input type="hidden" name="contact_consent" value="Customer agreed to use their details for this order request"/>
       <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
       <button className="btn w-full" type="submit">Submit order request →</button>
       <p className="mt-2 text-xs leading-5 text-[#53604e]">Your request is sent securely through FormSubmit. Complete its verification to return to your confirmation page. Our team will call you to confirm your order.</p>
      </form>
     </div>
    </>}
    {notice&&<p role="status" className="mt-4 rounded-lg bg-[#f0f4e9] p-3 text-sm leading-6">{notice}</p>}
   </div>
   <aside className="card p-5 sm:p-7 min-w-0" aria-label="Order summary">
    <div className="flex justify-between gap-3 items-center"><h2 className="text-2xl font-serif font-normal">Your order</h2><Link href="/cart" className="text-sm underline min-h-11 inline-flex items-center">Edit cart</Link></div>
    <ul className="divide-y divide-[#e1e7dd] mt-3">{items.map(item=><li key={item.slug+item.variant} className="flex gap-3 py-4">{item.image&&<img src={item.image} alt="" className="h-16 w-16 rounded-lg object-contain bg-[#f5f6ef] shrink-0"/>}<div className="min-w-0 flex-1"><h3 className="text-sm leading-6">{item.name}</h3><p className="text-xs text-[#53604e] leading-6">{item.variant} × {item.qty}</p><p className="text-sm font-bold">{money(item.price*item.qty)}</p></div></li>)}</ul>
    <div className="border-t border-[#d5dfcc] pt-5 mt-2"><div className="flex justify-between gap-3 font-bold"><span>Products subtotal</span><span>{money(total)}</span></div><p className="mt-3 text-xs leading-6 text-[#53604e]">Packaging and courier are additional. Applicable GST and the final payable amount will be confirmed by our team before payment.</p></div>
    <div className="mt-5 rounded-xl bg-[#f0f4e9] p-4"><h3 className="text-sm">What happens next?</h3><p className="mt-2 text-sm leading-6 text-[#53604e]">Send your request → we confirm stock and delivery charges → you approve the final amount.</p></div>
    <a href="tel:+919044210088" className="mt-4 inline-flex min-h-11 items-center text-sm underline">Need help? Call +91 90442 10088</a>
   </aside>
  </div>}
 </section>;
}
