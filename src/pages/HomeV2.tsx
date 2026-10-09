import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import Link from '../components/BLink'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ArrowRight, Check, ChevronDown, Menu, X } from 'lucide-react'
import Logo from '../components/Logo'
import Pill from '../components/Pill'
import V2Foot from '../components/V2Foot'
import FadeUp from '../components/FadeUp'
import { StaggerGroup, StaggerItem } from '../components/Reveal'
import { ARC } from '../components/logoPaths'
import { LEARNER_LOGIN_URL } from '../site'
import { EASE, heroContainer, riseIn } from '../motion'
import './v2.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const nav = [
  { to: '/programmes', label: 'Programmes' },
  { to: '/learning-platform', label: 'Learning platform' },
  { to: '/learner-support', label: 'Learner support' },
  { to: '/about-us', label: 'About' },
  { to: '/contact-us', label: 'Contact' },
]

const audiences = [
  { k: 'Students', t: 'Preparing for higher education', to: '/programmes/academic-learning-platform' },
  { k: 'Teams', t: 'Developing workplace skills', to: '/programmes/corporate-training-services' },
  { k: 'Professionals', t: 'Planning your next career step', to: '/programmes/academic-readiness-programme' },
]

const tags = ['Academic English', 'Workplace communication', 'Tutor support', 'Moodle learning platform', 'Six-Week Transition Programme', 'Corporate training']

const benefits = [
  { t: 'Structured learning', d: 'Follow organised topics and activities, with clear guidance on what to study next.', tint: true },
  { t: 'Relevant practice', d: 'Practise the writing, presentation and communication tasks you will meet in your studies and at work.' },
  { t: 'Flexible access', d: 'Study online at times that suit you, and return to resources whenever you need them.' },
  { t: 'Progress you can follow', d: 'See which topics and activities you have completed, and what comes next.' },
]

const tabs = [
  {
    id: 'academic',
    tab: 'Academic Learning',
    title: 'Academic Learning Platform (ALP)',
    desc: 'Prepare for higher education and strengthen your academic skills through pre-admission support, a six-week transition programme and ongoing learner success support.',
    topics: ['Pre-Admission Support', 'Six-Week Transition Programme', 'Ongoing Learner Success Support', 'Academic English'],
    cta: 'Explore Academic Learning',
    to: '/programmes/academic-learning-platform',
    img: '/img/p-006.jpg',
    cap: ['Three connected phases', 'Academic Learning Platform'],
  },
  {
    id: 'corporate',
    tab: 'Corporate Training',
    title: 'Corporate Training Services (CTS)',
    desc: 'Develop confident communication and practical workplace skills through training shaped around your team’s needs.',
    topics: ['Meetings', 'Presentations', 'Professional writing', 'Working across cultures'],
    cta: 'Explore Corporate Training',
    to: '/programmes/corporate-training-services',
    img: '/img/p-009.jpg',
    cap: ['Shaped around your team’s needs', 'Corporate Training Services'],
  },
  {
    id: 'readiness',
    tab: 'Academic Readiness',
    title: 'Academic Readiness Programme',
    desc: 'A focused two-week route for applicants preparing for an academic entry reassessment. Suitability and arrangements are confirmed before enrolment.',
    topics: ['Listening', 'Reading', 'Writing', 'Speaking'],
    cta: 'Explore Academic Readiness',
    to: '/programmes/academic-readiness-programme',
    img: '/img/p-001.jpg',
    cap: ['Two focused weeks', 'Academic Readiness Programme'],
  },
]

const phases = [
  { k: 'Before you apply', t: 'Pre-Admission Support', d: 'Understand your options, explore UK higher education and prepare for the next stage of your application.' },
  { k: 'Six structured weeks', t: 'Six-Week Transition Programme', d: 'Build confidence in the expectations of UK higher education through six structured weeks.' },
  { k: 'Throughout your studies', t: 'Ongoing Learner Success Support', d: 'Return to resources when you need help with writing, assignments, presentations, research, referencing or study skills.' },
]

const resources = ['Recorded guidance', 'Reading materials', 'Practice activities', 'Quizzes']

const steps = [
  { t: 'Find your learning pathway', d: 'Choose the programme and topics that match your goal.' },
  { t: 'Open a topic', d: 'Each topic sets out what you will learn and in what order.' },
  { t: 'Watch or read', d: 'Work through recorded guidance and reading materials.' },
  { t: 'Practise', d: 'Use short activities to apply what you have learned.' },
  { t: 'Check your understanding', d: 'Quizzes show what you have understood and what to revisit.' },
  { t: 'Review your progress', d: 'See what you have completed and what comes next.' },
]

const supportIncluded = ['Orientation guidance', 'Study resources', 'Information about contacting your tutor']
const supportTopics = ['Writing', 'Assignments', 'Presentations', 'Research', 'Referencing', 'Study skills']

const Ring = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="120 24 262 302" aria-hidden="true" focusable="false">
    <path d={ARC} fill="currentColor" />
  </svg>
)

const It = ({ children }: { children: string }) => <em className="v2-it">{children}</em>

export default function HomeV2() {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [menu, setMenu] = useState(false)
  const [tab, setTab] = useState(1)
  const [sent, setSent] = useState<'idle' | 'ok' | 'bad'>('idle')
  const [emailErr, setEmailErr] = useState('')
  const reduce = !!useReducedMotion()
  const rise = riseIn(reduce)
  const t = tabs[tab]

  useLayoutEffect(() => {
    if (reduce) video.current?.pause()
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.v2-hero-media', { scale: 1.1, duration: 2.4, ease: 'power3.out' })
        gsap.to('.v2-ring', { rotation: 40, ease: 'none', scrollTrigger: { trigger: '.v2-intro', start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo('.v2-rail-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.v2-timeline', start: 'top 75%', end: 'bottom 60%', scrub: 0.5 } })
        // Headings: lines rise out of a mask as they enter.
        const splits: SplitText[] = []
        const run = () => {
          gsap.utils.toArray<HTMLElement>('.v2-h:not(.v2-h-hero)').forEach((h) => {
            const sp = SplitText.create(h, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.09, scrollTrigger: { trigger: h, start: 'top 88%', once: true } }) })
            splits.push(sp)
          })
        }
        document.fonts.ready.then(run)
        // Photographs: unveil from an inset crop once.
        gsap.utils.toArray<HTMLElement>('.v2-photo').forEach((ph) => {
          gsap.fromTo(ph, { clipPath: 'inset(8% 5% 8% 5% round 24px)', scale: 1.05 }, { clipPath: 'inset(0% 0% 0% 0% round 24px)', scale: 1, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: ph, start: 'top 88%', once: true } })
        })
        // Timeline nodes light up as the line reaches them.
        gsap.utils.toArray<HTMLElement>('.v2-timeline li').forEach((li) => {
          const node = li.querySelector('.v2-node')
          if (!node) return
          ScrollTrigger.create({ trigger: li, start: 'top 68%', onEnter: () => node.classList.add('is-on'), onLeaveBack: () => node.classList.remove('is-on') })
        })
        gsap.to('.v2-glow', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.v2-journey', start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo('.v2-giant', { yPercent: 28 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.v2-giant-wrap', start: 'top bottom', end: 'bottom bottom', scrub: true } })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [reduce])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const email = String(f.get('email') || '')
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailErr('Please enter a valid email address.')
      setSent('idle')
      return
    }
    setEmailErr('')
    setSent('ok') // TODO: connect to the enquiry endpoint before launch
  }

  return (
    <div className="v2" ref={root}>
      <a className="skip" href="#v2-main">
        Skip to main content
      </a>

      {/* 01 Hero */}
      <header className="v2-hero">
        <div className="v2-hero-bg" aria-hidden="true">
          <img className="v2-hero-media" src="/img/hero-poster.jpg" alt="" width={1920} height={1080} fetchPriority="high" />
          <video ref={video} className={`v2-hero-media v2-hero-video${videoReady ? ' is-ready' : ''}`} autoPlay muted loop playsInline preload="metadata" poster="/img/hero-poster.jpg" onCanPlay={() => setVideoReady(true)}>
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
          <div className="v2-scrim" />
        </div>

        <div className="v2-nav">
          <Link to="/v2" className="v2-logo" aria-label="City Language Hub, home">
            <Logo tone="dark" />
          </Link>
          <nav className="v2-links" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ))}
          </nav>
          <a className="v2-login" href={LEARNER_LOGIN_URL}>
            Learner login
          </a>
          <span className="v2-nav-cta">
            <Pill tone="primary" to="/contact-us">
              Make an enquiry
            </Pill>
          </span>
          <button type="button" className="v2-burger" aria-expanded={menu} aria-controls="v2-mobile" onClick={() => setMenu((v) => !v)}>
            {menu ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="sr-only">{menu ? 'Close menu' : 'Open menu'}</span>
          </button>
          <AnimatePresence>
            {menu && (
              <motion.div id="v2-mobile" className="v2-mobile" initial={{ opacity: 0, y: reduce ? 0 : -8 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                {nav.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setMenu(false)}>
                    {n.label}
                  </Link>
                ))}
                <a href={LEARNER_LOGIN_URL}>Learner login</a>
                <Pill tone="primary" to="/contact-us">Make an enquiry</Pill>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div className="v2-hero-body" variants={heroContainer} initial="hidden" animate="show">
          <div className="v2-hero-copy">
            <motion.span className="v2-badge" variants={rise}>
              <i aria-hidden="true" /> Guided online learning
            </motion.span>
            <motion.h1 className="v2-h v2-h-hero" variants={rise}>
              Build confidence for <It>university and work.</It>
            </motion.h1>
            <motion.p className="v2-lede-d" variants={rise}>
              Develop your academic English, workplace communication and professional skills with City Language Hub. Our programmes combine guided online learning with practical activities and support, helping you use what you learn in your studies and at work.
            </motion.p>
            <motion.div className="v2-ctas" variants={rise}>
              <Pill tone="primary" to="/programmes" arrow>
                Explore programmes
              </Pill>
              <Pill tone="glass" to="/contact-us">
                Make an enquiry
              </Pill>
            </motion.div>
          </div>
          <motion.nav className="v2-who" variants={rise} aria-label="Who it is for">
            {audiences.map((a) => (
              <Link key={a.k} to={a.to}>
                <span>
                  <small>{a.k}</small>
                  {a.t}
                </span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </motion.nav>
        </motion.div>
      </header>

      <main id="v2-main">
        {/* 02 Introduction */}
        <section className="v2-card v2-surface v2-intro" aria-labelledby="v2-intro-h">
          <div className="v2-split">
            <FadeUp className="v2-copy">
              <p className="v2-label">For students, teams and professionals</p>
              <h2 id="v2-intro-h" className="v2-h">
                Learning that connects to <It>your goals.</It>
              </h2>
              <p className="v2-body">Whether you are preparing for higher education, developing your team or planning your next career step, we help you find a suitable learning pathway. Study online with recorded guidance, reading and practice activities, with tutor support included in your programme.</p>
              <div className="v2-areas">
                <p>Areas we cover</p>
                <ul>
                  {tags.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </FadeUp>
            <FadeUp className="v2-visual v2-visual-intro" delay={0.1}>
              <Ring className="v2-ring v2-ring-lg" />
              <Ring className="v2-ring v2-ring-sm" />
              <img className="v2-photo" src="/img/p-006.jpg" alt="Learners discussing an academic task" width={1170} height={780} loading="lazy" />
            </FadeUp>
          </div>
        </section>

        {/* 03 Why choose us */}
        <section className="v2-card v2-page" aria-labelledby="v2-why-h">
          <FadeUp className="v2-head">
            <div>
              <p className="v2-label">What you get</p>
              <h2 id="v2-why-h" className="v2-h">
                Clear learning pathways and <It>practical support</It>
              </h2>
            </div>
            <div className="v2-aside">
              <p className="v2-body">Every programme is built the same way, so you always know what to study, how to practise and how you are progressing.</p>
              <Pill tone="ink" to="/programmes" arrow>Explore programmes</Pill>
            </div>
          </FadeUp>
          <div className="v2-bento">
            <FadeUp className="v2-bento-photo">
              <img className="v2-photo" src="/img/p-009.jpg" alt="Learner organising study topics" width={1170} height={780} loading="lazy" />
            </FadeUp>
            <StaggerGroup className="v2-benefits">
              {benefits.map((b) => (
                <StaggerItem key={b.t} className={`v2-benefit${b.tint ? ' is-tint' : ''}`}>
                  <span className="v2-marker" aria-hidden="true" />
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* 04 Programmes */}
        <section className="v2-card v2-surface" aria-labelledby="v2-prog-h">
          <FadeUp className="v2-head v2-head-tabs">
            <div>
              <p className="v2-label">Programmes</p>
              <h2 id="v2-prog-h" className="v2-h">
                Explore our <It>programmes</It>
              </h2>
            </div>
            <div className="v2-tabs" role="tablist" aria-label="Programmes">
              {tabs.map((x, i) => (
                <button key={x.id} role="tab" id={`v2-tab-${x.id}`} aria-selected={tab === i} aria-controls="v2-panel" tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)} onKeyDown={(e) => { if (e.key === 'ArrowRight') setTab((tab + 1) % tabs.length); if (e.key === 'ArrowLeft') setTab((tab + tabs.length - 1) % tabs.length) }}>
                  {tab === i && <motion.span layoutId="v2-tab-pill" className="v2-tab-pill" transition={{ type: 'spring', duration: 0.4, bounce: 0.12 }} />}
                  <span>{x.tab}</span>
                </button>
              ))}
            </div>
          </FadeUp>
          <div className="v2-panel" id="v2-panel" role="tabpanel" aria-labelledby={`v2-tab-${t.id}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={t.id} className="v2-panel-in" initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                <div className="v2-panel-copy">
                  <h3 className="v2-h v2-h3">{t.title}</h3>
                  <p className="v2-body">{t.desc}</p>
                  <div className="v2-topics">
                    <p>Topics include</p>
                    <ul>
                      {t.topics.map((x) => (
                        <li key={x}>
                          <span className="v2-check" aria-hidden="true">
                            <Check size={14} strokeWidth={3} />
                          </span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Pill tone="ink" to={t.to} arrow>
                    {t.cta}
                  </Pill>
                </div>
                <div className="v2-panel-visual">
                  <img className="v2-photo" src={t.img} alt={t.cap[1]} width={1170} height={780} loading="lazy" />
                  <div className="v2-caption">
                    <strong>{t.cap[0]}</strong>
                    <span>{t.cap[1]}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 05 Academic journey */}
        <section className="v2-card v2-dark v2-journey" aria-labelledby="v2-journey-h">
          <div className="v2-glow" aria-hidden="true" />
          <div className="v2-split v2-split-top">
            <FadeUp className="v2-copy">
              <p className="v2-label v2-label-dark">Academic journey</p>
              <h2 id="v2-journey-h" className="v2-h v2-h-dark">
                Your academic <It>learning journey</It>
              </h2>
              <p className="v2-body v2-muted">Explore three connected areas of support, from preparing to apply to developing your skills throughout your studies. Your starting point depends on your needs and programme.</p>
              <Pill tone="primary" to="/programmes/academic-learning-platform" arrow>Explore Academic Learning</Pill>
              <img className="v2-photo v2-photo-wide" src="/img/p-001.jpg" alt="Learner working through the academic phases" width={1170} height={780} loading="lazy" />
            </FadeUp>
            <ol className="v2-timeline">
              {phases.map((p, i) => (
                <li key={p.t}>
                  <div className="v2-rail">
                    <span className={`v2-node${i === 0 ? ' is-on' : ''}`}>{i + 1}</span>
                    {i < 2 && (
                      <span className="v2-rail-line">
                        <span className="v2-rail-fill" />
                      </span>
                    )}
                  </div>
                  <div className="v2-phase">
                    <p className="v2-label v2-label-dark">{p.k}</p>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 06 Learning platform */}
        <section className="v2-card v2-surface" aria-labelledby="v2-plat-h">
          <FadeUp className="v2-head">
            <div>
              <p className="v2-label">Learning platform</p>
              <h2 id="v2-plat-h" className="v2-h">
                How learning works <It>on Moodle</It>
              </h2>
            </div>
            <div className="v2-aside">
              <p className="v2-body">Moodle brings your learning resources together in one place. Explore recorded guidance, reading materials, practice activities and quizzes, and follow the topics included in your programme.</p>
            </div>
          </FadeUp>
          <div className="v2-platform">
            <FadeUp className="v2-platform-photo">
              <img className="v2-photo" src="/img/p-006.jpg" alt="Studying with the learning platform" width={1170} height={780} loading="lazy" />
            </FadeUp>
            <FadeUp className="v2-resources" delay={0.08}>
              <div>
                <h3>Your resources in one place</h3>
                <p>Moodle learning platform</p>
              </div>
              <ul>
                {resources.map((x) => (
                  <li key={x}>
                    <span className="v2-check" aria-hidden="true">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <Pill tone="primary" href={LEARNER_LOGIN_URL}>Learner login</Pill>
            </FadeUp>
          </div>
          <div className="v2-steps-wrap">
            <h3 className="v2-steps-h">From pathway to progress, in six steps</h3>
            <StaggerGroup as="ol" className="v2-steps">
              {steps.map((s, i) => (
                <StaggerItem key={s.t}>
                  <span className="v2-step-n">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* 07 Learner support */}
        <section className="v2-card v2-page" aria-labelledby="v2-sup-h">
          <div className="v2-split">
            <FadeUp className="v2-copy">
              <p className="v2-label">Learner support</p>
              <h2 id="v2-sup-h" className="v2-h">
                Support when <It>you need it</It>
              </h2>
              <ul className="v2-included">
                {supportIncluded.map((x) => (
                  <li key={x}>
                    <span className="v2-check" aria-hidden="true">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <p className="v2-small">Check your programme page for the support available to you.</p>
              <Pill tone="outline" to="/learner-support" arrow>Explore Learner Support</Pill>
            </FadeUp>
            <FadeUp className="v2-visual v2-visual-support" delay={0.1}>
              <img className="v2-photo" src="/img/p-001.jpg" alt="Mentor and learner celebrating progress" width={1170} height={780} loading="lazy" />
              <div className="v2-float">
                <div>
                  <strong>Learner Support</strong>
                  <span>City Language Hub</span>
                </div>
                <p>Get help with</p>
                <ul>
                  {supportTopics.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      {/* 08 Enquiry + footer */}
      <footer className="v2-card v2-dark v2-footer" aria-label="Make an enquiry and site footer">
        <div className="v2-glow v2-glow-left" aria-hidden="true" />
        <section className="v2-enquiry" aria-labelledby="v2-enq-h">
          <FadeUp className="v2-copy">
            <p className="v2-label v2-label-dark">Make an enquiry</p>
            <h2 id="v2-enq-h" className="v2-h v2-h-dark">
              Find a pathway that <It>fits your needs</It>
            </h2>
            <p className="v2-body v2-muted">Tell us what you would like to achieve. We can explain the options and help you choose a suitable starting point.</p>
            <dl className="v2-contact">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:info@citylanguagehub.co.uk">info@citylanguagehub.co.uk</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>Monday to Friday, 9am to 5pm UK time</dd>
              </div>
              <div>
                <dt>Visit</dt>
                <dd>Ground Floor Unit H1, Moorfoot House, Meridian Gate, 221 Marsh Wall, London E14 9FJ</dd>
              </div>
            </dl>
          </FadeUp>
          <FadeUp delay={0.1}>
            <form className="v2-form" onSubmit={submit} noValidate>
              <h3>Send us a message</h3>
              <div className="v2-row">
                <label>
                  <span>Full name</span>
                  <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required aria-invalid={!!emailErr} aria-describedby={emailErr ? 'v2-email-err' : undefined} />
                  {emailErr && (
                    <small id="v2-email-err" role="alert">
                      {emailErr}
                    </small>
                  )}
                </label>
              </div>
              <label>
                <span>I’m interested in</span>
                <span className="v2-select">
                  <select name="programme" defaultValue="">
                    <option value="" disabled>
                      Choose a programme
                    </option>
                    <option>Academic Learning Platform (ALP)</option>
                    <option>Two-Week Academic Readiness Programme</option>
                    <option>Corporate Training Services (CTS)</option>
                    <option>Not sure yet</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </span>
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={4} placeholder="Tell us about your goals and when you would like to start" />
              </label>
              <Pill tone="primary" type="submit" block arrow>Send enquiry</Pill>
              {sent === 'ok' && (
                <p className="v2-ok" role="status">
                  Thank you. Your enquiry has been sent. We will contact you using the details provided.
                </p>
              )}
              <p className="v2-privacy">
                We only use your details to reply to your enquiry. See our <Link to="/privacy-notice">Privacy Notice</Link>.
              </p>
            </form>
          </FadeUp>
        </section>

        <V2Foot />
      </footer>
    </div>
  )
}
