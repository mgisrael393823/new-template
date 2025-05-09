import React from 'react';
import BaseChart from './BaseChart';
import { getAmenityComparisonData } from '@/lib/chart-data-transformers';
import buildingConfig from '../../../../config/building-config';
import useMobile from '@/hooks/use-mobile';
import { Check, X } from 'lucide-react';

interface AmenityComparisonMatrixProps {
  title?: string;
  description?: string;
  data?: {
    matrix: any[];
    amenityNames: { key: string; displayName: string }[];
  };
  height?: number;
  showAccessibleTable?: boolean;
  highlightTarget?: boolean;
  useIcons?: boolean;
}

export default function AmenityComparisonMatrix({
  title = 'Amenity Comparison',
  description = 'Comparing amenities with competitive properties',
  data,
  height = 350,
  showAccessibleTable = true, // Default to true as this is naturally a table
  highlightTarget = true,
  useIcons = true
}: AmenityComparisonMatrixProps) {
  const isMobile = useMobile();
  
  // Use provided data or get from data transformer
  const amenityData = data || getAmenityComparisonData();
  const { matrix, amenityNames } = amenityData;
  
  // Format data for accessible table (already in table format)
  const tableData = {
    headers: ['Property', ...amenityNames.map(a => a.displayName)],
    rows: matrix.map(property => [
      property.property,
      ...amenityNames.map(amenity => property[amenity.key] ? '✓' : '✗')
    ])
  };
  
  // If on mobile, we need to adjust the display to be more compact
  const displayMatrix = () => {
    if (isMobile) {
      return (
        <div className="overflow-auto max-h-[400px]">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-opacity-10" style={{ backgroundColor: buildingConfig.branding.primaryColor }}>
                <th 
                  className="py-2 px-3 text-left font-semibold sticky top-0 z-10"
                  style={{ 
                    backgroundColor: buildingConfig.branding.backgroundColor,
                    color: buildingConfig.branding.textDarkColor
                  }}
                >
                  Property
                </th>
                <th 
                  className="py-2 px-3 text-left font-semibold sticky top-0 z-10"
                  style={{ 
                    backgroundColor: buildingConfig.branding.backgroundColor,
                    color: buildingConfig.branding.textDarkColor
                  }}
                >
                  Amenity
                </th>
                <th 
                  className="py-2 px-3 text-center font-semibold sticky top-0 z-10"
                  style={{ 
                    backgroundColor: buildingConfig.branding.backgroundColor,
                    color: buildingConfig.branding.textDarkColor
                  }}
                >
                  Available
                </th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((property, propertyIndex) => (
                // Create a row for each property-amenity combination
                amenityNames.map((amenity, amenityIndex) => (
                  <tr 
                    key={`${propertyIndex}-${amenityIndex}`}
                    className={
                      propertyIndex % 2 === 0 ? 
                      'bg-opacity-5' : ''
                    }
                    style={{
                      backgroundColor: propertyIndex % 2 === 0 ? 
                        buildingConfig.branding.primaryColor : 'transparent',
                      ...(property.isTarget && highlightTarget ? 
                        { fontWeight: 'bold' } : {})
                    }}
                  >
                    {/* Only show property name in first row of each property's amenities */}
                    <td 
                      className={`py-2 px-3 ${amenityIndex > 0 ? 'text-transparent' : ''}`}
                      style={{ 
                        color: property.isTarget && highlightTarget ? 
                          buildingConfig.branding.primaryColor : 
                          buildingConfig.branding.textDarkColor
                      }}
                    >
                      {property.property}
                    </td>
                    <td className="py-2 px-3">
                      {amenity.displayName}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {property[amenity.key] ? 
                        (useIcons ? 
                          <Check 
                            className="inline-block" 
                            color={buildingConfig.branding.primaryColor} 
                            size={18} 
                          /> : 
                          '✓') : 
                        (useIcons ? 
                          <X 
                            className="inline-block" 
                            color={buildingConfig.branding.textLightColor} 
                            size={18} 
                          /> : 
                          '✗')}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
    // Desktop view - standard comparison matrix
    return (
      <div className="overflow-auto max-h-[500px]">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-opacity-10" style={{ backgroundColor: buildingConfig.branding.primaryColor }}>
              <th 
                className="py-2 px-3 text-left font-semibold sticky top-0 z-10"
                style={{ 
                  backgroundColor: buildingConfig.branding.backgroundColor,
                  color: buildingConfig.branding.textDarkColor
                }}
              >
                Property
              </th>
              {amenityNames.map((amenity, index) => (
                <th 
                  key={index}
                  className="py-2 px-3 text-center font-semibold sticky top-0 z-10"
                  style={{ 
                    backgroundColor: buildingConfig.branding.backgroundColor,
                    color: buildingConfig.branding.textDarkColor
                  }}
                >
                  {amenity.displayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((property, index) => (
              <tr 
                key={index}
                className={
                  index % 2 === 0 ? 
                  'bg-opacity-5' : ''
                }
                style={{
                  backgroundColor: index % 2 === 0 ? 
                    buildingConfig.branding.primaryColor : 'transparent',
                  ...(property.isTarget && highlightTarget ? 
                    { fontWeight: 'bold' } : {})
                }}
              >
                <td 
                  className="py-2 px-3"
                  style={{ 
                    color: property.isTarget && highlightTarget ? 
                      buildingConfig.branding.primaryColor : 
                      buildingConfig.branding.textDarkColor
                  }}
                >
                  {property.property}
                </td>
                {amenityNames.map((amenity, amenityIndex) => (
                  <td key={amenityIndex} className="py-2 px-3 text-center">
                    {property[amenity.key] ? 
                      (useIcons ? 
                        <Check 
                          className="inline-block" 
                          color={buildingConfig.branding.primaryColor} 
                          size={18} 
                        /> : 
                        '✓') : 
                      (useIcons ? 
                        <X 
                          className="inline-block" 
                          color={buildingConfig.branding.textLightColor} 
                          size={18} 
                        /> : 
                        '✗')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <BaseChart
      title={title}
      description={description}
      height={height}
      accessibleTableData={tableData}
      showAccessibleTable={false} // Don't show duplicate tables
      chartData={matrix}
      chartType="amenity"
    >
      <div className="w-full h-full flex items-center justify-center">
        {displayMatrix()}
      </div>
    </BaseChart>
  );
}