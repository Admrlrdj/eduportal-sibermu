'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Float({ children, speed = 2.5, distance = 15, delay = 0, className = '' }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: distance,
        duration: speed,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay,
      });
    });
    return () => ctx.revert();
  }, [speed, distance, delay]);

  return <div ref={ref} className={className} style={{ display: 'inline-block' }}>{children}</div>;
}
