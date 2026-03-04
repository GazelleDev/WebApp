import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const quickTransition: Transition = {
  duration: 0.42,
  ease: motionEase,
};

export const mediumTransition: Transition = {
  duration: 0.72,
  ease: motionEase,
};

export const slowTransition: Transition = {
  duration: 0.9,
  ease: motionEase,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.8,
};

export const revealViewport = {
  once: true,
  margin: "-96px",
};

export const tightRevealViewport = {
  once: true,
  margin: "-64px",
};

type RevealOptions = {
  axis?: "x" | "y";
  distance?: number;
  delay?: number;
  duration?: number;
  scale?: number;
  opacity?: number;
};

export function createRevealVariant({
  axis = "y",
  distance = 24,
  delay = 0,
  duration = 0.72,
  scale = 0.985,
  opacity = 0,
}: RevealOptions = {}): Variants {
  const hidden: { opacity: number; scale: number; x?: number; y?: number } = {
    opacity,
    scale,
  };
  hidden[axis] = distance;

  const visible: {
    opacity: number;
    scale: number;
    x?: number;
    y?: number;
    transition: Transition;
  } = {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: motionEase,
    },
  };
  visible[axis] = 0;

  return { hidden, visible };
}

export function createStaggerContainer({
  delayChildren = 0.08,
  staggerChildren = 0.1,
}: {
  delayChildren?: number;
  staggerChildren?: number;
} = {}): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };
}

export const fadeUpVariant = createRevealVariant();
export const fadeLeftVariant = createRevealVariant({ axis: "x" });
export const heroCopyVariant = createRevealVariant({
  distance: 30,
  duration: 0.82,
  scale: 0.99,
});
export const heroVisualVariant = createRevealVariant({
  distance: 32,
  delay: 0.08,
  duration: 0.9,
  scale: 0.992,
});
export const overlayCardVariant = createRevealVariant({
  distance: 16,
  duration: 0.58,
  scale: 0.98,
});
export const heroImageVariant: Variants = {
  hidden: { opacity: 0.78, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: motionEase,
    },
  },
};
export const staggerContainer = createStaggerContainer({
  delayChildren: 0.08,
  staggerChildren: 0.12,
});
export const tightStaggerContainer = createStaggerContainer({
  delayChildren: 0.04,
  staggerChildren: 0.08,
});

export const modalBackdropVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.24,
      ease: motionEase,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: motionEase,
    },
  },
};

export const modalPanelVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.34,
      ease: motionEase,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.985,
    transition: {
      duration: 0.22,
      ease: motionEase,
    },
  },
};

export function PageTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={shouldReduceMotion ? quickTransition : mediumTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
