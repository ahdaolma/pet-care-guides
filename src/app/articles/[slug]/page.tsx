import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getAllArticles } from '@/lib/articles';
import AdSlot from '@/components/AdSlot';
import { remark } from 'remark';
import html from 'remark-html';

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title, description: article.excerpt, keywords: article.keywords,
    openGraph: { title: article.title, description: article.excerpt, type: 'article', publishedTime: article.date },
    alternates: { canonical: '/articles/' + slug },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const processed = await remark().use(html).process(article.content);
  const contentHtml = processed.toString();

  const paragraphs = contentHtml.split('</p>');
  const mid = Math.floor(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, mid).join('</p>') + '</p>';
  const secondHalf = paragraphs.slice(mid).join('</p>');

  const related = getAllArticles().filter(a => a.category === article.category && a.slug !== slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Pet Care Guides' },
    publisher: { '@type': 'Organization', name: 'Pet Care Guides' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-6 py-8 bg-[#12080D]">
        <nav className="text-sm text-rose-800 mb-6" style={{ fontFamily: '"Nunito", sans-serif' }}>
          <a href="/" className="hover:text-rose-400 transition-colors">Home</a>
          <span className="mx-2">&middot;</span>
          <a href={'/category/' + article.category.toLowerCase().replace(/\s+/g, '-')} className="hover:text-rose-400 transition-colors">
            {article.category}
          </a>
          <span className="mx-2">&middot;</span>
          <span className="text-rose-300">{article.title}</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-bold text-rose-400 bg-rose-900/20 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-rose-100 mt-4 mb-4 leading-tight" style={{ fontFamily: '"Nunito", sans-serif' }}>
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-rose-800" style={{ fontFamily: '"Nunito", sans-serif' }}>
            <time dateTime={article.date}>{article.date}</time>
            <span>&middot;</span>
            <span>{article.readTime} min read</span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-rose-200
          prose-p:text-rose-100/70 prose-p:leading-relaxed
          prose-strong:text-rose-200
          prose-a:text-rose-400 prose-a:no-underline hover:prose-a:text-rose-300
          prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-rose-800/20
          prose-li:text-rose-100/70 prose-li:marker:text-rose-600
          prose-code:text-rose-300 prose-code:bg-rose-900/20 prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: firstHalf }} />

        <AdSlot id={'article-mid-' + slug} />

        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-rose-200
          prose-p:text-rose-100/70 prose-p:leading-relaxed
          prose-strong:text-rose-200
          prose-a:text-rose-400 prose-a:no-underline hover:prose-a:text-rose-300
          prose-img:rounded-2xl prose-img:shadow-lg prose-img:border prose-img:border-rose-800/20
          prose-li:text-rose-100/70 prose-li:marker:text-rose-600"
          dangerouslySetInnerHTML={{ __html: secondHalf }} />

        <AdSlot id={'article-bottom-' + slug} />

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-rose-900/20">
            <h2 className="text-xl font-extrabold text-rose-200 mb-6" style={{ fontFamily: '"Nunito", sans-serif' }}>Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map(r => (
                <a key={r.slug} href={'/articles/' + r.slug}
                  className="bg-[#200F17] border border-rose-800/20 rounded-2xl p-4 hover:border-rose-400/40 hover:bg-[#24131B] transition group">
                  <span className="text-xs font-bold text-rose-400 bg-rose-900/20 px-2 py-0.5 rounded-full">{r.category}</span>
                  <h3 className="font-bold text-sm text-rose-100 mt-2 line-clamp-2 group-hover:text-rose-300 transition-colors" style={{ fontFamily: '"Nunito", sans-serif' }}>{r.title}</h3>
                  <p className="text-xs text-rose-800 mt-2">{r.date} &middot; {r.readTime} min</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
