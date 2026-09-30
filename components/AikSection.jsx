import Image from 'next/image';
import { aikValues } from '../data/content';
import InfoButton from './InfoButton';

export default function AikSection() {
  return <section className="aik-wrap" id="aik"><div className="section aik-section">
    <div className="aik-image-column"><div className="aik-image"><Image src="/images/aik-study.webp" alt="Ilustrasi buku terbuka dalam ruang belajar dengan arsitektur bernuansa Islam" fill sizes="(max-width: 760px) 90vw, 45vw" /></div><div className="aik-image-caption"><span>ILMU · IMAN · AMAL</span><p>Meneguhkan nilai.<br />Menghadirkan kebermanfaatan.</p></div></div>
    <div className="aik-copy"><div className="eyebrow">PEMBINAAN NILAI & KARAKTER</div><h2>Al-Islam dan<br />Kemuhammadiyahan</h2><p>AIK menjadi landasan untuk membangun insan akademik yang berilmu, berakhlak, dan memiliki kepedulian terhadap masyarakat.</p>
      <div className="value-list">{aikValues.map((item, index) => <div key={item.name}><span>0{index + 1}</span><div><h3>{item.name}</h3><p>{item.text}</p></div></div>)}</div>
      <div className="aik-actions"><a href="#agenda" className="button navy">Informasi Kegiatan AIK</a><InfoButton title="Kajian dan Pembinaan AIK" label="Mengenal pembinaan AIK" className="card-link"><p>Pembinaan Al-Islam dan Kemuhammadiyahan menghubungkan pemahaman keagamaan, akhlak, dan tanggung jawab sosial dengan kehidupan akademik.</p><p>Ruang pembinaan meliputi kajian keislaman, pengenalan nilai Kemuhammadiyahan, syiar, dan pengamalan dalam kehidupan sehari-hari. Materi, narasumber, serta jadwal mengikuti informasi pengelola AIK.</p></InfoButton></div>
    </div>
  </div></section>;
}
