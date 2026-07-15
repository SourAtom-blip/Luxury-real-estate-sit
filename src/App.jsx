import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar        from './components/Navbar'
import HeroVideo     from './components/HeroVideo'
import SpecsGrid     from './components/SpecsGrid'
import Amenities     from './components/Amenities'
import LocationMap   from './components/LocationMap'
import ContactForm   from './components/ContactForm'
import Footer        from './components/Footer'

import PropertyPage  from './pages/PropertyPage'
import GalleryPage   from './pages/GalleryPage'
import AboutPage     from './pages/AboutPage'
import ContactPage   from './pages/ContactPage'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  useEffect(() => {
    gsap.defaults({ ease: 'power3.out' })
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className="bg-obsidian-black min-h-screen">
      <Navbar />
      <main>
        <HeroVideo />
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/property" element={<PropertyPage />} />
        <Route path="/gallery"  element={<GalleryPage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
