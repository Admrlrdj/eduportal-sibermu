'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AccordionGallery({
  items = [],
  defaultIndex = 1,
  accentColor = '#e2a344',
  overlayColor = '#0b1626',
  textColor = '#ffffff',
  height = 460,
  gap = 12,
  radius = 20,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = ''
}) {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const overlayBg = `linear-gradient(180deg, transparent 45%, color-mix(in srgb, ${overlayColor} 78%, transparent) 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, 0.35) * 100%), transparent)`;

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const panels = panelRefs.current.filter(Boolean);
    if (!panels.length) return;

    const tween = gsap.fromTo(
      panels,
      {
        opacity: 0.1,
        y: 80,
        scaleY: 1.15,
        scaleX: 0.92,
        transformOrigin: '50% 0%'
      },
      {
        opacity: 1,
        y: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: 0.08,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=10%',
          end: 'center center+=15%',
          scrub: 1.2
        }
      }
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = i => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i, e) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <>
      <div
        ref={rootRef}
        className={`ag-container ${vertical ? 'ag-vertical' : 'ag-horizontal'} ${className}`}
        style={{ gap: `${gap}px`, height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px` }}
        role="list"
        aria-label="Image accordion gallery"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          const Tag = item.link ? 'a' : 'div';
          return (
            <Tag
              key={i}
              ref={el => (panelRefs.current[i] = el)}
              className="ag-panel group"
              style={{ borderRadius: `${radius}px`, '--ag-accent': accentColor, willChange: 'flex-grow, transform' }}
              href={item.link || undefined}
              onClick={e => handleClick(i, e)}
              onMouseEnter={() => handleEnter(i)}
              onFocus={() => setActive(i)}
              onKeyDown={e => handleKeyDown(i, e)}
              role="listitem"
              tabIndex={0}
              aria-current={isActive ? 'true' : undefined}
              aria-label={item.label}
            >
              <span className="ag-overlay-wrap">
                <span
                  ref={el => (mediaRefs.current[i] = el)}
                  className="ag-media"
                  style={{
                    width: vertical ? '100%' : 'var(--ag-media-size, 320px)',
                    height: vertical ? 'var(--ag-media-size, 320px)' : '100%',
                    willChange: 'transform, filter'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.alt || item.label || ''}
                    draggable="false"
                    className="ag-img"
                  />
                </span>
                <span
                  className="ag-overlay"
                  style={{ background: overlayBg }}
                  aria-hidden="true"
                />
              </span>
              {showLabels && (
                <span
                  className="ag-labels"
                  aria-hidden="true"
                >
                  <span
                    ref={el => (barRefs.current[i] = el)}
                    className="ag-bar"
                    style={{
                      background: accentColor,
                      boxShadow: `0 0 12px color-mix(in srgb, ${accentColor} 60%, transparent)`
                    }}
                  />
                  <span className="ag-text-wrap">
                    <span
                      ref={el => (textRefs.current[i] = el)}
                      className="ag-text"
                      style={{ color: textColor }}
                    >
                      {item.label}
                    </span>
                    <span 
                      className="ag-description" 
                      style={{ opacity: isActive ? 0.9 : 0, transition: 'opacity 0.6s ease' }}
                    >
                      {item.description}
                    </span>
                  </span>
                </span>
              )}
            </Tag>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .ag-container {
          display: flex;
          width: 100%;
          max-width: 100%;
          perspective: 1400px;
        }
        .ag-vertical { flex-direction: column; }
        .ag-horizontal { flex-direction: row; }
        .ag-panel {
          position: relative;
          display: block;
          min-width: 0;
          min-height: 0;
          flex: 1 1 0;
          cursor: pointer;
          overflow: hidden;
          background: #0a0713;
          text-decoration: none;
          outline: none;
          transform-style: preserve-3d;
          transform-origin: center;
          box-shadow: 0 10px 30px -18px rgba(0,0,0,0.8);
          transition: box-shadow 0.2s;
        }
        .ag-panel:focus-visible {
          box-shadow: 0 0 0 2px var(--ag-accent), 0 10px 30px -18px rgba(0,0,0,0.8);
        }
        .ag-overlay-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
        }
        .ag-media {
          position: absolute;
          top: 50%;
          left: 50%;
          filter: grayscale(var(--ag-gray, 1));
        }
        .ag-img {
          display: block;
          height: 100%;
          width: 100%;
          user-select: none;
          object-fit: cover;
          -webkit-user-drag: none;
        }
        .ag-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
        }
        .ag-labels {
          pointer-events: none;
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          z-index: 2;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .ag-bar {
          height: 48px;
          width: 4px;
          flex: none;
          border-radius: 4px;
          opacity: 0;
        }
        .ag-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ag-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: clamp(1.1rem, 1.6vw, 1.6rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: 0.01em;
          opacity: 0;
          text-shadow: 0 2px 14px rgba(0,0,0,0.55);
        }
        .ag-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 720px) {
          .ag-container {
            flex-direction: column !important;
            perspective: none !important;
            height: auto !important;
            gap: 10px !important;
          }
          .ag-panel {
            flex: 0 0 142px !important;
            height: 142px !important;
            transform: none !important;
          }
          .ag-panel[aria-current='true'] {
            flex: 0 0 176px !important;
            height: 176px !important;
            box-shadow: 0 0 0 2px var(--ag-accent), 0 12px 28px rgba(11, 22, 38, 0.18);
          }
          .ag-media {
            width: 100% !important;
            height: 100% !important;
            filter: grayscale(0) !important;
          }
          .ag-labels {
            bottom: 14px;
            left: 14px;
            right: 14px;
          }
          .ag-bar,
          .ag-text {
            opacity: 1 !important;
            transform: none !important;
          }
          .ag-bar {
            height: 38px;
          }
          .ag-text {
            font-size: 1rem;
            white-space: normal;
            text-overflow: clip;
          }
          .ag-description {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}
