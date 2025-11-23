import type { Metadata } from 'next';
import { Providers } from '@/lib/providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Spectral Orderbook - Token Discovery',
  description: 'Discover emerging tokens with precision and insight',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}