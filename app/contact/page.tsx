'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  Building,
  Sparkles
} from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import { BUSINESS_CONFIG, getWhatsAppLink } from '@/lib/config';
import { createStoredLead } from '@/lib/client-storage';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get('subject') || 'General Property Inquiry';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: initialSubject,
    preferredLocation: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectWhatsAppUrl, setRedirectWhatsAppUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // Construct ultra-detailed, professional WhatsApp inquiry message
    const formattedWhatsAppText = 
`🏛️ *NEW ADVISORY INQUIRY | SIGNATURE AURA™*
━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${formData.fullName.trim()}
📞 *Contact Phone:* ${formData.phone.trim()}
✉️ *Official Email:* ${formData.email.trim()}
🏢 *Service Area:* ${formData.subject}
📍 *Preferred Location:* ${formData.preferredLocation.trim() || 'Flexible / Pan-India'}
💰 *Target Budget:* ${formData.budget || 'To be discussed with Advisor'}
━━━━━━━━━━━━━━━━━━━━━━━━━
📝 *Client Message & Requirements:*
"${formData.message.trim() || 'I am interested in exploring exclusive residential / commercial opportunities with your advisory team.'}"
━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 *Origin:* Signature Aura™ Contact Portal`;

    const cleanNumber = (BUSINESS_CONFIG.whatsappNumber || '918805621111').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedWhatsAppText)}`;
    setRedirectWhatsAppUrl(whatsappUrl);

    createStoredLead({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      leadSource: 'contact_form',
      budget: formData.budget || 'Not specified',
      preferredLocation: formData.preferredLocation || 'India',
      message: `Subject: ${formData.subject}\n${formData.message}`
    });
    setIsSubmitting(false);
    setIsSuccess(true);
    window.location.href = whatsappUrl;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* Left Column: Office details, Hours, Direct channels */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase block mb-1">
            Global & Domestic Concierge Desk
          </span>
          <h2 className="font-serif text-3xl text-[#171717]">
            Connect With Our Partners
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light leading-relaxed">
            Our corporate headquarters in Baner-Sus, Pune and regional advisory partner network operate with the highest standards of discretion and client responsiveness.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4 text-xs sm:text-sm">
          
          <div className="p-5 bg-white border border-[#E8E5DF] rounded-xl flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-[#171717]">Pune Corporate Headquarters</h4>
              <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                {BUSINESS_CONFIG.officeAddress}, {BUSINESS_CONFIG.city}, {BUSINESS_CONFIG.state} {BUSINESS_CONFIG.pincode}
              </p>
              <p className="text-[11px] text-[#B99A63] font-medium mt-1">
                Landmark: Near Nanaware Bridge, Baner-Sus · Office No. 812, Millennium Towers
              </p>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#E8E5DF] rounded-xl flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-[#171717]">Direct Telephony</h4>
              <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="text-stone-700 hover:text-[#B99A63] text-xs mt-1 block">
                VIP Desk: {BUSINESS_CONFIG.phoneNumber}
              </a>
              <span className="text-[11px] text-stone-500 block mt-0.5">International calling & concierge support</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#E8E5DF] rounded-xl flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-emerald-600 flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-[#171717]">Instant WhatsApp Advisory</h4>
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 text-xs font-medium mt-1 block"
              >
                Chat directly on WhatsApp →
              </a>
              <span className="text-[11px] text-stone-500 block mt-0.5">Instant brochure delivery and private viewings</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#E8E5DF] rounded-xl flex items-start gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-[#171717]">Operating Hours</h4>
              <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                {BUSINESS_CONFIG.businessHours}
              </p>
            </div>
          </div>

        </div>

        {/* Regulatory note */}
        <div className="p-4 bg-[#F5F3EF] border border-[#E8E5DF] rounded-xl text-xs text-stone-600 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B99A63] flex-shrink-0" />
          <span>Certified luxury real estate advisory adhering to statutory standards.</span>
        </div>

      </div>

      {/* Right Column: Interactive Contact Form */}
      <div className="lg:col-span-7">
        <div className="bg-white border border-[#E8E5DF] rounded-2xl p-8 sm:p-10 shadow-lg">
          <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase block mb-1">
            Confidential Consultation
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#171717]">
            Send an Advisory Inquiry
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-6">
            Please share your acquisition, tenancy, or property disposal requirements.
          </p>

          {isSuccess ? (
            <div className="py-12 text-center space-y-4 bg-emerald-50/70 rounded-xl p-6 border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-2xl text-[#171717]">Inquiry Registered & Sent to VIP Desk</h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Thank you for contacting Signature Aura™. Your inquiry details have been forwarded to our VIP WhatsApp advisory desk. An advisor will also reach you via phone and email within two business hours.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={redirectWhatsAppUrl || `https://wa.me/${(BUSINESS_CONFIG.whatsappNumber || '918805621111').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Open WhatsApp Chat
                </a>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#B99A63] underline underline-offset-4"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Contact Phone (+91) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 88056 21111"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-[#171717]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@familyoffice.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Service Area / Inquiry Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-[#171717]"
                  >
                    <option value="Residential Property Acquisition">Residential Property Acquisition</option>
                    <option value="Commercial & Office Leasing">Commercial & Office Leasing</option>
                    <option value="Luxury Lease / Rent">Luxury Lease / Rent</option>
                    <option value="Listing & Selling My Property">Listing / Selling My Property</option>
                    <option value="NRI Advisory & Repatriation">NRI Advisory & Repatriation</option>
                    <option value="General Property Inquiry">General Property Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Preferred Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Worli Sea Face, Assagao, Golf Course Rd..."
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    suppressHydrationWarning
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Target Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-[#171717]"
                  >
                    <option value="">Select Range</option>
                    <option value="₹ 5 Cr – ₹ 10 Cr">₹ 5 Cr – ₹ 10 Cr</option>
                    <option value="₹ 10 Cr – ₹ 20 Cr">₹ 10 Cr – ₹ 20 Cr</option>
                    <option value="₹ 20 Cr – ₹ 50 Cr">₹ 20 Cr – ₹ 50 Cr</option>
                    <option value="₹ 50 Cr+ Trophy Asset">₹ 50 Cr+ Trophy Asset</option>
                    <option value="Luxury Lease (₹ 2L - ₹ 10L / mo)">Luxury Lease (₹ 2L - ₹ 10L / mo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Message / Specific Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details regarding unit configurations, possession timeline, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded-lg text-base sm:text-sm text-[#171717]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-stone-500">
                  Strict non-disclosure protocol observed.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#171717] hover:bg-[#B99A63] text-white disabled:opacity-50 text-xs font-semibold tracking-wider uppercase px-8 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow"
                >
                  {isSubmitting ? 'Registering...' : 'Submit Inquiry'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Suspense fallback={<div className="text-center py-12">Loading Contact Desk...</div>}>
          <ContactFormContent />
        </Suspense>

        {/* Google Maps Embed Section */}
        <div className="mt-16 bg-white border border-[#E8E5DF] rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-serif text-xl text-[#171717]">
                Pune Corporate Headquarters Location
              </h3>
              <p className="text-xs text-stone-500">
                Office No. 812, Millennium Towers, Near Nanaware Bridge, Baner-Sus, Pune, Maharashtra 411021
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#B99A63] hover:text-[#171717] font-medium"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/8] w-full rounded-xl overflow-hidden bg-stone-200 border border-[#E8E5DF]">
            <iframe
              title="Signature Aura Pune Headquarters Map"
              src="https://maps.google.com/maps?q=Millennium+Towers+Baner+Sus+Road+Pune+411021&z=15&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </main>

      <Footer />
      <FloatingContactSystem />
    </div>
  );
}
