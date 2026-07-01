import { useState } from 'react'
import { nav, profile, social } from '../data/content.js'
import styles from './Nav.module.css'

export default function Nav({ active }) {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href="#hero" className={styles.brand} onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        <button
          className={styles.toggle}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? styles.activeLink : ''}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={social.github}
            className={styles.social}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            onClick={() => setOpen(false)}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 16 16"
              width="20"
              height="20"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <span className={styles.socialLabel}>GitHub</span>
          </a>
          <a
            href={social.credly}
            className={styles.social}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Credly badges"
            onClick={() => setOpen(false)}
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            <span className={styles.socialLabel}>Credly</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
