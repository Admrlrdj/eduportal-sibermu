'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Gallery({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const items = element.children;
    
    // Set initial state
    gsap.set(items, { opacity: 0, y: 40, scale: 0.95 });

    const tween = gsap.to(items, { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.2)',
      paused: true,
      onComplete: () => gsap.set(items, { clearProps: 'all' })
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => tween.play(),
      onRefresh: (self) => {
        if (self.progress > 0) tween.play();
      }
    });

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      tween.play();
    }

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
