import { useEffect, useRef, useState } from 'react'

/**
 * Hook to trigger a CSS reveal animation when an element enters the viewport.
 * @param {Object} options - IntersectionObserver options
 * @returns {{ ref, isVisible }}
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, ...options }
    )

    const el = ref.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [])

  return { ref, isVisible }
}
