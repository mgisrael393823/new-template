/**
 * Navigation Configuration
 * 
 * This file defines the navigation structure for the application.
 * It includes all navigation items, their paths, descriptions, and subsections.
 */
import { NavigationItem } from '@/types/navigation';

/**
 * Main navigation structure with subsections for sidebar and table of contents
 */
export const navigationItems: NavigationItem[] = [
  { 
    title: "Home", 
    path: "/", 
    description: "Property blueprint overview",
    icon: "home",
    status: 'completed',
    order: 0
  },
  { 
    title: "Executive Summary", 
    path: "/executive-summary",
    description: "High-level overview of the property and strategy",
    icon: "clipboard",
    status: 'completed',
    order: 1,
    subsections: [
      { title: "Overview", anchor: "overview" },
      { title: "Market Positioning", anchor: "market-positioning" },
      { title: "Key Findings", anchor: "key-findings" },
      { title: "Strategic Recommendations", anchor: "strategic-recommendations" },
      { title: "Expected Outcomes", anchor: "expected-outcomes" },
      { title: "Implementation Framework", anchor: "implementation-framework" }
    ]
  },
  { 
    title: "Market Intelligence", 
    path: "/market-intelligence",
    description: "Demographic analysis and market trends",
    icon: "bar-chart",
    status: 'completed',
    order: 2,
    subsections: [
      { title: "Market Overview", anchor: "market-overview" },
      { title: "Demographic Trends", anchor: "demographic-trends" },
      { title: "Economic Indicators", anchor: "economic-indicators" },
      { title: "Demand Analysis", anchor: "demand-analysis" }
    ]
  },
  { 
    title: "Competitive Landscape", 
    path: "/competitive-landscape",
    description: "Analysis of competing properties",
    icon: "building",
    status: 'in-progress',
    order: 3, 
    subsections: [
      { title: "Competitive Set", anchor: "competitive-set" },
      { title: "Amenity Comparison", anchor: "amenity-comparison" },
      { title: "Pricing Analysis", anchor: "pricing-analysis" },
      { title: "SWOT Analysis", anchor: "swot-analysis" }
    ]
  },
  { 
    title: "Strategic Opportunities", 
    path: "/strategic-opportunities",
    description: "SWOT analysis and key opportunities",
    icon: "target",
    status: 'in-progress',
    order: 4,
    subsections: [
      { title: "Strengths & Weaknesses", anchor: "strengths-weaknesses" },
      { title: "Opportunities & Threats", anchor: "opportunities-threats" },
      { title: "Strategic Positioning", anchor: "strategic-positioning" },
      { title: "Key Differentiators", anchor: "key-differentiators" }
    ]
  },
  { 
    title: "Pricing Framework", 
    path: "/pricing-framework",
    description: "Rent and pricing strategy",
    icon: "dollar-sign",
    status: 'not-started',
    order: 5,
    subsections: [
      { title: "Pricing Strategy", anchor: "pricing-strategy" },
      { title: "Unit Mix Analysis", anchor: "unit-mix-analysis" },
      { title: "Premium Positioning", anchor: "premium-positioning" },
      { title: "Concession Strategy", anchor: "concession-strategy" }
    ]
  },
  { 
    title: "Go-to-Market Roadmap", 
    path: "/go-to-market",
    description: "Marketing and lease-up plan",
    icon: "map",
    status: 'not-started',
    order: 6,
    subsections: [
      { title: "Marketing Strategy", anchor: "marketing-strategy" },
      { title: "Digital Presence", anchor: "digital-presence" },
      { title: "Pre-Leasing Timeline", anchor: "pre-leasing-timeline" },
      { title: "Budget Allocation", anchor: "budget-allocation" }
    ]
  },
  { 
    title: "Opportunity Map", 
    path: "/opportunity-map",
    description: "Visual representation of opportunities",
    icon: "compass",
    status: 'not-started',
    order: 7,
    subsections: [
      { title: "Future Growth Areas", anchor: "future-growth" },
      { title: "Timeline", anchor: "timeline" },
      { title: "Action Items", anchor: "action-items" },
      { title: "Success Metrics", anchor: "success-metrics" }
    ]
  },
  { 
    title: "Data Visualization", 
    path: "/chart-demo",
    description: "Interactive property data charts",
    icon: "pie-chart",
    status: 'completed',
    order: 8
  }
];