import test from 'node:test';
import assert from 'node:assert/strict';
import { products } from '../../data/products.ts';
import { productPageStructuredData } from '../../lib/product-structured-data.ts';
import { recordCrmLeadSaved } from '../../lib/lead-analytics.ts';
import fs from 'node:fs';

test('all priced products preserve accurate per-variant INR Offers', () => {
  let count=0;
  for (const p of products) {
    if (p.status === 'coming-soon') continue;
    const data=productPageStructuredData(p,'Description','Product form');
    assert.equal(data['@type'],'Product',p.slug);
    assert.equal(data.name,p.name);
    assert.equal(data.url,'https://www.vgnaturals.com/products/'+p.slug);
    assert.ok(Array.isArray(data.offers),p.slug);
    assert.equal(data.offers.length,p.variants.length,p.slug);
    data.offers.forEach((offer,i)=>{
      assert.equal(offer.price,p.variants[i].price,p.slug);
      assert.equal(offer.priceCurrency,'INR');
      assert.equal(offer.name,p.name+' — '+p.variants[i].label);
      assert.ok(!Object.hasOwn(offer,'availability'));
      assert.ok(!Object.hasOwn(offer,'shippingDetails'));
      assert.ok(!Object.hasOwn(offer,'hasMerchantReturnPolicy'));
    });
    count++;
  }
  assert.equal(count,13);
});

test('four Coming Soon pages do not emit Product schema without verifiable offers', () => {
  const upcoming=products.filter(p=>p.status==='coming-soon');
  assert.equal(upcoming.length,4);
  for(const p of upcoming) {
    const data=productPageStructuredData(p,'Coming soon');
    assert.equal(data['@type'],'WebPage',p.slug);
    assert.ok(!Object.hasOwn(data,'offers'),p.slug);
    assert.equal(data.about['@type'],'Thing');
    assert.equal(data.url,'https://www.vgnaturals.com/products/'+p.slug);
  }
});

test('only ready and fresh products have priced Product schema in page template',()=>{
  const template=fs.readFileSync('app/products/[slug]/page.tsx','utf8');
  assert.ok(template.includes('productPageStructuredData(p, summary, content?.form)'));
  assert.ok(template.includes("JSON.stringify([schema,"));
  const schema=fs.readFileSync('lib/product-structured-data.ts','utf8');
  assert.ok(schema.includes("p.status === 'coming-soon' || p.variants.length === 0"));
});

test('CRM lead analytics emits no PII and deduplicates repeated confirmations',()=>{
  const events=[];
  const stored=new Map();
  const original=globalThis.window;
  globalThis.window={
    gtag: (...args)=>events.push(args),
    sessionStorage:{
      getItem:k=>stored.get(k)||null,
      setItem:(k,v)=>{stored.set(k,v)}
    }
  };
  try {
    recordCrmLeadSaved('enquiry','website-abc');
    recordCrmLeadSaved('enquiry','website-abc');
    recordCrmLeadSaved('order','website-def');
    recordCrmLeadSaved('order','invalid-ref');
    assert.equal(events.length,2);
    assert.deepEqual(events.map(e=>e[1]),['vg_crm_lead_saved','vg_crm_lead_saved']);
    assert.deepEqual(events[0][2],{lead_type:'enquiry',lead_channel:'website'});
    assert.deepEqual(events[1][2],{lead_type:'order',lead_channel:'website'});
    assert.ok(!JSON.stringify(events).includes('website-abc'));
    assert.ok(!JSON.stringify(events).includes('website-def'));
  } finally {
    if(original===undefined) delete globalThis.window;
    else globalThis.window=original;
  }
});

test('analytics events are gated after CRM response acknowledgement',()=>{
  const enquiry=fs.readFileSync('components/EnquiryForm.tsx','utf8');
  const checkout=fs.readFileSync('app/checkout/page.tsx','utf8');
  for(const source of [enquiry,checkout]) {
    const acknowledgement=source.indexOf("classifyWebsiteLeadAcknowledgement(response.ok,result,");
    const reject=source.indexOf("if(acknowledgement==='invalid')throw Error(");
    const createdOnly=source.indexOf("if(acknowledgement==='created')recordCrmLeadSaved(");
    assert.ok(acknowledgement>0 && reject>acknowledgement && createdOnly>reject);
  }
});
