import Image from 'next/image';
import { aikValues } from '../data/content';
import InfoButton from './InfoButton';
import ScrollReveal from './reactbits/ScrollReveal';
import ScrollFloat from './reactbits/ScrollFloat';

export default function AikSection() {
  return <section className="aik-wrap" id="aik"><div className="section aik-section">
    <div className="aik-image-column"><div className="aik-pattern-tile" aria-hidden="true" /><div className="aik-image"><Image src="/images/aik-study.webp" alt="Ilustrasi buku terbuka dalam ruang belajar dengan arsitektur bernuansa Islam" fill sizes="(max-width: 850px) 91vw, 45vw" /></div><div className="aik-image-caption"><span>ILMU · IMAN · AMAL</span><p>Meneguhkan nilai.<br />Menghadirkan kebermanfaatan.</p></div></div>
    <div className="aik-copy">
      <div className="eyebrow">PEMBINAAN NILAI & KARAKTER</div>
      <ScrollFloat>Al-Islam & Kemuhammadiyahan (AIK)</ScrollFloat>
      <ScrollReveal textClassName="aik-desc">
        Fondasi moral dan spiritual civitas akademika SiberMu — pencerahan nilai Islam berkemajuan yang adaptif di era digital.
      </ScrollReveal>
      <div className="value-list">{aikValues.map((item, index) => <div key={item.name}><span>0{index + 1}</span><div><h3>{item.name}</h3><p>{item.text}</p></div></div>)}</div>
      <div className="aik-actions"><a href="#agenda" className="button navy">Informasi Kegiatan AIK</a><InfoButton title="Kajian dan Pembinaan AIK" label="Mengenal pembinaan AIK" className="card-link"><p>Pembinaan Al-Islam dan Kemuhammadiyahan menghubungkan pemahaman keagamaan, akhlak, dan tanggung jawab sosial dengan kehidupan akademik.</p><p>Ruang pembinaan meliputi kajian keislaman, pengenalan nilai Kemuhammadiyahan, syiar, dan pengamalan dalam kehidupan sehari-hari. Materi, narasumber, serta jadwal mengikuti informasi pengelola AIK.</p></InfoButton></div>
    </div>
  </div></section>;
}
