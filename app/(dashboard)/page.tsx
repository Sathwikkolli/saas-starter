import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// LiveKit.io design tokens from inspected HTML/CSS:
// Background: #070707 (theme-color) | Accent: #1FD5F9 (rgb(31, 213, 249)) | Headline glow: rgb(3, 92, 109)
// Button: bg #1FD5F9, text black (text-bg1), drop-shadow(rgba(31, 213, 249, 0.25) 0px 0px 8px)
// Headline: font-light, cyan words with filter: drop-shadow(rgb(3, 92, 109) 0px 0px 8px)

const ACCENT = '#1FD5F9';
const ACCENT_GLOW = 'rgb(3, 92, 109)';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070707]">
      <section className="relative overflow-hidden py-8">
        <div className="min-h-[320px]">
          <div className="flex flex-col items-center justify-center gap-8 pt-24 lg:pb-0">
            {/* Central visual: 11x11 grid (matches livekit.io grid-template-columns: repeat(11, 1fr)) */}
            <div className="relative z-50 mx-auto grid min-h-[220px] w-full max-w-md place-items-center gap-8">
              <div className="bg-[#070707] relative rounded-lg p-0 w-full max-w-md aspect-square flex items-center justify-center p-4">
                <div
                  className="grid gap-[9px] w-full max-w-[280px] aspect-square"
                  style={{ gridTemplateColumns: 'repeat(11, 1fr)' }}
                >
                  {Array.from({ length: 121 }).map((_, i) => {
                    const highlighted = [50, 60, 61, 71, 72, 100].includes(i);
                    return (
                      <div
                        key={i}
                        className="rounded-none size-[3px]"
                        style={{
                          backgroundColor: highlighted ? ACCENT : '#27272a',
                          boxShadow: highlighted
                            ? '0 0 6.8px 2px rgba(31, 213, 249, 0.2)'
                            : undefined
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="px-6">
              <div className="mx-auto w-full max-w-7xl flex items-center justify-center">
                <div className="space-y-8 w-full max-w-4xl text-center">
                  {/* Headline: font-light, Build + cyan "voice," "video," "physical" "AI" with drop-shadow */}
                  <div className="space-y-2">
                    <h1 className="z-20 tracking-tight text-pretty text-4xl font-light text-white lg:text-5xl">
                      Build{' '}
                      <span
                        style={{
                          color: ACCENT,
                          filter: `drop-shadow(${ACCENT_GLOW} 0px 0px 8px)`
                        }}
                      >
                        voice,{' '}
                      </span>
                      <span
                        style={{
                          color: ACCENT,
                          filter: `drop-shadow(${ACCENT_GLOW} 0px 0px 8px)`
                        }}
                      >
                        video,{' '}
                      </span>
                      and{' '}
                      <span
                        style={{
                          color: ACCENT,
                          filter: `drop-shadow(${ACCENT_GLOW} 0px 0px 8px)`
                        }}
                      >
                        physical{' '}
                      </span>
                      <span
                        style={{
                          color: ACCENT,
                          filter: `drop-shadow(${ACCENT_GLOW} 0px 0px 8px)`
                        }}
                      >
                        AI{' '}
                      </span>
                      agents
                    </h1>
                  </div>
                  <p className="font-normal text-[#a1a1aa] pt-2 text-center text-base text-pretty lg:text-xl max-w-2xl mx-auto">
                    An open source framework and developer platform for
                    building, testing, deploying, scaling, and observing agents
                    in production.
                  </p>

                  {/* CTAs: Primary #1FD5F9 + black text + drop-shadow, Secondary outlined */}
                  <div className="w-full space-y-4">
                    <div className="mx-auto grid max-w-md grid-cols-1 gap-4 md:grid-cols-2">
                      <Link
                        href="/sign-in"
                        className="flex items-center justify-center gap-2 overflow-hidden rounded-md px-4 py-2 border basis-1/2"
                        style={{
                          borderColor: 'rgba(31, 213, 249, 0)',
                          backgroundColor: ACCENT,
                          filter: 'drop-shadow(rgba(31, 213, 249, 0.25) 0px 0px 8px)'
                        }}
                      >
                        <ChevronRight className="h-4 w-4 rotate-[-90deg] text-black" />
                        <span className="text-sm font-semibold text-black">
                          Start building
                        </span>
                      </Link>
                      <Button
                        asChild
                        variant="outline"
                        className="basis-1/2 rounded-lg border border-[#27272a] bg-[#070707] text-[#a1a1aa] hover:border-white hover:text-white text-sm font-semibold"
                      >
                        <Link href="/sign-in">Talk to LiveKit Agent</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
