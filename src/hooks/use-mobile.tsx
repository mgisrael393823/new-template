import { useState, useEffect } from 'react';

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if window is defined (to avoid SSR issues)
  const isClient = typeof window === 'object';

  useEffect(() => {
    if (!isClient) {
      return;
    }

    // Function to check if viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkMobile();

    // Add resize event listener
    window.addEventListener('resize', checkMobile);

    // Clean up event listener
    return () => window.removeEventListener('resize', checkMobile);
  }, [isClient]);

  return isMobile;
}