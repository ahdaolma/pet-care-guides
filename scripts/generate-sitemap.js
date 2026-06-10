const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "..", "content", "articles");
const publicDir = path.join(__dirname, "..", "public");
const siteUrl = process.argv[2] || "https://example.com";

if (!fs.existsSync(contentDir)) {
  console.error("No content/articles dir");
  process.exit(1);
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith(".md"));

const urls = [`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/articles</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`];

// Categories
const categories = new Set();
files.forEach(f => {
  const raw = fs.readFileSync(path.join(contentDir, f), "utf-8");
  const match = raw.match(/category:\s*(.+)/);
  if (match) categories.add(match[1].trim());
});

categories.forEach(cat => {
  const slug = cat.toLowerCase().replace(/\s+/g, "-");
  urls.push(`  <url>
    <loc>${siteUrl}/category/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
});

// Articles
files.forEach((f, i) => {
  const slug = f.replace(".md", "");
  const dateMatch = f.match(/^(\d{4}-\d{2}-\d{2})/);
  const lastmod = dateMatch ? dateMatch[1] : "2026-01-01";
  const priority = i < 10 ? "0.9" : i < 30 ? "0.8" : "0.6";
  urls.push(`  <url>
    <loc>${siteUrl}/articles/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`);
});

urls.push("</urlset>");

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), urls.join("\n"));
console.log(`Generated sitemap with ${urls.length - 2} URLs`);
