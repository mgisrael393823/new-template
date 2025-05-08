import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import buildingConfig from '../../../config/building-config';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items - can be extended as needed
  const navigationItems = [
    { title: "Home", path: "/" },
    { title: "Executive Summary", path: "/executive-summary" },
    { title: "Market Intelligence", path: "/market-intelligence" },
    { title: "Competitive Landscape", path: "/competitive-landscape" },
    { title: "Strategic Opportunities", path: "/strategic-opportunities" },
    { title: "Pricing Framework", path: "/pricing-framework" },
    { title: "Go-to-Market Roadmap", path: "/go-to-market" },
    { title: "Opportunity Map", path: "/opportunity-map" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className={`
        bg-[#FCFAF5] border-r border-[#E8E3D9] w-64 flex-shrink-0
        fixed md:static inset-y-0 left-0 z-40 transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <div className="p-6 border-b border-[#E8E3D9]">
          <Link href="/" className="flex flex-col">
            <h1 className="text-xl font-semibold tracking-wide">{buildingConfig.name}</h1>
            <div className="h-0.5 w-8 bg-[#3B7A57] mt-1"></div>
            <p className="text-xs text-[#777777] mt-1">{buildingConfig.branding.tagline}</p>
          </Link>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link 
                  href={item.path} 
                  className={`
                    block px-3 py-2 rounded-md text-sm
                    ${router.pathname === item.path 
                      ? 'bg-[#3B7A57] bg-opacity-10 text-[#3B7A57] font-medium' 
                      : 'hover:bg-gray-100 hover:text-[#3B7A57]'
                    }
                  `}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Mobile menu button */}
      <button 
        className="fixed z-50 bottom-4 right-4 md:hidden bg-[#3B7A57] text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <div className="flex flex-col flex-grow min-h-screen">
        <main className="flex-grow p-4 md:p-8 md:ml-0 w-full">
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
                  <li><Link href="/executive-summary" className="hover:text-[#3B7A57]">Executive Summary</Link></li>
                  <li><Link href="/market-intelligence" className="hover:text-[#3B7A57]">Market Intelligence</Link></li>
                  <li><Link href="/competitive-landscape" className="hover:text-[#3B7A57]">Competitive Landscape</Link></li>
                  <li><Link href="/strategic-opportunities" className="hover:text-[#3B7A57]">Strategic Opportunities</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-[#333333] mt-8 pt-8 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} {buildingConfig.name}. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}