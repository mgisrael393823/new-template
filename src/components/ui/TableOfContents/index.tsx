import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronUp, List } from 'lucide-react';
import type { NavigationItem, SubsectionItem } from '@/types/navigation';
import useMobile from '@/hooks/use-mobile';

interface TableOfContentsProps {
  headings: { id: string; level: number; text: string }[];
  navigationItem?: NavigationItem;
  className?: string;
  activeId?: string;
  minLevel?: number;
  maxLevel?: number;
  mobile?: boolean;
}

interface HeadingWithActive {
  id: string;
  level: number;
  text: string;
  isActive: boolean;
}

export default function TableOfContents({
  headings = [],
  navigationItem,
  className = '',
  activeId,
  minLevel = 2,
  maxLevel = 4,
  mobile = false
}: TableOfContentsProps) {
  const isMobile = useMobile();
  const [activeHeading, setActiveHeading] = useState<string | null>(activeId || null);
  const [isExpanded, setIsExpanded] = useState(!mobile);
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Use either the provided headings or extract from navigation item subsections
  const tocItems = navigationItem?.subsections
    ? navigationItem.subsections.map((subsection: SubsectionItem) => ({
        id: subsection.anchor,
        level: 2, // Default level for navigation-based TOC
        text: subsection.title
      }))
    : headings.filter(heading => heading.level >= minLevel && heading.level <= maxLevel);
  
  const tocHeadingsWithActive = tocItems.map(item => ({
    ...item,
    isActive: item.id === activeHeading
  }));

  // Set up intersection observer to track active headings on scroll
  useEffect(() => {
    // Skip if we're in a mobile view and not expanded
    if (mobile && !isExpanded) return;
    
    // Skip if no headings
    if (tocItems.length === 0) return;
    
    const headingElements = tocItems.map(heading => 
      document.getElementById(heading.id)
    ).filter(Boolean) as HTMLElement[];
    
    if (headingElements.length === 0) return;
    
    // Create observer
    observer.current = new IntersectionObserver(
      entries => {
        // Get the first heading that is intersecting
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        
        if (intersectingEntry) {
          setActiveHeading(intersectingEntry.target.id);
        }
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1
      }
    );
    
    // Observe all headings
    headingElements.forEach(element => {
      if (observer.current) observer.current.observe(element);
    });
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [tocItems, isExpanded, mobile]);
  
  // No ToC if no headings or subsections
  if (tocItems.length === 0) return null;
  
  // Determine indent class based on heading level
  const getIndentClass = (level: number) => {
    const baseLevel = minLevel;
    const indent = (level - baseLevel) * 12;
    return `ml-${indent}`;
  };
  
  // Mobile version with collapsible behavior
  if (isMobile || mobile) {
    return (
      <div className={`bg-white rounded-md shadow-sm border border-[#E8E3D9] mb-6 ${className}`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-3 text-left border-b border-[#E8E3D9]"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center">
            <List size={18} className="mr-2 text-[#3B7A57]" />
            <span className="font-medium">Contents</span>
          </div>
          <ChevronUp
            size={18}
            className={`transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <nav className="p-3">
            <ul className="space-y-2">
              {tocHeadingsWithActive.map((heading) => (
                <li key={heading.id} className={getIndentClass(heading.level)}>
                  <Link
                    href={`#${heading.id}`}
                    className={`
                      block py-1 px-2 text-sm rounded 
                      ${heading.isActive 
                        ? 'bg-[#3B7A57] bg-opacity-10 text-[#3B7A57] font-medium' 
                        : 'text-gray-700 hover:text-[#3B7A57]'
                      }
                    `}
                    onClick={() => {
                      setActiveHeading(heading.id);
                      if (isMobile) {
                        setIsExpanded(false);
                      }
                    }}
                  >
                    {heading.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>
    );
  }
  
  // Desktop version
  return (
    <nav className={`sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto p-4 bg-white rounded-md shadow-sm border border-[#E8E3D9] ${className}`}>
      <h4 className="text-sm font-semibold mb-3 flex items-center">
        <List size={16} className="mr-2 text-[#3B7A57]" />
        On This Page
      </h4>
      
      <ul className="space-y-2">
        {tocHeadingsWithActive.map((heading) => (
          <li key={heading.id} className={getIndentClass(heading.level)}>
            <Link
              href={`#${heading.id}`}
              className={`
                block py-1 px-2 text-sm rounded transition-colors 
                ${heading.isActive 
                  ? 'bg-[#3B7A57] bg-opacity-10 text-[#3B7A57] font-medium' 
                  : 'text-gray-700 hover:text-[#3B7A57] hover:bg-gray-50'
                }
              `}
              onClick={() => setActiveHeading(heading.id)}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}