import React, { useState, useMemo } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  Label,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import BaseChart from './BaseChart';
import { 
  PriceDataPoint,
  getChartColors,
  formatChartCurrency,
  convertToTableData
} from '@/lib/chart-utils';
import { getPricingAnalysisData } from '@/lib/chart-data-transformers';
import buildingConfig from '../../../../config/building-config';
import useMobile from '@/hooks/use-mobile';
import { formatCurrency } from '@/lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded shadow-sm" 
        style={{ 
          borderColor: buildingConfig.branding.borderColor,
          color: buildingConfig.branding.textDarkColor
        }}
      >
        <p className="font-semibold">{data.name}</p>
        <p>Average Size: {data.sqft} sq ft</p>
        <p>Price: {formatCurrency(data.price)}</p>
        <p>Price per sq ft: ${data.pricePerSqft.toFixed(2)}</p>
        <p className="text-sm mt-1">Unit count: {data.count}</p>
      </div>
    );
  }
  return null;
};

interface PriceAnalysisChartProps {
  title?: string;
  description?: string;
  data?: PriceDataPoint[];
  height?: number;
  showValueLabels?: boolean;
  showAccessibleTable?: boolean;
  highlightEfficiency?: boolean;
}

export default function PriceAnalysisChart({
  title = 'Price & Square Footage Analysis',
  description = 'Visualizing price efficiency across unit types',
  data,
  height = 400,
  showValueLabels = false,
  showAccessibleTable = false,
  highlightEfficiency = true
}: PriceAnalysisChartProps) {
  const isMobile = useMobile();
  
  // Use provided data or get from data transformer
  const chartData = data || getPricingAnalysisData();
  
  // Get colors for the chart
  const colors = getChartColors(chartData.length);
  
  // Format data for accessible table
  const tableData = convertToTableData(
    chartData,
    [
      { key: 'name', label: 'Unit Type' },
      { key: 'sqft', label: 'Avg. Square Footage' },
      { key: 'formattedPrice', label: 'Price' },
      { key: 'formattedPricePerSqft', label: 'Price per Sq Ft' },
      { key: 'count', label: 'Unit Count' }
    ]
  );
  
  // For bubble size, use unit count
  const maxCount = Math.max(...chartData.map(item => item.count));

  // Calculate trend line data for price efficiency
  const trendLineData = useMemo(() => {
    // Simple linear regression to show price trend
    const n = chartData.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    chartData.forEach(item => {
      sumX += item.sqft;
      sumY += item.price;
      sumXY += item.sqft * item.price;
      sumXX += item.sqft * item.sqft;
    });
    
    // Calculate slope and intercept
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Generate trend line points
    const minSqft = Math.min(...chartData.map(item => item.sqft));
    const maxSqft = Math.max(...chartData.map(item => item.sqft));
    
    return [
      { sqft: minSqft, price: minSqft * slope + intercept },
      { sqft: maxSqft, price: maxSqft * slope + intercept }
    ];
  }, [chartData]);
  
  // Calculate efficiency zones
  const efficientZones = useMemo(() => {
    if (!highlightEfficiency) return [];
    
    // Sort data by price per sqft
    const sortedData = [...chartData].sort((a, b) => a.pricePerSqft - b.pricePerSqft);
    
    // Get min and max sqft for chart bounds
    const minSqft = Math.min(...chartData.map(d => d.sqft)) * 0.9;
    const maxSqft = Math.max(...chartData.map(d => d.sqft)) * 1.1;
    
    // Identify efficiency thresholds (simplistic approach)
    const efficientThreshold = sortedData[0].pricePerSqft * 1.05; // Most efficient + 5%
    const lessEfficientThreshold = sortedData[sortedData.length - 1].pricePerSqft * 0.95; // Least efficient - 5%
    
    return [
      // Efficient zone (below efficient threshold line)
      {
        x1: minSqft,
        x2: maxSqft,
        y1: minSqft * efficientThreshold,
        y2: maxSqft * efficientThreshold,
        name: 'Efficient',
        color: 'rgba(0, 128, 0, 0.1)' // Light green
      },
      // Less efficient zone (above less efficient threshold line)
      {
        x1: minSqft,
        x2: maxSqft,
        y1: maxSqft * lessEfficientThreshold,
        y2: minSqft * lessEfficientThreshold,
        name: 'Less Efficient',
        color: 'rgba(255, 0, 0, 0.1)' // Light red
      }
    ];
  }, [chartData, highlightEfficiency]);
  
  return (
    <BaseChart
      title={title}
      description={description}
      height={height}
      accessibleTableData={tableData}
      showAccessibleTable={showAccessibleTable}
      chartData={chartData}
      chartType="pricePerSqft"
    >
      <ScatterChart
        margin={{
          top: 20,
          right: 30,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="sqft" 
          name="Square Footage" 
          domain={['auto', 'auto']}
          tick={{ fill: buildingConfig.branding.textDarkColor }}
          tickLine={{ stroke: buildingConfig.branding.borderColor }}
        >
          <Label 
            value="Square Footage" 
            position="bottom" 
            offset={0} 
            style={{ 
              textAnchor: 'middle',
              fill: buildingConfig.branding.textDarkColor
            }} 
          />
        </XAxis>
        <YAxis 
          type="number" 
          dataKey="price" 
          name="Price" 
          tickFormatter={(value) => formatChartCurrency(value)}
          tick={{ fill: buildingConfig.branding.textDarkColor }}
          tickLine={{ stroke: buildingConfig.branding.borderColor }}
        >
          <Label 
            value="Price" 
            position="left" 
            angle={-90} 
            offset={-5}
            style={{ 
              textAnchor: 'middle',
              fill: buildingConfig.branding.textDarkColor
            }} 
          />
        </YAxis>
        <ZAxis 
          type="number" 
          dataKey="count" 
          range={[40, 100]} 
          name="Unit Count" 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        
        {/* Efficiency zones */}
        {highlightEfficiency && efficientZones.map((zone, index) => (
          <ReferenceArea
            key={`zone-${index}`}
            x1={zone.x1}
            x2={zone.x2}
            y1={zone.y1}
            y2={zone.y2}
            stroke="none"
            fill={zone.color}
            fillOpacity={0.3}
          />
        ))}
        
        {/* Scatter plot for each unit type */}
        <Scatter 
          name="Unit Types" 
          data={chartData} 
          fill={buildingConfig.branding.primaryColor}
        >
          {chartData.map((entry, index) => (
            <cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </Scatter>
        
        {/* Trend line to show relationship */}
        {trendLineData.length > 0 && (
          <Scatter
            name="Trend Line"
            data={trendLineData}
            line={{ stroke: buildingConfig.branding.secondaryColor, strokeWidth: 2 }}
            shape={<></>} // No markers, just line
            legendType="line"
          />
        )}
      </ScatterChart>
    </BaseChart>
  );
}