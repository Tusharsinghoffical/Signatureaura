import { EventEmitter } from 'events';
import fs from 'fs';
import os from 'os';
import path from 'path';
import type { Lead, SiteVisit, LeadStatus } from '@/types/real-estate';

export type RealtimeEventType =
  | 'init'
  | 'lead:created'
  | 'lead:updated'
  | 'lead:deleted'
  | 'visit:created'
  | 'visit:updated'
  | 'visit:deleted'
  | 'reset';

export interface RealtimeHubPayload {
  type: RealtimeEventType;
  lead?: Lead;
  visit?: SiteVisit;
  id?: string;
  leads?: Lead[];
  siteVisits?: SiteVisit[];
  deletedLeadIds?: string[];
  deletedVisitIds?: string[];
  timestamp: string;
}

interface RelayStoreState {
  leads: Lead[];
  siteVisits: SiteVisit[];
  deletedLeadIds: string[];
  deletedVisitIds: string[];
  updatedAt: string;
}

const RELAY_FILE_PATH = path.join(os.tmpdir(), 'signature-aura-realtime-relay.json');
const MOCK_LEAD_IDS = new Set(['lead-17101', 'lead-17102', 'lead-17103']);
const MOCK_VISIT_IDS = new Set(['visit-101', 'visit-102']);
const MAX_ITEMS = 300;

class RealtimeInquiriesHub {
  public emitter: EventEmitter;
  private state: RelayStoreState;

  constructor() {
    this.emitter = new EventEmitter();
    this.emitter.setMaxListeners(100);
    this.state = this.loadState();
  }

  private loadState(): RelayStoreState {
    try {
      if (fs.existsSync(RELAY_FILE_PATH)) {
        const raw = fs.readFileSync(RELAY_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw) as Partial<RelayStoreState>;
        return {
          leads: Array.isArray(parsed.leads)
            ? parsed.leads.filter((l) => l && l.id && !MOCK_LEAD_IDS.has(l.id))
            : [],
          siteVisits: Array.isArray(parsed.siteVisits)
            ? parsed.siteVisits.filter((v) => v && v.id && !MOCK_VISIT_IDS.has(v.id))
            : [],
          deletedLeadIds: Array.isArray(parsed.deletedLeadIds) ? parsed.deletedLeadIds : [],
          deletedVisitIds: Array.isArray(parsed.deletedVisitIds) ? parsed.deletedVisitIds : [],
          updatedAt: parsed.updatedAt || new Date().toISOString(),
        };
      }
    } catch {
      // Start clean if tmp cache unavailable
    }
    return {
      leads: [],
      siteVisits: [],
      deletedLeadIds: [],
      deletedVisitIds: [],
      updatedAt: new Date().toISOString(),
    };
  }

  private persistState() {
    this.state.updatedAt = new Date().toISOString();
    try {
      fs.writeFileSync(RELAY_FILE_PATH, JSON.stringify(this.state), 'utf-8');
    } catch {
      // In-memory store stays authoritative if disk write fails
    }
  }

  private broadcast(payload: RealtimeHubPayload) {
    this.emitter.emit('event', payload);
  }

  public getSnapshot(): RelayStoreState {
    return {
      leads: [...this.state.leads],
      siteVisits: [...this.state.siteVisits],
      deletedLeadIds: [...this.state.deletedLeadIds],
      deletedVisitIds: [...this.state.deletedVisitIds],
      updatedAt: this.state.updatedAt,
    };
  }

  public addLead(lead: Lead): Lead {
    if (MOCK_LEAD_IDS.has(lead.id)) return lead;
    if (this.state.deletedLeadIds.includes(lead.id)) return lead;

    const existingIdx = this.state.leads.findIndex((l) => l.id === lead.id);
    if (existingIdx >= 0) {
      this.state.leads[existingIdx] = { ...this.state.leads[existingIdx], ...lead };
    } else {
      this.state.leads = [lead, ...this.state.leads].slice(0, MAX_ITEMS);
    }

    this.persistState();
    this.broadcast({
      type: existingIdx >= 0 ? 'lead:updated' : 'lead:created',
      lead: existingIdx >= 0 ? this.state.leads[existingIdx] : lead,
      timestamp: new Date().toISOString(),
    });
    return existingIdx >= 0 ? this.state.leads[existingIdx] : lead;
  }

  public updateLead(id: string, leadStatus: LeadStatus, internalNotes?: string[]): Lead | null {
    const idx = this.state.leads.findIndex((l) => l.id === id);
    if (idx === -1) return null;

    this.state.leads[idx] = {
      ...this.state.leads[idx],
      leadStatus,
      ...(internalNotes ? { internalNotes } : {}),
    };
    this.persistState();
    this.broadcast({
      type: 'lead:updated',
      lead: this.state.leads[idx],
      timestamp: new Date().toISOString(),
    });
    return this.state.leads[idx];
  }

  public deleteLead(id: string): boolean {
    this.state.leads = this.state.leads.filter((l) => l.id !== id);
    if (!this.state.deletedLeadIds.includes(id)) {
      this.state.deletedLeadIds = [id, ...this.state.deletedLeadIds].slice(0, MAX_ITEMS);
    }
    this.persistState();
    this.broadcast({
      type: 'lead:deleted',
      id,
      timestamp: new Date().toISOString(),
    });
    return true;
  }

  public addVisit(visit: SiteVisit): SiteVisit {
    if (MOCK_VISIT_IDS.has(visit.id)) return visit;
    if (this.state.deletedVisitIds.includes(visit.id)) return visit;

    const existingIdx = this.state.siteVisits.findIndex((v) => v.id === visit.id);
    if (existingIdx >= 0) {
      this.state.siteVisits[existingIdx] = { ...this.state.siteVisits[existingIdx], ...visit };
    } else {
      this.state.siteVisits = [visit, ...this.state.siteVisits].slice(0, MAX_ITEMS);
    }

    this.persistState();
    this.broadcast({
      type: existingIdx >= 0 ? 'visit:updated' : 'visit:created',
      visit: existingIdx >= 0 ? this.state.siteVisits[existingIdx] : visit,
      timestamp: new Date().toISOString(),
    });
    return existingIdx >= 0 ? this.state.siteVisits[existingIdx] : visit;
  }

  public updateVisit(
    id: string,
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  ): SiteVisit | null {
    const idx = this.state.siteVisits.findIndex((v) => v.id === id);
    if (idx === -1) return null;

    this.state.siteVisits[idx] = {
      ...this.state.siteVisits[idx],
      status,
    };
    this.persistState();
    this.broadcast({
      type: 'visit:updated',
      visit: this.state.siteVisits[idx],
      timestamp: new Date().toISOString(),
    });
    return this.state.siteVisits[idx];
  }

  public deleteVisit(id: string): boolean {
    this.state.siteVisits = this.state.siteVisits.filter((v) => v.id !== id);
    if (!this.state.deletedVisitIds.includes(id)) {
      this.state.deletedVisitIds = [id, ...this.state.deletedVisitIds].slice(0, MAX_ITEMS);
    }
    this.persistState();
    this.broadcast({
      type: 'visit:deleted',
      id,
      timestamp: new Date().toISOString(),
    });
    return true;
  }

  public syncBatch(leads: Lead[] = [], siteVisits: SiteVisit[] = []) {
    let changed = false;
    for (const lead of leads) {
      if (
        lead &&
        lead.id &&
        !MOCK_LEAD_IDS.has(lead.id) &&
        !this.state.deletedLeadIds.includes(lead.id) &&
        !this.state.leads.some((existing) => existing.id === lead.id)
      ) {
        this.state.leads.push(lead);
        changed = true;
      }
    }
    for (const visit of siteVisits) {
      if (
        visit &&
        visit.id &&
        !MOCK_VISIT_IDS.has(visit.id) &&
        !this.state.deletedVisitIds.includes(visit.id) &&
        !this.state.siteVisits.some((existing) => existing.id === visit.id)
      ) {
        this.state.siteVisits.push(visit);
        changed = true;
      }
    }
    if (changed) {
      this.state.leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.state.siteVisits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.state.leads = this.state.leads.slice(0, MAX_ITEMS);
      this.state.siteVisits = this.state.siteVisits.slice(0, MAX_ITEMS);
      this.persistState();
      this.broadcast({
        type: 'init',
        ...this.getSnapshot(),
        timestamp: new Date().toISOString(),
      });
    }
  }

  public clearAllInquiries() {
    this.state = {
      leads: [],
      siteVisits: [],
      deletedLeadIds: [],
      deletedVisitIds: [],
      updatedAt: new Date().toISOString(),
    };
    this.persistState();
    this.broadcast({
      type: 'reset',
      leads: [],
      siteVisits: [],
      deletedLeadIds: [],
      deletedVisitIds: [],
      timestamp: new Date().toISOString(),
    });
  }
}

const globalForHub = globalThis as unknown as {
  __signatureAuraRealtimeHub?: RealtimeInquiriesHub;
};

export function getRealtimeHub(): RealtimeInquiriesHub {
  if (!globalForHub.__signatureAuraRealtimeHub) {
    globalForHub.__signatureAuraRealtimeHub = new RealtimeInquiriesHub();
  }
  return globalForHub.__signatureAuraRealtimeHub;
}
