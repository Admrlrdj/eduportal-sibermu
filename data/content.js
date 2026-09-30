// Informasi editorial umum; tidak mencantumkan organisasi atau agenda rekaan.
export const communities = [
  { name: 'Organisasi Mahasiswa', category: 'KEPEMIMPINAN', image: '/images/campus-activity.webp', alt: 'Dokumentasi diskusi peserta kegiatan PBJJ SiberMu', description: 'Wadah pengembangan kepemimpinan, penyaluran aspirasi, dan partisipasi dalam kehidupan kampus.', detail: 'Organisasi mahasiswa menjadi ruang untuk belajar menyampaikan gagasan, bermusyawarah, dan menjalankan tanggung jawab. Untuk informasi kepengurusan, persyaratan, dan kegiatan yang sedang dibuka, silakan menghubungi pihak universitas melalui kanal resminya.' },
  { name: 'Unit Kegiatan Mahasiswa', category: 'MINAT & BAKAT', image: '/images/pbjj-community.webp', alt: 'Dokumentasi kegiatan belajar komputer PBJJ SiberMu', description: 'Temukan informasi pengembangan minat, bakat, kreativitas, dan keterampilan di luar perkuliahan.', detail: 'Pengembangan minat dan bakat dapat dilakukan melalui kegiatan keilmuan, kreativitas, olahraga, serta pengabdian. Daftar unit kegiatan, jadwal, dan cara bergabung mengikuti informasi yang diterbitkan pengelola kemahasiswaan.' },
  { name: 'Prestasi Mahasiswa', category: 'KARYA & PENCAPAIAN', image: '/images/achievement.webp', alt: 'Dokumentasi publikasi pencapaian mahasiswa Hukum SiberMu', description: 'Apresiasi atas pencapaian akademik, karya ilmiah, dan kontribusi mahasiswa SiberMu.', detail: 'Publikasi universitas memuat informasi pencapaian mahasiswa, termasuk penelitian tugas akhir pada jurnal nasional terakreditasi. Bacalah informasi selengkapnya melalui publikasi resmi universitas.', href: 'https://sibermu.ac.id/kosong/mahasiswa-s1-pjj-hukum-sibermu-lulus-ujian-tugas-akhir-dan-publikasikan-penelitian-pada-jurnal-nasional-terakreditasi/' },
];
export const services = {
  Mahasiswa: [
    {name:'Pembelajaran Daring',icon:'book',text:'Akses informasi pembelajaran dan lingkungan belajar digital universitas.',href:'https://sibermu.ac.id/e-learning/',label:'Buka E-learning'},
    {name:'Informasi Yudisium',icon:'cap',text:'Pelajari alur, persyaratan, dan dokumen administrasi yudisium.',href:'https://sibermu.ac.id/yudisium/',label:'Informasi yudisium'},
    {name:'Layanan Kemahasiswaan',icon:'people',text:'Informasi kegiatan, pengembangan diri, dan dukungan selama studi.',detail:'Sampaikan pertanyaan terkait kegiatan mahasiswa, informasi beasiswa, atau kebutuhan pendampingan melalui kanal universitas. Sertakan topik pertanyaan dan program studi agar dapat diarahkan kepada pengelola terkait. Jangan mengirimkan data sensitif sebelum mendapatkan arahan petugas.'},
  ],
  Dosen: [
    {name:'Pembelajaran Daring',icon:'book',text:'Akses lingkungan pembelajaran untuk mendukung proses pengajaran.',href:'https://sibermu.ac.id/e-learning/',label:'Buka E-learning'},
    {name:'Pendampingan Mahasiswa',icon:'people',text:'Informasi pendampingan kegiatan dan pengembangan potensi mahasiswa.',detail:'Pendampingan mencakup pengarahan kegiatan, pembinaan karakter, dan pengembangan kemampuan mahasiswa. Mekanisme penugasan dan kegiatan mengikuti koordinasi dengan pengelola kemahasiswaan.'},
    {name:'Pembinaan AIK',icon:'heart',text:'Penguatan nilai Al-Islam dan Kemuhammadiyahan dalam kehidupan akademik.',detail:'Materi dan kegiatan AIK dapat dikembangkan melalui kajian, diskusi, dan pendampingan. Usulan materi, jadwal, serta penugasan narasumber mengikuti koordinasi dan kurasi pengelola AIK.'},
  ],
};
export const information = [
  {category:'Kemahasiswaan',label:'PUBLIKASI MAHASISWA',title:'Penelitian Mahasiswa Hukum pada Jurnal Nasional Terakreditasi',text:'Baca publikasi universitas mengenai pencapaian akademik mahasiswa S1 PJJ Hukum.',href:'https://sibermu.ac.id/kosong/mahasiswa-s1-pjj-hukum-sibermu-lulus-ujian-tugas-akhir-dan-publikasikan-penelitian-pada-jurnal-nasional-terakreditasi/',icon:'trophy'},
  {category:'Kemahasiswaan',label:'INFORMASI AKADEMIK',title:'Persyaratan dan Alur Pendaftaran Wisuda',text:'Informasi persyaratan, kelengkapan berkas, dan pelaksanaan wisuda tersedia pada laman universitas.',href:'https://sibermu.ac.id/wisuda/',icon:'cap'},
  {category:'AIK',label:'KAJIAN & PEMBINAAN',title:'Kajian dan Kegiatan Al-Islam dan Kemuhammadiyahan',text:'Informasi pelaksanaan kajian, pembinaan, dan syiar mengikuti pengumuman pengelola AIK.',detail:'Kajian dan kegiatan AIK menjadi ruang untuk memperdalam pemahaman, menumbuhkan akhlak, dan memperkuat pengamalan nilai Islam. Jadwal, narasumber, serta tautan kegiatan mengikuti pengumuman universitas. Silakan menghubungi kanal universitas untuk informasi kegiatan yang sedang tersedia.',icon:'book'},
];
export const aikValues = [
  {name:'Pemahaman Keislaman',text:'Memperdalam pemahaman agama sebagai landasan sikap dan tindakan.'},
  {name:'Nilai Kemuhammadiyahan',text:'Mengenal semangat keilmuan, pembaruan, dan pengabdian kepada masyarakat.'},
  {name:'Akhlak & Tanggung Jawab',text:'Menerapkan kejujuran, adab, dan kepedulian dalam kehidupan akademik maupun digital.'},
];
export const faqs = [
  {q:'Informasi apa yang tersedia dalam portal ini?',a:'Portal ini menghimpun informasi kemahasiswaan, organisasi, minat dan bakat, prestasi, layanan akademik, serta Al-Islam dan Kemuhammadiyahan dalam satu halaman.'},
  {q:'Bagaimana memperoleh informasi organisasi dan UKM?',a:'Buka bagian Kemahasiswaan untuk mengenal bidang kegiatannya. Informasi kepengurusan, jadwal, dan pendaftaran mengikuti pengumuman pengelola kemahasiswaan. Gunakan kanal universitas pada bagian Kontak untuk pertanyaan lebih lanjut.'},
  {q:'Di mana jadwal kajian dan kegiatan AIK dapat dilihat?',a:'Informasi pelaksanaan kegiatan mengikuti pengumuman pengelola AIK. Periksa bagian Informasi Kegiatan dan kanal universitas untuk memperoleh jadwal, narasumber, serta ketentuan partisipasi.'},
  {q:'Bagaimana mahasiswa dan dosen mengakses layanan?',a:'Pilih peran Mahasiswa atau Dosen pada bagian Layanan. Tautan E-learning dan layanan akademik mengarah ke laman universitas. Untuk layanan yang memerlukan pengarahan, tersedia rincian informasi dan kanal kontak.'},
];
