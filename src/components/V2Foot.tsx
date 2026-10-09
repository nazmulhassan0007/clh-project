import { useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import Link from './BLink'
import Logo from './Logo'
import Pill from './Pill'
import { LEARNER_LOGIN_URL } from '../site'

export default function V2Foot() {
  const reduce = !!useReducedMotion()
  return (
        <div className="v2-foot">
          <div className="v2-foot-top">
            <div className="v2-foot-brand">
              <Logo tone="dark" className="v2-foot-logo" />
              <p>Academic learning, professional communication and workplace development.</p>
              <p className="v2-foot-net">City Language Hub is part of City Language School under Planet Education Network.</p>
            </div>
            <div className="v2-foot-ctas">
              <Pill tone="primary" href={LEARNER_LOGIN_URL}>
                Learner login
              </Pill>
              <Pill tone="glass" to="/contact-us" arrow>
                Make an enquiry
              </Pill>
            </div>
          </div>

          <div className="v2-foot-cols">
            <nav aria-label="Explore">
              <h2>Explore</h2>
              <Link to="/programmes">Programmes</Link>
              <Link to="/learning-platform">Learning platform</Link>
              <Link to="/learner-support">Learner support</Link>
              <Link to="/about-us">About</Link>
              <Link to="/contact-us">Contact</Link>
              <Link to="/careers">Careers</Link>
            </nav>
            <nav aria-label="Programmes">
              <h2>Programmes</h2>
              <Link to="/programmes/academic-learning-platform">Academic Learning Platform (ALP)</Link>
              <Link to="/programmes/corporate-training-services">Corporate Training Services (CTS)</Link>
              <Link to="/programmes/academic-readiness-programme">Academic Readiness Programme</Link>
            </nav>
            <nav aria-label="Policies">
              <h2>Policies</h2>
              <Link to="/privacy-notice">Privacy Notice</Link>
              <Link to="/cookie-policy">Cookie Policy</Link>
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </nav>
            <div>
              <h2>Contact</h2>
              <address>
                Ground Floor Unit H1, Moorfoot House,
                <br />
                Meridian Gate, 221 Marsh Wall,
                <br />
                London E14 9FJ
              </address>
              <a href="mailto:info@citylanguagehub.co.uk">info@citylanguagehub.co.uk</a>
              <p>Monday to Friday, 9am to 5pm UK time</p>
            </div>
          </div>

          <div className="v2-giant-wrap" aria-hidden="true">
            <p className="v2-giant">City Language Hub</p>
          </div>

          <div className="v2-legal">
            <p>© 2026 City Language Hub. All rights reserved.</p>
            <ul>
              <li>
                <Link to="/privacy-notice">Privacy</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookies</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms</Link>
              </li>
            </ul>
            <button type="button" className="v2-top" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}>
              Back to top <ArrowUp size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
  )
}
