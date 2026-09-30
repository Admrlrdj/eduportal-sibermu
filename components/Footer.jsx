import Image from 'next/image';

export default function Footer() {
  return <footer className="footer" id="kontak"><div className="container footer-top">
    <div className="footer-identity"><div className="footer-logo"><Image src="/images/sibermu-logo.webp" width={280} height={66} alt="Universitas Siber Muhammadiyah" /></div><h3>Portal Kemahasiswaan & AIK</h3><p>Informasi pengembangan mahasiswa dan pembinaan Al-Islam dan Kemuhammadiyahan.</p></div>
    <div><h3>Navigasi</h3><a href="#kemahasiswaan">Kemahasiswaan</a><a href="#aik">Al-Islam & Kemuhammadiyahan</a><a href="#agenda">Informasi Kegiatan</a><a href="#layanan">Layanan Mahasiswa & Dosen</a></div>
    <div><h3>Kanal Universitas</h3><a href="https://sibermu.ac.id/" target="_blank" rel="noreferrer">Situs SiberMu</a><a href="https://sibermu.ac.id/e-learning/" target="_blank" rel="noreferrer">E-learning</a><a href="https://sibermu.ac.id/admisi" target="_blank" rel="noreferrer">Informasi Admisi</a><a href="#pertanyaan">Pertanyaan Umum</a></div>
    <div className="footer-contact"><h3>Kampus Pusat</h3><address>Jl. HOS Cokroaminoto No. 17<br />Yogyakarta, DI Yogyakarta 55253</address><a href="mailto:humas@sibermu.ac.id">humas@sibermu.ac.id</a><a href="https://sibermu.ac.id/" target="_blank" rel="noreferrer">www.sibermu.ac.id</a></div>
  </div><div className="container footer-bottom"><span>© 2026 EduPortal SiberMu</span><span>Kemahasiswaan & Al-Islam dan Kemuhammadiyahan</span><a href="#beranda">Kembali ke atas</a></div></footer>;
}
