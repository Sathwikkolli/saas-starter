'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Home, LogOut, Github, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  if (!user) {
    return (
      <>
        {/* GitHub block — gray text */}
        <a
          href="https://github.com/livekit/agents"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-white transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>livekit / agents</span>
          <span className="text-[#71717a]">9.6K</span>
        </a>
        <Link
          href="/pricing"
          className="inline-flex w-full items-center justify-center rounded-lg border border-[#27272a] bg-[#070707] px-4 py-2 text-center text-sm font-semibold text-[#a1a1aa] tracking-tight transition-all duration-500 hover:border-white hover:text-white"
        >
          Contact sales
        </Link>
        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-4 py-2 border text-sm font-semibold"
          style={{
            borderColor: 'rgba(31, 213, 249, 0)',
            backgroundColor: '#1FD5F9',
            filter: 'drop-shadow(rgba(31, 213, 249, 0.25) 0px 0px 8px)',
            color: '#070707'
          }}
        >
          <ChevronRight className="h-4 w-4 rotate-[-90deg]" />
          Start building
        </Link>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9 border border-[#1a1a1a]">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback className="bg-[#27272a] text-white">
            {user.email
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex flex-col gap-1 bg-[#070707] border-[#1a1a1a] text-white min-w-[10rem]"
      >
        <DropdownMenuItem className="cursor-pointer focus:bg-[#27272a] focus:text-white">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer focus:bg-[#27272a] focus:text-white">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 left-0 z-[100] w-full border-b border-[#1a1a1a] bg-[#070707]/70 py-1 backdrop-blur-lg transition-all duration-300 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-white hover:opacity-90 transition-opacity font-semibold text-lg"
        >
          LiveKit
        </Link>

        {/* Center nav: Developers, Company, Customers, Pricing */}
        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <button className="flex items-center gap-1 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:text-[#1FD5F9]">
            Developers
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
          <button className="flex items-center gap-1 text-sm font-semibold text-white transition-colors duration-200 ease-out hover:text-[#1FD5F9]">
            Company
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-white transition-colors duration-200 ease-out hover:text-[#1FD5F9]"
          >
            Customers
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-white transition-colors duration-200 ease-out hover:text-[#1FD5F9]"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
