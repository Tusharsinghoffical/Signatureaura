'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building, 
  Users, 
  Calendar, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  EyeOff, 
  Star, 
  Download, 
  Search, 
  LogOut, 
  TrendingUp, 
  Save,
  Key,
  ExternalLink,
  RotateCcw,
  Database,
  X,
  Bell,
  RefreshCw,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Property, Lead, SiteVisit, BusinessConfig, LeadStatus } from '@/types/real-estate';
import { BUSINESS_CONFIG, formatINR } from '@/lib/config';
import {
  getStoredProperties,
  saveStoredProperty,
  deleteStoredProperty,
  getStoredLeads,
  updateStoredLeadStatus,
  deleteStoredLead,
  getStoredSiteVisits,
  updateStoredSiteVisitStatus,
  deleteStoredSiteVisit,
  getStoredSettings,
  updateStoredSettings,
  resetAllClientStorage,
  subscribeToClientStorage,
  subscribeToRealtimeInquiries,
  syncInquiriesWithServer,
  exportDataToCSV,
  type LiveArrivalNotice
} from '@/lib/client-storage';

function subscribeAdminAuth(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('aura_admin_auth_changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('aura_admin_auth_changed', callback);
  };
}

function getAdminAuthSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('aura_admin_authenticated') === 'true';
}

function getAdminAuthServerSnapshot(): boolean {
  return false;
}

interface LeadIntentInfo {
  isHighIntent: boolean;
  category: 'both' | 'site_visit' | 'pricing' | null;
  label: string;
  priorityScore: number;
}

function getLeadIntentInfo(lead: Lead): LeadIntentInfo {
  const text = `${lead.message || ''} ${lead.propertyTitle || ''}`.toLowerCase();

  const requestedSiteVisit =
    lead.leadSource === 'site_visit_booking' ||
    Boolean(lead.preferredVisitDate) ||
    lead.leadStatus === 'Site Visit Scheduled' ||
    /\b(site\s*visit|visit|viewing|tour|inspection|walkthrough|chauffeur)\b/i.test(text);

  const requestedPricing =
    Boolean(lead.budget && lead.budget.trim().length > 0) ||
    /\b(pric(e|ing)|cost\s*sheet|payment\s*plan|quote|quotation|rate|floor\s*plan|brochure|lakh|crore|cr\b|emi|discount|offer|budget)\b/i.test(text);

  if (requestedSiteVisit && requestedPricing) {
    return {
      isHighIntent: true,
      category: 'both',
      label: 'Site Visit & Pricing',
      priorityScore: 3,
    };
  }
  if (requestedSiteVisit) {
    return {
      isHighIntent: true,
      category: 'site_visit',
      label: 'Site Visit Request',
      priorityScore: 2,
    };
  }
  if (requestedPricing) {
    return {
      isHighIntent: true,
      category: 'pricing',
      label: 'Pricing Details',
      priorityScore: 1,
    };
  }
  return {
    isHighIntent: false,
    category: null,
    label: '',
    priorityScore: 0,
  };
}

export default function AdminPage() {
  const isStoredAuth = React.useSyncExternalStore(subscribeAdminAuth, getAdminAuthSnapshot, getAdminAuthServerSnapshot);
  const [localAuthOverride, setLocalAuthOverride] = useState<boolean | null>(null);
  const isAuthenticated = localAuthOverride !== null ? localAuthOverride : isStoredAuth;

  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'leads' | 'visits' | 'settings'>('overview');

  // Live state
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [settings, setSettings] = useState<BusinessConfig>(BUSINESS_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  // Property modal state (Create / Edit)
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [propertyFormData, setPropertyFormData] = useState<any>({
    title: '',
    tagline: '',
    slug: '',
    price: 6500000,
    priceDisplay: '₹ 65 Lakh',
    pricePerSqFt: 7500,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    carpetAreaSqFt: 3000,
    superAreaSqFt: 3800,
    furnishing: 'Furnished',
    floor: 12,
    totalFloors: 24,
    parking: '2 Covered Slots',
    propertyAge: 'Ready to Move',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P51900088921',
    location: {
      city: 'Mumbai',
      locality: 'Worli',
      address: 'Skyline Residence, Worli, Mumbai',
      lat: 19.0144,
      lng: 72.8156
    },
    amenitiesText: 'Swimming Pool, Gym, Concierge, Italian Marble, Sea View',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'An exceptional high-floor luxury residence with bespoke interior finishes.'
  });

  // Lead search & filter
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [highIntentOnly, setHighIntentOnly] = useState(false);

  // Realtime SSE connection & live arrival notification state
  const [realtimeState, setRealtimeState] = useState<'live' | 'connecting' | 'reconnecting'>('connecting');
  const [liveNotice, setLiveNotice] = useState<LiveArrivalNotice | null>(null);
  const [visitToasts, setVisitToasts] = useState<LiveArrivalNotice[]>([]);
  const [highlightedVisitId, setHighlightedVisitId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load and subscribe to local storage + server-sent realtime inquiry stream
  useEffect(() => {
    if (!isAuthenticated) return;
    const reload = () => {
      setProperties(getStoredProperties());
      setLeads(getStoredLeads());
      setVisits(getStoredSiteVisits());
      setSettings(getStoredSettings());
      setIsLoading(false);
    };
    reload();

    const unsubStorage = subscribeToClientStorage(reload);
    const unsubRealtime = subscribeToRealtimeInquiries({
      onDataChange: reload,
      onConnectionChange: (state) => setRealtimeState(state),
      onNewArrival: (notice) => {
        if (notice.kind === 'visit') {
          setVisitToasts((prev) => [notice, ...prev.filter((t) => t.id !== notice.id)].slice(0, 3));
        } else if (!notice.id.startsWith('lead-for-visit-')) {
          setLiveNotice(notice);
        }
      },
    });

    return () => {
      unsubStorage();
      unsubRealtime();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!liveNotice) return;
    const timer = setTimeout(() => setLiveNotice(null), 9000);
    return () => clearTimeout(timer);
  }, [liveNotice]);

  // Auto-dismiss real-time site visit toasts after 14 seconds
  useEffect(() => {
    if (visitToasts.length === 0) return;
    const timer = setTimeout(() => {
      setVisitToasts((prev) => prev.slice(0, -1));
    }, 14000);
    return () => clearTimeout(timer);
  }, [visitToasts]);

  // Smoothly scroll to & highlight a specific site visit when jumped to from a real-time toast
  useEffect(() => {
    if (activeTab !== 'visits' || !highlightedVisitId) return;
    const scrollTimer = setTimeout(() => {
      const candidates = document.querySelectorAll(`[data-visit-id="${CSS.escape(highlightedVisitId)}"]`);
      for (const el of Array.from(candidates)) {
        const htmlEl = el as HTMLElement;
        if (htmlEl.offsetParent !== null) {
          htmlEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    }, 120);

    const clearHighlightTimer = setTimeout(() => {
      setHighlightedVisitId((current) => (current === highlightedVisitId ? null : current));
    }, 6500);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(clearHighlightTimer);
    };
  }, [activeTab, highlightedVisitId, visits]);

  const handleJumpToSiteVisit = (visitId: string) => {
    setActiveTab('visits');
    setHighlightedVisitId(visitId);
    setVisitToasts((prev) => prev.filter((t) => t.id !== visitId));
  };

  const isRealtimeConnected = realtimeState === 'live';
  const [isResettingDb, setIsResettingDb] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChangingPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const customPass = typeof window !== 'undefined' ? localStorage.getItem('aura_custom_admin_pin') : null;
    const validPins = [customPass, 'Signature@2026', 'admin', 'admin123', '1234'].filter(Boolean);
    if (validPins.includes(adminPin.trim())) {
      sessionStorage.setItem('aura_admin_authenticated', 'true');
      window.dispatchEvent(new Event('aura_admin_auth_changed'));
      setLocalAuthOverride(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. (Default: Signature@2026 or admin)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aura_admin_authenticated');
    window.dispatchEvent(new Event('aura_admin_auth_changed'));
    setLocalAuthOverride(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 4) {
      setPasswordError('Passcode must be at least 4 characters.');
      return;
    }

    localStorage.setItem('aura_custom_admin_pin', newPassword);
    setPasswordMsg('Admin passcode successfully updated in local browser storage!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleResetDatabase = () => {
    if (!confirm('Are you sure you want to reset all client-side data? All properties, leads, visits, and settings will be restored to clean initial seed data.')) {
      return;
    }
    setIsResettingDb(true);
    resetAllClientStorage();
    setProperties(getStoredProperties());
    setLeads(getStoredLeads());
    setVisits(getStoredSiteVisits());
    setSettings(getStoredSettings());
    setIsResettingDb(false);
    alert('Browser client storage has been reset to default seeds!');
  };

  // Toggle Property Published
  const togglePublish = (prop: Property) => {
    const updated = { ...prop, isPublished: !prop.isPublished };
    saveStoredProperty(updated);
    setProperties(getStoredProperties());
  };

  // Toggle Property Featured
  const toggleFeatured = (prop: Property) => {
    const updated = { ...prop, isFeatured: !prop.isFeatured };
    saveStoredProperty(updated);
    setProperties(getStoredProperties());
  };

  // Delete Property
  const handleDeleteProperty = (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this property listing?')) return;
    deleteStoredProperty(id);
    setProperties(getStoredProperties());
  };

  // Save / Create Property
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const amenitiesArr = propertyFormData.amenitiesText
      ? propertyFormData.amenitiesText.split(',').map((s: string) => s.trim()).filter(Boolean)
      : ['Luxury Finishes'];

    const propertyPayload: Property = {
      id: editingPropertyId || `prop-${Date.now()}`,
      title: propertyFormData.title,
      slug: propertyFormData.slug || propertyFormData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: editingPropertyId
        ? (properties.find(p => p.id === editingPropertyId)?.createdAt || new Date().toISOString())
        : new Date().toISOString(),
      tagline: propertyFormData.tagline,
      price: Number(propertyFormData.price),
      priceDisplay: propertyFormData.priceDisplay || formatINR(Number(propertyFormData.price)),
      pricePerSqFt: Number(propertyFormData.pricePerSqFt) || 30000,
      listingType: propertyFormData.listingType,
      category: propertyFormData.category,
      propertyType: propertyFormData.propertyType,
      bedrooms: Number(propertyFormData.bedrooms),
      bathrooms: Number(propertyFormData.bathrooms),
      balconies: Number(propertyFormData.balconies),
      carpetAreaSqFt: Number(propertyFormData.carpetAreaSqFt),
      superAreaSqFt: Number(propertyFormData.superAreaSqFt),
      furnishing: propertyFormData.furnishing,
      floor: Number(propertyFormData.floor),
      totalFloors: Number(propertyFormData.totalFloors),
      parking: propertyFormData.parking,
      propertyAge: propertyFormData.propertyAge,
      ownership: propertyFormData.ownership,
      availability: propertyFormData.availability,
      isFeatured: propertyFormData.isFeatured,
      isPublished: propertyFormData.isPublished,
      isReraApproved: propertyFormData.isReraApproved,
      reraNumber: propertyFormData.reraNumber,
      location: propertyFormData.location,
      amenities: amenitiesArr,
      images: [{ url: propertyFormData.imageUrl, caption: propertyFormData.title }],
      description: propertyFormData.description,
      highlightFeatures: ['Prime location', 'RERA compliant', 'Luxury specifications'],
      nearbyFacilities: [],
      agent: {
        name: 'Rakesh Desale Patil',
        title: 'Partner & Director - Strategic Acquisitions',
        phone: BUSINESS_CONFIG.phoneNumber,
        email: BUSINESS_CONFIG.email,
        photo: '/assets/team/rakesh-desale-patil.jpg',
        experienceYears: 16,
        rating: 4.95
      }
    };

    saveStoredProperty(propertyPayload);
    setProperties(getStoredProperties());
    setIsPropertyModalOpen(false);
    setEditingPropertyId(null);
  };

  // Update Lead Status
  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    updateStoredLeadStatus(leadId, newStatus);
    setLeads(getStoredLeads());
  };

  // Delete Lead
  const handleDeleteLead = (leadId: string) => {
    if (!confirm('Remove this lead inquiry permanently?')) return;
    deleteStoredLead(leadId);
    setLeads(getStoredLeads());
  };

  // Update Site Visit Status
  const handleUpdateVisitStatus = (visitId: string, newStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => {
    updateStoredSiteVisitStatus(visitId, newStatus);
    setVisits(getStoredSiteVisits());
  };

  // Delete Site Visit
  const handleDeleteVisit = (visitId: string) => {
    if (!confirm('Remove this site visit record permanently?')) return;
    deleteStoredSiteVisit(visitId);
    setVisits(getStoredSiteVisits());
  };

  // Force Sync with Server Hub
  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await syncInquiriesWithServer();
      setLeads(getStoredLeads());
      setVisits(getStoredSiteVisits());
    } finally {
      setIsSyncing(false);
    }
  };

  // Export Leads as CSV
  const handleExportLeadsCSV = () => {
    exportDataToCSV(leads, `aura_leads_${new Date().toISOString().split('T')[0]}`);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoredSettings(settings);
    alert('Business configurations saved successfully in client storage!');
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#222222] border border-[#333333] rounded-2xl p-8 shadow-2xl text-center space-y-6">
          <div className="relative w-28 h-28 mx-auto drop-shadow-2xl">
            <Image
              src="/assets/branding/signature-aura-logo-official.png?v=20261105"
              alt="Signature Aura Developers"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div>
            <h1 className="font-serif text-2xl text-white">Advisor & Admin Portal</h1>
            <p className="text-xs text-stone-400 mt-1">Signature Aura Developers Management Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {authError && (
              <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">
                Enter Master Security Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                suppressHydrationWarning
                className="w-full bg-[#171717] border border-[#333333] focus:border-[#B99A63] text-white px-3.5 py-2.5 rounded text-sm text-center tracking-widest focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B99A63] hover:bg-[#a68853] text-[#171717] font-semibold text-xs tracking-wider uppercase py-3 rounded transition-all shadow"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="pt-2">
            <Link href="/" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // High-intent lead metrics & filtered/prioritized leads list
  const highIntentLeadCount = leads.filter((l) => getLeadIntentInfo(l).isHighIntent).length;

  const filteredLeads = leads
    .filter((l) => {
      if (highIntentOnly && !getLeadIntentInfo(l).isHighIntent) return false;
      if (leadStatusFilter !== 'all' && l.leadStatus !== leadStatusFilter) return false;
      if (leadSearch.trim()) {
        const q = leadSearch.toLowerCase();
        return (
          l.fullName.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.propertyTitle && l.propertyTitle.toLowerCase().includes(q)) ||
          (l.message && l.message.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (highIntentOnly) {
        const scoreDiff = getLeadIntentInfo(b).priorityScore - getLeadIntentInfo(a).priorityScore;
        if (scoreDiff !== 0) return scoreDiff;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#171717] font-sans flex flex-col overflow-x-hidden">
      
      {/* Admin Top Navigation */}
      <header className="bg-[#171717] text-white border-b border-[#2D2D2D] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-16 py-2.5 sm:py-0 sm:h-16 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 drop-shadow-sm">
                <Image
                  src="/assets/branding/signature-aura-logo-official.png?v=20261105"
                  alt="Signature Aura Developers"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-5 w-24 sm:h-6 sm:w-32 shrink-0">
                <Image
                  src="/assets/branding/logo-text.png"
                  alt="Signature Aura"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <span className="hidden lg:inline text-stone-600">|</span>
            <span className="hidden lg:inline text-xs text-stone-400 whitespace-nowrap">
              Advisor & Management Console
            </span>
            <div className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] shrink-0 border ${
              isRealtimeConnected
                ? 'bg-emerald-950/50 border-emerald-600/40 text-emerald-400'
                : 'bg-amber-950/50 border-amber-600/40 text-amber-300'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isRealtimeConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-pulse'}`} />
              <span className="font-mono text-[10px] tracking-wider uppercase font-semibold sm:hidden">
                {isRealtimeConnected ? 'Live' : 'Sync'}
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase font-semibold hidden sm:inline">
                {realtimeState === 'live'
                  ? 'Realtime Live'
                  : realtimeState === 'reconnecting'
                  ? 'Reconnecting...'
                  : 'Connecting...'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-xs shrink-0">
            <Link
              href="/"
              target="_blank"
              className="text-stone-300 hover:text-white flex items-center gap-1.5 transition-colors px-2.5 py-1.5 sm:px-0 sm:py-0 rounded-lg bg-white/5 sm:bg-transparent border border-white/10 sm:border-0 whitespace-nowrap"
            >
              <span className="hidden sm:inline">View Live Site</span>
              <span className="sm:hidden">Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-stone-300 hover:text-red-400 transition-colors px-2.5 py-1.5 sm:px-0 sm:py-0 rounded-lg bg-white/5 sm:bg-transparent border border-white/10 sm:border-0 whitespace-nowrap cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">Sign Out</span>
            </button>
          </div>

        </div>

        {/* Admin Tabs Bar (Touch swipeable on mobile & tablet, full row on laptop & desktop) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center gap-1.5 sm:gap-5 overflow-x-auto scrollbar-none flex-nowrap text-[11px] sm:text-xs tracking-wider uppercase font-medium border-t border-white/5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-2.5 sm:px-2 border-b-2 whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
              activeTab === 'overview' ? 'border-[#B99A63] text-white' : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`py-3 px-2.5 sm:px-2 border-b-2 whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
              activeTab === 'properties' ? 'border-[#B99A63] text-white' : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Building className="w-3.5 h-3.5 shrink-0" />
            <span>Properties</span>
            <span className="bg-[#2D2D2D] text-stone-300 text-[10px] px-1.5 py-0.5 rounded font-mono">
              {properties.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-2.5 sm:px-2 border-b-2 whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
              activeTab === 'leads' ? 'border-[#B99A63] text-white' : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>Leads & Enquiries</span>
            <span className="bg-[#B99A63] text-[#171717] font-semibold text-[10px] px-1.5 py-0.5 rounded font-mono">
              {leads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('visits')}
            className={`py-3 px-2.5 sm:px-2 border-b-2 whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
              activeTab === 'visits' ? 'border-[#B99A63] text-white' : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Site Visits</span>
            <span className="bg-[#2D2D2D] text-stone-300 text-[10px] px-1.5 py-0.5 rounded font-mono">
              {visits.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-2.5 sm:px-2 border-b-2 whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 min-h-[44px] cursor-pointer ${
              activeTab === 'settings' ? 'border-[#B99A63] text-white' : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5 shrink-0" />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-5 pb-20 sm:py-8 w-full min-w-0">

        {/* Live Real-Time Arrival Banner */}
        {liveNotice && (
          <div className="mb-5 bg-[#171717] text-white border border-[#B99A63]/60 rounded-xl px-4 py-3 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#B99A63]/20 border border-[#B99A63]/50 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-[#E8D39E]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#E8D39E]">
                  {liveNotice.kind === 'visit'
                    ? 'New Genuine Site Visit Booked'
                    : 'New Genuine Client Inquiry Received'}
                </p>
                <p className="text-xs text-stone-200 truncate">
                  {liveNotice.fullName} · {liveNotice.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab(liveNotice.kind === 'visit' ? 'visits' : 'leads');
                  setLiveNotice(null);
                }}
                className="bg-[#B99A63] hover:bg-[#a68853] text-[#171717] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                View Now
              </button>
              <button
                type="button"
                onClick={() => setLiveNotice(null)}
                aria-label="Dismiss notification"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 1: OVERVIEW METRICS
           ===================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#171717]">Executive Dashboard</h1>
                <p className="text-xs text-stone-500 mt-1">Real-time inventory and client inquiry metrics.</p>
              </div>
              <span className="text-[11px] font-medium text-stone-500 bg-white border border-[#E8E5DF] px-3 py-1.5 rounded-lg self-start sm:self-auto">
                Catalog Price Range: ₹ 40 Lakh – ₹ 90 Lakh
              </span>
            </div>

            {/* Metric Cards Grid: 2 cols mobile -> 3 cols tablet/small laptop -> 6 cols desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E5DF] shadow-xs">
                <span className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase block">Total Portfolio</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#171717] mt-1 block font-normal tabular-nums">{properties.length}</span>
                <span className="text-[11px] text-stone-400 mt-1 block">Active Assets</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E5DF] shadow-xs">
                <span className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase block">Published</span>
                <span className="font-serif text-2xl sm:text-3xl text-emerald-700 mt-1 block font-normal tabular-nums">
                  {properties.filter(p => p.isPublished).length}
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block">Public Catalog</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E5DF] shadow-xs">
                <span className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase block">Signature Listings</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#B99A63] mt-1 block font-normal tabular-nums">
                  {properties.filter(p => p.isFeatured).length}
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block">Featured</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E5DF] shadow-xs">
                <span className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase block">Total Leads</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#171717] mt-1 block font-normal tabular-nums">{leads.length}</span>
                <span className="text-[11px] text-stone-400 mt-1 block">All Channels</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E5DF] shadow-xs">
                <span className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase block">New Enquiries</span>
                <span className="font-serif text-2xl sm:text-3xl text-blue-700 mt-1 block font-normal tabular-nums">
                  {leads.filter(l => l.leadStatus === 'New').length}
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block">Requires Contact</span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E5DF] shadow-xs">
                <span className="text-[10px] font-semibold tracking-wider text-stone-500 uppercase block">Site Visits</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#171717] mt-1 block font-normal tabular-nums">{visits.length}</span>
                <span className="text-[11px] text-stone-400 mt-1 block">Scheduled Viewings</span>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
              
              {/* Recent Leads */}
              <div className="lg:col-span-7 bg-white border border-[#E8E5DF] rounded-xl p-4 sm:p-6 shadow-xs min-w-0">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="font-serif text-base sm:text-lg text-[#171717]">Recent High-Intent Enquiries</h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-[#B99A63] hover:text-[#171717] font-medium whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    View All Leads →
                  </button>
                </div>

                <div className="divide-y divide-[#E8E5DF]">
                  {leads.length === 0 ? (
                    <div className="py-10 text-center space-y-1.5">
                      <Users className="w-7 h-7 text-stone-300 mx-auto" />
                      <p className="text-xs font-medium text-stone-700">No genuine client enquiries yet</p>
                      <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
                        Real inquiries submitted from Contact, Property pages, Callback modal, or Concierge appear here live.
                      </p>
                    </div>
                  ) : (
                    leads.slice(0, 4).map((lead) => (
                      <div key={lead.id} className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-xs sm:text-sm text-[#171717]">{lead.fullName}</span>
                            <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded capitalize whitespace-nowrap">
                              {lead.leadSource.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5 break-words">
                            {lead.propertyTitle || 'General Advisory Request'}
                          </p>
                          <p className="text-[11px] text-stone-400 mt-1 break-all sm:break-normal">
                            {lead.phone} · {lead.email}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-1 sm:pt-0">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                            lead.leadStatus === 'New' ? 'bg-blue-50 text-blue-700' :
                            lead.leadStatus === 'Qualified' ? 'bg-emerald-50 text-emerald-700' :
                            'bg-stone-100 text-stone-700'
                          }`}>
                            {lead.leadStatus}
                          </span>
                          <span className="text-[10px] text-stone-400 tabular-nums">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Upcoming Site Visits */}
              <div className="lg:col-span-5 bg-white border border-[#E8E5DF] rounded-xl p-4 sm:p-6 shadow-xs min-w-0">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="font-serif text-base sm:text-lg text-[#171717]">Upcoming Site Visits</h3>
                  <button
                    onClick={() => setActiveTab('visits')}
                    className="text-xs text-[#B99A63] hover:text-[#171717] font-medium whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Manage Visits →
                  </button>
                </div>

                <div className="space-y-3">
                  {visits.length === 0 ? (
                    <div className="py-10 text-center space-y-1.5 bg-[#FAF9F5] border border-dashed border-[#E8E5DF] rounded-lg px-4">
                      <Calendar className="w-7 h-7 text-stone-300 mx-auto" />
                      <p className="text-xs font-medium text-stone-700">No scheduled site visits yet</p>
                      <p className="text-[11px] text-stone-500">
                        Genuine client bookings from property viewings or concierge sync here in real time.
                      </p>
                    </div>
                  ) : (
                    visits.slice(0, 3).map((v) => (
                      <div key={v.id} className="p-3.5 bg-[#FAF9F5] border border-[#E8E5DF] rounded-lg">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-medium text-xs sm:text-sm text-[#171717] min-w-0 break-words">{v.fullName}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded shrink-0 whitespace-nowrap ${
                            v.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {v.status}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 line-clamp-2 sm:truncate mt-1">{v.propertyTitle}</p>
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-1.5 text-[11px] text-stone-500">
                          <span className="break-words">{v.visitDate} ({v.timeSlot})</span>
                          {v.pickupRequired && <span className="text-[#B99A63] font-medium whitespace-nowrap">VIP Chauffeur</span>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: PROPERTY MANAGEMENT (FULL CRUD)
           ===================================================================== */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">Property Portfolio Management</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Manage inventory, pricing (₹ 40 Lakh – ₹ 90 Lakh), publication status, and signature badges.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPropertyId(null);
                  setPropertyFormData({
                    title: '',
                    tagline: '',
                    slug: '',
                    price: 6500000,
                    priceDisplay: '₹ 65 Lakh',
                    pricePerSqFt: 7500,
                    listingType: 'buy',
                    category: 'residential',
                    propertyType: 'Apartment',
                    bedrooms: 4,
                    bathrooms: 4,
                    balconies: 2,
                    carpetAreaSqFt: 3400,
                    superAreaSqFt: 4200,
                    furnishing: 'Furnished',
                    floor: 10,
                    totalFloors: 30,
                    parking: '2 Covered Slots',
                    propertyAge: 'Ready to Move',
                    ownership: 'Freehold',
                    availability: 'Immediate',
                    isFeatured: true,
                    isPublished: true,
                    isReraApproved: true,
                    reraNumber: 'P51900099412',
                    location: {
                      city: 'Mumbai',
                      locality: 'Worli',
                      address: 'Worli Sea Face, Mumbai',
                      lat: 19.0144,
                      lng: 72.8156
                    },
                    amenitiesText: 'Sea View, Heated Pool, Concierge, Marble Flooring',
                    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
                    description: 'A bespoke high-rise luxury residence.'
                  });
                  setIsPropertyModalOpen(true);
                }}
                className="bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto shadow cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Listing</span>
              </button>
            </div>

            {/* Properties Table & Mobile/Tablet Cards */}
            <div className="bg-white border border-[#E8E5DF] rounded-xl overflow-hidden shadow-xs">
              {/* Mobile & Tablet Card Grid (< lg) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden divide-y md:divide-y-0 md:gap-4 md:p-4 bg-white md:bg-[#FAF9F5]/40">
                {properties.map((prop) => (
                  <div key={prop.id} className="p-4 space-y-3 bg-white md:border md:border-[#E8E5DF] md:rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 rounded overflow-hidden bg-stone-200 flex-shrink-0">
                        <Image
                          src={prop.images[0]?.url || 'https://picsum.photos/200'}
                          alt={prop.title}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/properties/${prop.slug}`}
                          target="_blank"
                          className="font-medium text-stone-900 hover:text-[#B99A63] text-xs block truncate"
                        >
                          {prop.title}
                        </Link>
                        <span className="text-[11px] text-stone-500 block">
                          {prop.bedrooms > 0 ? `${prop.bedrooms} BHK · ` : ''}{prop.carpetAreaSqFt} sq.ft.
                        </span>
                        <div className="text-[11px] text-stone-600 mt-0.5 truncate">
                          {prop.location.locality}, {prop.location.city}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-stone-100">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Price</span>
                        <span className="font-semibold text-stone-900 text-sm">{prop.priceDisplay}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => togglePublish(prop)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                            prop.isPublished ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {prop.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{prop.isPublished ? 'Published' : 'Draft'}</span>
                        </button>
                        <button
                          onClick={() => toggleFeatured(prop)}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            prop.isFeatured ? 'text-[#B99A63]' : 'text-stone-300 hover:text-stone-500'
                          }`}
                          title="Toggle featured"
                        >
                          <Star className={`w-4 h-4 ${prop.isFeatured ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingPropertyId(prop.id);
                            setPropertyFormData({
                              title: prop.title,
                              tagline: prop.tagline,
                              slug: prop.slug,
                              price: prop.price,
                              priceDisplay: prop.priceDisplay,
                              pricePerSqFt: prop.pricePerSqFt,
                              listingType: prop.listingType,
                              category: prop.category,
                              propertyType: prop.propertyType,
                              bedrooms: prop.bedrooms,
                              bathrooms: prop.bathrooms,
                              balconies: prop.balconies,
                              carpetAreaSqFt: prop.carpetAreaSqFt,
                              superAreaSqFt: prop.superAreaSqFt,
                              furnishing: prop.furnishing,
                              floor: prop.floor,
                              totalFloors: prop.totalFloors,
                              parking: prop.parking,
                              propertyAge: prop.propertyAge,
                              ownership: prop.ownership,
                              availability: prop.availability,
                              isFeatured: prop.isFeatured,
                              isPublished: prop.isPublished,
                              isReraApproved: prop.isReraApproved,
                              reraNumber: prop.reraNumber || '',
                              location: prop.location,
                              amenitiesText: prop.amenities.join(', '),
                              imageUrl: prop.images[0]?.url || '',
                              description: prop.description
                            });
                            setIsPropertyModalOpen(true);
                          }}
                          className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 rounded cursor-pointer"
                          title="Edit listing"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(prop.id)}
                          className="p-2 text-red-500 hover:text-red-700 bg-red-50 rounded cursor-pointer"
                          title="Delete listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Laptop & Desktop Table (lg+) */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F5] border-b border-[#E8E5DF] text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">Market / Type</th>
                      <th className="py-3 px-4">Price in INR</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E5DF]">
                    {properties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded overflow-hidden bg-stone-200 flex-shrink-0">
                              <Image
                                src={prop.images[0]?.url || 'https://picsum.photos/200'}
                                alt={prop.title}
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/properties/${prop.slug}`}
                                target="_blank"
                                className="font-medium text-stone-900 hover:text-[#B99A63] text-xs block truncate max-w-xs"
                              >
                                {prop.title}
                              </Link>
                              <span className="text-[11px] text-stone-500">
                                {prop.bedrooms > 0 ? `${prop.bedrooms} BHK · ` : ''}{prop.carpetAreaSqFt} sq.ft.
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-stone-700">
                          <div>{prop.location.locality}, {prop.location.city}</div>
                          <span className="text-[10px] text-stone-400 capitalize">{prop.propertyType}</span>
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-stone-900">
                          {prop.priceDisplay}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => togglePublish(prop)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                              prop.isPublished ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-500'
                            }`}
                          >
                            {prop.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{prop.isPublished ? 'Published' : 'Draft'}</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleFeatured(prop)}
                            className={`p-1 rounded transition-colors ${
                              prop.isFeatured ? 'text-[#B99A63]' : 'text-stone-300 hover:text-stone-500'
                            }`}
                            title="Toggle featured"
                          >
                            <Star className={`w-4 h-4 ${prop.isFeatured ? 'fill-current' : ''}`} />
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingPropertyId(prop.id);
                                setPropertyFormData({
                                  title: prop.title,
                                  tagline: prop.tagline,
                                  slug: prop.slug,
                                  price: prop.price,
                                  priceDisplay: prop.priceDisplay,
                                  pricePerSqFt: prop.pricePerSqFt,
                                  listingType: prop.listingType,
                                  category: prop.category,
                                  propertyType: prop.propertyType,
                                  bedrooms: prop.bedrooms,
                                  bathrooms: prop.bathrooms,
                                  balconies: prop.balconies,
                                  carpetAreaSqFt: prop.carpetAreaSqFt,
                                  superAreaSqFt: prop.superAreaSqFt,
                                  furnishing: prop.furnishing,
                                  floor: prop.floor,
                                  totalFloors: prop.totalFloors,
                                  parking: prop.parking,
                                  propertyAge: prop.propertyAge,
                                  ownership: prop.ownership,
                                  availability: prop.availability,
                                  isFeatured: prop.isFeatured,
                                  isPublished: prop.isPublished,
                                  isReraApproved: prop.isReraApproved,
                                  reraNumber: prop.reraNumber || '',
                                  location: prop.location,
                                  amenitiesText: prop.amenities.join(', '),
                                  imageUrl: prop.images[0]?.url || '',
                                  description: prop.description
                                });
                                setIsPropertyModalOpen(true);
                              }}
                              className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                              title="Edit listing"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteProperty(prop.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                              title="Delete listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: LEADS & ENQUIRIES MANAGEMENT
           ===================================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">Leads & Client Inquiries</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Manage prospective buyers, tenant leads, and AI assistant conversions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isSyncing}
                  className="flex-1 sm:flex-initial bg-white border border-[#E8E5DF] hover:border-stone-400 text-stone-800 text-xs font-semibold tracking-wider uppercase px-3.5 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#B99A63] ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Live'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportLeadsCSV}
                  disabled={leads.length === 0}
                  className="flex-1 sm:flex-initial bg-white border border-[#E8E5DF] hover:border-stone-400 text-stone-800 text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-40"
                >
                  <Download className="w-4 h-4 text-[#B99A63]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white border border-[#E8E5DF] rounded-xl p-3.5 sm:p-4 space-y-3">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
                <div className="relative w-full lg:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search lead by name, phone, email..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF9F5] border border-[#E8E5DF] rounded-lg text-base sm:text-xs focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setHighIntentOnly((prev) => !prev)}
                    aria-pressed={highIntentOnly}
                    className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border cursor-pointer min-h-[38px] whitespace-nowrap ${
                      highIntentOnly
                        ? 'bg-[#171717] text-[#E8D39E] border-[#B99A63] shadow-xs'
                        : 'bg-[#FAF9F5] text-stone-700 border-[#E8E5DF] hover:border-[#B99A63] hover:text-[#171717]'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${highIntentOnly ? 'text-[#E8D39E]' : 'text-[#B99A63]'}`} />
                    <span>High Intent</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded tabular-nums ${
                        highIntentOnly
                          ? 'bg-[#B99A63] text-[#171717]'
                          : 'bg-[#E8E5DF] text-stone-700'
                      }`}
                    >
                      {highIntentLeadCount}
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500 shrink-0">Status:</span>
                    <select
                      value={leadStatusFilter}
                      onChange={(e) => setLeadStatusFilter(e.target.value)}
                      className="w-full sm:w-auto bg-[#FAF9F5] border border-[#E8E5DF] px-3 py-2 rounded-lg text-base sm:text-xs text-[#171717] focus:outline-none"
                    >
                      <option value="all">All Statuses ({leads.length})</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>
                </div>
              </div>

              {highIntentOnly && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-[#EFECE4] text-xs">
                  <div className="flex items-center gap-2 text-stone-700">
                    <Flame className="w-3.5 h-3.5 text-[#B99A63] shrink-0" />
                    <span>
                      Prioritizing <strong className="text-[#171717]">Site Visit</strong> &amp;{' '}
                      <strong className="text-[#171717]">Pricing Details</strong> leads for immediate follow-up.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHighIntentOnly(false)}
                    className="text-[#845E1B] hover:text-[#171717] font-medium underline underline-offset-2 cursor-pointer"
                  >
                    Show all leads
                  </button>
                </div>
              )}
            </div>

            {/* Leads Table & Mobile/Tablet Cards */}
            <div className="bg-white border border-[#E8E5DF] rounded-xl overflow-hidden shadow-xs">
              {filteredLeads.length === 0 ? (
                <div className="py-14 px-6 text-center space-y-2">
                  <Users className="w-9 h-9 text-stone-300 mx-auto" />
                  <h3 className="font-serif text-lg text-[#171717]">
                    {leads.length === 0
                      ? 'Waiting for Genuine Client Leads'
                      : highIntentOnly
                      ? 'No High Intent Leads Match Yet'
                      : 'No Matching Leads Found'}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    {leads.length === 0
                      ? 'Dummy/demo leads have been removed. Every real inquiry from your Contact page, Property enquiry forms, Callback modal, or Concierge streams here automatically in real time.'
                      : highIntentOnly
                      ? 'Leads requesting a Site Visit or Pricing Details will automatically appear and sort to the top here.'
                      : 'Try clearing your search or status filter to view all genuine leads.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Mobile & Tablet Card Grid (< lg) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden divide-y md:divide-y-0 md:gap-4 md:p-4 bg-white md:bg-[#FAF9F5]/40">
                    {filteredLeads.map((lead) => {
                      const intent = getLeadIntentInfo(lead);
                      return (
                      <div key={lead.id} className="p-4 space-y-2.5 bg-white md:border md:border-[#E8E5DF] md:rounded-xl min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="font-semibold text-stone-900 text-sm break-words">{lead.fullName}</span>
                              {intent.isHighIntent && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-[#B99A63]/40 text-[#845E1B] text-[10px] font-semibold">
                                  <Flame className="w-2.5 h-2.5 text-[#B99A63]" />
                                  {intent.label}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5 break-all sm:break-normal">
                              <a href={`tel:${lead.phone}`} className="hover:text-[#B99A63] text-[#171717] font-medium">{lead.phone}</a>
                              <span className="mx-1">·</span>
                              <span>{lead.email}</span>
                            </div>
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap shrink-0 ${
                            lead.leadStatus === 'New' ? 'bg-blue-50 text-blue-800' :
                            lead.leadStatus === 'Qualified' ? 'bg-emerald-50 text-emerald-800' :
                            lead.leadStatus === 'Site Visit Scheduled' ? 'bg-purple-50 text-purple-800' :
                            lead.leadStatus === 'Converted' ? 'bg-amber-50 text-amber-900' :
                            'bg-stone-100 text-stone-600'
                          }`}>
                            {lead.leadStatus}
                          </span>
                        </div>

                        <div className="bg-stone-50 p-2.5 rounded-lg text-xs space-y-1">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="text-stone-500 text-[11px] shrink-0">Property:</span>
                            <span className="font-medium text-stone-800 text-right break-words">{lead.propertyTitle || 'General Advisory'}</span>
                          </div>
                          {lead.budget && (
                            <div className="flex justify-between items-baseline gap-2">
                              <span className="text-stone-500 text-[11px] shrink-0">Budget:</span>
                              <span className="text-stone-700 text-right">{lead.budget}</span>
                            </div>
                          )}
                          {lead.preferredVisitDate && (
                            <div className="flex justify-between items-baseline gap-2">
                              <span className="text-[#B99A63] text-[11px] shrink-0">Visit Date:</span>
                              <span className="text-[#B99A63] font-mono">{lead.preferredVisitDate}</span>
                            </div>
                          )}
                        </div>

                        {lead.message && (
                          <p className="text-[11px] text-stone-600 italic bg-[#FAF9F5] p-2 rounded border border-[#E8E5DF] break-words">
                            &ldquo;{lead.message}&rdquo;
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] gap-2">
                          <span className="text-stone-400">
                            {new Date(lead.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <select
                              value={lead.leadStatus}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className="bg-[#FAF9F5] border border-[#E8E5DF] text-base sm:text-xs px-2.5 py-1.5 rounded text-stone-800 focus:outline-none min-h-[36px]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                              <option value="Converted">Converted</option>
                              <option value="Lost">Lost</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              title="Delete lead"
                              aria-label="Delete lead"
                              className="p-2 text-red-500 hover:text-red-700 bg-red-50 rounded cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>

                  {/* Laptop & Desktop Table (lg+) */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF9F5] border-b border-[#E8E5DF] text-stone-500 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Customer Details</th>
                          <th className="py-3 px-4">Interested Property</th>
                          <th className="py-3 px-4">Source & Budget</th>
                          <th className="py-3 px-4">Status & Notes</th>
                          <th className="py-3 px-4">Received</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E5DF]">
                        {filteredLeads.map((lead) => {
                          const intent = getLeadIntentInfo(lead);
                          return (
                          <tr key={lead.id} className="hover:bg-stone-50 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-semibold text-stone-900">{lead.fullName}</span>
                                {intent.isHighIntent && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 border border-[#B99A63]/40 text-[#845E1B] text-[10px] font-semibold">
                                    <Flame className="w-2.5 h-2.5 text-[#B99A63]" />
                                    {intent.label}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-stone-500 mt-0.5">
                                <a href={`tel:${lead.phone}`} className="hover:text-[#B99A63]">{lead.phone}</a> · {lead.email}
                              </div>
                              {lead.message && (
                                <p className="text-[11px] text-stone-600 mt-1 max-w-xs italic line-clamp-2">
                                  &ldquo;{lead.message}&rdquo;
                                </p>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-stone-800">
                              <span className="font-medium">{lead.propertyTitle || 'General Advisory'}</span>
                              {lead.preferredVisitDate && (
                                <span className="text-[11px] text-[#B99A63] block mt-0.5 font-mono">
                                  Visit: {lead.preferredVisitDate}
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-stone-700">
                              <span className="inline-block px-1.5 py-0.5 bg-stone-100 rounded text-[10px] capitalize">
                                {lead.leadSource.replace(/_/g, ' ')}
                              </span>
                              <span className="text-[11px] text-stone-500 block mt-0.5">{lead.budget || 'Open'}</span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                                lead.leadStatus === 'New' ? 'bg-blue-50 text-blue-800' :
                                lead.leadStatus === 'Qualified' ? 'bg-emerald-50 text-emerald-800' :
                                lead.leadStatus === 'Site Visit Scheduled' ? 'bg-purple-50 text-purple-800' :
                                lead.leadStatus === 'Converted' ? 'bg-amber-50 text-amber-900' :
                                'bg-stone-100 text-stone-600'
                              }`}>
                                {lead.leadStatus}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-stone-500 text-[11px] whitespace-nowrap">
                              {new Date(lead.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center justify-end gap-1.5">
                                <select
                                  value={lead.leadStatus}
                                  onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                  className="bg-[#FAF9F5] border border-[#E8E5DF] text-[11px] px-2 py-1 rounded text-stone-800 focus:outline-none"
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Qualified">Qualified</option>
                                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                                  <option value="Converted">Converted</option>
                                  <option value="Lost">Lost</option>
                                </select>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteLead(lead.id)}
                                  title="Delete lead"
                                  aria-label="Delete lead"
                                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: SITE VISIT MANAGEMENT
           ===================================================================== */}
        {activeTab === 'visits' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">Private Site Visit Requests</h2>
                <p className="text-xs text-stone-500 mt-1">
                  Genuine client site visit bookings stream here live for advisor coordination.
                </p>
              </div>
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="bg-white border border-[#E8E5DF] hover:border-stone-400 text-stone-800 text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-xs cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#B99A63] ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Live Visits'}</span>
              </button>
            </div>

            {/* Site Visits Table & Mobile/Tablet Cards */}
            <div className="bg-white border border-[#E8E5DF] rounded-xl overflow-hidden shadow-xs">
              {visits.length === 0 ? (
                <div className="py-14 px-6 text-center space-y-2">
                  <Calendar className="w-9 h-9 text-stone-300 mx-auto" />
                  <h3 className="font-serif text-lg text-[#171717]">No Genuine Site Visits Scheduled Yet</h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    Sample visits have been cleared. When a prospective client books a viewing via a property page or the AI Concierge, it appears here immediately.
                  </p>
                </div>
              ) : (
                <>
                  {/* Mobile & Tablet Card Grid (< lg) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden divide-y md:divide-y-0 md:gap-4 md:p-4 bg-white md:bg-[#FAF9F5]/40">
                    {visits.map((v) => {
                      const isHighlighted = highlightedVisitId === v.id;
                      return (
                      <div
                        key={v.id}
                        data-visit-id={v.id}
                        className={`p-4 space-y-2.5 md:rounded-xl min-w-0 transition-all duration-500 ${
                          isHighlighted
                            ? 'bg-amber-50/80 ring-2 ring-[#B99A63] border border-[#B99A63] shadow-md'
                            : 'bg-white md:border md:border-[#E8E5DF]'
                        }`}
                      >
                        {isHighlighted && (
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#845E1B] bg-[#B99A63]/20 px-2 py-0.5 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Just Booked · Live</span>
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-stone-900 text-sm break-words">{v.fullName}</div>
                            <div className="text-[11px] text-stone-500 mt-0.5 break-all sm:break-normal">
                              <a href={`tel:${v.phone}`} className="hover:text-[#B99A63] text-[#171717] font-medium">{v.phone}</a>
                              <span className="mx-1">·</span>
                              <span>{v.email}</span>
                            </div>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap shrink-0 ${
                            v.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            v.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-stone-100 text-stone-600'
                          }`}>
                            {v.status}
                          </span>
                        </div>

                        <div className="bg-stone-50 p-2.5 rounded-lg text-xs space-y-1">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="text-stone-500 text-[11px] shrink-0">Property:</span>
                            <span className="font-medium text-stone-800 text-right break-words">{v.propertyTitle}</span>
                          </div>
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="text-stone-500 text-[11px] shrink-0">Slot:</span>
                            <span className="font-mono text-stone-800 text-right">{v.visitDate} ({v.timeSlot})</span>
                          </div>
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-stone-500 text-[11px]">Transport:</span>
                            {v.pickupRequired ? (
                              <span className="bg-[#B99A63]/20 text-[#B99A63] text-[10px] font-semibold px-2 py-0.5 rounded">
                                Chauffeur Pick-up
                              </span>
                            ) : (
                              <span className="text-stone-400 text-[11px]">Self-transport</span>
                            )}
                          </div>
                        </div>

                        {v.notes && (
                          <p className="text-[11px] text-stone-600 italic bg-[#FAF9F5] p-2 rounded border border-[#E8E5DF] break-words">
                            &ldquo;{v.notes}&rdquo;
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] gap-2">
                          <span className="text-stone-400 text-[10px] uppercase">Status</span>
                          <div className="flex items-center gap-1.5">
                            <select
                              value={v.status}
                              onChange={(e) => handleUpdateVisitStatus(v.id, e.target.value as any)}
                              className="bg-[#FAF9F5] border border-[#E8E5DF] text-base sm:text-xs px-2.5 py-1.5 rounded text-stone-800 focus:outline-none min-h-[36px]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => handleDeleteVisit(v.id)}
                              title="Delete site visit"
                              aria-label="Delete site visit"
                              className="p-2 text-red-500 hover:text-red-700 bg-red-50 rounded cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>

                  {/* Laptop & Desktop Table (lg+) */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF9F5] border-b border-[#E8E5DF] text-stone-500 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Visitor</th>
                          <th className="py-3 px-4">Property</th>
                          <th className="py-3 px-4">Requested Date & Slot</th>
                          <th className="py-3 px-4">VIP Chauffeur</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E5DF]">
                        {visits.map((v) => {
                          const isHighlighted = highlightedVisitId === v.id;
                          return (
                          <tr
                            key={v.id}
                            data-visit-id={v.id}
                            className={`transition-all duration-500 ${
                              isHighlighted
                                ? 'bg-amber-50/90 ring-2 ring-inset ring-[#B99A63]'
                                : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-stone-900">{v.fullName}</span>
                                {isHighlighted && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#845E1B] bg-[#B99A63]/20 px-1.5 py-0.5 rounded">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    New
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-stone-500">{v.phone} · {v.email}</span>
                              {v.notes && <p className="text-[11px] text-stone-400 italic mt-0.5">&ldquo;{v.notes}&rdquo;</p>}
                            </td>

                            <td className="py-3.5 px-4 font-medium text-stone-800">
                              {v.propertyTitle}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-mono text-stone-900 block">{v.visitDate}</span>
                              <span className="text-[11px] text-stone-500">{v.timeSlot}</span>
                            </td>

                            <td className="py-3.5 px-4">
                              {v.pickupRequired ? (
                                <span className="bg-[#B99A63]/20 text-[#B99A63] text-[10px] font-semibold px-2 py-0.5 rounded">
                                  Chauffeur Pick-up
                                </span>
                              ) : (
                                <span className="text-stone-400 text-[11px]">Self-transport</span>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                v.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                v.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                'bg-stone-100 text-stone-600'
                              }`}>
                                {v.status}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center justify-end gap-1.5">
                                <select
                                  value={v.status}
                                  onChange={(e) => handleUpdateVisitStatus(v.id, e.target.value as any)}
                                  className="bg-[#FAF9F5] border border-[#E8E5DF] text-[11px] px-2 py-1 rounded text-stone-800 focus:outline-none"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteVisit(v.id)}
                                  title="Delete site visit"
                                  aria-label="Delete site visit"
                                  className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 5: BUSINESS SETTINGS
           ===================================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6 sm:space-y-8">
            <div className="max-w-3xl bg-white border border-[#E8E5DF] rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">Business & Contact Settings</h2>
              <p className="text-xs text-stone-500 mt-1">
                Centralized brand parameters automatically reflected across headers, WhatsApp links, and footers.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Company Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Official Phone</label>
                  <input
                    type="text"
                    value={settings.phoneNumber}
                    onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">WhatsApp Number (e.g. 918805621111)</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">RERA Registrations</label>
                  <input
                    type="text"
                    value={settings.reraRegistration}
                    onChange={(e) => setSettings({ ...settings, reraRegistration: e.target.value })}
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Office Address</label>
                <input
                  type="text"
                  value={settings.officeAddress}
                  onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Announcement Bar Alert</label>
                <input
                  type="text"
                  value={settings.announcementBarText}
                  onChange={(e) => setSettings({ ...settings, announcementBarText: e.target.value })}
                  className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto justify-center bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-6 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>

          {/* Security & Password Management Card */}
          <div className="max-w-3xl bg-white border border-[#E8E5DF] rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">Portal Security & Access PIN</h2>
              <p className="text-xs text-stone-500 mt-1">
                Manage your browser-local advisor access PIN for this management console.
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {passwordMsg && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-600 text-emerald-800 text-xs rounded">
                  {passwordMsg}
                </div>
              )}
              {passwordError && (
                <div className="p-3 bg-red-950/20 border border-red-600 text-red-800 text-xs rounded">
                  {passwordError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Current Password *</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">New Password (min 4 chars) *</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Confirm New Password *</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full bg-[#FAF9F5] border border-[#E8E5DF] px-3.5 py-2.5 rounded-lg text-base sm:text-xs text-[#171717]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-full sm:w-auto justify-center bg-[#B99A63] hover:bg-[#a68853] text-[#171717] text-xs font-semibold tracking-wider uppercase px-6 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shadow disabled:opacity-50 cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>{isChangingPassword ? 'Saving...' : 'Update Access Password'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Client-Side Storage & Realtime Sync Card */}
          <div className="max-w-3xl bg-white border border-[#E8E5DF] rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] flex items-center gap-2">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-[#B99A63] shrink-0" />
                  <span>Realtime Inquiries & Storage Sync</span>
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Live Server-Sent Events (SSE) + cross-tab BroadcastChannel sync for genuine client leads and site visits. Zero fake seed leads.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs text-emerald-800 font-medium self-start shrink-0">
                <span className={`w-2 h-2 rounded-full ${isRealtimeConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                <span>{isRealtimeConnected ? 'SSE Stream Live' : 'Reconnecting'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="bg-[#FAF9F5] border border-[#E8E5DF] rounded-xl p-4">
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">Realtime Engine</div>
                <div className="text-sm font-semibold text-[#171717]">SSE + BroadcastChannel</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Live push across devices & tabs</div>
              </div>
              <div className="bg-[#FAF9F5] border border-[#E8E5DF] rounded-xl p-4">
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">Lead Integrity</div>
                <div className="text-sm font-semibold text-[#171717]">100% Genuine Only</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Validated submissions, zero mocks</div>
              </div>
              <div className="bg-[#FAF9F5] border border-[#E8E5DF] rounded-xl p-4">
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-1">Catalog Range</div>
                <div className="text-sm font-semibold text-[#171717]">₹ 40L – ₹ 90L</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Auto-synced from seed</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E5DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-stone-800">Reset Catalog & Clear All Leads/Visits</div>
                <div className="text-xs text-stone-500">Restores default property listings (₹ 40L – ₹ 90L) and clears lead & site visit records to empty.</div>
              </div>
              <button
                type="button"
                onClick={handleResetDatabase}
                disabled={isResettingDb}
                className="w-full sm:w-auto justify-center bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isResettingDb ? 'animate-spin' : ''}`} />
                <span>{isResettingDb ? 'Resetting Storage...' : 'Reset Default Data'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      </main>

      {/* =====================================================================
          PROPERTY CREATE / EDIT MODAL
         ===================================================================== */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#E8E5DF] rounded-2xl shadow-2xl p-4 sm:p-8 my-auto max-h-[92dvh] overflow-y-auto">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="font-serif text-xl sm:text-2xl text-[#171717]">
                {editingPropertyId ? 'Edit Property Listing' : 'Create New Property Listing'}
              </h3>
              <button
                type="button"
                onClick={() => setIsPropertyModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={propertyFormData.title}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, title: e.target.value })}
                  className="w-full bg-white border border-[#E8E5DF] px-3 py-2.5 rounded-lg text-base sm:text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={propertyFormData.tagline}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, tagline: e.target.value })}
                    className="w-full bg-white border border-[#E8E5DF] px-3 py-2.5 rounded-lg text-base sm:text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Price (INR · ₹ 40L – ₹ 90L Max) *
                  </label>
                  <input
                    type="number"
                    required
                    min={propertyFormData.listingType === 'buy' ? 4000000 : 10000}
                    max={propertyFormData.listingType === 'buy' ? 9000000 : 500000}
                    value={propertyFormData.price}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      setPropertyFormData({
                        ...propertyFormData,
                        price: num,
                        priceDisplay: formatINR(num)
                      });
                    }}
                    className="w-full bg-white border border-[#E8E5DF] px-3 py-2.5 rounded-lg text-base sm:text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Listing Type</label>
                  <select
                    value={propertyFormData.listingType}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, listingType: e.target.value })}
                    className="w-full bg-white border border-[#E8E5DF] px-3 py-2 rounded text-xs"
                  >
                    <option value="buy">For Buy / Sale</option>
                    <option value="rent">For Rent / Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Property Type</label>
                  <select
                    value={propertyFormData.propertyType}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, propertyType: e.target.value })}
                    className="w-full bg-white border border-[#E8E5DF] px-3 py-2 rounded text-xs"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Independent Floor">Independent Floor</option>
                    <option value="Grade-A Office">Grade-A Office</option>
                    <option value="Retail Showroom">Retail Showroom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Bedrooms (BHK)</label>
                  <input
                    type="number"
                    value={propertyFormData.bedrooms}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, bedrooms: Number(e.target.value) })}
                    className="w-full bg-white border border-[#E8E5DF] px-3 py-2 rounded text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={propertyFormData.location.city}
                    onChange={(e) => setPropertyFormData({
                      ...propertyFormData,
                      location: { ...propertyFormData.location, city: e.target.value }
                    })}
                    className="w-full bg-white border border-[#E8E5DF] px-3 py-2 rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Locality</label>
                  <input
                    type="text"
                    required
                    value={propertyFormData.location.locality}
                    onChange={(e) => setPropertyFormData({
                      ...propertyFormData,
                      location: { ...propertyFormData.location, locality: e.target.value }
                    })}
                    className="w-full bg-white border border-[#E8E5DF] px-3 py-2 rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={propertyFormData.imageUrl}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, imageUrl: e.target.value })}
                  className="w-full bg-white border border-[#E8E5DF] px-3 py-2 rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Amenities (comma separated)</label>
                <input
                  type="text"
                  value={propertyFormData.amenitiesText}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, amenitiesText: e.target.value })}
                  className="w-full bg-white border border-[#E8E5DF] px-3 py-2 rounded text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={propertyFormData.description}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, description: e.target.value })}
                  className="w-full bg-white border border-[#E8E5DF] px-3 py-2 rounded text-xs"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8E5DF]">
                <button
                  type="button"
                  onClick={() => setIsPropertyModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#171717] hover:bg-[#B99A63] text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded transition-all"
                >
                  {editingPropertyId ? 'Update Listing' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          REAL-TIME CLICKABLE SITE VISIT TOAST NOTIFICATIONS
         ===================================================================== */}
      {visitToasts.length > 0 && (
        <div
          aria-live="polite"
          aria-label="Real-time site visit notifications"
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 right-3 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:w-[375px] flex flex-col gap-2.5 pointer-events-none"
        >
          {visitToasts.map((toast) => (
            <div
              key={toast.id}
              role="button"
              tabIndex={0}
              onClick={() => handleJumpToSiteVisit(toast.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleJumpToSiteVisit(toast.id);
                }
              }}
              className="pointer-events-auto group w-full text-left bg-[#171717] hover:bg-[#1F1F22] text-white border border-[#B99A63] rounded-xl p-3.5 shadow-2xl transition-all cursor-pointer animate-in slide-in-from-bottom-2 fade-in duration-200"
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#B99A63]/20 border border-[#B99A63]/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4 text-[#E8D39E]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E8D39E]">
                        New Site Visit Booked · Live
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white truncate mt-0.5">
                      {toast.fullName}
                    </p>
                    <p className="text-xs text-stone-300 truncate">
                      {toast.propertyTitle || toast.subtitle}
                    </p>
                    {toast.visitDate && (
                      <p className="text-[11px] font-mono text-stone-400 truncate mt-0.5">
                        {toast.visitDate}
                        {toast.timeSlot ? ` · ${toast.timeSlot}` : ''}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisitToasts((prev) => prev.filter((t) => t.id !== toast.id));
                  }}
                  aria-label="Dismiss site visit toast"
                  className="p-1 text-stone-400 hover:text-white rounded-md transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400">
                  Click to open in Site Visits
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#E8D39E] group-hover:translate-x-0.5 transition-transform">
                  <span>View Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
