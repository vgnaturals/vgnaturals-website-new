import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { products, categories } from '../../data/products.ts';
import { categorySeo } from '../../data/category-seo.ts';
import { categoryGuides } from '../../data/category-guides.ts';
import { buyerGuides } from '../../data/buyer-guides.ts';

const source = path => fs.readFileSync(path,'utf8');
const footer=source('components/Footer.tsx');
const layout=source('app/layout.tsx');
const categoryPage=source('app/categories/[slug]/page.tsx');
const productsPage=source('app/products/page.tsx');
const productPage=source('app/products/[slug]/page.tsx');
const industryPage=source('app/industries/page.tsx');
const blogPage=source('app/blog/page.tsx');
const homePage=source('app/page.tsx');
const sitemap=source('app/sitemap.ts');
const cleanUrl=href=>href.startsWith('/products/')?products.some(p=>href==='/products/'+p.slug)
 :href.startsWith('/categories/')?categories.some(c=>href==='/categories/'+c.toLowerCase().replaceAll(' ','-'))
 :href.startsWith('/blog/')?!!buyerGuides[href.slice('/blog/'.length)]
 :['/','/about','/catalogue','/products','/sourcing-guide','/bulk-supply','/industries','/contact','/blog'].includes(href);

test('all six category URLs have unique truthful India-relevant metadata',()=>{
  const seen=new Set();
  assert.equal(categories.length,6);
  for(const name of categories) {
    const slug=name.toLowerCase().replaceAll(' ','-');
    const meta=categorySeo[slug];
    assert.ok(meta,'Missing category metadata: '+slug);
    assert.ok(meta.title.length>=25 && meta.title.length<=78, slug+' title length '+meta.title.length);
    assert.ok(meta.description.length>=90 && meta.description.length<=220,slug+' description length '+meta.description.length);
    assert.ok(!seen.has(meta.title),'Duplicate category title');
    seen.add(meta.title);
    assert.ok(!/certified organic|guaranteed nationwide|ships to every city/i.test(meta.description));
  }
  assert.ok(categoryPage.includes('categorySeo[slug]?.title'));
  assert.ok(categoryPage.includes('categorySeo[slug]?.description'));
});

test('all categories have genuine buying answers and valid internal guide targets',()=>{
  for(const name of categories) {
    const slug=name.toLowerCase().replaceAll(' ','-');
    const guide=categoryGuides[slug];
    assert.ok(guide,slug);
    assert.equal(guide.questions.length,3,slug);
    assert.ok(guide.questions.every(q=>q.question.trim().length>=15 && q.answer.trim().length>=70));
    assert.ok(cleanUrl(guide.guide),'Broken category guide: '+guide.guide);
  }
  assert.ok(!products.some(p=>p.category==='Agriculture'&&p.status==='ready'));
  assert.ok(categoryGuides.agriculture.intro.includes('no ready-to-order agricultural products'));
  assert.ok(categoryGuides['fresh-botanicals'].intro.includes('harvest'));
});

test('both catalogue collection pages expose existing-product ItemList and breadcrumb entities',()=>{
  for(const page of [categoryPage,productsPage]) {
    assert.ok(page.includes("'@type':'CollectionPage'"));
    assert.ok(page.includes("'@type':'ItemList'"));
    assert.ok(page.includes("'@type':'BreadcrumbList'"));
    assert.ok(page.includes("application/ld+json"));
    assert.ok(!page.includes("'@type':'Product'"),'Collection pages must not masquerade as single products');
  }
  assert.ok(productsPage.includes('filtered.map((p,i)'));
  assert.ok(categoryPage.includes('filtered.map((p,i)'));
  assert.ok(productsPage.includes('fresh leaves require harvest confirmation') || productsPage.includes('fresh leaves require harvest confirmation'.replace('fresh','Fresh')));
});

test('sitewide footer makes important botanical products crawlable from every page',()=>{
  assert.ok(layout.includes('<Footer/>'));
  assert.ok(footer.includes('styles.productIndex'));
  assert.ok(footer.includes('aria-label="Browse VG Naturals botanical products"'));
  assert.ok(footer.includes('delivery feasibility') || footer.includes('Delivery feasibility'));
  const links=[...footer.matchAll(/\['(\/products\/[^']+)','[^']+'\]/g)].map(m=>m[1]);
  assert.equal(links.length,10);
  assert.equal(new Set(links).size,links.length);
  for(const href of links)assert.ok(cleanUrl(href),'Non-existent footer target: '+href);
  assert.ok(source('components/Footer.module.css').includes('.productIndex'));
});

test('all industry buyer journeys link to existing catalogue or sourcing guidance',()=>{
  const industryTargets=[...industryPage.matchAll(/\['(\/[^']+)','(?:Review|Browse|Compare|Explore|Check|Read|Learn)[^']+'\]/g)].map(m=>m[1]);
  assert.equal(industryTargets.length,11,'Each of 11 industries needs its own relevant destination');
  for(const href of industryTargets)assert.ok(cleanUrl(href),'Broken industry target: '+href);
  assert.ok(industryPage.includes('India-wide botanical ingredient buyer questions'));
  assert.ok(industryPage.includes('not guaranteed')||industryPage.includes('confirmed for each request'));
  assert.ok(homePage.includes('accepts sourcing enquiries from businesses across India'));
});

test('sitewide Organization identity remains one Lucknow business with real profiles and phone',()=>{
  assert.ok(layout.includes('"@type": ["Organization", "LocalBusiness"]'));
  assert.ok(layout.includes('"sameAs"'));
  assert.ok(layout.includes('https://www.instagram.com/vgnaturalspvtltd/'));
  assert.ok(layout.includes('"contactPoint"'));
  assert.ok(layout.includes('"areaServed": {"@type":"Country","name":"India"}'));
  assert.ok(layout.includes('"addressLocality": "Lucknow"'));
  assert.ok(!layout.includes('"addressLocality": "Mumbai"'));
  assert.ok(!layout.includes('"addressLocality": "Delhi"'));
});

test('product titles/descriptions use verified catalogue content while retaining price and status contract',()=>{
  assert.equal(products.length,17);
  assert.ok(productPage.includes('content?.seoTitle'));
  assert.ok(productPage.includes('content?.summary'));
  assert.ok(productPage.includes('productPageStructuredData(p, summary, content?.form)'));
  assert.ok(productPage.includes('alternates: { canonical: `/products/${p.slug}` }'));
  assert.equal(products.filter(p=>p.status==='ready').length,11);
  assert.equal(products.filter(p=>p.status==='fresh').length,2);
  assert.equal(products.filter(p=>p.status==='coming-soon').length,4);
  assert.ok(products.filter(p=>p.status==='ready'&&['Essential Oils','Hydrosols'].includes(p.category)).every(p=>p.variants[0].price===150 && p.variants[1].price===225));
  assert.ok(!productPage.includes('guaranteed delivery to all Indian cities'));
});

test('sitemap modification dates reflect edited substantive hub pages only',()=>{
  for(const href of ["''","'/products'","'/industries'","'/blog'","'/categories/fresh-botanicals'","'/categories/herbal-teas'","'/categories/home-care'","'/categories/agriculture'"]) {
    assert.ok(sitemap.includes(href+":'2026-11-04'"), 'Missing Nov 4 lastmod: '+href);
  }
  assert.ok(sitemap.includes("const base='https://www.vgnaturals.com'"));
  assert.ok(!sitemap.includes("'/checkout'"));
  assert.ok(!sitemap.includes("'/cart'"));
  assert.ok(blogPage.includes('/categories/herbal-teas')&&blogPage.includes('/categories/home-care'));
});
