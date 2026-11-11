'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Bot,
  BotMessageSquare,
  Calendar
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppLink, createWhatsAppRedirectUrl, redirectToWhatsApp } from '@/lib/config';
import { createStoredLead } from '@/lib/client-storage';
import PropertyAssistantModal from '@/components/chatbot/PropertyAssistantModal';

export default function FloatingContactSystem() {
  const pathname = usePathname();
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredLocation: '',
    budget: '',
    message: '',
    website_url_check: '' // Honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [redirectWhatsAppUrl, setRedirectWhatsAppUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const pagePropertyTitle = typeof document !== 'undefined' && pathname.startsWith('/properties/')
    ? document.querySelector('h1')?.textContent || undefined
    : undefined;

  useEffect(() => {
    if (isCallbackModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCallbackModalOpen]);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      createStoredLead({
        ...formData,
        leadSource: 'callback_modal',
        propertyTitle: pagePropertyTitle || 'General Advisory Request',
      });

      const waUrl = createWhatsAppRedirectUrl({
        title: 'VIP CALLBACK REQUEST',
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        interest: pagePropertyTitle || 'General VIP Advisory Callback',
        location: formData.preferredLocation,
        budget: formData.budget,
        notes: formData.message || 'Requesting a confidential callback from Senior Advisory Desk.',
        origin: 'VIP Callback Modal'
      });

      setRedirectWhatsAppUrl(waUrl);
      setSubmitSuccess(true);
      redirectToWhatsApp(waUrl);

      setTimeout(() => {
        setIsCallbackModalOpen(false);
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          preferredLocation: '',
          budget: '',
          message: '',
          website_url_check: ''
        });
      }, 4000);
    } catch {
      setErrorMessage('Could not record callback request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappHref = getWhatsAppLink(
    undefined, 
    pagePropertyTitle, 
    pathname !== '/' ? pathname : undefined
  );

  return (
    <>
      {/* =========================================================================
          DESKTOP FLOATING ACTION STACK (Hidden on mobile < md)
         ========================================================================= */}
      {/* =========================================================================
          DESKTOP FLOATING ACTION STACK (Hidden on mobile < md or when chat is open)
         ========================================================================= */}
      {!isChatModalOpen && !isCallbackModalOpen && (
        <aside aria-label="Quick contact tools" className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto animate-in fade-in">
          
          {/* 1. AI Property Assistant Launcher */}
          <div className="relative group">
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#171717] text-white text-xs px-2.5 py-1.5 rounded tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-stone-800">
              Ask AI Property Assistant
            </div>
            <button
              onClick={() => setIsChatModalOpen(true)}
              aria-label="Ask AI Property Assistant"
              className="touch-manipulation w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-[#171717] hover:bg-[#222222] text-[#B99A63] hover:text-[#D4AF37] flex items-center justify-center shadow-xl border-2 border-[#B99A63] hover:scale-105 transition-all relative active:scale-95 group/btn"
            >
              <BotMessageSquare className="w-6 h-6 text-[#E8D39E] group-hover/btn:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B99A63] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#B99A63] border-2 border-[#171717]"></span>
              </span>
            </button>
          </div>

          {/* 2. Instant Callback / Quick Enquiry */}
          <div className="relative group">
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#171717] text-white text-xs px-2.5 py-1.5 rounded tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-stone-800">
              Request VIP Callback
            </div>
            <button
              onClick={() => setIsCallbackModalOpen(true)}
              aria-label="Request VIP Callback"
              className="touch-manipulation w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white hover:bg-[#FAF9F5] text-[#171717] border border-[#E8E5DF] flex items-center justify-center shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              <Mail className="w-5 h-5 text-[#B99A63]" />
            </button>
          </div>

          {/* 3. Direct Phone Call */}
          <div className="relative group">
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#171717] text-white text-xs px-2.5 py-1.5 rounded tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-stone-800">
              Call Concierge ({BUSINESS_CONFIG.phoneNumber})
            </div>
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              aria-label="Call concierge"
              className="touch-manipulation w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white hover:bg-[#FAF9F5] text-[#171717] border border-[#E8E5DF] flex items-center justify-center shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              <Phone className="w-5 h-5 text-[#171717]" />
            </a>
          </div>

          {/* 4. WhatsApp Official Floating Button */}
          <div className="relative group">
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#171717] text-white text-xs px-2.5 py-1.5 rounded tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-stone-800">
              Chat on WhatsApp
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with our advisory team on WhatsApp"
              className="touch-manipulation w-14 h-14 min-w-[56px] min-h-[56px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all active:scale-95"
            >
              <svg 
                className="w-7 h-7 fill-white" 
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>
        </aside>
      )}

      {/* =========================================================================
          MOBILE & TABLET FLOATING ACTION BUTTONS (Vertical Stack, Safe-area Aware)
         ========================================================================= */}
      {!isChatModalOpen && !isCallbackModalOpen && (
        <aside 
          aria-label="Mobile quick actions" 
          className="md:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-40 flex flex-col items-end gap-2.5 pointer-events-auto animate-in fade-in"
        >
          {/* AI Assistant Floating Button */}
          <button
            onClick={() => setIsChatModalOpen(true)}
            aria-label="Open AI property assistant"
            className="touch-manipulation w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#171717] hover:bg-[#222222] border-2 border-[#B99A63] text-white flex items-center justify-center shadow-2xl active:scale-95 transition-transform relative"
          >
            <BotMessageSquare className="w-5 h-5 text-[#E8D39E]" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B99A63] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B99A63] border border-[#171717]"></span>
            </span>
          </button>

          {/* Quick Callback Trigger */}
          <button
            onClick={() => setIsCallbackModalOpen(true)}
            aria-label="Request callback consultation"
            className="touch-manipulation w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white text-[#171717] border border-[#E8E5DF] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Mail className="w-5 h-5 text-[#B99A63]" />
          </button>

          {/* WhatsApp Floating Button */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="touch-manipulation w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
          >
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>
        </aside>
      )}

      {/* =========================================================================
          FAST CALLBACK MODAL DIALOG
         ========================================================================= */}
      {isCallbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#FAF9F5] border border-[#E8E5DF] rounded-2xl shadow-2xl p-5 sm:p-8 max-h-[92dvh] overflow-y-auto">
            
            <button
              onClick={() => setIsCallbackModalOpen(false)}
              aria-label="Close dialog"
              className="absolute top-3 right-3 p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-lg touch-target"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                Private Advisory
              </span>
              <h3 className="font-serif text-2xl text-[#171717] mt-1">
                Request a Confidential Callback
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {pagePropertyTitle 
                  ? `Regarding: ${pagePropertyTitle}` 
                  : 'Connect directly with a Signature Aura Senior Partner for bespoke property guidance.'}
              </p>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl text-[#171717]">Callback Request Dispatched</h4>
                <p className="text-sm text-stone-600">
                  Redirecting you to our Senior Advisory Partner on WhatsApp...
                </p>
                {redirectWhatsAppUrl && (
                  <a
                    href={redirectWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Open WhatsApp Now
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                {/* Honeypot field for bot spam */}
                <input
                  type="text"
                  name="website_url_check"
                  value={formData.website_url_check}
                  onChange={(e) => setFormData({ ...formData, website_url_check: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                    {errorMessage}
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
                      className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
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
                      className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
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
                      placeholder="vikram@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      suppressHydrationWarning
                      className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Target Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
                    >
                      <option value="">Select Range</option>
                      <option value="₹ 5 Cr – ₹ 10 Cr">₹ 5 Cr – ₹ 10 Cr</option>
                      <option value="₹ 10 Cr – ₹ 20 Cr">₹ 10 Cr – ₹ 20 Cr</option>
                      <option value="₹ 20 Cr – ₹ 50 Cr">₹ 20 Cr – ₹ 50 Cr</option>
                      <option value="₹ 50 Cr+ Ultra Luxury">₹ 50 Cr+ Ultra Luxury</option>
                      <option value="Luxury Lease (₹ 2L - ₹ 10L / mo)">Luxury Lease (₹ 2L - ₹ 10L / mo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Requirements or Preferred Viewings
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your configuration requirements, timeline, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
                  />
                </div>

                <p className="text-[11px] text-stone-500 leading-normal">
                  By submitting, you agree to receive confidential property dossiers from Signature Aura Pvt. Ltd. We maintain strict non-disclosure standards.
                </p>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCallbackModalOpen(false)}
                    className="px-4 py-2 text-xs tracking-wider text-stone-600 hover:text-stone-900 uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#171717] hover:bg-[#B99A63] text-white disabled:opacity-50 text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded transition-all flex items-center gap-2 shadow"
                  >
                    {isSubmitting ? 'Registering...' : 'Request Callback'}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          AI PROPERTY ASSISTANT MODAL
         ========================================================================= */}
      <PropertyAssistantModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        currentPropertyTitle={pagePropertyTitle}
      />
    </>
  );
}
