'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Kembali ke atas"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
    >
      <span className="back-to-top__label">TOP</span>
      <svg className="back-to-top__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 13V3M4 7l4-4 4 4"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="back-to-top__progress" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden="true" />
    </button>
  );
}
