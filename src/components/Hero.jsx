import { profile, resume } from '../data/content.js'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} data-section>
      <div className={styles.overlay} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>Mainframe · z/OS · HLASM</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.title}>{profile.title}</p>
        <p className={styles.tagline}>{profile.tagline}</p>
        <div className={styles.actions}>
          <a href="#profile" className={styles.cta}>Explore ↓</a>
          <a
            href={resume.file}
            download={resume.downloadName}
            className={styles.ctaSolid}
          >
            {resume.label} ↓
          </a>
        </div>
      </div>
    </section>
  )
}
