import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TILES = [
  {
    id: 'kitchen',
    src: '/assets/kitchen.png',
    title: "Chef's Kitchen",
    sub: "Gaggenau appliance suite, quartzite island, butler's pantry",
    class: 'bento-1',
    fallbackBg: 'linear-gradient(135deg, #1a1613 0%, #2a211a 100%)',
  },
  {
    id: 'bedroom',
    src: '/assets/bedroom.png',
    title: 'Master Suite',
    sub: 'Private terrace, bespoke walk-in, soaking bath',
    class: 'bento-2',
    fallbackBg: 'linear-gradient(135deg, #131518 0%, #1c2028 100%)',
  },
  {
    id: 'pool',
    src: '/assets/pool.png',
    title: 'Infinity Pool',
    sub: '25-metre heated, ocean sight-line',
    class: 'bento-3',
    fallbackBg: 'linear-gradient(135deg, #0f1a1c 0%, #162025 100%)',
  },
  {
    id: 'library',
    src: '/assets/library.png',
    title: 'Private Library',
    sub: 'Reclaimed oak panelling, bespoke joinery',
    class: 'bento-4',
    fallbackBg: 'linear-gradient(135deg, #181410 0%, #221c14 100%)',
  },
  {
    id: 'spa',
    src: '/assets/spa.png',
    title: 'Wellness & Spa',
    sub: 'Hammam, sauna, cold plunge, treatment room',
    class: 'bento-5',
    fallbackBg: 'linear-gradient(135deg, #10151a 0%, #181f25 100%)',
  },
]

export default function Amenities() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="bg-obsidian-dark py-32 px-8"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="bronze-line" />
            <span
              className="text-obsidian-stone font-body font-light"
              style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}
            >
              Curated Amenities
            </span>
          </div>
          <h2
            className="font-display text-obsidian-parchment font-light text-balance"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Spaces Designed for the Extraordinary
          </h2>
        </div>

        {/* Bento grid */}
        <div className="bento-grid">
          {TILES.map((tile) => (
            <BentoTile key={tile.id} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BentoTile({ tile }) {
  const tileRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      tileRef.current,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: {
          trigger: tileRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <div
      ref={tileRef}
      className={`${tile.class} relative overflow-hidden group cursor-pointer`}
      style={{ background: tile.fallbackBg }}
    >
      {/* Image */}
      <img
        src={tile.src}
        alt={tile.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(9,9,10,0.88) 0%, rgba(9,9,10,0.2) 50%, transparent 100%)',
        }}
      />

      {/* Text card */}
      <div className="absolute bottom-0 left-0 right-0 p-7">
        <p
          className="font-display text-obsidian-parchment font-light"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', lineHeight: 1.2 }}
        >
          {tile.title}
        </p>
        <p
          className="mt-2 text-obsidian-stone font-body font-light opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ fontSize: '0.75rem', letterSpacing: '0.04em', lineHeight: 1.6 }}
        >
          {tile.sub}
        </p>
        <span
          className="mt-3 block w-0 group-hover:w-8 transition-all duration-500 h-px bg-obsidian-bronze"
        />
      </div>
    </div>
  )
}
