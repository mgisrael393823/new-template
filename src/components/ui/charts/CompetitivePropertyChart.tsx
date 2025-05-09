import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend,
  ReferenceLine,
  LabelList
} from 'recharts';
import BaseChart from './BaseChart';
import { 
  ComparisonDataPoint, 
  transformCompetitiveData,
  getChartColors,
  formatCompactNumber,
  convertToTableData
} from '@/lib/chart-utils';
import { buildingConfig, buildingInfo } from '@/config/building';
import useMobile from '@/hooks/use-mobile';

interface CompetitivePropertyChartProps {
  title?: string;
  description?: string;
  data?: ComparisonDataPoint[];
  showAverage?: boolean;
  height?: number;
  showAccessibleTable?: boolean;
  horizontalLayout?: boolean;
  dataKey?: string;
  labelKey?: string;
  showLabels?: boolean;
}

export default function CompetitivePropertyChart({
  title = 'Competitive Property Comparison',
  description = 'Unit count comparison with competitive properties',
  data,
  showAverage = true,
  height = 350,
  showAccessibleTable = false,
  horizontalLayout = false, // Horizontal layout for mobile or alternative view
  dataKey = 'units',
  labelKey = 'name',
  showLabels = true
}: CompetitivePropertyChartProps) {
  const isMobile = useMobile();
  
  // Use the provided data or generate from config
  const chartData = data || transformCompetitiveData();
  
  // Calculate average for reference line if needed
  const average = showAverage 
    ? chartData.reduce((sum, item) => sum + item[dataKey], 0) / chartData.length 
    : 0;
  
  // Get colors from branding config
  const primaryColor = buildingConfig.branding.primaryColor;
  const secondaryColor = buildingConfig.branding.secondaryColor;
  
  // Set up chart colors
  const colors = getChartColors(2);
  
  // Format data for accessible table
  const tableData = convertToTableData(
    chartData,
    [
      { key: 'name', label: 'Property' },
      { key: 'units', label: 'Units', format: value => formatCompactNumber(value) },
      { key: 'address', label: 'Address' }
    ]
  );
  
  // Adjust layout for mobile
  const layout = horizontalLayout || isMobile ? 'vertical' : 'horizontal';
  
  return (
    <BaseChart
      title={title}
      description={description}
      height={height}
      accessibleTableData={tableData}
      showAccessibleTable={showAccessibleTable}
      chartData={chartData}
      chartType="competitive"
    >
      <BarChart
        data={chartData}
        layout={layout}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {layout === 'horizontal' ? (
          <>
            <XAxis 
              dataKey={labelKey} 
              tick={{ fill: buildingConfig.branding.textDarkColor }}
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
            <YAxis 
              tickFormatter={formatCompactNumber}
              tick={{ fill: buildingConfig.branding.textDarkColor }} 
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
          </>
        ) : (
          <>
            <XAxis 
              type="number"
              tickFormatter={formatCompactNumber}
              tick={{ fill: buildingConfig.branding.textDarkColor }} 
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
            <YAxis 
              type="category"
              dataKey={labelKey}
              tick={{ fill: buildingConfig.branding.textDarkColor }}
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
              width={100}
            />
          </>
        )}
        <Tooltip
          formatter={(value) => formatCompactNumber(value as number)}
          contentStyle={{
            backgroundColor: buildingConfig.branding.backgroundColor,
            borderColor: buildingConfig.branding.borderColor,
          }}
        />
        <Legend />
        {showAverage && layout === 'horizontal' && (
          <ReferenceLine 
            y={average} 
            label={{ 
              value: "Average", 
              position: "insideTopRight",
              fill: buildingConfig.branding.textDarkColor,
            }}
            stroke={buildingConfig.branding.secondaryColor} 
            strokeDasharray="3 3" 
          />
        )}
        {showAverage && layout === 'vertical' && (
          <ReferenceLine 
            x={average} 
            label={{ 
              value: "Average", 
              position: "insideTopLeft",
              fill: buildingConfig.branding.textDarkColor,
            }}
            stroke={buildingConfig.branding.secondaryColor} 
            strokeDasharray="3 3" 
          />
        )}
        <Bar 
          dataKey={dataKey} 
          name="Units"
          fill={primaryColor}
        >
          {showLabels && (
            <LabelList 
              dataKey={dataKey}
              position={layout === 'horizontal' ? 'top' : 'right'}
              style={{ fill: buildingConfig.branding.textDarkColor }}
            />
          )}
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.isTarget ? primaryColor : secondaryColor}
            />
          ))}
        </Bar>
      </BarChart>
    </BaseChart>
  );
}