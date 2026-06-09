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
  const articles = files
    .map((file) => {
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
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return articles;
}

export function getArticleBySlug(slug: string): ArticleData | null {
  const filePath = path.join(articlesDir, slug + ".md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    category: data.category || "General",
    date: data.date || "",
    readTime: data.readTime || 5,
    keywords: data.keywords || [],
    content,
  };
}

export function getCategories(): { name: string; slug: string; icon: string; count: number }[] {
  const articles = getAllArticles();
  const catMap = new Map<string, number>();
  articles.forEach((a) => catMap.set(a.category, (catMap.get(a.category) || 0) + 1));
  return Array.from(catMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      icon: "#",
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter(
    (a) => a.category.toLowerCase().replace(/\s+/g, "-") === category
  );
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(".md", ""));
}
