"use client";

import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + Blur + Slide reveal al entrar en viewport */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  blur = true,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? "blur(12px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Contenedor con stagger para hijos <StaggerItem /> */
export function Stagger({
  children,
  className = "",
  stagger = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/** Reveal palabra por palabra con blur (para headlines).
 *  El className se aplica a CADA palabra (no al contenedor) para que
 *  utilidades como .text-gradient (background-clip: text) sí rendericen. */
export function WordsReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          // mr-[0.28em]: los inline-block colapsan el espacio final,
          // sin este margen las palabras se ven pegadas
          className={`mr-[0.28em] inline-block will-change-transform ${className}`}
          variants={{
            hidden: { opacity: 0, y: "0.6em", filter: "blur(10px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.9, ease },
            },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
