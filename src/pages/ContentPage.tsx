import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check } from 'lucide-react'
import BLink, { useBase } from '../components/BLink'
import Pill from '../components/Pill'
import FadeUp from '../components/FadeUp'
import Faq from '../components/Faq'
import ContactForm from '../components/ContactForm'
import MoodlePreview from '../components/MoodlePreview'
import { StaggerGroup, StaggerItem } from '../components/Reveal'
import { ARC } from '../components/logoPaths'
import { NOT_FOUND, PAGES, type Block, type Card, type Cta } from '../content'
import { heroContainer, riseIn } from '../motion'
import './pages.css'

gsap.registerPlugin(ScrollTrigger)

type Tone = 'white' | 'light' | 'dark' | 'accent'

function Btn({ c, tone, v2 }: { c: Cta; tone: Tone; v2: boolean }) {
  const onDark = tone === 'dark'
  const primary = (c.tone ?? 'primary') === 'primary'
  if (v2) {
    const t = onDark ? (primary ? 'primary' : 'glass') : primary ? 'ink' : 'outline'
    return c.href ? (
      <Pill tone={t} href={c.href}>
        {c.label}
      </Pill>
    ) : (
      <Pill tone={t} to={c.to} arrow={primary}>
        {c.label}
      </Pill>
    )
  }
  const cls = `btn ${onDark ? (primary ? 'btn-primary' : 'btn-ghost-dark') : primary ? 'btn-dark' : 'btn-outline'}`
  return c.href ? (
    <a className={cls} href={c.href}>
      {c.label}
    </a>
  ) : (
    <BLink className={cls} to={c.to ?? '/'}>
      {c.label} {primary && <ArrowRight size={18} aria-hidden="true" />}
    </BLink>
  )
}

const Ctas = ({ items, tone, v2 }: { items?: Cta[]; tone: Tone; v2: boolean }) =>
  items?.length ? (
    <div className="pg-ctas">
      {items.map((c) => (
        <Btn key={c.label} c={c} tone={tone} v2={v2} />
      ))}
    </div>
  ) : null

function CardView({ c, tone, v2 }: { c: Card; tone: Tone; v2: boolean }) {
  return (
    <StaggerItem className="pg-card" {...(c.id ? { id: c.id } : {})}>
      {c.tag && <span className="pg-tag">{c.tag}</span>}
      <h3 className="pg-h3">{c.t}</h3>
      {c.d && <p>{c.d}</p>}
      {c.facts && (
        <dl className="pg-facts">
          {c.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {c.cta && (
        <div className="pg-card-cta">
          <Btn c={{ ...c.cta, tone: 'primary' }} tone={tone === 'dark' ? 'white' : tone} v2={v2} />
        </div>
      )}
    </StaggerItem>
  )
}

function Head({ title, intro }: { title?: string; intro?: string }) {
  if (!title && !intro) return null
  return (
    <FadeUp className="pg-head">
      {title && <h2 className="pg-h">{title}</h2>}
      {intro && <p className="pg-lede">{intro}</p>}
    </FadeUp>
  )
}

function Section({ block, tone, v2 }: { block: Block; tone: Tone; v2: boolean }) {
  switch (block.kind) {
    case 'cards':
      return (
        <>
          <Head title={block.title} intro={block.intro} />
          <StaggerGroup className={`pg-cards pg-cols-${block.cols ?? 3}`}>
            {block.items.map((c) => (
              <CardView key={c.t} c={c} tone={tone} v2={v2} />
            ))}
          </StaggerGroup>
        </>
      )
    case 'steps':
      return (
        <>
          <Head title={block.title} intro={block.intro} />
          <StaggerGroup as="ol" className={`pg-steps pg-cols-${block.cols ?? 3}`}>
            {block.items.map((s, i) => (
              <StaggerItem key={s.t} className="pg-step">
                <span className="pg-step-n">{s.k ?? String(i + 1).padStart(2, '0')}</span>
                <h3 className="pg-h3">{s.t}</h3>
                {s.d && <p>{s.d}</p>}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </>
      )
    case 'checks':
      return (
        <div className="pg-split">
          <Head title={block.title} intro={block.intro} />
          <ul className="pg-checks">
            {block.items.map((x) => (
              <li key={x}>
                <span className="pg-check-i" aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      )
    case 'split':
      return (
        <div className={`pg-split${block.flip ? ' is-flip' : ''}${block.photo ? '' : ' no-photo'}`}>
          <FadeUp className="pg-split-copy">
            <h2 className="pg-h">{block.title}</h2>
            {block.paras?.map((p) => (
              <p key={p} className="pg-lede">
                {p}
              </p>
            ))}
            {block.items && (
              <ul className="pg-checks">
                {block.items.map((x) => (
                  <li key={x}>
                    <span className="pg-check-i" aria-hidden="true">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            )}
            {block.cta && <Btn c={block.cta} tone={tone} v2={v2} />}
          </FadeUp>
          {block.photo && (
            <FadeUp className="pg-photo-wrap" delay={0.08}>
              <img className="pg-photo" src={block.photo.src} alt={block.photo.alt} width={1170} height={780} loading="lazy" />
            </FadeUp>
          )}
        </div>
      )
    case 'note':
      return (
        <FadeUp className="pg-note">
          {block.title && <h2 className="pg-h2s">{block.title}</h2>}
          <p>{block.text}</p>
        </FadeUp>
      )
    case 'moodle':
      return (
        <>
          <Head title={block.title} intro={block.intro} />
          <FadeUp>
            <MoodlePreview full />
          </FadeUp>
          <StaggerGroup className="pg-cards pg-cols-4 pg-captions">
            {block.captions.map((c) => (
              <CardView key={c.t} c={{ t: c.t, d: c.d }} tone={tone} v2={v2} />
            ))}
          </StaggerGroup>
        </>
      )
    case 'faq':
      return (
        <div className="pg-faq">
          <Head title={block.title} intro={block.intro} />
          <Faq items={block.items} />
        </div>
      )
    case 'form':
      return <ContactForm />
    case 'legal':
      return (
        <div className="pg-legal">
          <p className="pg-legal-note">{block.note}</p>
          <ol>
            {block.headings.map((h) => (
              <li key={h}>
                <h2 className="pg-h2s">{h}</h2>
                <p>Wording for this section is to be supplied by the legal team and must match the actual service before publication.</p>
              </li>
            ))}
          </ol>
        </div>
      )
    case 'cta':
      return (
        <FadeUp className="pg-cta">
          <h2 className="pg-h">{block.title}</h2>
          {block.text && <p className="pg-lede">{block.text}</p>}
          <Ctas items={block.ctas} tone={tone} v2={v2} />
        </FadeUp>
      )
  }
}

const rhythm: Tone[] = ['white', 'light']

export default function ContentPage() {
  const { pathname } = useLocation()
  const base = useBase()
  const v2 = base === '/v2'
  const key = (base ? pathname.slice(base.length) : pathname).replace(/\/+$/, '') || '/'
  const page = PAGES[key] ?? NOT_FOUND
  const root = useRef<HTMLElement>(null)
  const reduce = !!useReducedMotion()
  const rise = riseIn(reduce)

  useLayoutEffect(() => {
    document.title = `${page.title} | City Language Hub`
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.to('.pg-hero-ring', { rotation: 40, ease: 'none', scrollTrigger: { trigger: '.pg-hero', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.utils.toArray<HTMLElement>('.pg-photo').forEach((ph) => {
          gsap.fromTo(ph, { clipPath: 'inset(8% 5% 8% 5% round 24px)', scale: 1.05 }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', scale: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: ph, start: 'top 88%', once: true } })
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [page])

  let i = 0
  const toneFor = (b: Block): Tone => {
    if (b.kind === 'cta') return v2 ? 'dark' : 'accent'
    if (b.kind === 'moodle') return 'dark'
    return rhythm[i++ % 2]
  }

  return (
    <main id="main" ref={root} className={`pgx ${v2 ? 'pgx-v2' : 'pgx-v1'}`}>
      <header className="pg-hero">
        <svg className="pg-hero-ring" viewBox="120 24 262 302" aria-hidden="true" focusable="false">
          <path d={ARC} fill="currentColor" />
        </svg>
        <motion.div className="pg-hero-in" variants={heroContainer} initial="hidden" animate="show" key={key}>
          <div className="pg-hero-copy">
            <motion.h1 className="pg-h1" variants={rise}>
              {page.title}
            </motion.h1>
            {page.sub && (
              <motion.p className="pg-sub" variants={rise}>
                {page.sub}
              </motion.p>
            )}
            <motion.p className="pg-hero-lede" variants={rise}>
              {page.lede}
            </motion.p>
            {page.ctas && (
              <motion.div variants={rise}>
                <Ctas items={page.ctas} tone="dark" v2={v2} />
              </motion.div>
            )}
          </div>
          {page.photo && (
            <motion.div className="pg-hero-photo" variants={rise}>
              <img src={page.photo.src} alt={page.photo.alt} width={1170} height={780} fetchPriority="high" />
            </motion.div>
          )}
        </motion.div>
      </header>

      {page.blocks.map((b, n) => {
        const tone = toneFor(b)
        const dark = tone === 'dark'
        return (
          <section key={n} id={'id' in b ? b.id : undefined} className={`pg-sec pg-${tone}${b.kind === 'cta' ? ' pg-sec-cta' : ''}`} style={{ '--n': n } as CSSProperties}>
            <div className={`pg-in${dark ? ' on-dark' : ''}`}>
              <Section block={b} tone={tone} v2={v2} />
            </div>
          </section>
        )
      })}
    </main>
  )
}
