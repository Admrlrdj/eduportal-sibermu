'use client';

import { useState } from 'react';
import { information } from '../data/content';
import InfoButton from './InfoButton';
import Icon from './Icon';
import ScrollReveal from './reactbits/ScrollReveal';

export default function Agenda() {
  const [filter, setFilter] = useState('Semua');
  const items = information.filter(item => filter === 'Semua' || item.category === filter);
  return <section className="section agenda-section" id="agenda">
    <div className="section-head">
      <div>
        <div className="eyebrow">PUBLIKASI & KEGIATAN</div>
        <h2>Temukan Jalur<br />Aktivitas Kampusmu</h2>
      </div>
      <ScrollReveal>
        Pilih minat utama untuk melihat rekomendasi UKM dan program AIK yang paling cocok dengan potensimu.
      </ScrollReveal>
    </div>
    <div className="filter-group" role="group" aria-label="Filter informasi">{['Semua', 'Kemahasiswaan', 'AIK'].map(item => <button key={item} aria-pressed={item === filter} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <p className="sr-only" aria-live="polite">{items.length} informasi ditampilkan</p>
    <div className="event-list" key={filter}>{items.map((item, index) => <article className="event" key={item.title} style={{ '--item-index': index }}>
      <div className="event-symbol"><Icon name={item.icon} size={29} /></div><div className="event-copy"><span className="category-label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div>
      {item.href ? <a href={item.href} className="button outline" target="_blank" rel="noreferrer">Baca selengkapnya</a> : <InfoButton title={item.title} label="Informasi kegiatan" className="button outline">{item.detail}</InfoButton>}
    </article>)}</div>
  </section>;
}
