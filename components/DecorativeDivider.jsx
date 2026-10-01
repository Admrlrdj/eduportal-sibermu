'use client';

import { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pieces = [
  { x: 30, size: 14, tone: 'green', kind: 'terminal', side: 'left' },
  { x: 326, size: 28, tone: 'green', kind: 'filled', side: 'left' },
  { x: 486, size: 30, tone: 'gold', kind: 'outline', side: 'left' },
  { x: 714, size: 30, tone: 'gold', kind: 'outline', side: 'right' },
  { x: 874, size: 28, tone: 'green', kind: 'filled', side: 'right' },
  { x: 1170, size: 14, tone: 'gold', kind: 'terminal', side: 'right' }
];

function diamondPoints(x, size) {
  return `${x},${48 - size} ${x + size},48 ${x},${48 + size} ${x - size},48`;
}

function Diamond({ x, size, tone, kind, side }) {
  const innerSize = kind === 'filled' ? size * 0.48 : size * 0.78;

  return (
    <g
      className={`section-divider__piece section-divider__piece--${kind}`}
      data-divider-side={side}
    >
      <polygon
        className={`section-divider__diamond section-divider__diamond--${tone}`}
        pathLength={kind === 'terminal' ? undefined : '1'}
        points={diamondPoints(x, size)}
      />
      {kind !== 'terminal' && (
        <polygon
          className="section-divider__diamond-inner"
          pathLength="1"
          points={diamondPoints(x, innerSize)}
        />
      )}
    </g>
  );
}

export default function DecorativeDivider() {
  const dividerRef = useRef(null);
  const instanceId = useId().replaceAll(':', '');
  const clipId = `divider-shimmer-clip-${instanceId}`;
  const gradientId = `divider-shimmer-gradient-${instanceId}`;

  useEffect(() => {
    const divider = dividerRef.current;
    if (!divider || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      const geometry = divider.querySelector('[data-divider-geometry]');
      const centerDot = divider.querySelector('[data-divider-dot]');
      const centerShadow = divider.querySelector('.section-divider__center-shadow');
      const centerStrokes = divider.querySelectorAll('[data-divider-center-stroke]');
      const centerMark = divider.querySelector('.section-divider__center-mark');
      const leftLine = divider.querySelector('[data-divider-line="left"]');
      const rightLine = divider.querySelector('[data-divider-line="right"]');
      const outlineFrames = divider.querySelectorAll('.section-divider__piece--outline .section-divider__diamond');
      const outlineInners = divider.querySelectorAll('.section-divider__piece--outline .section-divider__diamond-inner');
      const filledFrames = divider.querySelectorAll('.section-divider__piece--filled .section-divider__diamond');
      const filledMarks = divider.querySelectorAll('.section-divider__piece--filled .section-divider__diamond-inner');
      const endCaps = divider.querySelectorAll('.section-divider__piece--terminal');
      const shimmer = divider.querySelector('[data-divider-shimmer]');

      const idle = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.65 });
      idle
        .to(geometry, {
          scale: 1.012,
          transformOrigin: 'center center',
          duration: 1.35,
          ease: 'sine.inOut'
        })
        .to(geometry, { scale: 1, duration: 1.35, ease: 'sine.inOut' })
        .fromTo(
          shimmer,
          { x: -180, opacity: 0 },
          { x: 1220, opacity: 0.78, duration: 0.72, ease: 'power1.inOut' },
          0.48
        )
        .set(shimmer, { opacity: 0 }, 1.21);

      const resetIdle = () => {
        idle.pause(0);
        gsap.set(geometry, { scale: 1 });
        gsap.set(shimmer, { x: -180, opacity: 0 });
      };

      const entrance = gsap.timeline({
        paused: true,
        defaults: { overwrite: 'auto' },
        onComplete: () => idle.restart(true),
        onReverseComplete: resetIdle
      });

      entrance
        .set(shimmer, { x: -180, opacity: 0 }, 0)
        .fromTo(
          centerDot,
          { scale: 0, opacity: 0, transformOrigin: 'center center' },
          { scale: 1, opacity: 1, duration: 0.18, ease: 'back.out(2)' },
          0
        )
        .fromTo(
          leftLine,
          { scaleX: 0, opacity: 0.25, transformOrigin: 'right center' },
          { scaleX: 1, opacity: 1, duration: 1.12, ease: 'power2.out' },
          0.1
        )
        .fromTo(
          rightLine,
          { scaleX: 0, opacity: 0.25, transformOrigin: 'left center' },
          { scaleX: 1, opacity: 1, duration: 1.12, ease: 'power2.out' },
          0.1
        )
        .fromTo(
          endCaps,
          {
            x: (_, element) => element.dataset.dividerSide === 'left' ? 570 : -570,
            scale: 0.55,
            opacity: 0,
            transformOrigin: 'center center'
          },
          { x: 0, scale: 1, opacity: 1, duration: 1.12, ease: 'power2.out' },
          0.1
        )
        .fromTo(
          centerShadow,
          { scale: 0.4, opacity: 0, transformOrigin: 'center center' },
          { scale: 1, opacity: 1, duration: 0.46, ease: 'power2.out' },
          0.16
        )
        .fromTo(
          centerStrokes,
          { strokeDashoffset: 1, fillOpacity: 0 },
          { strokeDashoffset: 0, fillOpacity: 1, duration: 0.62, stagger: 0.08, ease: 'power1.inOut' },
          0.2
        )
        .fromTo(
          centerMark,
          { scale: 0, opacity: 0, transformOrigin: 'center center' },
          { scale: 1, opacity: 1, duration: 0.34, ease: 'back.out(1.8)' },
          0.52
        )
        .fromTo(
          outlineFrames,
          { strokeDashoffset: 1, fillOpacity: 0, opacity: 0 },
          { strokeDashoffset: 0, fillOpacity: 1, opacity: 1, duration: 0.42, ease: 'power1.inOut' },
          0.62
        )
        .fromTo(
          outlineInners,
          { strokeDashoffset: 1, fillOpacity: 0, opacity: 0 },
          { strokeDashoffset: 0, fillOpacity: 1, opacity: 1, duration: 0.36, ease: 'power1.inOut' },
          0.7
        )
        .fromTo(
          filledFrames,
          { strokeDashoffset: 1, fillOpacity: 0, opacity: 0 },
          { strokeDashoffset: 0, fillOpacity: 1, opacity: 1, duration: 0.4, ease: 'power1.inOut' },
          0.82
        )
        .fromTo(
          filledMarks,
          {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            transformOrigin: 'center center'
          },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.34, ease: 'back.out(1.8)' },
          0.96
        )
        .to(centerDot, { opacity: 0, scale: 0.35, duration: 0.18, ease: 'power1.out' }, 0.88);

      ScrollTrigger.create({
        trigger: divider,
        start: 'top 94%',
        end: 'bottom 18%',
        onEnter: () => entrance.play(),
        onLeave: () => {
          resetIdle();
          entrance.reverse();
        },
        onEnterBack: () => entrance.play(),
        onLeaveBack: () => {
          resetIdle();
          entrance.reverse();
        }
      });
    }, divider);

    return () => context.revert();
  }, []);

  return (
    <div ref={dividerRef} className="section-divider" aria-hidden="true">
      <svg
        className="section-divider__svg"
        viewBox="0 0 1200 96"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.92" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <rect x="30" y="45" width="1140" height="6" />
            {pieces.map(piece => (
              <polygon key={piece.x} points={diamondPoints(piece.x, piece.size)} />
            ))}
            <polygon points="600,3 645,48 600,93 555,48" />
          </clipPath>
        </defs>

        <g className="section-divider__geometry" data-divider-geometry>
          <line
            className="section-divider__line"
            data-divider-line="left"
            x1="30"
            x2="600"
            y1="48"
            y2="48"
          />
          <line
            className="section-divider__line"
            data-divider-line="right"
            x1="600"
            x2="1170"
            y1="48"
            y2="48"
          />

          <circle className="section-divider__origin-dot" data-divider-dot cx="600" cy="48" r="3.5" />

          {pieces.map(piece => <Diamond key={piece.x} {...piece} />)}

          <g className="section-divider__center">
            <polygon className="section-divider__center-shadow" points="600,3 645,48 600,93 555,48" />
            <polygon
              className="section-divider__center-outer"
              data-divider-center-stroke
              pathLength="1"
              points="600,7 641,48 600,89 559,48"
            />
            <polygon
              className="section-divider__center-inner"
              data-divider-center-stroke
              pathLength="1"
              points="600,16 632,48 600,80 568,48"
            />
            <rect className="section-divider__center-mark" x="588" y="36" width="24" height="24" rx="2" />
          </g>
        </g>

        <rect
          className="section-divider__shimmer"
          data-divider-shimmer
          x="0"
          y="0"
          width="160"
          height="96"
          fill={`url(#${gradientId})`}
          clipPath={`url(#${clipId})`}
        />
      </svg>
    </div>
  );
}
