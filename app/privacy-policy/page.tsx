import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BUSINESS_CONFIG } from '@/lib/config';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-10 pb-6 border-b border-[#E8E5DF]">
          <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase block mb-1">
            Statutory & Client Data Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#171717]">
            Privacy Policy & Data Consent
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Last Updated: March 2026 · Compliant with Digital Personal Data Protection (DPDP) Act, India & RERA Norms
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">1. Introduction & Scope</h2>
            <p>
              {BUSINESS_CONFIG.companyName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates as a premier luxury real estate advisory and consultancy in India. We are committed to safeguarding the confidentiality and personal data of our prospective buyers, tenants, property owners, and corporate clients.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">2. Information Collected</h2>
            <p>We collect information you explicitly provide when using our platform, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name, Contact Phone Numbers, and Official Email Addresses</li>
              <li>Investment budget, preferred property configurations (BHK), and locality interests</li>
              <li>Private site visit scheduling preferences and security gate clearance requirements</li>
              <li>Communications exchanged via our AI Property Assistant, WhatsApp, and contact forms</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">3. Purpose of Processing & Consent</h2>
            <p>
              By submitting an inquiry or scheduling a viewing, you consent to our designated Senior Advisors contacting you via phone, email, or WhatsApp strictly to deliver property dossiers, title audit summaries, and site visit schedules. We maintain strict non-disclosure principles. We do not sell or lease your personal information to third-party commercial marketing aggregators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">4. RERA & Statutory Compliance</h2>
            <p>
              All property transactions and disclosures adhere strictly to the Real Estate (Regulation and Development) Act, 2016 (RERA) and state regulatory bodies (MahaRERA, Haryana RERA, Goa RERA, Karnataka RERA).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#171717] font-medium">5. Contact & Grievance Redressal</h2>
            <p>
              For privacy queries, trademark matters, or data access requests, contact our Compliance & Legal Officer at {BUSINESS_CONFIG.email}, call {BUSINESS_CONFIG.phoneNumber}, or by post at {BUSINESS_CONFIG.officeAddress}, {BUSINESS_CONFIG.city}, {BUSINESS_CONFIG.state} {BUSINESS_CONFIG.pincode}.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
