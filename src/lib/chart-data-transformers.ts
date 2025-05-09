import buildingConfig from '../../config/building-config';
import { formatCurrency, formatPercentage } from './utils';
import {
  ChartDataPoint,
  ComparisonDataPoint,
  PriceDataPoint,
  OccupancyDataPoint,
  DemographicDataPoint
} from './chart-utils';

/**
 * Transform building configuration data for charts and visualizations
 */

/**
 * Create full dataset for property visualization
 * @returns All transformed datasets needed for property visualizations
 */
export function getPropertyVisualizationData() {
  return {
    unitMix: getUnitMixData(),
    competitive: getCompetitiveData(),
    demographics: getDemographicsData(),
    pricingAnalysis: getPricingAnalysisData(),
    occupancyTrend: getOccupancyTrendData(),
    amenityComparison: getAmenityComparisonData()
  };
}

/**
 * Get unit mix data for charts
 * @returns Transformed unit mix data
 */
export function getUnitMixData(): ChartDataPoint[] {
  const { unitMix } = buildingConfig.specifications;
  const totalUnits = buildingConfig.details.units;
  
  // Transform the unit mix data
  return unitMix.map(unit => {
    const percentage = (unit.count / totalUnits) * 100;
    return {
      name: unit.type,
      value: unit.count,
      percentage,
      formattedPercentage: formatPercentage(percentage),
      sqftRange: `${unit.sizeSqFtMin}-${unit.sizeSqFtMax}`,
      avgSqft: (unit.sizeSqFtMin + unit.sizeSqFtMax) / 2
    };
  });
}

/**
 * Get competitive property data for comparison charts
 * @param includeThis Whether to include current property
 * @returns Transformed competitive property data
 */
export function getCompetitiveData(includeThis: boolean = true): ComparisonDataPoint[] {
  const { competitiveSet } = buildingConfig.market;
  
  // Create competitor data objects
  const competitiveData = competitiveSet.map(property => ({
    name: property.name,
    units: property.units,
    address: property.address,
    isTarget: false
  }));
  
  // Add current property if requested
  if (includeThis) {
    competitiveData.unshift({
      name: buildingConfig.name,
      units: buildingConfig.details.units,
      address: buildingConfig.location.address,
      isTarget: true // Flag for highlighting in visualizations
    });
  }
  
  return competitiveData;
}

/**
 * Get demographic data for pie/donut charts
 * @returns Transformed demographic data
 */
export function getDemographicsData(): DemographicDataPoint[] {
  const { targetDemographics } = buildingConfig.market;
  
  // In a real application, we'd have actual demographic distribution percentages
  // Here we're creating reasonable estimates
  
  // First calculate total to normalize percentages
  const total = targetDemographics.length;
  
  // With real data, we might do something like:
  // const total = targetDemographics.reduce((sum, demo) => sum + demo.percentage, 0);
  
  return targetDemographics.map((demographic, index) => {
    // In absence of real percentage data, allocate percentages
    // Here we're doing a simple distribution, but in real data
    // we'd use actual percentages
    const percentage = 100 / total;
    
    return {
      name: demographic.name,
      percentage,
      formattedPercentage: formatPercentage(percentage),
      ageRange: demographic.ageRange,
      incomeRange: demographic.incomeRange,
      // With more robust data we might include:
      // colorIndex: index, // For consistent coloring
      // id: demographic.id,
    };
  });
}

/**
 * Get pricing analysis data for charts
 * @returns Transformed pricing data
 */
export function getPricingAnalysisData(): PriceDataPoint[] {
  const { unitMix } = buildingConfig.specifications;
  
  // In a real app, these would come from actual unit pricing
  // Here, we're using sample pricing to demonstrate
  
  // Create base price points that reasonably reflect market rates
  // For a real app, this would be replaced with actual pricing data
  const basePrice = {
    "Studio": 1500,
    "1 Bedroom": 1850, 
    "2 Bedroom": 2500,
    "3 Bedroom": 3200
  };
  
  return unitMix.map(unit => {
    const typeName = unit.type as keyof typeof basePrice;
    const price = basePrice[typeName] || 0;
    const avgSqFt = (unit.sizeSqFtMin + unit.sizeSqFtMax) / 2;
    const pricePerSqFt = price / avgSqFt;
    
    return {
      name: unit.type,
      price,
      formattedPrice: formatCurrency(price),
      sqft: avgSqFt,
      pricePerSqft: pricePerSqFt,
      formattedPricePerSqft: `$${pricePerSqFt.toFixed(2)}`,
      count: unit.count,
      sizeSqFtMin: unit.sizeSqFtMin,
      sizeSqFtMax: unit.sizeSqFtMax
    };
  });
}

/**
 * Get occupancy trend data for line charts
 * @returns Sample occupancy and rental rate trends
 */
export function getOccupancyTrendData(): OccupancyDataPoint[] {
  const { preLeasingStart, leaseUpPeriod } = buildingConfig.timeline;
  
  // Parse the lease-up period from the configuration
  const leaseUpMonths = parseInt(leaseUpPeriod, 10) || 14;
  
  // Parse the pre-leasing start date
  const startDate = new Date(preLeasingStart);
  
  // Generate monthly data points for the lease-up period
  const dataPoints: OccupancyDataPoint[] = [];
  
  for (let i = 0; i <= leaseUpMonths; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + i);
    
    const dateStr = currentDate.toISOString().substring(0, 7); // YYYY-MM format
    
    // Create a realistic S-curve for increasing occupancy
    let occupancy;
    if (i === 0) {
      occupancy = 0;
    } else if (i < leaseUpMonths / 3) {
      // Initial slow growth
      occupancy = (i / leaseUpMonths) * 25;
    } else if (i < 2 * leaseUpMonths / 3) {
      // Faster middle growth
      occupancy = 25 + ((i - leaseUpMonths / 3) / (leaseUpMonths / 3)) * 50;
    } else {
      // Slower final approach to stabilization
      occupancy = 75 + ((i - 2 * leaseUpMonths / 3) / (leaseUpMonths / 3)) * 20;
    }
    
    // Cap at 95% for realistic stabilized occupancy
    occupancy = Math.min(occupancy, 95);
    
    // Add small random variation
    occupancy += (Math.random() * 2 - 1);
    occupancy = Math.max(0, Math.min(occupancy, 95));
    
    // Example target line
    const targetOccupancy = Math.min(10 + (i / leaseUpMonths) * 85, 95);
    
    // Sample rental rate data that increases with occupancy
    // Rental rate typically increases as occupancy increases
    const baseRate = 2.50;
    const maxRate = 2.85;
    const rentalRate = baseRate + ((occupancy / 95) * (maxRate - baseRate));
    
    dataPoints.push({
      date: dateStr,
      formattedDate: new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      }),
      occupancy,
      formattedOccupancy: formatPercentage(occupancy),
      targetOccupancy,
      formattedTargetOccupancy: formatPercentage(targetOccupancy),
      rentalRate,
      formattedRentalRate: `$${rentalRate.toFixed(2)}`
    });
  }
  
  return dataPoints;
}

/**
 * Get amenity comparison data for matrix visualization
 * @returns Transformed amenity comparison data
 */
export function getAmenityComparisonData(): {
  matrix: Array<{
    property: string;
    isTarget: boolean;
    [key: string]: boolean | string;
  }>;
  amenityNames: Array<{
    key: string;
    displayName: string;
  }>;
} {
  const { amenities } = buildingConfig.specifications;
  const { competitiveSet } = buildingConfig.market;
  
  // Get list of all amenity names to use as columns
  const amenityNames = amenities.map(amenity => ({
    key: amenity.name.toLowerCase().replace(/\s+/g, '_'),
    displayName: amenity.name
  }));
  
  // Create matrix rows with our property first
  const amenityMatrix = [];
  
  // Add our property
  const propertyAmenities = {
    property: buildingConfig.name,
    isTarget: true
  };
  
  // Our property has all amenities
  amenityNames.forEach(amenity => {
    propertyAmenities[amenity.key] = true;
  });
  
  amenityMatrix.push(propertyAmenities);
  
  // Add competitive properties with some amenities
  competitiveSet.forEach(property => {
    const compProperty = {
      property: property.name,
      isTarget: false
    };
    
    // In a real app, this would use actual competitive data
    // Here we're generating reasonable sample data
    amenityNames.forEach(amenity => {
      // 60% chance of having the amenity
      compProperty[amenity.key] = Math.random() > 0.4;
    });
    
    amenityMatrix.push(compProperty);
  });
  
  return {
    matrix: amenityMatrix,
    amenityNames: amenityNames
  };
}