'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

const ScrollExpand = ({
  src = '',
  srcs,                   // NEW: array of image srcs for slideshow
  slideInterval = 5000,  // NEW: ms per slide
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  onProgress,            // NEW: callback(p) fired every frame
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef   = useRef(null);
  const trackRef  = useRef(null);
  const stageRef  = useRef(null);
  const frameRef  = useRef(null);
  const mediaARef = useRef(null); // layer A
  const mediaBRef = useRef(null); // layer B (crossfade)
  const titleRef  = useRef(null);
  const overlayRef = useRef(null);
  const scrimRef  = useRef(null);
  const hintRef   = useRef(null);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  // Slideshow state
  const images = useMemo(() => (srcs && srcs.length > 1 ? srcs : [src]), [src, srcs]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(null); // null = no transition in progress
  const crossfadeTimer = useRef(null);

  // Crossfade to next slide
  useEffect(() => {
    if (images.length <= 1) return;
    const cycle = () => {
      setNextIdx(prev => {
        const cur = prev ?? 0; // will be resolved in the transition
        return null; // reset
      });
      setActiveIdx(prev => {
        const next = (prev + 1) % images.length;
        setNextIdx(next);
        return prev; // keep A visible, B is next
      });
    };
    crossfadeTimer.current = setInterval(cycle, slideInterval);
    return () => clearInterval(crossfadeTimer.current);
  }, [images.length, slideInterval]);

  // When nextIdx changes, animate B in then flip A
  useEffect(() => {
    if (nextIdx === null) return;
    const b = mediaBRef.current;
    const a = mediaARef.current;
    if (!b || !a) return;

    // Set B to next image, make it visible
    b.style.opacity = '0';
    b.style.transition = 'none';
    // Force browser to paint
    void b.offsetWidth;
    b.style.transition = 'opacity 1.1s ease';
    b.style.opacity = '1';

    // After transition, flip: A becomes the new image, B goes invisible
    const timer = setTimeout(() => {
      if (a) a.src = images[nextIdx];
      if (b) {
        b.style.transition = 'none';
        b.style.opacity = '0';
      }
      setActiveIdx(nextIdx);
      setNextIdx(null);
    }, 1150);

    return () => clearTimeout(timer);
  }, [nextIdx, images]);

  const propsRef = useRef({});

  useEffect(() => {
    propsRef.current = {
      startWidth, startHeight, startRadius, endRadius,
      mediaZoom, scrollDistance, holdDistance, smoothing,
      overlayScrim, useWindowScroll, enabled
    };
  }, [startWidth, startHeight, startRadius, endRadius, mediaZoom, scrollDistance, holdDistance, smoothing, overlayScrim, useWindowScroll, enabled]);

  const applyProgress = useCallback(p => {
    const frame = frameRef.current;
    const media = mediaARef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    if (onProgressRef.current) onProgressRef.current(p);

    const e = smoothstep(0, 1, p);

    const w = c.startWidth  + (100 - c.startWidth)  * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    const scale = c.mediaZoom + (1 - c.mediaZoom) * e;
    media.style.transform = `scale(${scale})`;
    const b = mediaBRef.current;
    if (b) b.style.transform = `scale(${scale})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.72, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${22 * (1 - inn)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root  = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0, current = 0, target = 0, stageH = 0, running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;
      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) { current = target; running = false; }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target; applyProgress(current); return;
      }
      kick();
    };

    const onResize = () => {
      measure(); target = readProgress(); current = target; applyProgress(current);
    };

    measure();
    target = readProgress(); current = target; applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    let lenisUnsub = null;

    const attachLenis = () => {
      const lenis = typeof window !== 'undefined' ? window.__lenis : null;
      if (lenis && useWindowScroll) {
        const handler = () => { target = readProgress(); kick(); };
        lenis.on('scroll', handler);
        lenisUnsub = () => lenis.off('scroll', handler);
      } else {
        scroller.addEventListener('scroll', onScroll, { passive: true });
      }
    };

    const lenisWait = setTimeout(attachLenis, 80);
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      clearTimeout(lenisWait);
      if (raf) cancelAnimationFrame(raf);
      lenisUnsub ? lenisUnsub() : scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const imgStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transformOrigin: 'center',
    userSelect: 'none',
    willChange: 'transform',
    display: 'block'
  };

  return (
    <div
      ref={rootRef}
      className={className || undefined}
      style={{
        position: 'relative', width: '100%', height: '100%',
        ...(useWindowScroll ? {} : {
          overflowY: 'auto', overflowX: 'hidden',
          overscrollBehavior: 'contain', scrollbarWidth: 'none'
        }),
        ...style
      }}
      {...rest}
    >
      <div ref={trackRef} style={{ position: 'relative', width: '100%' }}>
        <div ref={stageRef} style={{ position: 'sticky', top: 0, width: '100%', overflow: 'hidden', '--se-title-size': '4rem' }}>
          <div ref={frameRef} style={{ position: 'absolute', inset: 0, clipPath: 'inset(21% 29% 21% 29% round 24px)', willChange: 'clip-path' }}>

            {/* Layer A — primary image */}
            {mediaType === 'video' ? (
              <video ref={mediaARef} style={imgStyle} src={src} poster={poster} autoPlay muted loop playsInline />
            ) : (
              <img ref={mediaARef} style={imgStyle} src={images[activeIdx]} alt={alt} draggable={false} />
            )}

            {/* Layer B — crossfade target (only for image slideshow) */}
            {mediaType === 'image' && images.length > 1 && (
              <img
                ref={mediaBRef}
                style={{ ...imgStyle, opacity: 0 }}
                src={nextIdx !== null ? images[nextIdx] : images[activeIdx]}
                alt={alt}
                draggable={false}
              />
            )}

            {/* Dark gradient scrim */}
            <div ref={scrimRef} style={{
              position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.42) 100%)'
            }} />

            {/* Overlay children (shown at full bleed) */}
            {children ? (
              <div ref={overlayRef} style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                padding: '6%', opacity: 0, willChange: 'opacity, transform'
              }}>
                {children}
              </div>
            ) : null}
          </div>

          {/* Title (fades out as frame expands) */}
          {title ? (
            <div ref={titleRef} style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: 0, padding: '0 6%', textAlign: 'center',
              fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em',
              color: 'white', fontSize: 'var(--se-title-size)',
              textShadow: '0 2px 32px rgba(0,0,0,0.65)', pointerEvents: 'none',
              willChange: 'opacity, transform'
            }}>
              {title}
            </div>
          ) : null}

          {/* Scroll hint */}
          {scrollHint ? (
            <div ref={hintRef} style={{
              position: 'absolute', inset: 'auto 0 28px 0', textAlign: 'center',
              fontSize: '0.8125rem', letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.7)', pointerEvents: 'none',
              willChange: 'opacity, transform'
            }}>
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
