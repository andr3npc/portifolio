import { courseCertificates } from '../data/content.js'
import styles from './Certificates.module.css'

export default function Certificates() {
  return (
    <section id="certificates" className={styles.section} data-section>
      <div className="container">
        <h2 className="reveal">Certificates</h2>
        <p className={`${styles.intro} reveal`}>
          Verified course certificates — open the PDF to view, and see what each one covered.
        </p>
        <div className={styles.grid}>
          {courseCertificates.map((cert) => (
            <article key={cert.title} className={`${styles.card} reveal`}>
              <div className={styles.head}>
                <h3 className={styles.title}>{cert.title}</h3>
                <span className={styles.year}>{cert.year}</span>
              </div>
              <p className={styles.issuer}>{cert.issuer}</p>
              <div className={styles.covers}>
                <span className={styles.coversLabel}>Covered</span>
                <ul className={styles.coversList}>
                  {cert.covers.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <a
                href={cert.file}
                className={styles.view}
                target="_blank"
                rel="noopener noreferrer"
              >
                View certificate ↗
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
