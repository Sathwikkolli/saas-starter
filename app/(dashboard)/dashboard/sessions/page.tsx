'use client';

import { useState, useEffect } from 'react';
import { Info, RefreshCw, Clock, ChevronDown, Filter, Search } from 'lucide-react';

function Skel({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-[var(--dash-skeleton)] ${className}`} />;
}

function SessionsSkeleton() {
  return (
    <div className="flex flex-col min-h-full bg-[var(--dash-bg)] text-[var(--dash-text)]">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-[var(--dash-border)]">
        <div className="space-y-2">
          <Skel className="h-3 w-24" />
          <Skel className="h-7 w-28" />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Skel className="h-6 w-36" />
          <Skel className="h-6 w-28" />
          <Skel className="h-6 w-6 rounded-full" />
          <Skel className="h-6 w-24" />
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="rounded border border-[var(--dash-border)] bg-[var(--dash-card)] p-4" style={{ minHeight: 160 }}>
              <Skel className="h-3 w-36 mb-6" />
              <div className="flex justify-center mt-8">
                <Skel className="h-10 w-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded border border-[var(--dash-border)] bg-[var(--dash-card)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--dash-border)]">
            <Skel className="h-5 w-20" />
            <div className="flex gap-2">
              <Skel className="h-7 w-16" />
              <Skel className="h-7 w-7" />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-4 px-4 py-2 border-b border-[var(--dash-border)]">
            {[...Array(8)].map((_, i) => (
              <Skel key={i} className="h-3 w-full" />
            ))}
          </div>
          <div className="flex justify-center py-12">
            <Skel className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

const tableColumns = [
  { key: 'session_id', label: 'Session ID' },
  { key: 'room_name', label: 'Room Name' },
  { key: 'started_at', label: 'Started At', sortable: true },
  { key: 'ended_at', label: 'Ended At' },
  { key: 'duration', label: 'Duration' },
  { key: 'participants', label: 'Participants' },
  { key: 'features', label: 'Features' },
  { key: 'status', label: 'Status' },
];

export default function SessionsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 750);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SessionsSkeleton />;

  return (
    <div className="flex flex-col min-h-full bg-[var(--dash-bg)] text-[var(--dash-text)]">
      {/* Header */}
      <header className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-[var(--dash-border)]">
        <div>
          <p className="text-xs text-[var(--dash-text-4)]">
            Demo1 / <span className="text-[var(--dash-text-2)]">Sessions</span>
          </p>
          <h1 className="text-2xl font-semibold text-[var(--dash-text)] mt-0.5">Sessions</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--dash-text-4)] mt-1">
          <span className="flex items-center gap-1.5">
            <RefreshCw className="h-3 w-3" />
            Last updated 10 min ago
          </span>
          <button className="flex items-center gap-1.5 rounded border border-[var(--dash-border)] px-2.5 py-1 hover:border-[var(--dash-border-3)] transition-colors">
            Auto-refresh off
            <ChevronDown className="h-3 w-3" />
          </button>
          <Clock className="h-3.5 w-3.5" />
          <button className="flex items-center gap-1.5 rounded border border-[var(--dash-border)] px-2.5 py-1 hover:border-[var(--dash-border-3)] transition-colors">
            Past 24 hours
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-4 p-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Unique Participants' },
            { title: 'Total Rooms' },
          ].map((card) => (
            <article
              key={card.title}
              className="flex flex-col rounded border border-[var(--dash-border)] bg-[var(--dash-card)] p-4"
              style={{ minHeight: 160 }}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--dash-text-4)]">
                <span>{card.title}</span>
                <Info className="h-3 w-3 text-[var(--dash-text-6)]" />
              </div>
              <div className="flex flex-1 items-center justify-center">
                <span className="text-5xl font-light text-[#00b4d8]">0</span>
              </div>
            </article>
          ))}
        </div>

        {/* Sessions table */}
        <div className="rounded border border-[var(--dash-border)] bg-[var(--dash-card)] overflow-hidden">
          {/* Table header bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--dash-border)]">
            <span className="text-sm font-semibold text-[var(--dash-text)]">Sessions</span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded border border-[var(--dash-border)] px-3 py-1.5 text-xs text-[var(--dash-text-3)] hover:border-[var(--dash-border-3)] hover:text-[var(--dash-text)] transition-colors">
                <Filter className="h-3.5 w-3.5" />
                Filters
              </button>
              <button className="rounded border border-[var(--dash-border)] p-1.5 text-[var(--dash-text-3)] hover:border-[var(--dash-border-3)] hover:text-[var(--dash-text)] transition-colors">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid border-b border-[var(--dash-border)] px-4 py-2"
            style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr' }}
          >
            {tableColumns.map((col) => (
              <div
                key={col.key}
                className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--dash-text-5)]"
              >
                {col.label}
                {col.sortable && (
                  <ChevronDown className="h-3 w-3 text-[var(--dash-text-6)]" />
                )}
              </div>
            ))}
          </div>

          {/* Empty state */}
          <div className="flex items-center justify-center py-12">
            <span className="rounded border border-[var(--dash-border)] bg-[var(--dash-hover)] px-4 py-1.5 text-xs text-[var(--dash-text-4)]">
              No results.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
