import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, LifeBuoy, GraduationCap, MessageSquareText, BookMarked } from 'lucide-react'
import MoodlePreview from '../components/MoodlePreview'
import Photo from '../components/Photo'
import Faq from '../components/Faq'
import { homeFaqs } from '../faqs'
import FadeUp from '../components/FadeUp'
import { StaggerGroup, StaggerItem } from '../components/Reveal'
import { ARC } from '../components/logoPaths'
import { LEARNER_LOGIN_URL } from '../site'
import { heroContainer, riseIn } from '../motion'

gsap.registerPlugin(ScrollTrigger)

const doors = [
  { k: 'Preparing for university', t: 'Academic Learning Platform (ALP)', to: '/programmes/academic-learning-platform' },
  { k: 'Developing a team', t: 'Corporate Training Services (CTS)', to: '/programmes/corporate-training-services' },
  { k: 'Preparing for a reassessment', t: 'Academic Readiness Programme', to: '/programmes/academic-readiness-programme' },
]

const programmes = [
  {
    tag: 'ALP',
    title: 'Academic Learning Platform (ALP)',
    desc: 'Prepare for higher education and strengthen your academic skills through pre-admission support, a six-week transition programme and ongoing learner success support.',
    who: 'Learners exploring or preparing for higher education, new students adapting to UK academic expectations, and current students developing writing, research, presentation and study skills.',
    what: 'Pre-Admission Support, the Six-Week Transition Programme and Ongoing Learner Success Support.',
    cta: 'Explore Academic Learning',
    to: '/programmes/academic-learning-platform',
    img: '/img/p-006.jpg',
    alt: 'Colleagues celebrating a result together around a laptop',
  },
  {
    tag: 'CTS',
    title: 'Corporate Training Services (CTS)',
    desc: 'Develop confident communication and practical workplace skills through training shaped around your team’s needs.',
    who: 'Professionals and managers developing communication skills, organisations working across countries or cultures, and HR and Learning and Development teams planning staff development.',
    what: 'Meetings and presentations, professional writing, working across cultures and speaking with confidence.',
    cta: 'Explore Corporate Training',
    to: '/programmes/corporate-training-services',
    img: '/img/p-009.jpg',
    alt: 'Professionals taking part in a training session',
    secondary: { label: 'Discuss Team Training', to: '/contact-us' },
  },
  {
    tag: 'ARP',
    title: 'Academic Readiness Programme',
    desc: 'A focused two-week route for applicants preparing for an academic entry reassessment. Suitability and arrangements are confirmed before enrolment.',
    who: 'Applicants who are close to the required entry standard and would benefit from focused preparation.',
    what: 'Listening, reading, writing, speaking, assessment literacy and study planning over two weeks.',
    cta: 'Explore Academic Readiness',
    to: '/programmes/academic-readiness-programme',
    img: '/img/p-001.jpg',
    alt: 'Graduates throwing their caps in the air outside a university building',
  },
]

const facts = [
  { n: 3, l: 'Connected academic phases' },
  { n: 6, l: 'Structured weeks in the transition programme' },
  { n: 2, l: 'Weeks in the academic readiness route' },
]

const phases = [
  { n: 1, t: 'Pre-Admission Support', d: 'Understand your options, explore UK higher education and prepare for the next stage of your application.', to: '/programmes/academic-learning-platform/pre-admission-support' },
  { n: 2, t: 'Six-Week Transition Programme', d: 'Build confidence in the expectations of UK higher education through six structured weeks.', to: '/programmes/academic-learning-platform/six-week-transition-programme' },
  { n: 3, t: 'Ongoing Learner Success Support', d: 'Return to resources when you need help with writing, assignments, presentations, research or referencing.', to: '/programmes/academic-learning-platform/ongoing-learner-success-support' },
]

const weeks = [
  { t: 'Understanding UK Higher Education', d: 'Learn how courses, timetables, independent study and academic support work, and plan your weekly study routine.' },
  { t: 'Academic Integrity, Referencing and Ethical AI', d: 'Understand how to acknowledge sources, avoid plagiarism and follow your institution’s rules on AI use.' },
  { t: 'Academic Writing', d: 'Interpret assignment instructions, organise paragraphs and improve the clarity of your writing.' },
  { t: 'Research and Information Literacy', d: 'Develop search strategies, evaluate sources and keep useful research notes.' },
  { t: 'Critical Thinking and Academic Discussion', d: 'Examine claims and evidence, compare viewpoints and practise contributing to academic discussions.' },
  { t: 'Presentation Skills and Confidence', d: 'Plan a clear presentation, practise delivery and prepare to respond to questions.' },
]

const steps = ['Find your learning pathway', 'Open a topic', 'Watch or read', 'Practise', 'Check your understanding', 'Review your progress']

const benefits = [
  { t: 'Structured Learning', d: 'Follow organised topics and activities, with clear guidance on what to study next.' },
  { t: 'Relevant Practice', d: 'Work on tasks that connect to university study, professional communication and everyday workplace situations.' },
  { t: 'Flexible Access', d: 'Use online resources at times that suit you. Scheduled workshops and tutor support depend on your programme.' },
  { t: 'Progress You Can Follow', d: 'Use completion indicators and activity feedback, where available, to keep track of your learning and identify your next steps.' },
]

const support = [
  { t: 'Getting Started', d: 'Welcome guidance and how to use Moodle', icon: BookMarked, to: '/learner-support#getting-started' },
  { t: 'English Tutor Support', d: 'Academic English resources and tutor contact', icon: MessageSquareText, to: '/learner-support/english-tutor-support' },
  { t: 'Academic Learning Support', d: 'Writing, assignments, referencing and study skills', icon: GraduationCap, to: '/learner-support#academic-support' },
  { t: 'Help Using the Platform', d: 'Signing in, opening resources and activities', icon: LifeBuoy, to: '/learner-support#platform-help' },
]

export default function Home() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const reduce = !!useReducedMotion()
  const rise = riseIn(reduce)

  useLayoutEffect(() => {
    if (reduce) video.current?.pause()
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Hero: the film settles from a slight zoom, then eases up with scroll.
        gsap.from('.hero-media', { scale: 1.1, duration: 2.4, ease: 'power3.out' })
        gsap.to('.hero-media', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })

        // Facts count up once.
        gsap.utils.toArray<HTMLElement>('.stat-n').forEach((el) => {
          const to = Number(el.dataset.to)
          const o = { v: 0 }
          gsap.to(o, { v: to, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, onUpdate: () => { el.textContent = String(Math.round(o.v)) } })
        })

        // Timeline: the line draws as the three phases come into view.
        gsap.fromTo('.tl-fill', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 78%', end: 'bottom 55%', scrub: 0.5 } })
        gsap.fromTo('.tl-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 78%', end: 'bottom 55%', scrub: 0.5 } })

        // Enquiry ring turns slowly with the scroll.
        gsap.to('.enq-ring', { rotation: 35, ease: 'none', scrollTrigger: { trigger: '.enquiry', start: 'top bottom', end: 'bottom top', scrub: true } })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [reduce])

  return (
    <main id="main" ref={root}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-media-wrap" aria-hidden="true">
          <img className="hero-media hero-still" src="/img/hero-poster.jpg" alt="" width={1920} height={1080} fetchPriority="high" />
          <video
            ref={video}
            className={`hero-media hero-video${videoReady ? ' is-ready' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/img/hero-poster.jpg"
            onCanPlay={() => setVideoReady(true)}
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <motion.div className="wrap hero-copy" variants={heroContainer} initial="hidden" animate="show">
          <motion.h1 className="display hero-h" variants={rise}>
            Build Confidence for University and Work
          </motion.h1>
          <motion.p className="hero-lede" variants={rise}>
            Develop your academic English, workplace communication and professional skills with City Language Hub. Our programmes combine guided online learning with practical activities and support, helping you use what you learn in your studies and at work.
          </motion.p>
          <motion.div className="hero-actions" variants={rise}>
            <Link className="btn btn-primary btn-lg" to="/programmes">
              Explore Programmes <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <a className="btn btn-ghost-dark btn-lg" href={LEARNER_LOGIN_URL}>
              Learner Login
            </a>
          </motion.div>
        </motion.div>

        <nav className="doors" aria-label="Choose your pathway">
          <div className="wrap doors-grid">
            {doors.map((d) => (
              <Link key={d.t} to={d.to} className="door">
                <span className="door-k">{d.k}</span>
                <span className="door-t display">{d.t}</span>
                <ArrowUpRight size={24} aria-hidden="true" className="door-go" />
              </Link>
            ))}
          </div>
        </nav>
      </section>

      {/* Introduction */}
      <section className="section intro" aria-labelledby="intro-h">
        <div className="wrap intro-grid">
          <FadeUp>
            <h2 id="intro-h" className="display h2">
              Learning That Connects to Your Goals
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="intro-lede">Whether you are preparing for higher education, developing your team or planning your next career step, we help you find a suitable learning pathway. Explore resources on Moodle, practise relevant skills and access the support included in your programme.</p>
            <dl className="facts">
              {facts.map((f) => (
                <div key={f.l}>
                  <dt className="display stat-n" data-to={f.n}>
                    {f.n}
                  </dt>
                  <dd>{f.l}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      {/* Programmes */}
      <section className="section programmes" aria-labelledby="prog-h">
        <div className="wrap">
          <h2 id="prog-h" className="sr-only">
            Programmes
          </h2>
          {programmes.map((p, i) => (
            <FadeUp key={p.tag} className={`prog${i % 2 ? ' is-flip' : ''}`}>
              <div className="prog-media">
                <Photo src={p.img} alt={p.alt} overlay="natural" className="prog-photo" ratio="4 / 3" />
                <span className="prog-tag display" aria-hidden="true">
                  {p.tag}
                </span>
              </div>
              <div className="prog-body">
                <h3 className="display h3">{p.title}</h3>
                <p className="prog-d">{p.desc}</p>
                <dl className="prog-dl">
                  <div>
                    <dt>Who it is for</dt>
                    <dd>{p.who}</dd>
                  </div>
                  <div>
                    <dt>What you will learn</dt>
                    <dd>{p.what}</dd>
                  </div>
                </dl>
                <div className="prog-cta">
                  <Link className="btn btn-primary" to={p.to}>
                    {p.cta} <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  {p.secondary && (
                    <Link className="textlink" to={p.secondary.to}>
                      {p.secondary.label} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Journey: timeline */}
      <section className="section journey" aria-labelledby="journey-h">
        <div className="wrap">
          <FadeUp className="journey-head">
            <h2 id="journey-h" className="display h2">
              Your Academic Learning Journey
            </h2>
            <p className="lede">Explore three connected areas of support, from preparing to apply to developing your skills throughout your studies. Your starting point depends on your needs and programme.</p>
          </FadeUp>
          <ol className="timeline">
            <span className="tl-line" aria-hidden="true">
              <span className="tl-fill" />
            </span>
            {phases.map((p) => (
              <li key={p.n} className="tl-item">
                <span className="tl-node display" aria-hidden="true">
                  {p.n}
                </span>
                <h3 className="display h4">
                  <span className="sr-only">Step {p.n}: </span>
                  {p.t}
                </h3>
                <p>{p.d}</p>
                <Link className="textlink" to={p.to}>
                  Explore <span className="sr-only">{p.t}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Six weeks */}
      <section className="section weeks" aria-labelledby="weeks-h">
        <div className="wrap weeks-grid">
          <FadeUp className="weeks-intro">
            <h2 id="weeks-h" className="display h2">
              Six-Week Transition Programme
            </h2>
            <p className="lede">Explore a new academic topic each week. Use the workshop or recorded guidance, reading materials and practice activities to build your understanding, then check what you have learned.</p>
          </FadeUp>
          <StaggerGroup as="ol" className="weeks-list">
            {weeks.map((w, i) => (
              <StaggerItem key={w.t} className="week">
                <span className="week-n">Week {i + 1}</span>
                <h3 className="display">{w.t}</h3>
                <p>{w.d}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Platform */}
      <section className="section platform" aria-labelledby="plat-h">
        <div className="wrap plat-grid">
          <FadeUp className="plat-copy">
            <h2 id="plat-h" className="display h2">
              Take a Look Inside Your Learning Platform
            </h2>
            <p className="lede on-dark">Moodle brings your learning resources together in one place. Explore recorded guidance, reading materials, practice activities and quizzes, and follow the topics included in your programme.</p>
            <div className="plat-actions">
              <a className="btn btn-primary btn-lg" href={LEARNER_LOGIN_URL}>
                Learner Login
              </a>
              <Link className="textlink on-dark" to="/learning-platform">
                How the platform works <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ol className="steps" aria-label="How you learn on Moodle">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </FadeUp>
          <FadeUp className="plat-visual" delay={0.1}>
            <MoodlePreview full />
          </FadeUp>
        </div>
      </section>

      {/* Benefits */}
      <section className="section benefits" aria-labelledby="why-h">
        <div className="wrap benefits-grid">
          <FadeUp>
            <h2 id="why-h" className="display h2">
              Clear Learning Pathways and Practical Support
            </h2>
          </FadeUp>
          <StaggerGroup as="dl" className="benefit-list">
            {benefits.map((b) => (
              <StaggerItem as="div" key={b.t}>
                <dt className="display">{b.t}</dt>
                <dd>{b.d}</dd>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-sec" aria-labelledby="faq-h">
        <div className="wrap faq-grid">
          <FadeUp className="faq-intro">
            <h2 id="faq-h" className="display h2">
              Frequently Asked Questions
            </h2>
            <p className="lede">Where can I get help? Use the support route shown in your Moodle programme or contact City Language Hub.</p>
            <Link className="btn btn-dark" to="/contact-us">
              Ask for Help <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </FadeUp>
          <Faq items={homeFaqs} />
        </div>
      </section>

      {/* Support */}
      <section className="section support" aria-labelledby="sup-h">
        <div className="wrap support-grid">
          <FadeUp>
            <h2 id="sup-h" className="display h2">
              Support When You Need It
            </h2>
            <p className="lede">Find orientation guidance, study resources and information about contacting your tutor. Check your programme page for the support available to you.</p>
            <Link className="btn btn-dark" to="/learner-support">
              Explore Learner Support <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </FadeUp>
          <StaggerGroup className="support-list">
            {support.map(({ t, d, icon: Icon, to }) => (
              <StaggerItem key={t}>
                <Link to={to}>
                  <Icon size={24} aria-hidden="true" />
                  <span>
                    <strong className="display">{t}</strong>
                    <span>{d}</span>
                  </span>
                  <ArrowRight size={20} aria-hidden="true" className="go" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Enquiry */}
      <section className="enquiry" aria-labelledby="enq-h">
        <svg className="enq-ring" viewBox="120 24 262 302" aria-hidden="true" focusable="false">
          <path d={ARC} fill="#0d1b2a" />
        </svg>
        <div className="wrap enq-grid">
          <div>
            <h2 id="enq-h" className="display h2">
              Find a Pathway That Fits Your Needs
            </h2>
            <p className="lede">Tell us what you would like to achieve. We can explain the options and help you choose a suitable starting point.</p>
          </div>
          <Link className="btn btn-dark btn-lg" to="/contact-us">
            Make an Enquiry <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}
