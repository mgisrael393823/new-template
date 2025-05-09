/**
 * UI Component Type Definitions
 */
import { ReactNode } from 'react';

/**
 * Base props interface that many components extend
 */
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Props for components with variants
 */
export interface VariantProps<T extends string> extends BaseComponentProps {
  variant?: T;
}

/**
 * Props for heading components
 */
export interface HeadingProps extends BaseComponentProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Props for highlight box components
 */
export interface HighlightBoxProps extends VariantProps<'primary' | 'secondary'> {
}

/**
 * Props for navigation control components
 */
export interface NavigationControlsProps extends BaseComponentProps {
  showTitles?: boolean;
  showArrows?: boolean;
  showStatus?: boolean;
  variant?: 'default' | 'simple' | 'compact';
}

/**
 * Props for breadcrumb components
 */
export interface BreadcrumbsProps extends BaseComponentProps {
  homeIcon?: boolean;
  separator?: ReactNode;
  maxItems?: number;
}

/**
 * Props for progress indicator components
 */
export interface ProgressIndicatorProps extends BaseComponentProps {
  currentPath: string;
  showLabels?: boolean;
  compact?: boolean;
  animated?: boolean;
}

/**
 * Props for search components
 */
export interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  searchIndex: any[];
}

/**
 * Props for stat box components
 */
export interface StatBoxProps extends BaseComponentProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label?: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

/**
 * Props for chart components
 */
export interface ChartProps extends BaseComponentProps {
  title: string;
  description?: string;
  height?: number;
  width?: string | number;
  data: any[];
  accessibleAltText?: string;
}