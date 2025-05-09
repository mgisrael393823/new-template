import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbItems } from '@/lib/navigation';
import { BreadcrumbsProps } from '@/types/ui';

export function Breadcrumbs({ 
  className = '',
  homeIcon = true,
  separator = <ChevronRight size={14} className="mx-2 text-gray-400" />,
  maxItems = 3
}: BreadcrumbsProps) {
  const router = useRouter();
  const breadcrumbItems = getBreadcrumbItems(router.pathname);
  
  // If only home or no valid items, don't show breadcrumbs
  if (breadcrumbItems.length <= 1) {
    return null;
  }
  
  // Handle truncation for long breadcrumb paths
  const visibleItems = breadcrumbItems.length > maxItems 
    ? [
        ...breadcrumbItems.slice(0, 1), 
        { title: '...', path: '' }, 
        ...breadcrumbItems.slice(-2)
      ]
    : breadcrumbItems;
  
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = item.path === '';
          
          // For home item
          if (index === 0 && homeIcon) {
            return (
              <li key={item.path} className="flex items-center">
                <Link 
                  href={item.path}
                  className="text-gray-500 hover:text-[#3B7A57] flex items-center"
                  aria-label="Home"
                >
                  <Home size={16} />
                </Link>
                {!isLast && separator}
              </li>
            );
          }
          
          // For ellipsis
          if (isEllipsis) {
            return (
              <li key="ellipsis" className="flex items-center">
                <span className="text-gray-400">{item.title}</span>
                {!isLast && separator}
              </li>
            );
          }
          
          // For normal items
          return (
            <li key={item.path} className="flex items-center">
              {isLast ? (
                <span className="font-medium text-[#3B7A57] truncate max-w-[200px]">
                  {item.title}
                </span>
              ) : (
                <Link 
                  href={item.path}
                  className="text-gray-500 hover:text-[#3B7A57] truncate max-w-[200px]"
                >
                  {item.title}
                </Link>
              )}
              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}