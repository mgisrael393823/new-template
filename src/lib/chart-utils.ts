import { buildingConfig, buildingInfo } from '@/config/building';
import { formatCurrency, formatPercentage } from './utils';

// Types for chart data
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface ComparisonDataPoint {
  name: string;
  [key: string]: any;
}

export interface PriceDataPoint {
  name: string;
  price: number;
  sqft: number;
  pricePerSqft?: number;
  [key: string]: any;
}

export interface OccupancyDataPoint {
  date: string;
  occupancy: number;
  targetOccupancy?: number;
  rentalRate?: number;
}

export interface DemographicDataPoint {
  name: string;
  percentage: number;
}

// Chart configuration types
export interface ChartConfig {
  colors?: string[];
  aspectRatio?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  accessibleColors?: boolean;
}

/**
 * Get chart color palette based on property branding
 * @param count Number of colors needed
 * @param accessibleColors Whether to use accessible color variations
 * @returns Array of colors
 */
export function getChartColors(count: number = 5, accessibleColors: boolean = false): string[] {
  const { primaryColor, secondaryColor } = buildingConfig.branding;
  
  // Base colors
  const baseColors = [
    primaryColor,
    secondaryColor,
    shadeColor(primaryColor, 0.2),  // Lighter shade of primary
    shadeColor(secondaryColor, 0.2), // Lighter shade of secondary
    shadeColor(primaryColor, -0.2),  // Darker shade of primary
  ];
  
  // Generate additional colors if needed
  if (count > baseColors.length) {
    for (let i = baseColors.length; i < count; i++) {
      // Alternate between primary and secondary color variations
      const baseColor = i % 2 === 0 ? primaryColor : secondaryColor;
      const shade = ((i % 6) - 3) / 10; // Generates shades from -0.3 to +0.3
      baseColors.push(shadeColor(baseColor, shade));
    }
  }
  
  // If accessible colors are needed, ensure higher contrast
  if (accessibleColors) {
    return baseColors.map((color, index) => {
      // Increase contrast for better accessibility
      return index === 0 ? color : ensureContrast(color, baseColors[0], 4.5);
    });
  }
  
  return baseColors.slice(0, count);
}

/**
 * Adjust the brightness of a color
 * @param color Hex color code
 * @param percent Percentage to lighten or darken (-1.0 to 1.0)
 * @returns Modified hex color
 */
export function shadeColor(color: string, percent: number): string {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  
  const R = f >> 16;
  const G = (f >> 8) & 0x00FF;
  const B = f & 0x0000FF;
  
  return "#" + (
    0x1000000 + 
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 + 
    (Math.round((t - B) * p) + B)
  ).toString(16).slice(1);
}

/**
 * Ensure a color has sufficient contrast with another color
 * @param color Color to adjust
 * @param bgColor Background color to compare against
 * @param targetRatio Target contrast ratio (WCAG recommends 4.5:1 for normal text)
 * @returns Adjusted color with sufficient contrast
 */
export function ensureContrast(color: string, bgColor: string, targetRatio: number = 4.5): string {
  // Simple contrast function based on relative luminance
  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const r1 = r / 255;
    const g1 = g / 255;
    const b1 = b / 255;
    
    const R = r1 <= 0.03928 ? r1 / 12.92 : Math.pow((r1 + 0.055) / 1.055, 2.4);
    const G = g1 <= 0.03928 ? g1 / 12.92 : Math.pow((g1 + 0.055) / 1.055, 2.4);
    const B = b1 <= 0.03928 ? b1 / 12.92 : Math.pow((b1 + 0.055) / 1.055, 2.4);
    
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };
  
  const getContrast = (color1: string, color2: string) => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };
  
  let adjustedColor = color;
  let currentContrast = getContrast(adjustedColor, bgColor);
  let iterations = 0;
  const maxIterations = 10;
  
  // Iteratively adjust the color to increase contrast
  while (currentContrast < targetRatio && iterations < maxIterations) {
    const bgLuminance = getLuminance(bgColor);
    if (bgLuminance > 0.5) {
      // If background is light, darken the color
      adjustedColor = shadeColor(adjustedColor, -0.1);
    } else {
      // If background is dark, lighten the color
      adjustedColor = shadeColor(adjustedColor, 0.1);
    }
    currentContrast = getContrast(adjustedColor, bgColor);
    iterations++;
  }
  
  return adjustedColor;
}

/**
 * Format number as currency with specific options
 * @param value Number to format
 * @param includeCents Whether to include cents
 * @returns Formatted currency string
 */
export function formatChartCurrency(value: number, includeCents: boolean = false): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: includeCents ? 2 : 0,
    maximumFractionDigits: includeCents ? 2 : 0,
  }).format(value);
}

/**
 * Format as compact number (1K, 2M, etc.)
 * @param value Number to format
 * @returns Formatted compact number
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

/**
 * Transform raw unit mix data for chart visualization
 * @returns Formatted unit mix data
 */
export function transformUnitMixData(): ChartDataPoint[] {
  const { unitMix } = buildingConfig.specifications;
  
  return unitMix.map(unit => ({
    name: unit.type,
    value: unit.count,
    percentage: (unit.count / buildingConfig.details.units) * 100,
    sqftRange: `${unit.sizeSqFtMin}-${unit.sizeSqFtMax}`,
  }));
}

/**
 * Transform competitive property data for comparison
 * @param includeThis Whether to include this property in comparison
 * @returns Comparison data ready for visualization
 */
export function transformCompetitiveData(includeThis: boolean = true): ComparisonDataPoint[] {
  const { competitiveSet } = buildingConfig.market;
  
  // Create array of competitive properties
  const competitiveData = competitiveSet.map(property => ({
    name: property.name,
    units: property.units,
    address: property.address,
  }));
  
  // Add current property if requested
  if (includeThis) {
    competitiveData.unshift({
      name: buildingConfig.name,
      units: buildingConfig.details.units,
      address: buildingConfig.location.address,
      isTarget: true, // Flag for highlighting in visualizations
    });
  }
  
  return competitiveData;
}

/**
 * Transform demographic data for visualization
 * @returns Demographic data formatted for charts
 */
export function transformDemographicData(): DemographicDataPoint[] {
  const { targetDemographics } = buildingConfig.market;
  
  // If there's no percentage data, create a simple equal distribution
  return targetDemographics.map((demographic, index, array) => ({
    name: demographic.name,
    percentage: 100 / array.length, // Equal distribution if no real data
    ageRange: demographic.ageRange,
    incomeRange: demographic.incomeRange,
  }));
}

/**
 * Create example occupancy and rental rate data
 * This would typically come from real data in a production environment
 * @returns Sample occupancy and rental rate data
 */
export function createSampleOccupancyData(): OccupancyDataPoint[] {
  const { preLeasingStart, leaseUpPeriod } = buildingConfig.timeline;
  
  // Convert leaseUpPeriod from string to number of months
  const leaseUpMonths = parseInt(leaseUpPeriod, 10) || 14;
  
  // Parse the pre-leasing start date
  const startDate = new Date(preLeasingStart);
  
  // Generate monthly data points for the lease-up period
  const dataPoints: OccupancyDataPoint[] = [];
  
  for (let i = 0; i <= leaseUpMonths; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + i);
    
    // Create a realistic curve of increasing occupancy
    // S-curve: slow start, faster middle, slower end
    let occupancyRate;
    if (i === 0) {
      occupancyRate = 0;
    } else if (i < leaseUpMonths / 3) {
      // Initial slow growth
      occupancyRate = (i / leaseUpMonths) * 25;
    } else if (i < 2 * leaseUpMonths / 3) {
      // Faster middle growth
      occupancyRate = 25 + ((i - leaseUpMonths / 3) / (leaseUpMonths / 3)) * 50;
    } else {
      // Slower final approach to stabilization
      occupancyRate = 75 + ((i - 2 * leaseUpMonths / 3) / (leaseUpMonths / 3)) * 20;
    }
    
    // Cap at 95% for realistic stabilized occupancy
    occupancyRate = Math.min(occupancyRate, 95);
    
    // Add some small random variation to make the curve look more natural
    occupancyRate += (Math.random() * 2 - 1);
    
    // Example target line that increases over time
    const targetOccupancy = Math.min(10 + (i / leaseUpMonths) * 85, 95);
    
    // Sample rental rate data - typically increases as occupancy increases
    // Start at $2.50/sqft and increase to $2.85/sqft at stabilization
    const baseRate = 2.50;
    const maxRate = 2.85;
    const rentalRate = baseRate + ((occupancyRate / 95) * (maxRate - baseRate));
    
    dataPoints.push({
      date: currentDate.toISOString().substring(0, 7), // YYYY-MM format
      occupancy: occupancyRate,
      targetOccupancy,
      rentalRate,
    });
  }
  
  return dataPoints;
}

/**
 * Calculate price per square foot data from unit mix
 * @returns Price per square foot data for visualization
 */
export function calculatePricePerSqFtData(): PriceDataPoint[] {
  const { unitMix } = buildingConfig.specifications;
  
  // Sample base price points - in real data, these would come from actual pricing
  const basePrices = {
    "Studio": 1500,
    "1 Bedroom": 1850, 
    "2 Bedroom": 2500,
    "3 Bedroom": 3200
  };
  
  return unitMix.map(unit => {
    const basePrice = basePrices[unit.type as keyof typeof basePrices] || 0;
    const avgSqFt = (unit.sizeSqFtMin + unit.sizeSqFtMax) / 2;
    const pricePerSqFt = basePrice / avgSqFt;
    
    return {
      name: unit.type,
      price: basePrice,
      sqft: avgSqFt,
      pricePerSqft: pricePerSqFt,
      count: unit.count
    };
  });
}

/**
 * Transform amenity data for comparison visualization
 * @returns Formatted amenity comparison data
 */
export function transformAmenityComparisonData(): any[] {
  const { amenities } = buildingConfig.specifications;
  const { competitiveSet } = buildingConfig.market;
  
  // Create a matrix of properties and their amenities
  // In real implementation, this would come from actual competitive data
  
  // Generate sample amenity data for competitive properties
  const amenityMatrix = [];
  
  // First, add our property
  const propertyAmenities = {
    property: buildingConfig.name,
    isTarget: true
  };
  
  // Add all amenities with "true" value
  amenities.forEach(amenity => {
    propertyAmenities[amenity.name.toLowerCase().replace(/\s+/g, '_')] = true;
  });
  
  amenityMatrix.push(propertyAmenities);
  
  // Add competitive properties with some amenities
  competitiveSet.forEach(property => {
    const compProperty = {
      property: property.name,
      isTarget: false
    };
    
    // Randomly assign amenities to competitive properties
    // In real implementation, this would use actual data
    amenities.forEach(amenity => {
      const amenityKey = amenity.name.toLowerCase().replace(/\s+/g, '_');
      compProperty[amenityKey] = Math.random() > 0.4; // 60% chance of having the amenity
    });
    
    amenityMatrix.push(compProperty);
  });
  
  return amenityMatrix;
}

/**
 * Get accessible alternate text for a chart
 * @param chartType Type of chart
 * @param data Chart data
 * @returns String describing the chart for screen readers
 */
export function getAccessibleAltText(chartType: string, data: any[]): string {
  switch(chartType) {
    case 'unitMix':
      return `Unit mix breakdown: ${data.map(item => `${item.value} ${item.name} units (${item.percentage.toFixed(1)}%)`).join(', ')}`;
    
    case 'competitive':
      return `Competitive property comparison: ${data.map(item => `${item.name}: ${item.units} units`).join(', ')}`;
    
    case 'demographic':
      return `Target demographic breakdown: ${data.map(item => `${item.name}: ${item.percentage.toFixed(1)}%`).join(', ')}`;
    
    case 'occupancy':
      // Format dates more readably
      return `Occupancy trend from ${new Date(data[0].date).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})} to ${new Date(data[data.length-1].date).toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}, starting at ${data[0].occupancy.toFixed(1)}% and ending at ${data[data.length-1].occupancy.toFixed(1)}%`;
    
    case 'pricePerSqft':
      return `Price per square foot analysis: ${data.map(item => `${item.name}: $${item.pricePerSqft.toFixed(2)} per square foot, average unit size ${item.sqft} sq ft`).join(', ')}`;
    
    case 'amenity':
      return `Amenity comparison matrix across ${data.length} properties, comparing ${Object.keys(data[0]).filter(key => key !== 'property' && key !== 'isTarget').length} amenities`;
    
    default:
      return 'Chart showing property data visualization';
  }
}

/**
 * Convert chart data to accessible table format
 * @param data Chart data
 * @param columns Column definitions
 * @returns Formatted table data for accessible alternative
 */
export function convertToTableData(data: any[], columns: {key: string, label: string, format?: (val: any) => string}[]): {
  headers: string[];
  rows: any[][];
} {
  const headers = columns.map(col => col.label);
  const rows = data.map(item => {
    return columns.map(col => {
      const value = item[col.key];
      return col.format ? col.format(value) : value;
    });
  });
  
  return { headers, rows };
}