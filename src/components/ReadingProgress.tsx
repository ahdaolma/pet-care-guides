'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress({ color = 'bg-rose-400' }: { color?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setProgress(Math.min(100, Math.round((scrollTop / docHeight) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent pointer-events-none">
      <div className={h-full  transition-all duration-150 ease-out} style={{ width: progress + '%' }} />
    </div>
  );
}
