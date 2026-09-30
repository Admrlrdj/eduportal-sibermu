'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

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

        <div className="hero-split__stats" role="list" ref={statsRef}>
          <div role="listitem" aria-label="6 Program Studi">
            <strong data-count="6" aria-hidden="true">6</strong>
            <span aria-hidden="true">Program Studi</span>
          </div>
          <div role="listitem" aria-label="174 atau lebih Perguruan Tinggi Muhammadiyah">
            <strong data-count="174" data-suffix="+" aria-hidden="true">174+</strong>
            <span aria-hidden="true">PT Muhammadiyah</span>
          </div>
          <div role="listitem" aria-label="Sejak 2021, Kampus Siber nomor satu">
            <strong data-count="2021" data-prefix="Sejak " aria-hidden="true">Sejak 2021</strong>
            <span aria-hidden="true">Kampus Siber #1</span>
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
