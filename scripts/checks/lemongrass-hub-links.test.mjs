import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buyerGuides } from '../../data/buyer-guides.ts';
import { products } from '../../data/products.ts';
import { botanicalRanges } from '../../data/botanical-ranges.ts';

const category = fs.readFileSync('app/categories/[slug]/page.tsx','utf8');
const botanical = fs.readFileSync('app/botanicals/[slug]/page.tsx','utf8');
const sitemap = fs.readFileSync('app/sitemap.ts','utf8');
const product = fs.readFileSync('app/products/[slug]/page.tsx','utf8');
const schema = fs.readFileSync('lib/product-structured-data.ts','utf8');
const config = fs.readFileSync('next.config.ts','utf8');

test('focused category navigation links to genuine Lemongrass product and procurement destinations',()=>{
  assert.ok(category.includes("slug==='hydrosols'||slug==='essential-oils'"));
  for(const path of [
    '/products/lemongrass-essential-oil',
    '/products/lemongrass-hydrosol',
    '/blog/essential-oil-bulk-buying',
    '/blog/lemongrass-hydrosol-bulk-supply-cosmetic-formulators'
  ]) assert.ok(category.includes(path),path);
});

test('Lemongrass botanical hub differentiates hydrosol and oil with relevant links',()=>{
  assert.ok(botanical.includes("r.slug === 'lemongrass'"));
  assert.ok(botanical.includes("These are different ingredients"));
  assert.ok(botanical.includes('/products/lemongrass-essential-oil'));
  assert.ok(botanical.includes('/products/lemongrass-hydrosol'));
  assert.ok(botanical.includes('/blog/lemongrass-hydrosol-bulk-supply-cosmetic-formulators'));
});

test('every new link targets an existing product, buyer guide or botanical range',()=>{
  const paths=[
    '/products/lemongrass-essential-oil',
    '/products/lemongrass-hydrosol',
    '/blog/essential-oil-bulk-buying',
    '/blog/lemongrass-hydrosol-bulk-supply-cosmetic-formulators'
  ];
  for (const path of paths) {
    const slug=path.split('/')[2];
    if(path.startsWith('/products/'))assert.ok(products.some(p=>p.slug===slug),path);
    else assert.ok(buyerGuides[slug],path);
  }
  assert.ok(botanicalRanges.some(r=>r.slug==='lemongrass'));
});

test('updated URLs retain accurate sitemap lastmod; canonical and Product schema remain intact',()=>{
  for(const path of ['/categories/hydrosols','/categories/essential-oils']) {
    assert.ok(sitemap.includes("'"+path+"':'2026-11-04'"),path);
  }
  assert.ok(sitemap.includes("'/botanicals/lemongrass':'2026-11-05'"));
  assert.ok(sitemap.includes("const base='https://www.vgnaturals.com'"));
  assert.ok(product.includes('alternates: { canonical: `/products/${p.slug}` }'));
  assert.ok(schema.includes("priceCurrency: 'INR'"));
  assert.ok(schema.includes('price: v.price'));
  assert.ok(config.includes("destination: '/products/lemongrass-hydrosol'"));
});

test('buyer guidance is factual and avoids invented organic certification or guarantees',()=>{
  const text=category+botanical;
  for (const phrase of ['certified organic','guaranteed COA','guaranteed stock','guaranteed dispatch']) {
    assert.ok(!text.includes(phrase),phrase);
  }
  assert.ok(category.includes('Confirm the offered specification'));
  assert.ok(botanical.includes('confirm the specification'));
});
