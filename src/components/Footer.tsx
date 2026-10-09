import { Link } from 'react-router-dom'
import Logo from './Logo'
import { LEARNER_LOGIN_URL } from '../site'

const links = [
  { to: '/programmes', label: 'Programmes' },
  { to: '/learning-platform', label: 'Learning Platform' },
  { to: '/learner-support', label: 'Learner Support' },
  { to: '/contact-us', label: 'Contact Us' },
  { to: '/careers', label: 'Careers' },
]
const legal = [
  { to: '/privacy-notice', label: 'Privacy Notice' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
  { to: '/terms-and-conditions', label: 'Terms and Conditions' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo className="footer-logo" />
          <p>Academic learning, professional communication and workplace development.</p>
          <p className="footer-network">
            City Language Hub is part of City Language School under Planet Education Network.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="footer-h">Explore</h2>
          <ul>
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={LEARNER_LOGIN_URL}>Learner Login</a>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="footer-h">Contact</h2>
          <address>
            Ground Floor Unit H1, Moorfoot House,
            <br />
            Meridian Gate, 221 Marsh Wall,
            <br />
            London E14 9FJ
          </address>
          <p>
            <a href="mailto:info@citylanguagehub.co.uk">info@citylanguagehub.co.uk</a>
          </p>
          <p className="footer-hours">Monday to Friday, 9am to 5pm UK time</p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© 2026 City Language Hub. All rights reserved.</p>
        <ul>
          {legal.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
