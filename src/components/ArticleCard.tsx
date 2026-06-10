import type { ArticleMeta } from '@/lib/articles';

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <a href={'/articles/' + article.slug}
      className="bg-[#200F17] rounded-2xl border border-rose-800/20 p-6 hover:border-rose-400/50 hover:bg-[#24131B] hover:shadow-lg transition block group"
      style={{ fontFamily: '"Nunito", sans-serif' }}>
      <span className="text-xs font-bold text-rose-400 bg-rose-900/20 px-2 py-0.5 rounded-full">
        {article.category}
      </span>
      <h3 className="text-lg font-extrabold text-rose-100 mt-3 mb-2 line-clamp-2 group-hover:text-rose-300 transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-rose-700/70 line-clamp-3">{article.excerpt}</p>
      <div className="flex items-center gap-2 mt-4 text-xs text-rose-800">
        <span>{article.date}</span>
        <span>&middot;</span>
        <span>{article.readTime} min</span>
      </div>
    </a>
  );
}
