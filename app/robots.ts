import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  // Public search/retrieval access; preserve the existing API exclusion.
  const disallow = ['/api/'];
  return {
    rules: ['*', 'Googlebot', 'Bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'Claude-User'].map(userAgent => ({ userAgent, allow: '/', disallow })),
    sitemap: 'https://www.vgnaturals.com/sitemap.xml',
  };
}
