import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {selectCrmIntakeEndpoint,supabaseIntakeUrl,currentIntakeFallback} from '../../lib/crm-intake-routing.ts';

test('P0 default production intake remains unchanged until live Supabase E2E acceptance',()=>{
 // The production environment may override to another approved endpoint:
 // normal path never selects canary without explicit URL query.
 const baseline=selectCrmIntakeEndpoint('');
 assert.equal(baseline,process.env.NEXT_PUBLIC_CRM_LEADS_ENDPOINT||currentIntakeFallback);
 assert.notEqual(baseline,supabaseIntakeUrl);
});
test('explicit canary uses actual VG Naturals Supabase intake (no secret tokens)',()=>{
 assert.match(supabaseIntakeUrl,/^https:\/\/ptlvcleylqkyithxthfb\.supabase\.co\/functions\/v1\/vg-crm-intake$/);
 assert.equal(selectCrmIntakeEndpoint('?crmCanary=supabase'),supabaseIntakeUrl);
 assert.equal(selectCrmIntakeEndpoint('?ref=b2b&crmCanary=supabase'),supabaseIntakeUrl);
 assert.notEqual(selectCrmIntakeEndpoint('?crmCanary=legacy'),supabaseIntakeUrl);
});
for(const path of ['components/EnquiryForm.tsx','app/checkout/page.tsx']){
 test(path+' preserves consent, UUID/idempotency and new/replay conversion semantics',()=>{
  const src=fs.readFileSync(path,'utf8');
  assert.match(src,/selectCrmIntakeEndpoint\(window\.location\.search\)/);
  assert.match(src,/classifyWebsiteLeadAcknowledgement\(response\.ok,result,/);
  assert.match(src,/acknowledgement==='created'\)recordCrmLeadSaved/);
  assert.match(src,/requestId:/);
  assert.match(src,/consent:true/);
  assert.doesNotMatch(src,/SUPABASE_SERVICE_ROLE_KEY|sb_secret_/);
 });
}
test('canary cannot silently switch normal public forms to the new backend',()=>{
 const src=fs.readFileSync('lib/crm-intake-routing.ts','utf8');
 assert.ok(src.includes("params.get('crmCanary')==='supabase'"));
 assert.ok(src.includes("process.env.NEXT_PUBLIC_CRM_LEADS_ENDPOINT||currentIntakeFallback"));
});
