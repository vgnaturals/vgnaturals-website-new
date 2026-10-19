"use client";
import {useRef, useState} from 'react';
import Link from 'next/link';
import {sendEnquiry} from '@/lib/send-enquiry';

type Props = { initialProduct?: string; orderSummary?: string; subtotal?: number };
export default function EnquiryForm({initialProduct='',orderSummary,subtotal}:Props) {
  const [status,setStatus] = useState<'idle'|'sending'|'accepted'|'activation-required'|'error'>('idle');
  const sending = useRef(false);
  const isOrder = orderSummary !== undefined;
  const ref = useRef<HTMLFormElement>(null);
  const [form,setForm] = useState({name:'',company:'',email:'',phone:'',product:initialProduct,quantity:'',application:'',address:'',city:'',state:'',pin:'',location:'',message:''});
  const labels: Record<string,string> = {name:'Customer name',company:'Company (optional)',email:'Email',phone:'Phone / WhatsApp',product:'Product',quantity:'Required quantity',application:'Intended application (optional)',address:'Delivery address',city:'City',state:'State',pin:'PIN / postal code',location:'Delivery location',message:'Additional requirements (optional)'};
  const fields = isOrder ? ['name','phone','email','company','address','city','state','pin','message'] : ['name','company','email','phone','product','quantity','application','location','message'];
  const required = isOrder ? ['name','phone','email','address','city','state','pin'] : ['name','phone','email','product','quantity','location'];
  function requestMessage() {
    return [`VG Naturals ${isOrder?'order request':'B2B enquiry'}`, ...fields.map(k=>`${labels[k]}: ${form[k as keyof typeof form]}`), ...(isOrder?[`Items:\n${orderSummary}`,`Products subtotal: ₹${subtotal}`, 'Packaging, courier and applicable GST to be confirmed. No payment made.']:[])].join('\n');
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus('sending');
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      data.source = window.location.href;
      if (data._honey) { setStatus('error'); return; }
      setStatus(await sendEnquiry(data));
    } catch { setStatus('error'); }
    finally { sending.current = false; }
  }
  function emailApp() {
    if (!ref.current?.reportValidity()) return;
    window.location.assign('mailto:vgnaturalspvtltd@gmail.com?subject='+encodeURIComponent(`VG Naturals ${isOrder?'order request':'enquiry'}`)+'&body='+encodeURIComponent(requestMessage()));
  }
  function whatsapp() {
    if (!ref.current?.reportValidity()) return;
    const message = requestMessage();
    window.location.assign('https://wa.me/919044210088?text='+encodeURIComponent(message));
  }
  return <form ref={ref} onSubmit={submit} aria-busy={status==='sending'} action="https://formsubmit.co/vgnaturalspvtltd@gmail.com" method="POST" className="grid md:grid-cols-2 gap-4">
    <input type="hidden" name="_subject" value={isOrder?'VG Naturals — New website order request':'VG Naturals — New website enquiry'} />
    <input type="hidden" name="_template" value="table" />
    <input type="hidden" name="request_type" value={isOrder?'Cart order request — pending confirmation, unpaid':'Product / bulk enquiry'} />
    <input type="hidden" name="source" value={isOrder?'https://www.vgnaturals.com/checkout':'https://www.vgnaturals.com — enquiry form'} />
    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    {isOrder && <><input type="hidden" name="order_items" value={orderSummary}/><input type="hidden" name="products_subtotal_INR" value={subtotal}/><input type="hidden" name="charges_and_status" value="Packaging and courier charges are not included. Applicable GST and final total to be confirmed by VG Naturals. This is an unpaid order request, not a confirmed booking."/></>}
    {fields.map(key=><label key={key} className={`text-sm font-semibold ${key==='message'?'md:col-span-2':''}`}>{labels[key]}{required.includes(key)?' *':''}
      {key==='message' ? <textarea className="field mt-2" name={key} rows={3} maxLength={3000} value={form.message} onChange={e=>setForm(x=>({...x,message:e.target.value}))}/> : <input className="field mt-2" name={key} value={form[key as keyof typeof form]} onChange={e=>setForm(x=>({...x,[key]:e.target.value}))} required={required.includes(key)} type={key==='email'?'email':key==='phone'?'tel':'text'} maxLength={key==='address'?500:200} autoComplete={key==='name'?'name':key==='email'?'email':key==='phone'?'tel':key==='address'?'street-address':key==='city'?'address-level2':key==='state'?'address-level1':key==='pin'?'postal-code':key==='company'?'organization':undefined} />}
    </label>)}
    <label className="md:col-span-2 flex items-start gap-2 text-sm leading-6"><input type="checkbox" required name="contact_consent" value="Customer agreed to use their details for this request" className="mt-1"/><span>I agree to VG Naturals using my details to respond to this request. Email submissions are processed by FormSubmit. <Link className="underline" href="/privacy-policy">Privacy policy</Link>.</span></label>
    <div className="md:col-span-2">
      <div className="flex flex-wrap gap-3"><button className="btn disabled:opacity-60" disabled={status==='sending'} type="submit">{status==='sending'?'Submitting…':isOrder?'Email Order Request':'Send Enquiry by Email'}</button><button className="btn btn-outline" type="button" onClick={whatsapp}>Send via WhatsApp instead</button><button className="text-green-900 underline" type="button" onClick={emailApp}>Use my email app</button></div>
      <div aria-live="polite" aria-atomic="true" className="mt-3 text-sm leading-6">
        {status==='error' && <p role="alert" className="rounded-lg bg-amber-50 p-4 text-amber-900">We could not confirm email submission. Your details remain here. Please retry, send via WhatsApp, or use your email app. If an earlier attempt arrived, our team can check for a duplicate.</p>}
        {status==='activation-required' && <p role="alert" className="rounded-lg bg-amber-50 p-4 text-amber-900">Email delivery is awaiting activation by VG Naturals. Please use WhatsApp or your email app for this request.</p>}
        {status==='accepted' && <p className="rounded-lg bg-green-50 p-4 text-green-900">The email service accepted your request for processing. Inbox delivery and your order are not yet confirmed. For urgent requirements, contact us on WhatsApp or call +91 90442 10088.</p>}
      </div>
      <p className="text-xs text-gray-600 mt-3 leading-5">Your cart and form stay on this page during email submission. “Use my email app” opens a draft that you must send yourself. An enquiry is not an order confirmation; our team will confirm availability and the final amount.</p>
    </div>
  </form>;
}
