import Link from 'next/link';

const backgroundDots = Array.from({ length: 60 }, (_, row) =>
  Array.from({ length: 90 }, (_, col) => ({ row, col }))
).flat();

const heroDots = Array.from({ length: 12 }, (_, row) =>
  Array.from({ length: 12 }, (_, col) => ({ row, col }))
).flat();

const activeHeroDots = new Set(['1-4', '2-4', '3-4', '4-4', '5-4']);

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0">
        {backgroundDots.map(({ row, col }) => (
          <span
            key={`${row}-${col}`}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#0f1418]"
            style={{
              left: `${14 + col * 0.8}%`,
              top: `${20 + row * 0.7}%`,
              opacity: row > 45 ? 0.08 : 0.22
            }}
          />
        ))}
      </div>

      <section className="relative z-10 mx-auto flex max-w-[980px] flex-col items-center px-6 pb-24 pt-20 text-center">
        <div className="mb-14 h-[188px] w-[188px] rounded-[12px] border border-[#1f2b31] bg-[#06090b]/80 p-[18px] shadow-[0_0_50px_rgba(0,0,0,0.45)]">
          <div className="relative grid h-full w-full grid-cols-12 gap-[8px]">
            {heroDots.map(({ row, col }) => {
              const key = `${row}-${col}`;
              const active = activeHeroDots.has(key);
              return (
                <span
                  key={key}
                  className={`h-[4px] w-[4px] rounded-none ${active ? 'bg-[#45d9ff]' : 'bg-[#1f2327]'}`}
                  style={active ? { boxShadow: '0 0 8px rgba(69,217,255,0.7)' } : undefined}
                />
              );
            })}
          </div>
        </div>

        <h1 className="max-w-[1120px] text-[60px] font-light leading-[1.12] tracking-[-0.03em] text-white">
          Build <span className="text-[#22d6ff]">voice, video,</span> and{' '}
          <span className="text-[#22d6ff]">physical AI</span> agents
        </h1>

        <p className="mt-6 max-w-[1020px] text-[20px] font-normal leading-[1.45] text-[#d0d0d5]">
          An open source framework and developer platform for building, testing, deploying, scaling,
          and observing agents in production.
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Link
            href="/sign-in"
            className="inline-flex h-[46px] min-w-[186px] items-center justify-center rounded-[10px] bg-[#26d7ff] px-7 text-[16px] font-semibold text-[#071017] shadow-[0_0_24px_rgba(38,215,255,0.35)]"
          >
            Start building
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex h-[46px] min-w-[186px] items-center justify-center gap-2 rounded-[10px] border border-[#1f2328] bg-[#060606] px-6 text-[16px] font-semibold text-[#d6d6dc]"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-[#1f2328] text-[10px]">
              T
            </span>
            Talk to LiveKit Agent
          </Link>
        </div>
      </section>
    </main>
  );
}
