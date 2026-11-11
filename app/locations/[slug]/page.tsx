import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import PropertyCard from '@/components/properties/PropertyCard';
import { SAMPLE_LOCATIONS, SAMPLE_PROPERTIES } from '@/lib/data/sample-data';

export function generateStaticParams() {
  return SAMPLE_LOCATIONS.map(l => ({
    slug: l.slug,
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = SAMPLE_LOCATIONS.find(l => l.slug === slug);
  if (!location) {
    return { title: 'Location Not Found | Signature Aura™' };
  }

  return {
    title: `Luxury Real Estate in ${location.name} | Signature Aura™`,
    description: location.description.slice(0, 160),
    openGraph: {
      title: `Prime Properties in ${location.name} · Signature Aura™`,
      description: location.description.slice(0, 160),
      images: location.heroImage ? [location.heroImage] : [],
    },
  };
}

export default async function LocationDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = SAMPLE_LOCATIONS.find(l => l.slug === slug);

  if (!location) {
    notFound();
  }

  // Filter properties matching this city
  const cityProperties = SAMPLE_PROPERTIES.filter(p => 
    p.location.city.toLowerCase().includes(location.name.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-stone-900">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/locations" className="hover:text-stone-900">Locations</Link>
          <span aria-hidden="true">/</span>
          <span className="text-stone-900 font-medium">{location.name}</span>
        </div>

        {/* Hero Banner */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-900 shadow-xl border border-[#E8E5DF] mb-12">
          <Image
            src={location.heroImage}
            alt={location.name}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white max-w-3xl">
            <span className="text-xs tracking-widest text-[#B99A63] uppercase block mb-1">
              Prime Market Dossier · {location.state}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl">{location.name}</h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light">{location.tagline}</p>
            
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/20 text-xs">
              <div>
                <span className="text-stone-400 block">Avg. Capital Value:</span>
                <span className="font-semibold text-white">{location.avgPricePerSqFt}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Key Localities:</span>
                <span className="text-stone-200">{location.popularLocalities.slice(0, 3).join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Properties in this Location */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                Active Listings
              </span>
              <h2 className="font-serif text-3xl text-[#171717] mt-1">
                Luxury Properties in {location.name}
              </h2>
            </div>
            <Link
              href={`/properties?city=${encodeURIComponent(location.name)}`}
              className="text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#B99A63]"
            >
              Filter in Catalog →
            </Link>
          </div>

          {cityProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {cityProperties.map(p => (
                <PropertyCard key={p.id} property={p} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white border border-[#E8E5DF] rounded-xl">
              <p className="text-stone-600 text-sm">
                No public listings are currently visible for {location.name}. Please connect with our concierge for private off-market options.
              </p>
            </div>
          )}
        </section>

      </main>

      <Footer />
      <FloatingContactSystem />
    </div>
  );
}
