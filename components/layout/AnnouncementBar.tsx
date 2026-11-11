'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, X, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/config';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#171717] text-[#FAF9F5] text-xs py-2 px-4 border-b border-[#2D2D2D] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Highlight message */}
        <div className="flex items-center gap-2 truncate">
          <span className="flex h-2 w-2 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B99A63] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B99A63]"></span>
          </span>
          <span className="text-[#C5A869] font-medium tracking-wide flex items-center gap-1.5 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#B99A63]" />
            Exclusive Viewings:
          </span>
          <span className="text-stone-300 truncate">
            {BUSINESS_CONFIG.announcementBarText}
          </span>
        </div>

        {/* Mobile Dismiss Button */}
        <button 
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="md:hidden text-stone-400 hover:text-white transition-colors p-1 flex-shrink-0 touch-target min-h-[32px] min-w-[32px]"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Right: Quick Concierge Contact & Dismiss */}
        <div className="hidden md:flex items-center gap-5 flex-shrink-0">
          <a 
            href={`tel:${BUSINESS_CONFIG.phoneRaw}`} 
            className="flex items-center gap-1.5 text-stone-300 hover:text-[#C5A869] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#B99A63]" />
            <span>VIP Desk: {BUSINESS_CONFIG.phoneNumber}</span>
          </a>
          <button 
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="text-stone-400 hover:text-white transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
