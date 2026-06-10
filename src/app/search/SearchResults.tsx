'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ArticleMeta } from '@/lib/articles';

const ICONS: Record<string, string> = {
  Dogs: '\uD83D\uDC15', Cats: '\uD83D\uDC08', 'Small Pets': '\uD83D\uDC39', Fish: '\uD83D\uDC1F', Birds: '\uD83E\uDD9C',
  'Pet Health': '\uD83C\uDFE5', 'Pet Food': '\uD83C\uDF56', 'Pet Care': '\uD83D\uDC3E', General: '\u2764\uFE0F',
};

function Quote({ children }: { children: string }) {
  return <>{'\u201C'}{children}{'\u201D'}</>;
}

function SearchResultsInner({ articles }: { articles: ArticleMeta[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-6">{'\uD83D\uDC3E'}</div>
        <h2 className="text-2xl font-extrabold text-rose-200 mb-3" style={{ fontFamily: '"Nunito", sans-serif' }}>
          Search hundreds of expert pet care guides.
        </h2>
        <p className="text-rose-700 text-sm" style={{ fontFamily: '"Nunito", sans-serif' }}>
          Find tips on nutrition, training, health, and more for your furry, feathery, or scaly friend.
        </p>
      </div>
    );
  }

  const lower = query.toLowerCase();
  const results = articles.filter((a) =>
    a.title.toLowerCase().includes(lower) ||
    a.excerpt.toLowerCase().includes(lower) ||
    a.keywords.some((k) => k.toLowerCase().includes(lower)) ||
    a.category.toLowerCase().includes(lower)
  );

  if (results.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-6">{'\uD83D\uDD0D'}</div>
        <h2 className="text-2xl font-extrabold text-rose-200 mb-3" style={{ fontFamily: '"Nunito", sans-serif' }}>
          No results for <Quote>{query}</Quote>
        </h2>
        <p className="text-rose-700 text-sm" style={{ fontFamily: '"Nunito", sans-serif' }}>
          Try a different search term or browse our categories.
        </p>
        <a
          href="/articles"
          className="inline-block mt-6 px-5 py-2.5 rounded-2xl bg-rose-400/10 border border-rose-400/30 text-rose-300 text-sm font-semibold hover:bg-rose-400/20 transition-colors"
          style={{ fontFamily: '"Nunito", sans-serif' }}
        >
          Browse all guides
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <p className="text-rose-700 text-sm mb-8" style={{ fontFamily: '"Nunito", sans-serif' }}>
        {results.length} result{results.length !== 1 ? 's' : ''} for <Quote>{query}</Quote>
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {results.map((article) => {
          const icon = ICONS[article.category] || '\u2764\uFE0F';
          return (
            <a
              key={article.slug}
              href={'/articles/' + article.slug}
              className="bg-[#200F17] border border-rose-800/30 rounded-2xl p-6 hover:border-rose-400/50 transition-all block group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{icon}</span>
                <span
                  className="text-xs font-semibold uppercase tracking-wider text-rose-400 bg-rose-400/10 px-2.5 py-0.5 rounded-full"
                  style={{ fontFamily: '"Nunito", sans-serif' }}
                >
                  {article.category}
                </span>
              </div>
              <h3
                className="text-lg font-extrabold text-rose-200 mb-2 line-clamp-2 group-hover:text-rose-300 transition-colors"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                {article.title}
              </h3>
              <p
                className="text-sm text-rose-600 line-clamp-3 mb-4"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                {article.excerpt}
              </p>
              <div
                className="flex items-center gap-2 text-xs text-rose-700"
                style={{ fontFamily: '"Nunito", sans-serif' }}
              >
                <span>{article.date}</span>
                <span className="text-rose-800">{'\u00B7'}</span>
                <span>{article.readTime} min read</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function SearchResults({ articles }: { articles: ArticleMeta[] }) {
  return (
    <div className="min-h-screen bg-[#12080D]">
      <Suspense fallback={
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="w-8 h-8 border-2 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }>
        <SearchResultsInner articles={articles} />
      </Suspense>
    </div>
  );
}
