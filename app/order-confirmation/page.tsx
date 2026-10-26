import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Order request | VG Naturals', robots: { index: false, follow: false } };
export default async function Confirmation({searchParams}:{searchParams:Promise<{order?:string|string[]}>}) {
 const query=await searchParams;
 const id=typeof query.order==='string'&&/^VGN-\d{8}-[A-F0-9]{24}$/.test(query.order)?query.order:null;
 return <section className="section container"><div className="mx-auto max-w-2xl card p-6 sm:p-10 text-center">
 <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3e6] text-[#214b36]" aria-hidden="true"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 10h8M8 14h5"/><path d="M7 20l-4 1 1-4V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H7Z"/></svg></div>
 <p className="eyebrow">VG Naturals · Order request</p>
 <h1 className="mt-4 font-serif font-normal text-3xl sm:text-4xl">Thank you for choosing VG Naturals!</h1>
 <p className="mt-5 text-lg leading-8 text-[#53604e]">A member of our team will call you shortly to confirm your order and delivery details. We look forward to serving you.</p>
 {id?<div className="my-7 rounded-xl border border-[#d5dfcc] bg-[#f2f5ec] p-5"><p className="text-xs font-semibold uppercase tracking-wider">Your Order ID</p><p className="mt-3 break-all font-mono text-base font-bold select-all">{id}</p><p className="mt-3 text-sm font-semibold text-[#214b36]">Awaiting confirmation call</p></div>:<p className="my-7 text-sm leading-6">Your Order ID appears after you complete checkout. If you have already submitted a request, please contact us for assistance.</p>}
 <p className="text-sm leading-7 text-[#53604e]">Our team will confirm product availability, delivery charges and the final amount during the call. Your booking will be finalised after confirmation. No online payment has been collected.</p>
 <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/products" className="btn">Continue browsing</Link><a href="tel:+919044210088" className="btn btn-outline">Call our team</a></div>
 <p className="mt-6 text-xs leading-6 text-[#53604e]">If you did not complete the submission verification, please <Link className="underline" href="/checkout">return to checkout</Link> to finish sending your request.</p>
 </div></section>;
}
