import type { Metadata, Viewport } from 'next/types';
import type { TChildren } from '@/types';
import { Raleway, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

const jakarta: NextFontWithVariable = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const raleway: NextFontWithVariable = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const title = 'Picnic - Liburan Lebih Menyenangkan';
const description =
  'Picnic by Kappa merupakan platform untuk pembelian tiket wisata secara online dengan tampilan yang user friendly yang telah bekerja sama dengan Kemendikdasmen dan Kemenpar';
export const metadata: Metadata = {
  title,
  description,
  applicationName: 'Picnic',
  keywords: ['Picnic', 'Kappa', 'Platform Pembelian Tiket Wisata', 'Tiket Murah dan Mudah', 'User Friendly'],
  authors: [{ name: 'Kappa', url: 'https://kappa.id' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon-16x16.png', sizes: '16x16' }],
  },
  openGraph: {
    locale: 'id_ID',
    title,
    description,
    url: 'https://picnic.kappa.id/',
    siteName: 'Picnic',
    type: 'profile',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: TChildren): React.ReactNode {
  return (
    <html lang="en">
      <body className={`bg-grayscale-bg text-grayscale-text-lp ${jakarta.className} ${raleway.variable}`}>
        {children}
      </body>
    </html>
  );
}
