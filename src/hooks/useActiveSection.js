import { useEffect, useState } from 'react'

/**
 * Observes elements with ids in `ids` and:
 *  - adds `is-visible` to any `.reveal` inside once it scrolls into view
 *  - reports the id of the section currently dominant in the viewport
 * Returns the active section id (string) for nav highlighting.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] || '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal')
              .forEach((el) => el.classList.add('is-visible'))
          }
        })
      },
      { threshold: 0.15 },
    )

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => {
      revealer.observe(s)
      spy.observe(s)
    })

    return () => {
      revealer.disconnect()
      spy.disconnect()
    }
  }, [ids])

  return active
}
