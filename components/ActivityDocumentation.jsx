'use client';

import Masonry from './reactbits/Masonry';
import ScrollReveal from './reactbits/ScrollReveal';
import ScrollFloat from './reactbits/ScrollFloat';

const galleryItems = [
  {
    id: '1',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    url: 'https://sibermu.ac.id/',
    height: 440,
    tag: 'Belajar Jarak Jauh',
    title: 'Pembelajaran Daring Interaktif PBJJ SiberMu'
  },
  {
    id: '2',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    url: 'https://sibermu.ac.id/',
    height: 320,
    tag: 'Webinar Nasional',
    title: 'Webinar Nasional Transformasi Siber & AI'
  },
  {
    id: '3',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    url: 'https://sibermu.ac.id/',
    height: 480,
    tag: 'Kolaborasi Riset',
    title: 'Riset & Publikasi Jurnal Mahasiswa SiberMu'
  },
  {
    id: '4',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    url: 'https://sibermu.ac.id/',
    height: 350,
    tag: 'Pengabdian Masyarakat',
    title: 'Program Pemberdayaan Digital Masyarakat'
  },
  {
    id: '5',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    url: 'https://sibermu.ac.id/',
    height: 460,
    tag: 'Apresiasi & Prestasi',
    title: 'Yudisium & Prestasi Akademik Mahasiswa'
  },
  {
    id: '6',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    url: 'https://sibermu.ac.id/',
    height: 380,
    tag: 'Komunitas Kampus',
    title: 'Diskusi & Sinergi Organisasi Mahasiswa'
  }
];

export default function ActivityDocumentation() {
  return (
    <section className="section" id="dokumentasi-kegiatan" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div className="section-head">
        <div>
          <div className="eyebrow">DOKUMENTASI NYATA</div>
          <ScrollFloat>Galeri Kegiatan & Aktivitas Mahasiswa</ScrollFloat>
        </div>
        <ScrollReveal>
          Potret/entusiasme mahasiswa SiberMu dalam kegiatan belajar jarak jauh, webinar nasional, kolaborasi riset, dan pengabdian masyarakat.
        </ScrollReveal>
      </div>

      <div className="section-visual" style={{ width: '100%', marginTop: 20 }}>
        <Masonry
          items={galleryItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.06}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.96}
          blurToFocus={true}
          colorShiftOnHover={true}
        />
      </div>
    </section>
  );
}
