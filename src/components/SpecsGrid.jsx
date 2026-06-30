import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SPECS = [
  {
    icon: BedIcon,
    value: '5',
    unit: 'Master',
    label: 'Bedrooms',
  },
  {
    icon: BathIcon,
    value: '6',
    unit: 'Bespoke',
    label: 'Bathrooms',
  },
  {
    icon: RulerIcon,
    value: '8,500',
    unit: 'Sq. Ft.',
    label: 'Living Space',
  },
  {
    icon: GarageIcon,
    value: '4-Car',
    unit: 'Underground',
    label: 'Garage',
  },
]

export default function SpecsGrid() {
  const sectionRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean)
    if (!items.length) return

    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      id="specs"
      ref={sectionRef}
      className="bg-obsidian-black py-32 px-8"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-20">
          <span className="bronze-line" />
          <span
            className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}
          >
            Property Specifications
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-obsidian-warm">
          {SPECS.map(({ icon: Icon, value, unit, label }, i) => (
            <div
              key={label}
              ref={(el) => (itemRefs.current[i] = el)}
              className="bg-obsidian-black px-10 py-14 flex flex-col items-start gap-6"
            >
              <Icon />
              <div>
                <div
                  className="font-display text-obsidian-parchment font-light"
                  style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1 }}
                >
                  {value}
                </div>
                <div
                  className="mt-1 text-obsidian-bronze font-body font-light"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
                >
                  {unit}
                </div>
                <div
                  className="mt-1 text-obsidian-stone font-body font-light"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p
          className="mt-16 text-obsidian-stone font-body font-light max-w-lg"
          style={{ fontSize: '0.8rem', lineHeight: 1.8, letterSpacing: '0.04em' }}
        >
          Every square foot of The Obsidian Villa has been designed in collaboration
          with Pritzker-recognised architects, using reclaimed stone, hand-formed
          bronze, and sustainably sourced timber throughout.
        </p>
      </div>
    </section>
  )
}

/* ── SVG Icons ──────────────────────────────────────────── */
function BedIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="4" y="18" width="28" height="10" rx="1" stroke="#B8965A" strokeWidth="1.2" />
      <path d="M4 18V12a2 2 0 012-2h4a2 2 0 012 2v6" stroke="#B8965A" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M14 18v-4a2 2 0 012-2h6a2 2 0 012 2v4" stroke="#B8965A" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M4 28v2M32 28v2" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function BathIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M8 10V22a2 2 0 002 2h16a2 2 0 002-2V10" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 22h28" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 10a3 3 0 013-3h0a3 3 0 013 3" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M14 26v3M22 26v3" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function RulerIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="14" width="30" height="8" rx="1" stroke="#B8965A" strokeWidth="1.2" />
      <path d="M9 14v-3M15 14v-5M21 14v-3M27 14v-5" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function GarageIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M4 32V16L18 8l14 8v16" stroke="#B8965A" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="12" y="20" width="12" height="12" rx="0.5" stroke="#B8965A" strokeWidth="1.2" />
      <path d="M12 26h12" stroke="#B8965A" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14.5" cy="26" r="0.8" fill="#B8965A" />
      <circle cx="21.5" cy="26" r="0.8" fill="#B8965A" />
    </svg>
  )
}
