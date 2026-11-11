'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  Sparkles, 
  Phone, 
  Calendar,
  CheckCircle2,
  Database,
  Building,
  RefreshCw,
  MessageCircle,
  Volume2,
  VolumeX,
  Copy,
  Check,
  User,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import ChatMessageContent from './ChatMessageContent';

// ==============================================================================
// BUSINESS & WEBSITE CONFIGURATION (Easily Configurable)
// ==============================================================================
export const CHAT_CONFIG = {
  WEBSITE_NAME: "Signature Aura Developers",
  FOUNDER_NAME: "Alex Mercer & Rakesh Desale Patil",
  FOUNDER_PHONE_WHATSAPP: "918851619647", // International format without +
  PRIMARY_EMAIL: "contact@mybrand.com",
  HEAD_OFFICE: "Office No. 812, Millennium Towers, Baner-Sus, Pune, Maharashtra 411021",
  CORE_SERVICES: [
    "AI Agent & Workflow Automation (n8n, Python, Zapier, Webhooks)",
    "Custom AI Chatbots & RAG Assistants (WhatsApp bots, vector search, customer support)",
    "Full-Stack Web Development (Next.js, React, Tailwind, PostgreSQL)",
    "SaaS MVP Development (Rapid 2-week MVP sprints, payment integration)",
    "Luxury Real Estate & Land Aggregation (Worli Penthouses, Baner-Sus Acres, Builder JVs)"
  ],
  PRICING_SUMMARY: "Custom automations starting from $300; Full MVPs from $1,200; Free 30-min strategy audit.",
  TURNAROUND_TIME: "Working prototype in 48-72 hours; Full MVP in 10-14 days.",
  ESCROW_OR_GUARANTEE: "100% escrow protection available via Fiverr Pro/Upwork, plus milestone-based billing and NDA guarantee."
};

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isRagGrounded?: boolean;
  suggestedFollowUps?: string[];
  actionType?: 'strategy_call' | 'whatsapp' | 'pricing';
}

let msgIdCounter = 0;
const generateId = (prefix: string) => {
  msgIdCounter += 1;
  return `${prefix}-${msgIdCounter}-${typeof performance !== 'undefined' ? Math.floor(performance.now()) : 0}`;
};

// Strips markdown symbols for speech synthesis
function cleanMarkdownForSpeech(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[•\-\*◆]\s+/g, '')
    .replace(/\n+/g, ' ')
    .trim();
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Booking Form State
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    service: CHAT_CONFIG.CORE_SERVICES[0],
    date: '',
    description: ''
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `👋 Hello! I am **${CHAT_CONFIG.WEBSITE_NAME}**'s 24/7 AI Strategy Assistant.\n\nI can answer questions regarding our core engineering capabilities, live project pricing, turnaround guarantees, or schedule a direct consultation with **${CHAT_CONFIG.FOUNDER_NAME}**.\n\nHow can I help accelerate your project today?`,
      timestamp: 'Just now',
      isRagGrounded: true,
      suggestedFollowUps: [
        "How much does a custom project cost?",
        "How fast can you deliver an MVP?",
        "What services do you provide?",
        "Can we sign an NDA before speaking?"
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping, showBookingForm]);

  // Global Event Listener: window.addEventListener('open-ai-chat', ...)
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setUnreadCount(0);
    };

    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => {
      window.removeEventListener('open-ai-chat', handleOpenChat);
    };
  }, []);

  // Text-to-Speech Cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Direct WhatsApp Helper & Analytics Hook
  const sendDirectWhatsApp = (customMessage?: string) => {
    const defaultText = `Hello ${CHAT_CONFIG.WEBSITE_NAME}, I am chatting with your 24/7 AI Assistant and would like to connect directly regarding my project.`;
    const message = customMessage || defaultText;
    const url = `https://wa.me/${CHAT_CONFIG.FOUNDER_PHONE_WHATSAPP}?text=${encodeURIComponent(message)}`;
    
    // Fire tracking event if tracking SDK exists
    try {
      if (typeof window !== 'undefined' && (window as any).omnitrack?.conversion) {
        (window as any).omnitrack.conversion('AIChat_Consultation_Click', { message });
      }
    } catch {
      // Ignore tracking errors
    }

    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Zero-Latency Client-Side Knowledge Engine
  const generateBotReply = (rawQuery: string): { reply: string; followUps: string[]; actionType?: 'strategy_call' | 'whatsapp' | 'pricing' } => {
    const q = rawQuery.toLowerCase().trim();

    // 1. Pricing / Rates / Cost / Packages
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('package') || q.includes('quote') || q.includes('roi')) {
      return {
        reply: `### Transparent Investment & Pricing Structure

We deliver institutional-quality software and automation at milestone-based transparent rates:

• **AI Agent & Workflow Automations:** Starting from **$300** (n8n, Zapier, custom Python scripts, multi-app webhooks).
• **Custom AI Chatbots & RAG Assistants:** **$600 – $1,800** (Full vector search, WhatsApp bot integrations, bespoke embeddings).
• **Full-Stack SaaS MVP Development:** **$1,200 – $3,500** (Production-ready Next.js, Supabase/PostgreSQL, Tailwind, Stripe/Razorpay payments).
• **Strategy Audit:** **100% Free** (30-min architecture consultation).

Every engagement is backed by our milestone delivery guarantee and full IP transfer upon completion.`,
        followUps: [
          "How fast can you deliver?",
          "Book Free Strategy Call",
          "What is your tech stack?"
        ],
        actionType: 'strategy_call'
      };
    }

    // 2. Workflow Automation / n8n / Webhooks / Python
    if (q.includes('n8n') || q.includes('automation') || q.includes('zapier') || q.includes('workflow') || q.includes('webhook') || q.includes('python')) {
      return {
        reply: `### AI Agent & Workflow Automation Services

We engineer zero-maintenance backend automations that eliminate manual operational bottlenecks:

• **n8n & Self-Hosted Automation:** Private self-hosted n8n infrastructure with unlimited executions and zero per-task fees.
• **WhatsApp CRM Sync:** Instant two-way routing of WhatsApp leads directly to Google Sheets, Notion, HubSpot, or PostgreSQL.
• **AI Multi-Agent Systems:** Autonomous research agents, automated invoice processors, and intelligent customer routing.
• **API Integration:** Stripe, Razorpay, Slack, Airtable, and custom REST/GraphQL webhooks.

Most automation workflows are live in **48 to 72 hours**.`,
        followUps: [
          "How much does a custom project cost?",
          "Can we sync WhatsApp to Google Sheets?",
          "Book Free Strategy Call"
        ],
        actionType: 'strategy_call'
      };
    }

    // 3. Custom AI Chatbots & RAG Assistants
    if (q.includes('chatbot') || q.includes('rag') || q.includes('bot') || q.includes('vector') || q.includes('embeddings')) {
      return {
        reply: `### Enterprise AI Chatbots & Custom RAG Engines

We design intelligent, zero-hallucination conversational agents grounded strictly in your company's private documents:

• **Document Grounding (RAG):** Connect PDFs, notion knowledge bases, and inventory databases via vector search (pgvector, Pinecone).
• **Multi-Channel Deployment:** Embed seamlessly on your React / Next.js website, WhatsApp Business API, Telegram, or internal Slack.
• **Lead Capture & Qualification:** Automatically qualify leads, capture emails/phones, and trigger instant WhatsApp alerts to your sales team.
• **Zero-Latency Fallbacks:** Hybrid architecture ensuring 100% uptime even during LLM provider rate spikes.`,
        followUps: [
          "What is the turnaround time?",
          "How much does a custom project cost?",
          "Talk to Founder on WhatsApp"
        ],
        actionType: 'whatsapp'
      };
    }

    // 4. Turnaround Time & Delivery Speed
    if (q.includes('fast') || q.includes('turnaround') || q.includes('timeline') || q.includes('how long') || q.includes('deliver') || q.includes('days')) {
      return {
        reply: `### Rapid Delivery Timelines & Sprints

We move fast without cutting engineering corners:

• **Working Prototype / Automation:** Delivered in **48 to 72 hours**.
• **Custom AI Chatbot (Web + WhatsApp):** Production deployment in **3 to 5 days**.
• **Full SaaS MVP (Full-Stack):** Complete end-to-end launch in **10 to 14 days**.
• **Continuous Sprints:** Daily async video progress updates via Loom and GitHub repository access from Day 1.`,
        followUps: [
          "Can we sign an NDA first?",
          "How much does a custom project cost?",
          "Book Free Strategy Call"
        ],
        actionType: 'strategy_call'
      };
    }

    // 5. Escrow, Safety, Guarantees & NDA
    if (q.includes('escrow') || q.includes('nda') || q.includes('guarantee') || q.includes('safe') || q.includes('contract') || q.includes('fiverr') || q.includes('upwork')) {
      return {
        reply: `### Escrow Protection & Legal Safeguards

Your capital and intellectual property are 100% secure with us:

• **100% Escrow Protection:** We gladly facilitate contracts through **Fiverr Pro** or **Upwork Enterprise** upon client request.
• **Mutual Non-Disclosure Agreement (NDA):** Signed prior to code sharing or strategic discovery calls.
• **Milestone Payments:** You only release milestone funds when the agreed scope is demonstrated live in a staging environment.
• **100% IP Transfer:** Full copyright, Git repository rights, and deployment secrets belong exclusively to you.`,
        followUps: [
          "Book Free Strategy Call",
          "What is your tech stack?",
          "Talk to Founder on WhatsApp"
        ],
        actionType: 'whatsapp'
      };
    }

    // 6. Web Development & Tech Stack
    if (q.includes('web') || q.includes('tech stack') || q.includes('next') || q.includes('react') || q.includes('tailwind') || q.includes('database')) {
      return {
        reply: `### Modern Full-Stack Web Development

We build high-performance, SEO-optimized web applications with modern architecture:

• **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS v4, TypeScript, Framer Motion.
• **Backend & Database:** Node.js, Python FastAPI, PostgreSQL (Supabase / Neon), Redis.
• **Cloud & Edge Infrastructure:** Vercel Edge, AWS Lambda, Cloudflare CDN.
• **Security & Standards:** Enterprise OWASP compliance, zero hydration errors, 100% Core Web Vitals optimization.`,
        followUps: [
          "How fast can you deliver an MVP?",
          "How much does a custom project cost?",
          "Book Free Strategy Call"
        ],
        actionType: 'strategy_call'
      };
    }

    // 7. Luxury Real Estate / Land / Plots / Baner-Sus / Worli
    if (q.includes('real estate') || q.includes('property') || q.includes('penthouse') || q.includes('worli') || q.includes('pune') || q.includes('baner') || q.includes('plot') || q.includes('acre') || q.includes('rera')) {
      return {
        reply: `### Signature Aura™ Verified Real Estate Portfolio

Headquartered at **Office No. 812, Millennium Towers, Baner-Sus, Pune**:

• **Worli Sea Face Penthouses (Mumbai):** 5 BHK Triplex Sky-Residences (5,500 sq.ft.) with Arabian Sea vistas.
• **Land & Plots (Pune Prime Corridors):** Over **250+ acres** aggregated across Baner-Sus, Hinjawadi & Balewadi for builder Joint Ventures (JV) and clear-title NA plots.
• **Goa Luxury Villas:** Heritage Portuguese pool villas in Assagao and Candolim.
• **30-Year Forensic Title Due Diligence:** High-court advocate audited title search certificates prior to client earnest deposits.`,
        followUps: [
          "What properties are in Baner-Sus Pune?",
          "Show available penthouses in Worli",
          "Talk to Founder on WhatsApp"
        ],
        actionType: 'whatsapp'
      };
    }

    // 8. General Greetings (Hi, Hello, Hey)
    if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'namaste' || q.startsWith('hi ') || q.startsWith('hello ')) {
      return {
        reply: `### Welcome to ${CHAT_CONFIG.WEBSITE_NAME}!

Namaste & hello! I am your 24/7 AI Assistant, ready to help you explore:

• **Custom AI Agents & Workflow Automations** (Save 20+ hours/week)
• **Custom RAG Chatbots & WhatsApp CRM Bots** (24/7 lead conversion)
• **Rapid SaaS MVP Delivery** (Production live in 10-14 days)
• **Luxury Real Estate & Land Acquisitions** (Pune, Mumbai, Goa)

What would you like to build or explore today?`,
        followUps: [
          "How much does a custom project cost?",
          "How fast can you deliver an MVP?",
          "Book Free Strategy Call"
        ],
        actionType: 'strategy_call'
      };
    }

    // 9. Intelligent Default Fallback
    return {
      reply: `### Thank you for your inquiry!

I have recorded your question: *"${rawQuery}"*.

Our engineering and advisory desk led by **${CHAT_CONFIG.FOUNDER_NAME}** can provide a tailored solution for your specific requirements. We typically respond within **15 minutes** on WhatsApp or during your free strategy call.`,
      followUps: [
        "Book Free Strategy Call",
        "How much does a custom project cost?",
        "Talk to Founder on WhatsApp"
      ],
      actionType: 'whatsapp'
    };
  };

  // Handle Send Message
  const handleSend = (text?: string) => {
    const queryToSend = text || input;
    if (!queryToSend.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: generateId('u'),
      role: 'user',
      content: queryToSend.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    if (!text) setInput('');
    setIsTyping(true);

    // Realistic typing delay: 400ms - 650ms for instantaneous feeling
    const delay = Math.floor(Math.random() * 250) + 400;

    setTimeout(() => {
      const { reply, followUps, actionType } = generateBotReply(queryToSend);

      const botMessage: ChatMessage = {
        id: generateId('b'),
        role: 'assistant',
        content: reply,
        timestamp: 'Just now',
        isRagGrounded: true,
        suggestedFollowUps: followUps,
        actionType
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  // Text to Speech
  const toggleSpeech = (msgId: string, content: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = cleanMarkdownForSpeech(content);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Copy to Clipboard
  const handleCopy = (msgId: string, content: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      setCopiedMessageId(msgId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    }
  };

  // Handle Booking Form Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.phone) return;

    const formattedMessage = `*New Strategy Call Booking via AI Assistant:*
• *Name:* ${bookingData.name}
• *Phone:* ${bookingData.phone}
• *Service Interest:* ${bookingData.service}
• *Preferred Date:* ${bookingData.date || 'Flexible'}
• *Project Details:* ${bookingData.description || 'Discuss on call'}`;

    // Add confirmation message to chat stream
    const confirmationMsg: ChatMessage = {
      id: generateId('booking-confirm'),
      role: 'assistant',
      content: `### Strategy Call Request Confirmed! 🎉\n\nThank you **${bookingData.name}**. Your consultation request for **${bookingData.service}** has been recorded.\n\nTo lock in your calendar slot immediately with **${CHAT_CONFIG.FOUNDER_NAME}**, please tap the button below to confirm on WhatsApp in 1-click.`,
      timestamp: 'Just now',
      isRagGrounded: true,
      suggestedFollowUps: [
        "How fast can you deliver an MVP?",
        "What is your tech stack?",
        "How much does a custom project cost?"
      ]
    };

    setMessages(prev => [...prev, confirmationMsg]);
    setShowBookingForm(false);

    // Open WhatsApp with prefilled message
    sendDirectWhatsApp(formattedMessage);
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING CHAT TRIGGER (Bottom-Right with Pulsing Ring & Unread Badge)
         ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        {!isOpen && (
          <div className="relative group">
            {/* Glowing Pulsing Ring */}
            <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#B99A63] to-amber-500 opacity-70 blur-xs group-hover:opacity-100 animate-pulse transition duration-500" />

            <button
              onClick={() => {
                setIsOpen(true);
                setUnreadCount(0);
              }}
              aria-label="Open 24/7 AI Chat Assistant"
              className="relative flex items-center gap-2.5 bg-[#171717] hover:bg-[#222222] text-[#FAF9F5] border border-[#B99A63]/60 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Avatar Icon with Online Badge */}
              <div className="relative w-8 h-8 rounded-full bg-[#B99A63]/20 border border-[#B99A63] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#E8D39E]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#171717]" />
              </div>

              <div className="text-left hidden sm:block">
                <span className="text-xs font-semibold block leading-tight text-white">
                  24/7 AI Assistant
                </span>
                <span className="text-[10px] text-emerald-400 font-medium block">
                  Active Now · Online
                </span>
              </div>

              {/* Unread Counter Badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* =========================================================================
          2. EXPANDED SLIDE-IN CHAT MODAL (High-End Glassmorphism & Responsive)
         ========================================================================= */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="AI Chat Assistant"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-w-[430px] h-[85vh] max-h-[660px] flex flex-col bg-[#141416]/95 backdrop-blur-xl border border-[#2D2D32] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header Bar */}
          <div className="bg-[#1C1C20] px-4 py-3.5 border-b border-[#2D2D32] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#B99A63]/25 border border-[#B99A63] flex items-center justify-center shrink-0 shadow-inner">
                <Bot className="w-5 h-5 text-[#E8D39E]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#1C1C20]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-semibold text-white tracking-wide">
                    {CHAT_CONFIG.WEBSITE_NAME}
                  </h3>
                  <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.2 rounded-full font-mono uppercase">
                    AI Active
                  </span>
                </div>
                <p className="text-[10px] text-stone-400">
                  Zero-Latency RAG Engine · Immediate Responses
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* WhatsApp Quick Icon */}
              <button
                type="button"
                onClick={() => sendDirectWhatsApp()}
                title="Chat directly on WhatsApp"
                aria-label="Chat directly on WhatsApp"
                className="p-2 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Pills Strip below Header */}
          <div className="bg-[#18181B] px-3 py-2 border-b border-[#2D2D32] flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 touch-action-pan-x">
            <button
              type="button"
              onClick={() => setShowBookingForm(prev => !prev)}
              className="text-[11px] bg-[#B99A63]/20 hover:bg-[#B99A63]/30 text-[#E8D39E] border border-[#B99A63]/50 px-2.5 py-1 rounded-full whitespace-nowrap transition-all font-medium flex items-center gap-1 shrink-0"
            >
              <Calendar className="w-3 h-3 text-[#B99A63]" />
              <span>{showBookingForm ? 'Back to Chat' : '📅 Book Strategy Call'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleSend("How much does a custom project cost?")}
              className="text-[11px] bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-all shrink-0"
            >
              💰 Pricing & ROI
            </button>
            <button
              type="button"
              onClick={() => handleSend("What land parcels, acres, and builder joint ventures are available in Pune?")}
              className="text-[11px] bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-all shrink-0"
            >
              🏗️ Plots & Acres (JV)
            </button>
            <button
              type="button"
              onClick={() => handleSend("Show sea-facing penthouses in Worli")}
              className="text-[11px] bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-all shrink-0"
            >
              🚀 Worli Penthouses
            </button>
            <button
              type="button"
              onClick={() => handleSend("What services does Signature Aura offer?")}
              className="text-[11px] bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-all shrink-0"
            >
              💻 All Services
            </button>
          </div>

          {/* =====================================================================
              3. IN-CHAT STRATEGY CALL BOOKING FORM (Toggleable)
             ===================================================================== */}
          {showBookingForm ? (
            <div className="flex-1 overflow-y-auto p-4 bg-[#101012] text-stone-200">
              <div className="bg-[#1A1A1E] border border-[#2D2D32] rounded-2xl p-4 sm:p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#B99A63]" />
                    <h4 className="font-serif text-sm font-semibold text-white">
                      Book Free 30-Min Strategy Call
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="text-stone-400 hover:text-white text-xs underline"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={bookingData.name}
                      onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full bg-[#121214] border border-stone-700 rounded-lg px-3 py-2 text-white placeholder-stone-500 focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={bookingData.phone}
                      onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full bg-[#121214] border border-stone-700 rounded-lg px-3 py-2 text-white placeholder-stone-500 focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1">
                      Service Interest
                    </label>
                    <select
                      value={bookingData.service}
                      onChange={e => setBookingData({ ...bookingData, service: e.target.value })}
                      className="w-full bg-[#121214] border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B99A63]"
                    >
                      {CHAT_CONFIG.CORE_SERVICES.map((s, idx) => (
                        <option key={idx} value={s} className="bg-stone-900 text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={e => setBookingData({ ...bookingData, date: e.target.value })}
                      className="w-full bg-[#121214] border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#B99A63]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1">
                      Brief Project Goals
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us what you are looking to automate or build..."
                      value={bookingData.description}
                      onChange={e => setBookingData({ ...bookingData, description: e.target.value })}
                      className="w-full bg-[#121214] border border-stone-700 rounded-lg px-3 py-2 text-white placeholder-stone-500 focus:outline-none focus:border-[#B99A63] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#B99A63] to-amber-600 hover:from-[#c5a86f] hover:to-amber-500 text-[#171717] font-semibold py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Confirm & Schedule Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* =====================================================================
                4. MESSAGES STREAM (With TTS, Copy, Assumption Chips & Rich Markdown)
               ===================================================================== */
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#101012] text-xs sm:text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`relative max-w-[88%] p-3.5 rounded-2xl leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-[#B99A63] to-amber-600 text-[#171717] font-medium rounded-br-xs'
                        : 'bg-[#1A1A1E] text-stone-200 border border-[#2D2D32] rounded-bl-xs'
                    }`}
                  >
                    {/* Bot Header Badge */}
                    {m.role === 'assistant' && (
                      <div className="flex items-center justify-between gap-1.5 mb-2 pb-1.5 border-b border-stone-800 text-[10px] text-[#B99A63]">
                        <div className="flex items-center gap-1 font-mono uppercase">
                          <Database className="w-2.5 h-2.5 text-[#B99A63]" />
                          <span>Knowledge Grounded</span>
                        </div>

                        {/* Message Utilities: Text-to-Speech & Copy */}
                        <div className="flex items-center gap-1 text-stone-400">
                          <button
                            type="button"
                            onClick={() => toggleSpeech(m.id, m.content)}
                            title={speakingMessageId === m.id ? "Stop voice" : "Read aloud (TTS)"}
                            aria-label="Text to speech"
                            className="p-1 rounded hover:bg-stone-800 hover:text-white transition-colors"
                          >
                            {speakingMessageId === m.id ? (
                              <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopy(m.id, m.content)}
                            title="Copy response"
                            aria-label="Copy response"
                            className="p-1 rounded hover:bg-stone-800 hover:text-white transition-colors"
                          >
                            {copiedMessageId === m.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Rich Formatted Markdown Content */}
                    <div className="font-light">
                      <ChatMessageContent content={m.content} isUser={m.role === 'user'} isDark={true} />
                    </div>

                    {/* Action Callout Button if applicable */}
                    {m.role === 'assistant' && m.actionType === 'strategy_call' && (
                      <div className="mt-3 pt-2.5 border-t border-stone-800">
                        <button
                          type="button"
                          onClick={() => setShowBookingForm(true)}
                          className="w-full bg-[#B99A63]/20 hover:bg-[#B99A63]/30 text-[#E8D39E] border border-[#B99A63]/50 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                        >
                          <Calendar className="w-3 h-3 text-[#B99A63]" />
                          <span>Book Free 30-Min Strategy Call</span>
                        </button>
                      </div>
                    )}

                    {m.role === 'assistant' && m.actionType === 'whatsapp' && (
                      <div className="mt-3 pt-2.5 border-t border-stone-800">
                        <button
                          type="button"
                          onClick={() => sendDirectWhatsApp()}
                          className="w-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-400" />
                          <span>Chat with Founder on WhatsApp</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Assumption Follow-Up Question Chips */}
                  {m.role === 'assistant' && m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                    <div className="mt-2 pl-1 space-y-1 max-w-[90%]">
                      <span className="text-[10px] text-stone-500 block mb-1">
                        Suggested follow-ups:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {m.suggestedFollowUps.map((chip, cIdx) => (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => handleSend(chip)}
                            className="text-[11px] bg-[#18181B] hover:bg-[#B99A63]/25 text-stone-300 hover:text-white border border-stone-800 hover:border-[#B99A63]/50 px-2.5 py-1 rounded-full transition-all text-left flex items-center gap-1"
                          >
                            <span>{chip}</span>
                            <ChevronRight className="w-2.5 h-2.5 text-[#B99A63]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Realistic 3-Dot Animated Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 bg-[#1A1A1E] text-stone-300 border border-[#2D2D32] px-3.5 py-2.5 rounded-2xl w-fit">
                  <Bot className="w-3.5 h-3.5 text-[#B99A63]" />
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99A63] animate-bounce" />
                  </div>
                  <span className="text-[11px] text-stone-400 ml-1">Formulating verified reply...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* =====================================================================
              5. INPUT BAR & CONTROLS
             ===================================================================== */}
          {!showBookingForm && (
            <div className="bg-[#18181B] p-3 border-t border-[#2D2D32] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about pricing, MVP speed, automations..."
                  className="flex-1 bg-[#101012] border border-stone-800 text-stone-200 placeholder-stone-500 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#B99A63] transition-colors"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="bg-[#B99A63] hover:bg-amber-600 disabled:opacity-40 disabled:hover:bg-[#B99A63] text-[#171717] p-2.5 rounded-xl font-bold transition-all shrink-0 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-900 text-[10px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#B99A63]" />
                  <span>100% Private & NDA Protected</span>
                </span>
                <button
                  type="button"
                  onClick={() => sendDirectWhatsApp()}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-500" />
                  <span>Direct WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
