import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { products, categories } from '../../data/products.ts';
import { productPageStructuredData } from '../../lib/product-structured-data.ts';
import { productCategoryPath, productBreadcrumbStructuredData } from '../../lib/product-breadcrumbs.ts';
import sitemap from '../../app/sitemap.ts';
import robots from '../../app/robots.ts';

const source = path => fs.readFileSync(path, 'utf8');
const allPages = sitemap();
const indexedUrls = new Map(allPages.map(entry => [entry.url, entry]));
const live = products.filter(p => p.status==='ready'||p.status==='fresh');

test('13 available/fresh products and six categories all occur exactly once in canonical sitemap',()=>{
  assert.equal(live.length,13);
  assert.equal(categories.length,6);
  assert.equal(indexedUrls.size,allPages.length,'sitemap must not contain duplicate URLs');
  for(const p of live)assert.ok(indexedUrls.has('https://www.vgnaturals.com/products/'+p.slug),p.slug);
  for(const category of categories){
    const slug=category.toLowerCase().replaceAll(' ','-');
    assert.ok(indexedUrls.has('https://www.vgnaturals.com/categories/'+slug),category);
  }
});

test('19 target pages are not disallowed in robots.txt and all use https canonical base',()=>{
  const config=robots();
  assert.equal(config.sitemap,'https://www.vgnaturals.com/sitemap.xml');
  assert.ok(Array.isArray(config.rules));
  const google=config.rules.find(rule=>rule.userAgent==='Googlebot');
  assert.ok(google);
  assert.equal(google.allow,'/');
  assert.deepEqual(google.disallow,['/api/']);
  for(const url of indexedUrls.keys()){
    assert.ok(url.startsWith('https://www.vgnaturals.com/'),url);
    assert.ok(!url.includes('/cart')&&!url.includes('/checkout')&&!url.includes('/order-confirmation'));
  }
  const pd=source('app/products/[slug]/page.tsx');
  const cd=source('app/categories/[slug]/page.tsx');
  assert.ok(pd.includes('alternates: { canonical: `/products/${p.slug}` }'));
  assert.ok(cd.includes('alternates:{canonical:`/categories/${slug}`}'));
});

test('category trails match actual category paths for all 17 product variants',()=>{
  for(const product of products) {
    const categoryPath=productCategoryPath(product);
    assert.ok(categories.includes(product.category));
    assert.equal(categoryPath,'/categories/'+product.category.toLowerCase().replaceAll(' ','-'));
    assert.ok(indexedUrls.has('https://www.vgnaturals.com'+categoryPath));
    const markup=productBreadcrumbStructuredData(product);
    assert.equal(markup['@type'],'BreadcrumbList');
    assert.equal(markup.itemListElement.length,4);
    assert.deepEqual(markup.itemListElement.map(x=>x.position),[1,2,3,4]);
    assert.deepEqual(markup.itemListElement.map(x=>x.name),['Home','Products',product.category,product.name]);
    assert.equal(markup.itemListElement[2].item,'https://www.vgnaturals.com'+categoryPath);
    assert.equal(markup.itemListElement[3].item,'https://www.vgnaturals.com/products/'+product.slug);
  }
});

test('visible breadcrumb navigation agrees with canonical JSON-LD trail',()=>{
  const code=source('app/products/[slug]/page.tsx');
  assert.ok(code.includes('productBreadcrumbStructuredData(p)'));
  assert.ok(code.includes('productCategoryPath(p)'));
  assert.ok(code.includes('<Link href={categoryUrl} className="hover:underline">{p.category}</Link>'));
  assert.ok(code.includes('JSON.stringify([schema, breadcrumb])'));
  assert.ok(code.includes('aria-label="Breadcrumb"'));
});

test('Product snippets use real per-variant INR offers; no fabricated merchant listing fields',()=>{
  for(const product of products) {
    const schema=productPageStructuredData(product,'Listed product details','Product format');
    if(product.status==='coming-soon'){
      assert.equal(schema['@type'],'WebPage');
      assert.ok(!Object.hasOwn(schema,'offers'));
    } else {
      assert.equal(schema['@type'],'Product');
      assert.equal(schema.offers.length,product.variants.length);
      schema.offers.forEach((offer,i)=>{
        assert.equal(offer.priceCurrency,'INR');
        assert.equal(offer.price,product.variants[i].price);
        assert.equal(offer.seller['@id'],'https://www.vgnaturals.com/#organization');
        for(const key of ['availability','shippingDetails','hasMerchantReturnPolicy','review','aggregateRating'])
          assert.ok(!Object.hasOwn(offer,key),'Unverified field '+key);
      });
      assert.ok(!Object.hasOwn(schema,'review'));
      assert.ok(!Object.hasOwn(schema,'aggregateRating'));
    }
  }
});

test('cart and checkout remain noindex despite public navigation, while product pages remain indexable',()=>{
  for(const path of ['app/cart/layout.tsx','app/checkout/layout.tsx','app/order-confirmation/page.tsx']){
    assert.ok(/index:\s*false/.test(source(path)),path+' must stay noindex');
  }
  const layout=source('app/layout.tsx');
  assert.ok(layout.includes('robots:{index:true,follow:true}'));
  assert.ok(!source('app/products/[slug]/page.tsx').includes('index: false'));
});

test('P3 does not alter existing returns, shipping, stock or certification statements',()=>{
  const product=source('app/products/[slug]/page.tsx');
  const breadcrumbs=source('lib/product-breadcrumbs.ts');
  for(const risky of ['shippingRate','MerchantReturnPolicy','guaranteed delivery','certified organic','https://schema.org/InStock']){
    assert.ok(!breadcrumbs.includes(risky));
  }
  assert.ok(!product.includes('shippingDetails:'));
  assert.ok(!product.includes('hasMerchantReturnPolicy:'));
});
