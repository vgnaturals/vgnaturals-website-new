import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {products} from '../../data/products.ts';
import {categorySeo} from '../../data/category-seo.ts';

const read = path => fs.readFileSync(path,'utf8');
const product = read('app/products/[slug]/page.tsx');
const category = read('app/categories/[slug]/page.tsx');
const blog = read('app/blog/page.tsx');
const ops = read('ops/merchant-center-readiness.md');
const draft = read('ops/merchant-center-draft.tsv').split('\n').filter(line=>line.length>0);

test('distinct national sourcing titles for the three core essential oil products',()=>{
  for(const productName of ['Lemongrass','Tulsi','Basil']){
    assert.match(product,new RegExp(productName+' Essential Oil Supplier India'));
  }
  assert.match(product,/title: \{ absolute: fullTitle \}/);
  assert.match(product,/fullTitle = title.endsWith/);
  assert.match(product,/alternates: \{ canonical: `\/products\/\$\{p.slug\}` \}/);
  assert.match(product,/title: fullTitle,/);
});

test('category titles are directly B2B relevant and append brand only once',()=>{
  assert.equal(categorySeo['essential-oils'].title,'Essential Oil Supplier India | VG Naturals');
  assert.equal(categorySeo.hydrosols.title,'Hydrosol Supplier India | VG Naturals');
  assert.match(category,/title:\{absolute:title.endsWith\('\s*\| VG Naturals'\)/);
  assert.ok(categorySeo['essential-oils'].title.length<=60);
  assert.ok(categorySeo.hydrosols.title.length<=60);
});

test('buyer guide description and merchant readiness are explicit, avoiding premature feed publication',()=>{
  assert.match(blog,/Explore essential oil and hydrosol sourcing guides/);
  assert.ok(ops.includes('not a complete online purchase/payment checkout'));
  assert.ok(ops.includes('not confirmed in-stock inventory'));
  assert.ok(ops.includes('Only then generate the published feed'));
  assert.equal(products.filter(p=>p.status==='ready').length,11);
  assert.equal(draft.length,23); // header + 22 unverified planning rows
  assert.ok(draft.slice(1).every(row=>row.split('\t').length===8 && row.endsWith('\t')));
  assert.equal(fs.existsSync('public/merchant-feed.xml'),false);
  assert.equal(fs.existsSync('public/google-shopping-feed.tsv'),false);
});
