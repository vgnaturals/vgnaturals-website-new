import type { Product } from '@/data/products';

const baseUrl = 'https://www.vgnaturals.com';

/**
 * A product belongs to one of the actual public VG Naturals category pages.
 * Breadcrumbs describe a real buyer navigation route; they are not fabricated
 * product reviews, certifications, shipping/return promises or stock claims.
 */
export function productCategoryPath(product: Product): string {
  return '/categories/' + product.category.toLowerCase().replaceAll(' ', '-');
}

export function productBreadcrumbStructuredData(product: Product) {
  const path = '/products/' + product.slug;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl + '/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: baseUrl + '/products' },
      { '@type': 'ListItem', position: 3, name: product.category, item: baseUrl + productCategoryPath(product) },
      { '@type': 'ListItem', position: 4, name: product.name, item: baseUrl + path },
    ],
  };
}
