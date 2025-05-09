/**
 * Navigation Configuration
 * Re-exports navigation-related configurations
 */

export * from './items';

// Navigation configuration options
export const navigationConfig = {
  // Default navigation options
  defaults: {
    showHomeIcon: true,
    showLabels: true,
    maxItems: 3, // Maximum number of items to show in breadcrumbs before truncating
  },
  
  // Paths that should be excluded from navigation components
  excludePaths: [
    '/404',
    '/_error',
  ],
  
  // Optional - configure navigation variants 
  variants: {
    sidebar: {
      defaultExpanded: true,
      mobileBreakpoint: 768,
    },
    
    breadcrumbs: {
      separator: 'chevron', // 'chevron', 'slash', 'dot'
    },
    
    progressIndicator: {
      showPercentage: true,
      animated: true,
    },
  }
};