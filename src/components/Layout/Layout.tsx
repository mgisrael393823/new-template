import React from 'react';
import Link from 'next/link';
import buildingConfig from '../../../config/building-config';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#FCFAF5] border-b border-[#E8E3D9] py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex flex-col">
            <h1 className="text-xl font-semibold tracking-wide">{buildingConfig.name}</h1>
            <div className="h-0.5 w-8 bg-[#E57161]"></div>
            <p className="text-xs text-[#777777] mt-1">{buildingConfig.branding.tagline}</p>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-sm hover:text-[#E57161]">Home</Link></li>
              <li><Link href="/executive-summary" className="text-sm hover:text-[#E57161]">Executive Summary</Link></li>
              <li><Link href="/market-intelligence" className="text-sm hover:text-[#E57161]">Market Intelligence</Link></li>
              <li><Link href="/competitive-landscape" className="text-sm hover:text-[#E57161]">Competitive Landscape</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-[#151617] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{buildingConfig.name}</h3>
              <p className="text-sm text-gray-300">{buildingConfig.location.address}<br/>
              {buildingConfig.location.city}, {buildingConfig.location.state} {buildingConfig.location.zip}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-300">
                Email: {buildingConfig.contact.email}<br/>
                Phone: {buildingConfig.contact.phone}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Blueprint Sections</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li><Link href="/executive-summary" className="hover:text-[#E57161]">Executive Summary</Link></li>
                <li><Link href="/market-intelligence" className="hover:text-[#E57161]">Market Intelligence</Link></li>
                <li><Link href="/competitive-landscape" className="hover:text-[#E57161]">Competitive Landscape</Link></li>
                <li><Link href="/strategic-opportunities" className="hover:text-[#E57161]">Strategic Opportunities</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#333333] mt-8 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {buildingConfig.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}