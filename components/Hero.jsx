'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero-split" id="beranda" aria-label="Portal Kemahasiswaan SiberMu">
      <h1 className="sr-only">Portal Kemahasiswaan dan AIK Universitas Siber Muhammadiyah</h1>

      {/* ── Left: copy ── */}
      <div className="hero-split__copy">
        <span className="hero-split__eyebrow">KAMPUS SIBER · ISLAM BERKEMAJUAN</span>

        <p className="hero-split__headline" aria-hidden="true">
          Ilmu yang<br />Membentuk<br /><em className="hero-split__accent">Karakter.</em>
        </p>

        <p className="hero-split__desc">
          Portal informasi kemahasiswaan dan Al-Islam & Kemuhammadiyahan Universitas Siber Muhammadiyah — satu tempat untuk perjalanan akademikmu.
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
            <strong>6</strong>
            <span>Program Studi</span>
          </div>
          <div role="listitem">
            <strong>174+</strong>
            <span>PT Muhammadiyah</span>
          </div>
          <div role="listitem">
            <strong>Sejak 2021</strong>
            <span>Kampus Siber #1</span>
          </div>
        </div>
      </div>

      {/* ── Right: visual ── */}
      <div className="hero-split__visual" aria-hidden="true">
        {/* Decorative blobs */}
        <div className="hero-split__blob hero-split__blob--gold" />
        <div className="hero-split__blob hero-split__blob--green" />

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
            <strong>Pembelajaran Jarak Jauh</strong>
            <span>Fleksibel · Terjangkau · Berkualitas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
