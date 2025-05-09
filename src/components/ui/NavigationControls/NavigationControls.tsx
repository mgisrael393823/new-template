import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAdjacentNavigationItems } from '@/lib/navigation';
import { NavigationItem } from '@/types/navigation';
import { NavigationControlsProps } from '@/types/ui';
import useMobile from '@/hooks/use-mobile';

interface NavigationButtonProps {
  item: NavigationItem | null;
  direction: 'previous' | 'next';
  showTitle?: boolean;
  showArrow?: boolean;
  showStatus?: boolean;
  variant?: 'default' | 'simple' | 'compact';
}

// Navigation button component
const NavigationButton = ({ 
  item, 
  direction, 
  showTitle = true, 
  showArrow = true,
  showStatus = true,
  variant = 'default'
}: NavigationButtonProps) => {
  if (!item) return null;
  
  // Determine icon based on direction
  const icon = direction === 'previous' 
    ? <ArrowLeft size={18} /> 
    : <ArrowRight size={18} />;
  
  // Determine label based on direction
  const label = direction === 'previous' ? 'Previous' : 'Next';
  
  // Determine status class
  const statusClass = item.status === 'completed' 
    ? 'bg-green-100 text-green-700' 
    : item.status === 'in-progress' 
      ? 'bg-amber-100 text-amber-700' 
      : 'bg-gray-100 text-gray-700';
  
  // Render button based on variant
  switch (variant) {
    case 'simple':
      return (
        <Link 
          href={item.path}
          className={`
            inline-flex items-center text-sm py-2 px-4 rounded-md
            hover:bg-[#3B7A57] hover:bg-opacity-10 transition-colors
            ${direction === 'previous' ? 'pr-5' : 'pl-5'}
          `}
        >
          {direction === 'previous' && showArrow && <span className="mr-2">{icon}</span>}
          <span>{item.title}</span>
          {direction === 'next' && showArrow && <span className="ml-2">{icon}</span>}
        </Link>
      );
      
    case 'compact':
      return (
        <Link
          href={item.path}
          className={`
            inline-flex items-center justify-center p-2 rounded-md
            hover:bg-[#3B7A57] hover:bg-opacity-10 transition-colors
          `}
          aria-label={`${label}: ${item.title}`}
          title={`${label}: ${item.title}`}
        >
          {icon}
        </Link>
      );
      
    case 'default':
    default:
      return (
        <Link 
          href={item.path}
          className={`
            flex flex-col p-4 rounded-md border border-[#E8E3D9]
            hover:bg-[#FCFAF5] transition-colors
            ${direction === 'next' ? 'text-right items-end' : 'items-start'}
          `}
        >
          <div className={`
            flex items-center mb-1 text-sm text-gray-500
            ${direction === 'next' ? 'flex-row' : 'flex-row-reverse'} 
          `}>
            {showArrow && <span className={direction === 'next' ? 'ml-2' : 'mr-2'}>{icon}</span>}
            <span>{label}</span>
          </div>
          
          {showTitle && (
            <div className="font-medium text-[#3B7A57]">{item.title}</div>
          )}
          
          {showStatus && item.status && (
            <div className={`
              mt-2 inline-block px-2 py-0.5 rounded-full text-xs
              ${statusClass}
            `}>
              {item.status === 'completed' 
                ? 'Completed' 
                : item.status === 'in-progress' 
                  ? 'In Progress' 
                  : 'Not Started'}
            </div>
          )}
        </Link>
      );
  }
};

export function NavigationControls({
  className = '',
  showTitles = true,
  showArrows = true,
  showStatus = true,
  variant = 'default'
}: NavigationControlsProps) {
  const router = useRouter();
  const isMobile = useMobile();
  
  // Get adjacent navigation items
  const { previous, next } = getAdjacentNavigationItems(router.pathname);
  
  // If no navigation items, don't display the control
  if (!previous && !next) return null;
  
  // For mobile, use the compact variant
  const mobileVariant = isMobile ? 'compact' : variant;
  
  return (
    <div className={`
      flex items-stretch justify-between w-full mt-8 pt-6 border-t border-[#E8E3D9]
      ${className}
    `}>
      <div className="flex-1">
        <NavigationButton 
          item={previous}
          direction="previous"
          showTitle={showTitles}
          showArrow={showArrows}
          showStatus={showStatus}
          variant={mobileVariant}
        />
      </div>
      
      <div className="flex-1 flex justify-end">
        <NavigationButton 
          item={next}
          direction="next"
          showTitle={showTitles}
          showArrow={showArrows}
          showStatus={showStatus}
          variant={mobileVariant}
        />
      </div>
    </div>
  );
}