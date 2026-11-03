import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync('app/products/[slug]/page.tsx', 'utf8');
const buyer = fs.readFileSync('components/LemongrassBuyerChecklist.tsx', 'utf8');
const home = fs.readFileSync('app/page.tsx', 'utf8');
const sitemap = fs.readFileSync('app/sitemap.ts', 'utf8');
const catalogue = fs.readFileSync('data/products.ts', 'utf8');

test('both commercial Lemongrass products retain dedicated metadata and canonical URLs', () => {
  for (const slug of ['lemongrass-essential-oil', 'lemongrass-hydrosol']) {
    assert.ok(page.includes("p.slug === '" + slug + "'"), 'missing metadata: ' + slug);
    assert.ok(page.includes("alternates: { canonical: " + String.fromCharCode(96) + "/products/"));
    assert.ok(catalogue.includes('"slug": "' + slug + '"'), 'unknown product: ' + slug);
  }
});

test('new buyer section is linked only on the two intended product pages', () => {
  assert.ok(page.includes("import LemongrassBuyerChecklist"));
  assert.ok(page.includes('<LemongrassBuyerChecklist product={p} />'));
  assert.ok(buyer.includes("product.slug === 'lemongrass-hydrosol'"));
  assert.ok(buyer.includes("product.slug === 'lemongrass-essential-oil'"));
  assert.ok(buyer.includes('if (!hydrosol && !oil) return null'));
  assert.ok(page.includes('href="#lemongrass-buyer-checklist"'));
});

test('comparison and procurement links lead to existing products and buyer guides', () => {
  for (const href of [
    '/products/lemongrass-essential-oil',
    '/products/lemongrass-hydrosol',
    '/blog/lemongrass-hydrosol-bulk-supply-cosmetic-formulators',
    '/blog/essential-oil-bulk-buying'
  ]) {
    assert.ok(buyer.includes(href), 'missing buyer destination: ' + href);
  }
  assert.ok(home.includes('href="/products/lemongrass-hydrosol"'));
  assert.ok(home.includes('href="/products/lemongrass-essential-oil"'));
  assert.ok(buyer.includes("encodeURIComponent(product.name)"));
});

test('Product offers still derive from actual variants; unknown inventory and policies are not invented', () => {
  assert.ok(page.includes('offers: (p.status ==='));
  assert.ok(page.includes('p.variants.map(v => ({'));
  assert.ok(page.includes("priceCurrency: 'INR'"));
  assert.ok(page.includes('price: v.price'));
  assert.ok(page.includes("name: 'Product form', value: content.form"));
  assert.ok(!page.includes('shippingDetails:'));
  assert.ok(!page.includes('hasMerchantReturnPolicy:'));
  assert.ok(!page.includes("'https://schema.org/InStock'"));
  assert.ok(buyer.includes('their availability must'));
});

test('updated URLs have appropriate sitemap modification dates', () => {
  for (const path of ["''", "'/products/lemongrass-essential-oil'", "'/products/lemongrass-hydrosol'"]) {
    assert.ok(sitemap.includes(path + ":'2026-11-03'"), 'sitemap missing ' + path);
  }
  assert.ok(sitemap.includes("const base='https://www.vgnaturals.com'"));
});
