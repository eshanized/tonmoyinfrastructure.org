export interface DataCenterSpecs {
  servers: number;
  racks: number;
  coolingCapacity: number; // in MW
  backupGenerators: number;
}

export interface DataCenterFacility {
  name: string;
  country: string;
  region: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  tier: 'Tier 4' | 'Tier 3';
  certifications: string[];
  powerCapacity: number; // MW
  redundancy: string;
  networkProviders: string[];
  load: number; // Percentage
  lat: number;
  lng: number;
  totalStorage: number; // In TB
  usedStorage: number;
  specs: DataCenterSpecs;
}

export interface CourierHub {
  name: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  status: string;
  certifications: string[];
  partners: string[];
  load: number;
}

export interface LogisticsService {
  title: string;
  tagline: string;
  description: string;
  features: string[];
}

export interface LogisticsKpi {
  label: string;
  value: string;
  description: string;
}

// ─── Sovereign Data Center Facility ─────────────────────────
// Tonmoy Infrastructure and Vision operates an existing, physical sovereign
// data center facility in Jayapura, Papua, Indonesia.
export const DATA_CENTERS: DataCenterFacility[] = [
  {
    name: 'Jayapura Sovereign Facility',
    country: 'Indonesia',
    region: 'Papua / Southeast Asia',
    status: 'Operational',
    tier: 'Tier 3',
    certifications: ['Aligned with ISO 27001 Security Principles', 'SOC 2 Architecture Alignment'],
    powerCapacity: 0.2,
    redundancy: '2N Power / N+1 Cooling',
    networkProviders: ['Telkom Indonesia', 'Indosat Ooredoo Hutchison', 'Regional Carrier Fiber'],
    load: 70,
    lat: -2.543186,
    lng: 140.714993,
    totalStorage: 120,
    usedStorage: 84,
    specs: {
      servers: 32,
      racks: 4,
      coolingCapacity: 0.2,
      backupGenerators: 1,
    },
  },
];

// ─── 17 Global Logistics Reference Corridors ────────────────
// NOTE: These corridors represent architectural reference models for hardware transit
// telemetry and custody verification research, not direct freight operations.
// Coordinates reflect the genuine international airport / cargo node positions.
export const COURIER_HUBS: CourierHub[] = [
  {
    name: 'New York Cargo Corridor',
    country: 'United States',
    region: 'North America',
    lat: 40.6413,
    lng: -73.7781, // JFK International Airport Cargo Zone
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Targeted Air Cargo & Regional Ground Carriers'],
    load: 85,
  },
  {
    name: 'London Heathrow Gateway',
    country: 'United Kingdom',
    region: 'Europe',
    lat: 51.47,
    lng: -0.4543, // LHR Cargo Terminal
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['European Air Freight & Overland Mesh'],
    load: 82,
  },
  {
    name: 'Frankfurt Central Logistics Node',
    country: 'Germany',
    region: 'Europe',
    lat: 50.0379,
    lng: 8.5622, // FRA Cargo City
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Central European Rail & Air Network'],
    load: 86,
  },
  {
    name: 'Paris Charles de Gaulle Node',
    country: 'France',
    region: 'Europe',
    lat: 49.0097,
    lng: 2.5479, // CDG Cargo Hub
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Western European Carrier Network'],
    load: 80,
  },
  {
    name: 'Madrid Barajas Freight Node',
    country: 'Spain',
    region: 'Europe',
    lat: 40.4839,
    lng: -3.568, // MAD Cargo
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Iberian Freight Transit Model'],
    load: 78,
  },
  {
    name: 'Milan Malpensa Cargo Node',
    country: 'Italy',
    region: 'Europe',
    lat: 45.6301,
    lng: 8.7255, // MXP Cargo City
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Southern European Transit Model'],
    load: 79,
  },
  {
    name: 'Tokyo Narita Freight Gateway',
    country: 'Japan',
    region: 'East Asia',
    lat: 35.772,
    lng: 140.3929, // NRT Air Cargo Zone
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Trans-Pacific Air Freight Interconnects'],
    load: 84,
  },
  {
    name: 'Seoul Incheon Logistics Node',
    country: 'South Korea',
    region: 'East Asia',
    lat: 37.4602,
    lng: 126.4407, // ICN Cargo Terminal
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['East Asian Express Transit Model'],
    load: 83,
  },
  {
    name: 'Shanghai Pudong Cargo Gateway',
    country: 'China',
    region: 'East Asia',
    lat: 31.1443,
    lng: 121.8083, // PVG Freight Complex
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Regional Air Cargo Interconnects'],
    load: 88,
  },
  {
    name: 'Mumbai International Freight Center',
    country: 'India',
    region: 'South Asia',
    lat: 19.0896,
    lng: 72.8656, // BOM Air Cargo Complex
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['South Asian Transit Network Model'],
    load: 82,
  },
  {
    name: 'Sydney Kingsford Gateway',
    country: 'Australia',
    region: 'Oceania',
    lat: -33.9399,
    lng: 151.1753, // SYD Freight Logistics Node
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Australasian Air Transit Model'],
    load: 78,
  },
  {
    name: 'São Paulo Viracopos Node',
    country: 'Brazil',
    region: 'South America',
    lat: -23.0074,
    lng: -47.1345, // VCP Air Cargo Terminal
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Latin American Inter-Hub Model'],
    load: 74,
  },
  {
    name: 'Toronto Pearson Cargo Node',
    country: 'Canada',
    region: 'North America',
    lat: 43.6777,
    lng: -79.6248, // YYZ Cargo West
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['North American Trans-Border Model'],
    load: 81,
  },
  {
    name: 'Singapore Changi Air Cargo Hub',
    country: 'Singapore',
    region: 'Southeast Asia',
    lat: 1.3644,
    lng: 103.9915, // SIN Airfreight Center
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['ASEAN Inter-Island & Air Transit Model'],
    load: 87,
  },
  {
    name: 'Dubai Al Maktoum Logistics Node',
    country: 'UAE',
    region: 'Middle East',
    lat: 24.896,
    lng: 55.1614, // DWC Logistics City
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Middle East Regional Cargo Hub Model'],
    load: 82,
  },
  {
    name: 'Johannesburg O.R. Tambo Facility',
    country: 'South Africa',
    region: 'Africa',
    lat: -26.1367,
    lng: 28.2411, // JNB Freight Terminal
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['Sub-Saharan Transit Corridor Model'],
    load: 72,
  },
  {
    name: 'Dhaka Shahjalal Cargo Gateway',
    country: 'Bangladesh',
    region: 'South Asia',
    lat: 23.8433,
    lng: 90.4049, // DAC Cargo Complex
    status: 'Reference Corridor',
    certifications: ['Modeled after GDP Principles', 'ISO 9001 Alignment'],
    partners: ['South Asian Regional Mesh Model'],
    load: 80,
  },
];

// ─── Logistics Systems Architecture Metrics ──────────────────

export const COURIER_METRICS: LogisticsKpi[] = [
  {
    label: 'Transit Corridors',
    value: '17 Corridors',
    description: 'International freight corridors modeled in systems research for hardware telemetry.',
  },
  {
    label: 'Chain of Custody',
    value: 'Cryptographic',
    description: 'Cryptographic milestone verification and tamper-evident tracking models for equipment in transit.',
  },
  {
    label: 'Hardware Transit',
    value: 'Specialized',
    description: 'Secure packaging and handling specifications engineered for sensitive servers and optical links.',
  },
  {
    label: 'Standard Alignment',
    value: 'GDP & ISO 9001',
    description: 'Operational alignment research targeting international good distribution practices.',
  },
];

// ─── Logistics Service Pillars ──────────────────────────────

export const COURIER_SERVICES: LogisticsService[] = [
  {
    title: 'Hardware Transit Architecture',
    tagline: 'Cryptographic Chain of Custody',
    description: 'Distribution architecture designed for secure hardware transit with cryptographic milestone verification.',
    features: [
      'Point-to-point transit tracking telemetry',
      'Cryptographic milestone verification models',
      'Handling specifications for sensitive electronics',
      'Integrated dispatch and receipt logging research',
    ],
  },
  {
    title: 'Customs Clearance Models',
    tagline: 'Cross-Border Regulatory Alignment',
    description: 'Regulatory compliance workflows leveraging regional customs standards and HS-code categorization.',
    features: [
      'Import/export documentation models',
      'Automated tariff and documentation categorization',
      'Regulatory compliance workflow alignment',
      'Multi-jurisdiction transit record keeping',
    ],
  },
  {
    title: 'Specialized Hardware Handling',
    tagline: 'Precision Climate & Security Care',
    description: 'Handling protocols engineered for high-value server nodes, sensitive optical components, and secure freight.',
    features: [
      'Climate-controlled container handling research',
      'Anti-static and vibration-damped hardware packaging',
      'Enterprise rack & server transit specifications',
      'Tamper-evident physical security verification',
    ],
  },
];
