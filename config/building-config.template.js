/**
 * Building Configuration Template
 * This file contains all the building-specific content and configuration
 * that needs to be customized when creating a new instance of this template.
 */

const buildingConfig = {
  // Basic Information
  name: "PROPERTY_NAME", 
  location: {
    address: "STREET_ADDRESS",
    neighborhood: "NEIGHBORHOOD",
    city: "CITY",
    state: "STATE",
    zip: "ZIP_CODE",
  },
  
  // Property Details
  details: {
    units: 0,
    stories: 0,
    yearBuilt: 0, // use projected year for pre-construction
    propertyType: "PROPERTY_TYPE", // e.g., "Multifamily", "Mixed-Use", "Student Housing"
    propertyClass: "PROPERTY_CLASS", // e.g., "Class A", "Class B+"
  },
  
  // Branding
  branding: {
    primaryColor: "#3B7A57", // Default color - change to match property branding
    secondaryColor: "#151617", // Default dark color
    backgroundColor: "#FCFAF5", // Default background color
    borderColor: "#E8E3D9", // Default border color
    textDarkColor: "#333333", // Default dark text
    textLightColor: "#777777", // Default light text
    // Font options: 
    // - "Montserrat, 'Montserrat Fallback', sans-serif" (primary font)
    // - "'Atlassian Sans', 'Montserrat Fallback', sans-serif" (secondary font)
    // - Add custom fonts in globals.css and tailwind.config.ts
    fontPrimary: "Montserrat, 'Montserrat Fallback', sans-serif", // Default font
    fontHeadings: "Montserrat, 'Montserrat Fallback', sans-serif", // Font for headings
    tagline: "PROPERTY_TAGLINE", // e.g., "ELEVATED URBAN LIVING"
  },
  
  // Contact Information
  contact: {
    email: "CONTACT_EMAIL",
    phone: "CONTACT_PHONE",
    website: "WEBSITE_URL",
  },
  
  // Meta Information (for SEO)
  meta: {
    title: "META_TITLE", // e.g., "Property Name – Luxury Apartments in City"
    description: "META_DESCRIPTION", // Brief property description for SEO
    ogTitle: "OG_TITLE", // Title for social sharing
    ogDescription: "OG_DESCRIPTION", // Description for social sharing
  },
  
  // Market Information
  market: {
    competitiveSet: [
      // Add competing properties - example:
      // { name: "Competitor Name", address: "123 Main St", units: 200 }
    ],
    targetDemographics: [
      // Add target demographic groups - example:
      // { name: "Young Professionals", ageRange: "25-40", incomeRange: "$75K-120K" }
    ],
    keyAmenities: [
      // List key amenities - example:
      // "Rooftop Pool", "Fitness Center", "Co-Working Space"
    ],
  },
  
  // Property Specifications
  specifications: {
    unitMix: [
      // Add unit mix details - example:
      // { type: "Studio", count: 50, sizeSqFtMin: 500, sizeSqFtMax: 600 }
    ],
    amenities: [
      // Add detailed amenity descriptions - example:
      // { name: "Pool", description: "Heated resort-style pool with cabanas" }
    ],
    finishes: [
      // Add finish details by category - example:
      // { category: "Kitchen", items: ["Quartz countertops", "Stainless steel appliances"] }
    ],
  },
  
  // Timeline
  timeline: {
    constructionStart: "YYYY-MM",
    constructionComplete: "YYYY-MM",
    preLeasingStart: "YYYY-MM",
    leaseUpPeriod: "LEASE_UP_PERIOD", // e.g., "12 months"
  },
};

module.exports = buildingConfig;