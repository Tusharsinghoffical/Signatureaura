import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  Key, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Car, 
  FileCheck, 
  Sparkles,
  ArrowRight,
  Phone,
  MessageSquare
} from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import { BUSINESS_CONFIG, getWhatsAppLink } from '@/lib/config';

export default function ServicesPage() {
  const services = [
    {
      title: 'Residential Property Acquisition',
      tagline: 'Private representation for primary residences, penthouses, and luxury villas',
      desc: 'We curate bespoke property dossiers matching your architectural, spatial, and family requirements. From discreet off-market private viewings to forensic title verification and price negotiation.',
      icon: Building,
      enquirySubject: 'Residential Property Acquisition'
    },
    {
      title: 'Trophy Property Disposition & Sales',
      tagline: 'Targeted marketing to verified HNIs and institutional family offices',
      desc: 'Sell or monetize high-value residential or commercial holdings with utmost discretion. We employ cinematic architectural media, private investor roadshows, and non-disclosure compliance.',
      icon: Key,
      enquirySubject: 'Property Selling & Listing'
    },
    {
      title: 'Executive Leases & Corporate Relocations',
      tagline: 'Turn-key luxury residences for founders, CEOs, and expatriates',
      desc: 'Seamless tenancy representation for corporate leadership stationed in Mumbai, Delhi NCR, and Bengaluru. Flexible 12 to 36-month lease structuring with concierge maintenance support.',
      icon: Sparkles,
      enquirySubject: 'Executive Rental & Leasing'
    },
    {
      title: 'Commercial Real Estate & Grade-A Offices',
      tagline: 'Institutional office floor plates and flagship retail flagships',
      desc: 'Advisory for corporate headquarters in BKC Mumbai, Cyber City Gurgaon, and Outer Ring Road Bengaluru. Comprehensive financial modeling, floor efficiency auditing, and lease negotiation.',
      icon: Building2,
      enquirySubject: 'Commercial Real Estate Advisory'
    },
    {
      title: 'NRI Investment Advisory & Repatriation',
      tagline: 'Cross-border real estate wealth management and portfolio structuring',
      desc: 'Tailored for Non-Resident Indians across the UK, UAE, Singapore, and North America. Structuring NRE/NRO accounts, RBI capital repatriation, property management, and tenant sourcing.',
      icon: TrendingUp,
      enquirySubject: 'NRI Investment Advisory'
    },
    {
      title: 'Private Chauffeur Site Visit Concierge',
      tagline: 'Curated physical itineraries with gate clearance and architectural briefing',
      desc: 'Experience properties with complete convenience. We arrange luxury chauffeur transportation from your residence or airport, security gate pre-clearance, and architect-guided walkthroughs.',
      icon: Car,
      enquirySubject: 'Site Visit Concierge'
    },
    {
      title: 'Forensic Title Diligence & RERA Scrutiny',
      tagline: '30-year legal search reports, sanction plans, and encumbrance checks',
      desc: 'Protect your capital with thorough legal vetting conducted by specialized senior real estate advocates. Full audit of RERA certifications, municipal sanctions, and clear freehold title lineage.',
      icon: ShieldCheck,
      enquirySubject: 'Legal Due Diligence & RERA Advisory'
    },
    {
      title: 'Comprehensive Asset & Property Management',
      tagline: 'End-to-end stewardship for absentee owners and holiday homes',
      desc: 'Routine property inspections, preventative architectural maintenance, utility bill management, society representation, and vetted tenant vetting for high-end second homes in Goa and Mumbai.',
      icon: FileCheck,
      enquirySubject: 'Property Management'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pt-6 pb-24 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase block mb-2">
            Advisory Capabilities
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] leading-tight">
            Comprehensive Real Estate Advisory for Discerning Capital
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            From single-transaction acquisition to institutional commercial leasing and cross-border NRI estate structuring, our specialized desks deliver precision and fiduciary integrity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const whatsappLink = getWhatsAppLink(`Hello Signature Aura, I am interested in inquiring about your "${svc.title}" service.`);
            return (
              <div 
                key={i} 
                className="bg-white border border-[#E8E5DF] hover:border-[#B99A63] rounded-xl p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FAF9F5] border border-[#E8E5DF] flex items-center justify-center text-[#B99A63] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#171717]">{svc.title}</h3>
                  <span className="text-xs text-[#B99A63] font-medium block mt-1">{svc.tagline}</span>
                  <p className="text-xs text-stone-600 mt-3.5 leading-relaxed font-light">
                    {svc.desc}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#E8E5DF] flex items-center justify-between">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(svc.enquirySubject)}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#B99A63] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-16 bg-[#171717] text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <span className="text-xs text-[#B99A63] uppercase tracking-widest font-semibold block mb-1">
              Personalized Representation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              Looking for Bespoke Property Structuring?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-xl font-light">
              Speak directly with our Managing Partner to discuss acquisitions, portfolio valuations, or confidential sales.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="bg-[#B99A63] hover:bg-[#a68853] text-[#171717] font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded transition-all shadow"
            >
              Call Concierge Desk
            </a>
          </div>
        </div>

      </main>

      <Footer />
      <FloatingContactSystem />
    </div>
  );
}
