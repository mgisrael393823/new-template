import React from 'react';
import buildingConfig from '../../../config/building-config';

export default function IntroSection() {
  return (
    <section className="py-16 bg-[#FCFAF5]">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">{buildingConfig.name}</h1>
        <div className="h-0.5 w-16 bg-[#E57161] mb-6"></div>
        <p className="text-xl mb-10">{buildingConfig.branding.tagline}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              A comprehensive strategic framework designed to optimize the lease-up process, identify competitive 
              advantages, and provide actionable recommendations to maximize occupancy and rental revenue.
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#E57161] mr-3">•</span>
                <span>Market-driven positioning strategy</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E57161] mr-3">•</span>
                <span>Competitive landscape analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E57161] mr-3">•</span>
                <span>Strategic opportunity mapping</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E57161] mr-3">•</span>
                <span>Revenue optimization framework</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E57161] mr-3">•</span>
                <span>Implementation roadmap and timeline</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-[#151617] text-white p-8 rounded-sm">
            <h2 className="text-xl font-semibold mb-4 text-white">Property Overview</h2>
            
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-300">Location:</span>
                <span className="font-medium">{buildingConfig.location.neighborhood}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Total Units:</span>
                <span className="font-medium">{buildingConfig.details.units}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Stories:</span>
                <span className="font-medium">{buildingConfig.details.stories}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Delivery:</span>
                <span className="font-medium">{buildingConfig.details.yearBuilt}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Property Class:</span>
                <span className="font-medium">{buildingConfig.details.propertyClass}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}