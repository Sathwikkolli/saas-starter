'use client';

import { Navbar } from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen bg-[#070707]">
      <Navbar />
      <div className="flex-1">{children}</div>
    </section>
  );
}
