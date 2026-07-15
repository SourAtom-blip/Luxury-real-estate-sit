import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageLayout from '../components/PageLayout'

gsap.registerPlugin(ScrollTrigger)

const TEAM = [
  {
    name: 'Elara Voss',
    role: 'Principal Architect',
    firm: 'Studio Meridian',
    bio: 'Known for structures that dissolve the boundary between interior and landscape. Winner of the Pritzker Prize 2021.',
  },
  {
    name: 'Matteo Rinaldi',
    role: 'Lead Interior Designer',
    firm: 'Atelier Noire',
    bio: 'Former creative director at Armani Casa. Matteo\'s interiors are defined by a restraint that paradoxically commands attention.',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Landscape Architect',
    firm: 'Tanaka Studio',
    bio: 'A master of the courtyard and the threshold. Yuki\'s gardens blur the line between cultivated and wild.',
  },
]

const AWARDS = [
  { year: '2025', award: 'RIBA House of the Year', body: 'Royal Institute of British Architects' },
  { year: '2025', award: 'Best Luxury Residence', body: 'European Property Awards' },
  { year: '2024', award: 'Outstanding Architecture', body: 'World Architecture Festival' },
  { year: '2024', award: 'Sustainable Design Award', body: 'BREEAM Outstanding' },
]

const TIMELINE = [
  { year: '2020', label: 'Concept', detail: 'Studio Meridian commissioned. Site surveys begin.' },
  { year: '2021', label: 'Design Development', detail: 'Planning consent granted after unanimous approval.' },
  { year: '2022', label: 'Construction', detail: 'Groundwork begins. Over 340 specialist craftspeople engaged.' },
  { year: '2024', label: 'Interiors', detail: 'Atelier Noire begins fit-out. Bespoke millwork arrives from Vienna.' },
  { year: '2025', label: 'Completion', detail: 'The Obsidian Villa opens. First private viewing held in May.' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const timelineRef = useRef(null)
  const teamRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })

    gsap.fromTo(
      timelineRef.current?.querySelectorAll('.timeline-item'),
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' } }
    )

    gsap.fromTo(
      teamRef.current?.querySelectorAll('.team-card'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: teamRef.current, start: 'top 75%' } }
    )
  }, [])

  return (
    <PageLayout>
      {/* Hero */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto" ref={heroRef}>
        <div className="flex items-center gap-4 mb-8">
          <span className="bronze-line" />
          <span className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            The Estate
          </span>
        </div>
        <h1 className="font-display text-obsidian-parchment font-light text-balance"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05 }}>
          A House Built on Conviction
        </h1>
        <div className="mt-10 grid lg:grid-cols-2 gap-12">
          <p className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.9rem', lineHeight: 1.9, letterSpacing: '0.03em' }}>
            The Obsidian Villa was not designed to impress — it was designed to endure. Its architects
            believed that a truly great house should feel inevitable: as if it had always belonged to the
            land, waiting to be found rather than built.
          </p>
          <p className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.9rem', lineHeight: 1.9, letterSpacing: '0.03em' }}>
            Five years in the making, and involving over 340 specialist craftspeople across twelve
            countries, the Villa is a monument to the idea that luxury is not excess — it is precision.
          </p>
        </div>
      </section>

      <div className="w-full h-px bg-obsidian-warm" />

      {/* Timeline */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto" ref={timelineRef}>
        <div className="flex items-center gap-4 mb-12">
          <span className="bronze-line" />
          <span className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            The Making Of
          </span>
        </div>
        <div className="relative">
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-obsidian-warm" />
          <div className="flex flex-col gap-10">
            {TIMELINE.map((item, i) => (
              <div key={i} className="timeline-item flex gap-8 items-start">
                <span className="shrink-0 w-[72px] font-display text-obsidian-bronze font-light text-right"
                  style={{ fontSize: '1.1rem', paddingRight: '1.5rem' }}>
                  {item.year}
                </span>
                <div className="pt-1">
                  <p className="font-display text-obsidian-parchment font-light" style={{ fontSize: '1.15rem' }}>
                    {item.label}
                  </p>
                  <p className="mt-2 text-obsidian-stone font-body font-light"
                    style={{ fontSize: '0.82rem', lineHeight: 1.8, letterSpacing: '0.03em' }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-obsidian-warm" />

      {/* Creative Team */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto" ref={teamRef}>
        <div className="flex items-center gap-4 mb-12">
          <span className="bronze-line" />
          <span className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            The Creative Team
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map(({ name, role, firm, bio }) => (
            <div key={name} className="team-card border border-obsidian-warm p-8 flex flex-col gap-4">
              <div className="w-12 h-12 bg-obsidian-warm flex items-center justify-center">
                <span className="font-display text-obsidian-bronze font-light text-xl">
                  {name[0]}
                </span>
              </div>
              <div>
                <p className="font-display text-obsidian-parchment font-light" style={{ fontSize: '1.2rem' }}>
                  {name}
                </p>
                <p className="text-obsidian-bronze font-body font-light mt-0.5"
                  style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  {role}
                </p>
                <p className="text-obsidian-stone font-body font-light mt-0.5"
                  style={{ fontSize: '0.72rem', letterSpacing: '0.1em' }}>
                  {firm}
                </p>
              </div>
              <p className="text-obsidian-stone font-body font-light"
                style={{ fontSize: '0.82rem', lineHeight: 1.8, letterSpacing: '0.03em' }}>
                {bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-obsidian-warm" />

      {/* Awards */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="bronze-line" />
          <span className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            Recognition
          </span>
        </div>
        <div className="grid gap-px bg-obsidian-warm sm:grid-cols-2">
          {AWARDS.map(({ year, award, body }) => (
            <div key={award} className="bg-obsidian-black px-8 py-7">
              <p className="text-obsidian-bronze font-body font-light"
                style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {year}
              </p>
              <p className="mt-2 font-display text-obsidian-parchment font-light" style={{ fontSize: '1.2rem' }}>
                {award}
              </p>
              <p className="mt-1 text-obsidian-stone font-body font-light"
                style={{ fontSize: '0.78rem', letterSpacing: '0.06em' }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
