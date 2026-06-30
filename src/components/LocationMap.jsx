import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DISTANCES = [
  { place: 'Private Beach Access',      time: '2 Mins',  walk: true },
  { place: 'Tennis & Padel Courts',     time: '3 Mins',  walk: true },
  { place: 'Fine Dining District',      time: '8 Mins',  drive: true },
  { place: 'International Airport',     time: '15 Mins', drive: true },
  { place: 'Central Business District', time: '22 Mins', drive: true },
]

export default function LocationMap() {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      id="location"
      ref={sectionRef}
      className="bg-obsidian-black py-32 px-8"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-16">
          <span className="bronze-line" />
          <span
            className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}
          >
            Location & Connectivity
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Side panel */}
          <div ref={panelRef}>
            <h2
              className="font-display text-obsidian-parchment font-light text-balance mb-12"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.15 }}
            >
              Secluded, Yet Connected to Everything That Matters
            </h2>

            <ul className="flex flex-col divide-y divide-obsidian-warm">
              {DISTANCES.map(({ place, time, walk, drive }) => (
                <li key={place} className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-3">
                    {walk ? <WalkIcon /> : <CarIcon />}
                    <span
                      className="text-obsidian-stone font-body font-light"
                      style={{ fontSize: '0.82rem', letterSpacing: '0.04em' }}
                    >
                      {place}
                    </span>
                  </div>
                  <span
                    className="font-display text-obsidian-bronze font-light"
                    style={{ fontSize: '1.1rem' }}
                  >
                    {time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder */}
          <div ref={mapRef}>
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '4/3', background: '#111110' }}
            >
              {/* Simulated dark map grid */}
              <MapPlaceholder />

              {/* Location pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-obsidian-bronze bg-obsidian-bronze/20"
                    style={{ boxShadow: '0 0 0 8px rgba(184,150,90,0.12)' }}
                  />
                  <div
                    className="text-obsidian-bronze font-body font-light text-center"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
                  >
                    The Obsidian Villa
                  </div>
                </div>
              </div>

              {/* Corner label */}
              <div className="absolute bottom-4 left-4">
                <span
                  className="text-obsidian-stone font-body"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  Interactive map — available on enquiry
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MapPlaceholder() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Grid lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 44}
          y1="0"
          x2={i * 44}
          y2="300"
          stroke="#1E1C1A"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 40}
          x2="400"
          y2={i * 40}
          stroke="#1E1C1A"
          strokeWidth="1"
        />
      ))}
      {/* Mock roads */}
      <path d="M0 150 Q100 120 200 150 T400 140" stroke="#252320" strokeWidth="6" fill="none" />
      <path d="M160 0 L170 300" stroke="#252320" strokeWidth="4" fill="none" />
      <path d="M0 200 Q80 190 200 200 T400 195" stroke="#252320" strokeWidth="3" fill="none" />
      {/* Water hint */}
      <rect x="260" y="0" width="140" height="130" fill="#0d1518" opacity="0.8" />
      <path d="M260 0 Q300 30 340 10 T400 40V0Z" fill="#0f1a1f" />
    </svg>
  )
}

function WalkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="2" r="1.2" stroke="#5C5750" strokeWidth="1" />
      <path d="M7 4v4l-2 3M7 8l2 3M5 6h4" stroke="#5C5750" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 8l1.5-3h7L12 8v3H2V8z" stroke="#5C5750" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="4" cy="11" r="1" stroke="#5C5750" strokeWidth="1" />
      <circle cx="10" cy="11" r="1" stroke="#5C5750" strokeWidth="1" />
    </svg>
  )
}
