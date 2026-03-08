'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Clock,
  Bot,
  Phone,
  ArrowUpFromLine,
  ArrowDownToLine,
  CreditCard,
  Search,
  LifeBuoy,
  ChevronRight,
  ChevronDown,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
  Monitor,
  Check,
} from 'lucide-react';
import useSWR from 'swr';
import { User } from '@/lib/db/schema';
import { signOut } from '@/app/(login)/actions';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/sessions', icon: Clock, label: 'Sessions' },
  { href: '/dashboard/agents', icon: Bot, label: 'Agents' },
  { href: '/dashboard/telephony', icon: Phone, label: 'Telephony' },
  { href: '/dashboard/egresses', icon: ArrowUpFromLine, label: 'Egresses' },
  { href: '/dashboard/ingresses', icon: ArrowDownToLine, label: 'Ingresses' },
  { href: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
];

function LiveKitMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" fill="#00b4d8" />
      <rect x="2" y="9" width="5" height="9" fill="#00b4d8" />
      <rect x="9" y="2" width="9" height="5" fill="#00b4d8" opacity="0.5" />
      <rect x="13" y="9" width="5" height="5" fill="#00b4d8" opacity="0.5" />
    </svg>
  );
}

export type Theme = 'light' | 'dark' | 'system';

/** Resolves 'system' to the actual OS preference */
function resolveTheme(t: Theme): 'light' | 'dark' {
  if (t === 'system') {
    if (typeof window === 'undefined') {
      return 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return t;
}

function applyTheme(t: Theme) {
  const effective = resolveTheme(t);
  const html = document.documentElement;
  if (effective === 'light') {
    html.setAttribute('data-theme', 'light');
    html.classList.remove('dark');
  } else {
    html.removeAttribute('data-theme');
    html.classList.add('dark');
  }
  localStorage.setItem('dash-theme', t);
}

const darkVars: Record<string, string> = {
  '--dash-bg': '#070707',
  '--dash-sidebar': '#0a0a0a',
  '--dash-card': '#0d0d0d',
  '--dash-modal': '#111111',
  '--dash-hover': '#111111',
  '--dash-item-bg': '#0c0c0c',
  '--dash-border': '#1a1a1a',
  '--dash-border-2': '#2a2a2a',
  '--dash-border-3': '#3a3a3a',
  '--dash-text': '#ffffff',
  '--dash-text-2': '#d4d4d8',
  '--dash-text-3': '#a1a1aa',
  '--dash-text-4': '#71717a',
  '--dash-text-5': '#52525b',
  '--dash-text-6': '#3f3f46',
  '--dash-skeleton': '#1a1a1a',
};

const lightVars: Record<string, string> = {
  '--dash-bg': '#f9fafb',
  '--dash-sidebar': '#ffffff',
  '--dash-card': '#f4f4f5',
  '--dash-modal': '#ffffff',
  '--dash-hover': '#e9eaeb',
  '--dash-item-bg': '#f1f5f9',
  '--dash-border': '#e4e4e7',
  '--dash-border-2': '#d1d5db',
  '--dash-border-3': '#9ca3af',
  '--dash-text': '#111827',
  '--dash-text-2': '#1f2937',
  '--dash-text-3': '#374151',
  '--dash-text-4': '#6b7280',
  '--dash-text-5': '#9ca3af',
  '--dash-text-6': '#d1d5db',
  '--dash-skeleton': '#e4e4e7',
};

function UserSettingsModal({
  user,
  initial,
  theme,
  onThemeChange,
  onSignOut,
  onClose,
}: {
  user: User | undefined;
  initial: string;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  onSignOut: () => void;
  onClose: () => void;
}) {
  const [cookieConsent, setCookieConsent] = useState(true);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-[420px] rounded-lg border border-[var(--dash-border-2)] bg-[var(--dash-modal)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title row */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-[var(--dash-text)]">User settings</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-[var(--dash-text-4)] hover:text-[var(--dash-text)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-t border-[var(--dash-border)] pt-4 space-y-5">
          {/* User row */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#0d9488] text-base font-semibold text-white">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block rounded bg-[#1a3a3a] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#00b4d8] mb-1">
                Admin
              </span>
              <p className="text-sm text-[var(--dash-text)] truncate">{user?.email ?? ''}</p>
            </div>
            <button
              onClick={onSignOut}
              className="rounded border border-[var(--dash-border-2)] px-3 py-1.5 text-xs text-[var(--dash-text-2)] hover:border-[var(--dash-border-3)] hover:text-[var(--dash-text)] transition-colors"
            >
              Sign out
            </button>
          </div>

          <div className="border-t border-[var(--dash-border)]" />

          {/* Cookie consent */}
          <div className="flex items-start gap-3">
            <button
              onClick={() => setCookieConsent((v) => !v)}
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                cookieConsent
                  ? 'border-[#00b4d8] bg-[#00b4d8]/20'
                  : 'border-[var(--dash-border-3)] bg-transparent'
              }`}
            >
              {cookieConsent && <Check className="h-3 w-3 text-[#00b4d8]" />}
            </button>
            <p className="text-xs text-[var(--dash-text-3)] leading-relaxed">
              Help LiveKit improve our products and services by enabling cookies.
              You can learn more about how we collect and store your information
              in our{' '}
              <span className="underline cursor-pointer text-[var(--dash-text-3)] hover:text-[var(--dash-text)]">
                cookie policy
              </span>{' '}
              and{' '}
              <span className="underline cursor-pointer text-[var(--dash-text-3)] hover:text-[var(--dash-text)]">
                privacy policy
              </span>
              .
            </p>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--dash-text)]">Theme</span>
            <div className="flex items-center rounded border border-[var(--dash-border-2)] overflow-hidden">
              {(
                [
                  { key: 'light' as Theme, Icon: Sun, label: 'Light' },
                  { key: 'dark' as Theme, Icon: Moon, label: 'Dark' },
                  { key: 'system' as Theme, Icon: Monitor, label: 'System' },
                ]
              ).map(({ key, Icon, label }) => (
                <button
                  key={key}
                  title={label}
                  onClick={() => onThemeChange(key)}
                  className={`flex items-center justify-center px-3 py-1.5 transition-colors ${
                    theme === key
                      ? 'bg-[var(--dash-skeleton)] text-[var(--dash-text)]'
                      : 'text-[var(--dash-text-4)] hover:text-[var(--dash-text)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-[#00b4d8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0096b4] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const initial = (user?.name || user?.email || 'U')[0].toUpperCase();
  const [showBanner, setShowBanner] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  /* Restore persisted theme on mount */
  useEffect(() => {
    const saved = (localStorage.getItem('dash-theme') as Theme | null) ?? 'dark';
    setTheme(saved);
    /* Watch for OS preference changes when theme === 'system' */
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if ((localStorage.getItem('dash-theme') as Theme) === 'system') {
        applyTheme('system');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserSettings(false);
    router.replace('/');
    router.refresh();
  };

  const themeVars: Record<string, string> =
    resolveTheme(theme) === 'light' ? lightVars : darkVars;

  return (
    <div
      className="dash-wrap flex min-h-screen w-full bg-[var(--dash-bg)]"
      style={themeVars as React.CSSProperties}
    >
      {/* User Settings Modal */}
      {showUserSettings && (
        <UserSettingsModal
          user={user}
          initial={initial}
          theme={theme}
          onThemeChange={handleThemeChange}
          onSignOut={handleSignOut}
          onClose={() => setShowUserSettings(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`flex shrink-0 flex-col border-r border-[var(--dash-border)] bg-[var(--dash-sidebar)] transition-all duration-300 ${
          collapsed ? 'w-[56px]' : 'w-[220px]'
        }`}
      >
        {/* LiveKit header */}
        <div className="flex items-center justify-between border-b border-[var(--dash-border)] px-3 py-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <LiveKitMark />
            {!collapsed && (
              <span className="whitespace-nowrap text-sm font-semibold text-[var(--dash-text)] tracking-wide">
                LiveKit
              </span>
            )}
          </div>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="shrink-0 rounded p-1 text-[var(--dash-text-5)] hover:bg-[var(--dash-hover)] hover:text-[var(--dash-text)] transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-1 flex-col gap-0.5 p-2 pt-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-md py-2 text-sm transition-colors ${
                  collapsed ? 'justify-center px-2' : 'px-3'
                } ${
                  isActive
                    ? 'border-l-2 border-[#00b4d8] text-[#00b4d8] bg-[#00b4d8]/5'
                    : 'border-l-2 border-transparent text-[var(--dash-text-3)] hover:bg-[var(--dash-hover)] hover:text-[var(--dash-text)]'
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-[var(--dash-border)] p-2 space-y-1">
          {/* Search */}
          <button
            title={collapsed ? 'Search' : undefined}
            className={`flex w-full items-center rounded px-2 py-2 text-sm text-[var(--dash-text-3)] transition hover:bg-[var(--dash-hover)] hover:text-[var(--dash-text)] ${
              collapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <span className={`flex items-center ${collapsed ? '' : 'gap-2.5'}`}>
              <Search className="h-4 w-4 shrink-0" />
              {!collapsed && 'Search'}
            </span>
            {!collapsed && (
              <span className="rounded border border-[var(--dash-border-2)] px-1.5 py-0.5 text-[10px] text-[var(--dash-text-4)]">
                CTRL+K
              </span>
            )}
          </button>

          {/* Support */}
          <button
            title={collapsed ? 'Support' : undefined}
            className={`flex w-full items-center rounded px-2 py-2 text-sm text-[var(--dash-text-3)] transition hover:bg-[var(--dash-hover)] hover:text-[var(--dash-text)] ${
              collapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <span className={`flex items-center ${collapsed ? '' : 'gap-2.5'}`}>
              <LifeBuoy className="h-4 w-4 shrink-0" />
              {!collapsed && 'Support'}
            </span>
            {!collapsed && <ChevronRight className="h-3.5 w-3.5 text-[var(--dash-text-5)]" />}
          </button>

          {/* Introducing Agents UI banner */}
          {!collapsed && showBanner && (
            <div className="relative mt-1 overflow-hidden rounded border border-[var(--dash-border)] bg-[var(--dash-item-bg)]">
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-2 top-2 z-10 text-[var(--dash-text-4)] hover:text-[var(--dash-text)] transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex">
                <div className="flex-1 px-3 py-3 pr-1">
                  <p className="text-xs font-semibold text-[var(--dash-text)] leading-snug">
                    Introducing Agents UI
                  </p>
                  <p className="mt-1 text-[11px] text-[#00b4d8] cursor-pointer hover:underline">
                    Learn more
                  </p>
                </div>
                <div
                  className="w-16 shrink-0"
                  style={{
                    background:
                      'radial-gradient(ellipse at 80% 50%, #0ea5e9 0%, #0284c7 30%, #0c4a6e 60%, #0a0a0a 100%)',
                  }}
                />
              </div>
            </div>
          )}

          {/* Demo1 project selector + user avatar */}
          {!collapsed ? (
            <div className="flex items-center gap-1.5 pt-1">
              <button className="flex flex-1 items-center justify-between rounded border border-[var(--dash-border)] px-3 py-2 text-sm text-[var(--dash-text-2)] hover:border-[var(--dash-border-3)] transition-colors">
                <span className="truncate">Demo1</span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--dash-text-4)]" />
              </button>
              <button
                onClick={() => setShowUserSettings(true)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#0d9488] text-sm font-semibold text-white hover:bg-[#0f766e] transition-colors"
              >
                {initial}
              </button>
            </div>
          ) : (
            <div className="flex justify-center pt-1">
              <button
                onClick={() => setShowUserSettings(true)}
                className="flex h-8 w-8 items-center justify-center rounded bg-[#0d9488] text-sm font-semibold text-white hover:bg-[#0f766e] transition-colors"
              >
                {initial}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-y-auto bg-[var(--dash-bg)]">
        {children}
      </main>
    </div>
  );
}
