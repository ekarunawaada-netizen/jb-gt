import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: '#0284c7',
};

export const metadata: Metadata = {
  title: 'PojokDL - Jual Diamond Lock & Blue Gem Lock Growtopia Terpercaya',
  description:
    'Layanan top up Diamond Lock (DL) & Blue Gem Lock (BGL) Growtopia terpercaya di PojokDL. Proses kilat langsung ke World kamu.',
  keywords: [
    'Growtopia',
    'Diamond Lock',
    'BGL',
    'Beli DL',
    'Beli BGL',
    'PojokDL',
    'Pojok DL',
    'Top up Growtopia',
  ],
  authors: [{ name: 'PojokDL' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth overflow-x-hidden`}>
      <body className="bg-gradient-to-br from-sky-100 via-blue-50/70 to-cyan-100 min-h-screen w-full max-w-full relative overflow-x-hidden text-slate-900 font-sans flex flex-col antialiased selection:bg-sky-500 selection:text-white pb-20 lg:pb-0">
        {/* Ambient Glow Orbs for Depth (constrained so no horizontal overflow) */}
        <div className="pointer-events-none fixed -top-24 -left-20 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-sky-300 blur-3xl opacity-35 z-0" />
        <div className="pointer-events-none fixed top-1/3 -right-24 w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-cyan-300 blur-3xl opacity-35 z-0" />
        <div className="pointer-events-none fixed -bottom-28 left-1/3 w-80 sm:w-[36rem] h-80 sm:h-[36rem] rounded-full bg-blue-300 blur-3xl opacity-35 z-0" />

        {/* Content Wrapper */}
        <div className="relative z-10 flex-1 flex flex-col w-full max-w-full overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
