'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  X, 
  CheckCircle2, 
  ShieldCheck,
  Send,
  MessageSquare
} from 'lucide-react';
import { Property } from '@/types/real-estate';
import { createStoredSiteVisit } from '@/lib/client-storage';
import { createWhatsAppRedirectUrl, redirectToWhatsApp } from '@/lib/config';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export default function SiteVisitModal({
  isOpen,
  onClose,
  property
}: SiteVisitModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    visitDate: '',
    timeSlot: '04:30 PM - 06:00 PM (Sunset Viewing)',
    numberOfVisitors: 2,
    pickupRequired: false,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectWhatsAppUrl, setRedirectWhatsAppUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      createStoredSiteVisit({
        ...formData,
        propertyId: property.id,
        propertyTitle: property.title
      });

      const waUrl = createWhatsAppRedirectUrl({
        title: `SITE VISIT BOOKING: ${property.title}`,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        interest: `${property.title} (${property.priceDisplay})`,
        location: `${property.location.locality}, ${property.location.city}`,
        preferredDate: formData.visitDate,
        timeSlot: formData.timeSlot,
        notes: `Private viewing requested for ${formData.numberOfVisitors || 1} visitor(s). VIP chauffeur pickup: ${formData.pickupRequired ? 'Yes' : 'No'}. ${formData.notes ? `\nNotes: ${formData.notes}` : ''}`,
        origin: `Site Visit Modal: ${property.title}`
      });

      setRedirectWhatsAppUrl(waUrl);
      setIsSuccess(true);
      redirectToWhatsApp(waUrl);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 4000);
    } catch {
      setErrorMsg('Could not save reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF9F5] border border-[#E8E5DF] rounded-xl shadow-2xl p-5 sm:p-8 max-h-[92dvh] overflow-y-auto">
        
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 flex items-start gap-3.5">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 drop-shadow-sm">
            <Image
              src="/assets/branding/signature-aura-logo-official.png?v=20261105"
              alt="Signature Aura Developers"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
              Private Viewing Arrangement
            </span>
            <h3 className="font-serif text-2xl text-[#171717] mt-0.5">
              Schedule a Site Visit
            </h3>
            <p className="text-xs text-stone-600 mt-1 line-clamp-1">
              Property: <strong className="text-stone-900">{property.title}</strong>
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-xl text-[#171717]">Private Viewing Reserved</h4>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Redirecting you to our Private Viewing Concierge on WhatsApp...
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
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
                  placeholder="e.g. Radhika Singhal"
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
                  placeholder="radhika@familyoffice.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  suppressHydrationWarning
                  className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                  suppressHydrationWarning
                  className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Preferred Time Window
                </label>
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
                >
                  <option value="10:00 AM - 11:30 AM (Morning Natural Light)">10:00 AM - 11:30 AM</option>
                  <option value="12:00 PM - 01:30 PM (Midday Inspection)">12:00 PM - 01:30 PM</option>
                  <option value="04:30 PM - 06:00 PM (Sunset Viewing)">04:30 PM - 06:00 PM (Sunset Viewing)</option>
                  <option value="06:30 PM - 08:00 PM (Evening Ambience)">06:30 PM - 08:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Number of Attendees
                </label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={formData.numberOfVisitors}
                  onChange={(e) => setFormData({ ...formData, numberOfVisitors: Number(e.target.value) })}
                  className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2.5 rounded text-base sm:text-sm text-[#171717]"
                />
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.pickupRequired}
                  onChange={(e) => setFormData({ ...formData, pickupRequired: e.target.checked })}
                  className="rounded border-[#E8E5DF] text-[#B99A63] focus:ring-[#B99A63]"
                />
                <span className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-[#B99A63]" />
                  Request Chauffeur-driven luxury car pick-up from my residence or airport
                </span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Special Requests or Accompanying Architect
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Bringing private structural architect, require physical floor plans..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-3.5 py-2 rounded text-base sm:text-sm text-[#171717]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#E8E5DF]">
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B99A63]" />
                <span>NDA & Privacy Assured</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 text-xs tracking-wider text-stone-600 hover:text-stone-900 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#171717] hover:bg-[#B99A63] text-white disabled:opacity-50 text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded transition-all flex items-center gap-2 shadow"
                >
                  {isSubmitting ? 'Confirming...' : 'Book Viewing'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
