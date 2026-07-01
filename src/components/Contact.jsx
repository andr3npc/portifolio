import { contact, resume } from '../data/content.js'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact" className={styles.section} data-section>
      <div className="container">
        <h2 className="reveal">Contact</h2>
        <div className={styles.grid}>
          <ul className={`${styles.details} reveal`}>
            <li>
              <span className={styles.label}>Email</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <span className={styles.label}>Phone</span>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            </li>
            <li>
              <span className={styles.label}>Location</span>
              <span>{contact.location}</span>
            </li>
          </ul>
          <div className={`${styles.auth} reveal`}>
            <h3 className={styles.authTitle}>Work Authorization</h3>
            <ul>
              {contact.workAuth.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
            <a
              href={resume.file}
              download={resume.downloadName}
              className={styles.resumeBtn}
            >
              {resume.label} ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
