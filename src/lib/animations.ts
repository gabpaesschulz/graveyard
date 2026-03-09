import type { Variants } from "framer-motion";

// ─── Easing presets ───────────────────────────────────────────────────────────

/** Expo ease-out: fast acceleration, elegant deceleration — cinematic feel */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
/** Quart ease in-out: perfectly smooth, no abruptness */
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as [number, number, number, number];
/** Classic cinematic ease */
export const EASE_CINEMATIC = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ─── Entrance variants ────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

// ─── Stagger container ────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

// ─── Card reveal (for grid stagger) ──────────────────────────────────────────

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

// ─── Scroll-triggered section reveal ─────────────────────────────────────────

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

// ─── Spring config for interactive hover ──────────────────────────────────────

export const CARD_HOVER_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 28,
  mass: 0.75,
};

export const SNAPPY_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};
