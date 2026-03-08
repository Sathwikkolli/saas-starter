'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Key } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';

const oauthActions = [
  {
    label: 'Continue with Google',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
    textColor: 'text-[#00b4d8]'
  },
  {
    label: 'Continue with GitHub',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  },
  {
    label: 'Continue with SSO',
    icon: <Key size={20} />
  }
];

const mapDots = [
  { top: '32%', left: '14%', delay: '0s' },
  { top: '28%', left: '18%', delay: '-0.05s' },
  { top: '26%', left: '22%', delay: '-0.1s' },
  { top: '22%', left: '20%', delay: '-0.15s' },
  { top: '62%', left: '24%', delay: '-0.2s' },
  { top: '72%', left: '22%', delay: '-0.25s' },
  { top: '22%', left: '46%', delay: '-0.3s' },
  { top: '20%', left: '48%', delay: '-0.35s' },
  { top: '24%', left: '50%', delay: '-0.4s' },
  { top: '32%', left: '58%', delay: '-0.45s' },
  { top: '28%', left: '68%', delay: '-0.5s' },
  { top: '25%', left: '72%', delay: '-0.55s' },
  { top: '30%', left: '70%', delay: '-0.6s' },
  { top: '62%', left: '78%', delay: '-0.65s' }
];

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );
  const [emailInput, setEmailInput] = useState(state.email ?? '');
  const emailIsValid = /\S+@\S+\.\S+/.test(emailInput);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <section className="flex w-[420px] shrink-0 flex-col gap-8 border-r border-[var(--border)] bg-[#000] px-6 py-10 text-left">
        <div className="space-y-3">
          <div className="flex justify-center">
            <img src="/logo.png" alt="LiveKit" style={{ width: 150, height: 'auto' }} />
          </div>
          <div className="h-px w-full bg-[var(--border)]" />
          <h1 className="text-[20px] font-semibold leading-[32px] tracking-normal text-[var(--foreground)]">
            Continue to LiveKit Cloud
          </h1>
          <p className="text-sm text-[var(--foreground-muted)]">Log in or register with the options below</p>
        </div>

        <div className="space-y-3">
          {oauthActions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="flex w-full items-center gap-3 rounded border border-[var(--border)] bg-transparent px-6 py-3 text-left text-[var(--foreground)] transition duration-[var(--transition-default)] hover:border-[var(--accent-cyan-bright)] hover:text-[var(--accent-cyan-bright)]"
            >
              <span className="text-[var(--accent-cyan-bright)]">{action.icon}</span>
              <span className={action.textColor ?? 'text-[var(--foreground)]'}>{action.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[12px] tracking-[0.2em] text-[var(--foreground-muted)]">
          <span className="flex-1 border-t border-[var(--border)]" />
          OR
          <span className="flex-1 border-t border-[var(--border)]" />
        </div>

        <p className="text-sm text-[var(--foreground-muted)]">Request a link to sign in or sign up</p>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirect" value={redirect || ''} />
          <input type="hidden" name="priceId" value={priceId || ''} />
          <input type="hidden" name="inviteId" value={inviteId || ''} />
          <div className="text-sm text-[var(--foreground-muted)]">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              placeholder="name@company.com"
              className="w-full rounded border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--accent-cyan-bright)] focus:outline-none"
            />
          </div>
          {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
          <button
            type="submit"
            disabled={pending || !emailIsValid}
            className="w-full rounded-full bg-[#00e5ff] px-4 py-3 text-sm font-semibold text-[#000] shadow-[0_0_12px_rgba(0,229,255,0.6)] transition duration-[var(--transition-default)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </>
            ) : (
              'Continue with email'
            )}
          </button>
        </form>

        <p className="mt-auto text-center text-xs text-[var(--foreground-muted)]">
          By signing up you agree to our terms of service and privacy policy.
        </p>
      </section>

      <section className="relative flex-1 bg-[var(--background)]">
        <img
          src="/world_map.svg"
          alt="World Map"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0">
          {mapDots.map((dot, index) => (
            <span
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: dot.top, left: dot.left }}
            >
              <span
                className="absolute inset-0 rounded-full blur-[12px]"
                style={{
                  animationDelay: dot.delay,
                  boxShadow: '0 0 10px 4px #00e5ff, 0 0 20px 8px rgba(0,229,255,0.3)'
                }}
                aria-hidden="true"
              />
              <span
                className="relative inline-flex h-[10px] w-[10px] rounded-full bg-[var(--accent-cyan)]"
                style={{
                  boxShadow: '0 0 10px 4px #00e5ff, 0 0 20px 8px rgba(0,229,255,0.3)'
                }}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
        <div className="absolute right-6 bottom-6 text-[12px] font-semibold tracking-[0.1em] text-[var(--foreground)]">
          REGIONS: <span className="text-[var(--accent-cyan-bright)]">24</span>
        </div>
      </section>
    </div>
  );
}
