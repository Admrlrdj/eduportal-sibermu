import Image from 'next/image';
import { communities } from '../data/content';
import InfoButton from './InfoButton';

export default function StudentLife() {
  return <section className="section" id="kemahasiswaan">
    <div className="section-head"><div><div className="eyebrow">BIDANG KEMAHASISWAAN</div><h2>Pengembangan Diri dan<br className="desktop-break" /> Kehidupan Mahasiswa</h2></div><p>Mendukung mahasiswa untuk berorganisasi, mengembangkan kemampuan, dan menghadirkan karya yang bermanfaat.</p></div>
    <div className="community-grid">{communities.map(item => <article className="community-card" key={item.name}>
      <div className="card-photo"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 90vw, 30vw" /></div>
      <div className="community-body"><span className="category-label">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p>{item.href ? <a className="card-link" href={item.href} target="_blank" rel="noreferrer">Baca publikasi universitas</a> : <InfoButton title={item.name} label="Informasi selengkapnya">{item.detail}</InfoButton>}</div>
    </article>)}</div>
    <div className="section-note"><span className="note-rule" /><p>Pengembangan potensi dan pembinaan karakter merupakan bagian dari perjalanan pendidikan mahasiswa.</p></div>
  </section>;
}
