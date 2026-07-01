import { experience, education, certifications } from '../data/content.js'
import styles from './Experience.module.css'

export default function Experience() {
  return (
    <section id="experience" className={styles.section} data-section>
      <div className="container">
        <h2 className="reveal">Experience</h2>

        <div className={styles.timeline}>
          {experience.map((job) => (
            <article key={`${job.company}-${job.start}`} className={`${styles.item} reveal`}>
              <div className={styles.period}>{job.start} – {job.end}</div>
              <div className={styles.body}>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.company}>
                  {job.company}{job.location ? ` · ${job.location}` : ''}
                </p>
                <ul className={styles.bullets}>
                  {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.grid}>
          <div className="reveal">
            <h3 className={styles.subhead}>Education</h3>
            {education.map((e) => (
              <div key={e.institution} className={styles.eduItem}>
                <strong>{e.institution}</strong>
                <span className={styles.eduPeriod}>{e.period}</span>
                <p className={styles.eduDetail}>{e.detail}</p>
              </div>
            ))}
          </div>
          <div className="reveal">
            <h3 className={styles.subhead}>Certifications</h3>
            <ul className={styles.certs}>
              {certifications.map((c) => (
                <li key={c.name}>
                  <strong>{c.name}</strong> — {c.issuer}, {c.year}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
