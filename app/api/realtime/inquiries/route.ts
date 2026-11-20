import { NextRequest, NextResponse } from 'next/server';
import { getRealtimeHub } from '@/lib/realtime-hub';
import type { Lead, SiteVisit, LeadStatus } from '@/types/real-estate';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function isValidGenuineContact(name?: string, phone?: string, email?: string): boolean {
  const cleanName = (name || '').trim();
  if (cleanName.length < 2) return false;
  const digitCount = (phone || '').replace(/\D/g, '').length;
  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || '').trim());
  return digitCount >= 7 || hasValidEmail;
}

export async function GET() {
  const hub = getRealtimeHub();
  return NextResponse.json(hub.getSnapshot(), {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const hub = getRealtimeHub();
    const action = body?.action as string;

    if (action === 'create_lead' && body.lead) {
      const lead = body.lead as Lead;
      if (!isValidGenuineContact(lead.fullName, lead.phone, lead.email)) {
        return NextResponse.json(
          { error: 'Please provide a valid name and phone number or email address.' },
          { status: 400 }
        );
      }
      const saved = hub.addLead(lead);
      return NextResponse.json({ ok: true, lead: saved });
    }

    if (action === 'update_lead' && body.id && body.leadStatus) {
      const updated = hub.updateLead(
        String(body.id),
        body.leadStatus as LeadStatus,
        Array.isArray(body.internalNotes) ? body.internalNotes : undefined
      );
      return NextResponse.json({ ok: true, lead: updated });
    }

    if (action === 'delete_lead' && body.id) {
      hub.deleteLead(String(body.id));
      return NextResponse.json({ ok: true });
    }

    if (action === 'create_visit' && body.visit) {
      const visit = body.visit as SiteVisit;
      if (!isValidGenuineContact(visit.fullName, visit.phone, visit.email) || !visit.visitDate) {
        return NextResponse.json(
          { error: 'Please provide a valid name, contact info, and preferred visit date.' },
          { status: 400 }
        );
      }
      const saved = hub.addVisit(visit);
      return NextResponse.json({ ok: true, visit: saved });
    }

    if (action === 'update_visit' && body.id && body.status) {
      const updated = hub.updateVisit(
        String(body.id),
        body.status as 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
      );
      return NextResponse.json({ ok: true, visit: updated });
    }

    if (action === 'delete_visit' && body.id) {
      hub.deleteVisit(String(body.id));
      return NextResponse.json({ ok: true });
    }

    if (action === 'sync_existing') {
      const leads = Array.isArray(body.leads) ? (body.leads as Lead[]) : [];
      const siteVisits = Array.isArray(body.siteVisits) ? (body.siteVisits as SiteVisit[]) : [];
      hub.syncBatch(leads, siteVisits);
      return NextResponse.json({ ok: true, ...hub.getSnapshot() });
    }

    if (action === 'clear_all') {
      hub.clearAllInquiries();
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }
}
