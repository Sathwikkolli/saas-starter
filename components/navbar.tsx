'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
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

function UnauthenticatedActions() {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-white">
      <a
        href="https://github.com/livekit/agents"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center gap-1 rounded-full border border-[#27272a] bg-[#070707] px-4 py-2 text-[#a1a1aa] transition hover:border-white hover:text-white"
      >
        <Github className="h-4 w-4" />
        <span className="font-medium">livekit / agents</span>
        <span className="text-[#71717a]">9.6K</span>
      </a>
      <Link
        href="/pricing"
        className="rounded-full border border-[#27272a] px-4 py-2 text-sm text-[#a1a1aa] transition hover:border-white hover:text-white"
      >
        Contact sales
      </Link>
      <Link
        href="/sign-in"
        className="flex items-center gap-2 rounded-full bg-[#00e5ff] px-4 py-2 text-sm font-semibold text-[#070707] shadow-[0_0_20px_rgba(0,229,255,0.35)]"
      >
        Start building
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

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
    return <UnauthenticatedActions />;
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
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center text-white hover:opacity-90 transition-opacity font-semibold text-lg"
          >
            LiveKit
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            <button className="flex items-center gap-1 text-white transition-colors duration-200 ease-out hover:text-[#00e5ff]">
              Developers
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-1 text-white transition-colors duration-200 ease-out hover:text-[#00e5ff]">
              Company
              <ChevronDown className="h-4 w-4" />
            </button>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-white transition-colors duration-200 ease-out hover:text-[#00e5ff]"
            >
              Customers
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-white transition-colors duration-200 ease-out hover:text-[#00e5ff]"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <Suspense fallback={<div className="h-9 w-40 rounded-full bg-[#1a1a1a]" />}>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}
