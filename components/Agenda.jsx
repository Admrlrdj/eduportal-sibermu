'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { information } from '../data/content';
import InfoButton from './InfoButton';
import Icon from './Icon';
import ScrollFloat from './reactbits/ScrollFloat';
import ScrollReveal from './reactbits/ScrollReveal';

export default function Agenda() {
  const [filter, setFilter] = useState('Semua');
  const items = information.filter(item => filter === 'Semua' || item.category === filter);
  return <section className="section agenda-section" id="agenda">
    <ScrollFloat>
      <div className="section-head">
        <div>
          <div className="eyebrow">PUBLIKASI & KEGIATAN</div>
          <h2>Temukan Jalur<br />Aktivitas Kampusmu</h2>
        </div>
        <ScrollReveal>
          Pilih minat utama untuk melihat rekomendasi UKM dan program AIK yang paling cocok dengan potensimu.
        </ScrollReveal>
      </div>
    </ScrollFloat>
    <ScrollFloat>
      <div className="filter-group" role="group" aria-label="Filter informasi">
        {['Semua', 'Kemahasiswaan', 'AIK'].map(item => {
          const isActive = item === filter;
          return <motion.button
            key={item}
            type="button"
            aria-pressed={isActive}
            onClick={() => setFilter(item)}
          >
            {isActive && <motion.span className="filter-chip__active" layoutId="agenda-filter-active" transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} />}
            <span className="filter-chip__label">{item}</span>
          </motion.button>;
        })}
      </div>
    </ScrollFloat>
    <p className="sr-only" aria-live="polite">{items.length} informasi ditampilkan</p>
    <ScrollFloat animationKey={filter}>
      <motion.div className="event-list" layout>
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, index) => <motion.div
            className="event-motion-shell"
            key={item.title}
            layout
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.985 }}
            transition={{ duration: 0.38, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
          >
            <article className="event">
              <div className="event-symbol"><Icon name={item.icon} size={29} /></div><div className="event-copy"><span className="category-label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div>
              {item.href ? <a href={item.href} className="button outline" target="_blank" rel="noreferrer">Baca selengkapnya</a> : <InfoButton title={item.title} label="Informasi kegiatan" className="button outline">{item.detail}</InfoButton>}
            </article>
          </motion.div>)}
        </AnimatePresence>
      </motion.div>
    </ScrollFloat>
  </section>;
}
