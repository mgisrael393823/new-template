/**
 * Navigation type definitions
 */

/**
 * Represents a subsection of a page, typically used for TOC
 */
export interface SubsectionItem {
  title: string;
  anchor: string;
  description?: string;
}

/**
 * Represents a main navigation item in the site structure
 */
export interface NavigationItem {
  title: string;
  path: string;
  description?: string;
  icon?: string;
  subsections?: SubsectionItem[];
  status?: 'completed' | 'in-progress' | 'not-started';
  order?: number;
}

/**
 * Represents a search result item
 */
export interface SearchResult {
  id: string;
  title: string;
  content: string;
  path: string;
  section: string;
  priority: number;
  matches: {
    text: string;
    context: string;
  }[];
}

/**
 * Represents adjacent navigation items (previous and next)
 */
export interface AdjacentNavigation {
  previous: NavigationItem | null;
  next: NavigationItem | null;
}

/**
 * Represents a breadcrumb item in the breadcrumb trail
 */
export interface BreadcrumbItem {
  title: string;
  path: string;
}