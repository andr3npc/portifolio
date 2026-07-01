import { profile, footer } from '../data/content.js'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>{profile.name}</span>
        <span className={styles.tag}>{footer.tagline}</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
