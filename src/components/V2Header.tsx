import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Pill from './Pill'
import { LEARNER_LOGIN_URL } from '../site'
import { EASE } from '../motion'

const nav = [
  { to: '/v2/programmes', label: 'Programmes' },
  { to: '/v2/learning-platform', label: 'Learning platform' },
  { to: '/v2/learner-support', label: 'Learner support' },
  { to: '/v2/about-us', label: 'About' },
  { to: '/v2/contact-us', label: 'Contact' },
]

/** Version 2 header for inner pages: a light rounded bar. */
export default function V2Header() {
  const [menu, setMenu] = useState(false)
  const reduce = !!useReducedMotion()
  const { pathname } = useLocation()
  useEffect(() => setMenu(false), [pathname])
  return (
    <header className="v2-bar">
      <Link to="/v2" className="v2-bar-logo" aria-label="City Language Hub, home">
        <Logo tone="light" />
      </Link>
      <nav className="v2-bar-links" aria-label="Main">
        {nav.map((n) => (
          <NavLink key={n.to} to={n.to}>
            {n.label}
          </NavLink>
        ))}
      </nav>
      <a className="v2-bar-login" href={LEARNER_LOGIN_URL}>
        Learner login
      </a>
      <span className="v2-bar-cta">
        <Pill tone="primary" to="/contact-us">
          Make an enquiry
        </Pill>
      </span>
      <button type="button" className="v2-bar-burger" aria-expanded={menu} aria-controls="v2-bar-mobile" onClick={() => setMenu((v) => !v)}>
        {menu ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        <span className="sr-only">{menu ? 'Close menu' : 'Open menu'}</span>
      </button>
      <AnimatePresence>
        {menu && (
          <motion.div id="v2-bar-mobile" className="v2-bar-mobile" initial={{ opacity: 0, y: reduce ? 0 : -8 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to}>
                {n.label}
              </NavLink>
            ))}
            <a href={LEARNER_LOGIN_URL}>Learner login</a>
            <Pill tone="primary" to="/contact-us">
              Make an enquiry
            </Pill>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
