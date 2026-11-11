'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RotateCcw, Home, AlertCircle, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/config';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex items-center justify-center p-4">
      <div className="bg-white border border-[#E8E5DF] rounded-3xl p-8 sm:p-12 shadow-sm max-w-xl w-full text-center space-y-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto drop-shadow-sm">
          <Image
            src="/assets/branding/signature-aura-logo-official.png?v=20261105"
            alt="Signature Aura Developers"
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#B99A63] uppercase">
            Signature Aura™ System Notice
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#171717]">
            An Unexpected Glitch Occurred
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            We apologize for the momentary inconvenience. Our advisory desk and systems are operating smoothly. You may reload the view or contact our private concierge desk.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload View</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF9F5] hover:bg-[#E8E5DF] text-[#171717] border border-[#E8E5DF] text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[#E8E5DF] text-xs text-stone-500">
          Concierge Hotline: <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="text-[#171717] font-medium hover:underline">{BUSINESS_CONFIG.phoneNumber}</a>
        </div>
      </div>
    </div>
  );
}
