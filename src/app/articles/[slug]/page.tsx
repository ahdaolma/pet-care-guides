import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getAllArticles } from '@/lib/articles';
import BackToTop from '@/components/BackToTop';
import ReadingProgress from '@/components/ReadingProgress';
import AdSlot from '@/components/AdSlot';
import MobileTOC from '@/components/MobileTOC';
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

// Extract headings from HTML for TOC
function extractHeadings(html: string) {
  const matches = [...html.matchAll(/<h(\d)[^>]*>(.*?)<\/h\1>/gi)];
  return matches.map(m => ({ level: parseInt(m[1]), text: m[2].replace(/<[^>]*>/g, ''), id: m[2].replace(/<[^>]*>/g, '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const processed = await remark().use(html).process(article.content);
  const contentHtml = processed.toString().replace(/<img /g, '<img loading="lazy" decoding="async" ');
  const headings = extractHeadings(contentHtml);

  // Extract FAQ items for structured data (max 5 Q&A pairs)
  const faqItems: { question: string; answer: string }[] = [];
  const faqRegex = /<h[23][^>]*>(.*?)<\/h[23]>\s*<p>(.*?)<\/p>/gi;
  let faqMatch: RegExpExecArray | null;
  while ((faqMatch = faqRegex.exec(contentHtml)) !== null && faqItems.length < 5) {
    const q = faqMatch[1].replace(/<[^>]*>/g, '').trim();
    const a = faqMatch[2].replace(/<[^>]*>/g, '').trim();
    if (q.length > 10 && a.length > 30) faqItems.push({ question: q, answer: a });
  }
  const faqLd = faqItems.length >= 2 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;

  const paragraphs = contentHtml.split('</p>');
  const mid = Math.floor(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, mid).join('</p>') + '</p>';
  const secondHalf = paragraphs.slice(mid).join('</p>');

  const related = getAllArticles().filter(a => a.category === article.category && a.slug !== slug).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'PetCare Guides' },
    publisher: { '@type': 'Organization', name: 'PetCare Guides' },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pet-care-guides.vercel.app' },
      { '@type': 'ListItem', position: 2, name: article.category, item: 'https://pet-care-guides.vercel.app/category/' + article.category.toLowerCase().replace(/\s+/g, '-') },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  };

  return (<>
      <ReadingProgress />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="toc">
                <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-4">📑 On This Page</h4>
                <nav>
                  {headings.filter(h => h.level <= 2).map((h, i) => (
                    <a key={i} href={'#' + h.id} style={{ paddingLeft: (h.level - 1) * 12 + 12 + 'px' }}>
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Mobile TOC */}
            <MobileTOC headings={headings} />

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 breadcrumb">
              <a href="/">Home</a><span>/</span>
              <a href={'/category/' + article.category.toLowerCase().replace(/\s+/g, '-')}>{article.category}</a>
            </nav>

            {/* Header */}
            <header className="mb-10">
              <span className="tag mb-4">{article.category}</span>
              <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight" style={{ WebkitTextFillColor: 'initial' }}>
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>📅 {article.date}</span>
                <span>⏱ {article.readTime} min read</span>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:text-blue-200
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-strong:text-blue-200
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-img:rounded-xl prose-img:shadow-lg
              prose-li:text-gray-300
              prose-table:border-collapse" 
              dangerouslySetInnerHTML={{ __html: firstHalf }} 
            />

            <AdSlot id={'article-mid-' + slug} />

            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:text-blue-200
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-strong:text-blue-200
              prose-a:text-blue-400
              prose-img:rounded-xl prose-img:shadow-lg
              prose-li:text-gray-300" 
              dangerouslySetInnerHTML={{ __html: secondHalf }} 
            />

            <AdSlot id={'article-bottom-' + slug} />

            {/* Related Articles */}
            {related.length > 0 && (
              <section className="mt-16 pt-10 border-t border-blue-900/30">
                <h2 className="text-2xl font-bold text-blue-200 mb-6">📚 Related Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {related.map(r => (
                    <a key={r.slug} href={'/articles/' + r.slug} className="related-card group">
                      <span className="tag text-xs">{r.category}</span>
                      <h3 className="font-semibold text-gray-200 mt-2 mb-1 group-hover:text-blue-300 transition-colors line-clamp-2">{r.title}</h3>
                      <p className="text-xs text-gray-600">⏱ {r.readTime} min · 📅 {r.date}</p>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Keyword-based internal links */}
            {(() => {
              const kw = article.keywords || [];
              const seeAlso = getAllArticles().filter((a: any) => {
                if (a.slug === slug) return false;
                const akw = a.keywords || [];
                return kw.some((k: string) => akw.includes(k));
              }).slice(0, 4);
              if (seeAlso.length === 0) return null;
              return (
                <section className="mt-12 pt-8 border-t border-blue-900/30">
                  <h2 className="text-xl font-bold text-blue-200 mb-4">🔗 See Also</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {seeAlso.map((a: any) => (
                      <a key={a.slug} href={'/articles/' + a.slug} className="text-sm text-blue-400 hover:text-blue-200 transition-colors">{a.title}</a>
                    ))}
                  </div>
                </section>
              );
            })()}
          </article>
      <BackToTop />
        </div>
      </div>
    </>
  );
}