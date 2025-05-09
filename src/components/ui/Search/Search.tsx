import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search as SearchIcon, 
  X, 
  Loader2, 
  ArrowRight,
  FileText
} from 'lucide-react';
import { SearchResult } from '@/types/navigation';
import { clientSearch } from '@/lib/search';
import useMobile from '@/hooks/use-mobile';

export interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  searchIndex: SearchResult[];
}

export function Search({ isOpen, onClose, searchIndex }: SearchProps) {
  const router = useRouter();
  const isMobile = useMobile();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<(SearchResult & { score?: number })[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  
  // Focus the input when the search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Debounce the search to avoid too many searches
    const timeoutId = setTimeout(() => {
      const searchResults = clientSearch(query, searchIndex);
      setResults(searchResults);
      setIsSearching(false);
      setSelectedIndex(0);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [query, searchIndex]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigateToResult(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };
  
  // Scroll to selected result
  useEffect(() => {
    if (resultsContainerRef.current && results.length > 0) {
      const selectedElement = document.getElementById(`search-result-${selectedIndex}`);
      
      if (selectedElement) {
        const container = resultsContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const selectedRect = selectedElement.getBoundingClientRect();
        
        if (
          selectedRect.bottom > containerRect.bottom ||
          selectedRect.top < containerRect.top
        ) {
          selectedElement.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      }
    }
  }, [selectedIndex, results]);
  
  // Navigate to search result
  const navigateToResult = (result: SearchResult) => {
    router.push(result.path);
    onClose();
    setQuery('');
  };
  
  // Animation variants
  const overlayVariants = {
    closed: { opacity: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, transition: { duration: 0.2 } }
  };
  
  const contentVariants = {
    closed: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: 0.2 } 
    },
    open: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.2, delay: 0.1 } 
    }
  };
  
  // Render search result with highlighted matches
  const renderHighlightedContent = (context: string) => {
    // The context already has <mark> tags
    return <span dangerouslySetInnerHTML={{ __html: context }} />;
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center">
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Search panel */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={contentVariants}
            className={`
              relative bg-white rounded-lg shadow-xl overflow-hidden
              w-full max-w-2xl mt-16 mx-4 max-h-[80vh] flex flex-col
            `}
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="p-4 border-b border-[#E8E3D9] flex items-center">
              <SearchIcon size={20} className="text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search blueprint content..."
                className="flex-grow bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                autoComplete="off"
              />
              
              {isSearching && <Loader2 size={20} className="text-gray-400 animate-spin mr-2" />}
              
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="Close search"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            {/* Search results */}
            <div 
              ref={resultsContainerRef}
              className="flex-grow overflow-y-auto p-2"
            >
              {query.length < 2 ? (
                <div className="py-8 text-center text-gray-500">
                  <p>Type at least 2 characters to search</p>
                </div>
              ) : results.length === 0 && !isSearching ? (
                <div className="py-8 text-center text-gray-500">
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {results.map((result, index) => (
                    <li 
                      key={result.id}
                      id={`search-result-${index}`}
                      className={`
                        rounded-md overflow-hidden transition-colors 
                        ${selectedIndex === index ? 'bg-[#3B7A57] bg-opacity-10' : 'hover:bg-gray-100'}
                      `}
                    >
                      <button
                        className="w-full text-left p-3"
                        onClick={() => navigateToResult(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <FileText size={16} className="text-[#3B7A57] mr-2" />
                            <span className="font-medium text-[#3B7A57]">
                              {result.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {result.section}
                          </span>
                        </div>
                        
                        {result.matches.length > 0 && (
                          <div className="text-sm text-gray-700 line-clamp-2">
                            {renderHighlightedContent(result.matches[0].context)}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-end mt-1 text-xs text-[#3B7A57]">
                          <span>View</span>
                          <ArrowRight size={12} className="ml-1" />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Search tips */}
            <div className="px-4 py-3 border-t border-[#E8E3D9] bg-gray-50 text-xs text-gray-500">
              <p>
                <span className="font-medium">Search tips:</span>
                {' '}Use the up and down arrow keys to navigate results, Enter to select, Esc to close
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}