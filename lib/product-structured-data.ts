import type { Product } from '@/data/products';

/**
 * Match structured data to actual purchasability.
 * Coming Soon (or unpriced) pages are informational, not eligible merchant offers.
 */
export function productPageStructuredData(p: Product, summary: string, form?: string) {
  const url = `https://www.vgnaturals.com/products/${p.slug}`;
  if (p.status === 'coming-soon' || p.variants.length === 0) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': url + '#webpage',
      url,
      name: p.name + ' — Coming Soon at VG Naturals',
      description: summary,
      about: { '@type': 'Thing', name: p.name },
      isPartOf: { '@id': 'https://www.vgnaturals.com/#website' },
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': url + '#product',
    url,
    category: p.category,
    additionalProperty: [
      ...(p.botanicalName ? [{ '@type': 'PropertyValue', name: 'Listed botanical identity', value: p.botanicalName }] : []),
      ...(form ? [{ '@type': 'PropertyValue', name: 'Product form', value: form }] : []),
    ],
    name: p.name,
    description: summary,
    image: p.image ? `https://www.vgnaturals.com${p.image}` : undefined,
    brand: { '@type': 'Brand', name: 'VG Naturals' },
    // Fresh products have a published pack price, but availability must be confirmed.
    // No invented stock, shipment, return, test report or review assertions.
    offers: p.variants.map(v => ({
      '@type': 'Offer',
      name: `${p.name} — ${v.label}`,
      ...(p.status === 'fresh' ? { description: 'Listed pack price. Harvest availability and delivery feasibility must be confirmed before ordering. Packaging and courier charges are additional.' } : {}),
      seller: { '@id': 'https://www.vgnaturals.com/#organization' },
      priceCurrency: 'INR',
      price: v.price,
      url,
    })),
  };
}
