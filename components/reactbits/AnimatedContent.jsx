'use client';

// Adapted from React Bits Animated Content (JS + CSS variant).
// https://www.reactbits.dev/animations/animated-content
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AnimatedContent({
  children,
  distance = 18,
  direction = 'vertical',
  reverse = false,
  duration = 0.55,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.12,
  delay = 0,
  className = '',
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      gsap.set(element, { clearProps: 'all' });
      return undefined;
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const start = `top ${(1 - threshold) * 100}%`;

    gsap.set(element, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      willChange: 'transform, opacity',
    });

    const tween = gsap.to(element, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease,
      paused: true,
      onComplete: () => gsap.set(element, { clearProps: 'willChange' }),
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once: true,
      onEnter: () => tween.play(),
      onRefresh: (self) => {
        if (self.progress > 0) tween.play();
      },
    });

    // Immediate check if element is already in viewport
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      tween.play();
    }

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [animateOpacity, delay, direction, distance, duration, ease, initialOpacity, reverse, scale, threshold]);

  return <div ref={ref} className={className} {...props}>{children}</div>;
}
