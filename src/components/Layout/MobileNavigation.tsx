import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Home,
  MapPin
} from 'lucide-react';
import { navigationItems } from '@/lib/navigation';
import buildingConfig from '../../../config/building-config';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen?: () => void;
}

export default function MobileNavigation({ 
  isOpen, 
  onClose,
  onSearchOpen
}: MobileNavigationProps) {
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
    return expandedSections.includes(path);
  };
  
  // Handle navigation to a page
  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };

  // Animation variants
  const drawerVariants = {
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
  };
  
  const backdropVariants = {
    closed: { opacity: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Navigation drawer */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed inset-y-0 left-0 w-full max-w-[320px] bg-white z-50 md:hidden flex flex-col"
          >
            {/* Header with close button */}
            <div className="p-4 flex items-center justify-between border-b border-[#E8E3D9]">
              <Link href="/" className="flex items-center" onClick={onClose}>
                <div className="flex flex-col">
                  <h1 className="text-xl font-semibold tracking-wide">{buildingConfig.name}</h1>
                  <div className="h-0.5 w-8 bg-[#3B7A57] mt-1"></div>
                </div>
              </Link>
              
              <div className="flex items-center gap-2">
                {onSearchOpen && (
                  <button 
                    className="p-3 rounded-full hover:bg-gray-100 focus:outline-none"
                    onClick={() => {
                      onSearchOpen();
                      onClose();
                    }}
                    aria-label="Open search"
                  >
                    <Search size={20} />
                  </button>
                )}
                
                <button 
                  className="p-3 rounded-full hover:bg-gray-100 focus:outline-none"
                  onClick={onClose}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Navigation content - scrollable */}
            <div className="flex-grow overflow-y-auto">
              {/* Quick link home */}
              <div className="p-4 border-b border-[#E8E3D9]">
                <Link
                  href="/"
                  className="flex items-center py-3 px-4 rounded-lg bg-[#FCFAF5] hover:bg-[#3B7A57] hover:bg-opacity-10"
                  onClick={onClose}
                >
                  <Home size={20} className="mr-3 text-[#3B7A57]" />
                  <span className="font-medium">Home</span>
                </Link>
              </div>
              
              {/* Main navigation */}
              <nav className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 px-2">
                  Blueprint Sections
                </p>
                
                <ul className="space-y-2">
                  {navigationItems.filter(item => item.path !== '/').map((item) => {
                    const isActive = router.pathname === item.path;
                    const hasSubsections = item.subsections && item.subsections.length > 0;
                    const currentlyExpanded = isExpanded(item.path);
                    const statusColorClass = 
                      item.status === 'completed' ? 'bg-green-100 text-green-700' :
                      item.status === 'in-progress' ? 'bg-amber-100 text-amber-700' : 
                      'bg-gray-100 text-gray-600';
                    
                    return (
                      <li key={item.path} className="mb-1">
                        <div className="flex items-center">
                          <button 
                            className={`
                              w-full flex items-center justify-between p-3 rounded-lg text-left
                              ${isActive 
                                ? 'bg-[#3B7A57] bg-opacity-10 text-[#3B7A57] font-medium' 
                                : 'hover:bg-gray-100'
                              }
                              transition-colors duration-150 ease-in-out
                              touch-manipulation
                            `}
                            onClick={() => {
                              if (hasSubsections) {
                                toggleSection(item.path);
                              } else {
                                navigateTo(item.path);
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <span className="mr-3 opacity-80">
                                {item.icon && <MapPin size={20} />}
                              </span>
                              <span>{item.title}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {item.status && (
                                <span className={`px-2 py-0.5 rounded-full text-xs ${statusColorClass}`}>
                                  {item.status === 'completed' ? 'Done' : 
                                   item.status === 'in-progress' ? 'In Progress' : 
                                   'To Do'}
                                </span>
                              )}
                              
                              {hasSubsections && (
                                <span>
                                  {currentlyExpanded ? 
                                    <ChevronUp size={18} /> : 
                                    <ChevronDown size={18} />
                                  }
                                </span>
                              )}
                            </div>
                          </button>
                        </div>
                        
                        {/* Subsections */}
                        {hasSubsections && (
                          <AnimatePresence>
                            {currentlyExpanded && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-1 pl-10 space-y-1"
                              >
                                {item.subsections?.map((subsection) => (
                                  <li key={subsection.anchor}>
                                    <Link
                                      href={`${item.path}#${subsection.anchor}`}
                                      className="
                                        block py-3 px-4 rounded-md text-gray-700
                                        hover:bg-gray-100 hover:text-[#3B7A57]
                                        touch-manipulation
                                      "
                                      onClick={onClose}
                                    >
                                      {subsection.title}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            
            {/* Bottom section - contact info */}
            <div className="p-4 border-t border-[#E8E3D9] bg-[#FCFAF5]">
              <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Contact
                </p>
                <p className="text-sm">{buildingConfig.contact.phone}</p>
                <p className="text-sm text-[#3B7A57]">{buildingConfig.contact.email}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}