import type { Variants } from 'framer-motion'

/** Strong ease-out: UI motion should start fast. */
export const EASE = [0.23, 1, 0.32, 1] as const

export const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export const riseIn = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
})

export const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export const listItem = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
})
