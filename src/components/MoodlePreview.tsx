import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, Calendar, CheckSquare, CircleHelp, FileText, FolderOpen, Home, PenLine, Presentation, Bell, UserRound } from 'lucide-react'
import Logo from './Logo'
import { EASE } from '../motion'

const nav = [
  { label: 'Home', icon: Home, active: true },
  { label: 'My programme', icon: BookOpen },
  { label: 'Calendar', icon: Calendar },
  { label: 'My files', icon: FolderOpen },
  { label: 'Help and support', icon: CircleHelp },
]
const phases = [
  { n: 'Phase 1', name: 'Pre-Admission Support', tone: 't1', pct: 72 },
  { n: 'Phase 2', name: 'Six-Week Transition Programme', tone: 't2', pct: 40 },
  { n: 'Phase 3', name: 'Ongoing Learner Success Support', tone: 't3', pct: 55 },
]
const topics = [
  { label: 'Workshop', icon: Presentation },
  { label: 'Reading', icon: FileText },
  { label: 'Practice', icon: PenLine },
  { label: 'Quiz', icon: CheckSquare },
]

export default function MoodlePreview({ full = false, compact = false }: { full?: boolean; compact?: boolean }) {
  const reduce = !!useReducedMotion()
  return (
    <figure className={`mp${full ? ' mp-full' : ''}${compact ? ' mp-compact' : ''}`}>
      <div className="mp-window" role="img" aria-label="Moodle dashboard showing the three academic learning phases, weekly topics and learning progress">
        <aside className="mp-side" aria-hidden="true">
          <div className="mp-brand">
            <Logo iconOnly />
          </div>
          <ul>
            {nav.map(({ label, icon: Icon, active }) => (
              <li key={label} className={active ? 'is-active' : undefined}>
                <Icon size={16} strokeWidth={2} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </aside>
        <div className="mp-main" aria-hidden="true">
          <div className="mp-top">
            <div>
              <p className="mp-title">Welcome</p>
              <p className="mp-sub">Your learning resources, activities and support are all here.</p>
            </div>
            <div className="mp-icons">
              <Bell size={18} />
              <UserRound size={18} />
            </div>
          </div>
          <div className="mp-phases">
            {phases.map((p) => (
              <div key={p.n} className={`mp-phase tone-${p.tone}`}>
                <span className="mp-phase-n">{p.n}</span>
                <span className="mp-phase-name">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="mp-panels">
            <div className="mp-panel">
              <p className="mp-panel-h">Weekly topics</p>
              <ul>
                {topics.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <Icon size={16} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mp-panel">
              <p className="mp-panel-h">Your learning progress</p>
              <ul className="mp-bars">
                {phases.map((p, i) => (
                  <li key={p.n}>
                    <span>Phase {i + 1}</span>
                    <motion.span className="mp-track" initial="hidden" whileInView="show" viewport={{ once: true, amount: 'some' }}>
                      <motion.span
                        className={`mp-fill tone-${p.tone}`}
                        style={{ width: `${p.pct}%`, transformOrigin: 'left center' }}
                        variants={{ hidden: { scaleX: reduce ? 1 : 0 }, show: { scaleX: 1, transition: { duration: 1.1, delay: 0.5 + i * 0.12, ease: EASE } } }}
                      />
                    </motion.span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mp-cap">Illustrative preview of the Moodle dashboard. Topics and support depend on your programme.</figcaption>
    </figure>
  )
}
