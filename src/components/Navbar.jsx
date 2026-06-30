import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Overview',    href: '#overview' },
  { label: 'Walkthrough', href: '#walkthrough' },
  { label: 'Specs',       href: '#specs' },
  { label: 'Amenities',   href: '#amenities' },
  { label: 'Location',    href: '#location' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    )

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-4' : 'py-6 bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#overview"
          onClick={(e) => handleSmoothScroll(e, '#overview')}
          className="font-display text-obsidian-parchment tracking-widest2 text-sm font-light select-none"
          style={{ letterSpacing: '0.22em' }}
        >
          OBSIDIAN RESIDENCES
        </a>

        {/* Center nav — hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleSmoothScroll(e, href)}
              className="text-obsidian-parchment hover-bronze text-xs tracking-widest font-body opacity-80 hover:opacity-100"
              style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, '#contact')}
          className="hidden sm:inline-flex items-center gap-2 border border-obsidian-bronze text-obsidian-bronze text-xs tracking-widest px-6 py-3 hover:bg-obsidian-bronze hover:text-obsidian-black transition-all duration-300"
          style={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}
        >
          Book a Private Tour
        </a>
      </div>
    </header>
  )
}
