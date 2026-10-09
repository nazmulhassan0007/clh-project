import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useRouteScroll } from './useRouteScroll'

export default function Layout() {
  useRouteScroll()
  return (
    <>
      <a className="skip" href="#main">
        Skip to main content
      </a>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
