'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Building, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  Phone,
  MessageSquare,
  FileDown,
  CheckCircle2,
  Send,
  HardHat,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Activity,
  Layers,
  Eye,
  Camera,
  Check
} from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import SharePageButton from '@/components/common/SharePageButton';
import { SAMPLE_PROJECTS } from '@/lib/data/sample-data';
import { createStoredLead } from '@/lib/client-storage';
import { getWhatsAppLink, createWhatsAppRedirectUrl, redirectToWhatsApp } from '@/lib/config';
import { ProjectDevelopment, ConstructionWorkUpdate } from '@/types/real-estate';

export default function ProjectDetailClient({ 
  slug, 
  initialProject 
}: { 
  slug: string; 
  initialProject?: ProjectDevelopment;
}) {
  const project = initialProject || SAMPLE_PROJECTS.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  const [brochureRequested, setBrochureRequested] = useState(false);
  const [redirectWhatsAppUrl, setRedirectWhatsAppUrl] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gallery filter & Lightbox state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fallback construction updates if not defined
  const updates: ConstructionWorkUpdate[] = project.constructionGallery || [
    {
      id: 'work-1',
      title: 'Active Scaffolding & Site Works',
      category: 'masonry',
      stage: 'On-Site Progress',
      date: 'Live Updates',
      description: 'Active superstructure and facade construction work underway on site.',
      imageUrl: project.heroImage,
      badge: 'Live Site'
    }
  ];

  const filteredUpdates = activeCategory === 'all'
    ? updates
    : updates.filter(u => u.category === activeCategory);

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      createStoredLead({
        fullName: form.name,
        phone: form.phone,
        email: form.email,
        leadSource: 'contact_form',
        propertyTitle: project.title,
        message: `Requested Digital Brochure for development: ${project.title} (${project.locality}, ${project.city})`
      });

      const waUrl = createWhatsAppRedirectUrl({
        title: `PROJECT BROCHURE REQUEST: ${project.title}`,
        fullName: form.name,
        phone: form.phone,
        email: form.email,
        interest: `${project.title} (${project.priceStartingFrom})`,
        location: `${project.locality}, ${project.city}`,
        notes: `Please send the digital brochure, floor plans, and pricing schedule for ${project.title}.`,
        origin: `Project Page: ${project.title}`
      });

      setRedirectWhatsAppUrl(waUrl);
      setBrochureRequested(true);
      redirectToWhatsApp(waUrl);
    } catch {
      // Ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredUpdates.length) % filteredUpdates.length);
  };

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredUpdates.length);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Breadcrumb & Share */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs text-stone-500 mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 max-w-[calc(100%-90px)] sm:max-w-none">
            <Link href="/" className="hover:text-stone-900 transition-colors shrink-0">Home</Link>
            <span aria-hidden="true" className="shrink-0">/</span>
            <Link href="/projects" className="hover:text-stone-900 transition-colors shrink-0">Projects</Link>
            <span aria-hidden="true" className="shrink-0">/</span>
            <span className="text-stone-900 font-medium truncate">{project.title}</span>
          </div>

          <div className="shrink-0">
            <SharePageButton
              title={project.title}
              text={`Discover landmark development ${project.title} by ${project.developer} in ${project.city}`}
              buttonLabel="Share"
              variant="luxury"
              size="sm"
            />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-stone-900 shadow-xl border border-[#E8E5DF] mb-10">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#B99A63] text-white text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
              <HardHat className="w-3.5 h-3.5" />
              {project.status}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-stone-200 text-[11px] px-3 py-1 rounded-full border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B99A63]" />
              MahaRERA: {project.reraNumber}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white max-w-3xl">
            <span className="text-xs tracking-widest text-[#B99A63] uppercase block mb-1">
              {project.developer} · {project.city}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl">{project.title}</h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light">{project.tagline}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Info (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Masterplan Overview */}
            <section className="bg-white border border-[#E8E5DF] rounded-xl p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-2xl text-[#171717] mb-4">Masterplan & Engineering Overview</h2>
              <p className="text-sm text-stone-600 leading-relaxed font-light mb-6">
                {project.overview}
              </p>

              <h3 className="text-xs font-semibold tracking-wider uppercase text-stone-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B99A63]" />
                Architectural & Structural Highlights
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {project.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#B99A63] flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Construction Progress Milestones */}
            {project.constructionMilestones && project.constructionMilestones.length > 0 && (
              <section className="bg-white border border-[#E8E5DF] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-[#B99A63] tracking-widest uppercase block mb-1">
                      Live Engineering Audit
                    </span>
                    <h3 className="font-serif text-2xl text-[#171717]">Construction Progress & Milestones</h3>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
                    <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                    Active Superstructure Casting
                  </div>
                </div>

                <div className="space-y-4">
                  {project.constructionMilestones.map((m, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-stone-800 flex items-center gap-2">
                          {m.status === 'Completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : m.status === 'In Progress' ? (
                            <Clock className="w-4 h-4 text-[#B99A63]" />
                          ) : (
                            <Layers className="w-4 h-4 text-stone-400" />
                          )}
                          {m.stage}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-stone-500 text-xs">{m.targetDate}</span>
                          <span className={`font-semibold text-xs px-2 py-0.5 rounded ${
                            m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            m.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {m.progressPercentage}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Progress track */}
                      <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${
                            m.status === 'Completed' ? 'bg-emerald-600' :
                            m.status === 'In Progress' ? 'bg-[#B99A63]' : 'bg-stone-300'
                          }`}
                          style={{ width: `${m.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 border-t border-[#E8E5DF]">
                  <span>Last engineering site audit completed: March 2026</span>
                  <a
                    href={getWhatsAppLink(`Hello Signature Aura, please share the latest site progress report and construction video for ${project.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-stone-900 font-semibold hover:text-[#B99A63] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Request Live Site Video Walkthrough</span>
                  </a>
                </div>
              </section>
            )}

            {/* Comprehensive Working Works & Construction Gallery */}
            <section className="bg-white border border-[#E8E5DF] rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#B99A63] tracking-widest uppercase block mb-1">
                    On-Site Photographic Evidence
                  </span>
                  <h3 className="font-serif text-2xl text-[#171717]">
                    Working Works & Site Gallery
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
                    Real photographic records of civil structural works, scaffolding, rebar steel casting, and architectural elevation.
                  </p>
                </div>
                
                <span className="text-xs text-stone-500 font-medium">
                  {filteredUpdates.length} Photos
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E5DF] scrollbar-none">
                {[
                  { key: 'all', label: 'All Works' },
                  { key: 'construction', label: 'RCC & Superstructure' },
                  { key: 'masonry', label: 'Masonry & Scaffolding' },
                  { key: 'civil_inspection', label: 'Engineering QA' },
                  { key: 'elevation', label: 'Elevation & Facade' },
                  { key: 'amenities', label: 'Clubhouse & Pool' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveCategory(tab.key)}
                    className={`text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all font-medium ${
                      activeCategory === tab.key
                        ? 'bg-[#171717] text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredUpdates.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(i)}
                    className="group relative bg-[#FAF9F5] border border-[#E8E5DF] hover:border-[#B99A63] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-xs text-[#B99A63] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                        {item.badge}
                      </div>

                      {/* Expand overlay button */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 bg-white/95 text-[#171717] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5 text-[#B99A63]" />
                          Expand Photo
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                          <span className="font-medium text-[#B99A63]">{item.stage}</span>
                          <span>{item.date}</span>
                        </div>
                        <h4 className="font-serif text-base text-[#171717] group-hover:text-[#B99A63] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-[11px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Camera className="w-3 h-3 text-stone-400" />
                          Site Documentation
                        </span>
                        <span className="text-[#B99A63] font-semibold flex items-center gap-1">
                          Inspect <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Site Visit Callout */}
              <div className="p-5 bg-[#FAF9F5] border border-[#E8E5DF] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-[#171717] text-[#B99A63] rounded-lg">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#171717]">Want to inspect ongoing construction in person?</h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Schedule a guided site inspection with our Chief Project Engineer and safety escort.
                    </p>
                  </div>
                </div>

                <a
                  href={getWhatsAppLink(`Hello Signature Aura, I would like to schedule an in-person construction site visit for ${project.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Book Site Visit
                </a>
              </div>
            </section>

          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E8E5DF] rounded-xl p-6 shadow-md space-y-5 sticky top-24">
              <h3 className="font-serif text-xl text-[#171717]">Project Dossier</h3>
              
              <div className="space-y-3 text-xs border-b border-[#E8E5DF] pb-4">
                <div className="flex justify-between">
                  <span className="text-stone-500">Development</span>
                  <span className="font-medium text-[#171717]">{project.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status</span>
                  <span className="font-medium text-[#B99A63]">{project.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Configurations</span>
                  <span className="font-medium text-[#171717]">{project.configurations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Pricing</span>
                  <span className="font-medium text-[#B99A63]">{project.priceStartingFrom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Scheduled Handover</span>
                  <span>{project.completionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">MahaRERA ID</span>
                  <span className="font-mono text-[11px] text-stone-700">{project.reraNumber}</span>
                </div>
              </div>

              {brochureRequested ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-base text-[#171717]">Dossier Dispatched</h4>
                  <p className="text-xs text-stone-600">Redirecting you to our Project Concierge on WhatsApp...</p>
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
                <form onSubmit={handleBrochureSubmit} className="space-y-3">
                  <span className="text-[11px] font-semibold text-stone-600 uppercase block">
                    Download Confidential Brochure & Plans
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3 py-2 rounded text-base sm:text-xs"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="+91 Contact Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3 py-2 rounded text-base sm:text-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Official Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3 py-2 rounded text-base sm:text-xs"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#171717] hover:bg-[#B99A63] text-white py-2.5 rounded text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download Brochure</span>
                  </button>
                </form>
              )}

              <a
                href={getWhatsAppLink(`Hello Signature Aura, I would like to inquire about unit availability and payment schedules for ${project.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 rounded text-xs uppercase tracking-wider font-medium transition-all shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+918805621111"
                className="w-full flex items-center justify-center gap-2 border border-[#E8E5DF] hover:border-[#171717] text-[#171717] py-2 rounded text-xs uppercase tracking-wider font-medium transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#B99A63]" />
                <span>Call Concierge Desk</span>
              </a>
            </div>
          </div>

        </div>

      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredUpdates[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#171717] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <span className="bg-[#B99A63] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded">
                  {filteredUpdates[lightboxIndex].badge}
                </span>
                <span className="text-xs text-stone-400">
                  {filteredUpdates[lightboxIndex].stage} · {filteredUpdates[lightboxIndex].date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 mr-2">
                  {lightboxIndex + 1} / {filteredUpdates.length}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Box */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center">
              <Image
                src={filteredUpdates[lightboxIndex].imageUrl}
                alt={filteredUpdates[lightboxIndex].title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer Description */}
            <div className="p-5 sm:p-6 bg-[#1f1f1f] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg text-white">
                  {filteredUpdates[lightboxIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed max-w-2xl">
                  {filteredUpdates[lightboxIndex].description}
                </p>
              </div>

              <a
                href={getWhatsAppLink(`Hello Signature Aura, I am inquiring about the construction stage "${filteredUpdates[lightboxIndex].title}" for ${project.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingContactSystem />
    </div>
  );
}

