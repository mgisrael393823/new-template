/**
 * Building Configuration Type Definitions
 */

/**
 * Location information for the property
 */
export interface PropertyLocation {
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
}

/**
 * Physical details about the property
 */
export interface PropertyDetails {
  units: number;
  stories: number;
  yearBuilt: number;
  propertyType: string;
  propertyClass: string;
}

/**
 * Branding and visual identity information
 */
export interface PropertyBranding {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  borderColor: string;
  textDarkColor: string;
  textLightColor: string;
  fontPrimary: string;
  fontHeadings: string;
  tagline: string;
}

/**
 * Contact information for the property
 */
export interface PropertyContact {
  email: string;
  phone: string;
  website: string;
}

/**
 * Meta information for SEO
 */
export interface PropertyMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

/**
 * Competing property information
 */
export interface CompetitiveProperty {
  name: string;
  address: string;
  units: number;
  [key: string]: any;
}

/**
 * Target demographic group
 */
export interface TargetDemographic {
  name: string;
  ageRange: string;
  incomeRange: string;
  [key: string]: any;
}

/**
 * Market information
 */
export interface PropertyMarket {
  competitiveSet: CompetitiveProperty[];
  targetDemographics: TargetDemographic[];
  keyAmenities: string[];
}

/**
 * Unit information
 */
export interface UnitType {
  type: string;
  count: number;
  sizeSqFtMin: number;
  sizeSqFtMax: number;
  [key: string]: any;
}

/**
 * Amenity information
 */
export interface Amenity {
  name: string;
  description: string;
  [key: string]: any;
}

/**
 * Finishes information
 */
export interface FinishCategory {
  category: string;
  items: string[];
}

/**
 * Property specifications
 */
export interface PropertySpecifications {
  unitMix: UnitType[];
  amenities: Amenity[];
  finishes: FinishCategory[];
}

/**
 * Project timeline information
 */
export interface PropertyTimeline {
  constructionStart: string;
  constructionComplete: string;
  preLeasingStart: string;
  leaseUpPeriod: string;
}

/**
 * Complete building configuration
 */
export interface BuildingConfig {
  name: string;
  location: PropertyLocation;
  details: PropertyDetails;
  branding: PropertyBranding;
  contact: PropertyContact;
  meta: PropertyMeta;
  market: PropertyMarket;
  specifications: PropertySpecifications;
  timeline: PropertyTimeline;
}