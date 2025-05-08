// Placeholder for executive-summary.tsx
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import { Heading } from "@/components/ui/Heading";
import { HighlightBox } from "@/components/ui/HighlightBox";
import buildingConfig from "../../config/building-config";

export default function ExecutiveSummary() {
  return (
    <>
      <Head>
        <title>Executive Summary - {buildingConfig.name}</title>
        <meta name="description" content={`Executive summary for ${buildingConfig.name}`} />
      </Head>
      
      <Layout>
        <div className="max-w-4xl mx-auto">
          <Heading level={1}>Executive Summary</Heading>
          
          <HighlightBox>
            <p className="text-lg">
              This executive summary outlines the core findings and strategic recommendations for {buildingConfig.name}, 
              providing a high-level overview of our comprehensive market analysis and implementation roadmap.
            </p>
          </HighlightBox>
          
          {/* Content to be populated from markdown */}
          <div className="space-y-10">
            <p>Content will be populated from executive-summary.md</p>
          </div>
        </div>
      </Layout>
    </>
  );
}