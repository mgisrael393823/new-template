import React, { ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';
import { buildingConfig, buildingInfo } from '@/config/building';
import { getAccessibleAltText } from '@/lib/chart-utils';
import useMobile from '@/hooks/use-mobile';

export interface BaseChartProps {
  children: ReactNode;
  title: string;
  description?: string;
  height?: number;
  width?: string;
  accessibleAltText?: string;
  accessibleTableData?: {
    headers: string[];
    rows: any[][];
  };
  showAccessibleTable?: boolean;
  chartData?: any[];
  chartType?: string;
}

export default function BaseChart({
  children,
  title,
  description,
  height = 300,
  width = '100%',
  accessibleAltText,
  accessibleTableData,
  showAccessibleTable = false,
  chartData = [],
  chartType = 'generic'
}: BaseChartProps) {
  const isMobile = useMobile();
  const mobileHeight = Math.min(height, 250); // Cap height on mobile
  
  // Get colors from building config for consistent styling
  const { primaryColor, secondaryColor, borderColor } = buildingConfig.branding;
  
  // Generate accessible alt text if not provided
  const altText = accessibleAltText || getAccessibleAltText(chartType, chartData);
  
  return (
    <div 
      className="chart-container mb-8" 
      style={{ 
        borderColor: borderColor,
      }}
      aria-labelledby={`chart-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Chart header */}
      <div className="mb-4">
        <h3 
          id={`chart-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="text-lg font-semibold" 
          style={{ color: buildingConfig.branding.textDarkColor }}
        >
          {title}
        </h3>
        {description && (
          <p 
            className="text-sm mt-1"
            style={{ color: buildingConfig.branding.textLightColor }}
          >
            {description}
          </p>
        )}
      </div>
      
      {/* Chart visualization */}
      <div 
        className="border rounded-sm p-4 bg-white"
        style={{ borderColor: borderColor }}
      >
        {/* Screen reader accessible description */}
        <div className="sr-only">{altText}</div>
        
        {/* Responsive chart container */}
        <ResponsiveContainer 
          width={width} 
          height={isMobile ? mobileHeight : height}
        >
          {children}
        </ResponsiveContainer>
        
        {/* Accessible table alternative (hidden by default) */}
        {showAccessibleTable && accessibleTableData && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor }}>
                  {accessibleTableData.headers.map((header, index) => (
                    <th 
                      key={index}
                      className="py-2 px-4 text-left text-sm font-semibold"
                      style={{ color: buildingConfig.branding.textDarkColor }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accessibleTableData.rows.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className={rowIndex % 2 === 0 ? 'bg-opacity-5' : ''}
                    style={{ backgroundColor: rowIndex % 2 === 0 ? primaryColor : 'transparent', }}
                  >
                    {row.map((cell, cellIndex) => (
                      <td 
                        key={cellIndex}
                        className="py-2 px-4 text-sm"
                        style={{ color: buildingConfig.branding.textDarkColor }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}