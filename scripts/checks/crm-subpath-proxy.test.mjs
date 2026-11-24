import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import nextConfig from '../../next.config.ts';

test('CRM root and all nested requests proxy to independent CRM (no public routing change)',async()=>{
 const config=await nextConfig.rewrites();
 const before=config.beforeFiles||[];
 assert.deepEqual(before.filter(x=>x.source.startsWith('/crm')),[
  {source:'/crm',destination:'https://vg-naturals-crm.vercel.app/crm'},
  {source:'/crm/:path*',destination:'https://vg-naturals-crm.vercel.app/crm/:path*'}
 ]);
 assert.ok(before.every(x=>x.source.startsWith('/crm')));
});
test('the public site no longer redirects /crm to retired ChatGPT Sites',()=>{
 const code=fs.readFileSync('app/crm/page.tsx','utf8');
 assert.ok(!code.includes("crm.vgnaturals.com"));
 assert.match(code,/notFound\(/);
});
test('normal website forms retain fallback and only canary uses new intake',()=>{
 const selector=fs.readFileSync('lib/crm-intake-routing.ts','utf8');
 assert.match(selector,/NEXT_PUBLIC_CRM_LEADS_ENDPOINT/);
 assert.match(selector,/vg-naturals-business\.roundmars256\.chatgpt\.site/);
 assert.match(selector,/params\.get\('crmCanary'\)==='supabase'/);
 for(const name of ['components/EnquiryForm.tsx','app/checkout/page.tsx']){
  const s=fs.readFileSync(name,'utf8');
  assert.match(s,/selectCrmIntakeEndpoint\(window\.location\.search\)/);
 }
});
test('legacy duplicated CRM URLs redirect once to canonical routes',async()=>{
 const routes=await nextConfig.redirects();
 const doubleRoot=routes.find(x=>x.source==='/crm/crm');
 const doubleNested=routes.find(x=>x.source==='/crm/crm/:path*');
 assert.deepEqual(doubleRoot,{source:'/crm/crm',destination:'/crm',permanent:false});
 assert.deepEqual(doubleNested,{source:'/crm/crm/:path*',destination:'/crm/:path*',permanent:false});
 assert.ok(routes.every(x=>!x.source.startsWith('/products/')||x.destination?.startsWith('/')));
});
