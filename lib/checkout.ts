export type Delivery = { name:string; phone:string; email:string; address:string; city:string; state:string; pin:string; company:string; notes:string };
export type OrderItem = {slug:string; name:string; variant:string; qty:number; price:number};
export const emptyDelivery:Delivery={name:'',phone:'',email:'',address:'',city:'',state:'',pin:'',company:'',notes:''};
export function normalizeDelivery(value:Delivery):Delivery {
 return {...Object.fromEntries(Object.entries(value).map(([key,text])=>[key,text.trim()])),phone:value.phone.replace(/[\s()-]/g,'')} as Delivery;
}
export function validateDelivery(value:Delivery):Partial<Record<keyof Delivery,string>> {
 const d=normalizeDelivery(value); const errors:Partial<Record<keyof Delivery,string>>={};
 for(const key of ['name','address','city','state'] as const) if(!d[key]) errors[key]='Please complete this field.';
 if(!/^(?:\+91|91)?[6-9]\d{9}$/.test(d.phone)) errors.phone='Enter a valid 10-digit Indian mobile number (optional +91).';
 if(!/^[1-9]\d{5}$/.test(d.pin)) errors.pin='Enter a valid 6-digit Indian PIN code.';
 if(d.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.email='Enter a valid email address or leave it blank.';
 return errors;
}
export function validItems(items:OrderItem[]):boolean {
 return items.length>0&&items.every(i=>Number.isSafeInteger(i.qty)&&i.qty>0&&i.qty<=9999&&Number.isFinite(i.price)&&i.price>0);
}
export function orderContent(delivery:Delivery,items:OrderItem[]):string {
 return JSON.stringify({delivery:normalizeDelivery(delivery),items:items.map(({slug,variant,qty,price})=>({slug,variant,qty,price})).sort((a,b)=>(a.slug+a.variant).localeCompare(b.slug+b.variant))});
}
export function newOrderId():string {
 const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replace(/-/g,'');
 const random=Array.from(crypto.getRandomValues(new Uint8Array(12)),b=>b.toString(16).padStart(2,'0')).join('').toUpperCase();
 return 'VGN-'+date+'-'+random;
}
export type Reference={id:string; fingerprint:string; created:number};
export function reusableReference(value:unknown,fingerprint:string,now:number):value is Reference {
 if(!value||typeof value!=='object')return false;
 const r=value as Reference;
 return typeof r.id==='string'&&/^VGN-\d{8}-[A-F0-9]{24}$/.test(r.id)&&r.fingerprint===fingerprint&&Number.isFinite(r.created)&&now>=r.created&&now-r.created<86400000;
}
export function orderMessage(id:string,d:Delivery,items:OrderItem[]):string {
 const total=items.reduce((sum,i)=>sum+i.price*i.qty,0);
 return ['VG Naturals — Order request','Order ID: '+id,'Status: Request for confirmation • Unpaid','',
 'Customer: '+d.name,'Phone / WhatsApp: '+d.phone,...(d.email?['Email: '+d.email]:[]),...(d.company?['Company: '+d.company]:[]),
 'Delivery: '+d.address+', '+d.city+', '+d.state+' — '+d.pin+', India','',
 'Products:',...items.map(i=>i.name+' | '+i.variant+' | Qty: '+i.qty+' | Unit: ₹'+i.price+' | Subtotal: ₹'+i.qty*i.price),'',
 'Products subtotal: ₹'+total,'Packaging, courier and applicable GST are to be confirmed. No payment made.',
 ...(d.notes?['Notes: '+d.notes]:[]),'Please confirm availability, delivery feasibility and the final payable amount.'].join('\n');
}
