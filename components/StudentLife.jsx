import { communities } from '../data/content';
import AccordionGallery from './reactbits/AccordionGallery';
import ScrollReveal from './reactbits/ScrollReveal';
import ScrollFloat from './reactbits/ScrollFloat';

export default function StudentLife() {
  const items = communities.map(c => ({
    image: c.image,
    label: c.name,
    alt: c.alt,
    description: c.description,
    link: c.href
  }));

  return (
    <section className="section" id="kemahasiswaan">
      <div className="section-head">
        <div>
          <div className="eyebrow">BIDANG KEMAHASISWAAN</div>
          <ScrollFloat>Pengembangan Diri & Kehidupan Mahasiswa</ScrollFloat>
        </div>
        <ScrollReveal>
          Mendukung mahasiswa untuk berorganisasi, mengembangkan kemampuan, dan menghadirkan karya yang bermanfaat.
        </ScrollReveal>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', marginBottom: 30 }}>
        <AccordionGallery
          items={items}
          defaultIndex={1}
          expandRatio={0.52}
          height={460}
        />
      </div>

      <div className="section-note"><span className="note-rule" /><p>Pengembangan potensi dan pembinaan karakter merupakan bagian dari perjalanan pendidikan mahasiswa.</p></div>
    </section>
  );
}
