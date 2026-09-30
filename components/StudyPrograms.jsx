'use client';

import Icon from './Icon';
import ScrollReveal from './reactbits/ScrollReveal';
import ScrollFloat from './reactbits/ScrollFloat';

const programs = [
  {
    name: 'S1 Informatika',
    degree: 'Sarjana Komputer (S.Kom)',
    desc: 'Pengembangan perangkat lunak modern, kecerdasan buatan (AI), keamanan siber, dan komputasi awan.',
    icon: 'monitor',
    tag: 'Teknologi'
  },
  {
    name: 'S1 Sistem Informasi',
    degree: 'Sarjana Komputer (S.Kom)',
    desc: 'Integrasi solusi TI dengan strategi bisnis, analitika data perusahaan, dan manajemen sistem digital.',
    icon: 'spark',
    tag: 'Bisnis & TI'
  },
  {
    name: 'S1 Manajemen',
    degree: 'Sarjana Manajemen (S.M)',
    desc: 'Kepemimpinan bisnis digital, kewirausahaan inovatif, pemasaran digital, dan tata kelola organisasi.',
    icon: 'briefcase',
    tag: 'Ekonomi'
  },
  {
    name: 'S1 Akuntansi',
    degree: 'Sarjana Akuntansi (S.Ak)',
    desc: 'Sistem informasi akuntansi, audit forensik digital, analisis keuangan, dan kepatuhan perpajakan.',
    icon: 'card',
    tag: 'Keuangan'
  },
  {
    name: 'S1 Hukum',
    degree: 'Sarjana Hukum (S.H)',
    desc: 'Hukum siber dan transaksi elektronik, hukum bisnis kontemporer, serta advokasi keadilan sosial.',
    icon: 'scale',
    tag: 'Hukum'
  },
  {
    name: 'S1 Administrasi Kesehatan',
    degree: 'Sarjana Administrasi Kesehatan (S.Kes)',
    desc: 'Manajemen fasilitas layanan kesehatan modern, rekam medis digital, dan kebijakan kesehatan publik.',
    icon: 'heart',
    tag: 'Kesehatan'
  }
];

export default function StudyPrograms() {
  return (
    <section className="section" id="program-studi" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div className="section-head">
        <div>
          <div className="eyebrow">PENDIDIKAN JARAK JAUH</div>
          <ScrollFloat>6 Program Studi Unggulan</ScrollFloat>
        </div>
        <ScrollReveal>
          Kurikulum terintegrasi teknologi mutakhir dan nilai Islam berkemajuan, dirancang fleksibel untuk mahasiswa PJJ.
        </ScrollReveal>
      </div>

      <div className="prodi-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {programs.map((prodi, idx) => (
          <div key={idx} className="prodi-card" style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid var(--line)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '18px',
            boxShadow: '0 8px 30px rgba(11, 22, 38, 0.04)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'var(--pale)',
                  color: 'var(--navy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon name={prodi.icon} size={24} />
                </div>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--gold)',
                  background: 'rgba(226, 163, 68, 0.12)',
                  padding: '4px 12px',
                  borderRadius: 99
                }}>{prodi.tag}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px 0', color: 'var(--navy)' }}>{prodi.name}</h3>
              <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, marginBottom: 12 }}>{prodi.degree}</div>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{prodi.desc}</p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 16,
              borderTop: '1px solid var(--line)'
            }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>Format: Pembelajaran Jarak Jauh (PJJ)</span>
              <a href="https://sibermu.ac.id/" target="_blank" rel="noreferrer" style={{
                color: 'var(--navy)',
                fontSize: 13,
                fontWeight: 650,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}>
                Detail prodi &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .prodi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(11, 22, 38, 0.08);
          border-color: rgba(226, 163, 68, 0.4);
        }
      `}} />
    </section>
  );
}
