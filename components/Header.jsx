'use client';

import { useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';

const navigation = [
  ['Beranda', '#beranda'],
  ['Kemahasiswaan', '#kemahasiswaan'],
  ['Al-Islam & AIK', '#aik'],
  ['Layanan', '#layanan'],
  ['Informasi Kegiatan', '#agenda'],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return <>
    <header className="header floating-header">
      <div className="container masthead">
        <a href="#beranda" className="university-brand" aria-label="EduPortal SiberMu, beranda">
          <div className="brand-badge">
            <Image src="/images/sibermu-logo.webp" alt="Universitas Siber Muhammadiyah" width={220} height={52} priority />
          </div>
        </a>
        <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navigasi utama">
          <div className="nav-inner">
            {navigation.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a className="nav-contact nav-contact-mobile" href="#kontak" onClick={() => setOpen(false)}>
              <span>Hubungi Kami</span>
              <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </nav>
        <a className="nav-contact nav-contact-desktop" href="#kontak">
          <span>Hubungi Kami</span>
          <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  </>;
}
