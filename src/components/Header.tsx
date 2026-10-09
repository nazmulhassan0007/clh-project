import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { LEARNER_LOGIN_URL, NAV } from '../site'
import { EASE } from '../motion'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [wide, setWide] = useState(() => (typeof window === 'undefined' ? true : window.matchMedia('(min-width: 1100px)').matches))
  const reduce = !!useReducedMotion()
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const links = NAV.map((item) => (
    <li key={item.to}>
      <NavLink to={item.to} end={item.to === '/'}>
        {item.label}
      </NavLink>
    </li>
  ))

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link to="/" className="logo-link" aria-label="City Language Hub, home">
          <Logo tone="light" className="logo-full" />
          <Logo tone="light" className="logo-icon" iconOnly />
        </Link>
        {wide && (
          <nav className="nav" aria-label="Main">
            <ul>{links}</ul>
          </nav>
        )}
        {wide && (
          <a className="btn btn-dark header-login" href={LEARNER_LOGIN_URL}>
            Learner Login
          </a>
        )}
        {!wide && (
          <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        )}
      </div>
      <AnimatePresence>
        {!wide && open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Main"
            initial={{ opacity: 0, y: reduce ? 0 : -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } }}
            exit={{ opacity: 0, y: reduce ? 0 : -6, transition: { duration: 0.14, ease: EASE } }}
          >
            <ul>
              {links}
              <li className="nav-login-mobile">
                <a className="btn btn-dark" href={LEARNER_LOGIN_URL}>
                  Learner Login
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
