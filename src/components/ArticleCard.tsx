import type { ArticleMeta } from '@/lib/articles';

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <a
      href={'/articles/' + article.slug}
      className='bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-600 hover:shadow-md transition block'
    >
      <span className='text-xs text-blue-600 font-semibold uppercase tracking-wider'>
        {article.category}
      </span>
      <h3 className='text-lg font-semibold mt-2 mb-2 line-clamp-2'>
        {article.title}
      </h3>
      <p className='text-sm text-gray-600 line-clamp-3'>{article.excerpt}</p>
      <div className='flex items-center gap-2 mt-4 text-xs text-gray-400'>
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.readTime} min read</span>
      </div>
    </a>
  );
}
