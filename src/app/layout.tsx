import 'regenerator-runtime';

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '褒めて！！',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
