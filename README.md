# EduPortal SiberMu - Kemahasiswaan & AIK

Landing page satu halaman dengan gaya institusional universitas. Revisi 30 September 2026: navy-putih dengan aksen emas, identitas SiberMu, carousel tiga sorotan, foto pada kartu, layanan Mahasiswa/Dosen, dan pembinaan AIK. Bagian kemitraan, kerja sama perusahaan, serta seluruh label placeholder/pratinjau di antarmuka telah dihapus sesuai permintaan.

## Menjalankan

Node.js 22 LTS (digunakan: 22.14.0), npm 11.6.3. Gunakan versi yang sama pada seluruh anggota.

```sh
npm ci
npm run dev
```

Buka http://127.0.0.1:3000. Untuk produksi:

```sh
npm run build
npm start
```

Hasil ekspor statis berada di `out/`; `npm start` membuka http://127.0.0.1:3001. `npm run lint` memeriksa sumber aplikasi. Next.js 16.3.7 dan React 19.3.0 terkunci melalui `package-lock.json`. Ikon dan carousel tetap dibuat lokal; Lenis 1.3.26 menangani smooth scrolling dan GSAP 3.15.0 mendukung komponen reveal React Bits yang disimpan di dalam proyek.

## Isi dan interaksi

- Header universitas dengan logo asli, navigasi jangkar, dan menu ponsel.
- Carousel tiga sorotan: tombol sebelumnya/berikutnya, pemilih slide, tombol panah keyboard, serta putar otomatis opsional. Secara bawaan carousel diam; preferensi reduced motion dihormati.
- Intro singkat saat halaman dimuat, reveal konten berbasis React Bits, dan smooth scrolling Lenis; seluruh gerak dinonaktifkan atau disederhanakan saat pengguna memilih reduced motion.
- Kartu Organisasi Mahasiswa, Unit Kegiatan Mahasiswa, dan Prestasi Mahasiswa dengan gambar.
- Bagian AIK: pembinaan nilai, karakter, dan informasi kegiatan.
- Pilihan layanan Mahasiswa/Dosen; E-learning dan Yudisium mengarah ke situs universitas.
- Filter informasi Semua/Kemahasiswaan/AIK, dialog informasi, FAQ, dan kontak universitas.

Tidak ada tanggal agenda, nama organisasi, atau penghargaan rekaan yang dipresentasikan sebagai fakta. Informasi umum yang belum memiliki detail operasional diarahkan ke kanal universitas. Tidak ada login, pendaftaran, atau pengiriman data di situs ini. Metadata noindex dipertahankan untuk situs rancangan lomba; tampilannya tidak menyatakan telah disahkan atau diterbitkan universitas.

## Struktur

| Lokasi | Isi |
| --- | --- |
| `app/page.js` | Susunan halaman |
| `app/globals.css` | Tema formal, responsivitas, fokus, dan reduced motion |
| `app/layout.js` | Metadata, bahasa Indonesia, favicon |
| `components/Hero.jsx` | Tiga sorotan carousel dan kontrol |
| `components/reactbits/AnimatedContent.jsx` | Reveal section yang diadaptasi dari React Bits |
| `components/SmoothScroll.jsx` | Integrasi Lenis dengan animation loop GSAP |
| `components/` | Blok UI lainnya |
| `data/content.js` | Data kartu, layanan, informasi, AIK, dan FAQ |
| `public/images/` | Gambar WebP yang disajikan secara lokal |
| `docs/ASSET_SOURCES.md` | Sumber logo/foto dan catatan ilustrasi |
| `docs/dokumentasi.pdf` | Dokumentasi empat halaman |

Untuk mengganti gambar, simpan aset berizin di `public/images/`, perbarui path serta alt pada komponen/data, lalu lakukan build ulang. `next/image` mengelola dimensi dan pemuatan; optimasi WebP dilakukan sebelum build karena ekspor bersifat statis. Font Source Sans 3 dimuat melalui Google Fonts dengan fallback Arial. Heading memakai Georgia sistem.

## Catatan sumber dan publikasi

Logo dan foto PBJJ berasal dari situs SiberMu, bukan situs referensi peserta lain. Ilustrasi AIK dihasilkan dengan AI dan tidak menggambarkan ruang kampus nyata. Sumber serta konteks dicatat di `docs/ASSET_SOURCES.md`; konfirmasi persetujuan penggunaan aset dengan pihak kampus sebelum penerbitan resmi. Situs referensi hanya digunakan untuk memahami kebutuhan identitas institusi dan hierarki informasi; kode, teks, dan asetnya tidak disalin.

Nama tiga anggota, repositori publik, dan identitas pengumpulan belum diberikan. Dokumentasi masih perlu dilengkapi dengan data tim serta tautan akhir. Ketentuan lomba mengikuti brief pengguna, bukan verifikasi independen penyelenggara. Tidak ada pengiriman karya ke formulir lomba.
