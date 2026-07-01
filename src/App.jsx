import { nav } from './data/content.js'
import { useActiveSection } from './hooks/useActiveSection.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Profile from './components/Profile.jsx'
import Experience from './components/Experience.jsx'
import HLASM from './components/HLASM.jsx'
import Skills from './components/Skills.jsx'
import Reading from './components/Reading.jsx'
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
        <Reading />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
