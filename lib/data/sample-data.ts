import { Property, ProjectDevelopment, CityLocation, Testimonial } from '@/types/real-estate';

export const SAMPLE_PROPERTIES: Property[] = [
  // --- SIGNATURE AURA FEATURED DEVELOPMENTS ---
  {
    id: 'prop-res-9',
    slug: 'signature-aura-baner-2bhk',
    title: 'Signature Aura 2 BHK - Baner, Pune',
    tagline: 'Contemporary 2 BHK homes starting at ₹ 45 Lakh in Pune’s prime tech corridor',
    price: 4500000,
    priceDisplay: '₹ 45 Lakh',
    pricePerSqFt: 6000,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    carpetAreaSqFt: 750,
    superAreaSqFt: 980,
    furnishing: 'Semi-Furnished',
    floor: 4,
    totalFloors: 12,
    parking: '1 Covered Stilt Parking',
    propertyAge: 'Under Construction',
    ownership: 'Freehold',
    availability: 'Possession Q4 2026',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P52100049218',
    location: {
      city: 'Pune',
      locality: 'Baner-Sus',
      address: 'Near Nanaware Bridge, Baner-Sus Road, Pune',
      landmark: 'Near Baner High Street & Balewadi Stadium',
      pincode: '411021',
      lat: 18.5590,
      lng: 73.7868,
      mapEmbedUrl: 'https://maps.google.com/?q=Baner+Pune',
    },
    amenities: [
      'Clubhouse with Indoor Games',
      'Modern Swimming Pool & Kids Splash Zone',
      'High-Speed Automated Elevators',
      '24/7 Security & CCTV Surveillance',
      'Vastu-Compliant East-West Layouts',
      'Landscaped Podium Garden & Jogging Track',
      '100% DG Backup for Common Areas'
    ],
    images: [
      {
        url: '/assets/aistudio/IMG-20261116-WA0063_476cbd13.jpg',
        caption: 'Signature Aura Baner residential tower elevation & grand lobby entrance'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0009_c3d80f50.jpg',
        caption: 'Double-height Italian marble designer lobby with dual swan sculptures'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0059_54f1c8be.jpg',
        caption: 'Tri-elevator marble foyer with high-speed automated lifts'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0017_d533eed5.jpg',
        caption: '22-floor high-speed etched stainless steel elevator cabin with CCTV'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0015_97e16d62.jpg',
        caption: 'Grand society entrance gate, paved boulevard & landscaped podium'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0067_7b815992.jpg',
        caption: 'Active tower superstructure construction with safety netting & tower crane'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0071_4bee11d2.jpg',
        caption: 'On-site concrete batching mixer, formwork & rebar staging'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0018_e888e7c6.jpg',
        caption: 'Covered multi-level podium parking with fire sprinkler network'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0032_76d985c0.jpg',
        caption: 'Designer Italian marble residential corridor & fire-rated access'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0034_7d337360.jpg',
        caption: 'Modular stainless steel pantry fit-out & fluted wall cabinetry'
      },
      {
        url: '/assets/projects/aura-baner-residences.jpg',
        caption: 'Signature Aura Baner architectural elevation render'
      },
      {
        url: '/assets/aistudio/Under-Construction_Residential_Building_03baacab.jpeg',
        caption: 'Multi-storey RCC superstructure & full perimeter scaffolding'
      },
      {
        url: '/assets/aistudio/Exterior_Plastering___Building_Structure_1a3b7057.jpeg',
        caption: 'Twin wing exterior plastering & white architectural primer'
      },
      {
        url: '/assets/aistudio/lJXkgFsTot5Gz6J1N5znEaXgWoJU_Z2qxXqvOJwSG_HIcgsngImunx6rv_URMrxbZxYqSBTzeMzdRPza3rdSKjQaO_PtISE-KuBcZGiQosR-JFCDTvrx_qkldgJIHSf8SZnQXX5vGmA6lBP1yZu8chtzrn6vA4udlW-pYvK7e3B5-McTU1Jfrhlo6De7R0Bt_86163b9b.jpeg',
        caption: 'Tower crane concrete bucket pouring & upper slab casting'
      },
      {
        url: '/assets/aistudio/RCC_Slab_Reinforcement___Electrical_Conduits_e0eb8e67.jpeg',
        caption: 'RCC slab reinforcement steel mesh & electrical conduits'
      },
      {
        url: '/assets/aistudio/RCC_Steel_Reinforcement_Workers_9f02dc24.jpeg',
        caption: 'Mivan aluminum formwork & dense TMT steel reinforcement tying'
      },
      {
        url: '/assets/aistudio/Civil_Engineer___Site_Inspection_aaea9e8b.jpeg',
        caption: 'Senior civil engineer on-site structural & cube quality audit'
      },
      {
        url: '/assets/aistudio/Indian_Workers___Brick_Masonry_7ecf27e6.jpeg',
        caption: 'Red clay brick masonry & internal partition wall construction'
      },
      {
        url: '/assets/aistudio/Scaffolding___Exterior_Plastering_5cc96a00.jpeg',
        caption: 'Exterior double-coat waterproof cement plastering & balcony profiling'
      },
      {
        url: '/assets/aistudio/Electrical_Conduit_Installation_a884ec25.jpeg',
        caption: 'Concealed FRLS electrical conduit chasing & ceiling piping'
      },
      {
        url: '/assets/aistudio/Plumbing___MEP_Installation_dc3058f5.jpeg',
        caption: 'Internal wall grooving & concealed switchbox alignment'
      },
      {
        url: '/assets/projects/baner-site-progress.jpg',
        caption: 'Ongoing active construction and RCC superstructure'
      },
      {
        url: '/assets/projects/aura-amenity-pool.jpg',
        caption: 'Clubhouse temperature-controlled swimming pool'
      }
    ],
    description: 'Signature Aura Baner presents carefully engineered 2 BHK homes starting at ₹ 45 Lakh (project range ₹ 40 Lakh – ₹ 75 Lakh). Situated in the high-demand Baner-Sus corridor of Pune, just moments from Nanaware Bridge and Hinjawadi IT Park. Designed with earthquake-resistant RCC frame structure, teak wood accent aesthetics, cross-ventilation balconies, and complete MahaRERA certifications.',
    highlightFeatures: [
      'Unbeatable ₹ 45 Lakh starting price in high-appreciation Baner',
      'Active on-site construction with scheduled Q4 2026 possession',
      'Quick 15-minute commute to Hinjawadi Rajiv Gandhi Infotech Park',
      'Zero brokerage for direct advisory buyers with approved home loans'
    ],
    nearbyFacilities: [
      { name: 'Baner High Street', distance: '1.2 km', type: 'mall' },
      { name: 'Nanaware Bridge', distance: '300 m', type: 'metro' },
      { name: 'Jupiter Hospital Pune', distance: '3.5 km', type: 'hospital' },
      { name: 'The Orchid School', distance: '2.1 km', type: 'school' }
    ],
    agent: {
      name: 'Rakesh Desale Patil',
      title: 'Partner & Director - Pune Corridors',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rakesh-desale-patil.jpg',
      experienceYears: 18,
      rating: 4.96
    },
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prop-res-10',
    slug: 'aura-sky-mumbai-residences',
    title: 'Aura Sky Luxury High-Rise - Mumbai',
    tagline: 'High-rise tower residences with sunset ocean views starting at ₹ 85 Lakh',
    price: 8500000,
    priceDisplay: '₹ 85 Lakh',
    pricePerSqFt: 13076,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    carpetAreaSqFt: 650,
    superAreaSqFt: 880,
    furnishing: 'Semi-Furnished',
    floor: 18,
    totalFloors: 32,
    parking: '1 Covered Podium Parking',
    propertyAge: 'Under Construction',
    ownership: 'Freehold',
    availability: 'Possession Q2 2027',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P51800052341',
    location: {
      city: 'Mumbai',
      locality: 'Western Suburbs / Malad Link Corridor',
      address: 'Aura Sky Promenade, New Link Road, Western Suburbs, Mumbai',
      landmark: 'Near Metro Line 2A & Inorbit Mall',
      pincode: '400064',
      lat: 19.1860,
      lng: 72.8360,
      mapEmbedUrl: 'https://maps.google.com/?q=Mumbai+Western+Suburbs',
    },
    amenities: [
      'Double Height Air-Conditioned Designer Lobby',
      'Rooftop Sky Lounge & Observatory Deck',
      'Indoor Heated Pool with Skylight Canopy',
      'Multi-Tier Robotic Podium Parking',
      'State-of-the-art Gymnasium & Steam Spa',
      'High-Speed OTIS Destination Elevators',
      '24/7 Security with Biometric Access'
    ],
    images: [
      {
        url: '/assets/aistudio/IMG-20261116-WA0023_90d2ad71.jpg',
        caption: 'Aura Sky Mumbai high-rise architectural balcony & facade elevation'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0033_f94e5427.jpg',
        caption: 'Grand Italian marble arrival lobby with dual sculptures & lift bay'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0022_b716e5bd.jpg',
        caption: 'Completed high-rise tower wing with Refuge Area & deck balconies'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0053_3f8ed7ed.jpg',
        caption: 'Backlit floral bird mosaic lobby gallery & tri-lift vestibule'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0026_7829d2b7.jpg',
        caption: 'High-speed mirror-etched stainless steel destination elevator'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0074_6c73ac2e.jpg',
        caption: 'Bougainvillea landscaped podium terrace & covered vehicular bay'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0014_78fd81ee.jpg',
        caption: 'Tower Wing-B active RCC casting with safety nets & tower crane'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0049_0a8adde4.jpg',
        caption: 'Paved internal driveway & full high-rise elevation panorama'
      },
      {
        url: '/assets/projects/aura-sky-mumbai.jpg',
        caption: 'Aura Sky 32-storey twin luxury condominium towers'
      },
      {
        url: '/assets/aistudio/lJXkgFsTot5Gz6J1N5znEaXgWoJU_Z2qxXqvOJwSG_HIcgsngImunx6rv_URMrxbZxYqSBTzeMzdRPza3rdSKjQaO_PtISE-KuBcZGiQosR-JFCDTvrx_qkldgJIHSf8SZnQXX5vGmA6lBP1yZu8chtzrn6vA4udlW-pYvK7e3B5-McTU1Jfrhlo6De7R0Bt_86163b9b.jpeg',
        caption: 'Tower crane concrete hoisting & high-rise slab pouring'
      },
      {
        url: '/assets/aistudio/RCC_Slab_Reinforcement___Electrical_Conduits_e0eb8e67.jpeg',
        caption: 'High-rise deck rebar mesh & concealed conduit laying'
      },
      {
        url: '/assets/aistudio/RCC_Steel_Reinforcement_Workers_9f02dc24.jpeg',
        caption: 'Monolithic Mivan aluminum formwork & core steel tying'
      },
      {
        url: '/assets/aistudio/Under-Construction_Residential_Building_03baacab.jpeg',
        caption: 'Multi-storey superstructure & full perimeter scaffolding'
      },
      {
        url: '/assets/aistudio/Exterior_Plastering___Building_Structure_1a3b7057.jpeg',
        caption: 'Twin wing exterior plastering & white architectural primer'
      },
      {
        url: '/assets/aistudio/Civil_Engineer___Site_Inspection_aaea9e8b.jpeg',
        caption: 'Senior structural engineer QA/QC column & cube audit'
      },
      {
        url: '/assets/aistudio/Indian_Workers___Brick_Masonry_7ecf27e6.jpeg',
        caption: 'Internal partition brick masonry & mortar laying'
      },
      {
        url: '/assets/aistudio/Scaffolding___Exterior_Plastering_5cc96a00.jpeg',
        caption: 'Exterior weatherproof cement plastering & balcony profiling'
      },
      {
        url: '/assets/aistudio/Electrical_Conduit_Installation_a884ec25.jpeg',
        caption: 'Concealed electrical conduit chasing & ceiling piping'
      },
      {
        url: '/assets/aistudio/Plumbing___MEP_Installation_dc3058f5.jpeg',
        caption: 'Internal wall grooving & concealed switchbox alignment'
      },
      {
        url: '/assets/projects/aura-amenity-pool.jpg',
        caption: 'Temperature-controlled indoor leisure pool'
      },
      {
        url: '/assets/projects/baner-site-progress.jpg',
        caption: 'Tower construction and engineering progress'
      }
    ],
    description: 'Aura Sky redefines accessible luxury high-rise living in Mumbai starting at ₹ 85 Lakh. Soaring 32 storeys with geometric architectural profiles, sunset sea-breeze balconies, and 25+ lifestyle amenities. Centrally positioned in Mumbai’s prime Western Suburbs with direct walkability to Metro Line 2A.',
    highlightFeatures: [
      'Unprecedented Mumbai high-rise pricing starting at ₹ 85 Lakh',
      'Grand panoramic views across the city skyline and coastal horizon',
      'Flexible construction-linked payment plan (CLP) with leading banks',
      'Full MahaRERA compliance with scheduled handover in Q2 2027'
    ],
    nearbyFacilities: [
      { name: 'Metro Line 2A Station', distance: '400 m', type: 'metro' },
      { name: 'Inorbit Mall Malad', distance: '1.8 km', type: 'mall' },
      { name: 'Kokilaben Dhirubhai Ambani Hospital', distance: '5.2 km', type: 'hospital' },
      { name: 'Western Express Highway (WEH)', distance: '2.5 km', type: 'airport' }
    ],
    agent: {
      name: 'Uma Bhandwalkar',
      title: 'Partner & Director - Mumbai Residential Desk',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/uma-bhandwalkar.jpg',
      experienceYears: 16,
      rating: 4.94
    },
    createdAt: '2026-03-02T10:00:00Z'
  },

  // --- OTHER LUXURY RESIDENCES & ESTATES ---
  {
    id: 'prop-res-1',
    slug: 'the-worli-horizon-penthouse',
    title: 'The Worli Horizon Triplex Penthouse',
    tagline: 'Panoramic Arabian Sea views with a private infinity plunge pool',
    price: 9000000,
    priceDisplay: '₹ 90 Lakh',
    pricePerSqFt: 8500,
    listingType: 'buy',
    category: 'luxury_penthouse',
    propertyType: 'Penthouse',
    bedrooms: 5,
    bathrooms: 6,
    balconies: 3,
    carpetAreaSqFt: 5500,
    superAreaSqFt: 6800,
    furnishing: 'Furnished',
    floor: 42,
    totalFloors: 45,
    parking: '4 Dedicated Basement Stalls',
    propertyAge: 'Ready to Move / New',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P51900018442',
    location: {
      city: 'Mumbai',
      locality: 'Worli Sea Face',
      address: 'Skyline Reserve, Worli Sea Face Promenade, Mumbai',
      landmark: 'Near Bandra-Worli Sea Link Toll',
      pincode: '400030',
      lat: 19.0144,
      lng: 72.8156,
      mapEmbedUrl: 'https://maps.google.com/?q=Worli+Sea+Face+Mumbai',
    },
    amenities: [
      'Private Heated Plunge Pool',
      'Italian Statuario Marble Flooring',
      'Bang & Olufsen Integrated Audio',
      '24/7 White-Glove Concierge',
      'Private High-Speed Elevator with Biometric Access',
      'State-of-the-Art Private Gymnasium',
      'Helipad Access',
      'Temperature Controlled Wine Cellar',
      'EV Charging Bays'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Grand living pavilion overlooking the Arabian Sea'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Master suite with private sea-facing terrace'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Custom marble kitchen with Miele appliances'
      },
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Private sunset deck and infinity plunge pool'
      }
    ],
    description: 'An architectural magnum opus situated atop Worli Sea Face. This bespoke triplex residence offers 270-degree unobstructed vistas of the Arabian Sea and the iconic Sea Link. Designed with soaring 14-foot ceiling heights, imported Italian Statuario marble, a private climate-controlled wine cellar, and dedicated staff quarters with independent service elevator.',
    highlightFeatures: [
      'Unobstructed sunset sea views over the Arabian coastline',
      'Triple-height living atrium with automated acoustic glass curtain',
      'Private 800 sq.ft. sky terrace with cantilevered heated pool',
      'MahaRERA certified luxury development'
    ],
    nearbyFacilities: [
      { name: 'Four Seasons Hotel Mumbai', distance: '1.2 km', type: 'club' },
      { name: 'Bandra-Worli Sea Link Entrance', distance: '800 m', type: 'metro' },
      { name: 'Podar International School', distance: '3.1 km', type: 'school' },
      { name: 'Hinduja Healthcare Surgical', distance: '4.5 km', type: 'hospital' }
    ],
    agent: {
      name: 'Rakesh Desale Patil',
      title: 'Managing Partner - Luxury Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rakesh-desale-patil.jpg',
      experienceYears: 16,
      rating: 4.95
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'prop-res-2',
    slug: 'the-camellias-magnolia-residence',
    title: 'The Camellias Signature 4 BHK',
    tagline: 'Ultra-exclusive golf course frontage on DLF Golf Course Road',
    price: 8800000,
    priceDisplay: '₹ 88 Lakh',
    pricePerSqFt: 7800,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 2,
    carpetAreaSqFt: 5800,
    superAreaSqFt: 7400,
    furnishing: 'Semi-Furnished',
    floor: 21,
    totalFloors: 38,
    parking: '3 Reserved Underground Stalls',
    propertyAge: 'Ready to Move',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'HRERA-GGM-74-2018',
    location: {
      city: 'Delhi NCR',
      locality: 'DLF Phase 5, Golf Course Road, Gurgaon',
      address: 'Tower C, The Camellias, Golf Drive, DLF 5, Gurgaon',
      landmark: 'Adjacent to DLF Golf and Country Club',
      pincode: '122002',
      lat: 28.4595,
      lng: 77.0266,
      mapEmbedUrl: 'https://maps.google.com/?q=DLF+The+Camellias+Gurgaon',
    },
    amenities: [
      'Direct Arnold Palmer Golf Course Fairway Views',
      '1.3 Million Sq.Ft. Resort Clubhouse',
      'Private Chef on Demand & Michelin-standard Dining',
      'Olympic-sized Indoor Heated Pool',
      'Multi-tier 7-level Security Architecture',
      'Private Cigar Lounge & Bowling Alley',
      'Advanced Air Filtration System (MERV 14)'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Sprawling living room overlooking the championship golf greens'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Chef kitchen with bespoke Poggenpohl cabinetry'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Expansive wrap-around balcony facing the fairway'
      }
    ],
    description: 'A benchmark in luxury condominium living in North India. This expansive single-floor residence overlooks the championship DLF Golf Course. Featuring double-height entrance vestibule, column-free internal layout, German triple-glazed soundproof glass, and access to the world-renowned DLF Camellias Clubhouse.',
    highlightFeatures: [
      'Sweeping greens of DLF Golf Course',
      'Direct golf cart access to club greens',
      'Fully centralized air conditioning with PM2.5 purification',
      'Dedicated staff room and service entryway'
    ],
    nearbyFacilities: [
      { name: 'DLF Golf & Country Club', distance: '100 m', type: 'club' },
      { name: 'Sector 53-54 Rapid Metro', distance: '500 m', type: 'metro' },
      { name: 'The Shri Ram School', distance: '2.5 km', type: 'school' },
      { name: 'Medanta - The Medicity', distance: '7.8 km', type: 'hospital' }
    ],
    agent: {
      name: 'Akshay Bhote',
      title: 'Senior Director - Delhi NCR Portfolio',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/akshay-bhote.jpg',
      experienceYears: 14,
      rating: 4.92
    },
    createdAt: '2026-01-20T11:30:00Z'
  },
  {
    id: 'prop-res-3',
    slug: 'villa-sol-terra-assagao',
    title: 'Villa Sol Terra - Heritage Portuguese Estate',
    tagline: 'Private sanctuary nestled among ancient banyan trees in Assagao',
    price: 7800000,
    priceDisplay: '₹ 78 Lakh',
    pricePerSqFt: 7400,
    listingType: 'buy',
    category: 'villa',
    propertyType: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    balconies: 4,
    carpetAreaSqFt: 4800,
    superAreaSqFt: 6000,
    furnishing: 'Furnished',
    floor: 1,
    totalFloors: 2,
    parking: '4 Covered Car Porch',
    propertyAge: 'Ready to Move / New',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'PRGO08211470',
    location: {
      city: 'Goa',
      locality: 'Badem, Assagao, North Goa',
      address: 'Plot 48, Badem Hills, Assagao, Goa',
      landmark: 'Near Gunpowder & Jamun Restaurant',
      pincode: '403507',
      lat: 15.5898,
      lng: 73.7749,
      mapEmbedUrl: 'https://maps.google.com/?q=Assagao+Goa',
    },
    amenities: [
      'Lap Swimming Pool with Bali Natural Stone',
      'Courtyard with 100-year-old Frangipani Tree',
      'Handcrafted Teakwood Rafters & Terracotta Tiling',
      '100% DG Power Backup & Rainwater Harvesting',
      'Smart Home Lighting & Security by Lutron',
      'Outdoor Dining Gazebo & Wood-fired Pizza Oven',
      'Butler & Caretaker Staff Residence'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Portuguese colonial facade with courtyard pool'
      },
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Verandah with hand-carved pillars and lush tropical garden'
      },
      {
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'High-vaulted timber ceiling living hall'
      }
    ],
    description: 'An oasis of peace in North Goa’s most coveted enclave. Designed by leading architectural conservators, Villa Sol Terra combines Portuguese colonial romance with contemporary engineering. Featuring private natural stone lap pool, lush manicured tropical landscape, and custom distressed teak furnishings.',
    highlightFeatures: [
      '1,200 sq. meters freehold plot title with clean lineage',
      'Custom designer furnishings and European fixtures included',
      '8 minutes drive to Vagator Beach & W Goa',
      'High rental yield potential for luxury holiday leasing'
    ],
    nearbyFacilities: [
      { name: 'Vagator Beach', distance: '3.5 km', type: 'mall' },
      { name: 'Mopa International Airport (GOX)', distance: '28 km', type: 'airport' },
      { name: 'Gunpowder Assagao', distance: '1.1 km', type: 'club' },
      { name: 'Manipal Hospital Dona Paula', distance: '24 km', type: 'hospital' }
    ],
    agent: {
      name: 'Uma Bhandwalkar',
      title: 'Principal Associate - Goa Luxury Homes',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/uma-bhandwalkar.jpg',
      experienceYears: 11,
      rating: 4.97
    },
    createdAt: '2026-01-25T14:00:00Z'
  },
  {
    id: 'prop-res-4',
    slug: 'the-bkc-crown-residences',
    title: 'The BKC Crown Sky Mansion',
    tagline: 'Exclusive duplex overlooking the Bandra-Kurla skyline',
    price: 8200000,
    priceDisplay: '₹ 82 Lakh',
    pricePerSqFt: 8400,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Duplex',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 2,
    carpetAreaSqFt: 3600,
    superAreaSqFt: 4300,
    furnishing: 'Semi-Furnished',
    floor: 28,
    totalFloors: 32,
    parking: '3 Covered Stalls',
    propertyAge: 'Ready to Move / New',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: false,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P51800021940',
    location: {
      city: 'Mumbai',
      locality: 'Bandra East (Near BKC)',
      address: 'Aura Heights, G Block Link Road, Bandra East, Mumbai',
      landmark: 'Next to Trident Hotel BKC',
      pincode: '400051',
      lat: 19.0657,
      lng: 72.8687,
      mapEmbedUrl: 'https://maps.google.com/?q=BKC+Mumbai',
    },
    amenities: [
      'Infinity Sky Pool on 30th Floor',
      'Private Screening Theatre (Dolby Atmos)',
      'Sub-Zero and Wolf Appliance Package',
      'Automated Valet Parking System',
      'Direct Covered Walkway to BKC Financial Hub',
      'Concierge Managed by Quintessentially'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Duplex living area with double height floor-to-ceiling glass'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Dining room connecting to glass wine cellar'
      }
    ],
    description: 'Designed for captains of industry and corporate leaders. Situated within 3 minutes of top multinational headquarters in BKC. Features double-height glass framing the city lights, private elevator foyer, and bespoke automated lighting control.',
    highlightFeatures: [
      'Prime walking distance to Jio World Centre and Bharat Diamond Bourse',
      'Unmatched connectivity to airport via Western Express Highway',
      'Sky gym and private business boardroom within tower'
    ],
    nearbyFacilities: [
      { name: 'Jio World Convention Centre', distance: '600 m', type: 'mall' },
      { name: 'Bandra Terminus', distance: '2.1 km', type: 'metro' },
      { name: 'Dhirubhai Ambani International School', distance: '1.1 km', type: 'school' },
      { name: 'Asian Heart Institute', distance: '1.4 km', type: 'hospital' }
    ],
    agent: {
      name: 'Rakesh Desale Patil',
      title: 'Managing Partner - Luxury Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rakesh-desale-patil.jpg',
      experienceYears: 16,
      rating: 4.95
    },
    createdAt: '2026-01-28T09:00:00Z'
  },
  {
    id: 'prop-res-5',
    slug: 'vittal-mallya-heritage-penthouse-bengaluru',
    title: 'The UB Sky Garden Residence',
    tagline: 'Lavish tree-canopy & Cubbon Park views in Central Bengaluru',
    price: 7200000,
    priceDisplay: '₹ 72 Lakh',
    pricePerSqFt: 7100,
    listingType: 'buy',
    category: 'luxury_penthouse',
    propertyType: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    carpetAreaSqFt: 3800,
    superAreaSqFt: 4500,
    furnishing: 'Furnished',
    floor: 18,
    totalFloors: 20,
    parking: '3 Dedicated Basements',
    propertyAge: 'Ready to Move',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'PRM/KA/RERA/1251/310/PR/180507',
    location: {
      city: 'Bengaluru',
      locality: 'Vittal Mallya Road / Lavelle Road',
      address: 'The Regent, Vittal Mallya Road, Bengaluru',
      landmark: 'Behind UB City Tower',
      pincode: '560001',
      lat: 12.9716,
      lng: 77.5946,
      mapEmbedUrl: 'https://maps.google.com/?q=Vittal+Mallya+Road+Bangalore',
    },
    amenities: [
      'Unbroken views of Cubbon Park’s green lung',
      'Private Landscaped Terrace with Water Feature',
      'Daikin VRV Central Air Conditioning',
      'Private Wine Storage & Cigar Room',
      '24/7 Monitored Perimeter Security',
      'Clubhouse with Squash Court & Heated Pool'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Panoramic balcony overlooking Cubbon Park greens'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Contemporary minimalist master suite'
      }
    ],
    description: 'A collector’s residential opportunity on Vittal Mallya Road. Overlooking 300 acres of Cubbon Park greenery with the ultra-luxury dining of UB City at your doorstep. Crafted with French oak parquet floors, floor-to-ceiling glass, and master suites with dual dressing rooms.',
    highlightFeatures: [
      'Rare Central Business District (CBD) freehold property',
      'Direct elevator opening into your private reception lobby',
      'Minutes from Bangalore Club and Bowring Institute'
    ],
    nearbyFacilities: [
      { name: 'UB City Luxury Mall', distance: '200 m', type: 'mall' },
      { name: 'MG Road Metro Station', distance: '1.2 km', type: 'metro' },
      { name: 'Bishop Cotton Boys School', distance: '1.5 km', type: 'school' },
      { name: 'Mallya Hospital', distance: '400 m', type: 'hospital' }
    ],
    agent: {
      name: 'Rama Bhote',
      title: 'Partner - Southern India Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rama-bhote.jpg',
      experienceYears: 13,
      rating: 4.89
    },
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'prop-res-6',
    slug: 'the-jubilee-hills-manor-hyderabad',
    title: 'The Jubilee Hills Sovereign Villa',
    tagline: 'Private architectural citadel in Road No. 36 Jubilee Hills',
    price: 8600000,
    priceDisplay: '₹ 86 Lakh',
    pricePerSqFt: 7500,
    listingType: 'buy',
    category: 'villa',
    propertyType: 'Villa',
    bedrooms: 6,
    bathrooms: 7,
    balconies: 4,
    carpetAreaSqFt: 6800,
    superAreaSqFt: 8000,
    furnishing: 'Furnished',
    floor: 1,
    totalFloors: 3,
    parking: '5 Dedicated Car Porch',
    propertyAge: 'Ready to Move / New',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: false,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P02400001928',
    location: {
      city: 'Hyderabad',
      locality: 'Jubilee Hills',
      address: 'Plot 102, Road No. 36, Jubilee Hills, Hyderabad',
      landmark: 'Near Jubilee Hills International Centre',
      pincode: '500033',
      lat: 17.4319,
      lng: 78.4073,
      mapEmbedUrl: 'https://maps.google.com/?q=Jubilee+Hills+Hyderabad',
    },
    amenities: [
      'Olympic Length Swimming Pool with Cascading Waterfall',
      'Private Home Cinema with 15 Leather Recliners',
      'Italian Boffi Kitchen with Wine Display',
      'Private Elevator by Schindler Serving All 3 Floors',
      'Lush Japanese Zen Garden & Reflection Pool',
      'Full Home Automation by Savant',
      'Dedicated Security Gatehouse & Guard Quarters'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Grand illuminated exterior with fountain courtyard'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Triple height marble reception foyer'
      }
    ],
    description: 'An independent architectural landmark in Hyderabad’s most prestigious residential address. Engineered with steel, glass, and imported Greek Thassos marble. Built on a generous 1,000 sq. yard plot with manicured landscapes and private sports recreation facilities.',
    highlightFeatures: [
      '1,000 sq. yard clear title plot in Jubilee Hills',
      'High-security biometric perimeter and smart surveillance',
      'Quick drive to HITEC City financial district'
    ],
    nearbyFacilities: [
      { name: 'Jubilee Hills Club', distance: '800 m', type: 'club' },
      { name: 'HITEC City Cyber Towers', distance: '4.8 km', type: 'metro' },
      { name: 'Apollo Hospitals Jubilee Hills', distance: '2.2 km', type: 'hospital' },
      { name: 'Oakridge International School', distance: '5.5 km', type: 'school' }
    ],
    agent: {
      name: 'Rama Bhote',
      title: 'Partner - Southern India Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rama-bhote.jpg',
      experienceYears: 13,
      rating: 4.89
    },
    createdAt: '2026-02-05T12:00:00Z'
  },
  {
    id: 'prop-res-7',
    slug: 'koregaon-park-botanica-pune',
    title: 'The Botanica Sky Villa Koregaon Park',
    tagline: 'Quiet tree-lined luxury in Pune’s most elite historical quarter',
    price: 6200000,
    priceDisplay: '₹ 62 Lakh',
    pricePerSqFt: 6400,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    carpetAreaSqFt: 3200,
    superAreaSqFt: 3800,
    furnishing: 'Semi-Furnished',
    floor: 9,
    totalFloors: 14,
    parking: '2 Covered Slots',
    propertyAge: '1-3 Years',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: false,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P52100017830',
    location: {
      city: 'Pune',
      locality: 'Lane 1, Koregaon Park, Pune',
      address: 'Botanica Residences, Lane 1, Koregaon Park, Pune',
      landmark: 'Near Osho Garden',
      pincode: '411001',
      lat: 18.5362,
      lng: 73.8940,
      mapEmbedUrl: 'https://maps.google.com/?q=Koregaon+Park+Pune',
    },
    amenities: [
      'Wrap-around Terrace with Green Planters',
      'Bespoke Teak Wood Finishings',
      'Rooftop Infinity Swimming Pool',
      'Exclusive Private Club & Cafe for 28 Families Only',
      '24/7 Security & Video Door Intercom'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Boutique living space opening onto landscaped deck'
      }
    ],
    description: 'An intimate boutique community of only 28 sky residences in green Koregaon Park. Quiet, leafy ambiance paired with modern minimalist interior spaces, walk-in closets, and expansive balconies overlooking the Mula-Mutha river canopy.',
    highlightFeatures: [
      'Low-density single tower development',
      'Walking distance to artisanal cafes and German Bakery',
      'Proximity to Pune International Airport and Kalyani Nagar'
    ],
    nearbyFacilities: [
      { name: 'Osho International Resort', distance: '400 m', type: 'club' },
      { name: 'Pune Railway Station', distance: '3.2 km', type: 'metro' },
      { name: 'Jehangir Hospital', distance: '3.0 km', type: 'hospital' }
    ],
    agent: {
      name: 'Rakesh Desale Patil',
      title: 'Managing Partner - Luxury Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rakesh-desale-patil.jpg',
      experienceYears: 16,
      rating: 4.95
    },
    createdAt: '2026-02-08T15:00:00Z'
  },
  {
    id: 'prop-res-8',
    slug: 'the-defence-colony-mansion-floor',
    title: 'Heritage Parkland Floor - Defence Colony',
    tagline: 'Stately park-facing builder floor in South Delhi',
    price: 6800000,
    priceDisplay: '₹ 68 Lakh',
    pricePerSqFt: 6900,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Independent Floor',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 2,
    carpetAreaSqFt: 2800,
    superAreaSqFt: 3200,
    furnishing: 'Semi-Furnished',
    floor: 2,
    totalFloors: 4,
    parking: '2 Dedicated Stilt Slots',
    propertyAge: 'Ready to Move / New',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    location: {
      city: 'Delhi NCR',
      locality: 'Defence Colony, New Delhi',
      address: 'Block C, Defence Colony, New Delhi',
      landmark: 'Facing Central Community Park',
      pincode: '110024',
      lat: 28.5729,
      lng: 77.2307,
      mapEmbedUrl: 'https://maps.google.com/?q=Defence+Colony+New+Delhi',
    },
    amenities: [
      'Private High-Speed Kone Stilt Elevator',
      'Italian Botticino Marble Throughout',
      'VRV Air Conditioning by Daikin',
      'Private Servant Quarters with Attached Bath',
      'Gated Colony with 24/7 Access Verification'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Spacious salon-style drawing room overlooking park greens'
      }
    ],
    description: 'An exclusive second-floor residence in New Delhi’s prestigious Defence Colony. Designed with high ceilings, large double-glazed German windows overlooking serene tree canopies, modern modular kitchen, and private stilt parking with independent lift access.',
    highlightFeatures: [
      'Clear freehold title with complete sanction plan',
      'Wide road frontage with abundant guest parking',
      'Walking distance to Defence Colony Flyover Market'
    ],
    nearbyFacilities: [
      { name: 'Defence Colony Main Market', distance: '300 m', type: 'mall' },
      { name: 'Lajpat Nagar Metro Interchange', distance: '900 m', type: 'metro' },
      { name: 'Max Super Speciality Hospital Saket', distance: '6.5 km', type: 'hospital' }
    ],
    agent: {
      name: 'Akshay Bhote',
      title: 'Senior Director - Delhi NCR Portfolio',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/akshay-bhote.jpg',
      experienceYears: 14,
      rating: 4.92
    },
    createdAt: '2026-02-10T16:00:00Z'
  },

  // --- 4 RENTAL PROPERTIES ---
  {
    id: 'prop-rent-1',
    slug: 'carter-road-sea-residence-bandra',
    title: 'The Carter Road Waterfront Residence',
    tagline: 'Furnished luxury sea-facing haven in Bandra West',
    price: 85000,
    priceDisplay: '₹ 85,000 / mo',
    pricePerSqFt: 40,
    listingType: 'rent',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    carpetAreaSqFt: 2100,
    superAreaSqFt: 2500,
    furnishing: 'Furnished',
    floor: 8,
    totalFloors: 12,
    parking: '2 Covered Slots',
    propertyAge: '1-3 Years',
    ownership: 'Co-operative Society',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    location: {
      city: 'Mumbai',
      locality: 'Carter Road, Bandra West',
      address: 'Ocean Crest, Carter Road Promenade, Bandra West, Mumbai',
      landmark: 'Opposite Joggers Park',
      pincode: '400050',
      lat: 19.0664,
      lng: 72.8258,
      mapEmbedUrl: 'https://maps.google.com/?q=Carter+Road+Bandra+West',
    },
    amenities: [
      'Unobstructed Sunset Views over Carter Road Promenade',
      'Curated Scandinavian Designer Furniture',
      'Bose Surround Sound System',
      'High-Speed 1 Gbps Fiber & Smart Workstation',
      'Pet-Friendly Society with Private Dog Park',
      'Housekeeping on Request'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Boutique coastal living area facing the Arabian Sea'
      },
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Designer open kitchen with breakfast island'
      }
    ],
    description: 'A rare luxury lease on Bandra’s celebrated Carter Road promenade. Completely turn-key furnished with curated international designer pieces. Includes a large sea-facing balcony, master suite with walk-in wardrobe, and quick access to Bandra’s Michelin-guide dining options.',
    highlightFeatures: [
      'Turn-key ready with premium linen and kitchen appliances',
      'Front row view of the Arabian Sea and Joggers Park',
      'Available for senior corporate executives and expat families'
    ],
    nearbyFacilities: [
      { name: 'Joggers Park Bandra', distance: '150 m', type: 'club' },
      { name: 'Bandra Railway Station', distance: '2.5 km', type: 'metro' },
      { name: 'Lilavati Hospital', distance: '2.8 km', type: 'hospital' }
    ],
    agent: {
      name: 'Rakesh Desale Patil',
      title: 'Managing Partner - Luxury Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rakesh-desale-patil.jpg',
      experienceYears: 16,
      rating: 4.95
    },
    createdAt: '2026-02-12T10:00:00Z'
  },
  {
    id: 'prop-rent-2',
    slug: 'bkc-corporate-sky-suite',
    title: 'The BKC Executive Sky Suite',
    tagline: 'High-floor serviced luxury lease next to Jio World Centre',
    price: 70000,
    priceDisplay: '₹ 70,000 / mo',
    pricePerSqFt: 39,
    listingType: 'rent',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 1,
    carpetAreaSqFt: 1800,
    superAreaSqFt: 2200,
    furnishing: 'Furnished',
    floor: 22,
    totalFloors: 26,
    parking: '2 Dedicated Basements',
    propertyAge: 'Ready to Move / New',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: false,
    isPublished: true,
    isReraApproved: true,
    location: {
      city: 'Mumbai',
      locality: 'BKC, Bandra East',
      address: 'Signature Towers, Bandra Kurla Complex, Mumbai',
      landmark: 'Next to Sofitel BKC',
      pincode: '400051',
      lat: 19.0660,
      lng: 72.8680,
      mapEmbedUrl: 'https://maps.google.com/?q=BKC+Mumbai',
    },
    amenities: [
      'Business Lounge & Video Conferencing Pods in Tower',
      'Rooftop 25m Heated Lap Pool',
      '24/7 Concierge and Dry Cleaning Valet',
      'High-Speed Wi-Fi & Smart Home Automation'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Sleek contemporary interior designed for corporate executives'
      }
    ],
    description: 'Designed specifically for multinational leadership and expatriates stationed in BKC. Features acoustic insulation, designer lighting, concierge parcel delivery, and walking distance to financial sector headquarters.',
    highlightFeatures: [
      'Ideal for corporate executive relocation',
      'Short walk to Bank of America, Apple, and Google offices in BKC',
      'Flexible 12 to 36 month lease terms'
    ],
    nearbyFacilities: [
      { name: 'Jio World Drive', distance: '400 m', type: 'mall' },
      { name: 'Chhatrapati Shivaji Maharaj International Airport', distance: '6.2 km', type: 'airport' }
    ],
    agent: {
      name: 'Rakesh Desale Patil',
      title: 'Managing Partner - Luxury Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rakesh-desale-patil.jpg',
      experienceYears: 16,
      rating: 4.95
    },
    createdAt: '2026-02-14T11:00:00Z'
  },
  {
    id: 'prop-rent-3',
    slug: 'candolim-coastal-villa-lease',
    title: 'Candolim Sanctuary Private Villa Lease',
    tagline: 'Private pool holiday villa with garden in North Goa',
    price: 55000,
    priceDisplay: '₹ 55,000 / mo',
    pricePerSqFt: 32,
    listingType: 'rent',
    category: 'villa',
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 2,
    carpetAreaSqFt: 3500,
    superAreaSqFt: 4200,
    furnishing: 'Furnished',
    floor: 1,
    totalFloors: 2,
    parking: '3 Covered Spaces',
    propertyAge: '1-3 Years',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: false,
    isPublished: true,
    isReraApproved: true,
    location: {
      city: 'Goa',
      locality: 'Candolim, North Goa',
      address: 'Villa 6, Quinta Palms, Candolim Road, Goa',
      landmark: 'Near Taj Holiday Village',
      pincode: '403515',
      lat: 15.5186,
      lng: 73.7681,
      mapEmbedUrl: 'https://maps.google.com/?q=Candolim+Goa',
    },
    amenities: [
      'Private Swimming Pool with Sun Loungers',
      'Daily Housekeeping Staff Included',
      'High-Speed Starlink Internet',
      'Solar Heated Water and 100% Inverter Backup',
      '5 Minutes Walk to Candolim Beach'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Poolside cabana and tropical garden'
      }
    ],
    description: 'An idyllic long-term villa lease in Candolim. Features 4 ensuite bedrooms, private open-air swimming pool, high wooden ceilings, and on-site caretaker staff. Perfect for founders, remote professionals, or seasonal luxury residencies.',
    highlightFeatures: [
      'Fully serviced with dedicated caretaker and gardening staff',
      'Private swimming pool and gated security',
      'Long-term corporate or individual lease accepted'
    ],
    nearbyFacilities: [
      { name: 'Candolim Beach', distance: '400 m', type: 'mall' },
      { name: 'Taj Holiday Village', distance: '1.2 km', type: 'club' }
    ],
    agent: {
      name: 'Uma Bhandwalkar',
      title: 'Principal Associate - Goa Luxury Homes',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/uma-bhandwalkar.jpg',
      experienceYears: 11,
      rating: 4.97
    },
    createdAt: '2026-02-15T12:00:00Z'
  },
  {
    id: 'prop-rent-4',
    slug: 'indiranagar-boulevard-penthouse',
    title: 'Indiranagar 100ft Rd Designer Penthouse',
    tagline: 'Terrace garden penthouse in Bengaluru’s most vibrant district',
    price: 45000,
    priceDisplay: '₹ 45,000 / mo',
    pricePerSqFt: 30,
    listingType: 'rent',
    category: 'residential',
    propertyType: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    carpetAreaSqFt: 2500,
    superAreaSqFt: 3000,
    furnishing: 'Furnished',
    floor: 5,
    totalFloors: 5,
    parking: '2 Covered Slots',
    propertyAge: '1-3 Years',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: false,
    isPublished: true,
    isReraApproved: true,
    location: {
      city: 'Bengaluru',
      locality: 'Indiranagar Stage 1, Bengaluru',
      address: '12th Main, HAL 2nd Stage, Indiranagar, Bengaluru',
      landmark: 'Near Toit Brewpub',
      pincode: '560038',
      lat: 12.9784,
      lng: 77.6408,
      mapEmbedUrl: 'https://maps.google.com/?q=Indiranagar+Bangalore',
    },
    amenities: [
      'Private 800 sq.ft. Rooftop Sky Garden with Pergola',
      'Italian Modular Kitchen with Dishwasher',
      'Smart Lock and Video Security',
      'Solar Water Heating & Full Power Backup',
      'Quiet Residential Lane off 12th Main'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Sky deck garden overlooking lush green Bengaluru canopies'
      }
    ],
    description: 'A bespoke penthouse retreat positioned in heart of Indiranagar. Features soaring high ceilings, expansive private terrace garden with barbecue grill, and seamless access to prime culinary hotspots and tech offices.',
    highlightFeatures: [
      'Top floor exclusive unit with private roof rights',
      'Walking distance to Indiranagar Metro Station and 100 Feet Road',
      'High-speed fiber optic cabling and quiet study pod'
    ],
    nearbyFacilities: [
      { name: 'Indiranagar Metro Station', distance: '600 m', type: 'metro' },
      { name: 'Toit Brewpub', distance: '400 m', type: 'club' },
      { name: 'Manipal Hospital Old Airport Rd', distance: '2.4 km', type: 'hospital' }
    ],
    agent: {
      name: 'Rama Bhote',
      title: 'Partner - Southern India Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rama-bhote.jpg',
      experienceYears: 13,
      rating: 4.89
    },
    createdAt: '2026-02-18T14:00:00Z'
  },

  // --- 4 COMMERCIAL PROPERTIES ---
  {
    id: 'prop-comm-1',
    slug: 'the-bkc-fintech-corporate-floor',
    title: 'Grade-A Fintech Tower Corporate Floor - BKC',
    tagline: 'Full floor corporate headquarters with LEED Platinum Certification',
    price: 8900000,
    priceDisplay: '₹ 89 Lakh',
    pricePerSqFt: 8200,
    listingType: 'buy',
    category: 'commercial',
    propertyType: 'Grade-A Office',
    bedrooms: 0,
    bathrooms: 8,
    balconies: 0,
    carpetAreaSqFt: 10500,
    superAreaSqFt: 12000,
    furnishing: 'Bare Shell',
    floor: 14,
    totalFloors: 24,
    parking: '12 Reserved Basement Stalls',
    propertyAge: 'Ready to Move / New',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P51800008819',
    location: {
      city: 'Mumbai',
      locality: 'G-Block, BKC, Mumbai',
      address: 'Platina Capital, G-Block, Bandra Kurla Complex, Mumbai',
      landmark: 'Opposite US Consulate',
      pincode: '400051',
      lat: 19.0688,
      lng: 72.8699,
      mapEmbedUrl: 'https://maps.google.com/?q=BKC+G+Block+Mumbai',
    },
    amenities: [
      'LEED Platinum Green Building Certified',
      'Column-free Efficient Floor Plate of 12,000 sq.ft.',
      '8 High-Speed Destination Controlled Elevators',
      '100% N+1 Redundant DG Power Backup',
      'Multi-tier Integrated Building Management System (IBMS)',
      'Cafeteria, Auditorium & Gymnasium within Complex'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Grand double-height corporate glass lobby'
      },
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Panoramic column-free floor plate'
      }
    ],
    description: 'An institutional Grade-A office floor in India’s premier financial hub, Bandra Kurla Complex. Designed to meet the stringent architectural requirements of multinational investment banks, sovereign funds, and tech conglomerates.',
    highlightFeatures: [
      'Column-free floor plate allowing customizable seating layouts for 140+ workstations',
      'Direct frontage on BKC main spine road',
      'Pre-certified IGBC Green Building standards'
    ],
    nearbyFacilities: [
      { name: 'Jio World Convention Centre', distance: '500 m', type: 'mall' },
      { name: 'Western Express Highway', distance: '1.8 km', type: 'metro' },
      { name: 'Mumbai Airport T2', distance: '7.5 km', type: 'airport' }
    ],
    agent: {
      name: 'Rakesh Desale Patil',
      title: 'Managing Partner - Luxury Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rakesh-desale-patil.jpg',
      experienceYears: 16,
      rating: 4.95
    },
    createdAt: '2026-02-20T09:00:00Z'
  },
  {
    id: 'prop-comm-2',
    slug: 'cyber-city-executive-office-gurgaon',
    title: 'DLF Cyber City Executive Commercial Suite',
    tagline: 'Premium Grade-A office suite in Gurgaon’s top tech hub',
    price: 4000000,
    priceDisplay: '₹ 40 Lakh',
    pricePerSqFt: 5800,
    listingType: 'buy',
    category: 'commercial',
    propertyType: 'Grade-A Office',
    bedrooms: 0,
    bathrooms: 4,
    balconies: 0,
    carpetAreaSqFt: 5200,
    superAreaSqFt: 6000,
    furnishing: 'Furnished',
    floor: 9,
    totalFloors: 18,
    parking: '6 Reserved Stalls',
    propertyAge: 'Ready to Move',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: false,
    isPublished: true,
    isReraApproved: true,
    location: {
      city: 'Delhi NCR',
      locality: 'DLF Cyber City, Sector 24, Gurgaon',
      address: 'Tower 10, DLF Cyber City, Gurgaon',
      landmark: 'Next to Cyber Hub Dining Complex',
      pincode: '122002',
      lat: 28.4907,
      lng: 77.0898,
      mapEmbedUrl: 'https://maps.google.com/?q=DLF+Cyber+City+Gurgaon',
    },
    amenities: [
      'Turn-Key Furnished with 70 Workstations & 3 Executive Cabins',
      '2 Boardrooms with 4K Video Conferencing',
      'Direct Skywalk Connection to Rapid Metro Station',
      'Central Chilled Water Air-Conditioning System',
      'Comprehensive Access Control and Fire Suppression'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Bespoke corporate reception and executive conference room'
      }
    ],
    description: 'Fully fitted, turn-key corporate commercial suite situated in DLF Cyber City. Includes high-spec Herman Miller ergonomic seating, executive boardroom, cafeteria, and direct skybridge connectivity to DLF Cyber Hub.',
    highlightFeatures: [
      'Turn-key ready to occupy without capital expenditure',
      'Immediate access to world-class dining at Cyber Hub',
      'High rental yield with corporate tenant demand'
    ],
    nearbyFacilities: [
      { name: 'DLF Cyber Hub', distance: '100 m', type: 'mall' },
      { name: 'Cyber City Rapid Metro', distance: '150 m', type: 'metro' },
      { name: 'Indira Gandhi International Airport (DEL)', distance: '11 km', type: 'airport' }
    ],
    agent: {
      name: 'Akshay Bhote',
      title: 'Senior Director - Delhi NCR Portfolio',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/akshay-bhote.jpg',
      experienceYears: 14,
      rating: 4.92
    },
    createdAt: '2026-02-22T11:00:00Z'
  },
  {
    id: 'prop-comm-3',
    slug: 'outer-ring-road-tech-park-floor-bengaluru',
    title: 'ORR Tech Corridor Commercial Campus Floor',
    tagline: 'High-density tech development floor on Marathahalli-Bellandur belt',
    price: 5400000,
    priceDisplay: '₹ 54 Lakh',
    pricePerSqFt: 6200,
    listingType: 'buy',
    category: 'commercial',
    propertyType: 'Grade-A Office',
    bedrooms: 0,
    bathrooms: 10,
    balconies: 0,
    carpetAreaSqFt: 13000,
    superAreaSqFt: 15000,
    furnishing: 'Bare Shell',
    floor: 6,
    totalFloors: 15,
    parking: '15 Dedicated Basements',
    propertyAge: 'Ready to Move / New',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: false,
    isPublished: true,
    isReraApproved: true,
    location: {
      city: 'Bengaluru',
      locality: 'Outer Ring Road (ORR), Bellandur, Bengaluru',
      address: 'Prism Tech Park, Outer Ring Road, Bengaluru',
      landmark: 'Near Ecospace & Cessna Business Park',
      pincode: '560103',
      lat: 12.9260,
      lng: 77.6762,
      mapEmbedUrl: 'https://maps.google.com/?q=Bellandur+Outer+Ring+Road+Bangalore',
    },
    amenities: [
      'Dual Grid Power Substation for 100% Continuous Uptime',
      'High-Speed Elevators with Smart Destination Dispatch',
      'Food Court Seating 1,200 Persons in Campus',
      'Upcoming Yellow/Blue Line Metro Connectivity at Doorstep',
      'STP, Rainwater Harvesting & Solar Rooftop Arrays'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Glass facade of the eco-friendly tech park campus'
      }
    ],
    description: 'An institutional asset situated along Bengaluru’s primary technology corridor on Outer Ring Road. High-performance double glazed facade, superior air quality filtration, and large floor plate geometry designed for AI, SaaS, and Global Capability Centers (GCCs).',
    highlightFeatures: [
      'Prime frontage on Outer Ring Road',
      'Ideal for Fortune 500 GCC setup or institutional REIT portfolio',
      'Proven tenant retention track record in campus'
    ],
    nearbyFacilities: [
      { name: 'Bellandur Central Metro (Upcoming)', distance: '300 m', type: 'metro' },
      { name: 'Kemp Fort Mall', distance: '4.5 km', type: 'mall' },
      { name: 'Sakra World Hospital', distance: '1.2 km', type: 'hospital' }
    ],
    agent: {
      name: 'Rama Bhote',
      title: 'Partner - Southern India Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rama-bhote.jpg',
      experienceYears: 13,
      rating: 4.89
    },
    createdAt: '2026-02-24T12:00:00Z'
  },
  {
    id: 'prop-comm-4',
    slug: 'connaught-place-flagship-retail-showroom',
    title: 'Inner Circle Flagship Retail Showroom - Connaught Place',
    tagline: 'Heritage high-street retail address in New Delhi’s CBD',
    price: 4800000,
    priceDisplay: '₹ 48 Lakh',
    pricePerSqFt: 6500,
    listingType: 'buy',
    category: 'commercial',
    propertyType: 'Retail Showroom',
    bedrooms: 0,
    bathrooms: 2,
    balconies: 0,
    carpetAreaSqFt: 3600,
    superAreaSqFt: 4000,
    furnishing: 'Semi-Furnished',
    floor: 1,
    totalFloors: 2,
    parking: 'Colonnade Valet Parking Access',
    propertyAge: 'Heritage Renovated',
    ownership: 'Freehold',
    availability: 'Immediate',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    location: {
      city: 'Delhi NCR',
      locality: 'Connaught Place (CP), New Delhi',
      address: 'Block B, Inner Circle, Connaught Place, New Delhi',
      landmark: 'Next to Rajiv Chowk Metro Gate 3',
      pincode: '110001',
      lat: 28.6315,
      lng: 77.2167,
      mapEmbedUrl: 'https://maps.google.com/?q=Connaught+Place+New+Delhi',
    },
    amenities: [
      'Massive 40-foot Frontage on Inner Circle Colonnade',
      'Ground + Mezzanine Retail Display Format',
      'Unrivaled Footfall of 200,000+ Daily Visitors',
      '3-Phase Commercial Power & Dedicated Generator Backup',
      'Clear Height of 16 Feet on Ground Floor'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&auto=format&fit=crop&q=75',
        caption: 'Heritage colonnade retail storefront with high visibility'
      }
    ],
    description: 'A once-in-a-generation high-street retail asset in the historic Inner Circle of Connaught Place. With commanding visibility, lofty 16-foot ceiling heights, and unparalleled pedestrian foot traffic, this space is suited for flagship luxury watchmakers, haute couture fashion, or premier lifestyle brands.',
    highlightFeatures: [
      'Unmatched retail visibility in India’s most iconic colonial commercial hub',
      'Directly adjacent to Rajiv Chowk Metro Interchange',
      'Exceptional capital appreciation and trophy asset prestige'
    ],
    nearbyFacilities: [
      { name: 'Rajiv Chowk Metro Station', distance: '50 m', type: 'metro' },
      { name: 'The Imperial Hotel New Delhi', distance: '1.1 km', type: 'club' },
      { name: 'New Delhi Railway Station', distance: '1.4 km', type: 'metro' }
    ],
    agent: {
      name: 'Akshay Bhote',
      title: 'Senior Director - Delhi NCR Portfolio',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/akshay-bhote.jpg',
      experienceYears: 14,
      rating: 4.92
    },
    createdAt: '2026-02-25T15:00:00Z'
  }
];

// --- 2 FLAGSHIP PROJECTS ---
export const SAMPLE_PROJECTS: ProjectDevelopment[] = [
  {
    id: 'proj-4',
    slug: 'signature-aura-baner-residences',
    title: 'Signature Aura Baner',
    developer: 'Signature Aura Developers Pvt. Ltd.',
    tagline: 'Modern 2 BHK residences in Pune’s prime IT & lifestyle corridor',
    city: 'Pune',
    locality: 'Baner, Pune (Near Nanaware Bridge & High Street)',
    status: 'Under Construction',
    completionDate: 'Q4 2026',
    priceStartingFrom: '₹ 40 Lakh – ₹ 75 Lakh',
    configurations: '2 BHK Smart & Premium Luxury Homes (680 – 850 sq.ft.)',
    reraNumber: 'P52100049218',
    heroImage: '/assets/projects/aura-baner-residences.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261116-WA0063_476cbd13.jpg',
      '/assets/aistudio/IMG-20261116-WA0009_c3d80f50.jpg',
      '/assets/aistudio/IMG-20261116-WA0023_90d2ad71.jpg',
      '/assets/aistudio/IMG-20261116-WA0067_7b815992.jpg',
      '/assets/aistudio/IMG-20261116-WA0059_54f1c8be.jpg',
      '/assets/aistudio/IMG-20261116-WA0017_d533eed5.jpg',
      '/assets/aistudio/IMG-20261116-WA0015_97e16d62.jpg',
      '/assets/aistudio/IMG-20261116-WA0018_e888e7c6.jpg',
      '/assets/aistudio/IMG-20261116-WA0071_4bee11d2.jpg',
      '/assets/aistudio/IMG-20261116-WA0032_76d985c0.jpg',
      '/assets/aistudio/IMG-20261116-WA0024_3796d864.jpg',
      '/assets/aistudio/Under-Construction_Residential_Building_03baacab.jpeg',
      '/assets/aistudio/Exterior_Plastering___Building_Structure_1a3b7057.jpeg',
      '/assets/aistudio/lJXkgFsTot5Gz6J1N5znEaXgWoJU_Z2qxXqvOJwSG_HIcgsngImunx6rv_URMrxbZxYqSBTzeMzdRPza3rdSKjQaO_PtISE-KuBcZGiQosR-JFCDTvrx_qkldgJIHSf8SZnQXX5vGmA6lBP1yZu8chtzrn6vA4udlW-pYvK7e3B5-McTU1Jfrhlo6De7R0Bt_86163b9b.jpeg',
      '/assets/aistudio/RCC_Slab_Reinforcement___Electrical_Conduits_e0eb8e67.jpeg',
      '/assets/aistudio/RCC_Steel_Reinforcement_Workers_9f02dc24.jpeg',
      '/assets/aistudio/Civil_Engineer___Site_Inspection_aaea9e8b.jpeg',
      '/assets/aistudio/Indian_Workers___Brick_Masonry_7ecf27e6.jpeg',
      '/assets/aistudio/Scaffolding___Exterior_Plastering_5cc96a00.jpeg',
      '/assets/aistudio/Electrical_Conduit_Installation_a884ec25.jpeg',
      '/assets/aistudio/Plumbing___MEP_Installation_dc3058f5.jpeg',
      '/assets/projects/baner-site-progress.jpg',
      '/assets/projects/aura-baner-residences.jpg',
      '/assets/projects/aura-amenity-pool.jpg'
    ],
    constructionVideos: [
      {
        id: 'baner-vid-1',
        title: 'Live Construction Site Walkthrough — RCC Superstructure, Crane & Podium',
        stage: 'On-Site Civil Walkthrough',
        date: 'November 2026 (Live)',
        duration: '0:07',
        description: 'Actual site drive-through showing active multi-storey RCC superstructure, green safety netting, debris chute, concrete steel formwork, and tower crane operations.',
        videoUrl: '/assets/aistudio/VID-20261116-WA0016_b0519664.mp4',
        posterUrl: '/assets/aistudio/IMG-20261116-WA0073_77065eb5.jpg',
        badge: 'Site Walkthrough'
      },
      {
        id: 'baner-vid-2',
        title: '25-Year Warranty Marine Plywood Modular Joinery Inspection',
        stage: 'Interior Carpentry QA',
        date: 'November 2026',
        duration: '0:20',
        description: 'Workshop inspection of 25-year guaranteed waterproof Gurjan/Mezla marine plywood cabinetry framework crafted for apartment modular kitchens and wardrobes.',
        videoUrl: '/assets/aistudio/VID-20261116-WA0038_4fd55713.mp4',
        posterUrl: '/assets/aistudio/IMG-20261116-WA0046_c41e43c0.jpg',
        badge: 'Carpentry QA'
      },
      {
        id: 'baner-vid-3',
        title: 'CenturyPVC Bathroom Doors & Laminated Entrance Door Dispatch',
        stage: 'Door & Hardware Supply',
        date: 'November 2026',
        duration: '0:18',
        description: 'Evening site dispatch of finished marble-vein CenturyPVC waterproof doors, textured veneer main doors, and laminated wooden shutter frames.',
        videoUrl: '/assets/aistudio/VID-20261116-WA0048_c06a48ce.mp4',
        posterUrl: '/assets/aistudio/IMG-20261116-WA0034_7d337360.jpg',
        badge: 'Material Dispatch'
      }
    ],
    constructionGallery: [
      {
        id: 'baner-work-new-1',
        title: 'Grand Double-Height Italian Marble Entrance Lobby & Sculptures',
        category: 'interiors',
        stage: 'Completed Entrance Lobby',
        date: 'November 2026',
        description: 'Finished grand reception lobby showcasing geometric Italian stone floor inlay, backlit cove lighting, twin white architectural swan sculptures, and triple lift bank.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0009_c3d80f50.jpg',
        badge: 'Grand Lobby'
      },
      {
        id: 'baner-work-new-2',
        title: 'Backlit Handcrafted Bird Mosaic Murals & Marble Reception',
        category: 'interiors',
        stage: 'Lobby Art & Cladding',
        date: 'November 2026',
        description: 'Custom backlit stained-mosaic floral bird artwork framed in Statuario marble cladding with warm architectural LED trim.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0053_3f8ed7ed.jpg',
        badge: 'Lobby Interiors'
      },
      {
        id: 'baner-work-new-3',
        title: 'Statuario Marble Wall Cladding & Rose-Gold Metal Inlays',
        category: 'interiors',
        stage: 'Wall Finishing',
        date: 'November 2026',
        description: 'Full-height book-matched white Italian marble wall paneling accented with brushed rose-gold stainless vertical strips.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0055_09e59185.jpg',
        badge: 'Marble Finish'
      },
      {
        id: 'baner-work-new-4',
        title: 'Designer Foyer Corner & Sculptural Arrival Pedestal',
        category: 'interiors',
        stage: 'Foyer Styling',
        date: 'November 2026',
        description: 'Sculpted centerpiece atop grey honed marble pedestal illuminated by recessed perimeter warm ceiling coves.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0030_436da376.jpg',
        badge: 'Designer Foyer'
      },
      {
        id: 'baner-work-new-5',
        title: 'Mosaic Garden Wall Art & Lighting Detail',
        category: 'interiors',
        stage: 'Lobby Art Installation',
        date: 'November 2026',
        description: 'Close-up of bespoke mosaic tile installation with integrated warm edge backlighting along main elevator lobby.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0024_3796d864.jpg',
        badge: 'Art Installation'
      },
      {
        id: 'baner-work-new-6',
        title: 'Tri-Elevator Vestibule (Lift-01, Lift-02, Lift-03)',
        category: 'interiors',
        stage: 'Lift Bank Ready',
        date: 'November 2026',
        description: 'Three high-speed passenger & service elevators clad in dark Nero Marquina marble surrounds with digital floor indicators.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0059_54f1c8be.jpg',
        badge: 'Elevator Bank'
      },
      {
        id: 'baner-work-new-7',
        title: 'Jindal Stainless High-Speed Elevator Operational Check (Lift-01)',
        category: 'interiors',
        stage: 'MEP Lift Commissioning',
        date: 'November 2026',
        description: 'Commissioned stainless steel elevator portal with illuminated touch call buttons and overhead CCTV dome surveillance.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0057_375ed6ec.jpg',
        badge: 'Lift-01 Active'
      },
      {
        id: 'baner-work-new-8',
        title: '22-Floor Touch Panel & 15-Passenger / 1020 kg Cabin Interior',
        category: 'interiors',
        stage: 'Cabin Fit-Out',
        date: 'November 2026',
        description: 'Etched geometric mirror stainless steel cabin interior rated for 15 passengers (1020 kg) with black granite flooring.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0017_d533eed5.jpg',
        badge: '1020 kg Lift'
      },
      {
        id: 'baner-work-new-9',
        title: 'Floor Corridor Dual-Tone Italian Flooring & Flush Doorway',
        category: 'interiors',
        stage: 'Floor Passage Works',
        date: 'November 2026',
        description: 'Beige and charcoal marble floor border inlay along residential wing passage with flush fire-exit door and recessed sprinklers.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0032_76d985c0.jpg',
        badge: 'Corridor Finish'
      },
      {
        id: 'baner-work-new-10',
        title: 'Concealed Utility Shaft Paneling & Curved Wood Column',
        category: 'interiors',
        stage: 'Corridor Joinery',
        date: 'November 2026',
        description: 'Flush louvered electrical meter enclosure integrated neatly into marble passage cladding beside wood-laminate column.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0056_76338b0e.jpg',
        badge: 'Utility Finish'
      },
      {
        id: 'baner-work-new-11',
        title: 'Wing-A Lower Facade, Covered Stilt Entrance & Lobby Approach',
        category: 'elevation',
        stage: 'Near-Possession Elevation',
        date: 'November 2026',
        description: 'Contemporary white and slate-charcoal architectural facade framing the main residential lobby and sheltered parking bays.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0063_476cbd13.jpg',
        badge: 'Tower Elevation'
      },
      {
        id: 'baner-work-new-12',
        title: 'Full Multi-Storey Tower Facade & Recessed Balconies',
        category: 'elevation',
        stage: 'Exterior Texture & Railings',
        date: 'November 2026',
        description: 'Completed exterior waterproof textured paint, powder-coated balcony safety railings, and external piped gas line routing.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0023_90d2ad71.jpg',
        badge: 'Exterior Ready'
      },
      {
        id: 'baner-work-new-13',
        title: 'Vertical Refuge Area & Architectural Balcony Grid',
        category: 'elevation',
        stage: 'Fire Safety & Facade',
        date: 'November 2026',
        description: 'Designated fire-compliant Refuge Area floors integrated cleanly within the vertical balcony shaft design.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0022_b716e5bd.jpg',
        badge: 'Refuge Compliant'
      },
      {
        id: 'baner-work-new-14',
        title: 'Corner Balcony Geometry & Ground Stilt Drive-In',
        category: 'elevation',
        stage: 'Wing Elevation',
        date: 'November 2026',
        description: 'High-contrast white band and charcoal facade framing with AC ledge provisions and aluminum sliding windows.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0064_571c2df7.jpg',
        badge: 'Facade View'
      },
      {
        id: 'baner-work-new-15',
        title: 'Society Entrance Gate, Security Cabin & Bougainvillea Podium',
        category: 'amenities',
        stage: 'Arrival & Landscaping',
        date: 'November 2026',
        description: 'Grand gated security entrance leading down landscaped paved ramps past vibrant bougainvillea podium planters.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0015_97e16d62.jpg',
        badge: 'Arrival Gate'
      },
      {
        id: 'baner-work-new-16',
        title: 'Bougainvillea Landscaped Podium Terrace & Covered Bay',
        category: 'amenities',
        stage: 'Landscape Works',
        date: 'November 2026',
        description: 'Elevated podium garden edge flourishing above shaded driveway and stilt car parking.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0074_6c73ac2e.jpg',
        badge: 'Landscaped Deck'
      },
      {
        id: 'baner-work-new-17',
        title: 'Covered Podium Stilt Parking & Overhead Fire Sprinklers',
        category: 'amenities',
        stage: 'Parking & Fire MEP',
        date: 'November 2026',
        description: 'Spacious covered stilt parking deck fitted with red fire-suppression sprinkler lines, numbered bays, and smooth ramps.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0018_e888e7c6.jpg',
        badge: 'Covered Parking'
      },
      {
        id: 'baner-work-new-18',
        title: 'Interlocking Stone Internal Driveway & Wing-B Tower Crane',
        category: 'construction',
        stage: 'External Paving & Wing-B',
        date: 'November 2026',
        description: 'Completed zig-zag interlocking paver driveway connecting finished Wing-A to ongoing Phase-2 high-rise tower construction.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0049_0a8adde4.jpg',
        badge: 'Site Driveway'
      },
      {
        id: 'baner-work-new-19',
        title: 'Phase-2 Tower RCC Casting, Green Safety Nets & Podium',
        category: 'construction',
        stage: 'Phase-2 Superstructure',
        date: 'November 2026 (Live)',
        description: 'Multi-level podium slab completed with active vertical RCC tower structure wrapped in green construction safety netting.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0067_7b815992.jpg',
        badge: 'Active Tower'
      },
      {
        id: 'baner-work-new-20',
        title: 'RCC Balcony Slabs, Blue Debris Chute & Steel Props',
        category: 'construction',
        stage: 'Structural Finishing',
        date: 'November 2026',
        description: 'Close-up structural view of cured RCC beam-slab joints, vertical debris disposal chute, and tubular steel scaffolding props.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0073_77065eb5.jpg',
        badge: 'RCC Structure'
      },
      {
        id: 'baner-work-new-21',
        title: 'On-Site Concrete Mixer, Column Shuttering & Rebar Zone',
        category: 'construction',
        stage: 'Concreting Operations',
        date: 'November 2026',
        description: 'Active ground-floor concrete batching mixer, steel column formwork plates, and stacked TMT reinforcement bars.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0071_4bee11d2.jpg',
        badge: 'Concreting Zone'
      },
      {
        id: 'baner-work-new-22',
        title: 'Covered Steel Pedestrian Safety Walkway & Site Corridor',
        category: 'construction',
        stage: 'Site Safety Shielding',
        date: 'November 2026',
        description: 'Overhead galvanized steel safety shed protecting pedestrian passage alongside ongoing commercial podium masonry.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0068_5f2d70f2.jpg',
        badge: 'Safety Corridor'
      },
      {
        id: 'baner-work-new-23',
        title: 'Stainless Steel Modular Kitchen Pull-Out & Wood Joinery',
        category: 'interiors',
        stage: 'Interior Fit-Out QA',
        date: 'November 2026',
        description: 'Precision SS-304 modular pantry pull-out unit and vertical fluted wood paneling ready for apartment interior installation.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0034_7d337360.jpg',
        badge: 'Modular Fit-Out'
      },
      {
        id: 'baner-work-1',
        title: 'Multi-Storey Superstructure & Full Perimeter Scaffolding',
        category: 'construction',
        stage: 'Superstructure Framing',
        date: 'March 2026 (Live)',
        description: 'Full multi-storey RCC residential superstructure in Baner with steel perimeter scaffolding and active floor-by-floor civil works.',
        imageUrl: '/assets/aistudio/Under-Construction_Residential_Building_03baacab.jpeg',
        badge: 'On-Site Photo'
      },
      {
        id: 'baner-work-2',
        title: 'Twin Wing Facade Plastering & Primer Coat Progress',
        category: 'elevation',
        stage: 'Exterior Facade Works',
        date: 'March 2026 (Live)',
        description: 'Side-by-side on-site progress showing external scaffolding plastering on the left wing and finished white architectural primer coat on the right wing.',
        imageUrl: '/assets/aistudio/Exterior_Plastering___Building_Structure_1a3b7057.jpeg',
        badge: 'Facade Progress'
      },
      {
        id: 'baner-work-3',
        title: 'Tower Crane Concrete Pouring & Top-Slab Formwork',
        category: 'construction',
        stage: 'Top-Slab Concreting',
        date: 'March 2026',
        description: 'Heavy tower crane hoisting concrete bucket for upper-level slab casting and shuttering operations with certified site crew.',
        imageUrl: '/assets/aistudio/lJXkgFsTot5Gz6J1N5znEaXgWoJU_Z2qxXqvOJwSG_HIcgsngImunx6rv_URMrxbZxYqSBTzeMzdRPza3rdSKjQaO_PtISE-KuBcZGiQosR-JFCDTvrx_qkldgJIHSf8SZnQXX5vGmA6lBP1yZu8chtzrn6vA4udlW-pYvK7e3B5-McTU1Jfrhlo6De7R0Bt_86163b9b.jpeg',
        badge: 'Tower Crane'
      },
      {
        id: 'baner-work-4',
        title: 'RCC Slab Steel Mesh & Concealed Conduit Network',
        category: 'construction',
        stage: 'Slab Reinforcement & MEP',
        date: 'March 2026',
        description: 'High-density Fe-550D TMT steel reinforcement grid laid with heavy-duty PVC electrical conduits prior to slab concrete pour.',
        imageUrl: '/assets/aistudio/RCC_Slab_Reinforcement___Electrical_Conduits_e0eb8e67.jpeg',
        badge: 'RCC & Conduits'
      },
      {
        id: 'baner-work-5',
        title: 'Monolithic Formwork & Core Rebar Steel Tying',
        category: 'construction',
        stage: 'Structural Core Framing',
        date: 'February 2026',
        description: 'Precision aluminum Mivan shuttering and vertical shear-wall rebar tying executed by certified steel fixers for Zone III seismic compliance.',
        imageUrl: '/assets/aistudio/RCC_Steel_Reinforcement_Workers_9f02dc24.jpeg',
        badge: 'Structural Core'
      },
      {
        id: 'baner-work-6',
        title: 'Senior Structural Engineer QA/QC Column & Cube Audit',
        category: 'civil_inspection',
        stage: 'Engineering QA/QC Audit',
        date: 'March 2026',
        description: 'Chief civil engineer inspecting RCC column curing, concrete cube test samples, and MahaRERA structural blueprint tolerances on site.',
        imageUrl: '/assets/aistudio/Civil_Engineer___Site_Inspection_aaea9e8b.jpeg',
        badge: 'Audit Verified'
      },
      {
        id: 'baner-work-7',
        title: 'Internal Partition Brick Masonry & Mortar Laying',
        category: 'masonry',
        stage: 'Brickwork & Partitions',
        date: 'March 2026',
        description: 'Skilled masonry team laying kiln-fired red brick partition walls with rich cement mortar and strict plumb-line alignment.',
        imageUrl: '/assets/aistudio/Indian_Workers___Brick_Masonry_7ecf27e6.jpeg',
        badge: 'Masonry Work'
      },
      {
        id: 'baner-work-8',
        title: 'Exterior Weatherproof Cement Plastering & Parapet Finishing',
        category: 'masonry',
        stage: 'External Plastering',
        date: 'March 2026',
        description: 'Double-coat waterproof external sand-faced cement plastering and balcony parapet profiling on upper residential levels.',
        imageUrl: '/assets/aistudio/Scaffolding___Exterior_Plastering_5cc96a00.jpeg',
        badge: 'Plastering Live'
      },
      {
        id: 'baner-work-9',
        title: 'Concealed Electrical Conduit Chasing & Ceiling Piping',
        category: 'civil_inspection',
        stage: 'Internal Electrical MEP',
        date: 'March 2026',
        description: 'Fire-retardant FRLS electrical conduits, ceiling junction routing, and modular switchboard boxes installed across 2 BHK apartment walls.',
        imageUrl: '/assets/aistudio/Electrical_Conduit_Installation_a884ec25.jpeg',
        badge: 'Electrical MEP'
      },
      {
        id: 'baner-work-10',
        title: 'Internal Wall Grooving & Concealed Switchbox Alignment',
        category: 'civil_inspection',
        stage: 'MEP Finishing Phase',
        date: 'March 2026',
        description: 'Laser-leveled concealed wall conduit installation and base-coat striated internal plastering inspected by site supervisors.',
        imageUrl: '/assets/aistudio/Plumbing___MEP_Installation_dc3058f5.jpeg',
        badge: 'MEP Inspection'
      },
      {
        id: 'baner-work-11',
        title: 'Active Scaffolding & North Facade Plastering',
        category: 'masonry',
        stage: 'Floor 4-6 Masonry',
        date: 'March 2026',
        description: 'External bamboo and steel scaffolding erected across the north facade with brickwork laying and protective cement curing.',
        imageUrl: '/assets/projects/baner-site-progress.jpg',
        badge: 'Site Progress'
      },
      {
        id: 'baner-work-12',
        title: 'Architectural Teak-Accent Facade Render',
        category: 'elevation',
        stage: 'Target Elevation',
        date: 'Target Q4 2026',
        description: 'Finished modern contemporary residential elevation with private balconies and manicured landscape boundary.',
        imageUrl: '/assets/projects/aura-baner-residences.jpg',
        badge: 'Final Elevation'
      },
      {
        id: 'baner-work-13',
        title: 'Clubhouse Temperature-Controlled Leisure Pool',
        category: 'amenities',
        stage: 'Podium Amenities',
        date: 'Finishing Phase',
        description: 'Dedicated swimming pool with non-slip Italian deck tiles and glass balustrades.',
        imageUrl: '/assets/projects/aura-amenity-pool.jpg',
        badge: 'Amenity Deck'
      }
    ],
    constructionMilestones: [
      { stage: 'Excavation & Raft Foundation', progressPercentage: 100, targetDate: 'Q3 2025', status: 'Completed' },
      { stage: 'RCC Superstructure & Slab Casting', progressPercentage: 80, targetDate: 'Q2 2026', status: 'In Progress' },
      { stage: 'Brick Masonry & Internal Plastering', progressPercentage: 65, targetDate: 'Q3 2026', status: 'In Progress' },
      { stage: 'Concealed Electrical & Plumbing (MEP)', progressPercentage: 45, targetDate: 'Q3 2026', status: 'In Progress' },
      { stage: 'Exterior Texture Paint & Balcony Railings', progressPercentage: 25, targetDate: 'Q4 2026', status: 'Upcoming' },
      { stage: 'Final Handover & Possession', progressPercentage: 0, targetDate: 'Q4 2026', status: 'Upcoming' }
    ],
    overview: 'Signature Aura Baner is an exclusive residential community situated in Baner-Sus, Pune. Designed for contemporary urban living with smart 2 BHK floor layouts, earthquake-resistant RCC frame construction, designer teak-accent facade, dedicated high-speed elevators, and landscaped leisure deck. Complete MahaRERA certification with attractive bank subvention plans.',
    highlights: [
      '2 BHK Luxury Residences priced between ₹ 40 Lakh – ₹ 75 Lakh in prime Baner',
      'Active construction in full swing with RCC superstructure casting underway',
      'Minutes from Nanaware Bridge, Baner High Street, and Hinjawadi IT Park',
      'Clubhouse, fitness centre, 24/7 dual security, and covered multi-level car parking'
    ],
    brochureUrl: '#',
    isFeatured: true
  },
  {
    id: 'proj-5',
    slug: 'signature-aura-sky-mumbai',
    title: 'Aura Sky Mumbai',
    developer: 'Signature Aura Developers Pvt. Ltd.',
    tagline: 'Panoramic high-rise living with sea-breeze vistas',
    city: 'Mumbai',
    locality: 'Western Suburbs / Malad-Kandivali Link Corridor, Mumbai',
    status: 'Under Construction',
    completionDate: 'Q2 2027',
    priceStartingFrom: '₹ 75 Lakh – ₹ 90 Lakh',
    configurations: '1 & 2 BHK Modern High-Rise Condos (450 – 780 sq.ft.)',
    reraNumber: 'P51800052341',
    heroImage: '/assets/projects/aura-sky-mumbai.jpg',
    galleryImages: [
      '/assets/aistudio/IMG-20261116-WA0023_90d2ad71.jpg',
      '/assets/aistudio/IMG-20261116-WA0033_f94e5427.jpg',
      '/assets/aistudio/IMG-20261116-WA0022_b716e5bd.jpg',
      '/assets/aistudio/IMG-20261116-WA0008_8d892bed.jpg',
      '/assets/aistudio/IMG-20261116-WA0051_fe409547.jpg',
      '/assets/aistudio/IMG-20261116-WA0026_7829d2b7.jpg',
      '/assets/aistudio/IMG-20261116-WA0004_2d5e0f46.jpg',
      '/assets/aistudio/IMG-20261116-WA0074_6c73ac2e.jpg',
      '/assets/aistudio/IMG-20261116-WA0014_78fd81ee.jpg',
      '/assets/aistudio/IMG-20261116-WA0072_1f9bd26e.jpg',
      '/assets/aistudio/IMG-20261116-WA0049_0a8adde4.jpg',
      '/assets/aistudio/IMG-20261116-WA0006_f4baba8a.jpg',
      '/assets/aistudio/lJXkgFsTot5Gz6J1N5znEaXgWoJU_Z2qxXqvOJwSG_HIcgsngImunx6rv_URMrxbZxYqSBTzeMzdRPza3rdSKjQaO_PtISE-KuBcZGiQosR-JFCDTvrx_qkldgJIHSf8SZnQXX5vGmA6lBP1yZu8chtzrn6vA4udlW-pYvK7e3B5-McTU1Jfrhlo6De7R0Bt_86163b9b.jpeg',
      '/assets/aistudio/RCC_Slab_Reinforcement___Electrical_Conduits_e0eb8e67.jpeg',
      '/assets/aistudio/RCC_Steel_Reinforcement_Workers_9f02dc24.jpeg',
      '/assets/aistudio/Under-Construction_Residential_Building_03baacab.jpeg',
      '/assets/aistudio/Exterior_Plastering___Building_Structure_1a3b7057.jpeg',
      '/assets/aistudio/Civil_Engineer___Site_Inspection_aaea9e8b.jpeg',
      '/assets/aistudio/Indian_Workers___Brick_Masonry_7ecf27e6.jpeg',
      '/assets/aistudio/Scaffolding___Exterior_Plastering_5cc96a00.jpeg',
      '/assets/aistudio/Electrical_Conduit_Installation_a884ec25.jpeg',
      '/assets/aistudio/Plumbing___MEP_Installation_dc3058f5.jpeg',
      '/assets/projects/baner-site-progress.jpg',
      '/assets/projects/aura-sky-mumbai.jpg',
      '/assets/projects/aura-amenity-pool.jpg'
    ],
    constructionVideos: [
      {
        id: 'sky-vid-1',
        title: 'Mumbai High-Rise Tower RCC & Podium Site Walkthrough',
        stage: 'Active Tower Construction',
        date: 'November 2026 (Live)',
        duration: '0:07',
        description: 'On-site video tour covering active high-rise RCC concrete slabs, green debris safety netting, vertical chute, and heavy crane scaffolding.',
        videoUrl: '/assets/aistudio/VID-20261116-WA0016_b0519664.mp4',
        posterUrl: '/assets/aistudio/IMG-20261116-WA0072_1f9bd26e.jpg',
        badge: 'Site Walkthrough'
      },
      {
        id: 'sky-vid-2',
        title: '25-Year Warranty Marine Plywood Interior Joinery Fabrication',
        stage: 'Interior Fit-Out QA',
        date: 'November 2026',
        duration: '0:20',
        description: 'Inspection of 25-year guaranteed waterproof marine plywood cabinet carcasses and precision joinery prepared for Mumbai high-rise apartments.',
        videoUrl: '/assets/aistudio/VID-20261116-WA0038_4fd55713.mp4',
        posterUrl: '/assets/aistudio/IMG-20261116-WA0046_c41e43c0.jpg',
        badge: 'Carpentry QA'
      },
      {
        id: 'sky-vid-3',
        title: 'Waterproof CenturyPVC & Laminated Flush Door Consignment',
        stage: 'Material Logistics',
        date: 'November 2026',
        duration: '0:18',
        description: 'Dispatch of moisture-proof CenturyPVC bathroom doors, veneer-finish bedroom doors, and sealed hardware assemblies.',
        videoUrl: '/assets/aistudio/VID-20261116-WA0048_c06a48ce.mp4',
        posterUrl: '/assets/aistudio/IMG-20261116-WA0034_7d337360.jpg',
        badge: 'Material Dispatch'
      }
    ],
    constructionGallery: [
      {
        id: 'sky-work-new-1',
        title: 'Grand Double-Height Arrival Lobby & Geometric Floor Inlay',
        category: 'interiors',
        stage: 'Grand Lobby Complete',
        date: 'November 2026',
        description: 'Signature Aura Mumbai arrival lobby with symmetrical twin swan sculptures, geometric stone tiles, and triple destination lift hall.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0033_f94e5427.jpg',
        badge: 'Grand Lobby'
      },
      {
        id: 'sky-work-new-2',
        title: 'Backlit Dual Mosaic Murals & Lift Vestibule Panorama',
        category: 'interiors',
        stage: 'Lobby Finishing',
        date: 'November 2026',
        description: 'Illuminated handcrafted floral-bird mosaic murals lining both flanks of the tri-elevator high-rise vestibule.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0008_8d892bed.jpg',
        badge: 'Lobby Art'
      },
      {
        id: 'sky-work-new-3',
        title: 'Grand Entrance Canopy Stepping into Marble Reception',
        category: 'interiors',
        stage: 'Concierge Entry',
        date: 'November 2026',
        description: 'Granite steps leading from covered driveway drop-off straight into the backlit Italian marble foyer and concierge desk.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0051_fe409547.jpg',
        badge: 'Drop-Off Entry'
      },
      {
        id: 'sky-work-new-4',
        title: 'Statuario Marble & Sculptural Foyer Showcase',
        category: 'interiors',
        stage: 'Wall Cladding',
        date: 'November 2026',
        description: 'Seamless marble slabs with metallic rose-gold trims framing the sculpted lobby centerpiece and perimeter cove lighting.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0005_e830d7e7.jpg',
        badge: 'Italian Marble'
      },
      {
        id: 'sky-work-new-5',
        title: 'Geometric Floor Pattern & Concierge Perspective',
        category: 'interiors',
        stage: 'Flooring Complete',
        date: 'November 2026',
        description: 'Diamond-cut stone tile geometry spanning the grand reception hall toward high-speed passenger elevators.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0007_83176a8d.jpg',
        badge: 'Marble Flooring'
      },
      {
        id: 'sky-work-new-6',
        title: 'Recessed Cove Lighting & Foyer Sanctuary Corner',
        category: 'interiors',
        stage: 'Lighting & Trim',
        date: 'November 2026',
        description: 'Warm architectural LED cove ceiling and full-height fluted brass wall strips framing the entrance sculpture.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0025_59874fd3.jpg',
        badge: 'Ceiling Coves'
      },
      {
        id: 'sky-work-new-7',
        title: 'High-Speed Etched Mirror Stainless Elevator Cabin',
        category: 'interiors',
        stage: 'Lift Commissioning',
        date: 'November 2026',
        description: 'Laser-etched stainless steel lift interior with full-length safety handrail and black granite floor plate.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0026_7829d2b7.jpg',
        badge: 'High-Speed Lift'
      },
      {
        id: 'sky-work-new-8',
        title: 'Lift-01 CCTV Security Dome & Digital Floor Indicator',
        category: 'interiors',
        stage: 'Security Integration',
        date: 'November 2026',
        description: 'Operational passenger elevator fitted with dual HD security cameras, Jindal stainless frames, and digital call display.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0004_2d5e0f46.jpg',
        badge: 'Lift-01 CCTV'
      },
      {
        id: 'sky-work-new-9',
        title: 'Curved Wood-Grain Lobby Column & Residential Corridor',
        category: 'interiors',
        stage: 'Floor Corridors',
        date: 'November 2026',
        description: 'Curved walnut-laminate pillar meeting polished stone flooring and concealed fire-alarm sprinkler ceiling grid.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0031_75a777c1.jpg',
        badge: 'Hallway Detail'
      },
      {
        id: 'sky-work-new-10',
        title: 'Wood-Clad Utility Shaft & Society Management Panel',
        category: 'interiors',
        stage: 'Common Utility Finish',
        date: 'November 2026',
        description: 'Seamless wood-finish service doors paired with book-matched white marble corridor walls.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0027_0d1cd970.jpg',
        badge: 'Corridor Joinery'
      },
      {
        id: 'sky-work-new-11',
        title: 'Aura Sky Finished Facade, Balconies & Piped Gas Grid',
        category: 'elevation',
        stage: 'Exterior Tower Facade',
        date: 'November 2026',
        description: 'Clean white architectural ribbons and charcoal bays with full-height balcony railings and MGL piped gas routing.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0023_90d2ad71.jpg',
        badge: 'Tower Exterior'
      },
      {
        id: 'sky-work-new-12',
        title: 'High-Rise Tower Refuge Area & Vertical Balcony Stack',
        category: 'elevation',
        stage: 'Safety & Facade',
        date: 'November 2026',
        description: 'High-elevation refuge floor bays and weather-shielded balcony frames meeting Mumbai Fire NOC standards.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0022_b716e5bd.jpg',
        badge: 'Refuge Floor'
      },
      {
        id: 'sky-work-new-13',
        title: 'Side Wing Facade, Stilt Drive & Podium Access',
        category: 'elevation',
        stage: 'External Finishing',
        date: 'November 2026',
        description: 'Completed white & dark-slate tower elevation rising above covered stilt parking bays and paved perimeter lane.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0060_a11b9c32.jpg',
        badge: 'Wing Elevation'
      },
      {
        id: 'sky-work-new-14',
        title: 'Lower Tower Elevation & Interlock Paver Block Staging',
        category: 'elevation',
        stage: 'External Landscaping',
        date: 'November 2026',
        description: 'Base residential facade overlooking neatly laid courtyard paving and stacked interlock blocks.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0058_8d7f0f2c.jpg',
        badge: 'Courtyard Work'
      },
      {
        id: 'sky-work-new-15',
        title: 'Flowering Bougainvillea Podium & High-Rise Backdrop',
        category: 'amenities',
        stage: 'Podium Greenery',
        date: 'November 2026',
        description: 'Lush bougainvillea planters crowning the arrival podium against the soaring Aura Sky residential tower.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0037_93bd862e.jpg',
        badge: 'Podium Garden'
      },
      {
        id: 'sky-work-new-16',
        title: 'Paved Stilt Parking Bay & Internal Driveway',
        category: 'amenities',
        stage: 'Parking Infrastructure',
        date: 'November 2026',
        description: 'Dedicated sheltered stilt & podium parking bays with clear vehicle movement lanes and overhead utilities.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0019_57cea970.jpg',
        badge: 'Podium Parking'
      },
      {
        id: 'sky-work-new-17',
        title: 'Tower Wing-B High-Rise RCC Structure & Tower Crane',
        category: 'construction',
        stage: 'Tower-B Superstructure',
        date: 'November 2026 (Live)',
        description: 'Soaring Wing-B reinforced concrete frame flanked by green safety screens, orange jib crane, and 2-tier parking podium.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0014_78fd81ee.jpg',
        badge: 'Tower-B Live'
      },
      {
        id: 'sky-work-new-18',
        title: 'Active Tower Crane & Full-Height Safety Netting',
        category: 'construction',
        stage: 'Upper Floor Works',
        date: 'November 2026 (Live)',
        description: 'Vertical construction crane operating across high-rise residential slabs with full perimeter safety debris screens.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0072_1f9bd26e.jpg',
        badge: 'Crane Operations'
      },
      {
        id: 'sky-work-new-19',
        title: 'Heavy Concreting Mixer, Formwork & Steel Staging',
        category: 'construction',
        stage: 'Structural Civil Yard',
        date: 'November 2026',
        description: 'Site concrete mixing plant, steel column shuttering moulds, and bundled rebar positioned along the active construction wing.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0006_f4baba8a.jpg',
        badge: 'Mixer & Rebar'
      },
      {
        id: 'sky-work-new-20',
        title: 'Commercial Podium Bays & Ground Structural Framing',
        category: 'construction',
        stage: 'Podium Commercial Bays',
        date: 'November 2026',
        description: 'Double-height podium commercial & utility bays under plastering and shutter fabrication.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0021_cef40d13.jpg',
        badge: 'Podium Framing'
      },
      {
        id: 'sky-work-new-21',
        title: '25-Year Warranty Marine Plywood Stock for Interior Fit-Out',
        category: 'interiors',
        stage: 'Interior Material QA',
        date: 'November 2026',
        description: 'Commercial and waterproof marine-grade plywood sheets staged for modular wardrobes and kitchen cabinetry.',
        imageUrl: '/assets/aistudio/IMG-20261116-WA0046_c41e43c0.jpg',
        badge: 'Plywood QA'
      },
      {
        id: 'sky-work-1',
        title: 'Tower Crane Concrete Hoisting & High-Rise Slab Pouring',
        category: 'construction',
        stage: 'Level 18 Casting',
        date: 'March 2026 (Live)',
        description: 'Continuous vertical construction powered by heavy tower cranes delivering concrete buckets and steel reinforcement to upper residential decks.',
        imageUrl: '/assets/aistudio/lJXkgFsTot5Gz6J1N5znEaXgWoJU_Z2qxXqvOJwSG_HIcgsngImunx6rv_URMrxbZxYqSBTzeMzdRPza3rdSKjQaO_PtISE-KuBcZGiQosR-JFCDTvrx_qkldgJIHSf8SZnQXX5vGmA6lBP1yZu8chtzrn6vA4udlW-pYvK7e3B5-McTU1Jfrhlo6De7R0Bt_86163b9b.jpeg',
        badge: 'Tower Crane'
      },
      {
        id: 'sky-work-2',
        title: 'High-Rise Deck Rebar Mesh & Concealed Conduit Laying',
        category: 'construction',
        stage: 'Upper Deck Slab Prep',
        date: 'March 2026 (Live)',
        description: 'High-elevation floor slab reinforcement mesh interlaced with heavy-duty PVC electrical conduits prior to M50 concrete pouring.',
        imageUrl: '/assets/aistudio/RCC_Slab_Reinforcement___Electrical_Conduits_e0eb8e67.jpeg',
        badge: 'RCC & Conduits'
      },
      {
        id: 'sky-work-3',
        title: 'Monolithic Mivan Aluminum Formwork & Core Steel Tying',
        category: 'construction',
        stage: 'RCC Core Framing',
        date: 'March 2026',
        description: 'Monolithic aluminum formwork system (Mivan tech) and dense TMT steel reinforcement tying for shear walls and seismic resilience.',
        imageUrl: '/assets/aistudio/RCC_Steel_Reinforcement_Workers_9f02dc24.jpeg',
        badge: 'Mivan Core'
      },
      {
        id: 'sky-work-4',
        title: 'Multi-Storey Superstructure & Full Perimeter Scaffolding',
        category: 'construction',
        stage: 'Podium & Tower Wing',
        date: 'March 2026',
        description: 'Full multi-tier steel scaffolding enclosure supporting ongoing superstructure curing and exterior facade preparation.',
        imageUrl: '/assets/aistudio/Under-Construction_Residential_Building_03baacab.jpeg',
        badge: 'On-Site Photo'
      },
      {
        id: 'sky-work-5',
        title: 'Twin Wing Exterior Plastering & White Architectural Primer',
        category: 'elevation',
        stage: 'Exterior Facade Works',
        date: 'March 2026',
        description: 'Side-by-side facade progression showing active scaffolding plastering alongside completed weather-coat white primer finish.',
        imageUrl: '/assets/aistudio/Exterior_Plastering___Building_Structure_1a3b7057.jpeg',
        badge: 'Facade Progress'
      },
      {
        id: 'sky-work-6',
        title: 'Senior Structural Engineer QA/QC Column & Cube Audit',
        category: 'civil_inspection',
        stage: 'Engineering QA/QC Audit',
        date: 'March 2026',
        description: 'Chief structural engineer verifying RCC column concrete strength, cube test blocks, and MahaRERA compliance checklists on site.',
        imageUrl: '/assets/aistudio/Civil_Engineer___Site_Inspection_aaea9e8b.jpeg',
        badge: 'Audit Verified'
      },
      {
        id: 'sky-work-7',
        title: 'Internal Partition Brick Masonry & Mortar Laying',
        category: 'masonry',
        stage: 'Internal Masonry',
        date: 'March 2026',
        description: 'Certified masonry crew constructing internal apartment walls with precision mortar joints and safety gear.',
        imageUrl: '/assets/aistudio/Indian_Workers___Brick_Masonry_7ecf27e6.jpeg',
        badge: 'Masonry Work'
      },
      {
        id: 'sky-work-8',
        title: 'Exterior Weatherproof Cement Plastering & Balcony Profiling',
        category: 'masonry',
        stage: 'External Plastering',
        date: 'March 2026',
        description: 'Double-coat waterproof sand-faced cement plastering and architectural balcony ledge finishing on residential floors.',
        imageUrl: '/assets/aistudio/Scaffolding___Exterior_Plastering_5cc96a00.jpeg',
        badge: 'Plastering Live'
      },
      {
        id: 'sky-work-9',
        title: 'Concealed Electrical Conduit Chasing & Ceiling Piping',
        category: 'civil_inspection',
        stage: 'Internal Electrical MEP',
        date: 'February 2026',
        description: 'Fire-retardant FRLS electrical conduits, ceiling distribution pipes, and modular switchboxes installed across residential units.',
        imageUrl: '/assets/aistudio/Electrical_Conduit_Installation_a884ec25.jpeg',
        badge: 'Electrical MEP'
      },
      {
        id: 'sky-work-10',
        title: 'Internal Wall Grooving & Concealed Switchbox Alignment',
        category: 'civil_inspection',
        stage: 'MEP Finishing Phase',
        date: 'March 2026',
        description: 'Laser-leveled vertical wall conduit installation and base-coat internal plastering inspected by project engineers.',
        imageUrl: '/assets/aistudio/Plumbing___MEP_Installation_dc3058f5.jpeg',
        badge: 'MEP Inspection'
      },
      {
        id: 'sky-work-11',
        title: 'Aura Sky 32-Storey Landmark Architectural Profile',
        category: 'elevation',
        stage: 'Final Design Model',
        date: 'Target Q2 2027',
        description: 'Sleek white and charcoal aerodynamic towers offering sunset sea-breeze balconies over Mumbai skyline.',
        imageUrl: '/assets/projects/aura-sky-mumbai.jpg',
        badge: 'Signature Towers'
      },
      {
        id: 'sky-work-12',
        title: 'Skylight Covered Indoor Lap Pool & Leisure Spa',
        category: 'amenities',
        stage: 'Clubhouse Facilities',
        date: 'Finishing Phase',
        description: 'Dedicated heated wellness pool, steam room, and rooftop observatory lounge.',
        imageUrl: '/assets/projects/aura-amenity-pool.jpg',
        badge: 'Sky Amenities'
      }
    ],
    constructionMilestones: [
      { stage: 'Deep Piling & 3-Tier Basement Raft', progressPercentage: 100, targetDate: 'Q1 2025', status: 'Completed' },
      { stage: 'Multi-Level Robotic Parking Podium', progressPercentage: 100, targetDate: 'Q4 2025', status: 'Completed' },
      { stage: 'Tower Superstructure & Core Slab Casting', progressPercentage: 68, targetDate: 'Q4 2026', status: 'In Progress' },
      { stage: 'Shear Wall & Balcony Formwork', progressPercentage: 55, targetDate: 'Q1 2027', status: 'In Progress' },
      { stage: 'OTIS High-Speed Elevators & Lift Core', progressPercentage: 40, targetDate: 'Q1 2027', status: 'In Progress' },
      { stage: 'Exterior Glazing, Texture & Handover', progressPercentage: 15, targetDate: 'Q2 2027', status: 'Upcoming' }
    ],
    overview: 'Rising into the Mumbai skyline, Aura Sky delivers modern metropolitan living at unmatched value. Featuring striking white and grey geometric architecture, cantilevered sunset balconies, infinity-edge covered swimming pool, sky garden, and multi-tier podium parking. Strategically located with rapid connectivity to Metro Line 2A and Western Express Highway.',
    highlights: [
      'Priced between ₹ 75 Lakh – ₹ 90 Lakh with flexible construction-linked payment milestones',
      'Temperature-controlled covered swimming pool, sky yoga deck, and fitness arena',
      'Grand double-height air-conditioned entrance lobby with security concierge',
      '100% MahaRERA approved title with leading institutional bank tie-ups'
    ],
    brochureUrl: '#',
    isFeatured: true
  }
];

// --- 6 POPULAR LOCATIONS ---
export const SAMPLE_LOCATIONS: CityLocation[] = [
  {
    id: 'loc-mumbai',
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'India’s financial capital and pinnacle of sea-facing luxury',
    avgPricePerSqFt: '₹ 12,800 / sq.ft.',
    activeListingsCount: 42,
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    description: 'Home to India’s most prized residential corridors including Worli Sea Face, Bandra West, Malabar Hill, Juhu, and the bustling financial district of BKC.',
    popularLocalities: ['Worli Sea Face', 'Bandra West (Pali Hill & Carter Rd)', 'Bandra Kurla Complex (BKC)', 'Juhu Beachfront', 'Lower Parel']
  },
  {
    id: 'loc-delhi-ncr',
    slug: 'delhi-ncr',
    name: 'Delhi NCR',
    state: 'Delhi & Haryana',
    tagline: 'Stately bungalows, golf estates, and grand arterial residences',
    avgPricePerSqFt: '₹ 8,500 / sq.ft.',
    activeListingsCount: 36,
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    description: 'Offering sprawling golf course frontage on DLF Golf Course Road, stately park-facing floors in South Delhi, and rapid tech hubs in Cyber City.',
    popularLocalities: ['Golf Course Road, Gurgaon', 'Defence Colony, South Delhi', 'Golf Course Extension Rd', 'DLF Cyber City', 'Jor Bagh']
  },
  {
    id: 'loc-goa',
    slug: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Idyllic tropical heritage villas and coastal retreats',
    avgPricePerSqFt: '₹ 7,400 / sq.ft.',
    activeListingsCount: 24,
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'India’s most sought-after holiday and lifestyle residential destination. Experience Portuguese colonial heritage estates in Assagao, Anjuna, Candolim, and Aldona.',
    popularLocalities: ['Assagao', 'Anjuna Hills', 'Candolim Beach', 'Aldona Backwaters', 'Siolim']
  },
  {
    id: 'loc-bengaluru',
    slug: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Valley penthouses, CBD heritage, and leafy avenues',
    avgPricePerSqFt: '₹ 7,100 / sq.ft.',
    activeListingsCount: 29,
    heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    description: 'Blending high-growth tech corridor investments along Outer Ring Road with heritage garden residences around Cubbon Park, Lavelle Road, and Indiranagar.',
    popularLocalities: ['Vittal Mallya / Lavelle Road', 'Indiranagar 100ft Road', 'Sadashivnagar', 'Koramangala 3rd Block', 'Outer Ring Road (ORR)']
  },
  {
    id: 'loc-hyderabad',
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'Regal gated citadels, Jubilee Hills mansions, and HITEC corridor',
    avgPricePerSqFt: '₹ 6,800 / sq.ft.',
    activeListingsCount: 18,
    heroImage: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
    description: 'From expansive independent architectural villas in Jubilee Hills and Banjara Hills to futuristic sky residences in Financial District and Kokapet.',
    popularLocalities: ['Jubilee Hills', 'Banjara Hills', 'Financial District / Nanakramguda', 'Kokapet SEZ', 'Gachibowli']
  },
  {
    id: 'loc-pune',
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    tagline: 'Boutique green avenues, Koregaon Park luxury, and IT parks',
    avgPricePerSqFt: '₹ 6,400 / sq.ft.',
    activeListingsCount: 15,
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    description: 'A cosmopolitan haven known for tree-shaded bungalows in Koregaon Park and Kalyani Nagar, accompanied by modern luxury towers in Boat Club Road.',
    popularLocalities: ['Koregaon Park', 'Boat Club Road', 'Kalyani Nagar', 'Baner-Balewadi', 'Senapati Bapat Road']
  }
];

// --- 5 TESTIMONIALS ---
export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Rajesh & Radhika Khaitan',
    designation: 'Managing Director, Horizon Global Logistics',
    city: 'Mumbai',
    rating: 5,
    quote: 'Signature Aura™ handled our purchase of a sea-facing duplex in Worli with unmatched discretion and architectural diligence. Their advisory on title clearances and bespoke builder negotiations saved us invaluable time. Truly India’s finest luxury property consultancy.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'Worli Sea Face Duplex Sky Residence'
  },
  {
    id: 'test-2',
    clientName: 'Sanjay Chawla',
    designation: 'Founder & CEO, Fintech India Unicorn',
    city: 'Delhi NCR',
    rating: 5,
    quote: 'Acquiring an estate at DLF Camellias requires deep relationships and immediate market intelligence. The Signature Aura team presented exclusive off-market options that were never publicly listed. Flawless execution from end to end.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'The Camellias Golf Suite, Gurgaon'
  },
  {
    id: 'test-3',
    clientName: 'Dr. Alistair & Meera Coutinho',
    designation: 'Orthopedic Surgeon & Global Architect (London / Goa)',
    city: 'Goa',
    rating: 5,
    quote: 'As an NRI couple based in London, acquiring a heritage Portuguese estate in Assagao felt daunting until we partnered with Natasha at Signature Aura. Their team handled local title certifications, civil structural audits, and legal registrations flawlessly.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'Heritage Portuguese Villa, Assagao'
  },
  {
    id: 'test-4',
    clientName: 'Vivek Chandrasekhar',
    designation: 'Managing Partner, Bay Capital Bengaluru',
    city: 'Bengaluru',
    rating: 5,
    quote: 'Signature Aura’s commercial advisory division assisted our firm in leasing two Grade-A floor plates as well as purchasing a personal penthouse on Vittal Mallya Road. Their financial modeling, RERA scrutiny, and market benchmarking are exemplary.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'UB Sky Garden Residence & BKC Office'
  },
  {
    id: 'test-5',
    clientName: 'Nandita Rao Deshmukh',
    designation: 'Private Wealth Investor & Art Collector',
    city: 'Hyderabad',
    rating: 5,
    quote: 'Their AI Property Assistant initially answered all my detailed queries about square footage, approvals, and floor plans at 11 PM on a Sunday! By Monday morning, a private site visit was arranged with VIP transport. Remarkable tech-enabled luxury service.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'Jubilee Hills Manor Villa'
  }
];
