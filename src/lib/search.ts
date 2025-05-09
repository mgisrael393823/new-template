/**
 * Blueprint content search functionality
 */
import { NavigationItem, SearchResult } from '@/types/navigation';

// Mock search index for client-side - in a real app, this would be fetched from an API
export const mockSearchIndex: SearchResult[] = [
  {
    id: 'executive-summary-overview',
    title: 'Overview',
    content: 'Aspen Heights represents a premium Multifamily development located in the Downtown area of Atlanta, Georgia.',
    path: '/executive-summary#overview',
    section: 'Executive Summary',
    priority: 5,
    matches: []
  },
  {
    id: 'executive-summary-market-positioning',
    title: 'Market Positioning',
    content: 'The property will differentiate itself through location advantage, target demographic, premium amenities, and design excellence.',
    path: '/executive-summary#market-positioning',
    section: 'Executive Summary',
    priority: 5,
    matches: []
  },
  {
    id: 'market-intelligence-overview',
    title: 'Market Overview',
    content: 'Analysis of the Atlanta market showing strong demand fundamentals with population and job growth in targeted sectors.',
    path: '/market-intelligence#market-overview',
    section: 'Market Intelligence',
    priority: 5,
    matches: []
  },
  {
    id: 'competitive-landscape-competitive-set',
    title: 'Competitive Set',
    content: 'Analysis of competing properties in the Downtown Atlanta area including The Novare, Centennial Place, and The Georgian.',
    path: '/competitive-landscape#competitive-set',
    section: 'Competitive Landscape',
    priority: 5,
    matches: []
  },
  {
    id: 'pricing-framework-pricing-strategy',
    title: 'Pricing Strategy',
    content: 'Implement tiered pricing structure with premium on upper floors and units with skyline views.',
    path: '/pricing-framework#pricing-strategy',
    section: 'Pricing Framework',
    priority: 5,
    matches: []
  },
  {
    id: 'go-to-market-marketing-strategy',
    title: 'Marketing Strategy',
    content: 'Digital-first marketing strategy targeting specific demographic segments with tailored messaging.',
    path: '/go-to-market#marketing-strategy',
    section: 'Go-to-Market Roadmap',
    priority: 5,
    matches: []
  }
];

// Perform a search on the client-side
export function clientSearch(query: string, searchIndex: SearchResult[]) {
  if (!query || query.length < 2) {
    return [];
  }
  
  const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1);
  
  if (terms.length === 0) {
    return [];
  }
  
  const results = searchIndex.map(item => {
    const matches: { text: string; context: string }[] = [];
    let score = 0;
    
    const content = item.content.toLowerCase();
    const title = item.title.toLowerCase();
    
    // Search for exact phrase match first (highest priority)
    if (content.includes(query.toLowerCase())) {
      score += 100 + item.priority;
      
      // Extract context around the match
      const index = content.indexOf(query.toLowerCase());
      const start = Math.max(0, index - 30);
      const end = Math.min(content.length, index + query.length + 30);
      const context = '...' + content.slice(start, end).replace(
        new RegExp(query.toLowerCase(), 'gi'),
        match => `<mark>${match}</mark>`
      ) + '...';
      
      matches.push({ 
        text: query, 
        context
      });
    }
    
    // Then search for individual terms
    for (const term of terms) {
      if (content.includes(term)) {
        // If term is in the title, give it higher score
        if (title.includes(term)) {
          score += 50 + item.priority;
        } else {
          score += 10 + item.priority;
        }
        
        // Extract context around the match
        const index = content.indexOf(term);
        const start = Math.max(0, index - 30);
        const end = Math.min(content.length, index + term.length + 30);
        const context = '...' + content.slice(start, end).replace(
          new RegExp(term, 'gi'),
          match => `<mark>${match}</mark>`
        ) + '...';
        
        // Only add if not already included
        if (!matches.some(m => m.text === term)) {
          matches.push({ 
            text: term, 
            context
          });
        }
      }
    }
    
    return {
      ...item,
      score,
      matches
    };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score);
  
  return results;
}