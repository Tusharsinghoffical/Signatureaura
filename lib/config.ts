import { BusinessConfig } from '@/types/real-estate';

export const BUSINESS_CONFIG: BusinessConfig = {
  companyName: "Signature Aura Pvt. Ltd.",
  tagline: "Premier Luxury Real Estate Advisory & Living",
  logoText: "SIGNATURE AURA DEVELOPERS",
  phoneNumber: "+91 88056 21111",
  phoneRaw: "+918805621111",
  whatsappNumber: "918805621111",
  email: "Aura@gmail.com",
  officeAddress: "Office No. 812, Millennium Towers, Near Nanaware Bridge, Baner-Sus, Pune",
  city: "Pune",
  state: "Maharashtra",
  pincode: "411021",
  reraRegistration: "",
  announcementBarText: "Signature Aura™ Exclusive Residences & Penthouses in Baner, Balewadi, Koregaon Park & Assagao now available.",
  businessHours: "Monday – Saturday: 9:30 AM – 7:30 PM IST (Sunday by VIP appointment)",
  googleMapsUrl: "https://maps.google.com/?q=Millennium+Towers+Baner+Sus+Road+Pune+411021",
  socials: {
    instagram: "https://instagram.com/signatureaurarealty",
    facebook: "https://facebook.com/signatureaurarealty",
    linkedin: "https://linkedin.com/company/signature-aura-pvt-ltd",
    youtube: "https://youtube.com/@signatureaura",
  },
};

export function getWhatsAppLink(customMessage?: string, propertyTitle?: string, propertyUrl?: string): string {
  let message = `Hello Signature Aura, I am interested in exploring properties with your advisory team.`;
  
  if (propertyTitle) {
    message = `Hello Signature Aura, I am interested in "${propertyTitle}". Could you share the detailed brochure, floor plans, and arrange a private site visit?`;
    if (propertyUrl) {
      message += ` (Link: ${propertyUrl})`;
    }
  } else if (customMessage) {
    message = customMessage;
  }
  
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹ ${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  } else if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹ ${lakh.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export function createWhatsAppRedirectUrl(details: {
  title?: string;
  fullName: string;
  phone: string;
  email?: string;
  interest?: string;
  location?: string;
  budget?: string;
  preferredDate?: string;
  timeSlot?: string;
  notes?: string;
  origin?: string;
}): string {
  const cleanNumber = (BUSINESS_CONFIG.whatsappNumber || '918805621111').replace(/[^0-9]/g, '');
  
  const lines: string[] = [
    `*🏛️ ${details.title || 'NEW INQUIRY · SIGNATURE AURA™'}*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Name:* ${details.fullName.trim()}`,
    `📞 *Phone:* ${details.phone.trim()}`,
  ];

  if (details.email && details.email.trim()) {
    lines.push(`✉️ *Email:* ${details.email.trim()}`);
  }
  if (details.interest && details.interest.trim()) {
    lines.push(`🎯 *Interest/Property:* ${details.interest.trim()}`);
  }
  if (details.location && details.location.trim()) {
    lines.push(`📍 *Location:* ${details.location.trim()}`);
  }
  if (details.budget && details.budget.trim()) {
    lines.push(`💰 *Budget:* ${details.budget.trim()}`);
  }
  if (details.preferredDate && details.preferredDate.trim()) {
    lines.push(`📅 *Preferred Date:* ${details.preferredDate.trim()}${details.timeSlot ? ` (${details.timeSlot.trim()})` : ''}`);
  }
  if (details.notes && details.notes.trim()) {
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`📝 *Message / Notes:*`);
    lines.push(`"${details.notes.trim()}"`);
  }
  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`🌐 *Origin:* ${details.origin || 'Website Contact Portal'}`);

  const fullText = lines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullText)}`;
}

export function redirectToWhatsApp(url: string) {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}
