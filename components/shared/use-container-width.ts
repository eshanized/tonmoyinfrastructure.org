'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook to provide responsive container width for SVG chart components.
 * Initializes with defaultWidth during SSR/static export to ensure complete
 * SVG prerendering in static HTML, then measures actual container clientWidth
 * on mount and window resize via ResizeObserver.
 */
export function useContainerWidth(defaultWidth = 600) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(defaultWidth);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        const measured = containerRef.current.getBoundingClientRect().width;
        if (measured > 0) {
          setWidth(Math.floor(measured));
        }
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { containerRef, width };
}
