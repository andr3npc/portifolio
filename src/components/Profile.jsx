import { profile } from '../data/content.js'
import styles from './Profile.module.css'

export default function Profile() {
  return (
    <section id="profile" className={styles.section} data-section>
      <div className="container">
        <h2 className="reveal">Profile</h2>
        <p className={`${styles.summary} reveal`}>{profile.summary}</p>
        <div className={styles.stats}>
          {profile.stats.map((s) => (
            <div key={s.label} className={`${styles.stat} reveal`}>
              {s.logos && (
                <span className={styles.logos}>
                  {s.logos.map((logo) => (
                    <img
                      key={logo.alt}
                      className={styles.logo}
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  ))}
                </span>
              )}
              <span className={styles.value}>{s.value}</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
