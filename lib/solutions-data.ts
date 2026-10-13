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
  totalStorage: number; // In TB (65000 = 65 PB)
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

export const DATA_CENTERS: DataCenterFacility[] = [
  {
    name: 'Jayapura Sovereign Facility',
    country: 'Indonesia',
    region: 'Papua / Southeast Asia',
    status: 'Operational',
    tier: 'Tier 3',
    certifications: ['Aligned with ISO 27001', 'SOC 2 Security Principles'],
    powerCapacity: 0.2,
    redundancy: '2N Power / N+1 Cooling',
    networkProviders: ['Telkom Indonesia', 'Indosat Ooredoo Hutchison', 'Regional Carrier Fiber'],
    load: 72,
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

// ─── 17 Global Courier Network Hubs ─────────────────────────

export const COURIER_HUBS: CourierHub[] = [
  {
    name: 'New York Hub',
    country: 'United States',
    region: 'North America',
    lat: 37.0902,
    lng: -95.7129,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['FedEx', 'UPS', 'USPS Direct'],
    load: 88,
  },
  {
    name: 'London Heathrow Gateway',
    country: 'United Kingdom',
    region: 'Europe',
    lat: 55.3781,
    lng: -3.436,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Royal Mail', 'DHL UK', 'DPD'],
    load: 85,
  },
  {
    name: 'Frankfurt Central Hub',
    country: 'Germany',
    region: 'Europe',
    lat: 51.1657,
    lng: 10.4515,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Deutsche Post', 'Hermes', 'GLS'],
    load: 87,
  },
  {
    name: 'Paris Charles de Gaulle Node',
    country: 'France',
    region: 'Europe',
    lat: 46.2276,
    lng: 2.2137,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['La Poste', 'Chronopost'],
    load: 82,
  },
  {
    name: 'Madrid Barajas Facility',
    country: 'Spain',
    region: 'Europe',
    lat: 40.4637,
    lng: -3.7492,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Correos Express', 'SEUR'],
    load: 79,
  },
  {
    name: 'Milan Malpensa Hub',
    country: 'Italy',
    region: 'Europe',
    lat: 41.8719,
    lng: 12.5674,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Poste Italiane', 'BRT'],
    load: 81,
  },
  {
    name: 'Tokyo Narita Hub',
    country: 'Japan',
    region: 'East Asia',
    lat: 36.2048,
    lng: 138.2529,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Yamato Transport', 'Sagawa Express', 'Japan Post'],
    load: 86,
  },
  {
    name: 'Seoul Incheon Logistics Center',
    country: 'South Korea',
    region: 'East Asia',
    lat: 35.9078,
    lng: 127.7669,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['CJ Logistics', 'Korea Post', 'Hanjin'],
    load: 84,
  },
  {
    name: 'Shanghai Pudong Hub',
    country: 'China',
    region: 'East Asia',
    lat: 35.8617,
    lng: 104.1954,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['SF Express', 'China Post', 'ZTO'],
    load: 91,
  },
  {
    name: 'Mumbai International Freight Center',
    country: 'India',
    region: 'South Asia',
    lat: 20.5937,
    lng: 78.9629,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Blue Dart', 'India Post', 'Delhivery'],
    load: 85,
  },
  {
    name: 'Sydney Kingsford Gateway',
    country: 'Australia',
    region: 'Oceania',
    lat: -25.2744,
    lng: 133.7751,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Australia Post', 'StarTrack', 'Toll'],
    load: 80,
  },
  {
    name: 'São Paulo Viracopos Node',
    country: 'Brazil',
    region: 'South America',
    lat: -14.235,
    lng: -51.9253,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Correios', 'Total Express', 'Jadlog'],
    load: 76,
  },
  {
    name: 'Toronto Pearson Hub',
    country: 'Canada',
    region: 'North America',
    lat: 56.1304,
    lng: -106.3468,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Canada Post', 'Purolator'],
    load: 83,
  },
  {
    name: 'Singapore Changi Air Cargo Hub',
    country: 'Singapore',
    region: 'Southeast Asia',
    lat: 1.3521,
    lng: 103.8198,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['SingPost', 'Ninja Van'],
    load: 89,
  },
  {
    name: 'Dubai Al Maktoum Logistics Hub',
    country: 'UAE',
    region: 'Middle East',
    lat: 23.4241,
    lng: 53.8478,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Emirates Post', 'Aramex'],
    load: 84,
  },
  {
    name: 'Johannesburg O.R. Tambo Facility',
    country: 'South Africa',
    region: 'Africa',
    lat: -30.5595,
    lng: 22.9375,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['South African Post Office', 'RAM', 'Dawn Wing'],
    load: 75,
  },
  {
    name: 'Dhaka Shahjalal Cargo Hub',
    country: 'Bangladesh',
    region: 'South Asia',
    lat: 23.685,
    lng: 90.3563,
    status: 'Active Hub',
    certifications: ['ISO 9001', 'GDP'],
    partners: ['Biman Cargo', 'SA Paribahan', 'Sundarban Courier'],
    load: 86,
  },
];

// ─── Logistics Systems Architecture Metrics ──────────────────

export const COURIER_METRICS: LogisticsKpi[] = [
  {
    label: 'Transit Corridors',
    value: '17 Corridors',
    description: 'Active partner logistics corridors and customs interconnects modeled in systems research.',
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
    description: 'Distribution architecture designed for secure hardware distribution with milestone verification.',
    features: [
      'Point-to-point transit tracking telemetry',
      'Real-time cryptographic verification',
      'Handling specifications for sensitive electronics',
      'Integrated dispatch and receipt logging',
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
