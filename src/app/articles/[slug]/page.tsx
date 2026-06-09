import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getAllArticles } from '@/lib/articles';
import AdSlot from '@/components/AdSlot';
import { remark } from 'remark';
import html from 'remark-html';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
    },
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
  const midpoint = Math.floor(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, midpoint).join('</p>') + '</p>';
  const secondHalf = paragraphs.slice(midpoint).join('</p>');

  const related = getAllArticles()
    .filter((a) => a.category === article.category && a.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'HomeOrg Guides' },
    publisher: { '@type': 'Organization', name: 'HomeOrg Guides' },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className='max-w-3xl mx-auto px-4 py-8'>
        <nav className='text-sm text-gray-500 mb-6'>
          <a href='/' className='hover:text-blue-600'>Home</a>
          <span className='mx-2'>/</span>
          <a href={'/category/' + article.category.toLowerCase().replace(/\s+/g, '-')} className='hover:text-blue-600'>
            {article.category}
          </a>
          <span className='mx-2'>/</span>
          <span className='text-gray-800'>{article.title}</span>
        </nav>

        <header className='mb-8'>
          <span className='text-xs text-blue-600 font-semibold uppercase tracking-wider'>
            {article.category}
          </span>
          <h1 className='text-3xl md:text-4xl font-bold mt-2 mb-4'>{article.title}</h1>
          <div className='flex items-center gap-3 text-sm text-gray-500'>
            <time dateTime={article.date}>{article.date}</time>
            <span>·</span>
            <span>{article.readTime} min read</span>
          </div>
        </header>

        <div className='prose prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: firstHalf }} />

        <AdSlot id={'article-mid-' + slug} />

        <div className='prose prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: secondHalf }} />

        <AdSlot id={'article-bottom-' + slug} />

        {related.length > 0 && (
          <section className='mt-12 border-t pt-8'>
            <h2 className='text-xl font-bold mb-4'>Related Articles</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={'/articles/' + r.slug}
                  className='bg-white border rounded-lg p-4 hover:border-blue-600 hover:shadow-sm transition'
                >
                  <h3 className='font-semibold text-sm line-clamp-2'>{r.title}</h3>
                  <p className='text-xs text-gray-500 mt-1'>{r.date}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
