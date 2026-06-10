import { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "All Guides | Pet Care Guides",
  description: "Browse 100+ expert pet care guides. Dog, cat, fish, bird, and small pet advice.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-extrabold text-rose-100 mb-2">All Pet Care Guides</h1>
      <p className="text-rose-700 mb-8">{articles.length} guides to keep your best friend healthy and happy.</p>
      <AdSlot id="articles-top" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
