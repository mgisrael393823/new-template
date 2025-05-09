/**
 * Navigation utility functions for the application
 */
import { 
  NavigationItem, 
  SubsectionItem, 
  SearchResult, 
  AdjacentNavigation,
  BreadcrumbItem
} from '@/types/navigation';

import { navigationItems, navigationConfig } from '@/config/navigation';

/**
 * Get navigation item by path
 */
export function getNavigationItemByPath(path: string): NavigationItem | undefined {
  return navigationItems.find(item => item.path === path);
}

/**
 * Get next and previous navigation items based on current path
 */
export function getAdjacentNavigationItems(currentPath: string): AdjacentNavigation {
  const sortedItems = [...navigationItems].sort((a, b) => (a.order || 0) - (b.order || 0));
  const currentIndex = sortedItems.findIndex(item => item.path === currentPath);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  const previous = currentIndex > 0 ? sortedItems[currentIndex - 1] : null;
  const next = currentIndex < sortedItems.length - 1 ? sortedItems[currentIndex + 1] : null;
  
  return { previous, next };
}

/**
 * Get breadcrumb items for a given path
 */
export function getBreadcrumbItems(path: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];
  
  // Add home as first item
  items.push({ title: 'Home', path: '/' });
  
  // If we're on the home page or excluded path, just return that
  if (path === '/' || navigationConfig.excludePaths.includes(path)) {
    return items;
  }
  
  // For any other page, add the current page
  const currentItem = getNavigationItemByPath(path);
  if (currentItem) {
    items.push({ title: currentItem.title, path });
  }
  
  // Apply maxItems limit from config if needed
  const { maxItems } = navigationConfig.defaults;
  if (items.length > maxItems) {
    return [
      ...items.slice(0, 1),
      { title: '...', path: '' },
      ...items.slice(-1)
    ];
  }
  
  return items;
}