import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://pet-care-guides.vercel.app';
const OUT_DIR = path.join(process.cwd(), 'out');

// Get all article slugs from content directory
const articlesDir = path.join(process.cwd(), 'content', 'articles');
const slugs = fs.readdirSync(articlesDir)
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace('.md', ''));

// Get categories
const categories = [...new Set(
  slugs.map(s => {
    const raw = fs.readFileSync(path.join(articlesDir, s + '.md'), 'utf-8');
    const match = raw.match(/category: "(.+)"/);
    return match ? match[1].toLowerCase().replace(/\s+/g, '-') : null;
  }).filter(Boolean)
)];

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/articles', priority: '0.9', changefreq: 'daily' },
  ...slugs.map(s => ({ loc: `/articles/${s}`, priority: '0.8', changefreq: 'weekly' })),
  ...categories.map(c => ({ loc: `/category/${c}`, priority: '0.7', changefreq: 'weekly' })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemap);
console.log(`Sitemap generated: ${urls.length} URLs`);
