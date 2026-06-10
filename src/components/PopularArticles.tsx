import { getAllArticles } from '@/lib/articles';
import ArticleCard from './ArticleCard';

export default function PopularArticles() {
  const articles = getAllArticles().slice(0, 6);
  return (
    <section className="my-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <h2 className="text-3xl font-bold text-blue-200 m-0">Popular Guides</h2>
        </div>
        <a href="/articles" className="text-blue-400 hover:text-blue-300 font-medium text-sm">View All →</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}