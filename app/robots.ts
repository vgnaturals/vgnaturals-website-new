import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots {
 const disallow=['/api/'];
 return {rules:[{userAgent:'*',allow:'/',disallow},{userAgent:'OAI-SearchBot',allow:'/',disallow}],sitemap:'https://www.vgnaturals.com/sitemap.xml'};
}
