import { reading } from '../data/content.js'
import styles from './Reading.module.css'

export default function Reading() {
  return (
    <section id="reading" className={styles.section} data-section>
      <div className="container">
        <h2 className="reveal">
          Leituras <img className={styles.flag} src={reading.flag} alt="Brasil" />
        </h2>
        <p className={`${styles.statement} reveal`}>{reading.statement}</p>
        <a
          href={reading.url}
          className={`${styles.link} reveal`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {reading.linkLabel} ↗
        </a>
      </div>
    </section>
  )
}
