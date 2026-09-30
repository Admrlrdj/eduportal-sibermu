'use client';

import { useState } from 'react';
import { services } from '../data/content';
import Icon from './Icon';
import InfoButton from './InfoButton';

export default function Services() {
  const [role, setRole] = useState('Mahasiswa');
  return <section className="services-wrap" id="layanan"><div className="section">
    <div className="section-head"><div><div className="eyebrow">AKSES LAYANAN</div><h2>Informasi dan Layanan Akademik</h2></div><p>Akses informasi yang relevan untuk mendukung kegiatan mahasiswa dan dosen.</p></div>
    <div className="segmented" role="group" aria-label="Pilih peran pengunjung">{Object.keys(services).map(item => <button key={item} aria-pressed={role === item} onClick={() => setRole(item)}>{item}</button>)}</div>
    <div className="services-grid" aria-live="polite">{services[role].map(item => <article className="service-card" key={item.name}>
      <span className="service-icon"><Icon name={item.icon} size={27} /></span><h3>{item.name}</h3><p>{item.text}</p>
      {item.href ? <a className="card-link" href={item.href} target="_blank" rel="noreferrer">{item.label}</a> : <InfoButton title={item.name} label="Informasi layanan">{item.detail}</InfoButton>}
    </article>)}</div>
  </div></section>;
}
