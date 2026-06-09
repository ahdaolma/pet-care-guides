import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  keywords: string[];
}

export interface ArticleData extends ArticleMeta {
  content: string;
}

const articlesDir = path.join(process.cwd(), "content/articles");

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDir)) return [];
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));
  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(articlesDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(".md", ""),
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || "General",
      date: data.date || "",
      readTime: data.readTime || 5,
      keywords: data.keywords || [],
    } as ArticleMeta;
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
  return articles;
}

export function getArticleBySlug(slug: string): ArticleData | null {
  const filePath = path.join(articlesDir, slug + ".md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, title: data.title || "", excerpt: data.excerpt || "", category: data.category || "General", date: data.date || "", readTime: data.readTime || 5, keywords: data.keywords || [], content };
}

const ICONS: Record<string, string> = {
  Kitchen: "\uD83C\uDF73", Bedroom: "\uD83D\uDECF\uFE0F", Closet: "\uD83D\uDC57", Garage: "\uD83D\uDD27",
  Bathroom: "\uD83D\uDEC1", "Living Room": "\uD83D\uDECB\uFE0F", "Home Office": "\uD83D\uDCBB", General: "\uD83C\uDFE0",
  Dogs: "\uD83D\uDC15", Cats: "\uD83D\uDC08", "Small Pets": "\uD83D\uDC39", Fish: "\uD83D\uDC1F", Birds: "\uD83E\uDD9C",
  "Pet Health": "\uD83C\uDFE5", "Pet Food": "\uD83C\uDF56", "Pet Care": "\uD83D\uDC3E",
  Vegetables: "\uD83E\uDD55", "Indoor Plants": "\uD83E\uDEB4", Flowers: "\uD83C\uDF38", Landscaping: "\uD83C\uDFE1",
  Herbs: "\uD83C\uDF3F", Fruits: "\uD83C\uDF4E", Succulents: "\uD83C\uDF35",
  Plumbing: "\uD83D\uDD27", Electrical: "\u26A1", Walls: "\uD83E\uDDF1", Flooring: "\uD83C\uDFD7\uFE0F",
  Roofing: "\uD83C\uDFE0", Painting: "\uD83C\uDFA8", Windows: "\uD83E\uDE9F",
};

export function getCategories(): { name: string; slug: string; icon: string; count: number }[] {
  const articles = getAllArticles();
  const catMap = new Map<string, number>();
  articles.forEach((a) => catMap.set(a.category, (catMap.get(a.category) || 0) + 1));
  return Array.from(catMap.entries()).map(([name, count]) => ({
    name, slug: name.toLowerCase().replace(/\s+/g, "-"), icon: ICONS[name] || "\uD83D\uDCCB", count,
  })).sort((a, b) => b.count - a.count);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category.toLowerCase().replace(/\s+/g, "-") === category);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(".md", ""));
}
