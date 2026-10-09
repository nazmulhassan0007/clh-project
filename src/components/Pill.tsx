import BLink from './BLink'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

const MLink = motion.create(BLink)

type Props = { tone?: 'primary' | 'ink' | 'glass' | 'outline'; to?: string; href?: string; arrow?: boolean; block?: boolean; type?: 'submit'; children: ReactNode; onClick?: () => void }

const spring = { type: 'spring', stiffness: 420, damping: 26 } as const
const parent = { rest: {}, hover: {} }
const arrowV = { rest: { x: 0 }, hover: { x: 4 } }

/** Pill button with spring press feedback and an arrow that nudges on hover. */
export default function Pill({ tone = 'primary', to, href, arrow, block, type, children, onClick }: Props) {
  const cls = `v2-pill v2-pill-${tone}${block ? ' v2-pill-block' : ''}`
  const inner = (
    <>
      {children}
      {arrow && (
        <motion.span className="v2-pill-arrow" variants={arrowV} transition={spring}>
          <ArrowRight size={16} aria-hidden="true" />
        </motion.span>
      )}
    </>
  )
  const common = { className: cls, initial: 'rest', whileHover: 'hover', whileTap: { scale: 0.97 }, variants: parent, transition: spring }
  if (type === 'submit') return <motion.button type="submit" {...common}>{inner}</motion.button>
  if (href) return <motion.a href={href} onClick={onClick} {...common}>{inner}</motion.a>
  return <MLink to={to ?? '/'} onClick={onClick} {...common}>{inner}</MLink>
}
