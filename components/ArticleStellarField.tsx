'use client';

import { useEffect } from 'react';

const ARTICLE_STAR_COUNT = 42;

export default function ArticleStellarField() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      root.style.setProperty('--article-stellar-y', `${Math.min(scrollY * -0.08, 0)}px`);
      root.style.setProperty('--article-stellar-y-far', `${Math.min(scrollY * -0.035, 0)}px`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      root.style.removeProperty('--article-stellar-y');
      root.style.removeProperty('--article-stellar-y-far');
    };
  }, []);

  return (
    <div className="article-stellar-field" aria-hidden="true">
      <div className="article-stellar-layer article-stellar-layer--far">
        {Array.from({ length: ARTICLE_STAR_COUNT }, (_, index) => {
          const top = 3 + ((index * 43 + 17) % 94);
          const left = 2 + ((index * 67 + 23) % 96);
          const delay = -((index * 0.61) % 7).toFixed(2);
          return (
            <span
              key={`far-${index}`}
              className="article-star article-star--far"
              style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s` }}
            />
          );
        })}
      </div>
      <div className="article-stellar-layer article-stellar-layer--near">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(index => (
          <span
            key={`near-${index}`}
            className="article-star article-star--near"
            style={{
              top: `${12 + index * 11}%`,
              left: `${8 + ((index * 31) % 84)}%`,
              animationDelay: `${-index * 0.8}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
