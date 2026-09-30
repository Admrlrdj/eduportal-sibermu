'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const IMAGES = [
  '/images/campus-activity.webp',
  '/images/aik-study.webp',
  '/images/pbjj-community.webp',
];

export default function HeroExpand() {
  const [gone, setGone] = useState(false);
  const rootRef   = useRef(null);
  const frameRef  = useRef(null);
  const imgARef   = useRef(null);
  const imgBRef   = useRef(null);
  const titleRef  = useRef(null);
  const hintRef   = useRef(null);
  const idxRef    = useRef(0);
  const slideTimer = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      window.dispatchEvent(new CustomEvent('hero-expanded'));
      const reducedMotionTimer = setTimeout(() => setGone(true), 0);
      return () => clearTimeout(reducedMotionTimer);
    }

    // Lock scroll while opening plays
    const lenis = window.__lenis;
    if (lenis) lenis.stop();
    else document.body.style.overflow = 'hidden';

    const unlock = () => {
      if (lenis) lenis.start();
      else document.body.style.overflow = '';
    };

    // Set initial state
    gsap.set(frameRef.current, {
      clipPath: 'inset(21% 29% 21% 29% round 26px)',
    });
    gsap.set(imgARef.current, { scale: 1.3, transformOrigin: 'center' });

    // Image slideshow crossfade during the hold phase
    const startSlideshow = () => {
      slideTimer.current = setInterval(() => {
        const next = (idxRef.current + 1) % IMAGES.length;
        if (imgBRef.current) {
          imgBRef.current.src = IMAGES[next];
          gsap.fromTo(imgBRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.1, ease: 'power2.inOut' }
          );
          setTimeout(() => {
            if (imgARef.current) imgARef.current.src = IMAGES[next];
            gsap.set(imgBRef.current, { opacity: 0 });
            idxRef.current = next;
          }, 1200);
        }
      }, 4000);
    };

    const play = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearInterval(slideTimer.current);
          unlock();
          window.dispatchEvent(new CustomEvent('hero-expanded'));
          setGone(true);
        }
      });

      tl
        // 1. Expand the frame — cinematic open
        .to(frameRef.current, {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          duration: 1.5,
          ease: 'power3.inOut',
        })
        .to(imgARef.current, {
          scale: 1,
          duration: 1.5,
          ease: 'power3.inOut',
        }, '<')
        // 2. Fade out title + hint as it opens
        .to(titleRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.9')
        .to(hintRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.4,
          ease: 'power2.out',
        }, '<+0.08')
        // 3. Hold full bleed (show slideshow here)
        .call(startSlideshow)
        .to({}, { duration: 2.2 })
        // 4. Fade out → Hero revealed underneath
        .to(rootRef.current, {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.inOut',
        });
    };

    // Chain after PageIntro finishes its clip-path exit
    // PageIntro dispatches 'pageintro-done' and then takes 550ms to fully hide
    const onIntro = () => {
      // Wait 300ms into the PageIntro exit so the two transitions overlap nicely
      setTimeout(play, 300);
    };

    window.addEventListener('pageintro-done', onIntro, { once: true });

    // Fallback: if PageIntro was skipped (reducedMotion) or already done
    const fallback = setTimeout(() => {
      window.removeEventListener('pageintro-done', onIntro);
      play();
    }, 1600);

    return () => {
      clearTimeout(fallback);
      clearInterval(slideTimer.current);
      window.removeEventListener('pageintro-done', onIntro);
      unlock();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: '#05101e',
        pointerEvents: 'none',
      }}
    >
      {/* Expanding frame */}
      <div
        ref={frameRef}
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: 'inset(21% 29% 21% 29% round 26px)',
          willChange: 'clip-path',
          overflow: 'hidden',
        }}
      >
        {/* Layer A — primary */}
        <img
          ref={imgARef}
          src={IMAGES[0]}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transformOrigin: 'center',
            willChange: 'transform',
            display: 'block',
          }}
        />
        {/* Layer B — crossfade */}
        <img
          ref={imgBRef}
          src={IMAGES[1]}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transformOrigin: 'center',
            display: 'block',
            opacity: 0,
          }}
        />
        {/* Bottom scrim for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,16,30,0.28) 0%, rgba(5,16,30,0.08) 35%, rgba(5,16,30,0.55) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Center title */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: 'white', textAlign: 'center',
          padding: '0 6%',
          pointerEvents: 'none',
          gap: 12,
        }}
      >
        <span style={{
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(225,195,140,0.85)',
        }}>
          UNIVERSITAS SIBER MUHAMMADIYAH
        </span>
        <span style={{
          fontSize: 'clamp(26px, 5.5vw, 72px)',
          fontWeight: 700, lineHeight: 1.08,
          letterSpacing: '-0.04em',
          textShadow: '0 2px 40px rgba(0,0,0,0.7)',
        }}>
          EduPortal SiberMu
        </span>
      </div>

      {/* Bottom hint */}
      <div
        ref={hintRef}
        style={{
          position: 'absolute', bottom: 32,
          left: 0, right: 0,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 12, letterSpacing: '0.1em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        SEBENTAR...
      </div>
    </div>
  );
}
