import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems, NavigationItem, SubsectionItem } from '@/lib/navigation';
import buildingConfig from '../../../config/building-config';
import { 
  ChevronDown, 
  ChevronRight, 
  Home, 
  ClipboardList, 
  BarChart2, 
  Building2,
  Target, 
  DollarSign, 
  Map, 
  Compass, 
  PieChart,
  Circle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

// Map of icon names to Lucide icons
const iconMap: Record<string, React.ReactNode> = {
  'home': <Home size={18} />,
  'clipboard': <ClipboardList size={18} />,
  'bar-chart': <BarChart2 size={18} />,
  'building': <Building2 size={18} />,
  'target': <Target size={18} />,
  'dollar-sign': <DollarSign size={18} />,
  'map': <Map size={18} />,
  'compass': <Compass size={18} />,
  'pie-chart': <PieChart size={18} />
};

// Status icon components
const StatusIcon = ({ status }: { status?: string }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle size={16} className="text-green-500" />;
    case 'in-progress':
      return <Clock size={16} className="text-amber-500" />;
    case 'not-started':
      return <Circle size={16} className="text-gray-300" />;
    default:
      return null;
  }
};

export default function Sidebar({ isMobileMenuOpen, closeMobileMenu }: SidebarProps) {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  // Toggle expanded section
  const toggleSection = (path: string) => {
    setExpandedSections(prev => 
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };
  
  // Check if section should be expanded
  const isExpanded = (path: string) => {
    return expandedSections.includes(path) || router.pathname === path;
  };

  // Render subsection items
  const renderSubsections = (item: NavigationItem) => {
    if (!item.subsections || !isExpanded(item.path)) return null;
    
    return (
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="pl-8 mt-1 space-y-1"
        >
          {item.subsections.map((subsection) => (
            <li key={subsection.anchor}>
              <Link
                href={`${item.path}#${subsection.anchor}`}
                className={`
                  block px-3 py-1.5 rounded-md text-sm group flex items-center
                  text-gray-600 hover:text-[#3B7A57] hover:bg-[#3B7A57] hover:bg-opacity-5
                `}
                onClick={closeMobileMenu}
              >
                <div className="w-1.5 h-1.5 bg-[#3B7A57] rounded-full mr-2 opacity-70"></div>
                {subsection.title}
              </Link>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    );
  };

  return (
    <aside className={`
      bg-[#FCFAF5] border-r border-[#E8E3D9] w-72 flex-shrink-0
      fixed md:sticky top-0 inset-y-0 left-0 z-40 transform h-full
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
      md:translate-x-0 transition-transform duration-300 ease-in-out
      overflow-y-auto
    `}>
      <div className="p-6 border-b border-[#E8E3D9] flex items-center justify-between">
        <Link href="/" className="flex flex-col" onClick={closeMobileMenu}>
          <h1 className="text-xl font-semibold tracking-wide">{buildingConfig.name}</h1>
          <div className="h-0.5 w-8 bg-[#3B7A57] mt-1"></div>
          <p className="text-xs text-[#777777] mt-1">{buildingConfig.branding.tagline}</p>
        </Link>
      </div>
      
      <nav className="p-4">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 px-3">
            Property Blueprint
          </p>
        </div>
        <ul className="space-y-0.5">
          {navigationItems.map((item) => {
            const isActive = router.pathname === item.path;
            const hasSubsections = item.subsections && item.subsections.length > 0;
            const isCurrentlyExpanded = isExpanded(item.path);
            
            return (
              <li key={item.path} className="mb-1">
                <div className="flex items-center">
                  <Link 
                    href={item.path} 
                    className={`
                      flex-grow flex items-center px-3 py-2.5 rounded-md text-sm
                      ${isActive 
                        ? 'bg-[#3B7A57] bg-opacity-10 text-[#3B7A57] font-medium' 
                        : 'hover:bg-gray-100 hover:text-[#3B7A57]'
                      }
                      transition-colors duration-150 ease-in-out
                      group
                    `}
                    onClick={() => {
                      if (!hasSubsections) {
                        closeMobileMenu();
                      }
                    }}
                  >
                    <span className="mr-3 opacity-70">
                      {item.icon && iconMap[item.icon] ? iconMap[item.icon] : null}
                    </span>
                    <span className="flex-grow">{item.title}</span>
                    {item.status && (
                      <span className="ml-2 opacity-80">
                        <StatusIcon status={item.status} />
                      </span>
                    )}
                  </Link>
                  
                  {hasSubsections && (
                    <button 
                      className={`
                        p-2 ml-1 rounded-full hover:bg-gray-100
                        focus:outline-none focus:ring-1 focus:ring-[#3B7A57]
                      `}
                      onClick={() => toggleSection(item.path)}
                      aria-expanded={isCurrentlyExpanded}
                      aria-label={isCurrentlyExpanded ? "Collapse section" : "Expand section"}
                    >
                      {isCurrentlyExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  )}
                </div>
                
                {renderSubsections(item)}
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 mt-4 border-t border-[#E8E3D9]">
        <div className="rounded-md bg-[#3B7A57] bg-opacity-10 p-4">
          <h3 className="text-sm font-medium text-[#3B7A57] mb-1">Need Assistance?</h3>
          <p className="text-xs text-gray-600 mb-3">
            Contact the leasing team for questions about {buildingConfig.name}.
          </p>
          <div className="text-xs text-gray-700">
            <p className="mb-1">
              <span className="font-medium">Email:</span> {buildingConfig.contact.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {buildingConfig.contact.phone}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}