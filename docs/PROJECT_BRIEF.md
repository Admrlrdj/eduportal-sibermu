# Project Brief — EduPortal SiberMu

## Ringkasan

**EduPortal SiberMu: Layanan Terintegrasi Kemahasiswaan & AIK** adalah rancangan satu halaman landing page untuk Lomba Pembuatan Landing Page SiberMu 2026. Halaman ini menyatukan informasi kemahasiswaan dan Al-Islam dan Kemuhammadiyahan (AIK) dalam pengalaman yang mudah dijelajahi, responsif, dan dapat diakses.

**Penyelenggara:** Bidang Kemahasiswaan Universitas Siber Muhammadiyah  
**Peserta:** Tim beranggotakan 3 orang  
**Biaya pendaftaran:** Gratis  
**Bentuk karya:** Satu landing page, bukan dua situs atau dua karya terpisah

## Tujuan dan pengguna

- Membantu mahasiswa menemukan organisasi, kegiatan, prestasi, dan layanan kampus dari satu halaman.
- Memperkenalkan kegiatan keagamaan, kajian, syiar, serta nilai Kemuhammadiyahan secara jelas dan relevan.
- Mengarahkan pengunjung ke informasi atau layanan lanjutan melalui tombol ajakan bertindak yang tepat.
- Melayani calon mahasiswa, mahasiswa aktif, dan pengunjung umum, termasuk pengguna ponsel.

## Ruang lingkup konten

| Bagian halaman | Isi minimum | Aksi pengunjung |
| --- | --- | --- |
| Hero | Nama EduPortal SiberMu, ringkasan manfaat, visual utama | Jelajahi informasi |
| Navigasi | Tautan jangkar ke bagian Kemahasiswaan dan AIK | Pindah bagian tanpa berganti halaman |
| Organisasi mahasiswa | Gambaran organisasi dan perannya | Lihat detail atau kontak resmi jika tersedia |
| Unit kegiatan mahasiswa | Ragam UKM dan peluang berpartisipasi | Temukan kegiatan |
| Prestasi | Sorotan capaian mahasiswa | Baca kisah atau arsip jika tersedia |
| Layanan mahasiswa | Kategori bantuan dan layanan yang relevan | Akses kanal layanan resmi jika tersedia |
| AIK | Kegiatan keagamaan, kajian, syiar, dan nilai Kemuhammadiyahan | Jelajahi agenda atau materi |
| Penutup | Ajakan berpartisipasi dan tautan kontak/kanal resmi | Hubungi atau ikuti kanal resmi |

Konten faktual, logo, nama organisasi, agenda, prestasi, kontak, dan tautan resmi harus diverifikasi sebelum dipublikasikan. Jika data belum tersedia, gunakan teks contoh yang jelas bertanda **contoh**, bukan klaim yang seolah sudah resmi.

## Arah desain dan pengalaman

- Satu halaman dengan alur yang menghubungkan Kemahasiswaan dan AIK; kedua tema mendapat ruang yang seimbang.
- Utamakan tampilan ponsel, lalu sesuaikan untuk tablet dan desktop.
- Gunakan hierarki judul yang jelas, kontras memadai, teks alternatif gambar, navigasi papan ketik, dan fokus yang terlihat.
- Optimalkan gambar, batasi animasi, dan hindari komponen berat yang tidak menambah manfaat.
- Gunakan tombol ajakan bertindak yang menuju tujuan nyata; jangan tampilkan tautan kosong sebagai tautan aktif.

## Teknologi dan dependensi

**Stack utama:** React.js melalui **Next.js**, JavaScript, dan CSS. Gunakan **Node.js versi LTS** yang sama untuk seluruh anggota. Pilih satu package manager (disarankan **npm**) dan commit `package-lock.json` agar instalasi konsisten.

Next.js sudah menggunakan React.js, sehingga tim cukup membuat **satu proyek Next.js**. Tetapkan versi paket bersama di `package.json` dan jangan memakai instalasi global sebagai syarat menjalankan proyek.

| Kategori | Pilihan | Alasan |
| --- | --- | --- |
| Framework | `next`, `react`, `react-dom` | Fondasi aplikasi dan rendering halaman |
| Styling | CSS Modules atau CSS global terstruktur | Cukup untuk satu landing page tanpa menambah pustaka UI |
| Ikon | `lucide-react` *opsional* | Ikon konsisten bila benar-benar diperlukan |
| Kualitas kode | `eslint`, `eslint-config-next` | Aturan dasar yang sama untuk tiga anggota |
| Gambar dan font | Fitur bawaan Next.js | Mengurangi dependensi tambahan |

Pasang dependensi tambahan hanya jika ada kebutuhan konkret dan disetujui tim. Hindari beberapa pustaka yang mengerjakan hal serupa. Catat versi Node.js, package manager, cara menjalankan proyek, serta alasan penambahan paket di `README.md`.

## Struktur proyek yang disarankan

```text
app/
  layout.js
  page.js
  globals.css
components/
  Header.jsx
  Hero.jsx
  StudentLife.jsx
  AikSection.jsx
  Footer.jsx
data/
  content.js
public/
  images/
docs/
  dokumentasi.pdf
README.md
```

Struktur ini adalah titik awal; nama komponen boleh disesuaikan setelah desain disepakati. Simpan teks dan tautan konten di satu tempat agar ketiga anggota tidak mengubah bagian yang sama secara bersamaan.

## Pembagian kerja tim (3 orang)

| Peran | Tanggung jawab utama | Hasil yang diperiksa bersama |
| --- | --- | --- |
| Anggota 1 — Desain & konten | Alur halaman, desain responsif, aset visual, kurasi dan verifikasi informasi | Kerangka desain, konten final, sumber aset |
| Anggota 2 — Frontend Kemahasiswaan | Fondasi Next.js, navigasi, hero, organisasi, UKM, prestasi, layanan | Implementasi bagian Kemahasiswaan |
| Anggota 3 — Frontend AIK & kualitas | Bagian AIK, integrasi konten, aksesibilitas, pengujian, dokumentasi PDF | Implementasi AIK dan pemeriksaan akhir |

Semua anggota ikut meninjau tampilan, isi, dan kode. Gunakan satu repositori publik dengan branch per pekerjaan, pull request untuk perubahan, dan peninjauan oleh minimal satu anggota lain sebelum digabung. Sepakati antarmuka komponen dan format data sejak awal agar integrasi cepat. Satu anggota ditunjuk sebagai penanggung jawab pengumpulan untuk mencegah kiriman ganda.

### Urutan pekerjaan dan dependensi antartugas

1. **Bersama:** sepakati struktur halaman, gaya visual, format `data/content.js`, serta daftar informasi yang perlu diverifikasi.
2. **Anggota 2:** siapkan proyek Next.js, layout, navigasi jangkar, dan komponen dasar; bagikan kontrak komponen agar pekerjaan lain dapat berjalan.
3. **Anggota 1 dan 3, paralel:** Anggota 1 menyiapkan konten/aset terverifikasi dan desain; Anggota 3 membangun bagian AIK dengan kontrak komponen yang sama. Bagian Kemahasiswaan dikerjakan Anggota 2.
4. **Bersama:** integrasikan konten final, periksa keseimbangan Kemahasiswaan–AIK, uji di ponsel dan desktop, lalu selesaikan dokumentasi PDF.
5. **Penanggung jawab pengumpulan:** cek akses publik repositori, PDF, dan situs jika ada; kirim **satu** karya setelah seluruh anggota menyetujui versi final.

## Kriteria selesai

- [ ] Kemahasiswaan dan AIK tampil dalam **satu halaman** dan seluruh cakupan tema ada.
- [ ] Halaman berfungsi pada ponsel dan desktop; navigasi, tombol, dan tautan diperiksa.
- [ ] Konten faktual dan aset memiliki sumber atau izin penggunaan yang jelas.
- [ ] Pemeriksaan aksesibilitas dasar selesai: judul, kontras, alt text, papan ketik, dan fokus.
- [ ] Proyek dapat dijalankan ulang dari repositori melalui petunjuk `README.md`.
- [ ] Build produksi berhasil dan halaman tayang diuji jika situs dipublikasikan.
- [ ] Dokumentasi PDF singkat tersedia, **maksimal 5 halaman**.
- [ ] Repositori publik dan semua berkas/tautan bisa dibuka tanpa permintaan izin.

## Dokumentasi PDF (maksimal 5 halaman)

1. Identitas karya dan anggota tim.
2. Masalah, tujuan, dan konsep penggabungan Kemahasiswaan–AIK.
3. Cuplikan tampilan ponsel dan desktop beserta penjelasan fitur.
4. Teknologi, struktur singkat, dan cara menjalankan proyek.
5. Hasil pengujian, tautan repositori, dan tautan situs jika ada.

## Jadwal dan pengumpulan

| Tahap | Waktu |
| --- | --- |
| Penerimaan karya | Sampai dengan **30 September 2026** |
| Penilaian | **1–15 Oktober 2026** |
| Pengumuman | **22 Oktober 2026** melalui Instagram **@sibermu** |

Siapkan sebelum mengisi formulir:

1. Tautan kode sumber pada repositori publik GitHub, GitLab, atau Google Drive yang dapat dibuka tanpa permintaan izin.
2. Dokumentasi singkat dalam PDF, paling banyak 5 halaman.
3. Tautan situs yang sudah tayang, apabila ada.

**Tautan pengumpulan yang diberikan:** [Formulir Lomba Landing Page SiberMu 2026](https://docs.google.com/forms/d/e/1FAIpQLSeRC3akRpQCPi6ojjzyz36qhgY4YP6SK2TOBGwo1YEnUnM7FQ/formResponse)

**Tautan informasi lomba yang diberikan:** [Unggahan Instagram SiberMu](https://www.instagram.com/p/DdD49_hgYyb/?img_index=1)

Tautan formulir di atas memakai akhiran `formResponse`. Buka dan pastikan halaman pengisian tampil sebelum tenggat; jika tidak, cari tautan `viewform` resmi dari penyelenggara. Kedua tautan tidak dapat diverifikasi langsung saat brief ini disusun.

Pastikan semua tautan dan berkas tetap dapat diakses **sekurang-kurangnya sampai 22 Oktober 2026**. Setiap peserta atau kelompok hanya boleh mengirim **satu karya**; satu orang tidak boleh terdaftar di lebih dari satu kelompok.
