import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import PageLayout from '../components/PageLayout'

const INQUIRY_TYPES = [
  'Private Viewing',
  'Price Enquiry',
  'Investment Opportunity',
  'Press & Media',
  'General Enquiry',
]

export default function ContactPage() {
  const heroRef = useRef(null)
  const formRef = useRef(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiry: INQUIRY_TYPES[0],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    gsap.fromTo(formRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 })
  }, [])

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => { const n = { ...er }; delete n[field]; return n })
  }

  return (
    <PageLayout>
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 py-20">
          {/* Left: info */}
          <div ref={heroRef}>
            <div className="flex items-center gap-4 mb-8">
              <span className="bronze-line" />
              <span className="text-obsidian-stone font-body font-light"
                style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
                Private Enquiries
              </span>
            </div>
            <h1 className="font-display text-obsidian-parchment font-light"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', lineHeight: 1.05 }}>
              Begin Your Conversation
            </h1>
            <p className="mt-8 text-obsidian-stone font-body font-light"
              style={{ fontSize: '0.9rem', lineHeight: 1.9, letterSpacing: '0.03em' }}>
              Every enquiry is handled personally by our dedicated estate team. Whether you seek a
              private viewing, a detailed specification pack, or a confidential investment discussion,
              we respond within 24 hours.
            </p>

            {/* Contact details */}
            <div className="mt-12 flex flex-col gap-8">
              <ContactDetail label="Estate Office" value="+44 (0) 207 946 0123" />
              <ContactDetail label="Private Email" value="residences@obsidian.estate" />
              <ContactDetail label="Address" value={'12 Meridian Crescent\nChelsea, London SW3 4AX'} />
              <ContactDetail label="Viewing Hours" value="By appointment — 7 days a week" />
            </div>

            {/* Divider */}
            <div className="mt-12 pt-12 border-t border-obsidian-warm">
              <p className="text-obsidian-stone font-body font-light"
                style={{ fontSize: '0.78rem', lineHeight: 1.8, letterSpacing: '0.03em' }}>
                All enquiries are treated with the strictest confidence. Our team operates under
                full NDA when requested.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div ref={formRef}>
            {submitted ? (
              <SuccessState name={form.firstName} />
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field
                    label="First Name"
                    value={form.firstName}
                    onChange={handleChange('firstName')}
                    error={errors.firstName}
                  />
                  <Field
                    label="Last Name"
                    value={form.lastName}
                    onChange={handleChange('lastName')}
                    error={errors.lastName}
                  />
                </div>
                <Field
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                />
                <Field
                  label="Phone (optional)"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                />
                {/* Inquiry type */}
                <div className="flex flex-col gap-2">
                  <label className="text-obsidian-stone font-body font-light"
                    style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                    Nature of Enquiry
                  </label>
                  <select
                    value={form.inquiry}
                    onChange={handleChange('inquiry')}
                    className="bg-obsidian-warm border border-obsidian-warm text-obsidian-parchment font-body font-light px-4 py-3 focus:outline-none focus:border-obsidian-bronze transition-colors"
                    style={{ fontSize: '0.85rem' }}
                  >
                    {INQUIRY_TYPES.map(t => (
                      <option key={t} value={t} className="bg-obsidian-dark">{t}</option>
                    ))}
                  </select>
                </div>
                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-obsidian-stone font-body font-light"
                    style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Tell us how we can assist you…"
                    className={`bg-obsidian-warm border text-obsidian-parchment font-body font-light px-4 py-3 resize-none focus:outline-none transition-colors placeholder-obsidian-stone/50 ${
                      errors.message ? 'border-red-500/60' : 'border-obsidian-warm focus:border-obsidian-bronze'
                    }`}
                    style={{ fontSize: '0.85rem' }}
                  />
                  {errors.message && <ErrorMsg>{errors.message}</ErrorMsg>}
                </div>
                <button
                  type="submit"
                  className="mt-2 border border-obsidian-bronze text-obsidian-bronze font-body font-light py-4 hover:bg-obsidian-bronze hover:text-obsidian-black transition-all duration-300"
                  style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

function Field({ label, type = 'text', value, onChange, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-obsidian-stone font-body font-light"
        style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`bg-obsidian-warm border text-obsidian-parchment font-body font-light px-4 py-3 focus:outline-none transition-colors placeholder-obsidian-stone/40 ${
          error ? 'border-red-500/60' : 'border-obsidian-warm focus:border-obsidian-bronze'
        }`}
        style={{ fontSize: '0.85rem' }}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  )
}

function ErrorMsg({ children }) {
  return (
    <span className="text-red-400 font-body font-light" style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}>
      {children}
    </span>
  )
}

function ContactDetail({ label, value }) {
  return (
    <div>
      <p className="text-obsidian-stone font-body font-light"
        style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
        {label}
      </p>
      <p className="mt-1 text-obsidian-parchment font-body font-light whitespace-pre-line"
        style={{ fontSize: '0.88rem', letterSpacing: '0.04em' }}>
        {value}
      </p>
    </div>
  )
}

function SuccessState({ name }) {
  return (
    <div className="flex flex-col items-start justify-center h-full min-h-[400px] gap-6">
      <div className="w-12 h-px bg-obsidian-bronze" />
      <p className="font-display text-obsidian-parchment font-light"
        style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)', lineHeight: 1.1 }}>
        Thank you, {name}.
      </p>
      <p className="text-obsidian-stone font-body font-light max-w-sm"
        style={{ fontSize: '0.88rem', lineHeight: 1.9, letterSpacing: '0.03em' }}>
        Your enquiry has been received. A member of our estate team will be in touch personally
        within 24 hours.
      </p>
      <div className="mt-4 w-12 h-px bg-obsidian-warm" />
    </div>
  )
}
