import { defineEventHandler } from 'h3';
import historyMap from '../../content/vi/history-map.json';

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const baseUrl = config.public.siteUrl;
  const locales = ['', '/en'];
  const staticRoutes = ['', '/lesson', '/gallery', '/glossary', '/about', '/terms', '/privacy', '/report', '/mailbox', '/badges'];
  
  const lessonIds = historyMap.eras.flatMap((era: any) => 
    era.levels.map((level: any) => level.lesson)
  );

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Generate routes for each locale
  for (const locale of locales) {
    // Static routes
    for (const route of staticRoutes) {
      xml += `
  <url>
    <loc>${baseUrl}${locale}${route}</loc>
    <changefreq>monthly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    }

    // Dynamic lesson routes
    for (const id of lessonIds) {
      xml += `
  <url>
    <loc>${baseUrl}${locale}/lesson/${id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    }
  }

  xml += '\n</urlset>';

  event.node.res.setHeader('Content-Type', 'text/xml');
  return xml;
});
