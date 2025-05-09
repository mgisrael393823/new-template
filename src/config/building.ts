/**
 * Building Configuration
 * 
 * This file provides a validated wrapper around the building-config.js file.
 * It ensures that the configuration is valid and provides TypeScript types.
 */
import { validateCompleteConfig, ValidatedBuildingConfig } from './validators/building-config';
import rawBuildingConfig from '../../config/building-config';

/**
 * Validates the building configuration on import
 * Throws an error if the configuration is invalid
 */
function validateAndExportConfig(): ValidatedBuildingConfig {
  const validationResult = validateCompleteConfig(rawBuildingConfig);
  
  if (!validationResult.success) {
    console.error('Building configuration validation failed:');
    console.error(validationResult.error);
    
    if (process.env.NODE_ENV === 'development') {
      throw new Error('Building configuration validation failed. See console for details.');
    } else {
      // In production, we'll still use the config but log errors
      console.warn('Using invalid building configuration in production. This may cause issues.');
      return rawBuildingConfig as ValidatedBuildingConfig;
    }
  }
  
  return validationResult.data;
}

/**
 * The validated building configuration
 * This is the object that should be imported throughout the application
 */
export const buildingConfig = validateAndExportConfig();

/**
 * Provides easy access to commonly used configuration sections
 */
export const buildingInfo = {
  // Basic information
  name: buildingConfig.name,
  tagline: buildingConfig.branding.tagline,
  
  // Location helpers
  location: buildingConfig.location,
  fullAddress: `${buildingConfig.location.address}, ${buildingConfig.location.city}, ${buildingConfig.location.state} ${buildingConfig.location.zip}`,
  
  // Brand colors and styling
  colors: {
    primary: buildingConfig.branding.primaryColor,
    secondary: buildingConfig.branding.secondaryColor,
    background: buildingConfig.branding.backgroundColor,
    border: buildingConfig.branding.borderColor,
    textDark: buildingConfig.branding.textDarkColor,
    textLight: buildingConfig.branding.textLightColor,
  },
  
  // Property details
  details: buildingConfig.details,
  
  // Derived values - useful common calculations
  totalUnits: buildingConfig.details.units,
  avgUnitSize: buildingConfig.specifications.unitMix.reduce((sum, unit) => {
    const avgSize = (unit.sizeSqFtMin + unit.sizeSqFtMax) / 2;
    return sum + (avgSize * unit.count);
  }, 0) / buildingConfig.details.units,
  
  // Timeline helpers
  timeline: buildingConfig.timeline,
  getConstructionStartDate: () => new Date(`${buildingConfig.timeline.constructionStart}-01`),
  getConstructionCompleteDate: () => new Date(`${buildingConfig.timeline.constructionComplete}-01`),
  getPreLeasingStartDate: () => new Date(`${buildingConfig.timeline.preLeasingStart}-01`),
};

// Default export is the validated config
export default buildingConfig;