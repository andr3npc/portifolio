import { hlasmTopics } from '../data/content.js'
import styles from './HLASM.module.css'

export default function HLASM() {
  return (
    <section id="hlasm" className={styles.section} data-section>
      <div className="container">
        <h2 className="reveal">HLASM Knowledge</h2>
        <p className={`${styles.intro} reveal`}>
          Core Assembler concepts I work with day to day — from addressing modes to
          linkage conventions and relocatability.
        </p>
        <div className={styles.grid}>
          {hlasmTopics.map((t) => (
            <article key={t.title} className={`${styles.card} reveal`}>
              <h3 className={styles.cardTitle}>{t.title}</h3>
              <p className={styles.cardBody}>{t.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
