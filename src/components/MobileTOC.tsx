'use client';
import { useState } from 'react';

interface Heading { level: number; text: string; id: string; }

export default function MobileTOC({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);
  const filtered = headings.filter(h => h.level <= 2);
  if (filtered.length === 0) return null;

  return (
    <div className="lg:hidden mb-6 border border-blue-900/30 rounded-xl p-4 bg-blue-900/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-sm font-bold text-blue-300 uppercase tracking-wider">
        <span>📑 On This Page</span>
        <span className="text-lg">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <nav className="mt-3 flex flex-col gap-1.5">
          {filtered.map((h, i) => (
            <a key={i} href={'#' + h.id} onClick={() => setOpen(false)}
              className="block text-sm text-blue-400 hover:text-blue-200"
              style={{ paddingLeft: (h.level - 1) * 12 + 'px' }}>
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}