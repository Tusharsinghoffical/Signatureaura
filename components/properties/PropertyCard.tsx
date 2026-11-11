'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ArrowUpRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Property } from '@/types/real-estate';
import { getOptimizedImageUrl, SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

function getSavedSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  return localStorage.getItem('aura_saved_properties') || '[]';
}

function subscribeSaved(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('aura_favorites_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('aura_favorites_updated', callback);
  };
}

export default function PropertyCard({ property, viewMode = 'grid' }: PropertyCardProps) {
  const savedRaw = React.useSyncExternalStore(subscribeSaved, getSavedSnapshot, () => '[]');
  const isSaved = React.useMemo(() => {
    try {
      return JSON.parse(savedRaw).includes(property.id);
    } catch {
      return false;
    }
  }, [savedRaw, property.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      try {
        const saved: string[] = JSON.parse(localStorage.getItem('aura_saved_properties') || '[]');
        let updated: string[];
        if (saved.includes(property.id)) {
          updated = saved.filter(id => id !== property.id);
        } else {
          updated = [...saved, property.id];
        }
        localStorage.setItem('aura_saved_properties', JSON.stringify(updated));
        window.dispatchEvent(new Event('aura_favorites_updated'));
      } catch {
        // Ignore localstorage issues
      }
    }
  };

  const rawImage = property.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=75';
  const primaryImage = getOptimizedImageUrl(rawImage, 720, 75);

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-[#E8E5DF] hover:border-[#B99A63]/60 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row group">
        
        {/* Image column */}
        <div className="relative md:w-80 h-64 md:h-auto overflow-hidden bg-stone-900 flex-shrink-0">
          <Link href={`/properties/${property.slug}`} className="relative block h-full w-full">
            <Image
              src={primaryImage}
              alt={property.title}
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={SHIMMER_BLUR_DATA_URL}
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Badges / indicators */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
            {property.isFeatured && (
              <span className="bg-[#171717]/90 text-[#FAF9F5] text-[10px] tracking-wider uppercase px-2 py-0.5 rounded font-medium backdrop-blur-xs">
                Signature Collection
              </span>
            )}
            <span className="bg-[#B99A63]/90 text-white text-[10px] tracking-wider uppercase px-2 py-0.5 rounded font-medium backdrop-blur-xs">
              For {property.listingType === 'buy' ? 'Sale' : 'Lease'}
            </span>
          </div>

          {/* Save Button */}
          <button
            onClick={toggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save property"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#171717] flex items-center justify-center shadow-md transition-all touch-manipulation z-10"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-stone-700'}`} />
          </button>
        </div>

        {/* Content column */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Metadata unboxed */}
            <div className="flex items-center gap-2 text-xs text-[#777777] mb-1.5">
              <span>{property.propertyType}</span>
              <span aria-hidden="true">·</span>
              <span>{property.location.locality}, {property.location.city}</span>
              {property.isReraApproved && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#B99A63] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    RERA
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <Link href={`/properties/${property.slug}`}>
              <h3 className="font-serif text-xl text-[#171717] group-hover:text-[#B99A63] transition-colors leading-snug">
                {property.title}
              </h3>
            </Link>

            <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
              {property.description}
            </p>

            {/* Specs row */}
            <div className="flex flex-wrap items-center gap-5 mt-4 pt-4 border-t border-[#E8E5DF] text-xs text-[#444444]">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-[#B99A63]" />
                  <span>{property.bedrooms} Beds</span>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#B99A63]" />
                  <span>{property.bathrooms} Baths</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#B99A63]" />
                <span>{(property.carpetAreaSqFt || 0).toLocaleString('en-IN')} sq.ft. carpet</span>
              </div>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="mt-5 pt-4 border-t border-[#E8E5DF] flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-[#777777] uppercase tracking-wider block">Offered At</span>
              <span className="font-serif text-2xl font-normal text-[#171717]">
                {property.priceDisplay}
              </span>
            </div>

            <Link
              href={`/properties/${property.slug}`}
              className="inline-flex items-center gap-1.5 bg-[#171717] group-hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded transition-all"
            >
              <span>Explore Residence</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white border border-[#E5E2DC] hover:border-[#D4AF37] rounded-xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <Link href={`/properties/${property.slug}`} className="relative block h-full w-full">
          <Image
            src={primaryImage}
            alt={property.title}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={SHIMMER_BLUR_DATA_URL}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Ambient Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          {property.isFeatured && (
            <span className="bg-[#0D0D0F]/90 text-white border border-white/20 text-[10px] tracking-wider uppercase px-2.5 py-1 rounded font-medium backdrop-blur-md">
              Signature Trophy
            </span>
          )}
          <span className="bg-[#D4AF37] text-[#0D0D0F] text-[10px] tracking-wider uppercase px-2.5 py-1 rounded font-bold backdrop-blur-xs">
            For {property.listingType === 'buy' ? 'Sale' : 'Lease'}
          </span>
        </div>

        {/* Save to favorites button */}
        <button
          onClick={toggleSave}
          aria-label={isSaved ? "Remove from saved" : "Save property"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0D0D0F]/70 hover:bg-[#0D0D0F] text-white backdrop-blur-md flex items-center justify-center border border-white/15 transition-all shadow touch-manipulation z-10"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-stone-300'}`} />
        </button>

        {/* Price Tag Overlay with Champagne Gold Font */}
        <div className="absolute bottom-3 left-3 bg-[#0D0D0F]/90 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-lg shadow-md">
          <span className="font-serif text-lg font-normal tracking-wide text-[#E8DFD0]">
            {property.priceDisplay}
          </span>
        </div>

        {/* Locality badge on right */}
        <div className="absolute bottom-3 right-3 text-[11px] text-stone-200 bg-black/50 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#D4AF37]" />
          <span>{property.location.city}</span>
        </div>
      </div>

      {/* Property Card Info */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1.5 font-mono">
            <span className="uppercase text-stone-700 font-semibold">{property.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{property.location.locality}</span>
            {property.isReraApproved && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#B99A63] font-medium flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  RERA
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`}>
            <h3 className="font-serif text-xl text-[#0D0D0F] group-hover:text-[#B99A63] transition-colors leading-snug line-clamp-1 font-normal">
              {property.title}
            </h3>
          </Link>

          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed font-light">
            {property.tagline || property.description}
          </p>
        </div>

        {/* Specs footer */}
        <div className="mt-4 pt-3.5 border-t border-[#EAE7E1] flex flex-wrap items-center justify-between gap-2 text-xs text-stone-700">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {property.bedrooms > 0 && (
              <span className="font-medium" title={`${property.bedrooms} Bedrooms`}>{property.bedrooms} BHK</span>
            )}
            {property.bathrooms > 0 && (
              <span title={`${property.bathrooms} Bathrooms`}>· {property.bathrooms} Baths</span>
            )}
            <span>· {(property.carpetAreaSqFt || 0).toLocaleString('en-IN')} sq.ft.</span>
          </div>

          <Link
            href={`/properties/${property.slug}`}
            className="text-xs font-semibold uppercase tracking-wider text-[#0D0D0F] group-hover:text-[#B99A63] flex items-center gap-1 transition-colors"
          >
            <span>Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
