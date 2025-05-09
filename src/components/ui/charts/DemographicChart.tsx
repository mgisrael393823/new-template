import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Sector
} from 'recharts';
import BaseChart from './BaseChart';
import { 
  DemographicDataPoint,
  getChartColors,
  convertToTableData
} from '@/lib/chart-utils';
import { getDemographicsData } from '@/lib/chart-data-transformers';
import buildingConfig from '../../../../config/building-config';
import useMobile from '@/hooks/use-mobile';

// Custom active shape for the pie chart
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { 
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value, name
  } = props;
  
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path 
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} 
        stroke={fill} 
        fill="none" 
      />
      <circle 
        cx={ex} 
        cy={ey} 
        r={2} 
        fill={fill} 
        stroke="none" 
      />
      <text 
        x={ex + (cos >= 0 ? 1 : -1) * 12} 
        y={ey} 
        textAnchor={textAnchor} 
        fill={buildingConfig.branding.textDarkColor}
      >
        {`${name}`}
      </text>
      <text 
        x={ex + (cos >= 0 ? 1 : -1) * 12} 
        y={ey} 
        dy={18} 
        textAnchor={textAnchor} 
        fill={buildingConfig.branding.textLightColor}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

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
        <p>Percentage: {data.formattedPercentage}</p>
        {data.ageRange && <p>Age Range: {data.ageRange}</p>}
        {data.incomeRange && <p>Income Range: {data.incomeRange}</p>}
      </div>
    );
  }
  return null;
};

interface DemographicChartProps {
  title?: string;
  description?: string;
  data?: DemographicDataPoint[];
  height?: number;
  showPercentLabels?: boolean;
  showAccessibleTable?: boolean;
  donut?: boolean;
  activeSegment?: boolean;
}

export default function DemographicChart({
  title = 'Target Demographics',
  description = 'Breakdown of target demographic segments',
  data,
  height = 350,
  showPercentLabels = true,
  showAccessibleTable = false,
  donut = true,
  activeSegment = true
}: DemographicChartProps) {
  const isMobile = useMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Use provided data or get from data transformer
  const chartData = data || getDemographicsData();
  
  // Get colors for the chart
  const colors = getChartColors(chartData.length);
  
  // Format data for accessible table
  const tableData = convertToTableData(
    chartData,
    [
      { key: 'name', label: 'Demographic Group' },
      { key: 'formattedPercentage', label: 'Percentage' },
      { key: 'ageRange', label: 'Age Range' },
      { key: 'incomeRange', label: 'Income Range' }
    ]
  );
  
  // Handle active segment changes
  const onPieEnter = (_: any, index: number) => {
    if (activeSegment) {
      setActiveIndex(index);
    }
  };
  
  // Adjust size for mobile
  const mobileAdjustedHeight = isMobile ? Math.min(height, 300) : height;
  const radius = isMobile ? 80 : 100;
  const innerRadius = donut ? (isMobile ? 40 : 60) : 0;
  
  return (
    <BaseChart
      title={title}
      description={description}
      height={mobileAdjustedHeight}
      accessibleTableData={tableData}
      showAccessibleTable={showAccessibleTable}
      chartData={chartData}
      chartType="demographic"
    >
      <PieChart>
        <Pie
          activeIndex={activeSegment ? activeIndex : undefined}
          activeShape={activeSegment ? renderActiveShape : undefined}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={radius}
          dataKey="percentage"
          nameKey="name"
          paddingAngle={2}
          onMouseEnter={onPieEnter}
          label={showPercentLabels && !activeSegment ? 
            ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : 
            false
          }
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
              stroke={buildingConfig.branding.backgroundColor} 
              strokeWidth={1}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center" 
          formatter={(value, entry, index) => {
            return <span style={{ color: buildingConfig.branding.textDarkColor }}>{value}</span>;
          }}
        />
      </PieChart>
    </BaseChart>
  );
}