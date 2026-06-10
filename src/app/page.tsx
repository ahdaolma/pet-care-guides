import { getAllArticles, getCategories } from '@/lib/articles';
import AdSlot from '@/components/AdSlot';
import PopularArticles from '@/components/PopularArticles';

const petTypes = [
  { emoji: '🐕', name: 'Dogs', count: 45, slug: 'category/dog-care' },
  { emoji: '🐈', name: 'Cats', count: 20, slug: 'category/cat-care' },
  { emoji: '🐠', name: 'Fish', count: 5, slug: 'category/fish-care' },
  { emoji: '🐹', name: 'Small Pets', count: 8, slug: 'category/small-pets' },
  { emoji: '🐦', name: 'Birds', count: 5, slug: 'category/bird-care' },
  { emoji: '🐾', name: 'General', count: 17, slug: 'category/general-pet-care' },
];

const emergencyTopics = [
  { icon: '🚑', title: 'Toxic Foods', desc: 'What your dog can never eat', slug: 'toxic-foods-for-dogs-guide' },
  { icon: '🦷', title: 'Dental Health', desc: 'Prevent costly vet visits', slug: 'pet-dental-health-guide' },
  { icon: '💉', title: 'Vaccinations', desc: 'Puppy shot schedule', slug: 'vaccinations-for-puppies-guide' },
  { icon: '🪲', title: 'Flea & Tick', desc: 'Prevention that works', slug: 'flea-and-tick-prevention-guide' },
];

export default async function HomePage() {
  const articles = getAllArticles();
  const categories = getCategories();

  return (
    <>
      {/* Hero - Warm & Cozy */}
      <section style={{background: 'linear-gradient(180deg, #1A0510 0%, #2A0A18 40%, #1A0F14 100%)'}} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {Array.from({length: 12}).map((_,i) => (
            <span key={i} className="absolute text-4xl" style={{left: `${(i*9+3)%95}%`, top: `${(i*14+2)%90}%`}}>
              {['🐾','🐕','🐈','🐠','🐹','🐦','🦴','🐱','🐶','🦜','🐰','🐟'][i]}
            </span>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-900/20 border border-rose-700/20 rounded-full mb-8">
            <span className="text-rose-300 text-xs font-bold">🐾 100+ EXPERT GUIDES</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6" style={{color: '#FFF1F2'}}>
            Care for Your<br/><span style={{color: '#FDA4AF'}}>Best Friend</span>
          </h1>
          <p className="text-rose-200/60 text-lg max-w-xl mx-auto mb-10">
            Expert pet care guides for a happier, healthier companion. Because they give us everything — they deserve the best.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/articles" className="px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl transition shadow-lg shadow-rose-600/20">
              Browse All Guides →
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* Emergency Quick Help */}
        <section className="-mt-8 relative z-20 mb-16">
          <div className="bg-[#2A1520] border border-rose-800/30 rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="emergency-badge">🚨 QUICK HELP</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {emergencyTopics.map(t => (
                <a key={t.slug} href={`/articles/${t.slug}`} className="paw-card p-5 group">
                  <span className="text-2xl block mb-2">{t.icon}</span>
                  <h3 className="font-bold text-rose-100 text-sm mb-1 m-0 group-hover:text-rose-300 transition-colors">{t.title}</h3>
                  <p className="text-xs text-rose-700">{t.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Pet Type Selector */}
        <section className="my-16">
          <h2 className="text-2xl font-black text-rose-100 mb-8 text-center">🐾 Choose Your Pet</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {petTypes.map(p => (
              <a key={p.name} href={`/${p.slug}`} className="paw-card p-5 text-center">
                <span className="text-4xl block mb-3">{p.emoji}</span>
                <span className="font-bold text-sm text-rose-100">{p.name}</span>
                <span className="text-xs text-rose-600 block mt-1">{p.count} guides</span>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-top' />

        {/* Categories */}
        <section id='categories' className='my-16'>
          <h2 className="text-2xl font-black text-rose-100 mb-8">📚 Browse Topics</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {categories.map(cat => (
              <a key={cat.slug} href={'/category/' + cat.slug} className='paw-card p-6 text-center'>
                <span className='text-3xl block mb-3'>{cat.icon}</span>
                <span className='font-bold text-sm text-rose-100'>{cat.name}</span>
                <span className='text-xs text-rose-600 block mt-2'>{cat.count} articles</span>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-middle' />

        <PopularArticles />

        {/* Latest */}
        <section className='my-16'>
          <h2 className="text-2xl font-black text-rose-100 mb-8">🆕 Latest Guides</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {articles.slice(0, 9).map(article => (
              <a key={article.slug} href={'/articles/' + article.slug} className='paw-card p-6'>
                <span className="text-xs text-rose-500 font-bold mb-2 block">{article.category}</span>
                <h3 className="font-bold text-rose-100 mb-2 line-clamp-2 text-sm">{article.title}</h3>
                <div className="flex gap-3 text-xs text-rose-600">
                  <span>📅 {article.date}</span>
                  <span>⏱ {article.readTime}m</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <AdSlot id='home-bottom' />

        {/* Love CTA */}
        <div className="text-center py-16">
          <div className="paw-card inline-block p-10 max-w-md mx-auto text-center">
            <span className="text-5xl block mb-4">❤️</span>
            <p className="text-rose-200 font-bold text-lg mb-2">They give us everything.</p>
            <p className="text-rose-600 text-sm mb-6">Let us give them the best care.</p>
            <a href="/articles" className="inline-block px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl transition">
              Start Learning →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
