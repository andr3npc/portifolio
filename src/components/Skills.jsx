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

export default function Skills() {
  return (
    <section id="skills" className={styles.section} data-section>
      <div className="container">
        <h2 className="reveal">Skills</h2>
        <Group title="Platforms & Tools" items={skills.platforms} />
        <Group title="Languages" items={skills.codeLanguages} />
        <Group title="Spoken" items={skills.spokenLanguages} />
      </div>
    </section>
  )
}
