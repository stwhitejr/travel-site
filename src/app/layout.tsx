import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/query/QueryProvider';
import {SUPABASE_PROJECT_DOMAIN} from '@/components/gallery/util';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Freewheelin’ - The Journey',
  description: 'A Man, A Dog, A Van',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href={SUPABASE_PROJECT_DOMAIN} />
        <link rel="dns-prefetch" href={SUPABASE_PROJECT_DOMAIN} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
