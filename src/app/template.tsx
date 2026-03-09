"use client";

import { motion } from "framer-motion";

/**
 * template.tsx re-renders on every navigation in Next.js App Router,
 * enabling smooth page entrance transitions.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.35 },
      }}
    >
      {children}
    </motion.div>
  );
}
