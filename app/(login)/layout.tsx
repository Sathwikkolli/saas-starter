'use client';

import { Navbar } from '@/components/navbar';

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16">{children}</div>
    </div>
  );
}
