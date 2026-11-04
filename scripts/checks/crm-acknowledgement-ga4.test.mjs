import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { classifyWebsiteLeadAcknowledgement } from '../../lib/website-lead-acknowledgement.ts';
import { crmRequestIdFromOrderId } from '../../lib/checkout.ts';
import { recordCrmLeadSaved } from '../../lib/lead-analytics.ts';

const enquiryId = 'website-12345678-1234-1234-1234-123456789abc';
const orderReference = 'VGN-20261104-000000000000000000000001';
const orderId = 'website-' + crmRequestIdFromOrderId(orderReference);

test('new D1 insert acknowledgement is a created lead, not a payment or completed sale', () => {
  assert.equal(classifyWebsiteLeadAcknowledgement(true,{id:enquiryId},enquiryId),'created');
  assert.equal(classifyWebsiteLeadAcknowledgement(true,{id:orderId,repeated:false},orderId),'created');
});

test('D1 idempotent retry is acknowledged, but must never count as a new lead', () => {
  assert.equal(classifyWebsiteLeadAcknowledgement(true,{id:enquiryId,repeated:true},enquiryId),'repeated');
  assert.equal(classifyWebsiteLeadAcknowledgement(true,{id:orderId,repeated:true},orderId),'repeated');
});

test('rejected, invalid and malformed CRM replies cannot produce a conversion', () => {
  for(const payload of [
    {id:enquiryId}, // failed HTTP response
    {id:'website-another-reference'},
    {id:enquiryId,repeated:'true'},
    {id:enquiryId,repeated:1},
    {error:'CRM unreachable'},
    null,
    {},
    [],
    'OK'
  ]) {
    const statusOk = payload?.id === enquiryId && payload?.repeated === undefined ? false : true;
    assert.equal(classifyWebsiteLeadAcknowledgement(statusOk,payload,enquiryId),'invalid');
  }
  assert.equal(classifyWebsiteLeadAcknowledgement(false,{id:enquiryId,repeated:true},enquiryId),'invalid');
  assert.equal(classifyWebsiteLeadAcknowledgement(true,{id:enquiryId},'bad-id'),'invalid');
});

test('both website actions classify before reporting a new CRM lead to GA4', () => {
  for(const file of ['components/EnquiryForm.tsx','app/checkout/page.tsx']) {
    const source = fs.readFileSync(file,'utf8');
    assert.ok(source.includes("classifyWebsiteLeadAcknowledgement(response.ok,result,"));
    assert.ok(source.includes("if(acknowledgement==='invalid')throw Error("));
    assert.ok(source.includes("if(acknowledgement==='created')recordCrmLeadSaved("));
    assert.ok(!source.includes("if(acknowledgement==='repeated')recordCrmLeadSaved("));
  }
});

test('end-to-end response classification yields one GA4 event across create and replay', () => {
  const calls=[];
  const original=globalThis.window;
  const fakeWindow={
    gtag:(...params)=>calls.push(params),
    sessionStorage:{getItem:()=>null,setItem:()=>{}}
  };
  globalThis.window=fakeWindow;
  try {
    for (const response of [{id:orderId},{id:orderId,repeated:true}]) {
      const ack=classifyWebsiteLeadAcknowledgement(true,response,orderId);
      if(ack==='created') recordCrmLeadSaved('order',response.id);
    }
    assert.equal(calls.length,1);
    assert.equal(calls[0][1],'vg_crm_lead_saved');
    assert.deepEqual(calls[0][2],{lead_type:'order',lead_channel:'website'});
    assert.ok(!JSON.stringify(calls).includes(orderId));
  } finally {
    if(original===undefined)delete globalThis.window;
    else globalThis.window=original;
  }
});

test('checkout keeps stable CRM id for the same customer-visible order reference', () => {
  const expected=crmRequestIdFromOrderId(orderReference);
  assert.equal(crmRequestIdFromOrderId(orderReference),expected);
  assert.equal(orderId,'website-'+expected);
  assert.equal(orderId.length,44);
});
