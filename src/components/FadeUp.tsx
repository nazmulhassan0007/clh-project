import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '../motion'

/** One consistent entrance for blocks: short rise, once, when 15% in view. */
export default function FadeUp({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = !!useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
