'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import CountUp from './reactbits/CountUp';

export default function Hero() {
  const statsRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const counters = Array.from(statsRef.current?.querySelectorAll('[data-count]') || []);
    const tweens = counters.map((element) => {
      const target = Number(element.dataset.count);
      const prefix = element.dataset.prefix || '';
      const suffix = element.dataset.suffix || '';
      const startingValue = target === 2021
        ? Math.floor(1945 + Math.random() * 155)
        : Math.floor(Math.random() * Math.max(30, target * 4));
      const counter = { value: startingValue };
      const renderValue = () => `${prefix}${Math.round(counter.value)}${suffix}`;

      element.textContent = renderValue();
      return gsap.to(counter, {
        value: target,
        duration: 1.35,
        ease: 'power2.out',
        roundProps: 'value',
        onUpdate: () => {
          element.textContent = renderValue();
        },
        onComplete: () => {
          element.textContent = `${prefix}${target}${suffix}`;
        }
      });
    });

    return () => tweens.forEach((tween) => tween.kill());
  }, []);

  return (
    <section className="hero-split" id="beranda" aria-label="Portal Kemahasiswaan SiberMu">
      {/* ── Left: copy ── */}
      <div className="hero-split__copy">
        <span className="hero-split__eyebrow"><span className="hero-split__index">01</span><span>KAMPUS SIBER · ISLAM BERKEMAJUAN</span></span>

        <h1 className="hero-split__headline">
          Ilmu yang<br />Membentuk<br /><em className="hero-split__accent">Karakter.</em>
        </h1>

        <p className="hero-split__desc">
          Portal informasi kemahasiswaan dan Al-Islam & Kemuhammadiyahan Universitas Siber Muhammadiyah, satu tempat untuk perjalanan akademikmu.
        </p>

        <div className="hero-split__actions">
          <a href="#kemahasiswaan" className="button gold">
            Jelajahi Kemahasiswaan
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <a href="#aik" className="button outline">
            Mengenal AIK
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>

        <div className="hero-split__stats" role="list">
          <div role="listitem">
            <strong><CountUp from={0} to={6} duration={1.1} className="count-up-text" /></strong>
            <span className="hero-stat__label">Program Studi</span>
          </div>
          <div role="listitem">
            <strong><CountUp from={0} to={174} duration={1.4} className="count-up-text" /><span aria-hidden="true">+</span></strong>
            <span className="hero-stat__label">PT Muhammadiyah</span>
          </div>
          <div role="listitem">
            <strong><span>Sejak</span> <CountUp from={2000} to={2021} duration={1.4} className="count-up-text" /></strong>
            <span className="hero-stat__label">Kampus Siber #1</span>
          </div>
        </div>
      </div>

      {/* ── Right: visual ── */}
      <div className="hero-split__visual" aria-hidden="true">
        <div className="hero-split__img-wrap">
          <Image
            src="/images/campus-activity.webp"
            alt="Mahasiswa SiberMu dalam kegiatan belajar"
            fill
            sizes="(max-width: 860px) 100vw, 52vw"
            className="hero-split__img"
            priority
          />
          {/* Subtle dark-to-transparent on left edge so text doesn't clash */}
          <div className="hero-split__img-fade" />
        </div>

        {/* Floating badge */}
        <div className="hero-split__badge">
          <span className="hero-split__badge-icon">✦</span>
          <div>
            <strong>Dari kampus ke komunitas</strong>
            <span>Ilmu tumbuh menjadi dampak</span>
          </div>
        </div>
      </div>
    </section>
  );
}
