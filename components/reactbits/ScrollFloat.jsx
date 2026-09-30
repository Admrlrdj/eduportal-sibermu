'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'power2.out',
  scrollStart = 'top bottom-=10%',
  scrollEnd = 'bottom center+=25%',
  stagger = 0.04,
  as: Component = 'div',
  style = {},
  scrub = 0.65
}) {
  const containerRef = useRef(null);
  const isString = typeof children === 'string';

  const splitText = useMemo(() => {
    if (!isString) return null;
    return children.split('').map((char, index) => (
      <span
        className="scroll-float-char"
        key={index}
        style={{
          display: 'inline-block',
          willChange: 'opacity, transform'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children, isString]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      gsap.set(el, { clearProps: 'all' });
      return;
    }

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    if (isString) {
      const targets = el.querySelectorAll('.scroll-float-char');
      const initialVars = {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 52
      };
      const targetVars = {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: scrub
        }
      };
      const tween = gsap.fromTo(targets, initialVars, targetVars);

      return () => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
      };
    }

    const contentSelector = [
      '.section-head',
      '.why-feature-card',
      '.prodi-card',
      '.section-visual',
      '.section-note',
      '.synergy-card',
      '.aik-image-column',
      '.aik-copy',
      '.react-bits-folder',
      '.filter-group',
      '.event',
      '.faq-section > div:first-child',
      '.accordion-item',
      '.closing-inner'
    ].join(', ');
    const subItems = Array.from(el.querySelectorAll(contentSelector));
    const targets = subItems.length > 0
      ? subItems
      : (el.children.length > 0 ? Array.from(el.children) : [el]);

    const tweens = targets.map((target) => gsap.fromTo(
      target,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        y: 34,
        scale: 0.985
      },
      {
        duration: Math.min(animationDuration, 0.72),
        ease: 'power2.out',
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: target,
          scroller,
          start: 'top 92%',
          once: true,
          toggleActions: 'play none none none'
        }
      }
    ));

    return () => {
      tweens.forEach((tween) => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
      });
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, isString, scrub]);

  if (isString) {
    return (
      <h2
        ref={containerRef}
        className={`scroll-float-container ${containerClassName}`}
        style={{
          overflow: 'hidden',
          lineHeight: 1.25,
          ...style
        }}
      >
        <span className={`scroll-float-inner ${textClassName}`} style={{ display: 'inline-block' }}>
          {splitText}
        </span>
      </h2>
    );
  }

  return (
    <Component
      ref={containerRef}
      className={`scroll-float-wrapper ${containerClassName}`}
      style={{
        width: '100%',
        ...style
      }}
    >
      {children}
    </Component>
  );
}
