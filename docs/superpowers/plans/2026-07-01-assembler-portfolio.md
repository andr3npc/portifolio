# Assembler Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, dark-themed React portfolio site for Andre Neil (z/OS Specialist) that showcases his resume and HLASM/Assembler depth to recruiters.

**Architecture:** Vite + React (JS) single-page scroll site. Sticky nav smooth-scrolls to anchored sections (Hero, Profile, Experience/Education, HLASM Knowledge, Skills, Contact, Footer). All copy lives in `src/data/content.js`; components are presentational and import from it. CSS Modules per component plus global design tokens. Scroll-reveal + active-nav via one shared IntersectionObserver hook.

**Tech Stack:** Vite, React 18, CSS Modules, Google Fonts (Anton + Inter), Vitest + React Testing Library (light smoke tests).

**Reference:** Design spec at `docs/superpowers/specs/2026-07-01-assembler-portfolio-design.md`.

**Design guidance:** During implementation, consult the `frontend-design` skill for aesthetic decisions so the result doesn't read as a templated default.

---

## File Structure

```
index.html                      HTML entry, font <link>s, root div
package.json                    scripts + deps
vite.config.js                  React plugin + Vitest config
public/hero.jpg                 hero background (moved from project root)
src/main.jsx                    React mount
src/App.jsx                     assembles sections in order
src/setupTests.js               jest-dom matchers for Vitest
src/data/content.js             ALL resume + HLASM copy (single source of truth)
src/hooks/useActiveSection.js   IntersectionObserver: active nav id + reveal
src/styles/tokens.css           CSS custom properties (colors, fonts, spacing)
src/styles/global.css           resets, base element styles, .reveal utility
src/components/
  Nav.jsx / Nav.module.css
  Hero.jsx / Hero.module.css
  Profile.jsx / Profile.module.css
  Experience.jsx / Experience.module.css
  HLASM.jsx / HLASM.module.css
  Skills.jsx / Skills.module.css
  Contact.jsx / Contact.module.css
  Footer.jsx / Footer.module.css
src/components/__tests__/content.test.jsx   smoke tests
```

Section id convention (used by Nav links, section anchors, and the observer):
`hero`, `profile`, `experience`, `hlasm`, `skills`, `contact`.

---

## Task 1: Scaffold the Vite + React project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `.gitignore`
- Move: `hero.jpg` → `public/hero.jpg`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "assembler-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.1",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.1",
    "vite": "^5.4.2",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
```

- [ ] **Step 3: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Andre Neil — z/OS Specialist & Mainframe Systems Specialist. 20+ years in IBM z/OS, HLASM/Assembler, JES2." />
    <title>Andre Neil — z/OS Specialist</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 5: Create a temporary `src/App.jsx` placeholder**

```jsx
export default function App() {
  return <h1>Portfolio bootstrapping…</h1>
}
```

- [ ] **Step 6: Create `.gitignore`**

```gitignore
node_modules
dist
.DS_Store
*.local
```

- [ ] **Step 7: Create directories, move the hero image, and create empty style files so imports resolve**

Run:
```bash
mkdir -p public src/styles src/hooks src/data src/components/__tests__
git mv hero.jpg public/hero.jpg 2>/dev/null || mv hero.jpg public/hero.jpg
touch src/styles/tokens.css src/styles/global.css
```

- [ ] **Step 8: Install dependencies**

Run: `npm install`
Expected: completes with `added N packages`, no ERR.

- [ ] **Step 9: Start dev server and verify it boots**

Run: `npm run dev` (then stop it with Ctrl-C after confirming)
Expected: Vite prints `Local: http://localhost:5173/` with no errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React project"
```

---

## Task 2: Design tokens and global styles

**Files:**
- Modify: `src/styles/tokens.css`, `src/styles/global.css`

- [ ] **Step 1: Write `src/styles/tokens.css`**

```css
:root {
  /* palette */
  --bg: #0a0a0a;
  --bg-elevated: #141414;
  --text: #f5f5f5;
  --text-muted: #a3a3a3;
  --accent: #c026d3;        /* magenta — primary, darker */
  --accent-strong: #d946ef; /* magenta hover for primary elements */
  --interact: #22d3ee;      /* cyan — links / interactive hover */
  --border: #262626;

  /* type */
  --font-head: 'Anton', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* spacing */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
  --space-6: 6rem;

  --maxw: 1080px;
  --radius: 10px;
  --nav-h: 64px;
}
```

- [ ] **Step 2: Write `src/styles/global.css`**

```css
*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; scroll-padding-top: var(--nav-h); }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-head);
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.05;
  margin: 0 0 var(--space-2);
  text-transform: uppercase;
}

a { color: var(--interact); text-decoration: none; }
a:hover { text-decoration: underline; }

p { margin: 0 0 var(--space-2); }

section { scroll-margin-top: var(--nav-h); }

.container { width: 100%; max-width: var(--maxw); margin: 0 auto; padding: 0 var(--space-3); }

/* scroll-reveal utility (toggled by useActiveSection) */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
}

:focus-visible { outline: 2px solid var(--interact); outline-offset: 3px; }
```

- [ ] **Step 3: Commit**

```bash
git add src/styles
git commit -m "feat: add design tokens and global styles"
```

---

## Task 3: Content data (single source of truth)

**Files:**
- Create: `src/data/content.js`

- [ ] **Step 1: Write `src/data/content.js`** (copy verbatim — this is the resume/HLASM source of truth)

```js
export const nav = [
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'hlasm', label: 'HLASM' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const profile = {
  name: 'ANDRE NEIL',
  title: 'z/OS Specialist · Mainframe Systems',
  tagline: 'Reading dumps, tracing failures to root cause, and building HLASM to z/OS conventions.',
  summary:
    'Mainframe Systems Specialist with over 20 years of experience in IBM z/OS environments, specializing in system administration, performance tuning, and batch processing optimization. Proven expertise in managing complex enterprise workloads, maintaining high system availability, and driving modernization initiatives. Adept at working with cross-functional teams to ensure secure, stable, and efficient mainframe operations supporting critical business applications.',
  stats: [
    { value: '20+ yrs', label: 'in IBM z/OS' },
    { value: 'IBM · Citigroup', label: 'enterprise mainframe' },
    { value: 'EU + BR', label: 'work authorized' },
  ],
}

export const experience = [
  {
    company: 'IBM',
    role: 'z/OS JES Tech Support',
    location: '',
    start: '2024',
    end: 'Present',
    bullets: [
      'JES2 Technical Support Engineer responsible for a worldwide Salesforce case queue, ensuring timely, high-quality support for enterprise z/OS environments.',
      'Monitor incoming cases, triage and prioritize by impact, perform dump and log analysis, reproduce issues, and deliver fixes or coordinated escalations across product and systems teams.',
      'Keep customers in EMEA/APAC/AMER informed with clear status updates, RCAs, and runbook guidance — driving SLA compliance and reducing repeat incidents.',
    ],
  },
  {
    company: 'IBM',
    role: 'z/OSMF Core Support',
    location: '',
    start: '2019',
    end: '2024',
    bullets: [
      'Installed, configured, and maintained z/OSMF components and plug-ins to support system administration, workflow management, and performance monitoring.',
      'Assisted users with z/OSMF interface navigation, access issues, and workflow execution.',
      'Documented procedures, troubleshooting steps, and onboarding guides for operations and support teams.',
    ],
  },
  {
    company: 'Citigroup',
    role: 'Mainframe QA Tester Analyst (Offshift)',
    location: 'Brazil & Warsaw, PL',
    start: '2010',
    end: '2017',
    bullets: [
      'QA and technical support across enterprise z/OS environments: triaging by impact, performing dump and log analysis, reproducing issues, and coordinating fixes.',
      'Delivered clear status updates and RCAs across regions, supporting SLA compliance and reducing repeat incidents.',
    ],
  },
  {
    company: 'Procwork (outsourced for IBM)',
    role: 'Batch Operator / Production Support / Knowledge Transfer',
    location: '',
    start: '2004',
    end: '2010',
    bullets: [
      'Supported mainframe production for internal teams and enterprise clients; led outsourcing transitions (Sara Lee & Hanes Brands, ACE Insurance, SunTrust Bank) through due diligence, knowledge transfer, and training.',
      'Managed daily z/OS batch cycles across multiple LPARs; triaged job abends, system alerts, and performance issues by analyzing JCL and logs to minimize downtime.',
      'Provided on-call coverage, drove root-cause and preventive actions, documented operational procedures, trained new team members, and served as client-facing POC for SLA compliance.',
    ],
  },
]

export const education = [
  {
    institution: 'Universidade Presbiteriana Mackenzie',
    detail: 'Undergraduate program · 2.5 years · expected completion mid-2028',
    period: 'From Jan 2026',
  },
  {
    institution: 'UNIP — Universidade Paulista',
    detail: 'B.S. Information Systems — program not completed',
    period: '2019–2020',
  },
]

export const certifications = [
  { name: 'IBM Mainframe Developer', issuer: 'IBM', year: '2025' },
  { name: 'Deep Teaching Solutions', issuer: 'Coursera', year: '2025' },
  { name: 'Agile with Atlassian Jira', issuer: 'Coursera', year: '2025' },
]

export const hlasmTopics = [
  { title: 'Base-Displacement vs Immediate', summary: 'Base-displacement points to data in storage (base register + displacement, computed at run time — the foundation of relocatable code). Immediate bakes the value into the instruction itself: fast, compact, no storage fetch (MVI, CLI, TM, LHI, AHI).' },
  { title: 'Advantages of Base-Displacement', summary: 'Relocatable code with no absolute addresses to fix, compact 4-bit register + 12-bit displacement encoding, and wide reach — one base register spans a 4 KB area (far more with long displacement). Underpins DSECT addressing and reentrant code.' },
  { title: 'Advantages of Immediate', summary: 'Fast (no extra storage fetch), compact (no separate constant to define), and self-documenting (intent sits right in the instruction). Ideal for flag bytes, bit masks, and small register adjustments.' },
  { title: 'Extended (Long) Displacement', summary: 'Extends the standard 12-bit unsigned displacement (4 KB reach) to a 20-bit signed field split into DL/DH bytes — about ±512 KB, roughly 1 MB from one base. Applies to the "Y" instructions (LY, STY, LAY, LMG, STMG) and supports negative displacements.' },
  { title: 'Magic Numbers', summary: 'Self-defined values and literals without equates are bad practice — they do not describe their purpose and are hard to change. Any value with semantic meaning (lengths, offsets, return codes, masks) should be a named EQU; only trivial values like 0 or 1 are acceptable raw.' },
  { title: 'The EQU Instruction', summary: 'An assembler directive assigning a value (and optionally length/type attributes) to a symbol — for register equates, named constants, field lengths, offsets, and bit masks. Referencing MAXRECS or FLGBUSY by name is self-documenting and changed in one place.' },
  { title: 'The USING Instruction', summary: 'Tells the assembler that a base register holds the address of a location, so symbolic references resolve to base-displacement form automatically. USING is a promise — the programmer must still load the register (BASR/LA/LR) with the matching address.' },
  { title: 'Domain & Range of a USING', summary: 'Domain is the span of source statements a USING covers (until DROP, override, or end of assembly). Range is the storage it can address — 4 KB with standard displacement, ~1 MB with long. With multiple active USINGs, the assembler picks the base giving a valid displacement, preferring the smallest.' },
  { title: 'Dependent & Labelled USING', summary: 'A dependent USING borrows addressability from an existing USING (mapping a DSECT onto already-addressable storage) without consuming a base register. A labelled USING (IN.FIELD / OUT.FIELD) qualifies references so one DSECT maps through several base registers unambiguously.' },
  { title: 'Relocatability', summary: 'A module runs correctly wherever it is loaded — references resolve relative to a base register, and address constants (A-cons, V-cons) are flagged for adjustment. The assembler builds RLD entries; the binder/loader fixes the address constants at the actual load address. A prerequisite for reentrant, reusable code.' },
  { title: 'Binder (Linkage Editor)', summary: 'Combines object modules from the assembler and compilers into one executable unit: resolves external references (via ESD/RLD), pulls in routines via autocall, assigns relative addresses, and records relocation info. Produces a program object in a PDSE (or a load module in a PDS for the older Linkage Editor).' },
  { title: 'Standard z/OS Linkage Conventions', summary: 'R1 points to the parameter list, R13 to the 18-fullword save area (chained via +4 back / +8 forward), R14 holds the return address (BR 14), and R15 the entry point on entry / return code on exit. Prologue: STM 14,12,12(13), set base, chain save areas; epilogue: restore and return.' },
  { title: 'Machine vs Assembler Language', summary: 'Machine language is the raw binary the processor executes; assembler is the human-readable symbolic layer (mnemonics, symbolic names, macros, directives). Instructions map essentially one-to-one, while macros and directives let the assembler generate code beyond a strict mapping.' },
  { title: 'Documentation & Practical Depth', summary: 'Self-documenting code first (meaningful labels, EQUs, DSECTs), comments explaining the why. Hands-on depth in debugging and diagnosis, plus HLASM built to z/OS conventions (AMODE 31 / RMODE ANY): control-block navigation (PSA→CVT→ASCB→TCB), SVC 99 dynamic allocation, ESTAE/SDWA recovery, SMF mapping, and macro/conditional assembly.' },
]

export const skills = {
  platforms: ['JES2', 'JCL', 'ISPF', 'z/OSMF', 'CA-7', 'OPC', 'Unix System Services'],
  codeLanguages: ['HLASM / Assembler', 'COBOL'],
  spokenLanguages: ['English (Fluent)', 'Portuguese (Fluent)'],
}

export const contact = {
  email: 'atrumcarv@gmail.com',
  phone: '+55 19 99636 0666',
  location: 'São Paulo, Brazil (04011060)',
  workAuth: [
    'European Union — Italian citizen, authorized to work across the EU without sponsorship.',
    'Brazil — citizen, authorized to work.',
  ],
}

export const footer = {
  tagline: 'Built in HEX spirit',
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/content.js
git commit -m "feat: add portfolio content data"
```

---

## Task 4: Shared IntersectionObserver hook

**Files:**
- Create: `src/hooks/useActiveSection.js`

- [ ] **Step 1: Write `src/hooks/useActiveSection.js`**

```js
import { useEffect, useState } from 'react'

/**
 * Observes elements with ids in `ids` and:
 *  - adds `is-visible` to any `.reveal` inside once it scrolls into view
 *  - reports the id of the section currently dominant in the viewport
 * Returns the active section id (string) for nav highlighting.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] || '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll('.reveal')
              .forEach((el) => el.classList.add('is-visible'))
          }
        })
      },
      { threshold: 0.15 },
    )

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => {
      revealer.observe(s)
      spy.observe(s)
    })

    return () => {
      revealer.disconnect()
      spy.disconnect()
    }
  }, [ids])

  return active
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useActiveSection.js
git commit -m "feat: add useActiveSection observer hook"
```

---

## Task 5: Nav component

**Files:**
- Create: `src/components/Nav.jsx`, `src/components/Nav.module.css`

- [ ] **Step 1: Write `src/components/Nav.jsx`**

```jsx
import { useState } from 'react'
import { nav, profile } from '../data/content.js'
import styles from './Nav.module.css'

export default function Nav({ active }) {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href="#hero" className={styles.brand} onClick={() => setOpen(false)}>
          {profile.name}
        </a>

        <button
          className={styles.toggle}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? styles.activeLink : ''}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Write `src/components/Nav.module.css`**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--nav-h);
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}

.bar { display: flex; align-items: center; justify-content: space-between; height: var(--nav-h); }

.brand {
  font-family: var(--font-head);
  font-size: 1.25rem;
  letter-spacing: 1px;
  color: var(--text);
  text-transform: uppercase;
}
.brand:hover { color: var(--interact); text-decoration: none; }

.links { display: flex; gap: var(--space-3); }
.links a {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 4px 0;
  border-bottom: 2px solid transparent;
}
.links a:hover { color: var(--interact); text-decoration: none; }
.activeLink { color: var(--text) !important; border-bottom-color: var(--accent) !important; }

.toggle { display: none; flex-direction: column; gap: 5px; background: none; border: 0; cursor: pointer; padding: 8px; }
.toggle span { width: 24px; height: 2px; background: var(--text); display: block; }

@media (max-width: 720px) {
  .toggle { display: flex; }
  .links {
    position: absolute;
    top: var(--nav-h);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  .linksOpen { max-height: 320px; }
  .links a { padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--border); }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.jsx src/components/Nav.module.css
git commit -m "feat: add sticky nav with mobile menu"
```

---

## Task 6: Hero component

**Files:**
- Create: `src/components/Hero.jsx`, `src/components/Hero.module.css`

- [ ] **Step 1: Write `src/components/Hero.jsx`**

```jsx
import { profile } from '../data/content.js'
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
        <a href="#profile" className={styles.cta}>Explore ↓</a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/components/Hero.module.css`**

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: url('/hero.jpg') center / cover no-repeat;
  background-color: var(--bg);
}
.overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.8) 60%, rgba(10,10,10,0.98) 100%);
}
.inner { position: relative; z-index: 1; }
.kicker { color: var(--interact); letter-spacing: 3px; text-transform: uppercase; font-size: 0.85rem; font-weight: 600; }
.name { font-size: clamp(3.5rem, 12vw, 8rem); margin: 0; }
.title { font-size: clamp(1.1rem, 3vw, 1.6rem); color: var(--text); margin: var(--space-2) 0 0; }
.tagline { color: var(--text-muted); max-width: 46ch; margin-top: var(--space-2); }
.cta {
  display: inline-block;
  margin-top: var(--space-4);
  padding: 12px 28px;
  border: 1px solid var(--accent);
  color: var(--text);
  font-weight: 600;
  border-radius: var(--radius);
}
.cta:hover { background: var(--accent); border-color: var(--accent); text-decoration: none; }
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.module.css
git commit -m "feat: add hero section"
```

---

## Task 7: Profile component

**Files:**
- Create: `src/components/Profile.jsx`, `src/components/Profile.module.css`

- [ ] **Step 1: Write `src/components/Profile.jsx`**

```jsx
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
              <span className={styles.value}>{s.value}</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/components/Profile.module.css`**

```css
.section { padding: var(--space-6) 0; }
.summary { max-width: 68ch; color: var(--text); font-size: 1.1rem; }
.stats { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-top: var(--space-4); }
.stat {
  flex: 1 1 200px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  padding: var(--space-3);
}
.value { display: block; font-family: var(--font-head); font-size: 1.6rem; }
.label { color: var(--text-muted); font-size: 0.9rem; }
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Profile.jsx src/components/Profile.module.css
git commit -m "feat: add profile section"
```

---

## Task 8: Experience & Education component

**Files:**
- Create: `src/components/Experience.jsx`, `src/components/Experience.module.css`

- [ ] **Step 1: Write `src/components/Experience.jsx`**

```jsx
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
```

- [ ] **Step 2: Write `src/components/Experience.module.css`**

```css
.section { padding: var(--space-6) 0; background: var(--bg); }
.timeline { display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4); }
.item { display: grid; grid-template-columns: 140px 1fr; gap: var(--space-3); }
.period { color: var(--accent-strong); font-weight: 600; font-size: 0.95rem; padding-top: 2px; }
.body { border-left: 1px solid var(--border); padding-left: var(--space-3); }
.role { font-size: 1.4rem; margin-bottom: 2px; }
.company { color: var(--text-muted); margin-bottom: var(--space-2); }
.bullets { margin: 0; padding-left: 1.1rem; color: var(--text); }
.bullets li { margin-bottom: var(--space-1); }

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: var(--space-5); }
.subhead { font-size: 1.2rem; color: var(--text); border-bottom: 2px solid var(--accent); display: inline-block; padding-bottom: 4px; }
.eduItem { margin-bottom: var(--space-3); }
.eduPeriod { display: block; color: var(--accent-strong); font-size: 0.9rem; }
.eduDetail { color: var(--text-muted); margin: 4px 0 0; }
.certs { list-style: none; padding: 0; margin: 0; }
.certs li { padding: var(--space-1) 0; border-bottom: 1px solid var(--border); color: var(--text); }

@media (max-width: 720px) {
  .item { grid-template-columns: 1fr; gap: var(--space-1); }
  .body { border-left: 0; padding-left: 0; }
  .grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.jsx src/components/Experience.module.css
git commit -m "feat: add experience and education section"
```

---

## Task 9: HLASM Knowledge component

**Files:**
- Create: `src/components/HLASM.jsx`, `src/components/HLASM.module.css`

- [ ] **Step 1: Write `src/components/HLASM.jsx`**

```jsx
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
```

- [ ] **Step 2: Write `src/components/HLASM.module.css`**

```css
.section { padding: var(--space-6) 0; background: var(--bg-elevated); }
.intro { max-width: 60ch; color: var(--text-muted); }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-4);
}
.card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: var(--radius);
  padding: var(--space-3);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.card:hover { transform: translateY(-4px); border-color: var(--interact); }
.cardTitle { font-size: 1.15rem; margin-bottom: var(--space-1); }
.cardBody { color: var(--text-muted); font-size: 0.95rem; margin: 0; }
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HLASM.jsx src/components/HLASM.module.css
git commit -m "feat: add HLASM knowledge section"
```

---

## Task 10: Skills component

**Files:**
- Create: `src/components/Skills.jsx`, `src/components/Skills.module.css`

- [ ] **Step 1: Write `src/components/Skills.jsx`**

```jsx
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
```

- [ ] **Step 2: Write `src/components/Skills.module.css`**

```css
.section { padding: var(--space-6) 0; }
.group { margin-top: var(--space-4); }
.groupTitle { font-size: 1.1rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
.chips { list-style: none; display: flex; flex-wrap: wrap; gap: var(--space-1); padding: 0; margin: var(--space-2) 0 0; }
.chip {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 8px 16px;
  font-weight: 500;
  font-size: 0.95rem;
}
.chip:hover { border-color: var(--accent); }
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.jsx src/components/Skills.module.css
git commit -m "feat: add skills section"
```

---

## Task 11: Contact and Footer components

**Files:**
- Create: `src/components/Contact.jsx`, `src/components/Contact.module.css`, `src/components/Footer.jsx`, `src/components/Footer.module.css`

- [ ] **Step 1: Write `src/components/Contact.jsx`**

```jsx
import { contact } from '../data/content.js'
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
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/components/Contact.module.css`**

```css
.section { padding: var(--space-6) 0; background: var(--bg-elevated); }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: var(--space-4); }
.details { list-style: none; padding: 0; margin: 0; }
.details li { margin-bottom: var(--space-3); }
.label { display: block; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem; }
.details a, .details span { font-size: 1.2rem; }
.authTitle { font-size: 1.1rem; border-bottom: 2px solid var(--accent); display: inline-block; padding-bottom: 4px; }
.auth ul { padding-left: 1.1rem; color: var(--text-muted); }
.auth li { margin-bottom: var(--space-1); }

@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Write `src/components/Footer.jsx`**

```jsx
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
```

- [ ] **Step 4: Write `src/components/Footer.module.css`**

```css
.footer { border-top: 1px solid var(--border); padding: var(--space-4) 0; }
.inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2); color: var(--text-muted); font-size: 0.9rem; }
.tag { font-family: var(--font-head); letter-spacing: 1px; color: var(--accent-strong); text-transform: uppercase; }
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.module.css src/components/Footer.jsx src/components/Footer.module.css
git commit -m "feat: add contact and footer sections"
```

---

## Task 12: Assemble App and wire the observer

**Files:**
- Modify: `src/App.jsx` (replace placeholder from Task 1)

- [ ] **Step 1: Replace `src/App.jsx` with the full composition**

```jsx
import { nav } from './data/content.js'
import { useActiveSection } from './hooks/useActiveSection.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Profile from './components/Profile.jsx'
import Experience from './components/Experience.jsx'
import HLASM from './components/HLASM.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const SECTION_IDS = ['hero', ...nav.map((n) => n.id)]

export default function App() {
  const active = useActiveSection(SECTION_IDS)
  return (
    <>
      <Nav active={active} />
      <main>
        <Hero />
        <Profile />
        <Experience />
        <HLASM />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run the dev server and visually verify**

Run: `npm run dev`
Expected: page loads with hero, all sections scroll smoothly, nav highlights the active section, cards reveal on scroll, mobile menu works when the window is narrow. Stop the server (Ctrl-C) when done.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: assemble full single-page app"
```

---

## Task 13: Smoke tests

**Files:**
- Create: `src/setupTests.js`, `src/components/__tests__/content.test.jsx`

- [ ] **Step 1: Write `src/setupTests.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 2: Write `src/components/__tests__/content.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../../App.jsx'

// jsdom lacks IntersectionObserver; provide a no-op so the hook doesn't throw.
beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('portfolio content', () => {
  it('renders the name in nav and hero', () => {
    render(<App />)
    expect(screen.getAllByText('ANDRE NEIL').length).toBeGreaterThan(0)
  })

  it('renders each section heading', () => {
    render(<App />)
    for (const h of ['Profile', 'Experience', 'HLASM Knowledge', 'Skills', 'Contact']) {
      expect(screen.getByRole('heading', { name: h })).toBeInTheDocument()
    }
  })

  it('renders all four employers', () => {
    render(<App />)
    expect(screen.getByText(/z\/OS JES Tech Support/)).toBeInTheDocument()
    expect(screen.getByText(/z\/OSMF Core Support/)).toBeInTheDocument()
    expect(screen.getByText(/Mainframe QA Tester Analyst/)).toBeInTheDocument()
    expect(screen.getByText(/Knowledge Transfer/)).toBeInTheDocument()
  })

  it('renders a mailto link with the resume email', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: 'atrumcarv@gmail.com' })
    expect(link).toHaveAttribute('href', 'mailto:atrumcarv@gmail.com')
  })

  it('renders key HLASM topic cards', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'The USING Instruction' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Relocatability' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run the tests**

Run: `npm test`
Expected: all tests PASS (5 passed).

- [ ] **Step 4: Commit**

```bash
git add src/setupTests.js src/components/__tests__/content.test.jsx
git commit -m "test: add content smoke tests"
```

---

## Task 14: Production build verification

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: `dist/` produced, no errors, no unresolved imports.

- [ ] **Step 2: Preview the build**

Run: `npm run preview` (open the printed URL, confirm it renders, then Ctrl-C)
Expected: production build renders identically to dev.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: verify production build" --allow-empty
```

---

## Self-Review Notes

- **Spec coverage:** Hero/Profile (Tasks 6–7), Experience/Education/Certs (Task 8), HLASM 14 topics (Task 9, matches spec §4.4 list), Skills groups (Task 10), Contact with email+phone+location+work-auth (Task 11), Footer "Built in HEX spirit" (Task 11), dark palette + magenta/cyan tokens (Task 2), Anton/Inter fonts (Tasks 1–2), smooth scroll + reveal + active nav (Tasks 4, 5, 12), responsive + reduced-motion (Tasks 2, 5, 8, 11). All spec sections mapped.
- **Placeholders:** none — every step contains complete code or an exact command.
- **Type/name consistency:** `useActiveSection(ids)` returns the active id string, consumed as `active` prop by `Nav` in Tasks 5 and 12; section ids in `nav` (Task 3) match component `id=`/`data-section` attributes and `SECTION_IDS` in Task 12; `profile`, `contact`, `footer`, `skills`, `experience`, `education`, `certifications`, `hlasmTopics` exports in Task 3 match all component imports.
```
