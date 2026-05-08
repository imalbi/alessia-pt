import type { Metadata } from 'next';
import { Bricolage_Grotesque, Newsreader, Caveat } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Alessia · Personal Trainer & Chinesiologa',
    template: '%s · Alessia',
  },
  description: 'Personal training e chinesiologia. Postura, recupero, percorsi su misura.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      data-theme="caldo"
      className={`${bricolage.variable} ${newsreader.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
