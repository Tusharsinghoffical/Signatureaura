import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppLink } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-[#121214] text-[#FAF9F5] border-t border-[#262629] relative overflow-hidden">
      {/* Subtle architectural gold accent line */}
      <div className="h-[2px] w-full bg-linear-to-r from-transparent via-[#B99A63]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 md:pb-12">
        {/* Main 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#242428]">
          
          {/* Brand & Corporate Overview (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 sm:gap-4 group focus:outline-hidden">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/assets/branding/signature-aura-logo-official.png?v=20261105"
                  alt="Signature Aura Developers"
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-xl sm:text-2xl md:text-[26px] tracking-[0.06em] text-[#FAF9F5] group-hover:text-[#E8D39E] transition-colors leading-tight font-normal">
                  SIGNATURE AURA
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#B99A63] font-medium mt-0.5">
                  Developers & Advisory
                </span>
              </div>
            </Link>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-md font-light">
              Signature Aura Developers is India’s premier luxury property consultancy. We advise private family offices, institutional investors, and discerning clients on the acquisition, bespoke leasing, and asset disposition of trophy sky residences, heritage estates, and Grade-A commercial landmarks.
            </p>

            {/* Direct Connect Badges */}
            <div className="pt-1 flex flex-wrap gap-2.5">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors text-xs font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>VIP WhatsApp Advisory</span>
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202024] border border-[#B99A63]/40 text-[#E8D39E] hover:bg-[#28282D] transition-colors text-xs font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#B99A63]" />
                <span>+91 88056 21111</span>
              </a>
            </div>
          </div>

          {/* Curated Portfolios (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase font-mono">
              Curated Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <Link href="/properties?category=luxury_penthouse" className="hover:text-[#E8D39E] transition-colors flex items-center justify-between group">
                  <span>Sky Penthouses</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B99A63]" />
                </Link>
              </li>
              <li>
                <Link href="/properties?listingType=buy" className="hover:text-[#E8D39E] transition-colors flex items-center justify-between group">
                  <span>Sea-Facing Duplexes</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B99A63]" />
                </Link>
              </li>
              <li>
                <Link href="/properties?category=villa" className="hover:text-[#E8D39E] transition-colors flex items-center justify-between group">
                  <span>Heritage Villas & Estates</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B99A63]" />
                </Link>
              </li>
              <li>
                <Link href="/properties?category=commercial" className="hover:text-[#E8D39E] transition-colors flex items-center justify-between group">
                  <span>Grade-A Commercials</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B99A63]" />
                </Link>
              </li>
              <li>
                <Link href="/properties?listingType=rent" className="hover:text-[#E8D39E] transition-colors flex items-center justify-between group">
                  <span>Luxury Leasing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B99A63]" />
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#E8D39E] transition-colors flex items-center justify-between group">
                  <span>Master-Planned Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B99A63]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Markets (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase font-mono">
              Prime Markets
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <Link href="/locations/mumbai" className="hover:text-[#E8D39E] transition-colors">
                  Mumbai (Worli & BKC)
                </Link>
              </li>
              <li>
                <Link href="/locations/delhi-ncr" className="hover:text-[#E8D39E] transition-colors">
                  Delhi NCR (Camellias)
                </Link>
              </li>
              <li>
                <Link href="/locations/goa" className="hover:text-[#E8D39E] transition-colors">
                  North Goa (Assagao)
                </Link>
              </li>
              <li>
                <Link href="/locations/pune" className="hover:text-[#E8D39E] transition-colors">
                  Pune (Baner & Koregaon Pk)
                </Link>
              </li>
              <li>
                <Link href="/locations/bengaluru" className="hover:text-[#E8D39E] transition-colors">
                  Bengaluru (CBD & Indiranagar)
                </Link>
              </li>
              <li>
                <Link href="/locations/hyderabad" className="hover:text-[#E8D39E] transition-colors">
                  Hyderabad (Jubilee Hills)
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Headquarters & Hours (2 Cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase font-mono">
              Pune Headquarters
            </h4>
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B99A63] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Office No. 812, Millennium Towers, Near Nanaware Bridge, Baner-Sus, Pune 411021
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#B99A63] shrink-0" />
                <span>Mon – Sat: 9:30 AM – 7:30 PM IST</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B99A63] shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-[#E8D39E] transition-colors">
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
              <li className="pt-1">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-1.5 text-xs text-[#E8D39E] hover:underline underline-offset-4"
                >
                  <span>Book Private Consultation</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B99A63]" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Policies & Internal Portal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="text-center sm:text-left">
            <p suppressHydrationWarning>© {new Date().getFullYear()} Signature Aura Developers Pvt. Ltd. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-[12px]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-stone-700">·</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms of Advisory
            </Link>
            <span className="text-stone-700">·</span>
            <Link href="/about" className="hover:text-white transition-colors">
              About The Firm
            </Link>
            <span className="text-stone-700">·</span>
            <Link href="/admin" className="text-stone-500 hover:text-stone-300 transition-colors">
              Advisor Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
