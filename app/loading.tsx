import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-4">
      <div className="text-center flex flex-col items-center space-y-4">
        {/* Glowing circular logo container */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 animate-pulse drop-shadow-xl">
          <Image
            src="/assets/branding/signature-aura-logo-official.png?v=20261105"
            alt="Signature Aura Developers"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Text Logo */}
        <div className="relative h-12 sm:h-14 w-52 sm:w-60">
          <Image
            src="/assets/branding/logo-text-dark.png"
            alt="Signature Aura Developers"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-ping" />
          <span className="text-[10px] tracking-widest text-stone-500 uppercase font-mono">
            Loading Luxury Experience...
          </span>
        </div>
      </div>
    </div>
  );
}
