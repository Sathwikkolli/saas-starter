'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function Terminal() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const terminalSteps = [
    'git clone https://github.com/nextjs/saas-starter',
    'pnpm install',
    'pnpm db:setup',
    'pnpm db:migrate',
    'pnpm db:seed',
    'pnpm dev 🎉',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalStep((prev) =>
        prev < terminalSteps.length - 1 ? prev + 1 : prev
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [terminalStep]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalSteps.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-md overflow-hidden bg-[#0a0a0a] border border-[#1a1a1a] text-white font-mono text-sm relative">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#27272a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27272a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27272a]"></div>
          </div>
          <button
            onClick={copyToClipboard}
            className="text-[#a1a1aa] hover:text-white transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-5 w-5 text-[#1FD5F9]" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="space-y-2">
          {terminalSteps.map((step, index) => (
            <div
              key={index}
              className={`${index > terminalStep ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            >
              <span className="text-[#1FD5F9]">$</span>{' '}
              <span className="text-[#a1a1aa]">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
