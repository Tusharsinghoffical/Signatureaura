import { SAMPLE_PROPERTIES } from '@/lib/data/sample-data';
import { SAMPLE_PROJECTS, SAMPLE_LOCATIONS, SAMPLE_TESTIMONIALS } from '@/lib/data/sample-data';
import { BUSINESS_CONFIG } from '@/lib/config';
import { Property } from '@/types/real-estate';

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: 'Property' | 'Project' | 'Location' | 'Leadership' | 'Service' | 'Legal & RERA' | 'Company';
  url: string;
  content: string;
  tags: string[];
}

export interface RagRetrievalResult {
  contextText: string;
  sources: Array<{ title: string; url: string; category: string }>;
  matchedProperties: Property[];
  suggestedFollowUps: string[];
}

// 1. Static Real Estate Knowledge Base (Services, Leadership, Legal/RERA, FAQ)
const STATIC_KNOWLEDGE: KnowledgeChunk[] = [
  {
    id: 'corp-overview',
    title: 'Signature Aura Pvt. Ltd. Overview & Head Office',
    category: 'Company',
    url: '/about',
    content: `Signature Aura Pvt. Ltd. (Signature Aura™) is a Maharashtra-focused real estate development and advisory firm. Headquartered at Office No. 812, Millennium Towers, Near Nanaware Bridge, Baner-Sus, Pune 411021, Maharashtra. Phone: ${BUSINESS_CONFIG.phoneNumber}, Email: ${BUSINESS_CONFIG.email}. Operates exclusively across 3 core locations: Pune (Baner-Sus & Sus-Balewadi), Nashik (Gangapur Road), and Panvel, Mumbai (New Panvel & Panvel Expressway Corridor). Office hours: Monday to Saturday, 9:30 AM to 7:30 PM.`,
    tags: ['company', 'headquarters', 'pune', 'nashik', 'panvel', 'mumbai', 'office', 'millennium towers', 'baner', 'sus', 'contact', 'hours']
  },
  {
    id: 'leadership-team',
    title: 'Signature Aura Partners & Leadership Desk',
    category: 'Leadership',
    url: '/about',
    content: `Founding leadership at Signature Aura Pvt. Ltd.:
1. Rakesh Desale Patil (Partner & Director): Strategic Land Acquisitions, Developer Joint Ventures, and Marquee Residential across Pune Prime Corridors (Baner, Sus, Balewadi).
2. Uma Bhandwalkar (Partner & Director): Luxury Residential Advisory & Private Client Desk for high-end residential acquisitions, trophy penthouses, gated community villas.
3. Akshay Bhote (Partner & Director): Commercial Capital & Legal Due Diligence, Grade-A IT park leasing, 30-year forensic title audits, MahaRERA statutory governance.
4. Rama Bhote (Partner & Director): Portfolio Asset Management & Global NRI Concierge, cross-border NRI investment advisory, client concierge protocols.`,
    tags: ['leadership', 'partners', 'rakesh desale patil', 'uma bhandwalkar', 'akshay bhote', 'rama bhote', 'director']
  },
  {
    id: 'services-due-diligence',
    title: '30-Year Forensic Title Due Diligence & RERA Compliance',
    category: 'Service',
    url: '/services',
    content: `Signature Aura enforces a strict 30-year forensic title verification for every asset represented. Services include:
- Verification of chain of title deeds dating back 30+ years with sub-registrar registries.
- MahaRERA / RERA registration audit: verifying promoter disclosures, encumbrance certificates, approved architectural plans, litigation history on RERA portals.
- Title Search Report certified by high-court advocates before client earnest deposit.
- Strict non-disclosure agreements (NDAs) to protect HNI privacy.`,
    tags: ['due diligence', 'title', '30 year', 'rera', 'legal', 'audit', 'maharera', 'lawyer', 'verification']
  },
  {
    id: 'services-nri-desk',
    title: 'Global NRI & Overseas Investor Advisory',
    category: 'Service',
    url: '/services',
    content: `Signature Aura provides turnkey advisory for Non-Resident Indians (NRIs) and overseas family offices:
- Full compliance under RBI and FEMA (Foreign Exchange Management Act) regulations for acquiring residential and commercial properties in India.
- Seamless NRE / NRO account remittance structuring and repatriation of capital / sale proceeds under Form 15CA/CB.
- Remote virtual site walkthroughs via high-definition Matterport 3D and video tours.
- Power of Attorney (PoA) facilitation and consular stamping assistance.`,
    tags: ['nri', 'overseas', 'fema', 'rbi', 'nre', 'nro', 'repatriation', 'tax', 'foreign', 'remote viewing']
  },
  {
    id: 'legal-stamp-duty',
    title: 'Stamp Duty, Registration & Transaction Costs in India',
    category: 'Legal & RERA',
    url: '/services',
    content: `Property transaction costs guide for Maharashtra (Pune, Nashik & Panvel, Mumbai):
- Stamp Duty: Typically 5% to 7% of agreement value depending on municipal limits (PMC Pune, NMC Nashik, Panvel Municipal Corporation) plus 1% Metro Cess where applicable, and ₹30,000 or 1% registration charges.
- Women Buyer Concession: Women homebuyers receive a 1% stamp duty concession on residential purchases in Maharashtra.
- GST: Ready-to-move properties with Occupancy/Completion Certificate (OC/CC) — such as Aura Greens Nashik and Aura Courtyard Panvel — attract 0% GST. Under-construction properties attract 5% GST.`,
    tags: ['stamp duty', 'registration', 'gst', 'tax', 'fees', 'costs', 'charges', 'metro cess', 'maharashtra', 'pune', 'nashik', 'panvel']
  },
  {
    id: 'site-visit-protocol',
    title: 'Private Viewing & Site Visit Protocol',
    category: 'Service',
    url: '/contact',
    content: `Signature Aura coordinates private chauffeured site visits for qualified clients. Visits include:
- Private escort by a Senior Partner or Managing Director.
- Confidential property dossier with approved architectural blueprints, carpet area certificates, and title summary.
- Sunset viewing slots (4:30 PM - 6:00 PM) recommended for penthouses and beach villas.
- Option for chauffeured airport or hotel transfer for outstation clients.
- Site visits can be scheduled directly through the chatbot or website by providing name, phone, email, and preferred date.`,
    tags: ['site visit', 'viewing', 'booking', 'schedule', 'inspection', 'tour', 'chauffeured', 'appointment']
  },
  {
    id: 'land-aggregation-plots',
    title: 'Strategic Land Aggregation, Plots, Acres & Builder Joint Ventures (JV)',
    category: 'Service',
    url: '/services',
    content: `Signature Aura Pvt. Ltd. commands deep authority in strategic land procurement and builder joint ventures across Maharashtra under Founding Partner Rakesh Desale Patil:
- Over 250+ acres successfully aggregated across Pune's western growth corridor: Baner-Sus, Balewadi, Mahalunge, Hinjawadi Phase 1-3, and Mulshi.
- Verified clear-title NA plots, residential plotting layouts, and industrial/warehousing land parcels.
- Developer Joint Ventures (JV / JD): Structuring win-win revenue sharing and area sharing agreements between landowners and Tier-1 institutional builders.
- Full statutory zoning conversion from agricultural to Non-Agricultural (NA), Town Planning (TP) sanctions, and DP road access verification.`,
    tags: ['plot', 'plots', 'land', 'acre', 'acres', 'joint venture', 'jv', 'na land', 'agricultural', 'farmhouse', 'hinjawadi', 'baner-sus']
  },
  {
    id: 'marquee-projects-overview',
    title: 'Marquee Landmark Developments & New Launches',
    category: 'Project',
    url: '/projects',
    content: `Signature Aura represents curated MahaRERA-verified residences across Pune, Nashik, and Panvel (Mumbai), priced between ₹ 45 Lakh and ₹ 85 Lakh:
1. Signature Aura Baner (Baner-Sus, Pune): Modern 2 BHK residences starting ₹ 45 Lakh (MahaRERA: P52100049218) and Signature Aura Crest 3 BHK in Sus-Balewadi at ₹ 68 Lakh.
2. Aura Sky Panvel & Aura Courtyard (Panvel, Mumbai): High-rise 2 BHK residences in New Panvel starting ₹ 58 Lakh – ₹ 85 Lakh near Navi Mumbai International Airport & Atal Setu (MahaRERA: P52000052341).
3. Aura Greens (Gangapur Road, Nashik): Ready-to-move 3 BHK homes at ₹ 52 Lakh with zero GST (MahaRERA: P51600046890).`,
    tags: ['projects', 'developments', 'signature aura baner', 'aura sky', 'panvel', 'nashik', 'gangapur road', 'baner', 'pune', 'mumbai', '2 bhk', '3 bhk']
  }
];

export function retrieveWebsiteKnowledge(userQuery: string): RagRetrievalResult {
  const queryLower = userQuery.toLowerCase().trim();
  const allProperties = SAMPLE_PROPERTIES.filter(p => p.isPublished);
  
  // 1. Dynamic Property Knowledge Chunks
  const propertyChunks: KnowledgeChunk[] = allProperties.map(p => ({
    id: `prop-${p.id}`,
    title: `${p.title} (${p.priceDisplay})`,
    category: 'Property',
    url: `/properties/${p.slug}`,
    content: `Property Title: ${p.title}
Listing Type: For ${p.listingType === 'buy' ? 'Sale' : 'Lease/Rent'}
Property Type: ${p.propertyType} (${p.bedrooms > 0 ? `${p.bedrooms} BHK` : 'Commercial'})
Price: ${p.priceDisplay} (₹${(p.price || 0).toLocaleString('en-IN')})
Price per sq.ft: ₹${p.pricePerSqFt?.toLocaleString('en-IN') || 'On Request'}
Location: ${p.location.locality}, ${p.location.city}. Landmark: ${p.location.landmark || p.location.address}
Carpet Area: ${p.carpetAreaSqFt} sq.ft. (Super Area: ${p.superAreaSqFt || 'N/A'} sq.ft.)
Floor: ${p.floor || 'Ground'} of ${p.totalFloors || 'N/A'} floors
Furnishing: ${p.furnishing} | Parking: ${p.parking}
RERA Registration Number: ${p.reraNumber || 'Verified MahaRERA Compliant'}
Key Highlights: ${p.highlightFeatures?.join(' | ') || 'Luxury Finishes'}
Amenities: ${p.amenities?.slice(0, 6).join(', ') || 'Modern Amenities'}
Overview: ${p.description}
Assigned Advisory Partner: ${p.agent?.name || 'Managing Partner'} (${p.agent?.title || 'Advisory Desk'})`,
    tags: [
      p.title.toLowerCase(),
      p.location.city.toLowerCase(),
      p.location.locality.toLowerCase(),
      p.propertyType.toLowerCase(),
      `${p.bedrooms} bhk`,
      `${p.bedrooms}bhk`,
      p.listingType,
      p.reraNumber?.toLowerCase() || '',
      p.priceDisplay.toLowerCase()
    ]
  }));

  // 2. Project Knowledge Chunks
  const projectChunks: KnowledgeChunk[] = SAMPLE_PROJECTS.map(proj => ({
    id: `proj-${proj.id}`,
    title: `Project: ${proj.title} by ${proj.developer}`,
    category: 'Project',
    url: `/projects/${proj.slug}`,
    content: `Project Name: ${proj.title}
Developer: ${proj.developer}
Location: ${proj.locality}, ${proj.city}
Status: ${proj.status} (Completion: ${proj.completionDate})
Price Starting: ${proj.priceStartingFrom}
Configurations: ${proj.configurations}
RERA Number: ${proj.reraNumber}
Overview: ${proj.overview}
Key Highlights: ${proj.highlights.join(' | ')}`,
    tags: [
      proj.title.toLowerCase(),
      proj.developer.toLowerCase(),
      proj.city.toLowerCase(),
      proj.locality.toLowerCase(),
      proj.reraNumber.toLowerCase()
    ]
  }));

  // 3. Location Guides
  const locationChunks: KnowledgeChunk[] = SAMPLE_LOCATIONS.map(loc => ({
    id: `loc-${loc.id}`,
    title: `Market Dossier: ${loc.name}`,
    category: 'Location',
    url: `/locations/${loc.slug}`,
    content: `Market: ${loc.name} (${loc.state}) - ${loc.tagline}
Average Price: ${loc.avgPricePerSqFt}
Active Listings: ${loc.activeListingsCount} verified properties
Overview: ${loc.description}
Prime Localities: ${loc.popularLocalities.join(', ')}`,
    tags: [loc.name.toLowerCase(), loc.slug.toLowerCase(), 'market', 'trends', 'city']
  }));

  const allChunks: KnowledgeChunk[] = [
    ...STATIC_KNOWLEDGE,
    ...propertyChunks,
    ...projectChunks,
    ...locationChunks
  ];

  // Scoring algorithm for RAG retrieval
  const scoredChunks = allChunks.map(chunk => {
    let score = 0;
    const textToSearch = `${chunk.title} ${chunk.content} ${chunk.tags.join(' ')}`.toLowerCase();

    // Check query tokens
    const tokens = queryLower.split(/\s+/).filter(t => t.length > 2);
    for (const token of tokens) {
      if (chunk.title.toLowerCase().includes(token)) score += 5;
      if (chunk.tags.some(tag => tag.includes(token))) score += 4;
      if (textToSearch.includes(token)) score += 1;
    }

    // Exact city matches (Pune, Nashik, Panvel / Mumbai)
    const cities = ['pune', 'nashik', 'panvel', 'mumbai', 'navi mumbai'];
    for (const city of cities) {
      if (queryLower.includes(city) && textToSearch.includes(city)) {
        score += 8;
      }
    }

    // Specific localities (Baner, Sus, Balewadi, Gangapur Road, New Panvel, Atal Setu)
    const localities = ['baner', 'sus', 'balewadi', 'gangapur', 'new panvel', 'panvel', 'atal setu', 'hinjawadi'];
    for (const loc of localities) {
      if (queryLower.includes(loc) && textToSearch.includes(loc)) {
        score += 10;
      }
    }

    // Specific property types (penthouse, villa, commercial, office, rent, buy)
    if (queryLower.includes('penthouse') && chunk.title.toLowerCase().includes('penthouse')) score += 8;
    if (queryLower.includes('villa') && chunk.title.toLowerCase().includes('villa')) score += 8;
    if ((queryLower.includes('commercial') || queryLower.includes('office')) && chunk.title.toLowerCase().includes('office')) score += 8;
    if (queryLower.includes('rera') && (chunk.title.toLowerCase().includes('rera') || chunk.content.includes('RERA'))) score += 7;
    if ((queryLower.includes('partner') || queryLower.includes('rakesh') || queryLower.includes('uma') || queryLower.includes('akshay') || queryLower.includes('rama')) && chunk.category === 'Leadership') score += 10;
    if ((queryLower.includes('visit') || queryLower.includes('schedule') || queryLower.includes('book')) && (chunk.id === 'site-visit-protocol' || chunk.category === 'Property')) score += 6;

    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  // Take top 4-6 most relevant chunks
  const topChunks = (scoredChunks[0]?.score > 0 
    ? scoredChunks.filter(s => s.score > 0).slice(0, 5)
    : scoredChunks.slice(0, 3)
  ).map(s => s.chunk);

  // Filter matched live properties
  const matchedProps = allProperties.filter(p => {
    const pStr = `${p.title} ${p.location.city} ${p.location.locality} ${p.propertyType} ${p.description} ${p.reraNumber || ''}`.toLowerCase();
    
    // Check direct title or slug match
    if (topChunks.some(c => c.id === `prop-${p.id}`)) return true;

    // Check locality / city match
    if (p.location.locality && queryLower.includes(p.location.locality.toLowerCase())) return true;
    if (queryLower.includes(p.location.city.toLowerCase())) {
      if (queryLower.includes('penthouse') && p.propertyType === 'Penthouse') return true;
      if (queryLower.includes('villa') && p.propertyType === 'Villa') return true;
      if (queryLower.includes('rent') && p.listingType === 'rent') return true;
      if (queryLower.includes('buy') && p.listingType === 'buy') return true;
      return true;
    }
    return false;
  }).slice(0, 3);

  // Fallback to top featured if none matched directly
  const finalMatchedProps = matchedProps.length > 0 ? matchedProps : allProperties.filter(p => p.isFeatured).slice(0, 2);

  const contextText = topChunks.map((c, i) => `[DOCUMENT ${i + 1}: ${c.title} (${c.category}) | Link: ${c.url}]\n${c.content}`).join('\n\n');

  const sources = topChunks.map(c => ({
    title: c.title,
    url: c.url,
    category: c.category
  }));

  // Contextual Follow-up questions
  const suggestedFollowUps: string[] = [];
  if (finalMatchedProps.length > 0) {
    suggestedFollowUps.push(`Schedule private site visit for ${finalMatchedProps[0].title.slice(0, 28)}`);
    suggestedFollowUps.push(`What is the MahaRERA number for ${finalMatchedProps[0].title.slice(0, 25)}?`);
  }
  if (queryLower.includes('pune') || queryLower.includes('baner') || queryLower.includes('sus')) {
    suggestedFollowUps.push('Show all properties in Baner-Sus & Balewadi, Pune');
    suggestedFollowUps.push('Connect with Partner Rakesh Desale Patil');
  } else if (queryLower.includes('panvel') || queryLower.includes('mumbai')) {
    suggestedFollowUps.push('Tell me about Aura Sky Panvel starting ₹ 85 Lakh');
    suggestedFollowUps.push('Show ready-to-move 2 BHK in Panvel, Mumbai');
  } else if (queryLower.includes('nashik') || queryLower.includes('gangapur')) {
    suggestedFollowUps.push('Show Aura Greens 3 BHK on Gangapur Road, Nashik');
  } else {
    suggestedFollowUps.push('Show properties in Pune, Nashik & Panvel');
    suggestedFollowUps.push('How does Signature Aura verify 30-year property titles?');
  }

  return {
    contextText,
    sources,
    matchedProperties: finalMatchedProps,
    suggestedFollowUps: suggestedFollowUps.slice(0, 3)
  };
}
