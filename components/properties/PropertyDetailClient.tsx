'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Check, 
  Layers, 
  Sparkles, 
  Share2, 
  Maximize,
  CheckCircle2,
  Send,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import SiteVisitModal from '@/components/properties/SiteVisitModal';
import PropertyCard from '@/components/properties/PropertyCard';
import SharePageButton from '@/components/common/SharePageButton';
import { SAMPLE_PROPERTIES } from '@/lib/data/sample-data';
import { getWhatsAppLink, createWhatsAppRedirectUrl, redirectToWhatsApp } from '@/lib/config';
import { Property } from '@/types/real-estate';
import { createStoredLead } from '@/lib/client-storage';

const resolvePartnerPhoto = (name?: string, fallbackPhoto?: string) => {
  if (!name) return fallbackPhoto || '/assets/team/rakesh-desale-patil.jpg';
  const lower = name.toLowerCase();
  if (lower.includes('rakesh')) return '/assets/team/rakesh-desale-patil.jpg';
  if (lower.includes('uma')) return '/assets/team/uma-bhandwalkar.jpg';
  if (lower.includes('akshay')) return '/assets/team/akshay-bhote.jpg';
  if (lower.includes('rama')) return '/assets/team/rama-bhote.jpg';
  return fallbackPhoto || '/assets/team/rakesh-desale-patil.jpg';
};

export default function PropertyDetailClient({ 
  slug, 
  initialProperty 
}: { 
  slug: string; 
  initialProperty?: Property;
}) {
  const property = initialProperty || SAMPLE_PROPERTIES.find(p => p.slug === slug);

  if (!property) {
    notFound();
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);

  const handlePrevImage = useCallback(() => {
    setActiveImageIndex(prev => (prev === 0 ? property.images.length - 1 : prev - 1));
  }, [property.images.length]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex(prev => (prev === property.images.length - 1 ? 0 : prev + 1));
  }, [property.images.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      else if (e.key === 'ArrowLeft') handlePrevImage();
      else if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrevImage, handleNextImage]);

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredVisitDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [redirectWhatsAppUrl, setRedirectWhatsAppUrl] = useState('');
  const [enquiryError, setEnquiryError] = useState('');

  const similar = SAMPLE_PROPERTIES.filter(p => 
    p.id !== property.id && 
    p.isPublished && 
    (p.location.city === property.location.city || p.category === property.category || p.listingType === property.listingType)
  ).slice(0, 3);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEnquiryError('');

    try {
      createStoredLead({
        ...enquiryForm,
        leadSource: 'property_enquiry',
        propertyId: property.id,
        propertyTitle: property.title,
        preferredLocation: `${property.location.locality}, ${property.location.city}`,
        budget: property.priceDisplay
      });

      const waUrl = createWhatsAppRedirectUrl({
        title: `PROPERTY INQUIRY: ${property.title}`,
        fullName: enquiryForm.fullName,
        phone: enquiryForm.phone,
        email: enquiryForm.email,
        interest: `${property.title} (${property.priceDisplay})`,
        location: `${property.location.locality}, ${property.location.city}`,
        budget: property.priceDisplay,
        preferredDate: enquiryForm.preferredVisitDate,
        notes: enquiryForm.message || `Please share full floor plans, pricing breakup, and arrange viewing for ${property.title}.`,
        origin: `Property Listing: ${property.title}`
      });

      setRedirectWhatsAppUrl(waUrl);
      setEnquirySuccess(true);
      redirectToWhatsApp(waUrl);
    } catch {
      setEnquiryError('Could not record enquiry. Please connect via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectHref = getWhatsAppLink(
    undefined, 
    property.title, 
    `/properties/${property.slug}`
  );

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col selection:bg-[#B99A63]/20">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:py-8 w-full">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-6 text-xs text-stone-500">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 max-w-[calc(100%-90px)] sm:max-w-none">
            <Link href="/" className="hover:text-stone-900 transition-colors shrink-0">Home</Link>
            <span aria-hidden="true" className="shrink-0">/</span>
            <Link href="/properties" className="hover:text-stone-900 transition-colors shrink-0">Properties</Link>
            <span aria-hidden="true" className="shrink-0">/</span>
            <span className="text-[#171717] font-medium truncate">{property.title}</span>
          </div>

          <div className="shrink-0">
            <SharePageButton
              title={property.title}
              text={`Explore ${property.title} at ${property.location.locality}, ${property.location.city} with Signature Aura Developers`}
              buttonLabel="Share"
              variant="luxury"
              size="sm"
            />
          </div>
        </div>

        {/* 1. Large Image Gallery */}
        <section className="mb-10">
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="group relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-[#0D0D0F] shadow-2xl border border-stone-800 cursor-zoom-in"
          >
            <Image
              src={property.images[activeImageIndex]?.url || property.images[0]?.url}
              alt={property.title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Caption Overlay */}
            <div className="absolute bottom-5 left-5 bg-[#0D0D0F]/85 backdrop-blur-md text-white text-xs px-4 py-2 rounded border border-white/10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63]" />
              <span>{property.images[activeImageIndex]?.caption || property.title}</span>
            </div>

            {/* Badges on Gallery */}
            <div className="absolute top-5 left-5 flex gap-2">
              <span className="bg-[#0D0D0F]/90 text-white text-xs px-3.5 py-1.5 rounded font-medium backdrop-blur-md border border-white/10">
                For {property.listingType === 'buy' ? 'Sale' : 'Lease'}
              </span>
              {property.isFeatured && (
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#B99A63] text-stone-950 font-bold text-xs px-3.5 py-1.5 rounded shadow-lg">
                  Signature Trophy Listing
                </span>
              )}
            </div>

            {/* Expand / View All Photos Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="absolute bottom-5 right-5 bg-[#0D0D0F]/90 hover:bg-[#B99A63] hover:text-stone-950 text-white text-xs font-semibold px-4 py-2 rounded-lg backdrop-blur-md border border-white/15 flex items-center gap-2 transition-all shadow-xl group-hover:border-[#B99A63]"
            >
              <Maximize className="w-3.5 h-3.5" />
              <span>Full Screen Gallery ({property.images.length})</span>
            </button>
          </div>

          {/* Thumbnail Strip */}
          {property.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#B99A63] ring-2 ring-[#B99A63]/40 scale-102 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.caption || `Thumbnail ${idx}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-white px-1 rounded">
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Main Content & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Details, Specs, Amenities, Location (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 2 & 3. Header & Price Block */}
            <div className="border-b border-[#E8E5DF] pb-6">
              <div className="flex items-center gap-2 text-xs text-[#777777] mb-2">
                <span>{property.propertyType}</span>
                <span aria-hidden="true">·</span>
                <span>ID: {property.id}</span>
                {property.reraNumber && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#B99A63] font-mono">RERA: {property.reraNumber}</span>
                  </>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] leading-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-stone-600 mt-2 text-sm">
                <MapPin className="w-4 h-4 text-[#B99A63] flex-shrink-0" />
                <span>{property.location.address}</span>
              </div>

              {/* Price Callout */}
              <div className="mt-6 flex flex-wrap items-baseline gap-4 pt-4 border-t border-[#E8E5DF]">
                <div>
                  <span className="text-xs text-stone-500 uppercase tracking-wider block">Asking Price</span>
                  <span className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal">
                    {property.priceDisplay}
                  </span>
                </div>
                {property.pricePerSqFt > 0 && (
                  <span className="text-xs text-stone-500">
                    (₹ {property.pricePerSqFt.toLocaleString('en-IN')} / sq.ft.)
                  </span>
                )}
                <div className="ml-auto flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded">
                  <Check className="w-3.5 h-3.5" />
                  <span>Immediate Availability</span>
                </div>
              </div>
            </div>

            {/* Key Specifications Grid */}
            <section className="bg-white border border-[#E8E5DF] rounded-xl p-6 shadow-xs">
              <h2 className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase mb-4">
                Architectural Specifications
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#171717]">
                <div className="space-y-1">
                  <span className="text-stone-500 block">Bedrooms</span>
                  <div className="flex items-center gap-1.5 font-medium text-sm">
                    <Bed className="w-4 h-4 text-[#B99A63]" />
                    <span>{property.bedrooms > 0 ? `${property.bedrooms} Ensuite` : 'Open Plan'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 block">Bathrooms</span>
                  <div className="flex items-center gap-1.5 font-medium text-sm">
                    <Bath className="w-4 h-4 text-[#B99A63]" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 block">Carpet Area</span>
                  <div className="flex items-center gap-1.5 font-medium text-sm">
                    <Maximize2 className="w-4 h-4 text-[#B99A63]" />
                    <span>{property.carpetAreaSqFt.toLocaleString('en-IN')} sq.ft.</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 block">Super Built-Up</span>
                  <div className="flex items-center gap-1.5 font-medium text-sm">
                    <Layers className="w-4 h-4 text-[#B99A63]" />
                    <span>{property.superAreaSqFt.toLocaleString('en-IN')} sq.ft.</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 block">Floor Position</span>
                  <span className="font-medium text-sm block">
                    Floor {property.floor} of {property.totalFloors}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 block">Furnishing</span>
                  <span className="font-medium text-sm block">{property.furnishing}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 block">Dedicated Parking</span>
                  <span className="font-medium text-sm block">{property.parking}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-500 block">Property Age</span>
                  <span className="font-medium text-sm block">{property.propertyAge}</span>
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-[#171717]">
                Property Overview
              </h2>
              <div className="text-sm text-stone-700 leading-relaxed space-y-3 font-light">
                <p>{property.description}</p>
                <p>
                  Every detail has been curated to meet international standards of acoustic silence, thermal comfort, and privacy. The property enjoys double height ceilings, floor-to-ceiling soundproof glazing, and state-of-the-art climate control.
                </p>
              </div>

              {/* Highlights bullets */}
              {property.highlightFeatures && (
                <div className="pt-2 space-y-2">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-stone-900">
                    Key Distinctions
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {property.highlightFeatures.map((hf, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#B99A63] flex-shrink-0 mt-0.5" />
                        <span>{hf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Amenities */}
            <section className="bg-white border border-[#E8E5DF] rounded-xl p-6 shadow-xs space-y-4">
              <h2 className="font-serif text-2xl text-[#171717]">
                Curated Amenities & Facilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-800 p-2.5 bg-[#FAF9F5] border border-[#E8E5DF] rounded">
                    <Sparkles className="w-3.5 h-3.5 text-[#B99A63] flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Google Maps Location & Nearby Facilities */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-[#171717]">
                Location & Neighbourhood
              </h2>
              <p className="text-xs text-stone-600">
                Situated in {property.location.locality}, {property.location.city}. Landmark: {property.location.landmark || 'Prime Urban Enclave'}.
              </p>

              {/* Interactive Map Card */}
              <div className="relative aspect-[16/7] w-full rounded-xl overflow-hidden bg-stone-200 border border-[#E8E5DF] flex items-center justify-center">
                <iframe
                  title="Property Location Map"
                  src={`https://maps.google.com/maps?q=${property.location.lat},${property.location.lng}&z=14&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Nearby Facilities */}
              {property.nearbyFacilities && property.nearbyFacilities.length > 0 && (
                <div className="pt-4 space-y-2">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-stone-900">
                    Proximity & Connectivity
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {property.nearbyFacilities.map((fac, i) => (
                      <div key={i} className="p-3 bg-white border border-[#E8E5DF] rounded">
                        <span className="text-[11px] text-stone-500 block capitalize">{fac.type}</span>
                        <span className="font-medium text-stone-900 block truncate mt-0.5">{fac.name}</span>
                        <span className="text-[10px] text-[#B99A63] font-medium block mt-1">{fac.distance} away</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Assigned Partner Profile */}
            <section className="bg-white border border-[#E8E5DF] rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-stone-200 flex-shrink-0 border-2 border-[#B99A63]/50 shadow-sm">
                  <Image
                    src={resolvePartnerPhoto(property.agent.name, property.agent.photo)}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider text-[#B99A63] uppercase block">
                    Listing Partner
                  </span>
                  <h3 className="font-serif text-lg text-[#171717]">{property.agent.name}</h3>
                  <p className="text-xs text-stone-500">{property.agent.title} · {property.agent.experienceYears} Years Exp.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Partner</span>
                </a>
                <a
                  href={whatsappDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Lead Capture & Schedule Visit Widget (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-white border border-[#E8E5DF] rounded-xl p-6 shadow-lg space-y-6">
              
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                  Advisory Dossier
                </span>
                <h3 className="font-serif text-xl text-[#171717] mt-1">
                  Enquire on this Residence
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Receive detailed floor plans, pricing breakdowns, and title audit reports.
                </p>
              </div>

              {/* Direct Fast Actions */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsSiteVisitOpen(true)}
                  className="bg-[#171717] hover:bg-[#B99A63] text-white font-medium py-2.5 px-3 rounded flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#B99A63]" />
                  <span>Schedule Visit</span>
                </button>

                <a
                  href={whatsappDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-3 rounded flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Now</span>
                </a>
              </div>

              {/* Enquiry Form */}
              {enquirySuccess ? (
                <div className="py-6 text-center space-y-3 bg-emerald-50 rounded-lg p-4 border border-emerald-200 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-base text-[#171717]">Inquiry Dispatched</h4>
                  <p className="text-xs text-stone-600">
                    Redirecting you to our Senior Property Consultant on WhatsApp...
                  </p>
                  {redirectWhatsAppUrl && (
                    <a
                      href={redirectWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold py-2.5 px-3 rounded-lg shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Open WhatsApp Now
                    </a>
                  )}
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3.5 pt-2 border-t border-[#E8E5DF]">
                  {enquiryError && (
                    <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                      {enquiryError}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={enquiryForm.fullName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                      suppressHydrationWarning
                      className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Phone Number (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 88056 21111"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      suppressHydrationWarning
                      className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      suppressHydrationWarning
                      className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Preferred Viewing Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={enquiryForm.preferredVisitDate}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, preferredVisitDate: e.target.value })}
                      suppressHydrationWarning
                      className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                      Specific Inquiries
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Request floor plan, maintenance charges, payment schedule..."
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3 py-2 rounded text-base sm:text-xs text-[#171717]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#171717] hover:bg-[#B99A63] text-white disabled:opacity-50 text-xs font-semibold tracking-wider uppercase py-3 rounded transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    {isSubmitting ? 'Registering...' : 'Submit Inquiry'}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="pt-2 text-center text-[11px] text-stone-500">
                <p>Strict non-disclosure protocol observed. RERA registered consultant.</p>
              </div>

            </div>
          </div>

        </div>

        {/* Similar Properties Section */}
        {similar.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#E8E5DF]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                  Curated Recommendations
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] mt-1">
                  Similar Benchmark Properties
                </h2>
              </div>
              <Link
                href="/properties"
                className="text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#B99A63] transition-colors"
              >
                View Full Collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {similar.map(p => (
                <PropertyCard key={p.id} property={p} viewMode="grid" />
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
      <FloatingContactSystem />

      {/* Fullscreen Interactive Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#0D0D0F]/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 h-[100dvh] pb-safe animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-3 text-white border-b border-stone-800 pb-3 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <span className="font-serif text-sm sm:text-base md:text-lg text-white font-medium truncate">
                {property.title}
              </span>
              <span className="text-xs bg-stone-800 text-[#B99A63] font-mono px-2.5 py-0.5 sm:py-1 rounded-full border border-stone-700 shrink-0 whitespace-nowrap">
                {activeImageIndex + 1} / {property.images.length}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setIsSiteVisitOpen(true);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#B99A63] hover:bg-[#D4AF37] text-stone-950 text-xs font-semibold rounded transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Viewing</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors shrink-0"
                aria-label="Close fullscreen gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage */}
          <div className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden w-full">
            {/* Left Nav Button (only when multiple images) */}
            {property.images.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-6 z-10 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#B99A63] hover:text-stone-950 text-white backdrop-blur-md transition-all border border-white/10 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Current Image Container */}
            <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center">
              <Image
                src={property.images[activeImageIndex]?.url || property.images[0]?.url}
                alt={property.images[activeImageIndex]?.caption || property.title}
                fill
                priority
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Nav Button (only when multiple images) */}
            {property.images.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 sm:right-6 z-10 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#B99A63] hover:text-stone-950 text-white backdrop-blur-md transition-all border border-white/10 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Caption and Thumbnails */}
          <div className="border-t border-stone-800 pt-2.5 sm:pt-3 shrink-0">
            <div className="text-center text-xs text-stone-400 mb-2 sm:mb-3 flex items-center justify-center gap-2 px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] shrink-0" />
              <span className="text-stone-200 font-medium truncate max-w-xs sm:max-w-md">
                {property.images[activeImageIndex]?.caption || property.title}
              </span>
              <span className="text-stone-500 hidden sm:inline">· Press Esc to exit or use arrow keys</span>
            </div>

            {property.images.length > 1 && (
              <div className="flex gap-2 justify-center overflow-x-auto pb-1 max-w-4xl mx-auto scrollbar-thin px-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 sm:w-16 h-10 sm:h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#B99A63] scale-105 opacity-100 ring-2 ring-[#B99A63]/50'
                        : 'border-stone-800 opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.caption || `Thumbnail ${idx}`}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dedicated Site Visit Modal */}
      <SiteVisitModal
        isOpen={isSiteVisitOpen}
        onClose={() => setIsSiteVisitOpen(false)}
        property={property}
      />
    </div>
  );
}
