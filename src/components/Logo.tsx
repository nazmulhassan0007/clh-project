import { ICON, WORDMARK } from './logoPaths'

type Props = { tone?: 'dark' | 'light'; iconOnly?: boolean; className?: string }

/** Official CLH lockup. tone="dark" = for dark backgrounds (purple icon, white wordmark). */
export default function Logo({ tone = 'dark', iconOnly = false, className }: Props) {
  const word = tone === 'dark' ? '#faf8ff' : '#022433'
  return (
    <svg
      className={className}
      viewBox={iconOnly ? '118 24 284 302' : '118 24 914 302'}
      role="img"
      aria-label="City Language Hub"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={ICON} fill="#a75cff" />
      {!iconOnly && <path d={WORDMARK} fill={word} />}
    </svg>
  )
}
