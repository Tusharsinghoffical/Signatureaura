import React from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BUSINESS_CONFIG } from '@/lib/config';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-10 pb-6 border-b border-[#E8E5DF]">
          <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase block mb-1">
            Statutory Agreement
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
            Terms and Conditions
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Applicable to all visitors, buyers, sellers, and corporate clients
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">1. Nature of Advisory Services</h2>
            <p>
              {BUSINESS_CONFIG.companyName} acts as a professional luxury real estate consultancy and advisory firm. The information, square footage metrics, floor plans, and pricing presented on this website are provided for discovery and evaluation purposes. Binding legal transactions occur solely upon execution of formal Sale Agreements, Registered Agreements for Sale, or registered Lease Deeds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">2. Property Verification & Disclaimers</h2>
            <p>
              While we exercise reasonable diligence to confirm that every listing is RERA approved and title cleared, prospective purchasers and tenants are encouraged to conduct independent structural audits, municipal sanction reviews, and advocate title searches. Carpet areas are calculated as per RERA statutory guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">3. Intellectual Property & Trademark Protection</h2>
            <p>
              &ldquo;Signature Aura&rdquo; and the Signature Aura logo/insignia (Signature Aura™) are registered proprietary trademarks and intellectual property of Signature Aura Pvt. Ltd. All architectural photography, branding, website code, visual media, market dossiers, and proprietary property descriptions are protected under Indian intellectual property laws, including the Trade Marks Act, 1999 and the Copyright Act, 1957. Unauthorized reproduction, digital scraping, imitation, reverse-engineering, or commercial exploitation is strictly prohibited and will be prosecuted under statutory law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">4. Corporate Status & Jurisdiction</h2>
            <p>
              Signature Aura Pvt. Ltd. is a duly incorporated Private Limited Company in the State of Maharashtra, India (Registered Office: Office No. 812, Millennium Towers, Near Nanaware Bridge, Baner-Sus Road, Pune 411021). These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of the use of this service shall be subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
