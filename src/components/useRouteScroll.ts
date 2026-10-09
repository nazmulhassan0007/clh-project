import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** New page: back to top. Same page with a #hash: scroll to that section. */
export function useRouteScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}
