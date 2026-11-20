import {
  Property,
  Lead,
  LeadSource,
  SiteVisit,
  BusinessConfig,
  LeadStatus
} from '@/types/real-estate';
import { SAMPLE_PROPERTIES } from '@/lib/data/sample-data';
import { BUSINESS_CONFIG } from '@/lib/config';

const KEYS = {
  LEADS: 'sa_leads_v1',
  SITE_VISITS: 'sa_site_visits_v1',
  DELETED_LEADS: 'sa_deleted_leads_v1',
  DELETED_VISITS: 'sa_deleted_visits_v1',
  PROPERTIES: 'sa_properties_v2',
  SETTINGS: 'sa_settings_v1',
  SAVED_PROPERTIES: 'sa_saved_ids_v1',
  ADMIN_AUTH: 'sa_admin_auth_v1',
  LAST_SYNC_AT: 'sa_last_sync_at_v1',
};

const STORAGE_EVENT = 'sa_storage_update';
const BROADCAST_CHANNEL_NAME = 'sa_realtime_channel_v1';

// Legacy seeded mock IDs to clean out automatically while keeping all genuine client leads/visits
const LEGACY_MOCK_LEAD_IDS = new Set(['lead-17101', 'lead-17102', 'lead-17103']);
const LEGACY_MOCK_VISIT_IDS = new Set(['visit-101', 'visit-102']);

let broadcastChannel: BroadcastChannel | null = null;

function isClient(): boolean {
  return typeof window !== 'undefined';
}

function getChannel(): BroadcastChannel | null {
  if (!isClient() || typeof BroadcastChannel === 'undefined') return null;
  if (!broadcastChannel) {
    try {
      broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    } catch {
      return null;
    }
  }
  return broadcastChannel;
}

function recordLastSyncAt(): string {
  const now = new Date().toISOString();
  if (isClient()) {
    try {
      localStorage.setItem(KEYS.LAST_SYNC_AT, now);
    } catch {
      // Ignore
    }
  }
  return now;
}

export function getLastStorageSyncAt(): string | null {
  if (!isClient()) return null;
  try {
    return localStorage.getItem(KEYS.LAST_SYNC_AT);
  } catch {
    return null;
  }
}

function notifyStorageChange(detail: { key: string; action: string }) {
  if (!isClient()) return;
  recordLastSyncAt();
  try {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail }));
  } catch {
    // Ignore in non-browser contexts
  }
  try {
    getChannel()?.postMessage(detail);
  } catch {
    // Ignore BroadcastChannel errors
  }
}

export function subscribeToClientStorage(callback: () => void): () => void {
  if (!isClient()) return () => {};

  const handleUpdate = () => callback();
  window.addEventListener(STORAGE_EVENT, handleUpdate);
  window.addEventListener('storage', handleUpdate);

  const channel = getChannel();
  const handleBroadcast = () => callback();
  if (channel) {
    channel.addEventListener('message', handleBroadcast);
  }

  return () => {
    window.removeEventListener(STORAGE_EVENT, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
    if (channel) {
      channel.removeEventListener('message', handleBroadcast);
    }
  };
}

function relayToServer(payload: Record<string, unknown>) {
  if (!isClient()) return;
  try {
    void fetch('/api/realtime/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Offline/local fallback keeps data intact in localStorage
    });
  } catch {
    // Ignore network dispatch errors
  }
}

function getDeletedIds(storageKey: string): Set<string> {
  if (!isClient()) return new Set();
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.map(String)) : new Set();
  } catch {
    return new Set();
  }
}

function addDeletedId(storageKey: string, id: string) {
  if (!isClient()) return;
  try {
    const set = getDeletedIds(storageKey);
    set.add(id);
    localStorage.setItem(storageKey, JSON.stringify(Array.from(set).slice(-300)));
  } catch {
    // Ignore
  }
}

export function validateGenuineContact(data: {
  fullName?: string;
  phone?: string;
  email?: string;
}): { valid: boolean; error?: string } {
  const name = (data.fullName || '').trim();
  const phoneDigits = (data.phone || '').replace(/\D/g, '');
  const email = (data.email || '').trim();

  if (name.length < 2) {
    return { valid: false, error: 'Please enter your full name (minimum 2 characters).' };
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = phoneDigits.length >= 7 && phoneDigits.length <= 15;

  if (!phoneValid && !emailValid) {
    return {
      valid: false,
      error: 'Please enter a valid contact phone number or email address.',
    };
  }

  if (email && !emailValid) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  if (data.phone && !phoneValid) {
    return { valid: false, error: 'Please enter a valid phone number (7–15 digits).' };
  }

  return { valid: true };
}

// -----------------------------------------------------------------------------
// GENUINE CLIENT LEADS STORE (ZERO FAKE SEED DATA)
// -----------------------------------------------------------------------------
export function getStoredLeads(): Lead[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(KEYS.LEADS);
    if (!raw) {
      localStorage.setItem(KEYS.LEADS, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const deletedIds = getDeletedIds(KEYS.DELETED_LEADS);
    const cleaned = parsed.filter(
      (l: Lead) => l && l.id && !LEGACY_MOCK_LEAD_IDS.has(l.id) && !deletedIds.has(l.id)
    );

    if (cleaned.length !== parsed.length) {
      localStorage.setItem(KEYS.LEADS, JSON.stringify(cleaned));
    }

    return cleaned.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export function createStoredLead(data: {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  leadSource?: string;
  propertyId?: string;
  propertyTitle?: string;
  budget?: string;
  preferredLocation?: string;
  message?: string;
  preferredVisitDate?: string;
}): Lead {
  const uniqueSuffix = Math.random().toString(36).slice(2, 6);
  const newLead: Lead = {
    id: data.id || `lead-${Date.now()}-${uniqueSuffix}`,
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    leadSource: ((data.leadSource === 'ai_chatbot' ? 'ai_assistant' : data.leadSource) as LeadSource) || 'contact_form',
    propertyId: data.propertyId,
    propertyTitle: data.propertyTitle?.trim(),
    budget: data.budget?.trim(),
    preferredLocation: data.preferredLocation?.trim(),
    message: (data.message || '').trim(),
    leadStatus: 'New',
    preferredVisitDate: data.preferredVisitDate,
    createdAt: new Date().toISOString()
  };

  if (isClient()) {
    try {
      const leads = getStoredLeads();
      const updated = [newLead, ...leads.filter((l) => l.id !== newLead.id)];
      localStorage.setItem(KEYS.LEADS, JSON.stringify(updated));
      notifyStorageChange({ key: KEYS.LEADS, action: 'create' });
      relayToServer({ action: 'create_lead', lead: newLead });
    } catch (e) {
      console.error('Failed to save lead to client storage:', e);
    }
  }

  return newLead;
}

export function updateStoredLeadStatus(id: string, status: LeadStatus, notes?: string): Lead | null {
  if (!isClient()) return null;
  try {
    const leads = getStoredLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const existingNotes = Array.isArray(leads[index].internalNotes)
      ? leads[index].internalNotes
      : leads[index].internalNotes
      ? [leads[index].internalNotes as unknown as string]
      : [];

    const nextNotes = notes && notes.trim() ? [...existingNotes, notes.trim()] : leads[index].internalNotes;

    leads[index] = {
      ...leads[index],
      leadStatus: status,
      internalNotes: nextNotes,
    };

    localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
    notifyStorageChange({ key: KEYS.LEADS, action: 'update' });
    relayToServer({
      action: 'update_lead',
      id,
      leadStatus: status,
      internalNotes: nextNotes,
    });
    return leads[index];
  } catch {
    return null;
  }
}

export function deleteStoredLead(id: string): boolean {
  if (!isClient()) return false;
  try {
    const leads = getStoredLeads();
    const filtered = leads.filter((l) => l.id !== id);
    addDeletedId(KEYS.DELETED_LEADS, id);
    localStorage.setItem(KEYS.LEADS, JSON.stringify(filtered));
    notifyStorageChange({ key: KEYS.LEADS, action: 'delete' });
    relayToServer({ action: 'delete_lead', id });
    return true;
  } catch {
    return false;
  }
}

// -----------------------------------------------------------------------------
// GENUINE SITE VISITS STORE (ZERO FAKE SEED DATA)
// -----------------------------------------------------------------------------
export function getStoredSiteVisits(): SiteVisit[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(KEYS.SITE_VISITS);
    if (!raw) {
      localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const deletedIds = getDeletedIds(KEYS.DELETED_VISITS);
    const cleaned = parsed.filter(
      (v: SiteVisit) => v && v.id && !LEGACY_MOCK_VISIT_IDS.has(v.id) && !deletedIds.has(v.id)
    );

    if (cleaned.length !== parsed.length) {
      localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(cleaned));
    }

    return cleaned.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export function createStoredSiteVisit(data: {
  fullName: string;
  phone: string;
  email: string;
  propertyId: string;
  propertyTitle: string;
  visitDate: string;
  timeSlot: string;
  numberOfVisitors?: number;
  pickupRequired?: boolean;
  notes?: string;
}): SiteVisit {
  const uniqueSuffix = Math.random().toString(36).slice(2, 6);
  const visitId = `visit-${Date.now()}-${uniqueSuffix}`;
  const newVisit: SiteVisit = {
    id: visitId,
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    propertyId: data.propertyId,
    propertyTitle: data.propertyTitle.trim(),
    visitDate: data.visitDate,
    timeSlot: data.timeSlot,
    numberOfVisitors: data.numberOfVisitors || 1,
    pickupRequired: !!data.pickupRequired,
    status: 'Pending',
    notes: data.notes?.trim(),
    createdAt: new Date().toISOString()
  };

  if (isClient()) {
    try {
      const visits = getStoredSiteVisits();
      const updated = [newVisit, ...visits.filter((v) => v.id !== newVisit.id)];
      localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(updated));
      notifyStorageChange({ key: KEYS.SITE_VISITS, action: 'create' });
      relayToServer({ action: 'create_visit', visit: newVisit });

      // Automatically create corresponding lead record with deterministic link ID
      createStoredLead({
        id: `lead-for-${visitId}`,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        leadSource: 'site_visit_booking',
        propertyId: data.propertyId,
        propertyTitle: data.propertyTitle,
        message: `Scheduled site visit on ${data.visitDate} (${data.timeSlot}). ${data.pickupRequired ? 'Requested Chauffeur Pick-up.' : ''} ${data.notes || ''}`.trim(),
        preferredVisitDate: data.visitDate
      });
    } catch (e) {
      console.error('Failed to save site visit:', e);
    }
  }

  return newVisit;
}

export function updateStoredSiteVisitStatus(
  id: string,
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
): SiteVisit | null {
  if (!isClient()) return null;
  try {
    const visits = getStoredSiteVisits();
    const index = visits.findIndex((v) => v.id === id);
    if (index === -1) return null;

    visits[index] = { ...visits[index], status };
    localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(visits));
    notifyStorageChange({ key: KEYS.SITE_VISITS, action: 'update' });
    relayToServer({ action: 'update_visit', id, status });
    return visits[index];
  } catch {
    return null;
  }
}

export function deleteStoredSiteVisit(id: string): boolean {
  if (!isClient()) return false;
  try {
    const visits = getStoredSiteVisits();
    const filtered = visits.filter((v) => v.id !== id);
    addDeletedId(KEYS.DELETED_VISITS, id);
    localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(filtered));
    notifyStorageChange({ key: KEYS.SITE_VISITS, action: 'delete' });
    relayToServer({ action: 'delete_visit', id });
    return true;
  } catch {
    return false;
  }
}

// -----------------------------------------------------------------------------
// REAL-TIME SSE + CROSS-TAB MERGE & SUBSCRIPTION
// -----------------------------------------------------------------------------
function mergeServerSnapshot(snapshot: {
  leads?: Lead[];
  siteVisits?: SiteVisit[];
  deletedLeadIds?: string[];
  deletedVisitIds?: string[];
}) {
  if (!isClient()) return;

  try {
    const localDeletedLeads = getDeletedIds(KEYS.DELETED_LEADS);
    const localDeletedVisits = getDeletedIds(KEYS.DELETED_VISITS);

    for (const delId of snapshot.deletedLeadIds || []) {
      localDeletedLeads.add(delId);
    }
    for (const delId of snapshot.deletedVisitIds || []) {
      localDeletedVisits.add(delId);
    }

    localStorage.setItem(KEYS.DELETED_LEADS, JSON.stringify(Array.from(localDeletedLeads).slice(-300)));
    localStorage.setItem(KEYS.DELETED_VISITS, JSON.stringify(Array.from(localDeletedVisits).slice(-300)));

    if (Array.isArray(snapshot.leads)) {
      const currentLeads = getStoredLeads();
      const map = new Map<string, Lead>();
      for (const l of currentLeads) {
        if (!localDeletedLeads.has(l.id) && !LEGACY_MOCK_LEAD_IDS.has(l.id)) {
          map.set(l.id, l);
        }
      }
      for (const serverLead of snapshot.leads) {
        if (
          serverLead?.id &&
          !localDeletedLeads.has(serverLead.id) &&
          !LEGACY_MOCK_LEAD_IDS.has(serverLead.id)
        ) {
          map.set(serverLead.id, serverLead);
        }
      }
      const mergedLeads = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      localStorage.setItem(KEYS.LEADS, JSON.stringify(mergedLeads));
    }

    if (Array.isArray(snapshot.siteVisits)) {
      const currentVisits = getStoredSiteVisits();
      const map = new Map<string, SiteVisit>();
      for (const v of currentVisits) {
        if (!localDeletedVisits.has(v.id) && !LEGACY_MOCK_VISIT_IDS.has(v.id)) {
          map.set(v.id, v);
        }
      }
      for (const serverVisit of snapshot.siteVisits) {
        if (
          serverVisit?.id &&
          !localDeletedVisits.has(serverVisit.id) &&
          !LEGACY_MOCK_VISIT_IDS.has(serverVisit.id)
        ) {
          map.set(serverVisit.id, serverVisit);
        }
      }
      const mergedVisits = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(mergedVisits));
    }

    recordLastSyncAt();
  } catch (e) {
    console.error('Failed to merge realtime snapshot:', e);
  }
}

export async function syncInquiriesWithServer(): Promise<void> {
  if (!isClient()) return;
  try {
    const localLeads = getStoredLeads();
    const localVisits = getStoredSiteVisits();
    const res = await fetch('/api/realtime/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'sync_existing',
        leads: localLeads,
        siteVisits: localVisits,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      mergeServerSnapshot(data);
    }
  } catch {
    // Keep client storage active offline
  }
}

export interface LiveArrivalNotice {
  id: string;
  kind: 'lead' | 'visit';
  fullName: string;
  subtitle: string;
  timestamp: string;
  propertyTitle?: string;
  visitDate?: string;
  timeSlot?: string;
}

export function subscribeToRealtimeInquiries(handlers: {
  onDataChange: () => void;
  onConnectionChange?: (state: 'live' | 'connecting' | 'reconnecting') => void;
  onNewArrival?: (notice: LiveArrivalNotice) => void;
}): () => void {
  if (!isClient()) return () => {};

  let closed = false;
  let eventSource: EventSource | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  const seenArrivals = new Set<string>(
    [...getStoredLeads().map((l) => l.id), ...getStoredSiteVisits().map((v) => v.id)]
  );

  const notifyIfNew = (notice: LiveArrivalNotice) => {
    if (seenArrivals.has(notice.id)) return;
    seenArrivals.add(notice.id);
    handlers.onNewArrival?.(notice);
  };

  // Push any existing genuine local leads/visits to the server hub on initial connect
  void syncInquiriesWithServer().then(() => {
    if (!closed) handlers.onDataChange();
  });

  const connect = () => {
    if (closed || typeof EventSource === 'undefined') return;
    handlers.onConnectionChange?.('connecting');

    try {
      eventSource = new EventSource('/api/realtime/stream');

      eventSource.onopen = () => {
        if (!closed) {
          handlers.onConnectionChange?.('live');
        }
      };

      eventSource.onmessage = (event) => {
        if (closed) return;
        try {
          const payload = JSON.parse(event.data);
          handlers.onConnectionChange?.('live');

          if (payload.type === 'init') {
            mergeServerSnapshot(payload);
            for (const l of payload.leads || []) seenArrivals.add(l.id);
            for (const v of payload.siteVisits || []) seenArrivals.add(v.id);
            handlers.onDataChange();
          } else if (payload.type === 'lead:created' && payload.lead) {
            const deleted = getDeletedIds(KEYS.DELETED_LEADS);
            if (!deleted.has(payload.lead.id) && !LEGACY_MOCK_LEAD_IDS.has(payload.lead.id)) {
              const existing = getStoredLeads();
              if (!existing.some((l) => l.id === payload.lead.id)) {
                const next = [payload.lead, ...existing];
                localStorage.setItem(KEYS.LEADS, JSON.stringify(next));
                recordLastSyncAt();
              }
              notifyIfNew({
                kind: 'lead',
                id: payload.lead.id,
                fullName: payload.lead.fullName,
                subtitle: payload.lead.propertyTitle || payload.lead.leadSource.replace(/_/g, ' '),
                timestamp: payload.lead.createdAt,
                propertyTitle: payload.lead.propertyTitle,
              });
              handlers.onDataChange();
            }
          } else if (payload.type === 'lead:updated' && payload.lead) {
            const existing = getStoredLeads();
            const exists = existing.some((l) => l.id === payload.lead.id);
            const next = exists
              ? existing.map((l) => (l.id === payload.lead.id ? payload.lead : l))
              : [payload.lead, ...existing];
            localStorage.setItem(KEYS.LEADS, JSON.stringify(next));
            recordLastSyncAt();
            handlers.onDataChange();
          } else if (payload.type === 'lead:deleted' && payload.id) {
            addDeletedId(KEYS.DELETED_LEADS, payload.id);
            const next = getStoredLeads().filter((l) => l.id !== payload.id);
            localStorage.setItem(KEYS.LEADS, JSON.stringify(next));
            recordLastSyncAt();
            handlers.onDataChange();
          } else if (payload.type === 'visit:created' && payload.visit) {
            const deleted = getDeletedIds(KEYS.DELETED_VISITS);
            if (!deleted.has(payload.visit.id) && !LEGACY_MOCK_VISIT_IDS.has(payload.visit.id)) {
              const existing = getStoredSiteVisits();
              if (!existing.some((v) => v.id === payload.visit.id)) {
                const next = [payload.visit, ...existing];
                localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(next));
                recordLastSyncAt();
              }
              notifyIfNew({
                kind: 'visit',
                id: payload.visit.id,
                fullName: payload.visit.fullName,
                subtitle: `${payload.visit.propertyTitle} · ${payload.visit.visitDate}`,
                timestamp: payload.visit.createdAt,
                propertyTitle: payload.visit.propertyTitle,
                visitDate: payload.visit.visitDate,
                timeSlot: payload.visit.timeSlot,
              });
              handlers.onDataChange();
            }
          } else if (payload.type === 'visit:updated' && payload.visit) {
            const existing = getStoredSiteVisits();
            const exists = existing.some((v) => v.id === payload.visit.id);
            const next = exists
              ? existing.map((v) => (v.id === payload.visit.id ? payload.visit : v))
              : [payload.visit, ...existing];
            localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(next));
            recordLastSyncAt();
            handlers.onDataChange();
          } else if (payload.type === 'visit:deleted' && payload.id) {
            addDeletedId(KEYS.DELETED_VISITS, payload.id);
            const next = getStoredSiteVisits().filter((v) => v.id !== payload.id);
            localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(next));
            recordLastSyncAt();
            handlers.onDataChange();
          } else if (payload.type === 'reset') {
            localStorage.setItem(KEYS.LEADS, JSON.stringify([]));
            localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify([]));
            recordLastSyncAt();
            handlers.onDataChange();
          }
        } catch {
          // Ignore malformed keepalive/frame
        }
      };

      eventSource.onerror = () => {
        if (closed) return;
        handlers.onConnectionChange?.('reconnecting');
        eventSource?.close();
        eventSource = null;
        if (!reconnectTimer) {
          reconnectTimer = setTimeout(() => {
            reconnectTimer = null;
            connect();
          }, 3000);
        }
      };
    } catch {
      handlers.onConnectionChange?.('reconnecting');
    }
  };

  connect();

  // Also capture instant same-browser BroadcastChannel updates
  const channel = getChannel();
  const handleChannelMessage = (ev: MessageEvent) => {
    if (closed) return;
    const detail = ev.data;
    if (detail?.action === 'create') {
      if (detail.key === KEYS.LEADS) {
        const latest = getStoredLeads()[0];
        if (latest) {
          notifyIfNew({
            kind: 'lead',
            id: latest.id,
            fullName: latest.fullName,
            subtitle: latest.propertyTitle || latest.leadSource.replace(/_/g, ' '),
            timestamp: latest.createdAt,
            propertyTitle: latest.propertyTitle,
          });
        }
      } else if (detail.key === KEYS.SITE_VISITS) {
        const latest = getStoredSiteVisits()[0];
        if (latest) {
          notifyIfNew({
            kind: 'visit',
            id: latest.id,
            fullName: latest.fullName,
            subtitle: `${latest.propertyTitle} · ${latest.visitDate}`,
            timestamp: latest.createdAt,
            propertyTitle: latest.propertyTitle,
            visitDate: latest.visitDate,
            timeSlot: latest.timeSlot,
          });
        }
      }
    }
    handlers.onDataChange();
  };
  channel?.addEventListener('message', handleChannelMessage);

  const handleFocus = () => {
    if (!closed) {
      void syncInquiriesWithServer().then(() => {
        if (!closed) handlers.onDataChange();
      });
    }
  };
  window.addEventListener('focus', handleFocus);

  return () => {
    closed = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    eventSource?.close();
    channel?.removeEventListener('message', handleChannelMessage);
    window.removeEventListener('focus', handleFocus);
  };
}

// -----------------------------------------------------------------------------
// PROPERTIES STORE (CLIENT-SIDE WITH SEED FALLBACK)
// -----------------------------------------------------------------------------
export function getStoredProperties(): Property[] {
  if (!isClient()) return SAMPLE_PROPERTIES;
  try {
    const raw = localStorage.getItem(KEYS.PROPERTIES);
    if (!raw) {
      localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(SAMPLE_PROPERTIES));
      return SAMPLE_PROPERTIES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return SAMPLE_PROPERTIES;
    return parsed.map((p: Property) => {
      const seedMatch = SAMPLE_PROPERTIES.find((sp) => sp.id === p.id || sp.slug === p.slug);
      const needsPriceSync =
        seedMatch &&
        ((p.listingType === 'buy' && (p.price > 9000000 || p.price < 4000000 || p.price !== seedMatch.price)) ||
          (p.listingType === 'rent' && p.price > 100000));

      return {
        ...p,
        ...(needsPriceSync && seedMatch
          ? {
              price: seedMatch.price,
              priceDisplay: seedMatch.priceDisplay,
              pricePerSqFt: seedMatch.pricePerSqFt,
              tagline: seedMatch.tagline,
              description: seedMatch.description,
              highlightFeatures: seedMatch.highlightFeatures,
            }
          : {}),
        images: seedMatch && seedMatch.images.length > (p.images?.length || 0) ? seedMatch.images : p.images,
        agent:
          p.agent && p.agent.email?.toLowerCase() === 'aura@gmail.com'
            ? { ...p.agent, email: BUSINESS_CONFIG.email }
            : p.agent,
      };
    });
  } catch {
    return SAMPLE_PROPERTIES;
  }
}

export function getPropertyByIdOrSlug(idOrSlug: string): Property | undefined {
  const props = getStoredProperties();
  return props.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function saveStoredProperty(property: Property): Property {
  if (!isClient()) return property;
  try {
    const props = getStoredProperties();
    const index = props.findIndex((p) => p.id === property.id || p.slug === property.slug);
    let updated: Property[];
    if (index >= 0) {
      updated = [...props];
      updated[index] = property;
    } else {
      updated = [property, ...props];
    }
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(updated));
    notifyStorageChange({ key: KEYS.PROPERTIES, action: 'save' });
  } catch (e) {
    console.error('Failed to save property to client storage:', e);
  }
  return property;
}

export function deleteStoredProperty(id: string): boolean {
  if (!isClient()) return false;
  try {
    const props = getStoredProperties();
    const updated = props.filter((p) => p.id !== id);
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(updated));
    notifyStorageChange({ key: KEYS.PROPERTIES, action: 'delete' });
    return true;
  } catch {
    return false;
  }
}

// -----------------------------------------------------------------------------
// BUSINESS SETTINGS STORE
// -----------------------------------------------------------------------------
export function getStoredSettings(): BusinessConfig {
  if (!isClient()) return BUSINESS_CONFIG;
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(BUSINESS_CONFIG));
      return BUSINESS_CONFIG;
    }
    const parsed = JSON.parse(raw) as BusinessConfig;
    if (parsed.email?.toLowerCase() === 'aura@gmail.com') {
      parsed.email = BUSINESS_CONFIG.email;
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return BUSINESS_CONFIG;
  }
}

export function updateStoredSettings(updates: Partial<BusinessConfig>): BusinessConfig {
  const current = getStoredSettings();
  const merged = { ...current, ...updates };
  if (isClient()) {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(merged));
      notifyStorageChange({ key: KEYS.SETTINGS, action: 'update' });
    } catch (e) {
      console.error('Failed to update business settings in client storage:', e);
    }
  }
  return merged;
}

// -----------------------------------------------------------------------------
// FAVORITE / SAVED PROPERTIES STORE
// -----------------------------------------------------------------------------
export function getSavedPropertyIds(): string[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(KEYS.SAVED_PROPERTIES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSavedPropertyId(id: string): boolean {
  if (!isClient()) return false;
  try {
    const current = getSavedPropertyIds();
    const isSaved = current.includes(id);
    const updated = isSaved ? current.filter((itemId) => itemId !== id) : [...current, id];
    localStorage.setItem(KEYS.SAVED_PROPERTIES, JSON.stringify(updated));
    notifyStorageChange({ key: KEYS.SAVED_PROPERTIES, action: 'toggle' });
    return !isSaved;
  } catch {
    return false;
  }
}

export function isPropertySaved(id: string): boolean {
  return getSavedPropertyIds().includes(id);
}

// -----------------------------------------------------------------------------
// ADMIN AUTHENTICATION (CLIENT-SIDE SESSION)
// -----------------------------------------------------------------------------
export function isClientAdminAuthenticated(): boolean {
  if (!isClient()) return false;
  try {
    return localStorage.getItem(KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function setClientAdminAuthenticated(val: boolean) {
  if (!isClient()) return;
  try {
    if (val) {
      localStorage.setItem(KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(KEYS.ADMIN_AUTH);
    }
    notifyStorageChange({ key: KEYS.ADMIN_AUTH, action: 'auth' });
  } catch {
    // Ignore
  }
}

// -----------------------------------------------------------------------------
// DATA EXPORT UTILITIES (CSV / JSON)
// -----------------------------------------------------------------------------
export function exportDataToCSV(data: any[], filename: string) {
  if (!isClient() || !data.length) return;
  try {
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const val = row[header] ?? '';
            const escaped = String(val).replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(',')
      )
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Export CSV failed:', e);
  }
}

export function exportDataToJSON(data: any[], filename: string) {
  if (!isClient()) return;
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Export JSON failed:', e);
  }
}

// -----------------------------------------------------------------------------
// RESET CLIENT STORAGE (ZERO FAKE LEADS OR FAKE SITE VISITS)
// -----------------------------------------------------------------------------
export function resetAllClientStorage() {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(SAMPLE_PROPERTIES));
    localStorage.setItem(KEYS.LEADS, JSON.stringify([]));
    localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify([]));
    localStorage.setItem(KEYS.DELETED_LEADS, JSON.stringify([]));
    localStorage.setItem(KEYS.DELETED_VISITS, JSON.stringify([]));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(BUSINESS_CONFIG));
    notifyStorageChange({ key: 'all', action: 'reset' });
    relayToServer({ action: 'clear_all' });
  } catch (e) {
    console.error('Reset client storage failed:', e);
  }
}
