'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  BotMessageSquare,
  Sparkles, 
  Phone, 
  ExternalLink, 
  RefreshCw, 
  Building, 
  CheckCircle2, 
  Maximize2, 
  Minimize2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Database,
  FileCheck,
  ChevronRight,
  UserCheck,
  Filter,
  Check
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppLink } from '@/lib/config';
import { SAMPLE_PROPERTIES } from '@/lib/data/sample-data';
import { retrieveWebsiteKnowledge } from '@/lib/rag/knowledge-retriever';
import { createStoredSiteVisit, createStoredLead } from '@/lib/client-storage';
import ChatMessageContent from './ChatMessageContent';

interface SourceCitation {
  title: string;
  url: string;
  category: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: SourceCitation[];
  matchedProperties?: any[];
  suggestedFollowUps?: string[];
  isRagGrounded?: boolean;
}

interface PropertyAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPropertyTitle?: string;
}

let msgCounter = 0;
function getNextMsgId(prefix: string) {
  msgCounter += 1;
  return `${prefix}-${msgCounter}`;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome-1',
    role: 'assistant',
    content: `Namaste. I am your **Signature Aura™ RAG Property Assistant**. I am directly grounded in our real-time database of luxury residences, penthouses, commercial IT park floors, and official MahaRERA records.\n\nYou can ask me anything about our live property portfolio in Pune, Mumbai, Delhi NCR, and Goa, inquire about 30-year title due diligence, or book an exclusive chauffeured site visit.`,
    timestamp: 'Just now',
    isRagGrounded: true,
    suggestedFollowUps: [
      'Show available penthouses in Worli',
      'What properties are available in Baner-Sus Pune?',
      'How does Signature Aura audit 30-year property titles?',
      'Show luxury villas in Goa for sale or lease'
    ]
  }
];

export default function PropertyAssistantModal({
  isOpen,
  onClose,
  currentPropertyTitle
}: PropertyAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Dedicated View Selector: Advisory Chat vs Dedicated RAG Inventory Area
  const [activeTab, setActiveTab] = useState<'chat' | 'inventory'>('chat');
  const [inventoryCityFilter, setInventoryCityFilter] = useState<string>('All');
  
  // Grounded inventory list (prefilled with verified properties and updated dynamically via RAG responses)
  const [ragProperties, setRagProperties] = useState<any[]>(() => SAMPLE_PROPERTIES.slice(0, 8));

  // In-Chat Site Visit Booking Sub-State
  const [bookingProperty, setBookingProperty] = useState<any | null>(null);
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    visitDate: '',
    timeSlot: '04:30 PM - 06:00 PM (Sunset Viewing)',
  });
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');
  const [bookingErrorMsg, setBookingErrorMsg] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Curated RAG exploration questions for real estate buyers & investors
  const quickCategories = [
    { label: 'Plots & Acres (JV)', query: 'What land parcels, acres, and builder joint ventures are available in Pune?' },
    { label: 'Marquee Projects', query: 'Show marquee projects and new landmark developments' },
    { label: 'Worli Penthouses', query: 'Show sea-facing penthouses in Worli with Arabian Sea views' },
    { label: 'Pune Baner-Sus', query: 'What properties and IT park floors are available in Baner-Sus Pune?' },
    { label: 'Goan Beach Villas', query: 'Show luxury private pool villas in Assagao and Candolim Goa' },
    { label: 'Services & Advisory', query: 'What services does Signature Aura offer?' },
    { label: '30-Yr Title Audit', query: 'How does Signature Aura perform forensic 30-year title due diligence?' },
    { label: 'NRI Investment (FEMA)', query: 'What are the RBI and FEMA guidelines for NRIs buying luxury property?' },
    { label: 'Managing Partners', query: 'Who are the Partners at Signature Aura and their real estate divisions?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Lock background scroll when open and NOT minimized on mobile/tablet
  useEffect(() => {
    if (isOpen && !isMinimized) {
      const originalOverflow = document.body.style.overflow;
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, isMinimized]);

  // Focus input and scroll on open
  useEffect(() => {
    if (isOpen && !isMinimized && activeTab === 'chat') {
      scrollToBottom();
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized, activeTab]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && !isMinimized && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, bookingProperty, activeTab]);

  // Dismiss on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isMinimized) {
          onClose();
        } else {
          setIsMinimized(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized, onClose]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: getNextMsgId('user'),
      role: 'user',
      content: query.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const rag = retrieveWebsiteKnowledge(query.trim());

      let reply = '';
      if (rag.matchedProperties.length > 0) {
        const topProp = rag.matchedProperties[0];
        reply = `We have verified luxury residences matching your inquiry. Foremost among them is **${topProp.title}** located at **${topProp.location.locality}, ${topProp.location.city}** (${topProp.propertyType}, ${topProp.priceDisplay}).\n\n• **Specification**: ${topProp.bedrooms > 0 ? `${topProp.bedrooms} BHK` : 'Grade-A'} · ${topProp.carpetAreaSqFt} sq.ft.\n• **RERA Verification**: \`${topProp.reraNumber || 'Certified MahaRERA Compliant'}\`\n• **Highlights**: ${topProp.highlightFeatures?.slice(0, 3).join(', ')}\n\nWould you like to schedule a chauffeured private viewing or receive the confidential investment prospectus?`;
      } else if (query.toLowerCase().includes('partner') || query.toLowerCase().includes('director') || query.toLowerCase().includes('rakesh')) {
        reply = `Signature Aura Pvt. Ltd. is led by Founding Partner & Director **Rakesh Desale Patil**, alongside Partners **Uma Bhandwalkar**, **Akshay Bhote**, and **Rama Bhote**.\n\nOur headquarters is at **Office No. 812, Millennium Towers, Baner-Sus, Pune**. Would you like to schedule an advisory consultation?`;
      } else if (query.toLowerCase().includes('rera') || query.toLowerCase().includes('title') || query.toLowerCase().includes('legal')) {
        reply = `Every residential and commercial acquisition advised by Signature Aura undergoes **forensic 30-year property title scrutiny** led by Partner Akshay Bhote. We review sub-registrar registered deeds, mutation entries, 7/12 extracts, and MahaRERA developer disclosures before presenting any asset to clients.`;
      } else {
        reply = `Welcome to Signature Aura Developers & Advisory. We represent curated luxury penthouses in Worli & Bandra, Portuguese estates in Assagao, Golf Course Road residences in Gurgaon, and Grade-A commercial IT parks.\n\nHow may our Senior Advisory Desk assist your acquisition or leasing plans today?`;
      }

      // Check for lead detection in user message (phone / email)
      const phoneMatch = query.match(/(\+?\d[\d\s-]{8,})/);
      const emailMatch = query.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (phoneMatch || emailMatch) {
        createStoredLead({
          fullName: 'Website Inquirer',
          phone: phoneMatch ? phoneMatch[0] : '',
          email: emailMatch ? emailMatch[0] : '',
          leadSource: 'ai_chatbot',
          propertyTitle: currentPropertyTitle || (rag.matchedProperties[0]?.title ?? 'General Inquiry'),
          message: query
        });
        setLeadCaptured(true);
      }

      const assistantMsg: Message = {
        id: getNextMsgId('bot'),
        role: 'assistant',
        content: reply,
        timestamp: 'Just now',
        sources: rag.sources,
        matchedProperties: rag.matchedProperties,
        suggestedFollowUps: rag.suggestedFollowUps,
        isRagGrounded: true
      };
      setMessages(prev => [...prev, assistantMsg]);

      // Dynamically update the dedicated RAG inventory area with newly matched properties
      if (rag.matchedProperties && rag.matchedProperties.length > 0) {
        setRagProperties(prev => {
          const newIds = new Set(rag.matchedProperties.map((p: any) => p.id));
          const existingRemaining = prev.filter(p => !newIds.has(p.id));
          return [...rag.matchedProperties, ...existingRemaining];
        });
      }
    } catch {
      const errorMsg: Message = {
        id: getNextMsgId('bot'),
        role: 'assistant',
        content: `I am currently reconnecting to the Signature Aura luxury inventory database. For immediate direct consultation, Senior Partner Rakesh Desale Patil is reachable on WhatsApp: [Chat on WhatsApp](${getWhatsAppLink()}) or by telephone at ${BUSINESS_CONFIG.phoneNumber}.`,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: getNextMsgId('welcome'),
        role: 'assistant',
        content: `Conversation refreshed. How may I assist your luxury real estate acquisitions or RERA queries today?`,
        timestamp: 'Just now',
        isRagGrounded: true,
        suggestedFollowUps: [
          'Show available properties in Pune',
          'Worli Sea Face triplex penthouses',
          '30-year title audit protocol',
          'Schedule site visit'
        ]
      }
    ]);
    setLeadCaptured(false);
    setBookingProperty(null);
  };

  const handleInChatBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingProperty) return;
    setIsBookingSubmitting(true);
    setBookingSuccessMsg('');
    setBookingErrorMsg('');

    try {
      createStoredSiteVisit({
        fullName: bookingForm.fullName,
        phone: bookingForm.phone,
        email: bookingForm.email,
        propertyId: bookingProperty.id,
        propertyTitle: bookingProperty.title,
        visitDate: bookingForm.visitDate,
        timeSlot: bookingForm.timeSlot,
        numberOfVisitors: 2,
        pickupRequired: true,
        notes: `Requested directly through Signature Aura Chatbot.`
      });

      setBookingSuccessMsg(`Private viewing confirmed for ${bookingForm.visitDate} (${bookingForm.timeSlot}).`);
      const confirmMsg: Message = {
        id: getNextMsgId('system'),
        role: 'assistant',
        content: `✅ **Site Visit Reserved Successfully!**\n\nWe have scheduled your private viewing for **${bookingProperty.title}** on **${bookingForm.visitDate}** (${bookingForm.timeSlot}).\n\nOur Senior Partner has received your confirmation on **${bookingForm.phone}** and will prepare the property dossier, gate clearance, and optional chauffeured pickup.`,
        timestamp: 'Just now',
        isRagGrounded: true
      };
      setMessages(prev => [...prev, confirmMsg]);
      setTimeout(() => {
        setBookingProperty(null);
        setBookingSuccessMsg('');
        setBookingForm({ fullName: '', phone: '', email: '', visitDate: '', timeSlot: '04:30 PM - 06:00 PM (Sunset Viewing)' });
      }, 3000);
    } catch {
      setBookingErrorMsg('Failed to reserve viewing. Please connect via direct WhatsApp.');
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  // Latest matched properties from the last assistant response
  const lastAssistantMsg = [...messages].reverse().find(m => m.role === 'assistant' && m.matchedProperties && m.matchedProperties.length > 0);
  const latestMatchesCount = lastAssistantMsg?.matchedProperties?.length || 0;

  // Filtered properties for dedicated inventory area
  const filteredInventory = ragProperties.filter(p => {
    if (inventoryCityFilter === 'All') return true;
    if (inventoryCityFilter === 'Commercial') return p.category === 'commercial';
    const city = p.location?.city || p.city || '';
    return city.toLowerCase().includes(inventoryCityFilter.toLowerCase());
  });

  // =========================================================================
  // 1. MINIMIZED FLOATING STATUS PILL (Does NOT obscure website content)
  // =========================================================================
  if (isMinimized) {
    return (
      <div 
        role="region"
        aria-label="Minimized Property Assistant"
        className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 sm:bottom-6 sm:right-6 z-50 pointer-events-auto animate-in slide-in-from-bottom-3 duration-200"
      >
        <div 
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 sm:gap-3 bg-[#171717] hover:bg-[#222222] text-white border border-[#B99A63]/70 rounded-full py-2.5 px-3.5 sm:px-4 shadow-2xl transition-all cursor-pointer group active:scale-95 touch-manipulation min-h-[48px]"
        >
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#242424] border border-[#B99A63]/50 flex items-center justify-center shadow-xs">
              <BotMessageSquare className="w-4 h-4 text-[#E8D39E]" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#171717]" />
          </div>

          <div className="flex flex-col text-left pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-white group-hover:text-[#E8DFD0] transition-colors truncate">
                RAG Assistant
              </span>
              <span className="text-[9px] bg-[#B99A63]/25 text-[#E8DFD0] px-1.5 py-0.2 rounded font-mono border border-[#B99A63]/40">
                {ragProperties.length} listings
              </span>
            </div>
            <span className="text-[10px] text-stone-400 flex items-center gap-1">
              <span>Tap to resume</span>
              <ChevronUp className="w-3 h-3 text-[#B99A63]" />
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close assistant"
            className="w-8 h-8 min-w-[36px] min-h-[36px] rounded-full hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors touch-manipulation ml-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. FULL RESPONSIVE CHATBOT MODAL (Mobile-first bottom sheet & desktop card)
  // =========================================================================
  return (
    <div 
      className={`fixed inset-0 z-50 flex transition-all duration-200 pointer-events-none ${
        isExpanded 
          ? 'items-center justify-center p-0 sm:p-4 md:p-6' 
          : 'items-end sm:items-end justify-end p-0 sm:p-4 md:p-6'
      }`}
    >
      {/* Backdrop overlay (dismissible on click to prevent blocking user) */}
      <div 
        className={`fixed inset-0 transition-opacity pointer-events-auto ${
          isExpanded 
            ? 'bg-black/60 backdrop-blur-xs' 
            : 'bg-black/45 sm:bg-black/25 backdrop-blur-xs'
        }`}
        onClick={() => setIsMinimized(true)}
        aria-hidden="true"
      />

      {/* Main Chat Container - Mobile-first bottom sheet occupying full screen width */}
      <div 
        role="dialog"
        aria-label="Signature Aura RAG Property Assistant"
        className={`relative flex flex-col bg-[#FAF9F5] shadow-2xl overflow-hidden pointer-events-auto transition-all duration-300 ease-out border-[#E8E5DF]
          /* Mobile (< 640px): Full width bottom-sheet with safe-area padding and 88dvh height so top of website remains visible */
          w-full h-[88dvh] max-h-[88dvh] rounded-t-3xl sm:rounded-none border-t border-stone-200
          /* Tablet & Desktop (>= 640px): Floating luxury card with automatic max-height bound and responsive width */
          sm:rounded-2xl sm:border sm:border-[#E8E5DF]
          ${isExpanded 
            ? 'sm:w-[min(940px,calc(100vw-2rem))] sm:h-[min(820px,calc(100dvh-2.5rem))] sm:max-h-[92dvh]' 
            : 'sm:w-[min(520px,calc(100vw-2rem))] md:w-[min(560px,calc(100vw-2rem))] sm:h-[min(700px,calc(100dvh-3rem))] sm:max-h-[88dvh]'
          }
        `}
      >
        {/* Mobile Swipe / Drag Indicator Bar to quickly minimize */}
        <div 
          onClick={() => setIsMinimized(true)}
          aria-label="Swipe or tap to minimize assistant"
          className="sm:hidden w-full flex flex-col justify-center items-center pt-2.5 pb-1.5 bg-[#171717] cursor-pointer touch-manipulation group select-none"
        >
          <div className="w-12 h-1.5 bg-stone-500 group-hover:bg-stone-300 rounded-full transition-colors" />
          <span className="text-[9px] text-stone-400 mt-1 tracking-wider uppercase font-medium">
            Tap or swipe to minimize
          </span>
        </div>

        {/* =========================================================================
            HEADER: Brand Identity, Live RAG Status, & Touch Controls (>= 44px)
           ========================================================================= */}
        <div className="bg-[#171717] text-white px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-[#2D2D2D] shrink-0 pt-[max(0.25rem,env(safe-area-inset-top))] sm:pt-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#242424] border border-[#B99A63]/50 flex items-center justify-center shadow-md">
                <BotMessageSquare className="w-5 h-5 text-[#E8D39E]" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#171717]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-xs sm:text-sm font-medium tracking-wide truncate text-[#FAF9F5]">
                  Property Assistant
                </h3>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] bg-[#B99A63]/25 text-[#E8DFD0] px-1.5 py-0.5 rounded font-mono shrink-0 border border-[#B99A63]/40">
                  <Database className="w-2.5 h-2.5 text-[#B99A63]" />
                  RAG
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 truncate">
                Grounded in Real Estate Inventory & RERA Filings
              </p>
            </div>
          </div>

          {/* Action buttons with touch-friendly 44px targets */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            {/* Clear history */}
            <button
              onClick={handleClear}
              title="Clear conversation"
              aria-label="Clear chat history"
              className="w-10 h-10 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center text-stone-400 hover:text-white transition-colors rounded-lg hover:bg-stone-800 touch-manipulation active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Minimize button (Allows user to inspect website content without losing chat) */}
            <button
              onClick={() => setIsMinimized(true)}
              title="Minimize chat to view website"
              aria-label="Minimize chat to view website"
              className="w-10 h-10 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center text-stone-400 hover:text-white transition-colors rounded-lg hover:bg-stone-800 touch-manipulation active:scale-95"
            >
              <ChevronDown className="w-5 h-5" />
            </button>

            {/* Expand / Minimize toggle (Tablet, Laptop & Desktop) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Restore compact view' : 'Expand full window'}
              aria-label={isExpanded ? 'Restore compact view' : 'Expand full window'}
              className="hidden sm:flex w-10 h-10 min-w-[44px] min-h-[44px] items-center justify-center text-stone-400 hover:text-white transition-colors rounded-lg hover:bg-stone-800 touch-manipulation active:scale-95"
            >
              {isExpanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              title="Close assistant"
              aria-label="Close assistant"
              className="w-10 h-10 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center text-stone-400 hover:text-white transition-colors rounded-lg hover:bg-stone-800 touch-manipulation active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            DEDICATED VIEW SELECTOR TABS: Advisory Chat vs RAG Property Inventory Area
           ========================================================================= */}
        <div className="bg-[#1C1C1C] px-3 py-1.5 border-b border-[#2D2D2D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-xl border border-stone-800">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`touch-manipulation text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 min-h-[40px] ${
                activeTab === 'chat'
                  ? 'bg-[#B99A63] text-white shadow-xs font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Advisory Chat</span>
              <span className="text-[10px] bg-black/40 text-stone-300 px-1.5 py-0.2 rounded-full font-mono">
                {messages.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inventory')}
              className={`touch-manipulation text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 min-h-[40px] ${
                activeTab === 'inventory'
                  ? 'bg-[#B99A63] text-white shadow-xs font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Verified Listings (RAG)</span>
              <span className="text-[10px] bg-black/40 text-[#E8DFD0] px-1.5 py-0.2 rounded-full font-mono">
                {ragProperties.length}
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#B99A63] font-medium pr-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MahaRERA Audited</span>
          </div>
        </div>

        {/* Lead Captured Banner if applicable */}
        {leadCaptured && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-3.5 py-2 flex items-center gap-2 text-xs text-emerald-800 shrink-0 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">Your consultation request is registered. Senior Partner Rakesh Desale Patil will connect shortly.</span>
          </div>
        )}

        {/* =========================================================================
            TAB 1: ADVISORY CHAT CONVERSATION VIEW
           ========================================================================= */}
        {activeTab === 'chat' && (
          <>
            {/* Quick RAG Filter Chips Strip - with pan-x touch support */}
            <div className="bg-[#242424] px-3 py-2 border-b border-[#333333] flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 touch-action-pan-x">
              <span className="text-[10px] uppercase tracking-wider text-[#B99A63] font-semibold shrink-0 pl-1 pr-1">
                Explore:
              </span>
              {quickCategories.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.query)}
                  className="touch-chip whitespace-nowrap text-[11px] sm:text-xs bg-stone-800/90 hover:bg-[#B99A63]/30 text-stone-300 hover:text-white border border-stone-700/80 hover:border-[#B99A63]/60 px-3 py-1.5 rounded-full transition-all shrink-0 active:scale-95 touch-manipulation min-h-[38px]"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Grounded properties prompt banner if available */}
            {latestMatchesCount > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className="w-full bg-[#B99A63]/15 hover:bg-[#B99A63]/25 border-b border-[#B99A63]/30 px-3.5 py-2 flex items-center justify-between text-xs text-[#B99A63] transition-colors touch-manipulation min-h-[42px]"
              >
                <span className="flex items-center gap-1.5 font-medium truncate">
                  <Sparkles className="w-4 h-4 text-[#B99A63] shrink-0" />
                  <span>{latestMatchesCount} Grounded Property Matches in Live Inventory</span>
                </span>
                <span className="text-[11px] font-semibold flex items-center gap-1 shrink-0 bg-[#B99A63] text-white px-2 py-0.5 rounded">
                  View in Tray <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            )}

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 text-sm bg-[#FAF9F5] chatbot-scroll-container">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[94%] sm:max-w-[88%] p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm leading-relaxed transition-all ${
                      msg.role === 'user'
                        ? 'bg-[#171717] text-[#FAF9F5] rounded-br-none shadow-md'
                        : 'bg-white border border-[#E8E5DF] text-[#222222] rounded-bl-none shadow-xs'
                    }`}
                  >
                    {/* Assistant AI Tag & RAG Grounding Header */}
                    {msg.role === 'assistant' && (
                      <div className="flex items-center justify-between gap-2 mb-2 border-b border-[#F0ECE1] pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-[#171717] flex items-center justify-center shrink-0">
                            <BotMessageSquare className="w-2.5 h-2.5 text-[#E8D39E]" />
                          </div>
                          <span className="text-[10px] font-semibold text-[#171717] tracking-wider uppercase">
                            AI Property Assistant
                          </span>
                        </div>
                        {msg.isRagGrounded && (
                          <div className="flex items-center gap-1 text-[9px] font-semibold text-[#B99A63] tracking-wider uppercase">
                            <Database className="w-2.5 h-2.5 text-[#B99A63]" />
                            <span>RAG Grounded</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Formatted Markdown-like Message Content */}
                    <div className="font-light">
                      <ChatMessageContent content={msg.content} isUser={msg.role === 'user'} isDark={false} />
                    </div>

                    {/* RAG Sources Citations Pills */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[#E8E5DF]">
                        <span className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase block mb-1.5">
                          Website Reference Sources:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.slice(0, 3).map((source, sIdx) => (
                            <Link
                              key={sIdx}
                              href={source.url}
                              onClick={() => setIsMinimized(true)}
                              className="touch-manipulation inline-flex items-center gap-1 bg-[#FAF9F5] hover:bg-[#F2EFE9] border border-[#E8E5DF] text-stone-700 hover:text-[#B99A63] text-[10px] sm:text-[11px] px-2.5 py-1.5 rounded transition-colors min-h-[36px]"
                            >
                              <FileCheck className="w-3 h-3 text-[#B99A63] shrink-0" />
                              <span className="truncate max-w-[190px]">{source.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Grounded Real Estate Record Cards with Touch-friendly Buttons */}
                    {msg.matchedProperties && msg.matchedProperties.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#E8E5DF] space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold tracking-wider text-[#B99A63] uppercase">
                            Matched Real Estate Records:
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveTab('inventory')}
                            className="text-[10px] font-medium text-stone-500 hover:text-[#B99A63] underline"
                          >
                            Open in Dedicated Tray
                          </button>
                        </div>
                        
                        <div className={`grid gap-2.5 ${isExpanded ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                          {msg.matchedProperties.map((prop: any) => (
                            <div
                              key={prop.id}
                              className="p-3 sm:p-3.5 bg-[#FAF9F5] border border-[#E8E5DF] rounded-xl shadow-xs hover:border-[#B99A63]/50 transition-all flex flex-col justify-between"
                            >
                              <div>
                                {/* Card Top: Title & Price */}
                                <div className="flex justify-between items-start gap-2">
                                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#171717] line-clamp-1">
                                    {prop.title}
                                  </h4>
                                  <span className="text-xs sm:text-sm font-bold text-[#B99A63] shrink-0 font-sans">
                                    {prop.priceDisplay || prop.price}
                                  </span>
                                </div>

                                {/* Card Sub: Locality, BHK & Area */}
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-stone-600 mt-1.5">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3.5 h-3.5 text-[#B99A63] shrink-0" />
                                    {prop.location?.locality || prop.locality}, {prop.location?.city || prop.city}
                                  </span>
                                  {prop.bedrooms > 0 && (
                                    <span className="bg-stone-200/80 text-stone-700 px-1.5 py-0.5 rounded text-[10px]">
                                      {prop.bedrooms} BHK
                                    </span>
                                  )}
                                  {prop.carpetAreaSqFt && (
                                    <span className="text-stone-500 text-[10px]">
                                      {prop.carpetAreaSqFt} sq.ft.
                                    </span>
                                  )}
                                </div>

                                {/* RERA Registration badge */}
                                {prop.reraNumber && (
                                  <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mt-2 w-fit">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>RERA: {prop.reraNumber}</span>
                                  </div>
                                )}
                              </div>

                              {/* Card Actions: Touch Targets >= 44px */}
                              <div className="mt-3.5 pt-2.5 border-t border-[#E8E5DF] flex items-center justify-between gap-2">
                                <Link
                                  href={`/properties/${prop.slug}`}
                                  onClick={() => setIsMinimized(true)}
                                  className="text-xs font-medium text-stone-700 hover:text-[#B99A63] flex items-center gap-1 touch-manipulation min-h-[44px] px-2 py-1"
                                >
                                  <span>Details</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setBookingProperty(prop)}
                                    className="touch-manipulation inline-flex items-center gap-1.5 bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-medium px-3.5 py-2.5 rounded-lg transition-colors min-h-[44px] active:scale-95 shadow-xs"
                                  >
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Book Visit</span>
                                  </button>

                                  <a
                                    href={getWhatsAppLink(`Hello Signature Aura, I am inquiring about ${prop.title} (${prop.priceDisplay}) viewed in the AI assistant.`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-colors touch-manipulation active:scale-95 shadow-xs"
                                    title="Inquire on WhatsApp"
                                    aria-label="Inquire about property on WhatsApp"
                                  >
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Follow-up Suggestions Chips - 40px touch targets */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2 max-w-[94%] sm:max-w-[88%]">
                      {msg.suggestedFollowUps.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          type="button"
                          onClick={() => handleSend(q)}
                          className="touch-manipulation text-xs bg-white hover:bg-[#FAF9F5] text-stone-700 hover:text-[#B99A63] border border-[#E8E5DF] hover:border-[#B99A63]/60 px-3.5 py-2 rounded-full transition-all text-left shadow-2xs active:scale-95 min-h-[40px] flex items-center"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* In-Chat Site Visit Booking Sub-Widget */}
              {bookingProperty && (
                <div className="bg-white border-2 border-[#B99A63] p-4 sm:p-5 rounded-2xl shadow-lg space-y-3.5 animate-in fade-in zoom-in-95">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-[#B99A63] uppercase tracking-wider block">
                        Instant Viewing Reservation
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-semibold text-[#171717]">
                        {bookingProperty.title}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {bookingProperty.location?.locality || bookingProperty.locality}, {bookingProperty.location?.city || bookingProperty.city} · {bookingProperty.priceDisplay || bookingProperty.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookingProperty(null)}
                      className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center text-stone-400 hover:text-stone-700 p-1 touch-manipulation"
                      aria-label="Cancel booking"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {bookingErrorMsg && (
                    <div className="p-2.5 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                      {bookingErrorMsg}
                    </div>
                  )}

                  {bookingSuccessMsg && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">
                      {bookingSuccessMsg}
                    </div>
                  )}

                  <form onSubmit={handleInChatBookingSubmit} className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-stone-600 block mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Malhotra"
                          value={bookingForm.fullName}
                          onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3 py-2.5 rounded-lg text-base sm:text-xs min-h-[44px]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-600 block mb-1">Phone Number (Required)</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98200 XXXXX"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3 py-2.5 rounded-lg text-base sm:text-xs min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-stone-600 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@example.com"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3 py-2.5 rounded-lg text-base sm:text-xs min-h-[44px]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-stone-600 block mb-1">Preferred Date</label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={bookingForm.visitDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, visitDate: e.target.value })}
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3 py-2.5 rounded-lg text-base sm:text-xs min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setBookingProperty(null)}
                        className="touch-manipulation px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 min-h-[44px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isBookingSubmitting}
                        className="touch-manipulation bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shadow min-h-[44px] active:scale-95"
                      >
                        {isBookingSubmitting ? 'Confirming...' : 'Confirm Private Viewing'}
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-stone-500 text-xs py-2 px-1">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[11px] text-stone-600">Retrieving website records & RERA filings...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-2.5 sm:p-3 bg-white border-t border-[#E8E5DF] flex items-center gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                suppressHydrationWarning
                placeholder="Ask about Worli penthouses, Pune Baner-Sus, RERA, prices..."
                className="flex-1 bg-[#FAF9F5] border border-[#E8E5DF] focus:border-[#171717] focus:outline-none px-4 py-3 rounded-xl text-base sm:text-xs text-[#171717] placeholder:text-[#999999] min-h-[48px]"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                aria-label="Send message to assistant"
                className="touch-manipulation bg-[#171717] hover:bg-[#B99A63] disabled:opacity-40 text-white w-12 h-12 rounded-xl transition-all flex items-center justify-center shrink-0 min-w-[48px] min-h-[48px] active:scale-95 shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* =========================================================================
            TAB 2: DEDICATED RAG-BASED SEARCH RESULTS & PROPERTY LISTINGS AREA
           ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#FAF9F5]">
            {/* Inventory Header Filter Bar */}
            <div className="p-3 bg-white border-b border-[#E8E5DF] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 touch-action-pan-x">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 shrink-0 flex items-center gap-1 pl-1">
                <Filter className="w-3 h-3 text-[#B99A63]" />
                Filter:
              </span>
              {['All', 'Pune', 'Mumbai', 'Delhi NCR', 'Goa', 'Commercial'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setInventoryCityFilter(city)}
                  className={`touch-manipulation text-xs px-3.5 py-1.5 rounded-full transition-all shrink-0 min-h-[38px] flex items-center gap-1 ${
                    inventoryCityFilter === city
                      ? 'bg-[#171717] text-white font-medium shadow-xs'
                      : 'bg-[#FAF9F5] text-stone-700 hover:text-stone-900 border border-[#E8E5DF]'
                  }`}
                >
                  <span>{city}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Listings Grid */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 chatbot-scroll-container">
              <div className="flex items-center justify-between text-xs text-stone-600 pb-1">
                <span className="font-medium text-[#171717]">
                  Showing {filteredInventory.length} Verified Properties
                </span>
                <span className="text-[11px] text-[#B99A63] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  MahaRERA Audited
                </span>
              </div>

              {filteredInventory.length === 0 ? (
                <div className="py-12 text-center text-stone-500 space-y-2">
                  <Building className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="text-sm">No properties found matching {inventoryCityFilter}.</p>
                  <button
                    type="button"
                    onClick={() => setInventoryCityFilter('All')}
                    className="text-xs text-[#B99A63] underline font-medium"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-3 ${isExpanded ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                  {filteredInventory.map((prop: any) => (
                    <div
                      key={prop.id}
                      className="bg-white border border-[#E8E5DF] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      {/* Property Thumbnail & Tags */}
                      <div className="relative h-44 w-full bg-stone-200 overflow-hidden">
                        {prop.featuredImage ? (
                          <Image
                            src={prop.featuredImage}
                            alt={prop.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-stone-800 text-stone-400">
                            <Building className="w-8 h-8 text-[#B99A63]" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-start gap-2">
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded border border-white/20 uppercase tracking-wider">
                            {prop.propertyType || prop.category || 'Luxury'}
                          </span>
                          {prop.reraNumber && (
                            <span className="bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-medium px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              RERA Verified
                            </span>
                          )}
                        </div>

                        {/* Bottom Overlay Price & Locality */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end text-white">
                          <div>
                            <span className="text-[11px] text-stone-300 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#B99A63]" />
                              {prop.location?.locality || prop.locality}, {prop.location?.city || prop.city}
                            </span>
                            <h4 className="font-serif text-sm font-semibold truncate text-white max-w-[220px]">
                              {prop.title}
                            </h4>
                          </div>
                          <span className="text-base font-bold text-[#E8DFD0] font-sans">
                            {prop.priceDisplay || prop.price}
                          </span>
                        </div>
                      </div>

                      {/* Card Body & Specs */}
                      <div className="p-3.5 space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-[#FAF9F5] rounded-xl border border-[#E8E5DF] text-stone-700">
                          <div>
                            <span className="text-[10px] text-stone-500 block uppercase">Config</span>
                            <span className="text-xs font-semibold">{prop.bedrooms > 0 ? `${prop.bedrooms} BHK` : 'Grade-A'}</span>
                          </div>
                          <div className="border-x border-[#E8E5DF]">
                            <span className="text-[10px] text-stone-500 block uppercase">Area</span>
                            <span className="text-xs font-semibold">{prop.carpetAreaSqFt ? `${prop.carpetAreaSqFt} sq.ft.` : 'Custom'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-500 block uppercase">Possession</span>
                            <span className="text-xs font-semibold truncate block px-1">{prop.possessionDate || 'Immediate'}</span>
                          </div>
                        </div>

                        {/* Official MahaRERA registration number */}
                        {prop.reraNumber && (
                          <div className="text-[10px] text-stone-500 font-mono bg-stone-50 px-2 py-1 rounded border border-stone-200 truncate">
                            MahaRERA: {prop.reraNumber}
                          </div>
                        )}

                        {/* Touch-Friendly Action Buttons (Minimum 44x44px Targets) */}
                        <div className="pt-1 flex items-center justify-between gap-2">
                          <Link
                            href={`/properties/${prop.slug}`}
                            onClick={() => setIsMinimized(true)}
                            className="touch-manipulation text-xs font-semibold text-[#171717] hover:text-[#B99A63] flex items-center gap-1 min-h-[44px] px-2.5 py-1 rounded-lg border border-[#E8E5DF] hover:border-[#171717] transition-colors"
                          >
                            <span>Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setBookingProperty(prop);
                                setActiveTab('chat');
                              }}
                              className="touch-manipulation inline-flex items-center gap-1.5 bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-medium px-3.5 py-2.5 rounded-lg transition-colors min-h-[44px] active:scale-95 shadow-xs"
                            >
                              <Calendar className="w-3.5 h-3.5 text-[#B99A63]" />
                              <span>Book Visit</span>
                            </button>

                            <a
                              href={getWhatsAppLink(`Hello Signature Aura, I am inquiring about ${prop.title} (${prop.priceDisplay}) from the RAG Property Assistant.`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-colors touch-manipulation active:scale-95 shadow-xs"
                              title="Chat on WhatsApp"
                              aria-label="Chat on WhatsApp regarding this property"
                            >
                              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Switch to Chat CTA */}
            <div className="p-3 bg-white border-t border-[#E8E5DF] flex items-center justify-between">
              <span className="text-xs text-stone-600">Need specific floorplates or due diligence?</span>
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className="touch-manipulation text-xs font-semibold text-[#B99A63] hover:text-[#8C6D37] flex items-center gap-1 min-h-[44px] px-3 py-1"
              >
                <span>Ask Assistant</span>
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            BOTTOM VIP CONCIERGE BAR: Safe-area Compliant & Quick Contact Links
           ========================================================================= */}
        <div className="bg-[#FAF9F5] px-3.5 sm:px-4 py-2 border-t border-[#E8E5DF] flex items-center justify-between text-[11px] text-[#777777] shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">Need bespoke Partner guidance?</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-2">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="text-stone-700 hover:text-[#B99A63] font-medium flex items-center gap-1 min-h-[38px] py-1 touch-manipulation"
            >
              <Phone className="w-3.5 h-3.5 text-[#B99A63]" />
              <span className="hidden sm:inline">Call VIP Desk</span>
            </a>
            <a
              href={getWhatsAppLink('Hello, I am speaking with the Signature Aura AI assistant and would like to speak directly with Senior Partner Rakesh Desale Patil.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1 min-h-[38px] py-1 touch-manipulation"
            >
              <span>WhatsApp Desk</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
