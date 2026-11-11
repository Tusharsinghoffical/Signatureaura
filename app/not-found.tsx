import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, Building2, PhoneCall, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <div className="bg-white border border-[#E8E5DF] rounded-3xl p-8 sm:p-14 shadow-sm space-y-6 w-full max-w-2xl">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto drop-shadow-md">
            <Image
              src="/assets/branding/signature-aura-logo-official.png?v=20261105"
              alt="Signature Aura Developers"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold tracking-widest text-[#B99A63] uppercase">
              404 — Residence Not Found
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              Property or Page Unlisted
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-light">
              The requested address or development dossier is unavailable or may have undergone private acquisition.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto touch-manipulation inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow min-h-[44px]"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/properties"
              className="w-full sm:w-auto touch-manipulation inline-flex items-center justify-center gap-2 bg-[#FAF9F5] hover:bg-[#E8E5DF] text-[#171717] border border-[#E8E5DF] text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl transition-all min-h-[44px]"
            >
              <Search className="w-4 h-4 text-[#B99A63]" />
              <span>Browse Portfolio</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
