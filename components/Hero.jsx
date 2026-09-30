'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';

const slides = [
  { category: 'KEMAHASISWAAN', title: 'Mengembangkan Potensi, Membangun Karakter.', text: 'Informasi organisasi, kegiatan, prestasi, dan layanan mahasiswa dalam satu portal yang terintegrasi.', image: '/images/campus-activity.webp', alt: 'Peserta mengikuti kegiatan pembelajaran di Pusat Belajar Jarak Jauh SiberMu', cta: 'Jelajahi Kemahasiswaan', href: '#kemahasiswaan', caption: 'Dokumentasi kegiatan PBJJ SiberMu' },
  { category: 'AL-ISLAM & KEMUHAMMADIYAHAN', title: 'Berlandaskan Ilmu, Berpedoman pada Akhlak.', text: 'Mengenal nilai Al-Islam dan Kemuhammadiyahan sebagai landasan pembelajaran, kehidupan kampus, dan pengabdian.', image: '/images/aik-study.webp', alt: 'Ilustrasi buku terbuka dalam suasana ruang belajar yang tenang', cta: 'Mengenal AIK', href: '#aik', caption: 'Ilmu, iman, dan pengamalan' },
  { category: 'PEMBELAJARAN & PENGEMBANGAN DIRI', title: 'Pendidikan yang Terhubung dengan Masa Depan.', text: 'Akses informasi pembelajaran dan pendampingan untuk mendukung perjalanan akademik mahasiswa dan dosen.', image: '/images/pbjj-community.webp', alt: 'Kegiatan pembelajaran komputer di Pusat Belajar Jarak Jauh SiberMu', cta: 'Akses Informasi Layanan', href: '#layanan', caption: 'Dokumentasi pembelajaran PBJJ SiberMu' },
];

function subscribeMotion(callback) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia('(prefers-reduced-motion: reduce)').matches, () => true);
  useEffect(() => {
    if (!playing) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % slides.length), 7000);
    const stop = () => setPlaying(false);
    media.addEventListener('change', stop);
    return () => { window.clearInterval(timer); media.removeEventListener('change', stop); };
  }, [playing]);
  function select(index) { setPlaying(false); setActive((index + slides.length) % slides.length); }
  return <section className="hero" id="beranda" aria-label="Sorotan kampus" aria-roledescription="carousel" onMouseEnter={() => setPlaying(false)} onFocusCapture={event => { if (event.target.dataset.autoplay !== 'true') setPlaying(false); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); select(active + 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); select(active - 1); } }}>
    <h1 className="sr-only">Portal Kemahasiswaan dan AIK Universitas Siber Muhammadiyah</h1>
    <div className="hero-slides" aria-live={playing ? 'off' : 'polite'}>
      {slides.map((slide, index) => <div key={slide.category} className="hero-slide" hidden={index !== active} role="group" aria-roledescription="slide" aria-label={`${index + 1} dari ${slides.length}`}>
        <Image className="hero-photo" src={slide.image} alt={slide.alt} fill sizes="100vw" preload={index === 0} />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy"><div className="eyebrow">{slide.category}</div><h2>{slide.title}</h2><p>{slide.text}</p><a className="button gold" href={slide.href}>{slide.cta}</a></div>
          <div className="photo-caption">{slide.caption}</div>
        </div>
      </div>)}
    </div>
    <div className="container carousel-controls">
      <div className="slide-selectors" role="group" aria-label="Pilih sorotan">{slides.map((slide, index) => <button key={slide.category} onClick={() => select(index)} aria-label={`Tampilkan slide ${index + 1}: ${slide.category}`} aria-pressed={active === index}><span>0{index + 1}</span><i /></button>)}</div>
      <div className="slide-actions"><span className="slide-counter">0{active + 1} <span>/ 03</span></span><button aria-label="Slide sebelumnya" onClick={() => select(active - 1)}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg></button><button aria-label="Slide berikutnya" onClick={() => select(active + 1)}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="m10 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg></button><button className="autoplay" data-autoplay="true" disabled={reducedMotion} title={reducedMotion ? 'Putar otomatis dinonaktifkan sesuai preferensi kurangi gerakan' : undefined} onClick={() => setPlaying(!playing)} aria-pressed={playing}>{playing ? 'Jeda' : 'Putar otomatis'}</button></div>
    </div>
  </section>;
}
