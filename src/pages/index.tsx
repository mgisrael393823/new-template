import React from "react";
import Head from "next/head";
import Link from "next/link";
import buildingConfig from "../../config/building-config";

export default function Home() {
  // Pages with links to them in the navigation
  const pages = [
    { title: "Executive Summary", path: "/executive-summary", description: "High-level overview of the property and strategy" },
    { title: "Market Intelligence", path: "/market-intelligence", description: "Demographic analysis and market trends" },
    { title: "Competitive Landscape", path: "/competitive-landscape", description: "Analysis of competing properties" },
    { title: "Strategic Opportunities", path: "/strategic-opportunities", description: "SWOT analysis and key opportunities" },
    { title: "Pricing Framework", path: "/pricing-framework", description: "Rent and pricing strategy" },
    { title: "Go-to-Market Roadmap", path: "/go-to-market", description: "Marketing and lease-up plan" },
    { title: "Opportunity Map", path: "/opportunity-map", description: "Visual representation of opportunities" },
  ];

  return (
    <>
      <Head>
        <title>{buildingConfig.name} – Blueprint Strategy</title>
        <meta name="description" content={`A comprehensive strategy blueprint for ${buildingConfig.name}`} />
      </Head>
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">{buildingConfig.name}</h1>
        <div className="h-0.5 w-12 bg-[#E57161] mb-3"></div>
        <p className="text-xl text-[#777777] mb-8">{buildingConfig.branding.tagline}</p>
        
        <div className="bg-[#FCFAF5] border border-[#E8E3D9] p-6 rounded-md mb-10">
          <p className="text-lg">
            This blueprint provides a comprehensive strategic framework designed to optimize 
            the lease-up process, identify competitive advantages, and provide actionable 
            recommendations to maximize occupancy and rental revenue for {buildingConfig.name}.
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">Blueprint Contents</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((page) => (
            <Link 
              key={page.path} 
              href={page.path} 
              className="p-6 border border-[#E8E3D9] rounded-md hover:bg-[#FCFAF5] transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{page.title}</h3>
              <p className="text-[#777777]">{page.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}