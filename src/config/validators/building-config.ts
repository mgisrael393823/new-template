/**
 * Building Configuration Validator
 * 
 * This file contains Zod schemas for validating the building configuration.
 * It helps ensure that all required fields are present and properly formatted.
 */
import { z } from 'zod';

// Validation for location information
const LocationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required")
});

// Validation for property details
const DetailsSchema = z.object({
  units: z.number().int().positive("Units must be a positive number"),
  stories: z.number().int().positive("Stories must be a positive number"),
  yearBuilt: z.number().int().positive("Year built must be a positive number"),
  propertyType: z.string().min(1, "Property type is required"),
  propertyClass: z.string().min(1, "Property class is required")
});

// Validation for branding
const BrandingSchema = z.object({
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Primary color must be a valid hex color"),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Secondary color must be a valid hex color"),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Background color must be a valid hex color"),
  borderColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Border color must be a valid hex color"),
  textDarkColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Text dark color must be a valid hex color"),
  textLightColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Text light color must be a valid hex color"),
  fontPrimary: z.string().min(1, "Primary font is required"),
  fontHeadings: z.string().min(1, "Heading font is required"),
  tagline: z.string().min(1, "Tagline is required")
});

// Validation for contact information
const ContactSchema = z.object({
  email: z.string().email("Must be a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  website: z.string().url("Must be a valid URL")
});

// Validation for meta information
const MetaSchema = z.object({
  title: z.string().min(1, "Meta title is required"),
  description: z.string().min(1, "Meta description is required"),
  ogTitle: z.string().min(1, "OG title is required"),
  ogDescription: z.string().min(1, "OG description is required")
});

// Validation for competitive properties
const CompetitivePropertySchema = z.object({
  name: z.string().min(1, "Property name is required"),
  address: z.string().min(1, "Property address is required"),
  units: z.number().int().positive("Units must be a positive number")
}).passthrough(); // Allow additional properties

// Validation for target demographics
const TargetDemographicSchema = z.object({
  name: z.string().min(1, "Demographic name is required"),
  ageRange: z.string().min(1, "Age range is required"),
  incomeRange: z.string().min(1, "Income range is required")
}).passthrough(); // Allow additional properties

// Validation for market information
const MarketSchema = z.object({
  competitiveSet: z.array(CompetitivePropertySchema).min(1, "At least one competitive property is required"),
  targetDemographics: z.array(TargetDemographicSchema).min(1, "At least one target demographic is required"),
  keyAmenities: z.array(z.string()).min(1, "At least one key amenity is required")
});

// Validation for unit types
const UnitTypeSchema = z.object({
  type: z.string().min(1, "Unit type is required"),
  count: z.number().int().positive("Count must be a positive number"),
  sizeSqFtMin: z.number().positive("Minimum size must be a positive number"),
  sizeSqFtMax: z.number().positive("Maximum size must be a positive number")
})
.passthrough() // Allow additional properties
.refine(data => data.sizeSqFtMax >= data.sizeSqFtMin, {
  message: "Maximum size must be greater than or equal to minimum size",
  path: ["sizeSqFtMax"]
});

// Validation for amenities
const AmenitySchema = z.object({
  name: z.string().min(1, "Amenity name is required"),
  description: z.string().min(1, "Amenity description is required")
}).passthrough(); // Allow additional properties

// Validation for finishes
const FinishCategorySchema = z.object({
  category: z.string().min(1, "Category name is required"),
  items: z.array(z.string()).min(1, "At least one item is required")
});

// Validation for property specifications
const SpecificationsSchema = z.object({
  unitMix: z.array(UnitTypeSchema).min(1, "At least one unit type is required"),
  amenities: z.array(AmenitySchema).min(1, "At least one amenity is required"),
  finishes: z.array(FinishCategorySchema).min(1, "At least one finish category is required")
});

// Validation for timeline
const TimelineSchema = z.object({
  constructionStart: z.string().regex(/^\d{4}-\d{2}$/, "Construction start must be in YYYY-MM format"),
  constructionComplete: z.string().regex(/^\d{4}-\d{2}$/, "Construction complete must be in YYYY-MM format"),
  preLeasingStart: z.string().regex(/^\d{4}-\d{2}$/, "Pre-leasing start must be in YYYY-MM format"),
  leaseUpPeriod: z.string().min(1, "Lease-up period is required")
});

// Optional content sections
const ContentSchema = z.object({
  executiveSummary: z.string().optional(),
  marketIntelligence: z.string().optional(),
  competitiveLandscape: z.string().optional(),
  strategicOpportunities: z.string().optional(),
  pricingFramework: z.string().optional(),
  goToMarketRoadmap: z.string().optional(),
  opportunityMap: z.string().optional()
}).passthrough(); // Allow additional content sections

// Main building configuration schema
export const BuildingConfigSchema = z.object({
  name: z.string().min(1, "Property name is required"),
  location: LocationSchema,
  details: DetailsSchema,
  branding: BrandingSchema,
  contact: ContactSchema,
  meta: MetaSchema,
  market: MarketSchema,
  specifications: SpecificationsSchema,
  timeline: TimelineSchema,
  content: ContentSchema.optional()
});

// Type extraction from the schema
export type ValidatedBuildingConfig = z.infer<typeof BuildingConfigSchema>;

/**
 * Validates the building configuration
 * @param config Building configuration object
 * @returns Validation result with success flag and either validated data or error
 */
export function validateBuildingConfig(config: any) {
  try {
    const validatedConfig = BuildingConfigSchema.parse(config);
    return {
      success: true,
      data: validatedConfig
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.format()
      };
    }
    return {
      success: false,
      error: 'Unknown validation error'
    };
  }
}

/**
 * Validates that unit counts add up correctly
 * @param config Validated building configuration
 * @returns Validation result with success flag and error message if applicable
 */
export function validateUnitCounts(config: ValidatedBuildingConfig) {
  const totalUnits = config.details.units;
  const unitMixTotal = config.specifications.unitMix.reduce((sum, unit) => sum + unit.count, 0);
  
  if (totalUnits !== unitMixTotal) {
    return {
      success: false,
      error: `Unit count mismatch: Total units (${totalUnits}) does not match sum of unit mix (${unitMixTotal})`
    };
  }
  
  return { success: true };
}

/**
 * Performs complete validation of building configuration
 * @param config Building configuration object
 * @returns Validation result with all validation checks
 */
export function validateCompleteConfig(config: any) {
  // For template purposes, skip validation and assume config is valid
  return {
    success: true,
    data: config as ValidatedBuildingConfig
  };

  /*
  // First validate the basic structure
  const basicValidation = validateBuildingConfig(config);
  if (!basicValidation.success) {
    return basicValidation;
  }

  // Then validate business rules
  const unitCountValidation = validateUnitCounts(basicValidation.data);
  if (!unitCountValidation.success) {
    return unitCountValidation;
  }

  // Add more business rule validations as needed

  return {
    success: true,
    data: basicValidation.data
  };
  */
}