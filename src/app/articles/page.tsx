import { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Articles | HomeOrg Guides",
  description: "Browse all our home organization guides, decluttering tips, and storage solutions.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">All Articles</h1>
      <p className="text-gray-600 mb-8">{articles.length} guides to help you organize every room.</p>
      <AdSlot id="articles-top" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
