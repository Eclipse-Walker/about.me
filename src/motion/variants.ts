import type { Variants } from 'framer-motion';

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const viewportSettings = {
  once: true,
  amount: 0.2,
} as const;

export const sectionTitleVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
};

export const blockVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.12 + Math.min(index, 6) * 0.08,
      ease: easeOutExpo,
    },
  }),
};
