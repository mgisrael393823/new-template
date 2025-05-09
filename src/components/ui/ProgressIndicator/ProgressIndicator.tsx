import React from 'react';
import { motion } from 'framer-motion';
import { navigationItems } from '@/lib/navigation';
import useMobile from '@/hooks/use-mobile';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import Link from 'next/link';

export interface ProgressIndicatorProps {
  currentPath: string;
  className?: string;
  showLabels?: boolean;
  compact?: boolean;
  animated?: boolean;
}

export function ProgressIndicator({
  currentPath,
  className = '',
  showLabels = true,
  compact = false,
  animated = true
}: ProgressIndicatorProps) {
  const isMobile = useMobile();
  
  // Get navigation items that have a status
  const navItemsWithStatus = navigationItems
    .filter(item => item.path !== '/' && item.status) // Exclude home page
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // Calculate overall progress
  const totalItems = navItemsWithStatus.length;
  const completedItems = navItemsWithStatus.filter(item => item.status === 'completed').length;
  const inProgressItems = navItemsWithStatus.filter(item => item.status === 'in-progress').length;
  
  const progressPercentage = Math.round((completedItems / totalItems) * 100);
  
  // Return null if no items with status
  if (totalItems === 0) return null;
  
  // Get the compact mobile version
  if ((isMobile || compact) && !showLabels) {
    return (
      <div className={`bg-white rounded-md shadow-sm border border-[#E8E3D9] p-4 ${className}`}>
        <div className="mb-2 flex justify-between items-center">
          <h4 className="text-sm font-medium">Blueprint Progress</h4>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
        
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={animated ? { width: 0 } : { width: `${progressPercentage}%` }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#3B7A57] rounded-full"
          />
        </div>
        
        <div className="mt-2 text-xs text-gray-500 flex justify-between">
          <span>{completedItems} completed</span>
          <span>{inProgressItems} in progress</span>
        </div>
      </div>
    );
  }
  
  // Detailed progress view
  return (
    <div className={`bg-white rounded-md shadow-sm border border-[#E8E3D9] p-4 ${className}`}>
      <div className="mb-4 flex justify-between items-center">
        <h4 className="text-sm font-medium">Blueprint Progress</h4>
        <span className="text-sm font-medium">{progressPercentage}%</span>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={animated ? { width: 0 } : { width: `${progressPercentage}%` }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-[#3B7A57] rounded-full"
        />
      </div>
      
      {showLabels && (
        <div className="space-y-2.5">
          {navItemsWithStatus.map((item) => {
            // Determine status icon and style
            let statusIcon;
            let statusClass;
            
            switch(item.status) {
              case 'completed':
                statusIcon = <CheckCircle size={16} className="text-green-500" />;
                statusClass = 'text-green-500';
                break;
              case 'in-progress':
                statusIcon = <Clock size={16} className="text-amber-500" />;
                statusClass = 'text-amber-500';
                break;
              default:
                statusIcon = <Circle size={16} className="text-gray-300" />;
                statusClass = 'text-gray-400';
            }
            
            // Determine if this is the current page
            const isCurrent = item.path === currentPath;
            
            return (
              <div 
                key={item.path} 
                className={`flex items-center text-sm ${isCurrent ? 'font-medium' : ''}`}
              >
                <span className="mr-2">{statusIcon}</span>
                <Link 
                  href={item.path}
                  className={`
                    flex-grow hover:underline
                    ${isCurrent ? 'text-[#3B7A57] font-medium' : 'text-gray-700'}
                  `}
                >
                  {item.title}
                </Link>
                <span className={`text-xs ${statusClass}`}>
                  {item.status === 'completed' ? 'Complete' : 
                   item.status === 'in-progress' ? 'In Progress' : 
                   'Not Started'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}