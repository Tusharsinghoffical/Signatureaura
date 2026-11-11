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
  PROPERTIES: 'sa_properties_v1',
  SETTINGS: 'sa_settings_v1',
  SAVED_PROPERTIES: 'sa_saved_ids_v1',
  ADMIN_AUTH: 'sa_admin_auth_v1',
};

const STORAGE_EVENT = 'sa_storage_update';

function isClient(): boolean {
  return typeof window !== 'undefined';
}

function notifyStorageChange(detail: { key: string; action: string }) {
  if (!isClient()) return;
  try {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail }));
  } catch (e) {
    // Ignore in non-browser contexts
  }
}

export function subscribeToClientStorage(callback: () => void): () => void {
  if (!isClient()) return () => {};

  const handleUpdate = () => callback();
  window.addEventListener(STORAGE_EVENT, handleUpdate);
  window.addEventListener('storage', handleUpdate);

  return () => {
    window.removeEventListener(STORAGE_EVENT, handleUpdate);
    window.removeEventListener('storage', handleUpdate);
  };
}

// -----------------------------------------------------------------------------
// SEED INITIAL MOCK DATA
// -----------------------------------------------------------------------------
const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-17101',
    fullName: 'Aditya Vikram Singhania',
    phone: '+91 98200 44123',
    email: 'aditya.singhania@singhaniaholdings.com',
    leadSource: 'contact_form',
    propertyId: 'the-worli-horizon-penthouse',
    propertyTitle: 'The Worli Horizon Triplex Penthouse',
    budget: '₹ 30 Cr - 40 Cr',
    preferredLocation: 'Worli Sea Face, Mumbai',
    message: 'Seeking confidential viewing for private family office residence. Sunset slot preferred.',
    leadStatus: 'Contacted',
    preferredVisitDate: '2026-11-18',
    internalNotes: ['High-conviction buyer. In touch with Senior Advisory desk.'],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'lead-17102',
    fullName: 'Natasha Oberoi (NRI Desk)',
    phone: '+44 7911 123456',
    email: 'natasha.oberoi@mayfairpartners.co.uk',
    leadSource: 'whatsapp',
    propertyId: 'villa-sol-terra-assagao',
    propertyTitle: 'Villa Sol Terra - Heritage Portuguese Estate',
    budget: '₹ 15 Cr - 20 Cr',
    preferredLocation: 'Assagao, North Goa',
    message: 'Looking to acquire freehold Portuguese villa with 1-acre private estate. Require FEMA remittance guidance.',
    leadStatus: 'New',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'lead-17103',
    fullName: 'Karan Mehra',
    phone: '+91 98111 88992',
    email: 'karan@innovatefintech.io',
    leadSource: 'property_enquiry',
    propertyId: 'the-bkc-fintech-corporate-floor',
    propertyTitle: 'Grade-A Fintech Tower Corporate Floor - BKC',
    budget: '₹ 40 Cr+',
    preferredLocation: 'G-Block, BKC, Mumbai',
    message: 'Planning corporate headquarters relocation for 180 engineers. Need LEED certification and cafeteria floor plate.',
    leadStatus: 'Qualified',
    internalNotes: ['Site visit scheduled with facility manager.'],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  }
];

const INITIAL_VISITS: SiteVisit[] = [
  {
    id: 'visit-101',
    fullName: 'Aditya Vikram Singhania',
    phone: '+91 98200 44123',
    email: 'aditya.singhania@singhaniaholdings.com',
    propertyId: 'the-worli-horizon-penthouse',
    propertyTitle: 'The Worli Horizon Triplex Penthouse',
    visitDate: '2026-11-18',
    timeSlot: '4:30 PM – Sunset (Golden Hour)',
    numberOfVisitors: 2,
    pickupRequired: true,
    status: 'Confirmed',
    notes: 'Chauffeur allocated from St. Regis Mumbai.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'visit-102',
    fullName: 'Pooja & Sameer Deshmukh',
    phone: '+91 99224 11029',
    email: 'sameer.deshmukh@koregaonpartners.com',
    propertyId: 'koregaon-park-botanica-pune',
    propertyTitle: 'The Botanica Sky Villa Koregaon Park',
    visitDate: '2026-11-16',
    timeSlot: '11:00 AM – 1:00 PM',
    numberOfVisitors: 3,
    pickupRequired: false,
    status: 'Pending',
    notes: 'Family visit with architect for interior fit-out inspection.',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];

// -----------------------------------------------------------------------------
// LEADS STORE
// -----------------------------------------------------------------------------
export function getStoredLeads(): Lead[] {
  if (!isClient()) return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(KEYS.LEADS);
    if (!raw) {
      localStorage.setItem(KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LEADS;
  }
}

export function createStoredLead(data: {
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
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    leadSource: (data.leadSource as LeadSource) || 'contact_form',
    propertyId: data.propertyId,
    propertyTitle: data.propertyTitle,
    budget: data.budget,
    preferredLocation: data.preferredLocation,
    message: data.message || '',
    leadStatus: 'New',
    preferredVisitDate: data.preferredVisitDate,
    createdAt: new Date().toISOString()
  };

  if (isClient()) {
    try {
      const leads = getStoredLeads();
      const updated = [newLead, ...leads];
      localStorage.setItem(KEYS.LEADS, JSON.stringify(updated));
      notifyStorageChange({ key: KEYS.LEADS, action: 'create' });
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
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return null;

    const existingNotes = Array.isArray(leads[index].internalNotes) 
      ? leads[index].internalNotes 
      : (leads[index].internalNotes ? [leads[index].internalNotes as unknown as string] : []);

    leads[index] = {
      ...leads[index],
      leadStatus: status,
      internalNotes: notes ? [...existingNotes, notes] : leads[index].internalNotes
    };

    localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
    notifyStorageChange({ key: KEYS.LEADS, action: 'update' });
    return leads[index];
  } catch {
    return null;
  }
}

export function deleteStoredLead(id: string): boolean {
  if (!isClient()) return false;
  try {
    const leads = getStoredLeads();
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem(KEYS.LEADS, JSON.stringify(filtered));
    notifyStorageChange({ key: KEYS.LEADS, action: 'delete' });
    return true;
  } catch {
    return false;
  }
}

// -----------------------------------------------------------------------------
// SITE VISITS STORE
// -----------------------------------------------------------------------------
export function getStoredSiteVisits(): SiteVisit[] {
  if (!isClient()) return INITIAL_VISITS;
  try {
    const raw = localStorage.getItem(KEYS.SITE_VISITS);
    if (!raw) {
      localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(INITIAL_VISITS));
      return INITIAL_VISITS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_VISITS;
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
  const newVisit: SiteVisit = {
    id: `visit-${Date.now()}`,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    propertyId: data.propertyId,
    propertyTitle: data.propertyTitle,
    visitDate: data.visitDate,
    timeSlot: data.timeSlot,
    numberOfVisitors: data.numberOfVisitors || 1,
    pickupRequired: !!data.pickupRequired,
    status: 'Pending',
    notes: data.notes,
    createdAt: new Date().toISOString()
  };

  if (isClient()) {
    try {
      const visits = getStoredSiteVisits();
      const updated = [newVisit, ...visits];
      localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(updated));
      notifyStorageChange({ key: KEYS.SITE_VISITS, action: 'create' });

      // Automatically create corresponding lead record for tracking
      createStoredLead({
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
    const index = visits.findIndex(v => v.id === id);
    if (index === -1) return null;

    visits[index] = { ...visits[index], status };
    localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(visits));
    notifyStorageChange({ key: KEYS.SITE_VISITS, action: 'update' });
    return visits[index];
  } catch {
    return null;
  }
}

export function deleteStoredSiteVisit(id: string): boolean {
  if (!isClient()) return false;
  try {
    const visits = getStoredSiteVisits();
    const filtered = visits.filter(v => v.id !== id);
    localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(filtered));
    notifyStorageChange({ key: KEYS.SITE_VISITS, action: 'delete' });
    return true;
  } catch {
    return false;
  }
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
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_PROPERTIES;
  } catch {
    return SAMPLE_PROPERTIES;
  }
}

export function getPropertyByIdOrSlug(idOrSlug: string): Property | undefined {
  const props = getStoredProperties();
  return props.find(p => p.id === idOrSlug || p.slug === idOrSlug);
}

export function saveStoredProperty(property: Property): Property {
  if (!isClient()) return property;
  try {
    const props = getStoredProperties();
    const index = props.findIndex(p => p.id === property.id || p.slug === property.slug);
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
    const updated = props.filter(p => p.id !== id);
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
    return JSON.parse(raw);
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
    const updated = isSaved ? current.filter(itemId => itemId !== id) : [...current, id];
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
      ...data.map(row =>
        headers
          .map(header => {
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
// RESET ALL CLIENT STORAGE
// -----------------------------------------------------------------------------
export function resetAllClientStorage() {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEYS.PROPERTIES, JSON.stringify(SAMPLE_PROPERTIES));
    localStorage.setItem(KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
    localStorage.setItem(KEYS.SITE_VISITS, JSON.stringify(INITIAL_VISITS));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(BUSINESS_CONFIG));
    notifyStorageChange({ key: 'all', action: 'reset' });
  } catch (e) {
    console.error('Reset client storage failed:', e);
  }
}
