// Placeholder for opportunity-map.tsx
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import { Heading } from "@/components/ui/Heading";
import { HighlightBox } from "@/components/ui/HighlightBox";
import buildingConfig from "../../config/building-config";

export default function OpportunityMap() {
  return (
    <>
      <Head>
        <title>Opportunity Map - {buildingConfig.name}</title>
        <meta name="description" content={`Opportunity map for ${buildingConfig.name}`} />
      </Head>
      
      <Layout>
        <div className="max-w-4xl mx-auto">
          <Heading level={1}>Opportunity Map</Heading>
          
          <HighlightBox>
            <p className="text-lg">
              This opportunity map provides a visual and strategic framework for prioritizing key 
              initiatives across near-term, mid-term, and long-term timeframes to maximize 
              {buildingConfig.name}'s market position and revenue potential.
            </p>
          </HighlightBox>
          
          {/* Content to be populated from markdown */}
          <div className="space-y-10">
            <p>Content will be populated from opportunity-map.md</p>
          </div>
        </div>
      </Layout>
    </>
  );
}