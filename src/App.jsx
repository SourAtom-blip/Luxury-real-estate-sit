import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar      from './components/Navbar'
import HeroVideo   from './components/HeroVideo'
import SpecsGrid   from './components/SpecsGrid'
import Amenities   from './components/Amenities'
import LocationMap from './components/LocationMap'
import ContactForm from './components/ContactForm'
import Footer      from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Global GSAP defaults
    gsap.defaults({ ease: 'power3.out' })

    // Refresh ScrollTrigger after fonts load
    document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className="bg-obsidian-black min-h-screen">
      <Navbar />
      <main>
        <HeroVideo />

        {/* Walkthrough anchor — below the hero */}
        <div id="walkthrough" style={{ scrollMarginTop: '80px' }} />

        <SpecsGrid />
        <Amenities />
        <LocationMap />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
