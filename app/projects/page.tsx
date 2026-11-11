import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building, MapPin, ArrowUpRight, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import { SAMPLE_PROJECTS } from '@/lib/data/sample-data';
import { getWhatsAppLink } from '@/lib/config';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase block mb-2">
            Flagship Developments
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] leading-tight">
            Curated Architectural Developments & Estates
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            Signature Aura Baner (Pune) and Aura Sky (Mumbai) — active on-site construction, prime connectivity, verified MahaRERA certifications, and direct developer pricing.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {SAMPLE_PROJECTS.map((proj) => (
            <div 
              key={proj.id}
              className="bg-white border border-[#E8E5DF] hover:border-[#B99A63] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 group"
            >
              {/* Image col */}
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-900">
                <Image
                  src={proj.heroImage}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#171717]/80 text-[#B99A63] text-xs font-medium uppercase tracking-wider px-3 py-1 rounded backdrop-blur-xs">
                  {proj.status}
                </div>
              </div>

              {/* Info col */}
              <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#777777] mb-2">
                    <span className="text-[#B99A63] font-medium">{proj.developer}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.locality}, {proj.city}</span>
                  </div>

                  <h2 className="font-serif text-3xl text-[#171717] group-hover:text-[#B99A63] transition-colors">
                    {proj.title}
                  </h2>
                  <p className="text-xs text-stone-500 italic mt-1">{proj.tagline}</p>

                  <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed font-light">
                    {proj.overview}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-5 pt-4 border-t border-[#E8E5DF] space-y-2">
                    {proj.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="text-[#B99A63] font-bold">―</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8E5DF] grid grid-cols-2 gap-4 text-xs text-stone-700">
                    <div>
                      <span className="text-stone-500 block">Configurations</span>
                      <span className="font-medium text-[#171717] block mt-0.5">{proj.configurations}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Price Guide</span>
                      <span className="font-medium text-[#B99A63] block mt-0.5">{proj.priceStartingFrom}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8E5DF] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-2 bg-[#171717] group-hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded transition-all"
                  >
                    <span>View Development Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={getWhatsAppLink(`Hello, please share the floor plans and payment schedule for ${proj.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    WhatsApp Brochure
                  </a>
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
