import React from 'react';
import Link from 'next/link';

export default function TableOfContents() {
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
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-10 text-center">Blueprint Contents</h2>
        
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
      </div>
    </section>
  );
}