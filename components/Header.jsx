'use client';

import { useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';

const navigation = [
  ['Beranda', '#beranda'],
  ['Kemahasiswaan', '#kemahasiswaan'],
  ['Al-Islam & Kemuhammadiyahan', '#aik'],
  ['Informasi Kegiatan', '#agenda'],
  ['Layanan', '#layanan'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="utility-bar">
      <div className="container utility-inner">
        <span>UNIVERSITAS SIBER MUHAMMADIYAH</span>
        <div><a href="https://sibermu.ac.id/" target="_blank" rel="noreferrer">Situs Universitas</a><a href="#pertanyaan">Pertanyaan Umum</a></div>
      </div>
    </div>
    <header className="header">
      <div className="container masthead">
        <a href="#beranda" className="university-brand" aria-label="EduPortal SiberMu, beranda">
          <Image src="/images/sibermu-logo.webp" alt="Universitas Siber Muhammadiyah" width={296} height={70} preload />
        </a>
        <div className="portal-name"><span>EDUPORTAL</span><strong>Kemahasiswaan & AIK</strong></div>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
      <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navigasi utama">
        <div className="container nav-inner">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-contact" href="#kontak" onClick={() => setOpen(false)}>Hubungi Kami</a></div>
      </nav>
    </header>
  </>;
}
