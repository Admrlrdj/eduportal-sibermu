'use client';

import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
    }

    gsap.registerPlugin(ScrollTrigger);

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', onScroll);

    // Global smooth scroll interceptor for hash / anchor links (including Kembali ke atas)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      e.preventDefault();

      if (targetId === '#beranda' || targetId === '#top') {
        // Smooth scroll to top of page
        lenis.scrollTo(0, {
          duration: 0.78,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          lenis.scrollTo(targetElement, {
            offset: -85,
            duration: 0.78,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.off('scroll', onScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.85,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.05,
      }}
    >
      <LenisGsapSync />
    </ReactLenis>
  );
}
