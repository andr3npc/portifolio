import { useState } from 'react'
import { nav, profile } from '../data/content.js'
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
        </nav>
      </div>
    </header>
  )
}
