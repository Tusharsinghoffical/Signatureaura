'use client';

import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  LayoutGrid, 
  List, 
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  IndianRupee,
  Bed,
  Building,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { ListingType } from '@/types/real-estate';

export interface AmenityOption {
  id: string;
  label: string;
  keywords: string[];
}

export const LUXURY_AMENITIES: AmenityOption[] = [
  { id: 'sea_view', label: 'Arabian Sea View', keywords: ['sea', 'view', 'ocean', 'bay'] },
  { id: 'pool', label: 'Private Plunge Pool', keywords: ['pool', 'plunge', 'jacuzzi', 'swimming'] },
  { id: 'elevator', label: 'Private Elevator', keywords: ['elevator', 'lift'] },
  { id: 'concierge', label: '24/7 White-Glove Concierge', keywords: ['concierge', 'security', 'butler', 'white-glove'] },
  { id: 'marble', label: 'Italian Marble Flooring', keywords: ['marble', 'statuario', 'italian'] },
  { id: 'ev_charging', label: 'EV Charging Bays', keywords: ['ev', 'charging', 'electric'] },
  { id: 'wine_cellar', label: 'Wine Cellar & Bar', keywords: ['wine', 'bar', 'cellar'] },
  { id: 'helipad', label: 'Helipad Access', keywords: ['helipad'] },
  { id: 'automation', label: 'Smart Home Automation', keywords: ['automation', 'smart', 'audio', 'bang'] },
  { id: 'gym_spa', label: 'Private Gym & Spa', keywords: ['gym', 'gymnasium', 'fitness', 'spa'] },
  { id: 'garden', label: 'Private Zen Garden / Deck', keywords: ['garden', 'terrace', 'zen', 'deck'] },
];

export interface FilterState {
  searchQuery: string;
  listingType: ListingType | 'all';
  city: string;
  propertyType: string;
  bedrooms: number | 'all';
  minPriceCr: string; // in Crores or Lakhs
  maxPriceCr: string; // in Crores or Lakhs
  pricePreset: 'all' | 'under_5cr' | '5_15cr' | '15_30cr' | 'above_30cr';
  selectedAmenities: string[];
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'area_desc' | 'newest';
}

interface PropertyFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  totalResults,
  viewMode,
  onViewModeChange
}: PropertyFiltersProps) {
  const [isExpandedFiltersOpen, setIsExpandedFiltersOpen] = useState(false);

  const cities = ['All Cities', 'Mumbai', 'Delhi NCR', 'Goa', 'Bengaluru', 'Hyderabad', 'Pune'];
  const propertyTypes = ['All Types', 'Apartment', 'Penthouse', 'Villa', 'Independent Floor', 'Grade-A Office', 'Retail Showroom'];
  
  const bedroomOptions: { label: string; value: number | 'all' }[] = [
    { label: 'Any BHK', value: 'all' },
    { label: '2 BHK', value: 2 },
    { label: '3 BHK', value: 3 },
    { label: '4 BHK', value: 4 },
    { label: '5+ BHK', value: 5 }
  ];

  const pricePresets: { label: string; value: FilterState['pricePreset'] }[] = [
    { label: 'All Budgets', value: 'all' },
    { label: '< ₹5 Cr', value: 'under_5cr' },
    { label: '₹5 Cr - ₹15 Cr', value: '5_15cr' },
    { label: '₹15 Cr - ₹30 Cr', value: '15_30cr' },
    { label: '₹30 Cr+', value: 'above_30cr' },
  ];

  const toggleAmenity = (amenityId: string) => {
    const current = filters.selectedAmenities;
    if (current.includes(amenityId)) {
      onChange({ selectedAmenities: current.filter(id => id !== amenityId) });
    } else {
      onChange({ selectedAmenities: [...current, amenityId] });
    }
  };

  const activeCount = [
    filters.searchQuery.trim() !== '',
    filters.listingType !== 'all',
    filters.city !== 'All Cities' && filters.city !== '',
    filters.propertyType !== 'All Types' && filters.propertyType !== '',
    filters.bedrooms !== 'all',
    filters.minPriceCr !== '',
    filters.maxPriceCr !== '',
    filters.pricePreset !== 'all',
    filters.selectedAmenities.length > 0
  ].filter(Boolean).length;

  const hasActiveFilters = activeCount > 0;

  return (
    <div className="bg-white border border-[#E8E5DF] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      
      {/* 1. TOP ROW: Search Bar, Listing Segment & View Toggle */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ searchQuery: e.target.value })}
            suppressHydrationWarning
            placeholder="Search by locality (Worli, Assagao, Baner-Sus, BKC), property name, or keywords..."
            className="w-full pl-10 pr-9 py-2.5 bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none rounded-xl text-sm text-[#171717] placeholder:text-stone-400 min-h-[44px]"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ searchQuery: '' })}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 touch-manipulation"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Listing Type Toggle (All / Buy / Lease) */}
        <div className="flex items-center gap-1 p-1 bg-[#FAF9F5] border border-[#E8E5DF] rounded-xl overflow-x-auto scrollbar-none flex-nowrap shrink-0">
          <button
            type="button"
            onClick={() => onChange({ listingType: 'all' })}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all touch-manipulation min-h-[38px] ${
              filters.listingType === 'all'
                ? 'bg-[#171717] text-white shadow-xs font-semibold'
                : 'text-stone-600 hover:text-[#171717]'
            }`}
          >
            All Portfolio
          </button>
          <button
            type="button"
            onClick={() => onChange({ listingType: 'buy' })}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all touch-manipulation min-h-[38px] ${
              filters.listingType === 'buy'
                ? 'bg-[#171717] text-white shadow-xs font-semibold'
                : 'text-stone-600 hover:text-[#171717]'
            }`}
          >
            Buy Residence
          </button>
          <button
            type="button"
            onClick={() => onChange({ listingType: 'rent' })}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all touch-manipulation min-h-[38px] ${
              filters.listingType === 'rent'
                ? 'bg-[#171717] text-white shadow-xs font-semibold'
                : 'text-stone-600 hover:text-[#171717]'
            }`}
          >
            Lease / Rent
          </button>
        </div>

        {/* Filters Toggle Button & View Mode Controls */}
        <div className="flex items-center justify-between md:justify-end gap-2 pt-1 md:pt-0 border-t md:border-t-0 border-[#E8E5DF]">
          <button
            type="button"
            onClick={() => setIsExpandedFiltersOpen(!isExpandedFiltersOpen)}
            aria-expanded={isExpandedFiltersOpen}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF9F5] hover:bg-[#F2EFE9] border border-[#E8E5DF] rounded-xl text-xs font-medium text-stone-800 touch-manipulation min-h-[42px]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B99A63]" />
            <span>{isExpandedFiltersOpen ? 'Hide Filters' : 'Filter by Price, BHK & Amenities'}</span>
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#B99A63] text-white font-bold text-[10px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
            {isExpandedFiltersOpen ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 border border-[#E8E5DF] p-1 rounded-xl bg-[#FAF9F5]">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid View"
              aria-label="Grid view layout"
              className={`p-2 rounded-lg transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center ${
                viewMode === 'grid' ? 'bg-[#171717] text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              title="List View"
              aria-label="List view layout"
              className={`p-2 rounded-lg transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center ${
                viewMode === 'list' ? 'bg-[#171717] text-white' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 2. SECOND ROW: Quick Filter Chips (City, Bedrooms, Price Presets) */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8E5DF]">
        {/* Bedrooms BHK Selector Pills */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 flex-nowrap max-w-full">
          <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider shrink-0 pr-1 flex items-center gap-1">
            <Bed className="w-3 h-3 text-[#B99A63]" />
            BHK:
          </span>
          {bedroomOptions.map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() => onChange({ bedrooms: b.value })}
              className={`touch-manipulation text-xs px-3 py-1.5 rounded-full transition-all shrink-0 min-h-[36px] ${
                filters.bedrooms === b.value
                  ? 'bg-[#171717] text-white font-medium shadow-xs'
                  : 'bg-[#FAF9F5] text-stone-700 hover:text-stone-900 border border-[#E8E5DF]'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Price Presets */}
        <div className="hidden sm:flex items-center gap-1 overflow-x-auto scrollbar-none py-1 flex-nowrap">
          <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider shrink-0 pr-1 pl-2 border-l border-[#E8E5DF] flex items-center gap-1">
            <IndianRupee className="w-3 h-3 text-[#B99A63]" />
            Price:
          </span>
          {pricePresets.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => {
                onChange({ pricePreset: p.value, minPriceCr: '', maxPriceCr: '' });
              }}
              className={`touch-manipulation text-xs px-3 py-1.5 rounded-full transition-all shrink-0 min-h-[36px] ${
                filters.pricePreset === p.value && !filters.minPriceCr && !filters.maxPriceCr
                  ? 'bg-[#B99A63] text-white font-medium shadow-xs'
                  : 'bg-[#FAF9F5] text-stone-700 hover:text-stone-900 border border-[#E8E5DF]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. EXPANDABLE FILTER CONTAINER: Price Range Inputs, Asset Class, City & Luxury Amenities */}
      {isExpandedFiltersOpen && (
        <div className="pt-4 border-t border-[#E8E5DF] space-y-5 animate-in fade-in duration-200">
          
          {/* Section A: Market, Asset Class, Price Range & Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Prime Market */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                Prime Location / City
              </label>
              <select
                value={filters.city}
                onChange={(e) => onChange({ city: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2.5 min-h-[44px] rounded-xl text-xs text-[#171717]"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Asset Class */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                Property Asset Class
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => onChange({ propertyType: e.target.value })}
                className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2.5 min-h-[44px] rounded-xl text-xs text-[#171717]"
              >
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Custom Price Range in Cr */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                Budget Range (in ₹ Crores)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min (e.g. 5)"
                  step="0.5"
                  value={filters.minPriceCr}
                  onChange={(e) => onChange({ minPriceCr: e.target.value, pricePreset: 'all' })}
                  suppressHydrationWarning
                  className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2.5 min-h-[44px] rounded-xl text-xs text-[#171717]"
                />
                <span className="text-stone-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max (e.g. 30)"
                  step="0.5"
                  value={filters.maxPriceCr}
                  onChange={(e) => onChange({ maxPriceCr: e.target.value, pricePreset: 'all' })}
                  suppressHydrationWarning
                  className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2.5 min-h-[44px] rounded-xl text-xs text-[#171717]"
                />
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                Sort Order
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => onChange({ sortBy: e.target.value as any })}
                className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2.5 min-h-[44px] rounded-xl text-xs text-[#171717]"
              >
                <option value="featured">Signature Curations</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="area_desc">Carpet Size: Largest First</option>
                <option value="newest">Recently Listed</option>
              </select>
            </div>

          </div>

          {/* Section B: Specific Luxury Amenities Multi-Select Grid */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                Filter by Luxury Amenities ({filters.selectedAmenities.length} selected)
              </label>
              {filters.selectedAmenities.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange({ selectedAmenities: [] })}
                  className="text-xs text-[#B99A63] hover:underline"
                >
                  Clear Amenities
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {LUXURY_AMENITIES.map((amenity) => {
                const isSelected = filters.selectedAmenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`touch-manipulation text-xs px-3 py-2.5 rounded-xl border transition-all text-left flex items-center justify-between gap-2 min-h-[44px] ${
                      isSelected
                        ? 'bg-[#171717] text-white border-[#171717] shadow-xs'
                        : 'bg-[#FAF9F5] hover:bg-[#F2EFE9] text-stone-700 border-[#E8E5DF]'
                    }`}
                  >
                    <span className="truncate">{amenity.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#B99A63] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* 4. ACTIVE FILTER BADGES & SUMMARY ROW */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E5DF] text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-[#171717]">{totalResults}</span>
          <span className="text-stone-600">curated residences found</span>

          {/* Render Active Filter Badges */}
          {filters.listingType !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-[#171717] text-white px-2.5 py-0.5 rounded-full text-[11px]">
              Type: {filters.listingType === 'buy' ? 'Buy' : 'Lease'}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onChange({ listingType: 'all' })} />
            </span>
          )}

          {filters.city !== 'All Cities' && (
            <span className="inline-flex items-center gap-1 bg-stone-200 text-stone-800 px-2.5 py-0.5 rounded-full text-[11px]">
              City: {filters.city}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onChange({ city: 'All Cities' })} />
            </span>
          )}

          {filters.bedrooms !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-stone-200 text-stone-800 px-2.5 py-0.5 rounded-full text-[11px]">
              {filters.bedrooms} BHK
              <X className="w-3 h-3 cursor-pointer" onClick={() => onChange({ bedrooms: 'all' })} />
            </span>
          )}

          {filters.pricePreset !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-[#B99A63] text-white px-2.5 py-0.5 rounded-full text-[11px]">
              Budget: {pricePresets.find(p => p.value === filters.pricePreset)?.label}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onChange({ pricePreset: 'all' })} />
            </span>
          )}

          {(filters.minPriceCr || filters.maxPriceCr) && (
            <span className="inline-flex items-center gap-1 bg-[#B99A63] text-white px-2.5 py-0.5 rounded-full text-[11px]">
              ₹ {filters.minPriceCr || '0'} Cr - {filters.maxPriceCr || '∞'} Cr
              <X className="w-3 h-3 cursor-pointer" onClick={() => onChange({ minPriceCr: '', maxPriceCr: '' })} />
            </span>
          )}

          {filters.selectedAmenities.map(id => {
            const label = LUXURY_AMENITIES.find(a => a.id === id)?.label || id;
            return (
              <span key={id} className="inline-flex items-center gap-1 bg-[#171717] text-[#FAF9F5] px-2.5 py-0.5 rounded-full text-[11px]">
                {label}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleAmenity(id)} />
              </span>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-[#B99A63] hover:text-[#9e7d42] font-semibold transition-colors touch-manipulation min-h-[36px] px-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

    </div>
  );
}
