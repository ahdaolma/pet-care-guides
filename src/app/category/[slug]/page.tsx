import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategories().find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} Organization Guides | HomeOrg Guides`,
    description: `Expert ${cat.name.toLowerCase()} organization tips, storage ideas, and decluttering guides.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategories().find((c) => c.slug === slug);
  if (!cat) notFound();
  const articles = getArticlesByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{cat.icon} {cat.name} Organization</h1>
      <p className="text-gray-600 mb-8">{articles.length} guides for {cat.name.toLowerCase()} organization.</p>
      <AdSlot id={`category-${slug}-top`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
