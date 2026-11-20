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
    slug: 'aura-sky-panvel-mumbai',
    title: 'Aura Sky High-Rise 2 BHK - Panvel, Mumbai',
    tagline: 'High-rise tower residences in New Panvel near Atal Setu & Navi Mumbai Airport starting at ₹ 85 Lakh',
    price: 8500000,
    priceDisplay: '₹ 85 Lakh',
    pricePerSqFt: 11970,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    carpetAreaSqFt: 710,
    superAreaSqFt: 960,
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
    reraNumber: 'P52000052341',
    location: {
      city: 'Panvel, Mumbai',
      locality: 'New Panvel',
      address: 'Aura Sky Promenade, Sector 19, New Panvel, Navi Mumbai',
      landmark: '10 Mins from Navi Mumbai International Airport & Atal Setu Approach',
      pincode: '410206',
      lat: 18.9894,
      lng: 73.1175,
      mapEmbedUrl: 'https://maps.google.com/?q=New+Panvel+Navi+Mumbai',
    },
    amenities: [
      'Double Height Air-Conditioned Designer Lobby',
      'Rooftop Sky Lounge & Observatory Deck',
      'Indoor Heated Pool with Skylight Canopy',
      'Multi-Tier Podium Parking',
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
    description: 'Aura Sky redefines modern high-rise living in New Panvel, Mumbai starting at ₹ 85 Lakh. Soaring 32 storeys with geometric architectural profiles, open horizon balconies, and 25+ lifestyle amenities. Strategically positioned near the Navi Mumbai International Airport, Atal Setu (MTHL), and the Mumbai-Pune Expressway.',
    highlightFeatures: [
      'Prime New Panvel high-rise pricing starting at ₹ 85 Lakh',
      '10-minute access to Navi Mumbai International Airport & Atal Setu corridor',
      'Flexible construction-linked payment plan (CLP) with leading banks',
      'Full MahaRERA compliance with scheduled handover in Q2 2027'
    ],
    nearbyFacilities: [
      { name: 'Panvel Railway Terminus', distance: '2.4 km', type: 'metro' },
      { name: 'Orion Mall Panvel', distance: '1.9 km', type: 'mall' },
      { name: 'MGM Hospital New Panvel', distance: '2.8 km', type: 'hospital' },
      { name: 'Navi Mumbai International Airport', distance: '6.5 km', type: 'airport' }
    ],
    agent: {
      name: 'Uma Bhandwalkar',
      title: 'Partner & Director - Panvel & Mumbai Corridor Desk',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/uma-bhandwalkar.jpg',
      experienceYears: 16,
      rating: 4.94
    },
    createdAt: '2026-03-02T10:00:00Z'
  },

  // --- CURATED PUNE, NASHIK & PANVEL (MUMBAI) RESIDENCES ---
  {
    id: 'prop-pune-2',
    slug: 'signature-aura-crest-3bhk-sus-pune',
    title: 'Signature Aura Crest 3 BHK - Sus-Balewadi, Pune',
    tagline: 'Spacious corner 3 BHK residences with green hill views near Baner-Balewadi',
    price: 6800000,
    priceDisplay: '₹ 68 Lakh',
    pricePerSqFt: 6415,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    carpetAreaSqFt: 1060,
    superAreaSqFt: 1380,
    furnishing: 'Semi-Furnished',
    floor: 7,
    totalFloors: 14,
    parking: '2 Covered Stilt Parking Bays',
    propertyAge: 'Under Construction',
    ownership: 'Freehold',
    availability: 'Possession Q2 2027',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P52100051409',
    location: {
      city: 'Pune',
      locality: 'Sus-Balewadi',
      address: 'Crest Avenue, Sus-Balewadi Link Road, West Pune',
      landmark: 'Near Balewadi High Street & Pune-Mumbai Bypass',
      pincode: '411021',
      lat: 18.5679,
      lng: 73.7712,
      mapEmbedUrl: 'https://maps.google.com/?q=Sus+Balewadi+Pune',
    },
    amenities: [
      'Designer Italian Marble Arrival Lobby',
      'Temperature-Controlled Clubhouse Swimming Pool',
      'Landscaped Podium Garden & Walking Track',
      'EV Charging Bays & Covered Parking',
      'Smart Video Door Phone & 24/7 CCTV',
      'Rooftop Fitness Studio & Yoga Deck'
    ],
    images: [
      {
        url: '/assets/projects/aura-baner-residences.jpg',
        caption: 'Signature Aura Crest 3 BHK modern tower facade in Sus-Balewadi, Pune'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0009_c3d80f50.jpg',
        caption: 'Double-height marble reception foyer & designer concierge'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0015_97e16d62.jpg',
        caption: 'Grand society entrance gate & landscaped arrival driveway'
      },
      {
        url: '/assets/projects/aura-amenity-pool.jpg',
        caption: 'Clubhouse leisure swimming pool and sundeck'
      }
    ],
    description: 'Signature Aura Crest offers thoughtfully planned 3 BHK corner homes in Pune’s rapid-growth Sus-Balewadi belt at ₹ 68 Lakh. Featuring zero-wastage Vastu floor plates, wide sit-out balconies facing Baner hills, and seamless 10-minute access to Balewadi High Street and Hinjawadi IT Park.',
    highlightFeatures: [
      'Corner 3 BHK cross-ventilated layout with dual balconies',
      '10 minutes to Balewadi High Street & Hinjawadi Phase 1',
      'MahaRERA registered with clear 30-year title audit',
      'Approved by SBI, HDFC, and ICICI Bank for instant home loans'
    ],
    nearbyFacilities: [
      { name: 'Balewadi High Street', distance: '2.3 km', type: 'mall' },
      { name: 'Mumbai-Pune Bypass (NH-48)', distance: '1.1 km', type: 'metro' },
      { name: 'Manipal Hospital Baner', distance: '3.2 km', type: 'hospital' },
      { name: 'Vibgyor High School Balewadi', distance: '1.8 km', type: 'school' }
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
    createdAt: '2026-03-04T10:00:00Z'
  },
  {
    id: 'prop-panvel-2',
    slug: 'aura-courtyard-2bhk-panvel-mumbai',
    title: 'Aura Courtyard 2 BHK - Panvel, Mumbai',
    tagline: 'Ready-to-move 2 BHK gated residences along the Panvel Expressway Corridor',
    price: 5800000,
    priceDisplay: '₹ 58 Lakh',
    pricePerSqFt: 8529,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
    carpetAreaSqFt: 680,
    superAreaSqFt: 920,
    furnishing: 'Semi-Furnished',
    floor: 9,
    totalFloors: 20,
    parking: '1 Covered Stilt Parking',
    propertyAge: 'Ready to Move',
    ownership: 'Freehold',
    availability: 'Ready to Move',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P52000048712',
    location: {
      city: 'Panvel, Mumbai',
      locality: 'Panvel Expressway Corridor',
      address: 'Aura Courtyard, Old Mumbai-Pune Highway Junction, Panvel, Navi Mumbai',
      landmark: '5 Mins from Mumbai-Pune Expressway Entry & Panvel Station',
      pincode: '410206',
      lat: 18.9942,
      lng: 73.1241,
      mapEmbedUrl: 'https://maps.google.com/?q=Panvel+Expressway+Navi+Mumbai',
    },
    amenities: [
      'Ready Clubhouse & Indoor Gymnasium',
      'Landscaped Courtyard Garden & Kids Play Area',
      '24/7 Gated Security & Intercom Network',
      'High-Speed Passenger & Service Elevators',
      'Rainwater Harvesting & Solar Common Lighting',
      'Covered Stilt Parking Bays'
    ],
    images: [
      {
        url: '/assets/aistudio/IMG-20261116-WA0022_b716e5bd.jpg',
        caption: 'Completed residential tower elevation with deck balconies in Panvel'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0033_f94e5427.jpg',
        caption: 'Italian marble entrance lobby with concierge desk & lift bay'
      },
      {
        url: '/assets/aistudio/IMG-20261116-WA0074_6c73ac2e.jpg',
        caption: 'Bougainvillea landscaped podium garden & paved driveway'
      },
      {
        url: '/assets/projects/aura-amenity-pool.jpg',
        caption: 'Society swimming pool and fitness leisure zone'
      }
    ],
    description: 'Aura Courtyard delivers ready-to-move 2 BHK apartments in Panvel, Mumbai at ₹ 58 Lakh with Occupancy Certificate (OC) received and zero GST. Ideal for Mumbai commuters and long-term investors capitalizing on Navi Mumbai International Airport and Atal Setu infrastructure.',
    highlightFeatures: [
      'OC Received Ready-to-Move homes — 0% GST benefit',
      'Direct access to Mumbai-Pune Expressway & Atal Setu (MTHL)',
      'Strong rental yield corridor near Panvel Terminus & Airport Zone',
      'Clear CIDCO-tripartite & MahaRERA verified documentation'
    ],
    nearbyFacilities: [
      { name: 'Panvel Junction Railway Station', distance: '2.1 km', type: 'metro' },
      { name: 'Mumbai-Pune Expressway Toll Gate', distance: '1.5 km', type: 'airport' },
      { name: 'Lifeline Hospital Panvel', distance: '2.0 km', type: 'hospital' },
      { name: 'DAV Public School New Panvel', distance: '2.6 km', type: 'school' }
    ],
    agent: {
      name: 'Akshay Bhote',
      title: 'Partner & Director - Legal & Panvel Advisory',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/akshay-bhote.jpg',
      experienceYears: 14,
      rating: 4.95
    },
    createdAt: '2026-03-05T10:00:00Z'
  },
  {
    id: 'prop-nashik-1',
    slug: 'aura-greens-3bhk-gangapur-road-nashik',
    title: 'Aura Greens 3 BHK - Gangapur Road, Nashik',
    tagline: 'Spacious Vastu-compliant 3 BHK homes in Nashik’s premier green neighbourhood',
    price: 5200000,
    priceDisplay: '₹ 52 Lakh',
    pricePerSqFt: 4642,
    listingType: 'buy',
    category: 'residential',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    carpetAreaSqFt: 1120,
    superAreaSqFt: 1450,
    furnishing: 'Semi-Furnished',
    floor: 5,
    totalFloors: 11,
    parking: '1 Covered Stilt Parking',
    propertyAge: 'Ready to Move',
    ownership: 'Freehold',
    availability: 'Ready to Move',
    isFeatured: true,
    isPublished: true,
    isReraApproved: true,
    reraNumber: 'P51600046890',
    location: {
      city: 'Nashik',
      locality: 'Gangapur Road',
      address: 'Aura Greens Enclave, Off Gangapur Road, Near Jehan Circle, Nashik',
      landmark: '5 Mins from College Road & Sula Vineyards Corridor',
      pincode: '422013',
      lat: 20.0112,
      lng: 73.7524,
      mapEmbedUrl: 'https://maps.google.com/?q=Gangapur+Road+Nashik',
    },
    amenities: [
      'Low-Density Gated Community with Landscaped Lawns',
      'Clubhouse with Multipurpose Hall & Gym',
      'Dedicated Senior Citizen Sit-Out & Walking Path',
      '24/7 CCTV Security & Automated Boom Barrier',
      'Solar Water Heater & 100% Common Power Backup',
      'Covered Parking with EV Point Provision'
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Aura Greens serene low-density residential enclave on Gangapur Road, Nashik'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bright spacious living room with cross-ventilation terrace balcony'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Modern modular kitchen and dining space with granite countertops'
      },
      {
        url: '/assets/projects/aura-amenity-pool.jpg',
        caption: 'Clubhouse wellness and recreational amenity deck'
      }
    ],
    description: 'Situated on Nashik’s most prestigious Gangapur Road residential belt, Aura Greens presents expansive 1,120 sq.ft. carpet 3 BHK homes at ₹ 52 Lakh. Enjoy calm green surroundings, pleasant year-round climate, ready possession with zero GST, and effortless connectivity to College Road, Indira Nagar, and the Samruddhi Expressway.',
    highlightFeatures: [
      'Generous 1,120 sq.ft. carpet 3 BHK ready home at ₹ 52 Lakh',
      'Prime Gangapur Road address close to top schools & hospitals',
      'Zero GST ready-to-move MahaRERA certified residence',
      'Ideal for Pune/Mumbai families seeking a serene Nashik home or investment'
    ],
    nearbyFacilities: [
      { name: 'City Centre Mall Nashik', distance: '3.4 km', type: 'mall' },
      { name: 'Sahyadri Super Speciality Hospital', distance: '3.1 km', type: 'hospital' },
      { name: 'Fravashi Academy Gangapur Road', distance: '1.6 km', type: 'school' },
      { name: 'Nashik Airport (Ozar) Highway Link', distance: '20 km', type: 'airport' }
    ],
    agent: {
      name: 'Rama Bhote',
      title: 'Partner & Director - Nashik & Family Advisory Desk',
      phone: '+91 88056 21111',
      email: 'auradevelopersindia@gmail.com',
      photo: '/assets/team/rama-bhote.jpg',
      experienceYears: 15,
      rating: 4.97
    },
    createdAt: '2026-03-06T10:00:00Z'
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
    title: 'Aura Sky Panvel, Mumbai',
    developer: 'Signature Aura Developers Pvt. Ltd.',
    tagline: 'Panoramic high-rise living near Atal Setu & Navi Mumbai Airport',
    city: 'Panvel, Mumbai',
    locality: 'New Panvel, Navi Mumbai – Atal Setu & Airport Corridor',
    status: 'Under Construction',
    completionDate: 'Q2 2027',
    priceStartingFrom: '₹ 58 Lakh – ₹ 85 Lakh',
    configurations: '2 BHK Modern High-Rise Condos (680 – 780 sq.ft.)',
    reraNumber: 'P52000052341',
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
    overview: 'Rising into the New Panvel skyline, Aura Sky Panvel delivers modern Mumbai metropolitan living at unmatched value. Featuring striking white and grey geometric architecture, cantilevered balconies, infinity-edge covered swimming pool, sky garden, and multi-tier podium parking. Strategically located with rapid connectivity to the Navi Mumbai International Airport, Atal Setu (MTHL), and the Mumbai-Pune Expressway.',
    highlights: [
      'Priced between ₹ 58 Lakh – ₹ 85 Lakh with flexible construction-linked payment milestones',
      'Temperature-controlled covered swimming pool, sky yoga deck, and fitness arena',
      'Grand double-height air-conditioned entrance lobby with security concierge',
      '100% MahaRERA approved title with leading institutional bank tie-ups'
    ],
    brochureUrl: '#',
    isFeatured: true
  }
];

// --- 3 CORE MAHARASHTRA LOCATIONS (PUNE, NASHIK, PANVEL MUMBAI) ---
export const SAMPLE_LOCATIONS: CityLocation[] = [
  {
    id: 'loc-pune',
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    tagline: 'Baner-Sus IT corridor, Balewadi High Street & west Pune residences',
    avgPricePerSqFt: '₹ 6,200 / sq.ft.',
    activeListingsCount: 2,
    heroImage: '/assets/projects/aura-baner-residences.jpg',
    description: 'Headquartered in Baner-Sus, Signature Aura curates MahaRERA-verified 2 & 3 BHK residences with direct connectivity to Hinjawadi IT Park, Balewadi Stadium, and the Mumbai-Pune Expressway.',
    popularLocalities: ['Baner-Sus', 'Sus-Balewadi', 'Baner High Street', 'Wakad', 'Hinjawadi Corridor']
  },
  {
    id: 'loc-nashik',
    slug: 'nashik',
    name: 'Nashik',
    state: 'Maharashtra',
    tagline: 'Serene Gangapur Road residences & high-growth Samruddhi corridor',
    avgPricePerSqFt: '₹ 4,800 / sq.ft.',
    activeListingsCount: 1,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Maharashtra’s calmest high-growth residential hub offering spacious, low-density gated living along Gangapur Road, Indira Nagar, and College Road with seamless Samruddhi Mahamarg access.',
    popularLocalities: ['Gangapur Road', 'Indira Nagar', 'College Road', 'Govind Nagar', 'Pathardi Phata']
  },
  {
    id: 'loc-panvel-mumbai',
    slug: 'panvel-mumbai',
    name: 'Panvel, Mumbai',
    state: 'Maharashtra',
    tagline: 'Navi Mumbai International Airport, Atal Setu & New Panvel high-rises',
    avgPricePerSqFt: '₹ 9,600 / sq.ft.',
    activeListingsCount: 2,
    heroImage: '/assets/projects/aura-sky-mumbai.jpg',
    description: 'Mumbai’s premier high-appreciation gateway anchored by the Navi Mumbai International Airport, Atal Setu (MTHL), and the Mumbai-Pune Expressway. Discover verified high-rise residences in New Panvel.',
    popularLocalities: ['New Panvel', 'Panvel Expressway Corridor', 'Atal Setu Approach', 'Kamothe', 'Khanda Colony']
  }
];

// --- VERIFIED CLIENT TESTIMONIALS (PUNE, NASHIK, PANVEL MUMBAI) ---
export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Sandeep & Prachi Kulkarni',
    designation: 'Senior Engineering Manager, Hinjawadi IT Park',
    city: 'Pune',
    rating: 5,
    quote: 'Signature Aura™ made buying our 2 BHK in Baner-Sus completely transparent. Their team walked us through the MahaRERA documents, showed us live RCC construction quality on site, and arranged SBI home loan sanction within a week.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'Signature Aura 2 BHK - Baner, Pune'
  },
  {
    id: 'test-2',
    clientName: 'Ananya & Rohit Deshmukh',
    designation: 'VP Operations, Navi Mumbai Logistics Hub',
    city: 'Panvel, Mumbai',
    rating: 5,
    quote: 'We were specifically looking in New Panvel because of the International Airport and Atal Setu connectivity. Uma and her advisory desk helped us shortlist Aura Sky and verified every CIDCO and MahaRERA approval before booking.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'Aura Sky High-Rise 2 BHK - Panvel, Mumbai'
  },
  {
    id: 'test-3',
    clientName: 'Dr. Milind & Sujata Joshi',
    designation: 'Consultant Physician, Gangapur Road',
    city: 'Nashik',
    rating: 5,
    quote: 'Finding a genuinely spacious, ready-to-move 3 BHK on Gangapur Road with clear 30-year title records was our priority. Signature Aura handled the legal title search report and smooth registration without a single hidden charge.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'Aura Greens 3 BHK - Gangapur Road, Nashik'
  },
  {
    id: 'test-4',
    clientName: 'Vikramaditya Pawar',
    designation: 'Business Owner & NRI Investor (Pune / Dubai)',
    city: 'Pune',
    rating: 5,
    quote: 'From virtual video site walkthroughs to clear construction-linked milestones in Sus-Balewadi, Rakesh and the Signature Aura team delivered complete peace of mind for our family’s Pune investment.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'Signature Aura Crest 3 BHK - Sus-Balewadi, Pune'
  },
  {
    id: 'test-5',
    clientName: 'Neha & Amitabh Sawant',
    designation: 'Chartered Accountant & Banker, Mumbai',
    city: 'Panvel, Mumbai',
    rating: 5,
    quote: 'Their property assistant answered our pricing and carpet-area questions late on a Sunday evening, and by Monday we toured Aura Courtyard in Panvel. Zero GST on a ready OC residence made the decision effortless.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    propertyPurchased: 'Aura Courtyard 2 BHK - Panvel, Mumbai'
  }
];
