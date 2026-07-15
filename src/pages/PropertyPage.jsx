import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageLayout from '../components/PageLayout'

gsap.registerPlugin(ScrollTrigger)

const FULL_SPECS = [
  { label: 'Living Area',        value: '8,500 sq ft' },
  { label: 'Master Bedrooms',    value: '5' },
  { label: 'Bathrooms',          value: '6 Bespoke' },
  { label: 'Garage',             value: '4-Car Underground' },
  { label: 'Plot Size',          value: '22,000 sq ft' },
  { label: 'Pool',               value: '25m Infinity Heated' },
  { label: 'Year Completed',     value: '2025' },
  { label: 'Architect',          value: 'Studio Meridian' },
  { label: 'Interior Design',    value: 'Atelier Noire' },
  { label: 'Smart Home System',  value: 'Crestron Integrated' },
  { label: 'Security',           value: '24/7 Private Security' },
  { label: 'Energy Rating',      value: 'A+ Net Zero' },
]

const FLOOR_PLANS = [
  {
    level: 'Ground Floor',
    rooms: ['Grand Entrance Hall', 'Chef\'s Kitchen', 'Formal Dining', 'Living Pavilion', 'Guest Suite', '4-Car Garage'],
    area: '3,200 sq ft',
  },
  {
    level: 'First Floor',
    rooms: ['Primary Master Suite', 'Master Suite 2', 'Master Suite 3', 'Private Study', 'Family Lounge'],
    area: '2,800 sq ft',
  },
  {
    level: 'Lower Ground',
    rooms: ['Wellness Centre', 'Home Cinema', 'Wine Cellar', 'Staff Quarters', 'Utility'],
    area: '2,500 sq ft',
  },
]

const FEATURES = [
  { icon: '◈', title: 'Crestron Smart Home', desc: 'Full automation — lighting, climate, security, AV — controlled from a single interface.' },
  { icon: '◈', title: 'Gaggenau Kitchen', desc: 'Complete suite: steam oven, combi-steam, induction, climate-controlled wine cabinet.' },
  { icon: '◈', title: 'Net Zero Design', desc: 'Solar array, geothermal heating, rainwater harvesting, triple glazing throughout.' },
  { icon: '◈', title: 'Private Cinema', desc: '12-seat Dolby Atmos home cinema with 4K laser projection.' },
]

export default function PropertyPage() {
  const heroRef = useRef(null)
  const specsRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    gsap.fromTo(
      specsRef.current?.querySelectorAll('.spec-row'),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: specsRef.current, start: 'top 75%' } }
    )
  }, [])

  return (
    <PageLayout>
      {/* Hero */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto" ref={heroRef}>
        <div className="flex items-center gap-4 mb-8">
          <span className="bronze-line" />
          <span className="text-obsidian-stone font-body font-light" style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            Property Details
          </span>
        </div>
        <h1 className="font-display text-obsidian-parchment font-light text-balance"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05 }}>
          The Obsidian Villa
        </h1>
        <p className="mt-6 text-obsidian-stone font-body font-light max-w-2xl"
          style={{ fontSize: '0.9rem', lineHeight: 1.9, letterSpacing: '0.03em' }}>
          An architectural tour de force occupying 22,000 sq ft of prime coastal land. Designed by
          Studio Meridian and furnished by Atelier Noire, every detail reflects a singular commitment
          to uncompromising luxury.
        </p>
        <div className="mt-8 flex flex-wrap gap-6">
          <Pill>Guide Price: POA</Pill>
          <Pill>Freehold</Pill>
          <Pill>Immediate Possession</Pill>
        </div>
      </section>

      <div className="w-full h-px bg-obsidian-warm" />

      {/* Full Specs */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto" ref={specsRef}>
        <SectionLabel>Full Specifications</SectionLabel>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-obsidian-warm">
          {FULL_SPECS.map(({ label, value }) => (
            <div key={label} className="spec-row bg-obsidian-black px-8 py-7">
              <p className="text-obsidian-stone font-body font-light"
                style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {label}
              </p>
              <p className="mt-2 font-display text-obsidian-parchment font-light"
                style={{ fontSize: '1.25rem' }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-obsidian-warm" />

      {/* Floor Plans */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto">
        <SectionLabel>Floor Plans</SectionLabel>
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {FLOOR_PLANS.map((plan) => (
            <FloorPlanCard key={plan.level} plan={plan} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-obsidian-warm" />

      {/* Key Features */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto">
        <SectionLabel>Key Features</SectionLabel>
        <div className="mt-12 grid sm:grid-cols-2 gap-10">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="px-8 pb-24 max-w-screen-xl mx-auto">
        <div className="bg-obsidian-warm p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="font-display text-obsidian-parchment font-light"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
              Experience it in person
            </p>
            <p className="mt-2 text-obsidian-stone font-body font-light text-sm">
              Private viewings available by appointment only.
            </p>
          </div>
          <a href="/contact"
            className="shrink-0 border border-obsidian-bronze text-obsidian-bronze text-xs px-8 py-4 hover:bg-obsidian-bronze hover:text-obsidian-black transition-all duration-300"
            style={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            Arrange a Viewing
          </a>
        </div>
      </section>
    </PageLayout>
  )
}

function Pill({ children }) {
  return (
    <span className="border border-obsidian-warm text-obsidian-stone font-body font-light px-4 py-2"
      style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}>
      {children}
    </span>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4">
      <span className="bronze-line" />
      <span className="text-obsidian-stone font-body font-light"
        style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
        {children}
      </span>
    </div>
  )
}

function FloorPlanCard({ plan }) {
  return (
    <div className="border border-obsidian-warm p-8 flex flex-col gap-6">
      <div>
        <p className="font-display text-obsidian-parchment font-light" style={{ fontSize: '1.4rem' }}>
          {plan.level}
        </p>
        <p className="mt-1 text-obsidian-bronze font-body font-light"
          style={{ fontSize: '0.72rem', letterSpacing: '0.18em' }}>
          {plan.area}
        </p>
      </div>
      {/* Schematic placeholder */}
      <div className="w-full bg-obsidian-warm flex items-center justify-center" style={{ height: 180 }}>
        <FloorPlanSVG level={plan.level} />
      </div>
      <ul className="flex flex-col gap-2">
        {plan.rooms.map((r) => (
          <li key={r} className="flex items-center gap-3 text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}>
            <span className="w-1 h-1 rounded-full bg-obsidian-bronze shrink-0" />
            {r}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FloorPlanSVG({ level }) {
  const seed = level.length
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
      <rect x="10" y="10" width="140" height="100" stroke="#B8965A" strokeWidth="0.8" opacity="0.4" />
      <rect x="10" y="10" width="85" height="60" stroke="#B8965A" strokeWidth="0.8" opacity="0.6" />
      <rect x="95" y="10" width="55" height="40" stroke="#B8965A" strokeWidth="0.8" opacity="0.6" />
      <rect x="95" y="50" width="55" height="20" stroke="#B8965A" strokeWidth="0.8" opacity="0.4" />
      <rect x="10" y="70" width="55" height="40" stroke="#B8965A" strokeWidth="0.8" opacity="0.5" />
      <rect x="65" y="70" width="30" height="40" stroke="#B8965A" strokeWidth="0.8" opacity="0.4" />
      <rect x="95" y="70" width="55" height="40" stroke="#B8965A" strokeWidth="0.8" opacity="0.5" />
      <line x1="10" y1="70" x2="150" y2="70" stroke="#B8965A" strokeWidth="0.8" opacity="0.3" />
      <line x1="95" y1="10" x2="95" y2="110" stroke="#B8965A" strokeWidth="0.8" opacity="0.3" />
    </svg>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex gap-6 items-start">
      <span className="text-obsidian-bronze mt-1 shrink-0" style={{ fontSize: '1rem' }}>{icon}</span>
      <div>
        <p className="font-display text-obsidian-parchment font-light" style={{ fontSize: '1.2rem' }}>
          {title}
        </p>
        <p className="mt-2 text-obsidian-stone font-body font-light"
          style={{ fontSize: '0.82rem', lineHeight: 1.8, letterSpacing: '0.03em' }}>
          {desc}
        </p>
      </div>
    </div>
  )
}
