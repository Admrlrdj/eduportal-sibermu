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

  const circumference = 2 * Math.PI * 20; // r=20
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={handleClick}
      aria-label="Kembali ke atas"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
    >
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden="true">
        {/* Track */}
        <circle
          cx="26" cy="26" r="20"
          stroke="rgba(197,161,91,0.2)"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Progress */}
        <circle
          cx="26" cy="26" r="20"
          stroke="var(--gold)"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 26 26)"
          style={{ transition: 'stroke-dashoffset 0.15s ease' }}
        />
        {/* Arrow up */}
        <path
          d="M26 32V20M20 26l6-6 6 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
