import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

for(const path of ['components/EnquiryForm.tsx','app/checkout/page.tsx']){
 test(path+' supports env-gated CRM endpoint while preserving current production fallback',()=>{
  const src=fs.readFileSync(path,'utf8');
  assert.match(src,/process\.env\.NEXT_PUBLIC_CRM_LEADS_ENDPOINT\|\|/);
  assert.match(src,/vg-naturals-business\.roundmars256\.chatgpt\.site\/api\/website-leads/);
  assert.match(src,/classifyWebsiteLeadAcknowledgement\(response\.ok,result,/);
  assert.match(src,/acknowledgement==='created'\)recordCrmLeadSaved/);
 });
}
