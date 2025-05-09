import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
  ComposedChart,
  Area,
  Bar
} from 'recharts';
import BaseChart from './BaseChart';
import { 
  OccupancyDataPoint,
  getChartColors,
  convertToTableData
} from '@/lib/chart-utils';
import { getOccupancyTrendData } from '@/lib/chart-data-transformers';
import buildingConfig from '../../../../config/building-config';
import useMobile from '@/hooks/use-mobile';
import { formatPercentage } from '@/lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-sm" 
        style={{ 
          borderColor: buildingConfig.branding.borderColor,
          color: buildingConfig.branding.textDarkColor
        }}
      >
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}{entry.name.includes('Occupancy') ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface OccupancyTrendChartProps {
  title?: string;
  description?: string;
  data?: OccupancyDataPoint[];
  height?: number;
  showTarget?: boolean;
  showRentalRates?: boolean;
  showAccessibleTable?: boolean;
  showBrush?: boolean;
  chartType?: 'line' | 'area' | 'composed';
}

export default function OccupancyTrendChart({
  title = 'Occupancy Trend',
  description = 'Projected occupancy rates over the lease-up period',
  data,
  height = 350,
  showTarget = true,
  showRentalRates = true,
  showAccessibleTable = false,
  showBrush = false,
  chartType = 'composed'
}: OccupancyTrendChartProps) {
  const isMobile = useMobile();
  
  // Use provided data or get from data transformer
  const chartData = data || getOccupancyTrendData();
  
  // Get colors for the chart
  const colors = getChartColors(3);
  
  // Format data for accessible table
  const tableData = convertToTableData(
    chartData,
    [
      { key: 'formattedDate', label: 'Month' },
      { key: 'formattedOccupancy', label: 'Actual Occupancy' },
      { key: 'formattedTargetOccupancy', label: 'Target Occupancy' },
      { key: 'formattedRentalRate', label: 'Rental Rate ($/sq ft)' }
    ]
  );
  
  // For dual axis, find min and max for scaling
  const maxOccupancy = Math.max(...chartData.map(d => Math.max(d.occupancy, d.targetOccupancy || 0)));
  const maxRentalRate = Math.max(...chartData.map(d => d.rentalRate || 0));
  
  // Factor to scale rental rates to fit in the same visual space as occupancy
  const scaleFactor = maxOccupancy / maxRentalRate;
  
  // Determine which chart component to render based on chartType
  const renderChart = () => {
    switch(chartType) {
      case 'line':
        return (
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fill: buildingConfig.branding.textDarkColor }}
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
            <YAxis 
              yAxisId="left"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: buildingConfig.branding.textDarkColor }}
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
            {showRentalRates && (
              <YAxis 
                yAxisId="right"
                orientation="right"
                domain={[0, maxRentalRate * 1.2]}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tick={{ fill: buildingConfig.branding.textDarkColor }}
                tickLine={{ stroke: buildingConfig.branding.borderColor }}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="occupancy" 
              name="Actual Occupancy" 
              stroke={colors[0]} 
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            {showTarget && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="targetOccupancy" 
                name="Target Occupancy" 
                stroke={colors[1]}
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            )}
            {showRentalRates && (
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="rentalRate" 
                name="Rental Rate ($/sq ft)" 
                stroke={colors[2]}
                strokeWidth={2}
              />
            )}
            {showBrush && (
              <Brush 
                dataKey="formattedDate" 
                height={30} 
                stroke={buildingConfig.branding.primaryColor}
                fill={buildingConfig.branding.backgroundColor}
              />
            )}
          </LineChart>
        );
        
      case 'area':
        return (
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fill: buildingConfig.branding.textDarkColor }}
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
            <YAxis 
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: buildingConfig.branding.textDarkColor }}
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="occupancy" 
              name="Actual Occupancy" 
              fill={`${colors[0]}80`} // 50% transparency
              stroke={colors[0]} 
              activeDot={{ r: 8 }}
            />
            {showTarget && (
              <Line 
                type="monotone" 
                dataKey="targetOccupancy" 
                name="Target Occupancy" 
                stroke={colors[1]}
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            )}
            {showBrush && (
              <Brush 
                dataKey="formattedDate" 
                height={30} 
                stroke={buildingConfig.branding.primaryColor}
                fill={buildingConfig.branding.backgroundColor}
              />
            )}
          </LineChart>
        );
        
      case 'composed':
      default:
        return (
          <ComposedChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fill: buildingConfig.branding.textDarkColor }}
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
            <YAxis 
              yAxisId="left"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: buildingConfig.branding.textDarkColor }}
              tickLine={{ stroke: buildingConfig.branding.borderColor }}
            />
            {showRentalRates && (
              <YAxis 
                yAxisId="right"
                orientation="right"
                domain={[0, maxRentalRate * 1.2]}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                tick={{ fill: buildingConfig.branding.textDarkColor }}
                tickLine={{ stroke: buildingConfig.branding.borderColor }}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="occupancy" 
              name="Actual Occupancy" 
              fill={`${colors[0]}40`} // 25% transparency
              stroke={colors[0]} 
              activeDot={{ r: 8 }}
            />
            {showTarget && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="targetOccupancy" 
                name="Target Occupancy" 
                stroke={colors[1]}
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            )}
            {showRentalRates && (
              <Bar 
                yAxisId="right"
                dataKey="rentalRate" 
                name="Rental Rate ($/sq ft)" 
                fill={`${colors[2]}80`} // 50% transparency
                barSize={20}
              />
            )}
            {showBrush && (
              <Brush 
                dataKey="formattedDate" 
                height={30} 
                stroke={buildingConfig.branding.primaryColor}
                fill={buildingConfig.branding.backgroundColor}
              />
            )}
          </ComposedChart>
        );
    }
  };
  
  return (
    <BaseChart
      title={title}
      description={description}
      height={height}
      accessibleTableData={tableData}
      showAccessibleTable={showAccessibleTable}
      chartData={chartData}
      chartType="occupancy"
    >
      {renderChart()}
    </BaseChart>
  );
}