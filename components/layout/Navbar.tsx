'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Phone, 
  Heart, 
  ChevronRight
} from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/config';

function BrandLogo({ 
  onClick, 
  priority = true,
}: { 
  onClick?: () => void; 
  priority?: boolean;
}) {
  return (
    <Link 
      href="/" 
      onClick={onClick}
      className="flex items-center shrink-0 mr-3 sm:mr-5 group focus:outline-hidden py-1"
      aria-label="Signature Aura Developers"
    >
      <div className="relative w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] md:w-[98px] md:h-[98px] lg:w-[104px] lg:h-[104px] xl:w-[112px] xl:h-[112px] shrink-0 drop-shadow-[0_4px_22px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300">
        <Image
          src="/assets/branding/signature-aura-logo-official.png?v=20261105"
          alt="Signature Aura Developers"
          fill
          sizes="(max-width: 640px) 90px, (max-width: 1024px) 100px, 112px"
          className="object-contain"
          priority={priority}
        />
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateSaved = () => {
      if (typeof window !== 'undefined') {
        try {
          const saved = JSON.parse(localStorage.getItem('aura_saved_properties') || '[]');
          setSavedCount(saved.length);
        } catch {
          setSavedCount(0);
        }
      }
    };
    updateSaved();
    window.addEventListener('storage', updateSaved);
    window.addEventListener('aura_favorites_updated', updateSaved);
    return () => {
      window.removeEventListener('storage', updateSaved);
      window.removeEventListener('aura_favorites_updated', updateSaved);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Projects', href: '/projects' },
    { name: 'Locations', href: '/locations' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      style={{ position: 'sticky', top: 0, zIndex: 30 }}
      className={`sticky top-0 left-0 right-0 w-full z-30 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#0d0d10]/95 backdrop-blur-xl shadow-2xl border-b border-[#24242a]' 
          : 'bg-[#0d0d10]/85 backdrop-blur-md border-b border-[#24242a]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[90px] sm:h-[100px] md:h-[110px] lg:h-[116px] xl:h-[120px]">
          
          {/* Brand Logo */}
          <BrandLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] xl:text-xs uppercase tracking-[0.18em] transition-all relative py-2 font-medium ${
                    isActive 
                      ? 'text-[#FAF9F5] font-semibold' 
                      : 'text-stone-300 hover:text-[#E8D39E]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-linear-to-r from-[#B99A63] to-[#E8D39E] rounded-full shadow-[0_0_8px_rgba(185,154,99,0.5)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-4">
            {/* Saved properties button */}
            <Link 
              href="/properties?filter=saved"
              className="relative w-10 h-10 xl:w-11 xl:h-11 flex items-center justify-center rounded-full bg-[#18181c] border border-[#2b2b32] hover:border-[#B99A63]/50 text-stone-300 hover:text-[#E8D39E] transition-all shadow-sm"
              title="Saved Properties"
              aria-label={`View saved properties (${savedCount})`}
            >
              <Heart className="w-4 h-4 xl:w-4.5 xl:h-4.5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-linear-to-r from-[#B99A63] to-[#E8D39E] text-[#0D0D10] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-xs">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Direct Call Concierge CTA */}
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#B99A63] via-[#C8AA6E] to-[#E8D39E] hover:from-[#C8AA6E] hover:to-[#FAF9F5] text-[#0D0D10] text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_2px_15px_rgba(185,154,99,0.25)] hover:shadow-[0_4px_22px_rgba(185,154,99,0.4)] hover:scale-[1.02] active:scale-[0.98] min-h-[42px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#0D0D10]" />
              <span>Schedule Call</span>
            </a>
          </div>

          {/* Mobile & Tablet Header Controls (Touch targets >= 44x44px) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <Link
              href="/properties?filter=saved"
              className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-stone-300 border border-[#262629] bg-[#161619] rounded-xl hover:border-[#B99A63]/50 transition-colors"
              aria-label={`Saved properties (${savedCount})`}
            >
              <Heart className="w-4 h-4 text-[#B99A63]" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-linear-to-r from-[#B99A63] to-[#E8D39E] text-[#0D0D10] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </Link>

            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              aria-label="Call concierge desk"
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-stone-300 border border-[#262629] bg-[#161619] rounded-xl hover:border-[#B99A63]/50 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#B99A63]" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-stone-300 hover:text-white transition-colors border border-[#262629] bg-[#161619] rounded-xl focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Overlay: Higher z-index (z-50) than navbar (z-30) */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 pointer-events-auto"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop below dropdown */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)} 
            aria-hidden="true"
          />

          {/* Absolute positioning for the mobile menu content */}
          <div className="absolute top-0 left-0 right-0 w-full bg-[#0d0d10] text-[#FAF9F5] border-b border-[#262629] shadow-2xl max-h-[92dvh] overflow-y-auto overscroll-contain animate-in slide-in-from-top-1 duration-200 z-50">
            {/* Header row inside menu overlay aligned with top bar */}
            <div className="flex items-center justify-between h-[90px] sm:h-[100px] px-4 sm:px-6 border-b border-[#262629] bg-[#0d0d10]">
              <BrandLogo 
                onClick={() => setMobileMenuOpen(false)} 
                priority={false}
              />

              <div className="flex items-center gap-1.5 shrink-0">
                <Link
                  href="/properties?filter=saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-stone-300 border border-[#262629] bg-[#1a1a1e] rounded-lg"
                  aria-label={`Saved properties (${savedCount})`}
                >
                  <Heart className="w-4 h-4 text-[#B99A63]" />
                  {savedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#B99A63] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {savedCount}
                    </span>
                  )}
                </Link>

                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  aria-label="Call concierge desk"
                  className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-stone-300 border border-[#262629] bg-[#1a1a1e] rounded-lg"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-stone-300 hover:text-white transition-colors border border-[#262629] rounded-lg bg-[#1a1a1e]"
                >
                  <X className="w-5 h-5 text-stone-300" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Links */}
            <div className="px-6 py-6 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between min-h-[48px] py-2 px-2 text-base border-b border-[#262629]/60 transition-colors ${
                    pathname === link.href ? 'text-[#E8D39E] font-semibold' : 'text-stone-300 hover:text-[#E8D39E]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-stone-500" />
                </Link>
              ))}

              <Link
                href="/properties?filter=saved"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between min-h-[48px] py-2 px-2 text-base text-stone-300 hover:text-[#E8D39E] border-b border-[#262629]/60"
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-[#B99A63]" />
                  Saved Residences ({savedCount})
                </span>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </Link>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="w-full min-h-[48px] text-center bg-[#202024] hover:bg-[#B99A63] text-white hover:text-[#121214] border border-[#B99A63]/50 py-3 rounded-lg text-sm tracking-wide font-medium flex items-center justify-center gap-2 shadow transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#B99A63]" />
                  Call Concierge: {BUSINESS_CONFIG.phoneNumber}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
