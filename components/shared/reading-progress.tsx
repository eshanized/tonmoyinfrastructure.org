'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export function ReadingProgress() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[55] h-0.5 origin-left bg-brand"
      style={{ scaleX: prefersReduced ? 0 : scaleX, display: prefersReduced ? 'none' : 'block' }}
      aria-hidden="true"
    />
  );
}
