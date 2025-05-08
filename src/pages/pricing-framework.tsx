// Placeholder for pricing-framework.tsx
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import { Heading } from "@/components/ui/Heading";
import { HighlightBox } from "@/components/ui/HighlightBox";
import buildingConfig from "../../config/building-config";

export default function PricingFramework() {
  return (
    <>
      <Head>
        <title>Pricing & Incentive Framework - {buildingConfig.name}</title>
        <meta name="description" content={`Pricing and incentive framework for ${buildingConfig.name}`} />
      </Head>
      
      <Layout>
        <div className="max-w-4xl mx-auto">
          <Heading level={1}>Pricing & Incentive Framework</Heading>
          
          <HighlightBox>
            <p className="text-lg">
              Our strategic pricing model positions {buildingConfig.name} to balance competitive market rates 
              with premium value, incorporating an optimized incentive structure to drive lease-up velocity 
              while protecting long-term revenue.
            </p>
          </HighlightBox>
          
          {/* Content to be populated from markdown */}
          <div className="space-y-10">
            <p>Content will be populated from pricing-framework.md</p>
          </div>
        </div>
      </Layout>
    </>
  );
}