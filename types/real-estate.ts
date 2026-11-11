export type ListingType = 'buy' | 'rent';

export type PropertyCategory = 'residential' | 'commercial' | 'luxury_penthouse' | 'villa' | 'office';

export type PropertyType = 
  | 'Apartment' 
  | 'Penthouse' 
  | 'Villa' 
  | 'Independent Floor' 
  | 'Duplex'
  | 'Grade-A Office' 
  | 'Retail Showroom';

export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Bare Shell';

export type AvailabilityStatus = 'Immediate' | 'Ready to Move' | 'Under Construction' | 'Possession Q4 2026' | 'Possession Q2 2027';

export interface PropertyLocation {
  city: string;
  locality: string;
  address: string;
  landmark?: string;
  pincode?: string;
  lat: number;
  lng: number;
  mapEmbedUrl?: string;
}

export interface NearbyFacility {
  name: string;
  distance: string;
  type: 'airport' | 'metro' | 'school' | 'hospital' | 'mall' | 'club';
}

export interface PropertyAgent {
  name: string;
  title: string;
  phone: string;
  email: string;
  photo: string;
  experienceYears: number;
  rating: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  price: number; // in INR (e.g. 75000000 for 7.5 Cr)
  priceDisplay: string; // e.g. "₹ 7.50 Cr" or "₹ 2.50 L / mo"
  pricePerSqFt: number;
  listingType: ListingType;
  category: PropertyCategory;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  carpetAreaSqFt: number;
  superAreaSqFt: number;
  furnishing: FurnishingStatus;
  floor: number;
  totalFloors: number;
  parking: string;
  propertyAge: string;
  ownership: 'Freehold' | 'Leasehold' | 'Co-operative Society';
  availability: AvailabilityStatus;
  isFeatured: boolean;
  isPublished: boolean;
  isReraApproved: boolean;
  reraNumber?: string;
  location: PropertyLocation;
  amenities: string[];
  images: {
    url: string;
    caption: string;
  }[];
  description: string;
  highlightFeatures: string[];
  nearbyFacilities: NearbyFacility[];
  agent: PropertyAgent;
  createdAt: string;
}

export type LeadSource = 
  | 'property_enquiry'
  | 'contact_form'
  | 'whatsapp'
  | 'callback_modal'
  | 'ai_assistant'
  | 'site_visit_booking';

export type LeadStatus = 
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Site Visit Scheduled'
  | 'Converted'
  | 'Lost';

export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  leadSource: LeadSource;
  propertyId?: string;
  propertyTitle?: string;
  budget?: string;
  preferredLocation?: string;
  message: string;
  leadStatus: LeadStatus;
  preferredVisitDate?: string;
  internalNotes?: string[];
  createdAt: string;
}

export interface SiteVisit {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  propertyId: string;
  propertyTitle: string;
  visitDate: string;
  timeSlot: string;
  numberOfVisitors: number;
  pickupRequired: boolean;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
}

export interface ProjectDevelopment {
  id: string;
  slug: string;
  title: string;
  developer: string;
  tagline: string;
  city: string;
  locality: string;
  status: 'Pre-Launch' | 'Under Construction' | 'Ready to Move';
  completionDate: string;
  priceStartingFrom: string;
  configurations: string;
  reraNumber: string;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  highlights: string[];
  brochureUrl?: string;
  isFeatured: boolean;
}

export interface CityLocation {
  id: string;
  slug: string;
  name: string;
  state: string;
  tagline: string;
  avgPricePerSqFt: string;
  activeListingsCount: number;
  heroImage: string;
  description: string;
  popularLocalities: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  designation: string;
  city: string;
  rating: number;
  quote: string;
  avatarUrl: string;
  propertyPurchased?: string;
}

export interface BusinessConfig {
  companyName: string;
  tagline: string;
  logoText: string;
  phoneNumber: string;
  phoneRaw: string;
  whatsappNumber: string;
  email: string;
  officeAddress: string;
  city: string;
  state: string;
  pincode: string;
  reraRegistration: string;
  announcementBarText: string;
  businessHours: string;
  googleMapsUrl: string;
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
}
