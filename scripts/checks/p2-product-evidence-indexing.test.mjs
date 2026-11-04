import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { products, categories } from '../../data/products.ts';
import { productPageStructuredData } from '../../lib/product-structured-data.ts';

const page = fs.readFileSync('app/products/[slug]/page.tsx','utf8');
const categoryPage = fs.readFileSync('app/categories/[slug]/page.tsx','utf8');
const sitemap = fs.readFileSync('app/sitemap.ts','utf8');
const evidence = fs.readFileSync('components/ProductEvidencePanel.tsx','utf8');
const readyFresh = products.filter(p=>p.status==='ready'||p.status==='fresh');

test('all 13 ready/fresh product URLs are canonical, product-image backed and in the sitemap',()=>{
  assert.equal(readyFresh.length,13);
  assert.ok(page.includes('alternates: { canonical: `/products/${p.slug}` }'));
  assert.ok(page.includes("products.map(p => ({ slug: p.slug }))"));
  for(const p of readyFresh){
    assert.equal(p.variants.length,p.status==='fresh'?1:2,p.slug);
    assert.ok(p.image.startsWith('/'),p.slug);
    assert.ok(fs.existsSync('public'+p.image),'Missing product image: '+p.slug+' '+p.image);
    assert.ok(sitemap.includes("'/products/"+p.slug+"':'2026-11-04'"),p.slug+' expected substantive sitemap modification date');
  }
});

test('six real categories retain canonical, crawlable, collection-not-product schema',()=>{
  assert.equal(categories.length,6);
  assert.ok(categoryPage.includes('alternates:{canonical:`/categories/${slug}`}'));
  assert.ok(categoryPage.includes("'@type':'CollectionPage'"));
  assert.ok(categoryPage.includes("'@type':'ItemList'"));
  assert.ok(categoryPage.includes("'@type':'BreadcrumbList'"));
  for(const name of categories) {
    const slug=name.toLowerCase().replaceAll(' ','-');
    assert.ok(sitemap.includes("...categories.map(c=>'/categories/'"),slug);
  }
});

test('13 priced products carry factual Offers while four Coming Soon listings have informational WebPage schema',()=>{
  for(const p of products) {
    const schema=productPageStructuredData(p,'Published information','Listed product form');
    assert.equal(schema.url,'https://www.vgnaturals.com/products/'+p.slug);
    if(p.status==='coming-soon') {
      assert.equal(schema['@type'],'WebPage',p.slug);
      assert.ok(!Object.hasOwn(schema,'offers'),p.slug);
    }else{
      assert.equal(schema['@type'],'Product',p.slug);
      assert.equal(schema.name,p.name);
      assert.equal(schema.offers.length,p.variants.length);
      schema.offers.forEach((o,i)=>{
        assert.equal(o.price,p.variants[i].price);
        assert.equal(o.priceCurrency,'INR');
        assert.equal(o.url,schema.url);
        assert.ok(!Object.hasOwn(o,'availability'),'No unsupported live stock assertion');
        assert.ok(!Object.hasOwn(o,'shippingDetails'),'No unapproved freight/policy assertion');
        assert.ok(!Object.hasOwn(o,'hasMerchantReturnPolicy'),'No unapproved returns');
      });
      assert.ok(schema.image && fs.existsSync('public'+p.image));
    }
  }
});

test('category-specific procurement questions cover all five available product forms',()=>{
  for(const name of ['Essential Oils','Hydrosols','Herbal Teas','Fresh Botanicals','Home Care'])
    assert.ok(evidence.includes("'"+name+"': [") || evidence.includes("  "+name+": ["),name);
  assert.ok(evidence.includes('product.status === \'coming-soon\') return null'));
  assert.ok(evidence.includes("product.variants.map(v =>"));
  assert.ok(evidence.includes('product.status === \'fresh\''));
  assert.ok(evidence.includes('confirm stock before ordering'));
});

test('product evidence separates published details from batch reports and sourced materials',()=>{
  assert.ok(page.includes('<ProductEvidencePanel product={p} content={content} />'));
  assert.ok(evidence.includes('A website product photo or a farm photograph is not a batch analysis'));
  assert.ok(evidence.includes('not automatically included with every listing'));
  assert.ok(evidence.includes('Retail prices exclude packaging and courier charges'));
  assert.ok(evidence.includes('/about#farm-gallery-title'));
  assert.ok(fs.existsSync('public/catalogue-assets/botanical-farm-field-landscape.jpg'));
  const about=fs.readFileSync('app/about/page.tsx','utf8');
  assert.ok(about.includes('id="farm-gallery-title"'));
});

test('no invented certificates, cures, guaranteed origin, or claims are introduced by this panel',()=>{
  for(const phrase of ['certified organic oil','lab-tested batches guaranteed','FDA-approved','kills 99.9%','medical treatment','all packs are from our own farm'])
    assert.ok(!evidence.includes(phrase),phrase);
  assert.ok(!evidence.includes("'@type':'AggregateRating'"));
});
