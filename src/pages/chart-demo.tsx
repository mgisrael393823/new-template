import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import { Heading } from '@/components/ui/Heading';
import { HighlightBox } from '@/components/ui/HighlightBox';
import { buildingConfig, buildingInfo } from '@/config/building';
import {
  CompetitivePropertyChart,
  PriceAnalysisChart,
  DemographicChart,
  OccupancyTrendChart,
  AmenityComparisonMatrix,
  ResponsiveChartWrapper
} from '@/components/ui/charts';
import useMobile from '@/hooks/use-mobile';

export default function ChartDemo() {
  const isMobile = useMobile();
  
  return (
    <>
      <Head>
        <title>Data Visualization | {buildingInfo.name}</title>
        <meta name="description" content={`Data visualization components for ${buildingInfo.name}`} />
      </Head>
      
      <Layout>
        <div className="max-w-5xl mx-auto px-4">
          <Heading level={1}>Property Data Visualizations</Heading>
          
          <HighlightBox>
            <p className="text-lg">
              Interactive data visualizations for {buildingInfo.name}, 
              demonstrating key metrics and property insights using responsive, 
              accessible chart components.
            </p>
          </HighlightBox>
          
          <div className="mt-8 grid grid-cols-1 gap-8">
            {/* Competitive Property Comparison */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Competitive Properties</h2>
              <CompetitivePropertyChart 
                horizontalLayout={isMobile}
                showAccessibleTable={false}
              />
            </section>
            
            {/* Unit Mix Demographics */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Target Demographics</h2>
              <DemographicChart 
                height={380}
                showAccessibleTable={false}
              />
            </section>
            
            {/* Price Analysis */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Price per Square Foot Analysis</h2>
              <PriceAnalysisChart 
                height={400}
                showAccessibleTable={false}
              />
            </section>
            
            {/* Occupancy Trend */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Occupancy & Rental Rate Trends</h2>
              <OccupancyTrendChart 
                height={400}
                showAccessibleTable={false}
              />
            </section>
            
            {/* Amenity Comparison */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Amenity Comparison Matrix</h2>
              <AmenityComparisonMatrix 
                height={450}
              />
            </section>
            
            {/* Responsive Chart Wrapper Demo */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Responsive & Accessible Charts</h2>
              <p className="mb-4">
                Click the chart header to expand/collapse. Toggle between chart and table views 
                using the button in the upper right corner.
              </p>
              
              <ResponsiveChartWrapper
                title="Competitive Property Comparison"
                description="Comparing unit counts across competitive properties"
                accessibleTableData={{
                  headers: ['Property', 'Units', 'Address'],
                  rows: [
                    [buildingInfo.name, String(buildingInfo.totalUnits), buildingInfo.location.address],
                    ...buildingConfig.market.competitiveSet.map(property => [
                      property.name, String(property.units), property.address
                    ])
                  ]
                }}
                accessibleAltText="Bar chart comparing 4 properties, with Aspen Heights having 324 units, The Novare having 275 units, Centennial Place having 240 units, and The Georgian having 320 units."
                height={350}
              >
                <CompetitivePropertyChart 
                  showAccessibleTable={false}
                  horizontalLayout={isMobile}
                />
              </ResponsiveChartWrapper>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}