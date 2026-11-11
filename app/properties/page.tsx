'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Building, 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  RotateCcw,
  Heart,
  ShieldCheck,
  Building2,
  Sparkles,
  Trash2,
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters, { FilterState, LUXURY_AMENITIES } from '@/components/properties/PropertyFilters';
import { SAMPLE_PROPERTIES } from '@/lib/data/sample-data';
import { Property } from '@/types/real-estate';

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

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialListingType = (searchParams.get('listingType') as any) || 'all';
  const initialCategory = searchParams.get('category') || undefined;
  const initialCity = searchParams.get('city') || 'All Cities';
  const initialType = searchParams.get('propertyType') || 'All Types';
  const initialQuery = searchParams.get('q') || '';
  const initialIsSaved = searchParams.get('filter') === 'saved';

  const [properties] = useState<Property[]>(SAMPLE_PROPERTIES);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>(initialIsSaved ? 'saved' : 'all');

  // Deep-linking: if URL contains ?item=slug or ?property=slug, navigate directly to residence
  useEffect(() => {
    const itemSlug = searchParams.get('property') || searchParams.get('item');
    if (itemSlug) {
      router.push(`/properties/${itemSlug}`);
    }
  }, [searchParams, router]);

  const savedRaw = React.useSyncExternalStore(subscribeSaved, getSavedSnapshot, () => '[]');
  const savedIds: string[] = useMemo(() => {
    try {
      return JSON.parse(savedRaw);
    } catch {
      return [];
    }
  }, [savedRaw]);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialQuery,
    listingType: initialListingType,
    city: initialCity,
    propertyType: initialType,
    bedrooms: 'all',
    minPriceCr: '',
    maxPriceCr: '',
    pricePreset: 'all',
    selectedAmenities: [],
    sortBy: 'featured'
  });

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      listingType: 'all',
      city: 'All Cities',
      propertyType: 'All Types',
      bedrooms: 'all',
      minPriceCr: '',
      maxPriceCr: '',
      pricePreset: 'all',
      selectedAmenities: [],
      sortBy: 'featured'
    });
  };

  const handleClearAllSaved = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_saved_properties', JSON.stringify([]));
      window.dispatchEvent(new Event('aura_favorites_updated'));
    }
  };

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Saved tab filter
    if (activeTab === 'saved') {
      result = result.filter(p => savedIds.includes(p.id));
    }

    // Listing Type (Buy / Rent)
    if (filters.listingType !== 'all') {
      result = result.filter(p => p.listingType === filters.listingType);
    }

    // Category from URL
    if (initialCategory && initialCategory !== 'all') {
      result = result.filter(p => p.category === initialCategory);
    }

    // City
    if (filters.city !== 'All Cities' && filters.city !== '') {
      result = result.filter(p => p.location.city.toLowerCase() === filters.city.toLowerCase());
    }

    // Property Type
    if (filters.propertyType !== 'All Types' && filters.propertyType !== '') {
      result = result.filter(p => p.propertyType.toLowerCase() === filters.propertyType.toLowerCase());
    }

    // Bedrooms (BHK)
    if (filters.bedrooms !== 'all') {
      const bNum = Number(filters.bedrooms);
      if (bNum === 5) {
        result = result.filter(p => p.bedrooms >= 5);
      } else if (bNum > 0) {
        result = result.filter(p => p.bedrooms === bNum);
      }
    }

    // Price Presets
    if (filters.pricePreset === 'under_5cr') {
      result = result.filter(p => p.price < 50000000);
    } else if (filters.pricePreset === '5_15cr') {
      result = result.filter(p => p.price >= 50000000 && p.price <= 150000000);
    } else if (filters.pricePreset === '15_30cr') {
      result = result.filter(p => p.price >= 150000000 && p.price <= 300000000);
    } else if (filters.pricePreset === 'above_30cr') {
      result = result.filter(p => p.price > 300000000);
    }

    // Custom Min / Max Price in Crores
    if (filters.minPriceCr !== '') {
      const minVal = parseFloat(filters.minPriceCr) * 10000000;
      if (!isNaN(minVal)) {
        result = result.filter(p => p.price >= minVal);
      }
    }
    if (filters.maxPriceCr !== '') {
      const maxVal = parseFloat(filters.maxPriceCr) * 10000000;
      if (!isNaN(maxVal)) {
        result = result.filter(p => p.price <= maxVal);
      }
    }

    // Luxury Amenities Multi-Select
    if (filters.selectedAmenities.length > 0) {
      result = result.filter(p => {
        return filters.selectedAmenities.every(amenityId => {
          const opt = LUXURY_AMENITIES.find(a => a.id === amenityId);
          if (!opt) return true;
          const propAmenitiesStr = p.amenities.join(' ').toLowerCase();
          return opt.keywords.some(kw => propAmenitiesStr.includes(kw));
        });
      });
    }

    // Keyword Search
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.locality.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.amenities.some(a => a.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (filters.sortBy === 'featured') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    } else if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'area_desc') {
      result.sort((a, b) => b.carpetAreaSqFt - a.carpetAreaSqFt);
    } else if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [properties, filters, initialCategory, activeTab, savedIds]);

  const savedCount = savedIds.length;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col selection:bg-[#B99A63]/20">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Page Breadcrumbs & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[#777777] mb-2">
            <span>Home</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#171717] font-medium">Properties Discovery</span>
            {activeTab === 'saved' && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-[#B99A63] font-semibold">Saved Favorites ({savedCount})</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
                {activeTab === 'saved' ? 'My Saved Favorites' : 'Luxury Real Estate Portfolio'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl font-light leading-relaxed">
                {activeTab === 'saved' 
                  ? 'Your private shortlisted portfolio. Heart residences to bookmark them for site visit bookings or partner consultation.'
                  : 'Explore RERA-compliant trophy penthouses, heritage villas, and Grade-A commercial spaces across India.'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-600 bg-white border border-[#E8E5DF] px-3 py-2 rounded-xl shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#B99A63]" />
              <span>All Listings RERA Verified & Title Inspected</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TOP VIEW SELECTOR: All Portfolio vs My Favorites
           ========================================================================= */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-2 border border-[#E8E5DF] rounded-2xl shadow-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`touch-manipulation text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 min-h-[44px] ${
                activeTab === 'all'
                  ? 'bg-[#171717] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-[#171717] hover:bg-[#FAF9F5]'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#B99A63]" />
              <span>All Portfolio</span>
              <span className="text-xs bg-white/20 text-stone-300 px-2 py-0.5 rounded-full font-mono">
                {properties.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`touch-manipulation text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 min-h-[44px] ${
                activeTab === 'saved'
                  ? 'bg-[#B99A63] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-[#171717] hover:bg-[#FAF9F5]'
              }`}
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-red-500 text-red-500' : 'text-[#B99A63]'}`} />
              <span>My Favorites</span>
              <span className="text-xs bg-black/20 text-white px-2 py-0.5 rounded-full font-mono">
                {savedCount}
              </span>
            </button>
          </div>

          {activeTab === 'saved' && savedCount > 0 && (
            <button
              type="button"
              onClick={handleClearAllSaved}
              className="touch-manipulation text-xs font-medium text-stone-500 hover:text-red-600 flex items-center gap-1 px-3 py-2 rounded-lg transition-colors min-h-[40px]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Saved Favorites</span>
            </button>
          )}
        </div>

        {/* Filter Bar Component */}
        <div className="mb-8">
          <PropertyFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={filteredProperties.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Properties Grid / List */}
        {filteredProperties.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              : 'space-y-6'
          }>
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E8E5DF] rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto my-10 space-y-4 shadow-sm">
            {activeTab === 'saved' ? (
              <>
                <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] mx-auto shadow-xs">
                  <Bookmark className="w-6 h-6 text-[#B99A63]" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717]">No Saved Favorites Yet</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  You haven’t shortlisted any residences yet. Click the heart icon on any penthouse, villa, or commercial property to bookmark it here for direct partner consultation.
                </p>
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => setActiveTab('all')}
                    className="touch-manipulation bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-xl transition-all shadow min-h-[44px]"
                  >
                    Browse Luxury Portfolio
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] mx-auto shadow-xs">
                  <Search className="w-6 h-6 text-[#B99A63]" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717]">No Matching Residences Found</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  We couldn’t find properties matching your price, BHK, or amenity criteria. Try resetting selected filters or ask our AI Property Assistant for off-market options.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="touch-manipulation bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-xl transition-all shadow min-h-[44px]"
                  >
                    Reset All Filters
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </main>

      <Footer />
      <FloatingContactSystem />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#171717] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-stone-600 uppercase tracking-widest font-mono">Loading Properties...</p>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
