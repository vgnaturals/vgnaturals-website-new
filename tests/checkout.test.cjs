const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ts=require('typescript');
const source=fs.readFileSync(path.join(__dirname,'../lib/checkout.ts'),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const sandbox={exports:{},crypto:require('node:crypto').webcrypto,Intl,Date,Uint8Array};
vm.runInNewContext(js,sandbox);
const {validateDelivery,normalizeDelivery,validItems,orderContent,newOrderId,reusableReference,orderMessage}=sandbox.exports;
const delivery={name:'Test Customer',phone:'9876543210',email:'',address:'Test delivery address',city:'Lucknow',state:'Uttar Pradesh',pin:'226025',company:'',notes:''};
const items=[{slug:'oil',name:'Essential oil',variant:'50 ml',qty:2,price:150}];
test('Required fields, mobile and Indian PIN are validated',()=>{
 assert.equal(Object.keys(validateDelivery(delivery)).length,0);
 for(const [key,value] of Object.entries({name:'   ',address:' ',city:' ',state:' ',pin:'000000',phone:'12345',email:'invalid'}))
  assert.ok(validateDelivery({...delivery,[key]:value})[key],key);
 assert.equal(normalizeDelivery({...delivery,phone:'+91 98765 43210'}).phone,'+919876543210');
 assert.equal(Object.keys(validateDelivery({...delivery,phone:'+91 98765 43210'})).length,0);
});
test('Cart rejects empty, fractional, nonfinite and invalid quantities',()=>{
 assert.equal(validItems(items),true);assert.equal(validItems([]),false);
 for(const qty of [0,-1,1.5,Infinity,NaN,10000])assert.equal(validItems([{...items[0],qty}]),false);
 assert.equal(validItems([{...items[0],price:NaN}]),false);
});
test('Retry fingerprints are stable but change with delivery, pack, quantity or price',()=>{
 const base=orderContent(delivery,items);
 assert.equal(base,orderContent({...delivery,name:'  Test Customer  '},items));
 assert.notEqual(base,orderContent({...delivery,pin:'226001'},items));
 for(const change of [{qty:3},{variant:'100 ml'},{price:225}])assert.notEqual(base,orderContent(delivery,[{...items[0],...change}]));
});
test('IDs have a date and independent cryptographic suffixes',()=>{
 const ids=new Set(Array.from({length:1000},()=>newOrderId()));
 assert.equal(ids.size,1000); for(const id of ids)assert.match(id,/^VGN-\d{8}-[A-F0-9]{24}$/);
});
test('Reference reuse rejects stale, changed, malformed and future references',()=>{
 const now=Date.now(),ref={id:newOrderId(),fingerprint:'same',created:now-1000};
 assert.equal(reusableReference(ref,'same',now),true);
 assert.equal(reusableReference(ref,'changed',now),false);
 assert.equal(reusableReference({...ref,created:now-86400000},'same',now),false);
 assert.equal(reusableReference({...ref,created:now+1},'same',now),false);
 assert.equal(reusableReference({...ref,id:'bad'},'same',now),false);
 assert.equal(reusableReference(null,'same',now),false);
});
test('Both delivery channels use an unpaid request with exact ID and total',()=>{
 const id=newOrderId(),message=orderMessage(id,delivery,items);
 assert.ok(message.includes('Order ID: '+id));assert.ok(message.includes('Products subtotal: ₹300'));
 assert.ok(message.includes('Unpaid'));assert.ok(message.includes('No payment made.'));
 assert.ok(message.includes(delivery.address));assert.ok(message.includes(delivery.phone));
 assert.ok(!message.includes('Email:'));
});
