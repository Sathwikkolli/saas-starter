'use client';

import { useState, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  KeyRound,
  Bot,
  Radio,
  Phone,
  Info,
  RefreshCw,
  Clock,
  ExternalLink,
} from 'lucide-react';

const getStartedCards = [
  {
    title: 'Project API keys',
    description: 'Create and manage access keys to integrate LiveKit into your app',
    icon: KeyRound,
    externalLink: false,
  },
  {
    title: 'AI Agents',
    description: 'Build and deploy multimodal and voice AI agents',
    icon: Bot,
    externalLink: false,
  },
  {
    title: 'Voice AI quickstart',
    description: 'Build your first voice AI agent in under 10 minutes',
    icon: Radio,
    externalLink: true,
  },
  {
    title: 'Telephony integration',
    description: 'Let your voice AI agent make and receive phone calls',
    icon: Phone,
    externalLink: true,
  },
];

const statCards = [
  { title: 'Connection Success' },
  { title: 'Platforms' },
  { title: 'Connection Type' },
  { title: 'Top Countries' },
];

const expandableSections = [
  'Participants',
  'Agents',
  'Telephony',
  'Data transfer',
  'Rooms',
  'Egress',
  'Ingress',
];

/* Reusable skeleton pulse block */
function Skel({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-[var(--dash-skeleton)] ${className}`} />;
}

function PageSkeleton() {
  return (
    <div className="flex flex-col min-h-full bg-[var(--dash-bg)] text-[var(--dash-text)]">
      {/* Header skeleton */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-[var(--dash-border)]">
        <div className="space-y-2">
          <Skel className="h-3 w-28" />
          <Skel className="h-7 w-36" />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Skel className="h-6 w-36" />
          <Skel className="h-6 w-28" />
          <Skel className="h-6 w-6 rounded-full" />
          <Skel className="h-6 w-24" />
        </div>
      </div>

      <div className="flex flex-col gap-5 p-6">
        {/* Get started skeleton */}
        <div>
          <Skel className="h-3 w-20 mb-3" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded border border-[var(--dash-border)] bg-[var(--dash-card)] px-4 py-4 flex items-start gap-3">
                <Skel className="h-8 w-8 shrink-0 rounded" />
                <div className="flex-1 space-y-2 pt-0.5">
                  <Skel className="h-3.5 w-3/4" />
                  <Skel className="h-3 w-full" />
                  <Skel className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded border border-[var(--dash-border)] bg-[var(--dash-card)] p-4" style={{ minHeight: 155 }}>
              <Skel className="h-3 w-32 mb-4" />
              <Skel className="h-3 w-48 mt-auto" />
            </div>
          ))}
        </div>

        {/* Expandable sections skeleton */}
        <div className="rounded border border-[var(--dash-border)] overflow-hidden">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={i < 6 ? 'border-b border-[var(--dash-border)]' : ''}>
              <div className="flex items-center gap-2 px-4 py-3">
                <Skel className="h-4 w-4 rounded" />
                <Skel className="h-3.5 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 750);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  if (isLoading) return <PageSkeleton />;

  return (
    <div className="flex flex-col min-h-full bg-[var(--dash-bg)] text-[var(--dash-text)]">
      {/* Top header */}
      <header className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-[var(--dash-border)]">
        <div>
          <p className="text-xs text-[var(--dash-text-4)]">
            Demo1 / <span className="text-[var(--dash-text-2)]">Overview</span>
          </p>
          <h1 className="text-2xl font-semibold text-[var(--dash-text)] mt-0.5">Overview</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--dash-text-4)] mt-1">
          <span className="flex items-center gap-1.5">
            <RefreshCw className="h-3 w-3" />
            Last updated 5 min ago
          </span>
          <button className="flex items-center gap-1.5 rounded border border-[var(--dash-border)] px-2.5 py-1 hover:border-[var(--dash-border-3)] transition-colors">
            Auto-refresh off
            <ChevronDown className="h-3 w-3" />
          </button>
          <Clock className="h-3.5 w-3.5" />
          <button className="flex items-center gap-1.5 rounded border border-[var(--dash-border)] px-2.5 py-1 hover:border-[var(--dash-border-3)] transition-colors">
            Past 7 days
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-5 p-6">
        {/* Get started */}
        {!dismissed && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--dash-text-4)]">
                Get started
              </p>
              <button
                onClick={() => setDismissed(true)}
                className="text-xs text-[var(--dash-text-4)] hover:text-[var(--dash-text)] transition-colors"
              >
                Dismiss
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {getStartedCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="flex items-start gap-3 rounded border border-[var(--dash-border)] bg-[var(--dash-card)] px-4 py-4 cursor-pointer hover:border-[var(--dash-border-2)] transition-colors"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[var(--dash-border)] bg-[var(--dash-hover)]">
                      <Icon className="h-4 w-4 text-[var(--dash-text-3)]" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="flex items-center gap-1 text-sm font-medium text-[var(--dash-text)] leading-snug">
                        {card.title}
                        {card.externalLink && (
                          <ExternalLink className="h-3 w-3 text-[var(--dash-text-4)] shrink-0" />
                        )}
                      </p>
                      <p className="text-xs text-[var(--dash-text-4)] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Stat cards */}
        <section className="grid grid-cols-4 gap-3">
          {statCards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded border border-[var(--dash-border)] bg-[var(--dash-card)] p-4"
              style={{ minHeight: 155 }}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--dash-text-4)]">
                <span>{card.title}</span>
                <Info className="h-3 w-3 text-[var(--dash-text-6)]" />
              </div>
              <div className="flex flex-1 items-center justify-center">
                <p className="text-xs text-[var(--dash-text-6)]">No data for the selected time range.</p>
              </div>
            </article>
          ))}
        </section>

        {/* Expandable sections */}
        <section className="rounded border border-[var(--dash-border)] overflow-hidden">
          {expandableSections.map((label, idx) => {
            const isOpen = openSections.has(label);
            const isLast = idx === expandableSections.length - 1;
            return (
              <div key={label} className={!isLast ? 'border-b border-[var(--dash-border)]' : ''}>
                <button
                  onClick={() => toggleSection(label)}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-[var(--dash-text-2)] transition-colors hover:bg-[var(--dash-card)]"
                >
                  <ChevronRight
                    className={`h-4 w-4 text-[var(--dash-text-5)] transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  />
                  <span>{label}</span>
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--dash-border)] px-6 py-6 text-xs text-[var(--dash-text-5)]">
                    No data available
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
