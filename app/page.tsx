'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Building2, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Award, 
  Users2, 
  Clock, 
  Star, 
  ChevronRight,
  Phone,
  MessageSquare,
  Sparkles,
  Building,
  Key,
  CheckCircle2,
  Send,
  Camera
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppLink, createWhatsAppRedirectUrl, redirectToWhatsApp } from '@/lib/config';
import { createStoredLead } from '@/lib/client-storage';
import { SAMPLE_PROPERTIES, SAMPLE_PROJECTS, SAMPLE_LOCATIONS, SAMPLE_TESTIMONIALS } from '@/lib/data/sample-data';
import PropertyCard from '@/components/properties/PropertyCard';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import { getOptimizedImageUrl, SHIMMER_BLUR_DATA_URL } from '@/lib/utils';

const FOUNDING_PARTNERS = [
  {
    name: 'Rakesh Desale Patil',
    gender: 'Male',
    role: 'Partner & Director',
    division: 'Strategic Land Acquisitions & Developer Alliances',
    initials: 'RDP',
    market: 'Pune Prime Corridors',
    bio: 'Founding Partner at Signature Aura Pvt. Ltd., steering land parcel aggregations, institutional builder joint ventures, and marquee luxury residential developments.',
    photo: '/assets/team/rakesh-desale-patil.jpg',
  },
  {
    name: 'Uma Bhandwalkar',
    gender: 'Female',
    role: 'Partner & Director',
    division: 'Luxury Residential Advisory & Private Client Desk',
    initials: 'UB',
    market: 'High-End Residential & Penthouses',
    bio: 'Partner at Signature Aura Pvt. Ltd., leading bespoke residential acquisitions, trophy penthouses, gated community villas, and high-net-worth investor advisory.',
    photo: '/assets/team/uma-bhandwalkar.jpg',
  },
  {
    name: 'Akshay Bhote',
    gender: 'Male',
    role: 'Partner & Director',
    division: 'Commercial Capital & Legal Due Diligence',
    initials: 'AB',
    market: 'Commercial & Institutional Assets',
    bio: 'Partner at Signature Aura Pvt. Ltd., overseeing corporate floor-plate leasing, Grade-A IT park investments, 30-year forensic title verifications, and statutory MahaRERA governance.',
    photo: '/assets/team/akshay-bhote.jpg',
  },
  {
    name: 'Rama Bhote',
    gender: 'Female',
    role: 'Partner & Director',
    division: 'Portfolio Asset Management & Global NRI Concierge',
    initials: 'RB',
    market: 'NRI Wealth & Lifestyle Estates',
    bio: 'Partner at Signature Aura Pvt. Ltd., directing asset management, cross-border NRI investment advisory, client concierge protocols, and long-term portfolio appreciation strategies.',
    photo: '/assets/team/rama-bhote.jpg',
  }
];

export default function HomePage() {
  const router = useRouter();
  
  // Hero search bar state
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial'>('buy');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [keyword, setKeyword] = useState('');

  // Quick enquiry form on homepage
  const [homeContact, setHomeContact] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Buying Luxury Residential',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [redirectWhatsAppUrl, setRedirectWhatsAppUrl] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab === 'buy') params.set('listingType', 'buy');
    else if (activeTab === 'rent') params.set('listingType', 'rent');
    else if (activeTab === 'commercial') params.set('category', 'commercial');

    if (selectedCity && selectedCity !== 'All Cities') params.set('city', selectedCity);
    if (selectedType && selectedType !== 'All Asset Types') params.set('propertyType', selectedType);
    if (keyword.trim()) params.set('q', keyword.trim());

    router.push(`/properties?${params.toString()}`);
  };

  const handleHomeContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      createStoredLead({
        fullName: homeContact.name,
        phone: homeContact.phone,
        email: homeContact.email,
        leadSource: 'contact_form',
        budget: homeContact.service,
        message: homeContact.message || `Inquiry from homepage contact section for ${homeContact.service}.`
      });

      const waUrl = createWhatsAppRedirectUrl({
        title: 'HOMEPAGE ADVISORY INQUIRY',
        fullName: homeContact.name,
        phone: homeContact.phone,
        email: homeContact.email,
        interest: homeContact.service,
        notes: homeContact.message || 'I would like to explore property opportunities with your advisory team.',
        origin: 'Homepage Contact Form'
      });

      setRedirectWhatsAppUrl(waUrl);
      setContactSuccess(true);
      
      // Auto-redirect to WhatsApp
      redirectToWhatsApp(waUrl);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredProperties = SAMPLE_PROPERTIES.filter(p => p.isFeatured).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col selection:bg-[#B99A63]/20">
      
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Responsive Navigation Bar */}
      <Navbar />

      <main className="flex-1 pb-24 md:pb-0">

        {/* =========================================================================
            3. HERO SECTION WITH EDITORIAL REAL ESTATE PHOTOGRAPHY & SEARCH
           ========================================================================= */}
        <section className="relative min-h-[85vh] min-h-[85dvh] lg:min-h-[88vh] lg:min-h-[88dvh] flex items-center justify-center overflow-hidden bg-[#171717]">
          {/* Background Image with subtle cinematic dark overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=75"
              alt="Luxury residence oceanfront"
              fill
              priority
              quality={75}
              placeholder="blur"
              blurDataURL={SHIMMER_BLUR_DATA_URL}
              sizes="100vw"
              className="object-cover object-center opacity-65 scale-100 animate-in fade-in duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Elegant gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-[#171717]/60" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28 text-center flex flex-col items-center min-w-0">
            
            {/* Editorial kicker with SA Emblem */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-stone-200 text-xs tracking-widest uppercase mb-4 sm:mb-6 shadow-md">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0 drop-shadow-sm">
                <Image
                  src="/assets/branding/signature-aura-logo-official.png?v=20261105"
                  alt="Signature Aura Developers Emblem"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-medium tracking-wider">Curated Indian Luxury Real Estate</span>
            </div>

            {/* Headline with fluid clamp typography */}
            <h1 className="font-serif text-[clamp(1.75rem,4.5vw+0.5rem,3.75rem)] font-normal text-white max-w-4xl tracking-tight leading-[1.15] text-center w-full min-w-0">
              Find a Place Where Your <br className="hidden sm:inline" />
              <span className="italic font-light text-[#E8DFD0]">Next Chapter Begins.</span>
            </h1>

            {/* Supporting description */}
            <p className="mt-3 sm:mt-5 text-xs sm:text-base lg:text-lg text-stone-300 max-w-2xl font-light leading-relaxed text-center w-full min-w-0 px-2">
              Discreet property advisory, sea-facing penthouses, gated Goan villas, and prime commercial floors in India’s most distinguished addresses.
            </p>

            {/* Property Search Interface Card */}
            <div className="w-full max-w-4xl mt-6 sm:mt-10 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/40 text-left min-w-0 box-border">
              
              {/* Category Selector Tabs (swipeable horizontal strip) */}
              <div className="flex items-center gap-1.5 sm:gap-2 border-b border-[#E8E5DF] pb-3 sm:pb-4 mb-4 overflow-x-auto scrollbar-none flex-nowrap w-full min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('buy')}
                  className={`text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'buy'
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Buy Residence
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('rent')}
                  className={`text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'rent'
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Luxury Lease / Rent
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('commercial')}
                  className={`text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === 'commercial'
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Commercial & Offices
                </button>
              </div>

              {/* Search Form Inputs */}
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center w-full min-w-0">
                
                {/* Location Select */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                    City / Market
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#B99A63] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none pl-9 pr-3 py-2.5 min-h-[44px] rounded-lg text-base sm:text-sm text-[#171717]"
                    >
                      <option value="All Cities">All Cities (India)</option>
                      <option value="Mumbai">Mumbai (Worli, BKC, Bandra)</option>
                      <option value="Delhi NCR">Delhi NCR (Golf Course Rd)</option>
                      <option value="Goa">Goa (Assagao, Candolim)</option>
                      <option value="Bengaluru">Bengaluru (CBD & Indiranagar)</option>
                      <option value="Hyderabad">Hyderabad (Jubilee Hills)</option>
                      <option value="Pune">Pune (Koregaon Park)</option>
                    </select>
                  </div>
                </div>

                {/* Property Type Select */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                    Property Type
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#B99A63] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none pl-9 pr-3 py-2.5 min-h-[44px] rounded-lg text-base sm:text-sm text-[#171717]"
                    >
                      <option value="All Asset Types">All Asset Types</option>
                      <option value="Penthouse">Sky Penthouse</option>
                      <option value="Apartment">Luxury Apartment</option>
                      <option value="Villa">Independent Villa</option>
                      <option value="Independent Floor">Builder Floor</option>
                      <option value="Grade-A Office">Grade-A Office</option>
                      <option value="Retail Showroom">Retail Showroom</option>
                    </select>
                  </div>
                </div>

                {/* Keyword search input */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                    Locality or Keyword
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Sea Face, Private Pool..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      suppressHydrationWarning
                      className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none pl-9 pr-3 py-2.5 min-h-[44px] rounded-lg text-base sm:text-sm text-[#171717] placeholder:text-stone-400"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="sm:col-span-12 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B99A63]" />
                    <span>Verified RERA documentation for every single listing</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#171717] hover:bg-[#B99A63] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-8 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Search Residences</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>

            </div>

          </div>
        </section>

        {/* =========================================================================
            8. FEATURED PROPERTIES SECTION
           ========================================================================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                Curated Portfolio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-1">
                Featured Properties & Penthouses
              </h2>
              <p className="text-sm text-stone-600 mt-2 max-w-xl">
                Handpicked benchmark residences across Mumbai, Delhi NCR, and Goa offering prime locations, verified ownership, and exquisite finishes.
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#171717] hover:text-[#B99A63] uppercase transition-colors"
            >
              <span>View All 16 Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} viewMode="grid" />
            ))}
          </div>
        </section>

        {/* =========================================================================
            9. EXPLORE BY PROPERTY TYPE
           ========================================================================= */}
        <section className="py-16 bg-[#F5F3EF] border-y border-[#E8E5DF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                Specialized Asset Classes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-1">
                Explore by Property Category
              </h2>
              <p className="text-sm text-stone-600 mt-2">
                Tailored discovery for discerning buyers, whether seeking a tranquil coastal estate or an iconic downtown penthouse.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <Link 
                href="/properties?category=luxury_penthouse" 
                className="group bg-white p-6 rounded-xl border border-[#E8E5DF] hover:border-[#B99A63] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] mb-4 group-hover:scale-105 transition-transform">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg text-[#171717] group-hover:text-[#B99A63] transition-colors">
                    Sky Penthouses
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Duplex and triplex residences with private pools, sky gardens, and panoramic city vistas.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-xs text-[#777777]">
                  <span>Worli, BKC, Bengaluru</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B99A63]" />
                </div>
              </Link>

              <Link 
                href="/properties?category=villa" 
                className="group bg-white p-6 rounded-xl border border-[#E8E5DF] hover:border-[#B99A63] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] mb-4 group-hover:scale-105 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg text-[#171717] group-hover:text-[#B99A63] transition-colors">
                    Heritage & Modern Villas
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Portuguese estates in Assagao, private pools in Candolim, and citadels in Jubilee Hills.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-xs text-[#777777]">
                  <span>Goa, Hyderabad</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B99A63]" />
                </div>
              </Link>

              <Link 
                href="/properties?category=commercial" 
                className="group bg-white p-6 rounded-xl border border-[#E8E5DF] hover:border-[#B99A63] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] mb-4 group-hover:scale-105 transition-transform">
                    <Key className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg text-[#171717] group-hover:text-[#B99A63] transition-colors">
                    Commercial & Grade-A
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Institutional office floor plates in BKC, Cyber City, and Connaught Place retail showrooms.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-xs text-[#777777]">
                  <span>BKC, Gurgaon, CP</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B99A63]" />
                </div>
              </Link>

              <Link 
                href="/properties?listingType=rent" 
                className="group bg-white p-6 rounded-xl border border-[#E8E5DF] hover:border-[#B99A63] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] mb-4 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg text-[#171717] group-hover:text-[#B99A63] transition-colors">
                    Executive Leases
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Turn-key furnished apartments and serviced penthouses tailored for expatriates and corporate founders.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-xs text-[#777777]">
                  <span>Bandra, Indiranagar, BKC</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B99A63]" />
                </div>
              </Link>

            </div>
          </div>
        </section>

        {/* =========================================================================
            10. POPULAR LOCATIONS
           ========================================================================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                Geographic Presence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-1">
                India’s Prime Real Estate Markets
              </h2>
              <p className="text-sm text-stone-600 mt-2 max-w-xl">
                Dedicated advisory desks operating in the nation’s highest capital appreciation corridors.
              </p>
            </div>

            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#171717] hover:text-[#B99A63] uppercase transition-colors"
            >
              <span>Explore All Markets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_LOCATIONS.map((loc) => (
              <Link
                key={loc.id}
                href={`/locations/${loc.slug}`}
                className="group relative h-80 rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all"
              >
                <Image
                  src={getOptimizedImageUrl(loc.heroImage, 640, 75)}
                  alt={loc.name}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={SHIMMER_BLUR_DATA_URL}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded">
                  {loc.avgPricePerSqFt}
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] tracking-widest uppercase text-[#C5A869] block mb-1">
                    {loc.state}
                  </span>
                  <h3 className="font-serif text-2xl group-hover:text-[#B99A63] transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                    {loc.tagline}
                  </p>
                  
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-300 pt-3 border-t border-white/20">
                    <span>{loc.activeListingsCount} Active Listings</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Properties <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================================================
            13. FEATURED PROJECTS AND DEVELOPMENTS
           ========================================================================= */}
        <section className="py-20 bg-[#171717] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                  Flagship Collaborations
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white mt-1">
                  Landmark Developments
                </h2>
                <p className="text-sm text-stone-400 mt-2 max-w-xl">
                  Exclusive access to pre-launch allocations, private penthouses, and architectural landmarks with global masterplanners.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#C5A869] hover:text-white uppercase transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SAMPLE_PROJECTS.map((proj) => (
                <div 
                  key={proj.id}
                  className="bg-[#222222] border border-[#333333] hover:border-[#B99A63]/60 rounded-xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <Image
                      src={getOptimizedImageUrl(proj.heroImage, 640, 75)}
                      alt={proj.title}
                      fill
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={SHIMMER_BLUR_DATA_URL}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#171717]/80 text-[#B99A63] text-[10px] tracking-wider uppercase px-2.5 py-1 rounded backdrop-blur-xs font-medium">
                      {proj.status}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-[#B99A63] block mb-1">
                        {proj.locality}, {proj.city}
                      </span>
                      <h3 className="font-serif text-2xl text-white group-hover:text-[#B99A63] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                        {proj.tagline}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#333333] space-y-1.5 text-xs text-stone-300">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Starting From:</span>
                          <span className="font-medium text-white">{proj.priceStartingFrom}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Handover:</span>
                          <span>{proj.completionDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">RERA:</span>
                          <span className="text-stone-400 font-mono text-[11px]">{proj.reraNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#333333] flex items-center justify-between">
                      <Link
                        href={`/projects/${proj.slug}`}
                        className="text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#B99A63] flex items-center gap-1 transition-colors"
                      >
                        <span>Project Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      
                      <a
                        href={getWhatsAppLink(`Hello Signature Aura, please share the confidential brochure and unit plans for ${proj.title}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#B99A63] hover:text-white transition-colors"
                      >
                        Enquire on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            15. STATISTICS SECTION
           ========================================================================= */}
        <section className="py-16 bg-[#FAF9F5] border-b border-[#E8E5DF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
              
              <div className="bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl lg:rounded-none border border-[#E8E5DF] lg:border-0 lg:border-r lg:border-[#E8E5DF] shadow-2xs lg:shadow-none">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] block font-normal">
                  ₹ 4,200+ Cr
                </span>
                <span className="text-[11px] sm:text-xs tracking-widest uppercase text-stone-600 mt-2 block font-medium">
                  Transaction Volume Closed
                </span>
                <p className="text-[11px] text-stone-600 mt-1">Across Prime Indian Corridors</p>
              </div>

              <div className="bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl lg:rounded-none border border-[#E8E5DF] lg:border-0 lg:border-r lg:border-[#E8E5DF] shadow-2xs lg:shadow-none">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] block font-normal">
                  1,200+
                </span>
                <span className="text-[11px] sm:text-xs tracking-widest uppercase text-stone-600 mt-2 block font-medium">
                  Verified Properties Listed
                </span>
                <p className="text-[11px] text-stone-600 mt-1">Freehold & RERA Certified</p>
              </div>

              <div className="bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl lg:rounded-none border border-[#E8E5DF] lg:border-0 lg:border-r lg:border-[#E8E5DF] shadow-2xs lg:shadow-none">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] block font-normal">
                  18+ Years
                </span>
                <span className="text-[11px] sm:text-xs tracking-widest uppercase text-stone-600 mt-2 block font-medium">
                  Institutional Advisory
                </span>
                <p className="text-[11px] text-stone-600 mt-1">Founded & Headquartered in Mumbai</p>
              </div>

              <div className="bg-white lg:bg-transparent p-5 lg:p-0 rounded-xl lg:rounded-none border border-[#E8E5DF] lg:border-0 shadow-2xs lg:shadow-none">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#171717] block font-normal">
                  98.4%
                </span>
                <span className="text-[11px] sm:text-xs tracking-widest uppercase text-stone-600 mt-2 block font-medium">
                  Client Retention Rate
                </span>
                <p className="text-[11px] text-stone-600 mt-1">HNIs, Family Offices & Corporates</p>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            11. WHY CHOOSE OUR COMPANY & 12. ABOUT SECTION
           ========================================================================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=75"
                  alt="Signature Aura™ Corporate Real Estate Office"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={SHIMMER_BLUR_DATA_URL}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating quote card */}
              <div className="absolute -bottom-4 right-2 sm:bottom-4 sm:-right-4 bg-white/95 backdrop-blur-md border border-[#E8E5DF] p-5 sm:p-6 rounded-xl shadow-xl max-w-[260px] sm:max-w-xs hidden sm:block">
                <div className="flex items-center gap-1 text-[#B99A63] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 italic">
                  &ldquo;Signature Aura™ represents discretion, deep market intelligence, and true legal diligence.&rdquo;
                </p>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold block mt-2">
                  Forbes Real Estate Advisory Review
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                  Institutional Heritage & Corporate Trust
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-1 leading-snug">
                  The Gold Standard in Indian Luxury Real Estate Advisory
                </h2>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Headquartered at Millennium Towers in Baner-Sus, Pune, Signature Aura Pvt. Ltd. operates on a foundational mandate: acquiring trophy residential and commercial real estate in India requires absolute transparency, forensic title scrutiny, and white-glove confidentiality.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#B99A63]" />
                    <h4 className="font-medium text-sm text-[#171717]">Forensic Title Diligence</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Every residential and commercial asset undergoes stringent RERA verification and 30-year search report auditing before presentation.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-[#B99A63]" />
                    <h4 className="font-medium text-sm text-[#171717]">Private Off-Market Dossiers</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Access to high-profile penthouses and historical estates sold privately without public listings or media exposure.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users2 className="w-5 h-5 text-[#B99A63]" />
                    <h4 className="font-medium text-sm text-[#171717]">NRI & Global Family Concierge</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Dedicated representation for NRIs in London, Dubai, Singapore, and Silicon Valley covering repatriation, tax structuring, and tenancy.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#B99A63]" />
                    <h4 className="font-medium text-sm text-[#171717]">AI-Powered Precision</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Instant property matching backed by Gemini AI, real-time inventory query, and instant WhatsApp advisor handoff.
                  </p>
                </div>

              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about"
                  className="bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded transition-all shadow"
                >
                  Our Leadership & Story
                </Link>
                <Link
                  href="/services"
                  className="text-xs font-semibold tracking-wider uppercase text-[#171717] hover:text-[#B99A63] transition-colors"
                >
                  Explore Advisory Services →
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            13.B FOUNDING PARTNERS & LEADERSHIP
           ========================================================================= */}
        <section className="py-20 bg-white border-t border-[#E8E5DF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                  Governing Leadership · Signature Aura Pvt. Ltd.
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-1">
                  Founding Partners & Directors
                </h2>
                <p className="text-sm text-stone-600 mt-2 max-w-xl font-light">
                  Decades of combined transactional acumen, legal title diligence, and private wealth representation across Pune and prime Indian markets.
                </p>
              </div>
              <Link
                href="/about"
                className="text-xs font-semibold tracking-wider uppercase text-[#171717] hover:text-[#B99A63] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <span>Read Full Board Dossier</span>
                <ArrowRight className="w-4 h-4 text-[#B99A63]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FOUNDING_PARTNERS.map((partner, i) => (
                <div key={i} className="bg-[#FAF9F5] border border-[#E8E5DF] hover:border-[#B99A63]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between">
                  {/* Photo Space Reserved / Photo Slot */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#171717] flex items-center justify-center">
                    {partner.photo ? (
                      <Image
                        src={partner.photo}
                        alt={partner.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#242424] via-[#1a1a1a] to-[#121212]">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B99A63_1px,transparent_1px)] [background-size:16px_16px]" />
                        
                        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#B99A63]/25 via-[#B99A63]/10 to-transparent border-2 border-[#B99A63]/80 flex items-center justify-center shadow-xl mb-4 group-hover:border-[#B99A63] group-hover:scale-105 transition-all">
                          <span className="font-serif text-2xl sm:text-3xl font-medium tracking-widest text-[#E8D39E]">
                            {partner.initials}
                          </span>
                        </div>

                        <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B99A63]/20 border border-[#B99A63]/40 text-[#D8B978] text-[10px] uppercase font-semibold tracking-wider">
                          <Camera className="w-3 h-3 text-[#B99A63]" />
                          <span>Photo Space Reserved</span>
                        </div>

                        <span className="relative z-10 text-[9px] text-stone-400 uppercase tracking-widest mt-2">
                          Partner Portrait (4:5)
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 left-3 z-10 bg-[#171717]/85 backdrop-blur-xs text-[#E8D39E] text-[10px] font-semibold px-2.5 py-1 rounded border border-[#B99A63]/40 tracking-wider uppercase">
                      Partner & Director
                    </div>
                  </div>

                  {/* Partner Details */}
                  <div className="p-5 flex flex-col">
                    <span className="text-[10px] font-semibold tracking-widest text-[#B99A63] uppercase block mb-1">
                      {partner.market}
                    </span>
                    <h3 className="font-serif text-xl text-[#171717] font-medium leading-snug">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 font-medium">
                      Partner & Director
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            14. TESTIMONIALS SECTION
           ========================================================================= */}
        <section className="py-20 bg-[#F5F3EF] border-t border-[#E8E5DF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                Client Accolades
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-1">
                Trusted by Leaders & Family Offices
              </h2>
              <p className="text-sm text-stone-600 mt-2">
                Uncompromising discretion in high-stakes residential acquisitions and corporate relocations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SAMPLE_TESTIMONIALS.slice(0, 3).map((test) => (
                <div 
                  key={test.id}
                  className="bg-white p-8 rounded-xl border border-[#E8E5DF] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#B99A63] mb-4">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-stone-700 text-sm leading-relaxed italic">
                      &ldquo;{test.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#E8E5DF]">
                    <h4 className="font-semibold text-sm text-[#171717]">{test.clientName}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">{test.designation}</p>
                    {test.propertyPurchased && (
                      <p className="text-[11px] text-[#B99A63] font-medium mt-1">
                        {test.propertyPurchased}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            16. CALL-TO-ACTION & 17. CONTACT SECTION
           ========================================================================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#171717] text-white rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
              
              {/* Background architectural glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#B99A63]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                
                {/* Left Content */}
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                    Connect With Our Advisory Desk
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
                    Begin Your Real Estate Journey With Total Confidence
                  </h2>
                  <p className="text-sm text-stone-300 leading-relaxed font-light">
                    Whether seeking to acquire an extraordinary primary residence, lease a prestigious corporate headquarters in BKC, or schedule a discreet private viewing, our Senior Partners are at your disposal.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4 text-xs">
                    <a
                      href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                      className="inline-flex items-center gap-2 bg-[#B99A63] hover:bg-[#a68853] text-[#171717] font-semibold px-5 py-3 rounded tracking-wider uppercase transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{BUSINESS_CONFIG.phoneNumber}</span>
                    </a>

                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-3 rounded tracking-wider uppercase transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Concierge</span>
                    </a>
                  </div>
                </div>

                {/* Right Form */}
                <div className="lg:col-span-6 bg-white text-[#171717] p-6 sm:p-8 rounded-xl shadow-lg border border-stone-200">
                  <h3 className="font-serif text-xl text-[#171717] mb-1">
                    Direct Inquiry & Callback
                  </h3>
                  <p className="text-xs text-stone-600 mb-5">
                    Submit your requirements for a confidential response within 2 hours.
                  </p>

                  {contactSuccess ? (
                    <div className="py-6 text-center space-y-3 animate-in fade-in">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-serif text-lg text-[#171717]">Inquiry Dispatched</h4>
                      <p className="text-xs text-stone-600">
                        Redirecting you directly to our WhatsApp Advisory Concierge...
                      </p>
                      {redirectWhatsAppUrl && (
                        <a
                          href={redirectWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition-all shadow-sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Open WhatsApp Now
                        </a>
                      )}
                    </div>
                  ) : (
                    <form onSubmit={handleHomeContactSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={homeContact.name}
                          onChange={(e) => setHomeContact({ ...homeContact, name: e.target.value })}
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-stone-700 mb-1">
                            Contact Phone (+91) *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 88056 21111"
                            value={homeContact.phone}
                            onChange={(e) => setHomeContact({ ...homeContact, phone: e.target.value })}
                            suppressHydrationWarning
                            className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-stone-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@domain.com"
                            value={homeContact.email}
                            onChange={(e) => setHomeContact({ ...homeContact, email: e.target.value })}
                            suppressHydrationWarning
                            className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Interest Area
                        </label>
                        <select
                          value={homeContact.service}
                          onChange={(e) => setHomeContact({ ...homeContact, service: e.target.value })}
                          className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                        >
                          <option value="Buying Luxury Residential">Buying Luxury Residential</option>
                          <option value="Executive Rental / Lease">Executive Rental / Lease</option>
                          <option value="Commercial & Office Leasing">Commercial & Office Leasing</option>
                          <option value="Selling or Listing My Property">Selling / Listing My Property</option>
                          <option value="NRI Investment Advisory">NRI Investment Advisory</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Message / Requirements
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Preferred locations, budget, or timelines..."
                          value={homeContact.message}
                          onChange={(e) => setHomeContact({ ...homeContact, message: e.target.value })}
                          className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#171717] hover:bg-[#B99A63] text-white disabled:opacity-50 text-xs font-semibold tracking-wider uppercase py-3 rounded transition-all flex items-center justify-center gap-2 shadow"
                      >
                        {isSubmitting ? 'Registering...' : 'Submit Advisory Request'}
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 18. Professional Footer */}
      <Footer />

      {/* Critical: 4. Floating Contact System (WhatsApp, Phone, Callback Modal, AI Chatbot) */}
      <FloatingContactSystem />

    </div>
  );
}
