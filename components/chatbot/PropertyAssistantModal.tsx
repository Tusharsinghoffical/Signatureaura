'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageSquare,
  MessageCircle,
  Send,
  X,
  BotMessageSquare,
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
  MapPin,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppLink } from '@/lib/config';
import { SAMPLE_PROPERTIES } from '@/lib/data/sample-data';
import { retrieveWebsiteKnowledge } from '@/lib/rag/knowledge-retriever';
import {
  createStoredSiteVisit,
  createStoredLead,
  validateGenuineContact,
} from '@/lib/client-storage';
import ChatMessageContent from './ChatMessageContent';

interface SourceCitation {
  title: string;
  url: string;
  category: string;
}

interface MatchedPropertyItem {
  id: string;
  slug: string;
  title: string;
  propertyType?: string;
  category?: string;
  priceDisplay?: string;
  price?: number | string;
  bedrooms?: number;
  carpetAreaSqFt?: number;
  possessionDate?: string;
  reraNumber?: string;
  featuredImage?: string;
  images?: { url: string; caption?: string }[];
  highlightFeatures?: string[];
  locality?: string;
  city?: string;
  location?: {
    locality?: string;
    city?: string;
  };
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: SourceCitation[];
  matchedProperties?: MatchedPropertyItem[];
  suggestedFollowUps?: string[];
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
    content:
      'Namaste. Welcome to **Signature Aura Concierge**. Explore our MahaRERA-verified homes across **Pune** (Baner-Sus & Balewadi), **Nashik** (Gangapur Road), and **Panvel, Mumbai** (New Panvel) priced between **₹ 45 Lakh – ₹ 85 Lakh**.',
    timestamp: 'Just now',
    suggestedFollowUps: [
      'Signature Aura Baner 2 BHK ₹ 45 Lakh',
      'Aura Sky Panvel Mumbai ₹ 85 Lakh',
      'Show 3 BHK in Gangapur Road Nashik',
      '30-year property title audit',
    ],
  },
];

const QUICK_TOPICS = [
  { label: 'Pune (Baner)', query: 'Tell me about Signature Aura 2 BHK and 3 BHK properties in Pune' },
  { label: 'Panvel, Mumbai', query: 'Show properties in Panvel Mumbai including Aura Sky and Aura Courtyard' },
  { label: 'Nashik Homes', query: 'Show 3 BHK property on Gangapur Road Nashik' },
  { label: 'Ready to Move', query: 'Which ready to move zero GST properties are available?' },
  { label: 'Title Audit', query: 'How does Signature Aura perform forensic 30-year title due diligence?' },
  { label: 'NRI Desk', query: 'What are the RBI and FEMA guidelines for NRIs buying property in Maharashtra?' },
  { label: 'Partners', query: 'Who are the Partners at Signature Aura?' },
];

export default function PropertyAssistantModal({
  isOpen,
  onClose,
  currentPropertyTitle,
}: PropertyAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [activeTab, setActiveTab] = useState<'chat' | 'inventory'>('chat');
  const [inventoryCityFilter, setInventoryCityFilter] = useState<string>('All');
  const [ragProperties, setRagProperties] = useState<MatchedPropertyItem[]>(() =>
    SAMPLE_PROPERTIES.slice(0, 8)
  );

  // In-Chat Site Visit Booking Sub-State
  const [bookingProperty, setBookingProperty] = useState<MatchedPropertyItem | null>(null);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  useEffect(() => {
    if (isOpen && !isMinimized && activeTab === 'chat') {
      scrollToBottom();
      // Only auto-focus input on desktop/tablet so mobile virtual keyboard doesn't cover the chat on open
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        const timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, isMinimized, activeTab]);

  useEffect(() => {
    if (isOpen && !isMinimized && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, bookingProperty, activeTab]);

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
    const query = (textToSend ?? input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: getNextMsgId('user'),
      role: 'user',
      content: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const rag = retrieveWebsiteKnowledge(query);
      const qLower = query.toLowerCase();

      let reply = '';
      if (rag.matchedProperties.length > 0) {
        const topProp = rag.matchedProperties[0];
        reply = `We have verified listings matching your inquiry, led by **${topProp.title}** in **${topProp.location.locality}, ${topProp.location.city}** (${topProp.propertyType}, ${topProp.priceDisplay}).\n\n• **Configuration**: ${topProp.bedrooms > 0 ? `${topProp.bedrooms} BHK` : 'Grade-A'} · ${topProp.carpetAreaSqFt} sq.ft.\n• **RERA**: \`${topProp.reraNumber || 'Verified MahaRERA'}\`\n• **Highlights**: ${topProp.highlightFeatures?.slice(0, 3).join(', ')}\n\nYou can reserve a private site visit below or connect directly on WhatsApp.`;
      } else if (
        qLower.includes('partner') ||
        qLower.includes('director') ||
        qLower.includes('rakesh')
      ) {
        reply = `Signature Aura Pvt. Ltd. is led by Founding Partner & Director **Rakesh Desale Patil**, alongside Partners **Uma Bhandwalkar**, **Akshay Bhote**, and **Rama Bhote**.\n\nHead Office: **Office No. 812, Millennium Towers, Baner-Sus, Pune**. Would you like to book a consultation?`;
      } else if (
        qLower.includes('rera') ||
        qLower.includes('title') ||
        qLower.includes('legal')
      ) {
        reply = `Every residential and commercial asset advised by Signature Aura undergoes **30-year forensic property title scrutiny** led by Partner Akshay Bhote—covering sub-registrar deeds, 7/12 extracts, and MahaRERA promoter filings before client presentation.`;
      } else if (qLower.includes('nri') || qLower.includes('fema') || qLower.includes('rbi')) {
        reply = `Our Global NRI Desk facilitates compliant acquisitions under **RBI and FEMA guidelines**, including NRE/NRO remittance structuring, Form 15CA/CB repatriation advisory, Power of Attorney execution, and virtual Matterport tours.`;
      } else {
        reply = `Welcome to Signature Aura Developers & Advisory. Explore flagship projects **Signature Aura Baner** (2 BHK from ₹ 45 Lakh) and **Aura Sky Mumbai** (from ₹ 85 Lakh), or browse all residences priced strictly between **₹ 40 Lakh – ₹ 90 Lakh**.`;
      }

      const phoneMatch = query.match(/(\+?\d[\d\s-]{8,})/);
      const emailMatch = query.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (phoneMatch || emailMatch) {
        createStoredLead({
          fullName: 'Website Inquirer',
          phone: phoneMatch ? phoneMatch[0].trim() : '',
          email: emailMatch ? emailMatch[0].trim() : '',
          leadSource: 'ai_assistant',
          propertyTitle:
            currentPropertyTitle || rag.matchedProperties[0]?.title || 'General Inquiry',
          message: query,
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
      };
      setMessages((prev) => [...prev, assistantMsg]);

      if (rag.matchedProperties && rag.matchedProperties.length > 0) {
        setRagProperties((prev) => {
          const newIds = new Set(rag.matchedProperties.map((p) => p.id));
          const remaining = prev.filter((p) => !newIds.has(p.id));
          return [...rag.matchedProperties, ...remaining];
        });
      }
    } catch {
      const errorMsg: Message = {
        id: getNextMsgId('bot'),
        role: 'assistant',
        content: `For immediate personal assistance, please connect with our advisory team on [WhatsApp](${getWhatsAppLink()}) or call ${BUSINESS_CONFIG.phoneNumber}.`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: getNextMsgId('welcome'),
        role: 'assistant',
        content:
          'Conversation cleared. How may our advisory desk help with **Signature Aura Baner**, **Aura Sky Mumbai**, or other properties?',
        timestamp: 'Just now',
        suggestedFollowUps: [
          'Signature Aura Baner 2 BHK ₹ 45 Lakh',
          'Aura Sky Mumbai starting ₹ 85 Lakh',
          '30-year title audit protocol',
        ],
      },
    ]);
    setLeadCaptured(false);
    setBookingProperty(null);
  };

  const handleInChatBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingProperty) return;
    setBookingSuccessMsg('');
    setBookingErrorMsg('');

    const validation = validateGenuineContact({
      fullName: bookingForm.fullName,
      phone: bookingForm.phone,
      email: bookingForm.email,
    });
    if (!validation.valid) {
      setBookingErrorMsg(validation.error || 'Please provide valid name, phone, and email.');
      return;
    }
    if (!bookingForm.visitDate) {
      setBookingErrorMsg('Please select a preferred site visit date.');
      return;
    }

    setIsBookingSubmitting(true);

    try {
      createStoredSiteVisit({
        fullName: bookingForm.fullName.trim(),
        phone: bookingForm.phone.trim(),
        email: bookingForm.email.trim(),
        propertyId: bookingProperty.id,
        propertyTitle: bookingProperty.title,
        visitDate: bookingForm.visitDate,
        timeSlot: bookingForm.timeSlot,
        numberOfVisitors: 2,
        pickupRequired: true,
        notes: 'Requested directly through Signature Aura Concierge.',
      });

      setBookingSuccessMsg(
        `Private viewing reserved for ${bookingForm.visitDate} (${bookingForm.timeSlot}).`
      );
      const confirmMsg: Message = {
        id: getNextMsgId('system'),
        role: 'assistant',
        content: `**Site Visit Confirmed** for **${bookingProperty.title}** on **${bookingForm.visitDate}** (${bookingForm.timeSlot}).\n\nOur Senior Partner has logged your details (**${bookingForm.phone}**) and will coordinate gate clearance and private escort.`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, confirmMsg]);
      setTimeout(() => {
        setBookingProperty(null);
        setBookingSuccessMsg('');
        setBookingForm({
          fullName: '',
          phone: '',
          email: '',
          visitDate: '',
          timeSlot: '04:30 PM - 06:00 PM (Sunset Viewing)',
        });
      }, 2400);
    } catch {
      setBookingErrorMsg('Unable to reserve viewing right now. Please connect on WhatsApp.');
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const filteredInventory = ragProperties.filter((p) => {
    if (inventoryCityFilter === 'All') return true;
    if (inventoryCityFilter === 'Commercial') return p.category === 'commercial';
    const city = p.location?.city || p.city || '';
    return city.toLowerCase().includes(inventoryCityFilter.toLowerCase());
  });

  // Find index of latest assistant message so follow-up prompts only appear once cleanly
  const lastAssistantIndex = messages.reduce(
    (acc, msg, idx) => (msg.role === 'assistant' ? idx : acc),
    -1
  );

  // =========================================================================
  // 1. MINIMIZED FLOATING BAR
  // =========================================================================
  if (isMinimized) {
    return (
      <div
        role="region"
        aria-label="Minimized Property Concierge"
        className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 sm:bottom-6 sm:right-6 z-[90] pointer-events-auto animate-in slide-in-from-bottom-2 duration-200"
      >
        <div
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 bg-[#141416] hover:bg-[#1E1E22] text-[#FAF9F5] border border-[#B99A63]/60 rounded-full py-2 pl-2.5 pr-2 shadow-2xl transition-colors cursor-pointer touch-manipulation min-h-[46px]"
        >
          <div className="w-8 h-8 rounded-full bg-[#222226] border border-[#B99A63]/50 flex items-center justify-center shrink-0">
            <BotMessageSquare className="w-4 h-4 text-[#E8D39E]" />
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="text-xs font-medium text-[#FAF9F5] leading-tight whitespace-nowrap">
              Aura Concierge
            </span>
            <span className="text-[11px] text-stone-400 flex items-center gap-1 leading-tight">
              <span>Resume chat</span>
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
            className="w-8 h-8 rounded-full hover:bg-white/10 text-stone-400 hover:text-white flex items-center justify-center transition-colors touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. REFINED LUXURY CONCIERGE DIALOG (Mobile Sheet & Laptop Floating Panel)
  // =========================================================================
  return (
    <div
      className={`fixed inset-0 z-[90] flex transition-all duration-200 pointer-events-none ${
        isExpanded
          ? 'items-end sm:items-center justify-center p-0 sm:p-5'
          : 'items-end justify-end p-0 sm:p-5'
      }`}
    >
      {/* Dismissible Backdrop */}
      <div
        className={`fixed inset-0 transition-opacity pointer-events-auto ${
          isExpanded ? 'bg-black/55 backdrop-blur-xs' : 'bg-black/40 sm:bg-black/20'
        }`}
        onClick={() => setIsMinimized(true)}
        aria-hidden="true"
      />

      {/* Dialog Surface */}
      <div
        role="dialog"
        aria-label="Signature Aura Property Concierge"
        className={`relative flex flex-col bg-[#FAF9F5] overflow-hidden pointer-events-auto transition-all duration-200 ease-out
          w-full h-[100dvh] max-h-[100dvh] rounded-none border-0 shadow-none
          sm:rounded-2xl sm:border sm:border-[#DFD9CE] sm:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.28)]
          ${
            isExpanded
              ? 'sm:w-[min(860px,calc(100vw-2.5rem))] sm:h-[min(760px,calc(100dvh-2.5rem))] sm:max-h-[90dvh]'
              : 'sm:w-[430px] md:w-[450px] sm:h-[min(640px,calc(100dvh-2.5rem))] sm:max-h-[88dvh]'
          }
        `}
      >
        {/* Single Architectural Dark Header */}
        <header className="bg-[#141416] text-[#FAF9F5] px-3.5 sm:px-4 pt-[max(0.65rem,env(safe-area-inset-top))] pb-2.5 sm:py-3 border-b border-[#26262A] shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1E1E22] border border-[#B99A63]/60 flex items-center justify-center shrink-0">
                <BotMessageSquare className="w-4 h-4 text-[#E8D39E]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-sm sm:text-[15px] font-medium text-[#FAF9F5] truncate leading-snug">
                  Signature Aura Concierge
                </h3>
                <p className="text-[11px] text-stone-400 truncate leading-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="truncate">Verified Properties & Advisory</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleClear}
                title="Reset conversation"
                aria-label="Clear chat history"
                className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                title="Minimize"
                aria-label="Minimize chat"
                className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Compact view' : 'Expand view'}
                aria-label={isExpanded ? 'Restore compact view' : 'Expand window'}
                className="hidden sm:flex w-8 h-8 items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
              >
                {isExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                title="Close"
                aria-label="Close assistant"
                className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors touch-manipulation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Unified Segmented Navigation + Quick Connect Bar */}
        <div className="bg-[#F3EFE6] border-b border-[#E5E0D5] px-3 py-1.5 sm:py-2 flex items-center justify-between gap-2 shrink-0">
          <div className="inline-flex items-center bg-[#E7E2D6] p-0.5 rounded-lg min-w-0">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`touch-manipulation px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 min-h-[34px] ${
                activeTab === 'chat'
                  ? 'bg-[#141416] text-[#FAF9F5] shadow-2xs'
                  : 'text-stone-700 hover:text-[#141416]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="sm:hidden">Chat</span>
              <span className="hidden sm:inline">Advisory Chat</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inventory')}
              className={`touch-manipulation px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 min-h-[34px] tabular-nums ${
                activeTab === 'inventory'
                  ? 'bg-[#141416] text-[#FAF9F5] shadow-2xs'
                  : 'text-stone-700 hover:text-[#141416]'
              }`}
            >
              <Building className="w-3.5 h-3.5 shrink-0" />
              <span>Listings ({ragProperties.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              title="Call Advisory Desk"
              aria-label="Call Advisory Desk"
              className="touch-manipulation inline-flex items-center justify-center gap-1 w-9 h-9 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1.5 rounded-lg bg-white border border-[#E2DDD2] hover:border-[#B99A63] text-[#171717] text-xs font-medium transition-colors sm:min-h-[34px]"
            >
              <Phone className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#845E1B]" />
              <span className="hidden sm:inline">Call</span>
            </a>

            <a
              href={getWhatsAppLink(
                'Hello Signature Aura, I would like direct guidance from your Senior Advisory Desk.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
              className="touch-manipulation inline-flex items-center justify-center gap-1 w-9 h-9 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1FB858] text-white text-xs font-medium transition-colors sm:min-h-[34px] whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Lead Captured Confirmation Notice */}
        {leadCaptured && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-3.5 py-2 flex items-center gap-2 text-xs text-emerald-900 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">
              Request logged. Senior Partner Rakesh Desale Patil will connect shortly.
            </span>
          </div>
        )}

        {/* =========================================================================
            TAB 1: CONVERSATION VIEW
           ========================================================================= */}
        {activeTab === 'chat' && (
          <>
            {/* Horizontal Quick Prompts Strip: Always visible on desktop/tablet; on mobile hidden once conversation starts so keyboard leaves ample room */}
            <div
              className={`bg-white border-b border-[#EAE5DA] px-3 py-2 items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 ${
                messages.length <= 1 ? 'flex' : 'hidden sm:flex'
              }`}
            >
              {QUICK_TOPICS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSend(item.query)}
                  className="touch-manipulation whitespace-nowrap shrink-0 text-xs font-medium text-stone-700 hover:text-[#141416] bg-[#FAF9F5] hover:bg-[#F0ECE2] border border-[#E6E1D6] hover:border-[#B99A63]/60 px-3 py-1.5 rounded-lg transition-colors min-h-[34px]"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-3 sm:px-3.5 py-3.5 sm:py-4 space-y-4 bg-[#FAF9F5] chatbot-scroll-container">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const showFollowUps =
                  !isUser &&
                  idx === lastAssistantIndex &&
                  msg.suggestedFollowUps &&
                  msg.suggestedFollowUps.length > 0;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col min-w-0 ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    {/* Quiet sender & timestamp line above bubble */}
                    <span className="text-[11px] text-stone-500 mb-1 px-1">
                      {isUser ? 'You' : 'Aura Concierge'} · {msg.timestamp}
                    </span>

                    <div
                      className={`max-w-[94%] sm:max-w-[86%] min-w-0 px-3.5 py-3 text-[13.5px] sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#141416] text-[#FAF9F5] rounded-2xl rounded-tr-sm shadow-xs'
                          : 'bg-white border border-[#E6E1D6] text-[#1F1F1F] rounded-2xl rounded-tl-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                      }`}
                    >
                      <ChatMessageContent
                        content={msg.content}
                        isUser={isUser}
                        isDark={false}
                      />

                      {/* Matched Real Estate Cards */}
                      {msg.matchedProperties && msg.matchedProperties.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#EFECE4] space-y-2.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-medium text-stone-600">
                              Matching Properties ({msg.matchedProperties.length})
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveTab('inventory')}
                              className="text-[#845E1B] hover:text-[#141416] font-medium transition-colors"
                            >
                              View all listings →
                            </button>
                          </div>

                          <div
                            className={`grid gap-2.5 ${
                              isExpanded ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                            }`}
                          >
                            {msg.matchedProperties.map((prop) => {
                              const locality = prop.location?.locality || prop.locality || '';
                              const city = prop.location?.city || prop.city || '';
                              const locationLabel = [locality, city].filter(Boolean).join(', ');
                              const thumbUrl = prop.featuredImage || prop.images?.[0]?.url;

                              return (
                                <div
                                  key={prop.id}
                                  className="p-2.5 bg-[#FAF9F5] border border-[#E6E1D6] hover:border-[#B99A63]/60 rounded-xl transition-colors flex flex-col gap-2.5 min-w-0"
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    {/* Property Thumbnail */}
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                                      {thumbUrl ? (
                                        <Image
                                          src={thumbUrl}
                                          alt={prop.title}
                                          fill
                                          sizes="64px"
                                          className="object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#141416]">
                                          <Building className="w-5 h-5 text-[#B99A63]" />
                                        </div>
                                      )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                      <h4 className="font-serif text-[13px] font-semibold text-[#141416] line-clamp-1">
                                        {prop.title}
                                      </h4>
                                      <p className="text-xs font-semibold text-[#845E1B] tabular-nums mt-0.5">
                                        {prop.priceDisplay || prop.price}
                                      </p>
                                      <p className="text-[11px] text-stone-600 truncate mt-0.5">
                                        {locationLabel}
                                        {prop.bedrooms && prop.bedrooms > 0
                                          ? ` · ${prop.bedrooms} BHK`
                                          : ''}
                                        {prop.carpetAreaSqFt
                                          ? ` · ${prop.carpetAreaSqFt} sq.ft.`
                                          : ''}
                                      </p>
                                      {prop.reraNumber && (
                                        <p className="text-[10px] text-stone-500 font-mono truncate mt-0.5">
                                          RERA: {prop.reraNumber}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-[#EAE5DA] flex flex-wrap items-center justify-between gap-2">
                                    <Link
                                      href={`/properties/${prop.slug}`}
                                      onClick={() => setIsMinimized(true)}
                                      className="touch-manipulation text-xs font-medium text-stone-700 hover:text-[#141416] inline-flex items-center gap-0.5 px-1.5 py-1.5 min-h-[38px]"
                                    >
                                      <span>Details</span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>

                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => setBookingProperty(prop)}
                                        className="touch-manipulation inline-flex items-center gap-1 bg-[#141416] hover:bg-[#B99A63] text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors min-h-[38px] whitespace-nowrap"
                                      >
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>Book Visit</span>
                                      </button>

                                      <a
                                        href={getWhatsAppLink(
                                          `Hello Signature Aura, I am inquiring about ${prop.title} (${prop.priceDisplay}) from the website concierge.`
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Inquire on WhatsApp"
                                        title="Inquire on WhatsApp"
                                        className="touch-manipulation w-9 h-9 rounded-lg bg-[#25D366] hover:bg-[#1FB858] text-white flex items-center justify-center transition-colors shrink-0"
                                      >
                                        <MessageCircle className="w-4 h-4" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Subtle Source Links */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-[#EFECE4] flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-500">
                          <span>Sources:</span>
                          {msg.sources.slice(0, 2).map((source, sIdx) => (
                            <Link
                              key={sIdx}
                              href={source.url}
                              onClick={() => setIsMinimized(true)}
                              className="inline-flex items-center gap-1 text-stone-700 hover:text-[#845E1B] underline underline-offset-2 truncate max-w-[190px]"
                            >
                              <span className="truncate">{source.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Follow-up Prompts (shown cleanly only below the latest assistant message) */}
                    {showFollowUps && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[94%] sm:max-w-[86%]">
                        {msg.suggestedFollowUps!.map((q, qIdx) => (
                          <button
                            key={qIdx}
                            type="button"
                            onClick={() => handleSend(q)}
                            className="touch-manipulation text-xs text-stone-700 hover:text-[#141416] bg-white hover:bg-[#F3EFE6] border border-[#E2DDD2] hover:border-[#B99A63] px-3 py-2 rounded-lg transition-colors text-left min-h-[38px]"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* In-Chat Site Visit Booking Form */}
              {bookingProperty && (
                <div className="bg-white border border-[#B99A63] p-4 rounded-xl shadow-md space-y-3 animate-in fade-in duration-150">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-[#845E1B] block">
                        Private Site Visit Request
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-semibold text-[#141416]">
                        {bookingProperty.title}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {bookingProperty.location?.locality || bookingProperty.locality},{' '}
                        {bookingProperty.location?.city || bookingProperty.city} ·{' '}
                        {bookingProperty.priceDisplay || bookingProperty.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookingProperty(null)}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 rounded-lg touch-manipulation"
                      aria-label="Cancel booking"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {bookingErrorMsg && (
                    <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                      {bookingErrorMsg}
                    </div>
                  )}

                  {bookingSuccessMsg && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                      {bookingSuccessMsg}
                    </div>
                  )}

                  <form onSubmit={handleInChatBookingSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-xs font-medium text-stone-700 block mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Malhotra"
                          value={bookingForm.fullName}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, fullName: e.target.value })
                          }
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#DFD9CE] focus:border-[#141416] focus:outline-hidden px-3 py-2 rounded-lg text-base sm:text-xs min-h-[40px]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-stone-700 block mb-1">
                          Phone (+91)
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98200 XXXXX"
                          value={bookingForm.phone}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, phone: e.target.value })
                          }
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#DFD9CE] focus:border-[#141416] focus:outline-hidden px-3 py-2 rounded-lg text-base sm:text-xs min-h-[40px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-xs font-medium text-stone-700 block mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@example.com"
                          value={bookingForm.email}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, email: e.target.value })
                          }
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#DFD9CE] focus:border-[#141416] focus:outline-hidden px-3 py-2 rounded-lg text-base sm:text-xs min-h-[40px]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-stone-700 block mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={bookingForm.visitDate}
                          onChange={(e) =>
                            setBookingForm({ ...bookingForm, visitDate: e.target.value })
                          }
                          suppressHydrationWarning
                          className="w-full bg-[#FAF9F5] border border-[#DFD9CE] focus:border-[#141416] focus:outline-hidden px-3 py-2 rounded-lg text-base sm:text-xs min-h-[40px]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setBookingProperty(null)}
                        className="touch-manipulation px-3.5 py-2 text-xs text-stone-600 hover:text-stone-900 min-h-[38px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isBookingSubmitting}
                        className="touch-manipulation bg-[#141416] hover:bg-[#B99A63] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 min-h-[38px]"
                      >
                        <span>
                          {isBookingSubmitting ? 'Reserving...' : 'Confirm Viewing'}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Typing State */}
              {isLoading && (
                <div className="flex items-center gap-2 text-stone-500 text-xs py-1 px-1">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce [animation-delay:0.3s]" />
                  </div>
                  <span>Checking verified inventory...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Clean Composer Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-[#E6E1D6] shrink-0"
            >
              <div className="flex items-center gap-2 bg-[#FAF9F5] border border-[#DFD9CE] focus-within:border-[#B99A63] focus-within:bg-white rounded-2xl pl-3.5 pr-1.5 py-1.5 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  suppressHydrationWarning
                  placeholder="Ask about Baner 2 BHK, Aura Sky, prices..."
                  className="flex-1 min-w-0 bg-transparent focus:outline-hidden text-base sm:text-xs text-[#141416] placeholder:text-stone-400 min-h-[38px]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="touch-manipulation bg-[#141416] hover:bg-[#B99A63] disabled:opacity-35 text-white w-10 h-10 rounded-xl transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}

        {/* =========================================================================
            TAB 2: VERIFIED LISTINGS VIEW
           ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#FAF9F5]">
            {/* City Filter Bar */}
            <div className="px-3 py-2 bg-white border-b border-[#EAE5DA] flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {['All', 'Pune', 'Nashik', 'Panvel, Mumbai'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setInventoryCityFilter(city)}
                  className={`touch-manipulation whitespace-nowrap shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors min-h-[34px] ${
                    inventoryCityFilter === city
                      ? 'bg-[#141416] text-white'
                      : 'bg-[#FAF9F5] text-stone-700 hover:text-[#141416] border border-[#E6E1D6]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Scrollable Listings */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-3 sm:p-4 space-y-3 chatbot-scroll-container pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-medium text-[#141416] tabular-nums">
                  {filteredInventory.length} Verified Properties
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#845E1B]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>MahaRERA Audited</span>
                </span>
              </div>

              {filteredInventory.length === 0 ? (
                <div className="py-12 text-center text-stone-500 space-y-2">
                  <Building className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="text-sm">No listings found for {inventoryCityFilter}.</p>
                  <button
                    type="button"
                    onClick={() => setInventoryCityFilter('All')}
                    className="text-xs text-[#845E1B] underline font-medium"
                  >
                    Show all locations
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-3 ${
                    isExpanded ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {filteredInventory.map((prop) => {
                    const locality = prop.location?.locality || prop.locality || '';
                    const city = prop.location?.city || prop.city || '';
                    const thumbUrl = prop.featuredImage || prop.images?.[0]?.url;
                    return (
                      <div
                        key={prop.id}
                        className="bg-white border border-[#E6E1D6] rounded-xl overflow-hidden shadow-2xs hover:border-[#B99A63]/60 transition-colors flex flex-col justify-between group"
                      >
                        <div className="relative aspect-[16/9] w-full bg-stone-200 overflow-hidden">
                          {thumbUrl ? (
                            <Image
                              src={thumbUrl}
                              alt={prop.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 440px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#141416] text-stone-400">
                              <Building className="w-8 h-8 text-[#B99A63]" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                          <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-end gap-2 text-white">
                            <div className="min-w-0">
                              <p className="text-[11px] text-stone-200 flex items-center gap-1 truncate">
                                <MapPin className="w-3 h-3 text-[#E8D39E] shrink-0" />
                                <span className="truncate">
                                  {locality}, {city}
                                </span>
                              </p>
                              <h4 className="font-serif text-sm font-medium truncate text-white">
                                {prop.title}
                              </h4>
                            </div>
                            <span className="text-sm font-semibold text-[#E8DFD0] shrink-0 tabular-nums">
                              {prop.priceDisplay || prop.price}
                            </span>
                          </div>
                        </div>

                        <div className="p-3 space-y-2.5">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-stone-600 tabular-nums">
                            <span>
                              {prop.bedrooms && prop.bedrooms > 0
                                ? `${prop.bedrooms} BHK`
                                : prop.propertyType || 'Grade-A'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                              {prop.carpetAreaSqFt ? `${prop.carpetAreaSqFt} sq.ft.` : 'Custom Area'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{prop.possessionDate || 'Immediate'}</span>
                          </div>

                          {prop.reraNumber && (
                            <p className="text-[11px] text-stone-500 font-mono truncate">
                              RERA: {prop.reraNumber}
                            </p>
                          )}

                          <div className="pt-2 border-t border-[#EFECE4] flex items-center justify-between gap-2">
                            <Link
                              href={`/properties/${prop.slug}`}
                              onClick={() => setIsMinimized(true)}
                              className="touch-manipulation text-xs font-medium text-[#141416] hover:text-[#845E1B] inline-flex items-center gap-1 min-h-[38px] px-2"
                            >
                              <span>Details</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setBookingProperty(prop);
                                  setActiveTab('chat');
                                }}
                                className="touch-manipulation inline-flex items-center gap-1.5 bg-[#141416] hover:bg-[#B99A63] text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors min-h-[38px]"
                              >
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Book Visit</span>
                              </button>

                              <a
                                href={getWhatsAppLink(
                                  `Hello Signature Aura, I am inquiring about ${prop.title} (${prop.priceDisplay}) from the website concierge.`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Chat on WhatsApp"
                                title="Chat on WhatsApp"
                                className="touch-manipulation w-9 h-9 rounded-lg bg-[#25D366] hover:bg-[#1FB858] text-white flex items-center justify-center transition-colors shrink-0"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
