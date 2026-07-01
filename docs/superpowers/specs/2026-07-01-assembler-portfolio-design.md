# Assembler Portfolio Website — Design Spec

**Date:** 2026-07-01
**Author:** Andre Neil (with Claude Code)
**Status:** Approved design → ready for implementation planning

## 1. Purpose & Goal

A personal portfolio website for **Andre Neil**, a z/OS Specialist / Mainframe Systems
Specialist, built primarily to **land a job** — optimized for recruiters and hiring
managers. It presents his resume clearly and credibly, and uses a dedicated HLASM
knowledge section to prove the technical depth behind the resume.

**Audience:** recruiters and hiring managers (primary); fellow engineers (secondary).

**Success criteria:**
- Fast, scannable, zero-friction single-page experience.
- Clear contact path and work-authorization info.
- A technical section that visibly demonstrates HLASM/Assembler depth.
- Mobile-friendly and accessible.

## 2. Approach

**Single-page scroll site** (Approach A, approved). One long page with a sticky top nav
that smooth-scrolls to anchored sections. No client-side router. All resume content in
one flow; the HLASM content gets its own prominent section rather than a separate page
(can be split out later if it grows — YAGNI for now).

## 3. Tech Stack & Project Structure

- **Vite + React** (JavaScript, not TypeScript).
- **Plain CSS via CSS Modules** (one module per component) + a global stylesheet for
  design tokens (colors, fonts, spacing). No heavy UI/component library.
- **Smooth-scroll navigation** using native `scrollIntoView` and anchor IDs (no router).
- **Content separated from presentation:** all resume/HLASM text lives in
  `src/data/content.js` as structured arrays/objects, consumed by components.
- **Google Fonts** for typography.
- **IntersectionObserver** for scroll-reveal animations and active-nav highlighting.

```
public/
  hero.jpg
src/
  components/
    Nav.jsx / Nav.module.css
    Hero.jsx / Hero.module.css
    Profile.jsx / Profile.module.css
    Experience.jsx / Experience.module.css
    HLASM.jsx / HLASM.module.css
    Skills.jsx / Skills.module.css
    Contact.jsx / Contact.module.css
    Footer.jsx / Footer.module.css
  data/content.js
  styles/
    tokens.css
    global.css
  App.jsx
  main.jsx
index.html
```

## 4. Page Layout & Sections

Top-to-bottom scroll. Sticky nav bar: name/logo on the left, section links on the right,
active section highlighted.

1. **Hero** — full-viewport. `hero.jpg` as a dark-treated background. Large condensed
   "ANDRE NEIL", subtitle "z/OS Specialist · Mainframe Systems", a short tagline, and a
   scroll-down cue.
2. **Profile** — the 20-years summary paragraph from the resume, plus a few stat
   highlights (e.g. "20+ yrs z/OS", "IBM · Citigroup", "EU + BR work authorized").
3. **Experience & Education** — vertical timeline:
   - IBM — z/OS JES Tech Support (2024–present)
   - IBM — z/OSMF Core Support (2019–2024)
   - Citigroup (Brazil & Warsaw, PL) — Mainframe QA Tester Analyst (2010–2017)
   - Procwork (outsourced for IBM) — Batch Operator / Production Support (2004–2010)
   - Education: Universidade Presbiteriana Mackenzie (starting Jan 2026, ~2.5 yrs,
     expected mid-2028); UNIP (B.S. Information Systems, 2019–2020, not completed)
   - Certifications: IBM Mainframe Developer (IBM, 2025); Deep Teaching Solutions
     (Coursera, 2025); Agile with Atlassian Jira (2025)
4. **HLASM Knowledge** — responsive grid of cards, one per concept from the deck. Each
   card: title + concise summary. Topics:
   - Base-Displacement vs Immediate Addressing
   - Advantages of Base-Displacement Addressing
   - Advantages of Immediate Addressing
   - Extended (Long) Displacement Addressing
   - Magic Numbers (and the EQU fix)
   - The EQU Instruction
   - The USING Instruction (+ Domain/Range)
   - Dependent USING & Labelled USING
   - Relocatability
   - Binder (Linkage Editor)
   - Standard z/OS Linkage Conventions
   - Machine Language vs Assembler Language
   - Code Documentation & Practical Experience (control-block navigation, SVC 99,
     ESTAE/SDWA, SMF, macros)
5. **Skills** — grouped chips:
   - Platforms/Tools: JES2, JCL, ISPF, z/OSMF, CA-7, OPC, Unix System Services (USS)
   - Languages (code): HLASM / Assembler, COBOL
   - Spoken: English (fluent), Portuguese (fluent)
6. **Contact** — email (atrumcarv@gmail.com), phone (+55 19 99636 0666), location
   (SP/BR, 04011060), and work-authorization note (EU — Italian citizen; Brazil —
   citizen). All contact details public per user's choice.
7. **Footer** — name, current year, tagline **"Built in HEX spirit"**.

## 5. Visual Design (matches the HLASM presentation)

- **Palette:**
  - Background: near-black `#0a0a0a`
  - Primary text: off-white `#f5f5f5`
  - Secondary text: muted grey
  - **Primary accent (magenta `#c026d3`)** — darker, elegant: heading underlines, active
    nav, borders, card edges.
  - **Interaction accent (cyan `#22d3ee`)** — brighter "glow": link/hover states to signal
    clickability.
  - One accent role each; used sparingly.
- **Typography (Google Fonts):**
  - Headings: bold condensed sans (e.g. *Anton* or *Archivo Narrow*) — echoes the deck's
    big condensed titles.
  - Body: clean readable sans (e.g. *Inter*).
- **Accents/motifs:** subtle low-opacity wireframe/geometric flourishes (thin-line
  spheres/tori) echoing the deck, in the Hero and as section dividers — kept quiet so they
  never fight the text.
- **Motion:** gentle fade/slide-up as sections enter viewport (IntersectionObserver);
  smooth-scroll nav. Respect `prefers-reduced-motion`.
- **Responsive:** mobile-first. Nav collapses to a simple menu on small screens; timeline
  and card grid stack to one column.
- **Accessibility:** semantic sections/headings, sufficient contrast, keyboard-navigable,
  reduced-motion honored.

## 6. Data Model (`src/data/content.js`)

Exported structured content, e.g.:
- `profile` — name, title, tagline, summary, stat highlights.
- `experience[]` — `{ company, role, location, start, end, bullets[] }`.
- `education[]` — `{ institution, detail, period }`.
- `certifications[]` — `{ name, issuer, year }`.
- `hlasmTopics[]` — `{ title, summary }`.
- `skills` — `{ platforms[], codeLanguages[], spokenLanguages[] }`.
- `contact` — `{ email, phone, location, workAuth[] }`.

Components import from this file; no hard-coded copy inside components.

## 7. Out of Scope (YAGNI)

- Client-side router / multiple pages.
- CMS or backend; content is static in `content.js`.
- Contact form / server email sending (uses `mailto:` link only).
- Blog, dark/light theme toggle, i18n, analytics.
- Downloadable PDF resume generation (a static PDF link could be added later if desired).

## 8. Decisions Made

- Contact: show email + phone + location publicly. **Decided.**
- Accent: magenta primary + cyan interaction. **Decided.**
- Visual style: match the presentation (dark). **Decided.**
- Approach: single-page scroll (A). **Decided.**
- Footer tagline: "Built in HEX spirit". **Decided.**
- Font choices (Anton vs Archivo Narrow) to be finalized during implementation; both fit.
