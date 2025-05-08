/**
 * Building Configuration
 * This file contains all the building-specific content and configuration
 * that needs to be customized when creating a new instance of this template.
 */

const buildingConfig = {
  // Basic Information
  name: "BUILDING_NAME", // Example: "SOL Modern"
  location: {
    address: "BUILDING_ADDRESS", // Example: "50 E Fillmore St"
    neighborhood: "NEIGHBORHOOD", // Example: "Roosevelt Row"
    city: "CITY", // Example: "Phoenix"
    state: "STATE", // Example: "Arizona"
    zip: "ZIP_CODE", // Example: "85004"
  },
  
  // Property Details
  details: {
    units: 0, // Example: 747
    stories: 0, // Example: 25
    yearBuilt: 0, // Example: 2025 (projected)
    propertyType: "PROPERTY_TYPE", // Example: "Multifamily"
    propertyClass: "PROPERTY_CLASS", // Example: "Class A"
  },
  
  // Branding
  branding: {
    primaryColor: "#E57161", // Default coral accent
    secondaryColor: "#151617", // Default dark
    backgroundColor: "#FCFAF5", // Default cream
    borderColor: "#E8E3D9", // Default light beige
    textDarkColor: "#333333", // Default dark gray
    textLightColor: "#777777", // Default medium gray
    fontPrimary: "Montserrat", // Default font
    tagline: "TAGLINE", // Example: "LEASE-UP STRATEGY BLUEPRINT"
  },
  
  // Contact Information
  contact: {
    email: "CONTACT_EMAIL", // Example: "contact@example.com"
    phone: "CONTACT_PHONE", // Example: "(555) 123-4567"
    website: "WEBSITE_URL", // Example: "https://www.solmodern.com"
  },
  
  // Meta Information (for SEO)
  meta: {
    title: "META_TITLE", // Example: "SOL Modern – Lease-Up Strategy & Competitive Blueprint"
    description: "META_DESCRIPTION", // Example: "A comprehensive lease-up strategy and competitive blueprint for SOL Modern"
    ogTitle: "OG_TITLE", // Example: "SOL MODERN | THE BLUEPRINT"
    ogDescription: "OG_DESCRIPTION", // Example: "LEASE-UP STRATEGY BLUEPRINT"
  },
  
  // Market Information
  market: {
    competitiveSet: [
      // Example: { name: "The Stewart", address: "800 N Central Ave", units: 312 }
    ],
    targetDemographics: [
      // Example: { name: "Young Professionals", ageRange: "25-40", incomeRange: "$75K-120K" }
    ],
    keyAmenities: [
      // Example: "Rooftop Pool", "Fitness Center", "Co-Working Space"
    ],
  },
  
  // Property Specifications
  specifications: {
    unitMix: [
      // Example: { type: "Studio", count: 100, sizeSqFtMin: 500, sizeSqFtMax: 600 }
    ],
    amenities: [
      // Example: { name: "Pool", description: "Heated resort-style pool with cabanas" }
    ],
    finishes: [
      // Example: { category: "Kitchen", items: ["Quartz countertops", "Stainless steel appliances"] }
    ],
  },
  
  // Content Sections (Placeholder markers for content sections)
  content: {
    executiveSummary: "EXECUTIVE_SUMMARY_CONTENT",
    marketIntelligence: "MARKET_INTELLIGENCE_CONTENT",
    competitiveLandscape: "COMPETITIVE_LANDSCAPE_CONTENT",
    strategicOpportunities: "STRATEGIC_OPPORTUNITIES_CONTENT",
    pricingFramework: "PRICING_FRAMEWORK_CONTENT",
    goToMarketRoadmap: "GO_TO_MARKET_ROADMAP_CONTENT",
    opportunityMap: "OPPORTUNITY_MAP_CONTENT",
  },
  
  // Timeline
  timeline: {
    constructionStart: "CONSTRUCTION_START_DATE", // Example: "2023-06"
    constructionComplete: "CONSTRUCTION_COMPLETE_DATE", // Example: "2025-02"
    preLeasingStart: "PRE_LEASING_START_DATE", // Example: "2024-09"
    leaseUpPeriod: "LEASE_UP_PERIOD", // Example: "12 months"
  },
};

module.exports = buildingConfig;