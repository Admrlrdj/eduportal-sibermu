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
  ease = 'back.inOut(2)',
  scrollStart = 'top bottom-=10%',
  scrollEnd = 'bottom center+=25%',
  stagger = 0.04,
  as: Component = 'div',
  style = {},
  scrub = 1.2
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

    let targets;
    let initialVars;
    let targetVars;

    if (isString) {
      // String mode: animate each character
      targets = el.querySelectorAll('.scroll-float-char');
      initialVars = {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      };
      targetVars = {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: scrub
        }
      };
    } else {
      const subItems = el.querySelectorAll(
        '.scroll-float-item, .why-feature-card, .prodi-card, .synergy-card, .community-card, .service-card, .event, .accordion-item, .why-sibermu-box, .section-head, .filter-group, .aik-image-column, .aik-copy, .closing-inner'
      );

      targets = subItems.length > 0 ? subItems : (el.children.length > 0 ? Array.from(el.children) : [el]);

      initialVars = {
        willChange: 'opacity, transform',
        opacity: 0,
        y: 28
      };

      targetVars = {
        duration: Math.min(animationDuration, 0.72),
        ease: 'power2.out',
        opacity: 1,
        y: 0,
        stagger: stagger || 0.06,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 86%',
          once: true,
          toggleActions: 'play none none none'
        }
      };
    }

    const tween = gsap.fromTo(targets, initialVars, targetVars);

    // Viewport check fallback
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.5 && rect.bottom > 0) {
      // If already well within view, ensure elements are visible
      gsap.to(targets, { opacity: 1, y: 0, duration: 0.35 });
    }

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
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
