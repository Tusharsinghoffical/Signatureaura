import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Award, 
  Users2, 
  Globe2, 
  Sparkles, 
  ArrowRight,
  Phone,
  CheckCircle2,
  Camera,
  MessageSquare,
  Mail
} from 'lucide-react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContactSystem from '@/components/floating/FloatingContactSystem';
import { BUSINESS_CONFIG, getWhatsAppLink } from '@/lib/config';
import { SAMPLE_TESTIMONIALS } from '@/lib/data/sample-data';

export default function AboutPage() {
  const leadershipTeam = [
    {
      name: 'Rakesh Desale Patil',
      gender: 'Male',
      role: 'Partner & Director',
      division: 'Strategic Land Acquisitions & Developer Alliances',
      initials: 'RDP',
      market: 'Pune Prime Corridors',
      bio: 'Founding Partner at Signature Aura Pvt. Ltd., steering land parcel aggregations, institutional builder joint ventures, and marquee luxury residential developments across Baner, Sus, Balewadi, and Pune.',
      photo: '/assets/team/rakesh-desale-patil.jpg',
      phone: BUSINESS_CONFIG.phoneRaw,
      email: BUSINESS_CONFIG.email,
    },
    {
      name: 'Uma Bhandwalkar',
      gender: 'Female',
      role: 'Partner & Director',
      division: 'Luxury Residential Advisory & Private Client Desk',
      initials: 'UB',
      market: 'High-End Residential & Penthouses',
      bio: 'Partner at Signature Aura Pvt. Ltd., leading bespoke residential acquisitions, trophy penthouses, gated community villas, and high-net-worth investor advisory with impeccable fiduciary diligence.',
      photo: '/assets/team/uma-bhandwalkar.jpg',
      phone: BUSINESS_CONFIG.phoneRaw,
      email: BUSINESS_CONFIG.email,
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
      phone: BUSINESS_CONFIG.phoneRaw,
      email: BUSINESS_CONFIG.email,
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
      phone: BUSINESS_CONFIG.phoneRaw,
      email: BUSINESS_CONFIG.email,
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] font-sans flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 pb-24 md:pb-0">
        
        {/* Hero Section */}
        <section className="relative py-20 sm:py-24 bg-[#171717] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
              alt="Architectural facade"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6 drop-shadow-2xl">
              <Image
                src="/assets/branding/signature-aura-logo-official.png?v=20261105"
                alt="Signature Aura Developers Emblem"
                fill
                className="object-contain"
                priority
              />
            </div>

            <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase block mb-3">
              Corporate Heritage & Ethos
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal leading-tight">
              Discreet Advisory. Exemplary Real Estate.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              Headquartered in Pune with advisory capabilities spanning western and northern India, Signature Aura Pvt. Ltd. bridges discerning individuals, institutional family offices, and developers with India’s most prized architectural properties.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                Our Foundation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717]">
                Setting the Standard in RERA Compliance and Transparency
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                For nearly two decades, the Indian luxury real estate landscape has evolved from fragmented representation to an institutional asset class. We champion institutional rigor: 30-year forensic title audits, strict non-disclosure safeguards, and comprehensive tax advisory for domestic and overseas capital.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B99A63] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-[#171717]">Forensic Due Diligence</h4>
                    <p className="text-xs text-stone-500">Every property undergoes strict title clearance and RERA sanction inspection before recommendation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B99A63] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-[#171717]">Absolute Confidentiality</h4>
                    <p className="text-xs text-stone-500">Client identity and asset transactions are protected by legally binding non-disclosure protocols.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B99A63] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-[#171717]">Global NRI Advisory</h4>
                    <p className="text-xs text-stone-500">Dedicated desk assisting NRIs across Singapore, London, Dubai, and USA with repatriation, power of attorney, and wealth preservation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury property interior"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </section>

        {/* Leadership Team / Board of Directors */}
        <section className="py-20 bg-white border-y border-[#E8E5DF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
                Board of Directors · Signature Aura Pvt. Ltd.
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-1">
                Founding Partners & Executive Leadership
              </h2>
              <p className="text-sm text-stone-600 mt-2">
                Governing directors steering strategic land acquisitions, luxury residential advisory, commercial capital, and private wealth asset management.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadershipTeam.map((leader, i) => (
                <div key={i} className="bg-[#FAF9F5] border border-[#E8E5DF] hover:border-[#B99A63]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between">
                  {/* Photo or Reserved Space */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#171717] flex items-center justify-center">
                    {leader.photo ? (
                      <Image
                        src={leader.photo}
                        alt={leader.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#242424] via-[#1a1a1a] to-[#121212]">
                        {/* Decorative background grid pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B99A63_1px,transparent_1px)] [background-size:16px_16px]" />
                        
                        {/* Elegant Monogram Ring */}
                        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#B99A63]/25 via-[#B99A63]/10 to-transparent border-2 border-[#B99A63]/80 flex items-center justify-center shadow-xl mb-4 group-hover:border-[#B99A63] group-hover:scale-105 transition-all">
                          <span className="font-serif text-2xl sm:text-3xl font-medium tracking-widest text-[#E8D39E]">
                            {leader.initials}
                          </span>
                        </div>

                        {/* Photo Space Reserved Pill */}
                        <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B99A63]/20 border border-[#B99A63]/40 text-[#D8B978] text-[10px] uppercase font-semibold tracking-wider">
                          <Camera className="w-3 h-3 text-[#B99A63]" />
                          <span>Photo Space Reserved</span>
                        </div>

                        <span className="relative z-10 text-[9px] text-stone-400 uppercase tracking-widest mt-2">
                          Partner Portrait (4:5)
                        </span>
                      </div>
                    )}

                    {/* Partner Status Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-[#171717]/85 backdrop-blur-xs text-[#E8D39E] text-[10px] font-semibold px-2.5 py-1 rounded border border-[#B99A63]/40 tracking-wider uppercase">
                      Partner & Director
                    </div>
                  </div>

                  {/* Partner Information */}
                  <div className="p-5 flex flex-col">
                    <span className="text-[10px] font-semibold tracking-widest text-[#B99A63] uppercase block mb-1">
                      {leader.market}
                    </span>
                    <h3 className="font-serif text-xl text-[#171717] font-medium leading-snug">
                      {leader.name}
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

        {/* Client Testimonials Carousel/Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-widest text-[#B99A63] uppercase">
              Proven Track Record
            </span>
            <h2 className="font-serif text-3xl text-[#171717] mt-1">
              Voices of our Clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SAMPLE_TESTIMONIALS.slice(0, 2).map((test) => (
              <div key={test.id} className="bg-white p-8 rounded-xl border border-[#E8E5DF] shadow-xs">
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="mt-6 pt-5 border-t border-[#E8E5DF]">
                  <h4 className="font-semibold text-sm text-[#171717]">{test.clientName}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{test.designation}</p>
                  {test.propertyPurchased && (
                    <p className="text-[11px] text-[#B99A63] font-medium mt-1">{test.propertyPurchased}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <FloatingContactSystem />
    </div>
  );
}
