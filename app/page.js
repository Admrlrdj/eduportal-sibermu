import Header from '../components/Header';
import Hero from '../components/Hero';
import Icon from '../components/Icon';
import StudentLife from '../components/StudentLife';
import Services from '../components/Services';
import AikSection from '../components/AikSection';
import Agenda from '../components/Agenda';
import Footer from '../components/Footer';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import ScrollReveal from '../components/reactbits/ScrollReveal';
import ScrollFloat from '../components/reactbits/ScrollFloat';
import Accordion from '../components/reactbits/Accordion';
import WhySiberMu from '../components/WhySiberMu';
import StudyPrograms from '../components/StudyPrograms';
import SynergySection from '../components/SynergySection';
import ActivityDocumentation from '../components/ActivityDocumentation';
import { faqs } from '../data/content';

export default function Page() {
  return <><a className="skip-link" href="#main">Lewati ke konten</a><Header /><main id="main"><Hero />
    <AnimatedContent className="quick-links-reveal" distance={12}><div className="quick-links container" aria-label="Akses cepat">
      <a href="#kemahasiswaan"><Icon name="people" size={30} /><span><strong>Kemahasiswaan</strong><small>Organisasi, minat & prestasi</small></span></a>
      <a href="#aik"><Icon name="book" size={30} /><span><strong>Al-Islam & Kemuhammadiyahan</strong><small>Pembinaan nilai & karakter</small></span></a>
      <a href="#layanan"><Icon name="cap" size={30} /><span><strong>Layanan Akademik</strong><small>Informasi mahasiswa & dosen</small></span></a>
    </div></AnimatedContent>
    <ScrollFloat><WhySiberMu /></ScrollFloat>
    <ScrollFloat><StudyPrograms /></ScrollFloat>
    <div className="section-divider" aria-hidden="true" />
    <ScrollFloat><StudentLife /></ScrollFloat>
    <ScrollFloat><SynergySection /></ScrollFloat>
    <div className="section-divider" aria-hidden="true" />
    <ScrollFloat><AikSection /></ScrollFloat>
    <ScrollFloat><Services /></ScrollFloat>
    <ScrollFloat><Agenda /></ScrollFloat>
    <ScrollFloat><section className="section faq-section" id="pertanyaan"><div><div className="eyebrow">PUSAT INFORMASI</div><h2>Pertanyaan<br />yang Sering Diajukan</h2><ScrollReveal>Informasi awal untuk membantu Anda menemukan layanan dan kegiatan yang sesuai.</ScrollReveal><a className="card-link" href="#kontak">Hubungi kanal universitas</a></div><Accordion data={faqs} /></section></ScrollFloat>
    <div className="section-divider" aria-hidden="true" />
    <ScrollFloat><ActivityDocumentation /></ScrollFloat>
    <ScrollFloat><section className="closing"><div className="container closing-inner"><div><span className="eyebrow">INFORMASI UNIVERSITAS</span><h2>Siap Bergabung dengan Kampus Siber Pertama?</h2><ScrollReveal>Kuliah fleksibel berkualitas tinggi dengan biaya terjangkau (mulai Rp1 juta/semester), didukung penuh jaringan Persyarikatan Muhammadiyah.</ScrollReveal></div><a className="button gold" href="https://sibermu.ac.id/" target="_blank" rel="noreferrer">Kunjungi Situs Universitas</a></div></section></ScrollFloat>
  </main><Footer /></>;
}
