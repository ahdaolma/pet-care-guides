import { getAllArticles, getCategories } from '@/lib/articles';
import AdSlot from '@/components/AdSlot';
import ArticleCard from '@/components/ArticleCard';

export default async function HomePage() {
  const articles = getAllArticles();
  const categories = getCategories();

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <section className='text-center py-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Pet Care Guides Made Simple
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Expert pet care guides, dog training tips, cat health advice, and pet nutrition information.
        </p>
      </section>

      <AdSlot id='home-top' />

      <section id='categories' className='my-12'>
        <h2 className='text-2xl font-bold mb-6'>Browse by Category</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={'/category/' + cat.slug}
              className='bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-600 hover:shadow-md transition text-center'
            >
              <span className='text-3xl mb-2 block'>{cat.icon}</span>
              <span className='font-semibold'>{cat.name}</span>
              <span className='text-sm text-gray-500 block mt-1'>{cat.count} articles</span>
            </a>
          ))}
        </div>
      </section>

      <AdSlot id='home-middle' />

      <section id='latest' className='my-12'>
        <h2 className='text-2xl font-bold mb-6'>Latest Guides</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.slice(0, 12).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <AdSlot id='home-bottom' />

      <div className='text-center mt-8'>
        <a
          href='/articles'
          className='inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition'
        >
          View All Articles →
        </a>
      </div>
    </div>
  );
}
