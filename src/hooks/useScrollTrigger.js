import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fires a callback with the ScrollTrigger instance after mount.
 * Cleans up on unmount.
 */
export function useScrollTrigger(config, deps = []) {
  const stRef = useRef(null)

  useEffect(() => {
    stRef.current = ScrollTrigger.create(config)
    return () => {
      stRef.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return stRef
}

/**
 * Scrubs a video's currentTime to scroll progress over a given trigger element.
 * @param {React.RefObject} videoRef
 * @param {React.RefObject} triggerRef  — the tall scroll container
 */
export function useVideoScrub(videoRef, triggerRef) {
  useEffect(() => {
    const video = videoRef.current
    const trigger = triggerRef.current
    if (!video || !trigger) return

    // Preload the video fully before setting up scrub
    video.preload = 'auto'
    video.load()

    const st = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate(self) {
        if (video.readyState >= 2 && isFinite(video.duration)) {
          video.currentTime = self.progress * video.duration
        }
      },
    })

    return () => st.kill()
  }, [videoRef, triggerRef])
}
