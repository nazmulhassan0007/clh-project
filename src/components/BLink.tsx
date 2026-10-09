import { Link, useLocation, type LinkProps } from 'react-router-dom'

/** Version 2 lives under /v2. Internal links keep the visitor inside the version they are viewing. */
export function useBase() {
  const { pathname } = useLocation()
  return pathname === '/v2' || pathname.startsWith('/v2/') ? '/v2' : ''
}

export function withBase(base: string, to: string) {
  if (!base || !to.startsWith('/') || to === '/v2' || to.startsWith('/v2/')) return to
  return to === '/' ? '/v2' : base + to
}

export default function BLink({ to, ...rest }: LinkProps) {
  const base = useBase()
  return <Link {...rest} to={typeof to === 'string' ? withBase(base, to) : to} />
}
