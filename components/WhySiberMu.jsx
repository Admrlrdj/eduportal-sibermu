import Icon from './Icon';

const features = [
  { title: 'Kuliah Online', desc: 'Mengutamakan pembelajaran online yang efektif dan inovatif', icon: 'monitor' },
  { title: 'Fleksibel', desc: 'Belajar kapan pun, di mana pun', icon: 'clock' },
  { title: 'Terbimbing', desc: 'Bentuk pembelajaran terbimbing', icon: 'people' },
  { title: 'Terjangkau', desc: 'Biaya kuliah terjangkau dan dapat dicicil 2 kali/semester', icon: 'card' },
  { title: 'Kurikulum Terkini', desc: 'Menggunakan kurikulum kampus merdeka', icon: 'book' },
];

export default function WhySiberMu() {
  return (
    <section className="section why-sibermu-section" id="mengapa-sibermu" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="section-head" style={{ display: 'block', maxWidth: 900, margin: '0 auto 60px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>KEUNGGULAN SIBERMU</div>
        <h2 style={{ marginBottom: 32 }}>Mengapa Memilih SiberMu?</h2>
        <div className="why-sibermu-box">
          <p className="why-sibermu-desc">
            Muhammadiyah telah terbukti dalam menyelenggarakan pendidikan mulai dari tingkat dasar hingga perguruan tinggi. Jaringan pendidikan Muhammadiyah tersebar di seluruh Indonesia. Muhammadiyah memiliki lebih dari 23.000 TKAB/PAUD yang dikelola oleh ‘Aisyiyah. Sekolah tingkat dasar dan menengah sekitar 12 ribuan dan Perguruan Tinggi ada 174 Perguruan Tinggi. Hal ini menunjukan komitmen Muhammadiyah dalam mengembangkan pendidikan di Indonesia.
          </p>
        </div>
      </div>

      <div className="why-features-grid" style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
        <div className="pyramid-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', width: '100%', maxWidth: 700 }}>
          {features.slice(0, 2).map((feature, i) => (
            <a key={i} href="https://sibermu.ac.id/en/#" target="_blank" rel="noreferrer" className="why-feature-card">
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>
                <Icon name={feature.icon} size={24} />
              </div>
              <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>{feature.title}</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>{feature.desc}</p>
            </a>
          ))}
        </div>
        <div className="pyramid-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', width: '100%', maxWidth: 1050 }}>
          {features.slice(2, 5).map((feature, i) => (
            <a key={i + 2} href="https://sibermu.ac.id/en/#" target="_blank" rel="noreferrer" className="why-feature-card">
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>
                <Icon name={feature.icon} size={24} />
              </div>
              <h3 style={{ fontSize: 20, margin: 0, fontWeight: 700 }}>{feature.title}</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>{feature.desc}</p>
            </a>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .why-sibermu-box {
          background: linear-gradient(145deg, #f8fafc, #f1f5f9);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 32px 40px;
          box-shadow: 0 10px 30px rgba(23, 49, 78, 0.04);
          position: relative;
        }
        .why-sibermu-box::before {
          content: '“';
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 80px;
          line-height: 1;
          color: var(--gold);
          opacity: 0.2;
          font-family: serif;
        }
        .why-sibermu-desc {
          font-size: 17px;
          line-height: 1.8;
          color: var(--navy);
          margin: 0;
          position: relative;
          z-index: 1;
        }
        .why-feature-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 30px;
          background: #fff;
          border-radius: 24px;
          border: 1px solid var(--line);
          text-decoration: none;
          color: inherit;
          flex: 1 1 300px;
          max-width: 320px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .why-feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(23, 49, 78, 0.08);
        }
      `}} />
    </section>
  );
}
