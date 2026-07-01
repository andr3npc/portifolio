import { skills } from '../data/content.js'
import styles from './Skills.module.css'

function Group({ title, items }) {
  return (
    <div className={`${styles.group} reveal`}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <ul className={styles.chips}>
        {items.map((s) => <li key={s} className={styles.chip}>{s}</li>)}
      </ul>
    </div>
  )
}

function PlatformCards({ title, items }) {
  return (
    <div className={`${styles.group} reveal`}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <ul className={styles.cards}>
        {items.map((item) => (
          <li key={item.name} className={styles.card}>
            <span className={styles.cardName}>{item.name}</span>
            <span className={styles.cardDesc}>{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section} data-section>
      <div className="container">
        <h2 className="reveal">Skills</h2>
        <PlatformCards title="Platforms & Tools" items={skills.platforms} />
        <Group title="Languages" items={skills.codeLanguages} />
        <Group title="Spoken" items={skills.spokenLanguages} />
      </div>
    </section>
  )
}
