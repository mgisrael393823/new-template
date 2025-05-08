// Placeholder for go-to-market.tsx
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import { Heading } from "@/components/ui/Heading";
import { HighlightBox } from "@/components/ui/HighlightBox";
import buildingConfig from "../../config/building-config";

export default function GoToMarket() {
  return (
    <>
      <Head>
        <title>Go-to-Market Roadmap - {buildingConfig.name}</title>
        <meta name="description" content={`Go-to-market roadmap for ${buildingConfig.name}`} />
      </Head>
      
      <Layout>
        <div className="max-w-4xl mx-auto">
          <Heading level={1}>Go-to-Market Roadmap</Heading>
          
          <HighlightBox>
            <p className="text-lg">
              This roadmap outlines the phased implementation strategy for {buildingConfig.name}'s market entry, 
              with specific timelines, marketing channels, and targeting approaches to achieve optimal lease-up velocity.
            </p>
          </HighlightBox>
          
          {/* Content to be populated from markdown */}
          <div className="space-y-10">
            <p>Content will be populated from go-to-market.md</p>
          </div>
        </div>
      </Layout>
    </>
  );
}