import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Property', to: '/property' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar({ inner = false }) {
  const navRef  = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
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

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || inner ? 'glass-nav py-4' : 'py-6 bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-obsidian-parchment text-sm font-light select-none"
          style={{ letterSpacing: '0.22em' }}
        >
          OBSIDIAN RESIDENCES
        </Link>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-xs font-body ${
                location.pathname === to
                  ? 'text-obsidian-bronze'
                  : 'text-obsidian-parchment opacity-80 hover:opacity-100'
              }`}
              style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="/contact"
          className="hidden sm:inline-flex items-center border border-obsidian-bronze text-obsidian-bronze text-xs tracking-widest px-6 py-3 hover:bg-obsidian-bronze hover:text-obsidian-black transition-all duration-300"
          style={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}
        >
          Book a Private Tour
        </Link>
      </div>
    </header>
  )
}
