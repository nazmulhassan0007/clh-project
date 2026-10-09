import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import BLink from './BLink'

const programmes = ['Academic Learning Platform (ALP)', 'Two-Week Academic Readiness Programme', 'Corporate Training Services (CTS)', 'Employability and Professional Pathways', 'Not Sure Yet']
const types = ['Individual Learning', 'Team Training', 'Institutional Partnership', 'Existing Learner Support', 'Other Enquiry']
const statuses = ['Prospective Student', 'Current Student', 'Professional', 'Employer or HR Representative', 'Education Partner', 'Other']
const formats = ['Online', 'In Person, Where Available', 'Blended', 'Please Advise Me']

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, setState] = useState<'idle' | 'ok'>('idle')

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const next: Record<string, string> = {}
    if (!String(f.get('name') || '').trim()) next.name = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(String(f.get('email') || ''))) next.email = 'Please enter a valid email address.'
    setErrors(next)
    // TODO: send to the enquiry endpoint once it exists. Until then the form only validates.
    setState(Object.keys(next).length ? 'idle' : 'ok')
  }

  const err = (k: string) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `e-${k}` } : {})
  const msg = (k: string) =>
    errors[k] ? (
      <small id={`e-${k}`} role="alert">
        {errors[k]}
      </small>
    ) : null
  const sel = (name: string, label: string, opts: string[], ph: string) => (
    <label>
      <span>{label}</span>
      <select name={name} defaultValue="">
        <option value="" disabled>
          {ph}
        </option>
        {opts.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )

  return (
    <div className="pg-form-wrap">
      <div className="pg-form-intro">
        <h2 className="pg-h">Ask About a Programme</h2>
        <p className="pg-lede">Complete the form below with a few details about your needs. We will review your enquiry and contact you to discuss the options.</p>
        <dl className="pg-contact">
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
      </div>
      <form className="pg-form" onSubmit={submit} noValidate>
        <p className="pg-req">Fields marked with * are required.</p>
        <div className="pg-row">
          <label>
            <span>Full Name *</span>
            <input name="name" type="text" autoComplete="name" required {...err('name')} />
            {msg('name')}
          </label>
          <label>
            <span>Email Address *</span>
            <input name="email" type="email" autoComplete="email" required {...err('email')} />
            {msg('email')}
          </label>
        </div>
        <div className="pg-row">
          <label>
            <span>Phone Number (Optional)</span>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            <span>Country or Region</span>
            <input name="country" type="text" autoComplete="country-name" />
          </label>
        </div>
        <div className="pg-row">
          {sel('programme', 'Programme', programmes, 'Choose a programme')}
          {sel('type', 'Enquiry Type', types, 'Choose an enquiry type')}
        </div>
        <div className="pg-row">
          {sel('status', 'I Am a', statuses, 'Choose an option')}
          {sel('format', 'Preferred Learning Format', formats, 'Choose a format')}
        </div>
        <label>
          <span>What Would You Like to Achieve?</span>
          <textarea name="goals" rows={5} placeholder="Tell us about your goals, starting point or team’s training needs. Please avoid including sensitive personal information." />
        </label>
        <label>
          <span>Preferred Start Date (Optional)</span>
          <input name="start" type="date" />
        </label>
        <label className="pg-check">
          <input name="marketing" type="checkbox" />
          <span>I would like to receive programme news and learning updates from City Language Hub. I can unsubscribe at any time.</span>
        </label>
        <button type="submit" className="pg-submit">
          Send Enquiry <ArrowRight size={18} aria-hidden="true" />
        </button>
        {state === 'ok' && (
          <p className="pg-ok" role="status">
            Thank you. Your enquiry has been sent. We will contact you using the details provided.
          </p>
        )}
        <p className="pg-privacy">
          We will use the details you provide to respond to your enquiry. Please read our <BLink to="/privacy-notice">Privacy Notice</BLink> for information about how we handle personal data.
        </p>
      </form>
    </div>
  )
}
