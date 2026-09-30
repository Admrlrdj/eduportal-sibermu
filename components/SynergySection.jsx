'use client';

import Icon from './Icon';
import ScrollReveal from './reactbits/ScrollReveal';
import ScrollFloat from './reactbits/ScrollFloat';

export default function SynergySection() {
  const pillars = [
    {
      title: 'Adab & Etika Digital',
      subtitle: 'Fondasi Karakter',
      desc: 'Mahasiswa SiberMu dibina agar tidak hanya cakap mengoperasikan teknologi, namun menjunjung tinggi kejujuran akademik, literasi siber santun, dan adab bermedia digital.',
      icon: 'shield',
      accent: '#2f5b88'
    },
    {
      title: 'Kepemimpinan Berkemajuan',
      subtitle: 'Organisasi & Tanggung Jawab',
      desc: 'Organisasi mahasiswa dan UKM berpedoman pada nilai kepemimpinan profetik: amanah, musyawarah mufakat, serta kepekaan sosial terhadap persoalan umat dan bangsa.',
      icon: 'people',
      accent: '#e2a344'
    },
    {
      title: 'Karya Nyata untuk Umat',
      subtitle: 'Prestasi & Kebermanfaatan',
      desc: 'Setiap riset, perlombaan, dan inovasi ilmiah ditujukan untuk menghadirkan solusi konkret dan kemaslahatan masyarakat yang luas (Islam Berkemajuan).',
      icon: 'trophy',
      accent: '#2a7b62'
    }
  ];

  return (
    <section className="section" id="sinergi" style={{ paddingTop: 50, paddingBottom: 60 }}>
      <div className="section-head">
        <div>
          <div className="eyebrow">SINERGI INTEGRAL</div>
          <ScrollFloat
            containerClassName="synergy-heading"
            mobileText={'Bagaimana\nKemahasiswaan & AIK\nMelebur?'}
          >
            {'Bagaimana Kemahasiswaan & AIK\nMelebur?'}
          </ScrollFloat>
        </div>
        <ScrollReveal>
          Teknologi tinggi dan akhlak mulia berjalan beriringan membentuk lulusan yang kompeten dan berintegritas.
        </ScrollReveal>
      </div>

      <div className="synergy-bento" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {pillars.map((item, i) => (
          <div key={i} className="synergy-card" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%)',
            border: '1px solid var(--line)',
            borderRadius: '24px',
            padding: '34px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 12px 35px rgba(11, 22, 38, 0.04)',
            transition: 'all 0.25s ease'
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '16px',
              background: 'var(--pale)',
              color: item.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)'
            }}>
              <Icon name={item.icon} size={26} />
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                {item.subtitle}
              </span>
              <h3 style={{ fontSize: 21, fontWeight: 700, margin: '6px 0 0 0', color: 'var(--navy)' }}>
                {item.title}
              </h3>
            </div>
            <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .synergy-card h3 {
          min-height: 2.7em;
        }
        .synergy-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 45px rgba(11, 22, 38, 0.09);
          border-color: rgba(226, 163, 68, 0.4);
        }
      `}} />
    </section>
  );
}
