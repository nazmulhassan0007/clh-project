import { Outlet } from 'react-router-dom'
import V2Header from './V2Header'
import V2Foot from './V2Foot'
import { useRouteScroll } from './useRouteScroll'
import '../pages/v2.css'

export default function V2Layout() {
  useRouteScroll()
  return (
    <div className="v2">
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <V2Header />
      <Outlet />
      <footer className="v2-card v2-dark v2-footer" aria-label="Site footer">
        <div className="v2-glow v2-glow-left" aria-hidden="true" />
        <V2Foot />
      </footer>
    </div>
  )
}
