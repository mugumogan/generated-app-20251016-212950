import { motion } from 'framer-motion';
import React from 'react';
const animations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
type AnimatedPageProps = {
  children: React.ReactNode;
};
export function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}