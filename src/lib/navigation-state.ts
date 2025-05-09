/**
 * Navigation state manager
 * Handles state persistence for navigation, scroll position, and active sections
 */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Types
export interface NavigationState {
  scrollPositions: Record<string, number>;
  expandedSections: string[];
  activeSubsections: Record<string, string>;
  visitedPages: string[];
  lastVisited: string | null;
}

const STORAGE_KEY = 'blueprint_navigation_state';

// Function to get the initial state
function getInitialState(): NavigationState {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return {
      scrollPositions: {},
      expandedSections: [],
      activeSubsections: {},
      visitedPages: [],
      lastVisited: null
    };
  }
  
  // Try to load state from localStorage
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading navigation state:', error);
  }
  
  // Return default state if no saved state
  return {
    scrollPositions: {},
    expandedSections: [],
    activeSubsections: {},
    visitedPages: [],
    lastVisited: null
  };
}

// Function to save state to localStorage
function saveState(state: NavigationState) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving navigation state:', error);
  }
}

// Hook to use navigation state
export function useNavigationState() {
  const [state, setState] = useState<NavigationState>(getInitialState);
  const router = useRouter();
  
  // Save scroll position on route change
  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (typeof window === 'undefined') return;
      
      setState(prevState => {
        const newState = {
          ...prevState,
          scrollPositions: {
            ...prevState.scrollPositions,
            [router.asPath]: window.scrollY
          },
          lastVisited: router.asPath
        };
        
        saveState(newState);
        return newState;
      });
    };
    
    // Update visited pages on route change
    const handleRouteChangeComplete = (url: string) => {
      setState(prevState => {
        if (prevState.visitedPages.includes(url)) {
          return prevState;
        }
        
        const newState = {
          ...prevState,
          visitedPages: [...prevState.visitedPages, url]
        };
        
        saveState(newState);
        return newState;
      });
      
      // Restore scroll position
      const scrollPosition = state.scrollPositions[url];
      if (scrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 0);
      }
    };
    
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, state.scrollPositions]);
  
  // Set expanded section
  const setExpandedSection = (path: string, expanded: boolean) => {
    setState(prevState => {
      const newExpandedSections = expanded
        ? [...prevState.expandedSections, path]
        : prevState.expandedSections.filter(p => p !== path);
      
      const newState = {
        ...prevState,
        expandedSections: newExpandedSections
      };
      
      saveState(newState);
      return newState;
    });
  };
  
  // Toggle expanded section
  const toggleExpandedSection = (path: string) => {
    setState(prevState => {
      const isExpanded = prevState.expandedSections.includes(path);
      const newExpandedSections = isExpanded
        ? prevState.expandedSections.filter(p => p !== path)
        : [...prevState.expandedSections, path];
      
      const newState = {
        ...prevState,
        expandedSections: newExpandedSections
      };
      
      saveState(newState);
      return newState;
    });
  };
  
  // Set active subsection
  const setActiveSubsection = (page: string, subsectionId: string) => {
    setState(prevState => {
      const newState = {
        ...prevState,
        activeSubsections: {
          ...prevState.activeSubsections,
          [page]: subsectionId
        }
      };
      
      saveState(newState);
      return newState;
    });
  };
  
  // Check if a section is expanded
  const isExpanded = (path: string) => {
    return state.expandedSections.includes(path);
  };
  
  // Get active subsection for a page
  const getActiveSubsection = (page: string) => {
    return state.activeSubsections[page] || null;
  };
  
  // Check if a page has been visited
  const hasVisited = (path: string) => {
    return state.visitedPages.includes(path);
  };
  
  // Get the percentage of visited pages
  const getVisitedPercentage = (paths: string[]) => {
    if (paths.length === 0) return 0;
    
    const visitedCount = paths.filter(path => state.visitedPages.includes(path)).length;
    return (visitedCount / paths.length) * 100;
  };
  
  // Clear navigation state
  const clearState = () => {
    setState({
      scrollPositions: {},
      expandedSections: [],
      activeSubsections: {},
      visitedPages: [],
      lastVisited: null
    });
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };
  
  return {
    state,
    setExpandedSection,
    toggleExpandedSection,
    setActiveSubsection,
    isExpanded,
    getActiveSubsection,
    hasVisited,
    getVisitedPercentage,
    clearState
  };
}