import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import axios from 'axios'  // Uncomment when backend is ready

gsap.registerPlugin(ScrollTrigger)

const INITIAL = { name: '', email: '', phone: '', message: '' }

export default function ContactForm() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [fields, setFields] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    console.log('[ContactForm] Submission payload:', fields)

    try {
      // Backend-ready: uncomment and set API_URL when Express server is live
      // await axios.post(`${import.meta.env.VITE_API_URL}/api/inquiries`, fields)
      await new Promise((res) => setTimeout(res, 1200)) // Simulated latency
      setStatus('sent')
      setFields(INITIAL)
    } catch (err) {
      console.error('[ContactForm] Submission error:', err)
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-obsidian-dark py-32 px-8"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="bronze-line" />
              <span
                className="text-obsidian-stone font-body font-light"
                style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}
              >
                Private Enquiries
              </span>
            </div>

            <h2
              className="font-display text-obsidian-parchment font-light text-balance"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Begin Your Conversation with Our Estate Team
            </h2>

            <p
              className="mt-8 text-obsidian-stone font-body font-light max-w-sm"
              style={{ fontSize: '0.85rem', lineHeight: 1.9, letterSpacing: '0.03em' }}
            >
              We handle a limited number of viewings each season. Our advisors will
              contact you within 24 hours to arrange a private in-person or virtual
              walkthrough at your convenience.
            </p>

            {/* Contact detail */}
            <div className="mt-12 flex flex-col gap-3">
              <ContactLine label="Direct Line" value="+1 (310) 000 0000" />
              <ContactLine label="Email" value="enquiries@obsidianresidences.com" />
            </div>
          </div>

          {/* Right — form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-10"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-10">
              <FormField
                label="Full Name"
                name="name"
                type="text"
                value={fields.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={fields.phone}
              onChange={handleChange}
              autoComplete="tel"
            />

            <div>
              <label
                className="block text-obsidian-stone font-body font-light mb-1"
                style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
              >
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us how we can assist you..."
                value={fields.message}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-6">
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="border border-obsidian-bronze text-obsidian-bronze text-xs tracking-widest px-8 py-4 hover:bg-obsidian-bronze hover:text-obsidian-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}
              >
                {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Enquiry Sent' : 'Submit Enquiry'}
              </button>

              {status === 'sent' && (
                <span
                  className="text-obsidian-bronze font-body font-light"
                  style={{ fontSize: '0.78rem', letterSpacing: '0.08em' }}
                >
                  We'll be in touch shortly.
                </span>
              )}
              {status === 'error' && (
                <span
                  className="text-red-400 font-body font-light"
                  style={{ fontSize: '0.78rem', letterSpacing: '0.08em' }}
                >
                  Something went wrong. Please try again.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, name, type, value, onChange, required, autoComplete }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-obsidian-stone font-body font-light mb-1"
        style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={label}
      />
    </div>
  )
}

function ContactLine({ label, value }) {
  return (
    <div className="flex items-baseline gap-4">
      <span
        className="text-obsidian-stone font-body font-light w-20 shrink-0"
        style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
      >
        {label}
      </span>
      <span
        className="font-display text-obsidian-parchment font-light"
        style={{ fontSize: '1rem' }}
      >
        {value}
      </span>
    </div>
  )
}
