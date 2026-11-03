import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import nextConfig from '../../next.config.ts';

const expectedLegacy = new Map([
  ['/about-us', '/about'],
  ['/contact-us', '/contact'],
  ['/lemongrass-essential-oil', '/products/lemongrass-essential-oil'],
  ['/lemongrass-hydrosol', '/products/lemongrass-hydrosol'],
  ['/products/lemongrass/lemongrass-essential-oil', '/products/lemongrass-essential-oil'],
  ['/products/tulsi', '/botanicals/tulsi'],
  ['/applications', '/industries'],
  ['/b2b-solutions', '/bulk-supply'],
  ['/request-quote', '/bulk-supply'],
  ['/request-sample', '/bulk-supply'],
  ['/resources', '/blog'],
  ['/terms-conditions', '/terms-and-conditions'],
  ['/choosing-lemongrass-ingredients-for-b2b-products', '/blog/lemongrass-oil-hydrosol-tea-buying-guide']
]);
const redirects = await nextConfig.redirects();
const allSources = redirects.map(rule => rule.source);
const bySource = new Map(redirects.map(rule => [rule.source, rule]));

test('every GSC legacy URL has one permanent redirect to its intended destination', () => {
  for (const [oldPath, destination] of expectedLegacy) {
    const rule = bySource.get(oldPath);
    assert.ok(rule, 'missing '+oldPath);
    assert.equal(rule.destination, destination);
    assert.equal(rule.permanent, true);
  }
});

test('no duplicate sources, self-redirects or redirect chains within Next config', () => {
  assert.equal(new Set(allSources).size, redirects.length);
  for (const rule of redirects) {
    assert.notEqual(rule.source, rule.destination, rule.source);
    assert.ok(!bySource.has(rule.destination), 'redirect chain '+rule.source+' -> '+rule.destination);
  }
});

test('redirect destinations correspond to real pages or configured dynamic slugs', () => {
  const productSource = fs.readFileSync('data/products.ts', 'utf8');
  const botanicalSource = fs.readFileSync('data/botanical-ranges.ts', 'utf8');
  const guideSource = fs.readFileSync('data/buyer-guides.ts', 'utf8');
  for (const destination of expectedLegacy.values()) {
    if (destination.startsWith('/products/')) {
      const slug = destination.split('/')[2];
      assert.ok(productSource.includes('"slug": "' + slug + '"'), 'missing product '+slug);
      assert.ok(fs.existsSync('app/products/[slug]/page.tsx'));
    } else if (destination.startsWith('/botanicals/')) {
      const slug = destination.split('/')[2];
      assert.ok(botanicalSource.includes("slug:'" + slug + "'") || botanicalSource.includes('slug: "' + slug + '"'), 'missing botanical '+slug);
    } else if (destination.startsWith('/blog/')) {
      const slug = destination.split('/')[2];
      assert.ok(guideSource.includes(slug), 'missing buyer guide '+slug);
      assert.ok(fs.existsSync('app/blog/[slug]/page.tsx'));
    } else {
      assert.ok(fs.existsSync('app' + destination + '/page.tsx'), 'missing static destination '+destination);
    }
  }
});

test('canonical base and destination page metadata retain www HTTPS URLs', () => {
  const layout = fs.readFileSync('app/layout.tsx', 'utf8');
  const product = fs.readFileSync('app/products/[slug]/page.tsx', 'utf8');
  const botanical = fs.readFileSync('app/botanicals/[slug]/page.tsx', 'utf8');
  const sitemap = fs.readFileSync('app/sitemap.ts', 'utf8');
  const tick=String.fromCharCode(96), dollar=String.fromCharCode(36);
  assert.ok(layout.includes("metadataBase:new URL('https://www.vgnaturals.com')"));
  assert.ok(product.includes('canonical: '+tick+'/products/'+dollar+'{p.slug}'+tick));
  assert.ok(botanical.includes('canonical: '+tick+'/botanicals/'+dollar+'{r.slug}'+tick));
  assert.ok(sitemap.includes("const base='https://www.vgnaturals.com'"));
});
