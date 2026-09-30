import './globals.css';
export const metadata = {
  title: 'Kemahasiswaan & AIK | EduPortal SiberMu',
  description: 'Portal informasi Kemahasiswaan dan Al-Islam dan Kemuhammadiyahan Universitas Siber Muhammadiyah. Organisasi, pengembangan diri, pembinaan nilai, dan layanan akademik.',
  icons: { icon: '/favicon.svg' },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }) {
  return <html lang="id"><body>{children}</body></html>;
}
