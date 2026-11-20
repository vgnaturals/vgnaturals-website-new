import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {recordCrmLeadSaved} from '../../lib/lead-analytics.ts';

function makeBrowser({metaOwned=false,hasGtag=true}={}) {
  const memory=new Map();
  const ga=[];
  const meta=[];
  globalThis.window={
    sessionStorage:{
      getItem(key){return memory.get(key)??null;},
      setItem(key,value){memory.set(key,value);}
    },
    gtag: hasGtag ? (...args)=>ga.push(args) : undefined,
    fbq: (...args)=>meta.push(args),
    __vgMetaPixelOwned:metaOwned
  };
  return {ga,meta};
}

test('CRM-acknowledged conversion tracks GA4 only when marketing consent is not owned by VG',()=>{
  const {ga,meta}=makeBrowser();
  recordCrmLeadSaved('enquiry','website-testing-1');
  assert.equal(ga.length,1);
  assert.equal(ga[0][1],'vg_crm_lead_saved');
  assert.equal(meta.length,0);
});

test('Meta Lead fires only once for a new CRM-confirmed reference and never sends PII',()=>{
  const {ga,meta}=makeBrowser({metaOwned:true});
  recordCrmLeadSaved('enquiry','website-testing-2');
  recordCrmLeadSaved('enquiry','website-testing-2');
  assert.equal(ga.length,1);
  assert.deepEqual(meta,[['track','Lead']]);
});

test('Meta can count acknowledged CRM lead even if GA4 is unavailable',()=>{
  const {ga,meta}=makeBrowser({metaOwned:true,hasGtag:false});
  recordCrmLeadSaved('order','website-testing-3');
  assert.equal(ga.length,0);
  assert.deepEqual(meta,[['track','Lead']]);
});

test('does not report invalid CRM reference as a conversion',()=>{
  const {ga,meta}=makeBrowser({metaOwned:true});
  recordCrmLeadSaved('enquiry','not-a-website-reference');
  assert.equal(ga.length,0);
  assert.equal(meta.length,0);
});

test('pixel component is ID- and consent-gated and avoids double Meta initialization',()=>{
  const component=readFileSync(new URL('../../components/MetaPixel.tsx',import.meta.url),'utf8');
  assert.match(component,/^const validPixelId = \/\^\\d\{10,20\}\$\/\.test\(pixelId\);/m);
  assert.match(component,/consent === 'accepted'/);
  assert.match(component,/if \(window\.fbq\) return/);
  assert.match(component,/fbq\('track','PageView'\)/);
  assert.match(component,/NEXT_PUBLIC_META_PIXEL_ID/);
});
