import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Public_Sans } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';

export const metadata: Metadata = {
  title: 'Build voice, video, and physical AI | LiveKit',
  description:
    'An open source framework and developer platform for building, testing, deploying, scaling, and observing agents in production.'
};

export const viewport: Viewport = {
  maximumScale: 1,
  themeColor: '#070707'
};

const publicSans = Public_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${publicSans.className} antialiased scroll-smooth`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-[100dvh] bg-[#000000] text-white antialiased">
        <SWRConfig
          value={{
            fallback: {
              '/api/user': getUser(),
              '/api/team': getTeamForUser()
            }
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
