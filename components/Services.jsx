'use client';

import { services } from '../data/content';
import Icon from './Icon';
import InfoButton from './InfoButton';
import Folder from './reactbits/Folder';
import ScrollReveal from './reactbits/ScrollReveal';
import ScrollFloat from './reactbits/ScrollFloat';

export default function Services() {
  const tabs = Object.keys(services);
  return <section className="services-wrap" id="layanan"><div className="section">
    <div className="section-head">
      <div>
        <div className="eyebrow">AKSES LAYANAN</div>
        <ScrollFloat>Informasi dan Layanan Akademik</ScrollFloat>
      </div>
      <ScrollReveal>
        Akses informasi yang relevan untuk mendukung kegiatan mahasiswa dan dosen.
      </ScrollReveal>
    </div>
    <Folder tabs={tabs}>
      {tabs.map(role => (
        <div key={role} className="services-grid" aria-live="polite">
          {services[role].map(item => <article className="service-card" key={item.name}>
            <span className="service-icon"><Icon name={item.icon} size={27} /></span><h3>{item.name}</h3><p>{item.text}</p>
            {item.href ? <a className="card-link" href={item.href} target="_blank" rel="noreferrer">{item.label}</a> : <InfoButton title={item.name} label="Informasi layanan">{item.detail}</InfoButton>}
          </article>)}
        </div>
      ))}
    </Folder>
  </div></section>;
}
