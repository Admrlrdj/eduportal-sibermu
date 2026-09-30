import Header from '../components/Header';
import Hero from '../components/Hero';
import Icon from '../components/Icon';
import StudentLife from '../components/StudentLife';
import Services from '../components/Services';
import AikSection from '../components/AikSection';
import Agenda from '../components/Agenda';
import Footer from '../components/Footer';
import { faqs } from '../data/content';

export default function Page() {
  return <><a className="skip-link" href="#main">Lewati ke konten</a><Header /><main id="main"><Hero />
    <div className="quick-links container" aria-label="Akses cepat">
      <a href="#kemahasiswaan"><Icon name="people" size={30} /><span><strong>Kemahasiswaan</strong><small>Organisasi, minat & prestasi</small></span></a>
      <a href="#aik"><Icon name="book" size={30} /><span><strong>Al-Islam & Kemuhammadiyahan</strong><small>Pembinaan nilai & karakter</small></span></a>
      <a href="#layanan"><Icon name="cap" size={30} /><span><strong>Layanan Akademik</strong><small>Informasi mahasiswa & dosen</small></span></a>
    </div>
    <StudentLife /><AikSection /><Services /><Agenda />
    <section className="section faq-section" id="pertanyaan"><div><div className="eyebrow">PUSAT INFORMASI</div><h2>Pertanyaan<br />yang Sering Diajukan</h2><p>Informasi awal untuk membantu Anda menemukan layanan dan kegiatan yang sesuai.</p><a className="card-link" href="#kontak">Hubungi kanal universitas</a></div><div className="faq-list">{faqs.map(item => <details key={item.q}><summary>{item.q}<Icon name="plus" size={20} /></summary><p>{item.a}</p></details>)}</div></section>
    <section className="closing"><div className="container closing-inner"><div><span className="eyebrow">INFORMASI UNIVERSITAS</span><h2>Terhubung dengan SiberMu</h2><p>Temukan informasi akademik dan pengumuman selengkapnya melalui situs universitas.</p></div><a className="button gold" href="https://sibermu.ac.id/" target="_blank" rel="noreferrer">Kunjungi Situs Universitas</a></div></section>
  </main><Footer /></>;
}
