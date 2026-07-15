import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageLayout from '../components/PageLayout'
import imgKitchen from '../assets/kitchen.webp'
import imgBedroom from '../assets/bedroom.webp'
import imgPool    from '../assets/pool.webp'
import imgLibrary from '../assets/library.webp'
import imgSpa     from '../assets/spa.webp'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Living', 'Kitchen', 'Bedrooms', 'Wellness', 'Exterior']

const GALLERY_ITEMS = [
  { src: imgPool,    title: 'Infinity Pool',        category: 'Exterior',  span: 'lg:col-span-2 lg:row-span-2' },
  { src: imgKitchen, title: "Chef's Kitchen",       category: 'Kitchen',   span: '' },
  { src: imgBedroom, title: 'Primary Master Suite', category: 'Bedrooms',  span: '' },
  { src: imgSpa,     title: 'Private Spa',          category: 'Wellness',  span: 'lg:col-span-2' },
  { src: imgLibrary, title: 'Library & Study',      category: 'Living',    span: '' },
  { src: imgPool,    title: 'Poolside Terrace',     category: 'Exterior',  span: '' },
  { src: imgKitchen, title: 'Breakfast Pavilion',   category: 'Kitchen',   span: '' },
  { src: imgBedroom, title: 'Master Suite 2',       category: 'Bedrooms',  span: '' },
  { src: imgSpa,     title: 'Steam & Sauna',        category: 'Wellness',  span: 'lg:col-span-2' },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const gridRef = useRef(null)

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === activeCategory)

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.gallery-item')
    if (!items) return
    gsap.fromTo(items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' } }
    )
  }, [activeCategory])

  return (
    <PageLayout>
      {/* Header */}
      <section className="px-8 py-20 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <span className="bronze-line" />
          <span className="text-obsidian-stone font-body font-light"
            style={{ fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            Photo Gallery
          </span>
        </div>
        <h1 className="font-display text-obsidian-parchment font-light"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05 }}>
          A Portrait in Light
        </h1>
        <p className="mt-6 text-obsidian-stone font-body font-light max-w-xl"
          style={{ fontSize: '0.9rem', lineHeight: 1.9, letterSpacing: '0.03em' }}>
          Every room is a composition. Every view, an artwork. Explore the spaces that define
          the Obsidian Villa.
        </p>
      </section>

      {/* Category Filter */}
      <section className="px-8 max-w-screen-xl mx-auto">
        <div className="flex flex-wrap gap-3 pb-12 border-b border-obsidian-warm">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-body font-light transition-all duration-300 border ${
                activeCategory === cat
                  ? 'border-obsidian-bronze text-obsidian-bronze'
                  : 'border-obsidian-warm text-obsidian-stone hover:border-obsidian-stone'
              }`}
              style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-8 py-12 max-w-screen-xl mx-auto" ref={gridRef}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {filtered.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className={`gallery-item relative overflow-hidden cursor-pointer group ${item.span}`}
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-obsidian-black/0 group-hover:bg-obsidian-black/40 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <p className="font-display text-obsidian-parchment font-light" style={{ fontSize: '1.1rem' }}>
                  {item.title}
                </p>
                <p className="text-obsidian-bronze font-body font-light mt-1"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  {item.category}
                </p>
              </div>
              {/* Plus icon */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-obsidian-parchment/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-obsidian-parchment/80 text-xs">+</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian-black/90"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-8 text-obsidian-stone hover:text-obsidian-parchment text-2xl font-light transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="relative max-w-5xl max-h-[85vh] mx-8" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="mt-4">
              <p className="font-display text-obsidian-parchment font-light" style={{ fontSize: '1.3rem' }}>
                {lightbox.title}
              </p>
              <p className="text-obsidian-bronze font-body font-light mt-1"
                style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {lightbox.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
