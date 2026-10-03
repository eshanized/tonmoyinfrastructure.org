'use client';

import { useEffect, useRef, useState } from 'react';

export function CountUp({
  end,
  duration = 1.5,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Default to end value so SSR output is immediately accurate and meaningful
  const [display, setDisplay] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(end);
      return;
    }

    let started = false;
    let animId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          observer.disconnect();
          const startTime = performance.now();
          const startVal = 0;
          setDisplay(startVal);

          const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease out
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setDisplay(startVal + (end - startVal) * easeProgress);

            if (progress < 1) {
              animId = requestAnimationFrame(animate);
            }
          };

          animId = requestAnimationFrame(animate);
        }
      },
      { rootMargin: '-40px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  );
}
