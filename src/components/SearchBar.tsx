'use client';

import { useState } from 'react';

export default function SearchBar({ placeholder = 'Search pet care...', className = '' }: { placeholder?: string; className?: string }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = '/search?q=' + encodeURIComponent(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-2xl bg-[#200F17] border border-rose-800/30 text-rose-50 placeholder-rose-800 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/20 transition-all"
          style={{ fontFamily: '"Nunito", sans-serif' }}
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-700 hover:text-rose-300 p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </form>
  );
}
