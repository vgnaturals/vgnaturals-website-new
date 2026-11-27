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

test('all 18 listed product URLs are canonical and in the sitemap; legacy image evidence preserved',()=>{
  assert.equal(readyFresh.length,18);
  assert.ok(page.includes('alternates: { canonical: `/products/${p.slug}` }'));
  assert.ok(page.includes("products.map(p => ({ slug: p.slug }))"));
  for(const p of readyFresh){
    const expansion=["german-chamomile-oil","chamomile-hydrosol","chamomile-flowers","vetiver-oil","vetiver-hydrosol"].includes(p.slug);
    assert.equal(p.variants.length,expansion||p.status==='fresh'?1:2,p.slug);
    if(!expansion||p.image){assert.ok(p.image.startsWith('/'),p.slug);assert.ok(fs.existsSync('public'+p.image),'Missing product image: '+p.slug+' '+p.image);}
    assert.ok(sitemap.includes("'/products/"+p.slug+"':'"+(p.slug.startsWith('vetiver-')?'2026-11-27':expansion?'2026-11-26':'2026-11-04')+"'"),p.slug+' expected sitemap modification date');
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

test('18 priced products carry factual Offers while two Coming Soon listings have informational WebPage schema',()=>{
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
      if(p.image)assert.ok(schema.image && fs.existsSync('public'+p.image));else {assert.ok(["german-chamomile-oil","chamomile-hydrosol","chamomile-flowers","vetiver-oil","vetiver-hydrosol"].includes(p.slug));assert.equal(schema.image,undefined);}
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


test('all five Chamomile and Vetiver product images are real WebP repository assets with public product schema URLs',()=>{
 const paths={"german-chamomile-oil":"/images/products/chamomile-essential-oil-vg-naturals.webp","chamomile-flowers":"/images/products/chamomile-flowers-vg-naturals.webp","chamomile-hydrosol":"/images/products/chamomile-hydrosol-vg-naturals.webp","vetiver-oil":"/images/products/vetiver-oil-vg-naturals.webp","vetiver-hydrosol":"/images/products/vetiver-hydrosol-vg-naturals.webp"};
 for(const [slug,path] of Object.entries(paths)){
  const p=products.find(p=>p.slug===slug); assert.equal(p.image,path);
  const bytes=fs.readFileSync('public'+path);assert.ok(bytes.length>30000);assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');
  assert.equal(productPageStructuredData(p,'Published information').image,'https://www.vgnaturals.com'+path);
 }

});


test('city navigation provides 20 distinct reference PINs and non-indexed buyer routes',()=>{
 const city=fs.readFileSync('data/cities.ts','utf8');const cards=fs.readFileSync('components/CityCards.tsx','utf8');
 assert.equal([...city.matchAll(/"pin": "\d{6}"/g)].length,20);assert.ok(city.includes('https://www.google.com/maps/search/?api=1&query='));assert.ok(cards.includes('cityPath(c,p?.slug)'));assert.ok(cards.includes('pinMap(c)'));
 for(const path of ['app/india/[city]/page.tsx','app/india/[city]/[product]/page.tsx']){const route=fs.readFileSync(path,'utf8');assert.ok(route.includes('robots:{index:false,follow:true}'));assert.ok(route.includes('quotePath(c'));}
 assert.ok(!sitemap.includes('/india/'));assert.ok(fs.readFileSync('app/layout.tsx','utf8').includes('<CityCards/><Footer/>'));
});
