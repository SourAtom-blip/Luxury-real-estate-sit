import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useVideoScrub } from '../hooks/useScrollTrigger'

const heroVideo = '/hero_scrub.mp4'

gsap.registerPlugin(ScrollTrigger)

// Text overlays: [progress_start, progress_end, jsx]
const OVERLAYS = [
  {
    id: 'overlay-1',
    from: 0,
    to: 0.28,
    content: (
      <div className="text-center">
        <p
          className="font-display text-obsidian-parchment font-light text-balance"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}
        >
          The Obsidian Villa
        </p>
        <p
          className="mt-6 text-obsidian-stone font-body font-light tracking-widest3"
          style={{ fontSize: '0.7rem', letterSpacing: '0.38em', textTransform: 'uppercase' }}
        >
          Scroll to Explore
        </p>
        <ScrollArrow />
      </div>
    ),
  },
  {
    id: 'overlay-2',
    from: 0.3,
    to: 0.62,
    content: (
      <div className="text-center">
        <span
          className="font-display italic text-obsidian-parchment font-light"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', lineHeight: 1.1 }}
        >
          Step into Modern Grandeur
        </span>
      </div>
    ),
  },
  {
    id: 'overlay-3',
    from: 0.65,
    to: 1,
    content: (
      <div className="text-center">
        <span
          className="font-display text-obsidian-parchment font-light"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', lineHeight: 1.1 }}
        >
          Where Sea Meets Sky
        </span>
        <div className="mt-5 flex justify-center">
          <span className="bronze-line" />
        </div>
      </div>
    ),
  },
]

function ScrollArrow() {
  return (
    <div
      className="mt-8 flex justify-center"
      style={{ animation: 'bounce-soft 2s ease-in-out infinite' }}
    >
      <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
        <path
          d="M10 1 L10 24 M3 18 L10 25 L17 18"
          stroke="#B8965A"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function HeroVideo() {
  const scrollSpaceRef = useRef(null)
  const videoRef = useRef(null)
  const overlayRefs = useRef({})

  // Wire video scrubbing
  useVideoScrub(videoRef, scrollSpaceRef)

  // Single scrubbed timeline controls all overlay transitions precisely
  useEffect(() => {
    const scrollSpace = scrollSpaceRef.current
    if (!scrollSpace) return

    const o1 = overlayRefs.current['overlay-1']
    const o2 = overlayRefs.current['overlay-2']
    const o3 = overlayRefs.current['overlay-3']
    if (!o1 || !o2 || !o3) return

    // Set initial states
    gsap.set(o1, { opacity: 1, y: 0 })
    gsap.set([o2, o3], { opacity: 0, y: 20 })

    // Virtual 10-unit timeline mapped to full scroll distance
    const D = 0.25  // transition duration within the 10-unit scale
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollSpace,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      defaults: { ease: 'power2.inOut', duration: D },
    })

    // overlay-1 fades out at 25%
    tl.to(o1, { opacity: 0, y: -20 }, 10 * 0.25)
    // overlay-2 fades in at 30%
    tl.fromTo(o2, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 10 * 0.30)
    // overlay-2 fades out at 60%
    tl.to(o2, { opacity: 0, y: -20 }, 10 * 0.60)
    // overlay-3 fades in at 65%
    tl.fromTo(o3, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 10 * 0.65)

    return () => tl.scrollTrigger?.kill()
  }, [])

  return (
    <section
      id="overview"
      ref={scrollSpaceRef}
      className="hero-scroll-space"
      aria-label="Hero video walkthrough"
    >
      <div className="hero-sticky">
        {/* Video */}
        <video
          ref={videoRef}
          src={heroVideo}
          poster="/poster.jpg"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        />

        {/* Dark gradient vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 35%, rgba(9,9,10,0.55) 100%), linear-gradient(to bottom, rgba(9,9,10,0.3) 0%, transparent 30%, transparent 70%, rgba(9,9,10,0.6) 100%)',
          }}
        />

        {/* Text overlays */}
        {OVERLAYS.map(({ id, content }) => (
          <div
            key={id}
            ref={(el) => (overlayRefs.current[id] = el)}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: 0 }}
          >
            {content}
          </div>
        ))}

        {/* Bottom progress line */}
        <ProgressLine scrollSpaceRef={scrollSpaceRef} />
      </div>

      <style>{`
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>
    </section>
  )
}

function ProgressLine({ scrollSpaceRef }) {
  const lineRef = useRef(null)

  useEffect(() => {
    const el = lineRef.current
    const space = scrollSpaceRef.current
    if (!el || !space) return

    const st = ScrollTrigger.create({
      trigger: space,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        el.style.transform = `scaleX(${self.progress})`
      },
    })

    return () => st.kill()
  }, [scrollSpaceRef])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-obsidian-dark">
      <div
        ref={lineRef}
        className="h-full bg-obsidian-bronze origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
