"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

interface StaggerGridProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function StaggerGrid({ children, style, className }: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, style, className }: StaggerGridProps) {
  return (
    <motion.div variants={itemVariants} style={style} className={className}>
      {children}
    </motion.div>
  );
}
