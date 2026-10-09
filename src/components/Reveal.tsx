import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { listContainer, listItem } from '../motion'

/** Staggered list: children animate in once when the group scrolls into view. */
export function StaggerGroup({ as = 'ul', className, children, ...rest }: { as?: 'ul' | 'ol' | 'dl' | 'div'; className?: string; children: ReactNode } & Record<string, unknown>) {
  const Tag = motion[as] as ElementType
  return (
    <Tag className={className} variants={listContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -12% 0px' }} {...rest}>
      {children}
    </Tag>
  )
}

export function StaggerItem({ as = 'li', className, children }: { as?: 'li' | 'div'; className?: string; children: ReactNode }) {
  const reduce = !!useReducedMotion()
  const Tag = motion[as] as ElementType
  return (
    <Tag className={className} variants={listItem(reduce)}>
      {children}
    </Tag>
  )
}
