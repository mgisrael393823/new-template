import React, { useState, ReactNode } from 'react';
import useMobile from '@/hooks/use-mobile';
import { ChevronDown, ChevronUp, TableProperties, BarChart3 } from 'lucide-react';
import buildingConfig from '../../../../config/building-config';

interface ResponsiveChartWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
  accessibleTableData?: {
    headers: string[];
    rows: any[][];
  };
  accessibleAltText?: string;
  chartType?: string;
  height?: number;
}

export default function ResponsiveChartWrapper({
  children,
  title,
  description,
  accessibleTableData,
  accessibleAltText,
  chartType = 'chart',
  height = 350
}: ResponsiveChartWrapperProps) {
  const isMobile = useMobile();
  const [showTable, setShowTable] = useState(false);
  const [expanded, setExpanded] = useState(true);
  
  // Determine the appropriate height based on mobile and expanded state
  const contentHeight = isMobile 
    ? (expanded ? Math.min(height, 250) : 0) 
    : (expanded ? height : 0);
  
  return (
    <div 
      className="chart-container mb-8 border rounded-sm"
      style={{ 
        borderColor: buildingConfig.branding.borderColor,
      }}
    >
      {/* Chart header with controls */}
      <div 
        className="p-4 border-b flex items-center justify-between cursor-pointer"
        style={{ borderColor: buildingConfig.branding.borderColor }}
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h3 
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
        <div className="flex items-center">
          {/* Accessibility toggle button */}
          {accessibleTableData && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTable(!showTable);
              }}
              className="p-2 mr-2 rounded-full hover:bg-opacity-10"
              style={{ 
                backgroundColor: showTable 
                  ? `${buildingConfig.branding.primaryColor}20` 
                  : 'transparent',
                color: buildingConfig.branding.textDarkColor
              }}
              aria-label={showTable ? "Show chart view" : "Show accessible table view"}
              title={showTable ? "Show chart view" : "Show accessible table view"}
            >
              {showTable ? <BarChart3 size={20} /> : <TableProperties size={20} />}
            </button>
          )}
          {/* Expand/collapse button */}
          <div className="ml-2">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>
      
      {/* Chart or table content */}
      <div 
        style={{ 
          height: contentHeight,
          transition: 'height 0.3s ease-in-out',
          overflow: 'hidden'
        }}
      >
        <div className="p-4">
          {/* Screen reader text */}
          {accessibleAltText && (
            <div className="sr-only" role="img" aria-label={accessibleAltText}>
              {accessibleAltText}
            </div>
          )}
          
          {/* Chart or Accessible Table */}
          {showTable && accessibleTableData ? (
            <div className="overflow-auto" style={{ maxHeight: contentHeight - 32 }}>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr 
                    className="border-b" 
                    style={{ borderColor: buildingConfig.branding.borderColor }}
                  >
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
                      style={{ 
                        backgroundColor: rowIndex % 2 === 0 
                          ? buildingConfig.branding.primaryColor 
                          : 'transparent'
                      }}
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
          ) : (
            <div className="h-full">
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Accessibility note at bottom */}
      {expanded && (
        <div 
          className="p-2 text-xs border-t text-center"
          style={{ 
            borderColor: buildingConfig.branding.borderColor,
            color: buildingConfig.branding.textLightColor
          }}
        >
          {showTable 
            ? "Table view for accessibility" 
            : accessibleTableData 
              ? "Toggle to table view for accessibility" 
              : ""}
        </div>
      )}
    </div>
  );
}