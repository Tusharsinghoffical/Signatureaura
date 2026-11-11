import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Building, Sparkles } from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import { SAMPLE_LOCATIONS } from '@/lib/data/sample-data';
import { getOptimizedImageUrl, SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase block mb-2">
            Prime Markets
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] leading-tight">
            India’s Premier Real Estate Corridors
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            From the financial capital of Mumbai to the stately golf corridors of Delhi NCR, tropical sanctuaries of Goa, and tech capitals of Bengaluru and Hyderabad.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_LOCATIONS.map((loc) => (
            <div 
              key={loc.id}
              className="bg-white border border-[#E8E5DF] hover:border-[#B99A63] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                <Image
                  src={getOptimizedImageUrl(loc.heroImage, 640, 75)}
                  alt={loc.name}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={SHIMMER_BLUR_DATA_URL}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded">
                  {loc.avgPricePerSqFt}
                </div>
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] tracking-widest uppercase text-[#C5A869] block">
                    {loc.state}
                  </span>
                  <h3 className="font-serif text-2xl group-hover:text-[#B99A63] transition-colors">
                    {loc.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                    {loc.description}
                  </p>

                  <div className="space-y-1 pt-3 border-t border-[#E8E5DF]">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-stone-400 block">
                      Coveted Localities:
                    </span>
                    <p className="text-xs text-stone-800 font-medium line-clamp-2">
                      {loc.popularLocalities.join(' · ')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E5DF] flex items-center justify-between">
                  <span className="text-xs text-[#777777]">{loc.activeListingsCount} Curated Listings</span>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#171717] group-hover:text-[#B99A63] flex items-center gap-1 transition-colors"
                  >
                    <span>View Market</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
      <FloatingContactSystem />
    </div>
  );
}
