/**
 * Building Configuration
 * This file contains all the building-specific content and configuration
 * that needs to be customized when creating a new instance of this template.
 */

const buildingConfig = {
  // Basic Information
  name: "Aspen Heights", 
  location: {
    address: "250 Peachtree Street NE",
    neighborhood: "Downtown",
    city: "Atlanta",
    state: "Georgia",
    zip: "30303",
  },
  
  // Property Details
  details: {
    units: 324,
    stories: 22,
    yearBuilt: 2026, // projected
    propertyType: "Multifamily",
    propertyClass: "Class A",
  },
  
  // Branding
  branding: {
    primaryColor: "#3B7A57", // Forest green
    secondaryColor: "#151617", // Dark grey/black
    backgroundColor: "#FCFAF5", // Cream
    borderColor: "#E8E3D9", // Light beige
    textDarkColor: "#333333", // Dark gray
    textLightColor: "#777777", // Medium gray
    // Font options
    fontPrimary: "Montserrat, 'Montserrat Fallback', sans-serif", // Default body font
    fontHeadings: "Montserrat, 'Montserrat Fallback', sans-serif", // Font for headings
    tagline: "ELEVATED URBAN LIVING",
  },
  
  // Contact Information
  contact: {
    email: "leasing@aspenheightsatl.com",
    phone: "(404) 555-7890",
    website: "https://www.aspenheightsatl.com",
  },
  
  // Meta Information (for SEO)
  meta: {
    title: "Aspen Heights – Luxury Apartment Living in Downtown Atlanta",
    description: "A comprehensive marketing and lease-up strategy blueprint for Aspen Heights luxury apartments in Downtown Atlanta.",
    ogTitle: "ASPEN HEIGHTS | PROPERTY BLUEPRINT",
    ogDescription: "LUXURY APARTMENT LIVING IN DOWNTOWN ATLANTA",
  },
  
  // Market Information
  market: {
    competitiveSet: [
      { name: "The Novare", address: "300 Peachtree Street NE", units: 275 },
      { name: "Centennial Place", address: "125 Luckie St NW", units: 240 },
      { name: "The Georgian", address: "175 Forsyth St", units: 320 }
    ],
    targetDemographics: [
      { name: "Young Professionals", ageRange: "25-40", incomeRange: "$85K-150K" },
      { name: "Empty Nesters", ageRange: "55-70", incomeRange: "$100K+" },
      { name: "Medical Professionals", ageRange: "28-45", incomeRange: "$120K+" }
    ],
    keyAmenities: [
      "Rooftop Infinity Pool & Lounge",
      "24/7 Fitness Center with Peloton Bikes",
      "Co-Working Spaces & Conference Room",
      "Sky Lounge with Atlanta Skyline Views",
      "Pet Spa & Dog Run"
    ],
  },
  
  // Property Specifications
  specifications: {
    unitMix: [
      { type: "Studio", count: 64, sizeSqFtMin: 550, sizeSqFtMax: 650 },
      { type: "1 Bedroom", count: 120, sizeSqFtMin: 700, sizeSqFtMax: 850 },
      { type: "2 Bedroom", count: 98, sizeSqFtMin: 1050, sizeSqFtMax: 1250 },
      { type: "3 Bedroom", count: 42, sizeSqFtMin: 1400, sizeSqFtMax: 1650 }
    ],
    amenities: [
      { name: "Rooftop Infinity Pool", description: "Heated infinity-edge pool with panoramic city views and private cabanas" },
      { name: "Sky Lounge", description: "22nd floor lounge with demonstration kitchen, dining area, and outdoor terrace" },
      { name: "Fitness Center", description: "State-of-the-art fitness center with cardio equipment, free weights, and studio space" },
      { name: "Co-Working Space", description: "Private offices, conference room, and open work areas with high-speed internet" },
      { name: "Pet Spa", description: "Pet washing stations, grooming area, and fenced outdoor dog run" }
    ],
    finishes: [
      { category: "Kitchen", items: ["Quartz countertops", "Custom cabinetry", "Stainless steel appliances", "Gas ranges", "Wine refrigerators in select units"] },
      { category: "Bathroom", items: ["Porcelain tile flooring", "Glass-enclosed showers", "Dual vanities in select units", "Soaking tubs in select units"] },
      { category: "Flooring", items: ["Engineered hardwood in living areas", "Plush carpet in bedrooms", "Porcelain tile in bathrooms"] },
      { category: "Technology", items: ["Smart thermostats", "Keyless entry", "Built-in USB outlets", "Pre-wired for high-speed internet"] }
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
    constructionStart: "2023-09",
    constructionComplete: "2026-03",
    preLeasingStart: "2025-10",
    leaseUpPeriod: "14 months",
  },
};

module.exports = buildingConfig;