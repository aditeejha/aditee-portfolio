import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Cursor } from './components/Cursor'
import { MarqueeTape } from './components/MarqueeTape'
import { Navbar } from './components/Navbar'
import { Overlays } from './components/Overlays'
import { PowerUpToast } from './components/PowerUpToast'
import { Preloader } from './components/Preloader'
import { Sakura } from './components/Sakura'
import { SynthBackground } from './components/SynthBackground'
import { useKonami } from './hooks/useKonami'
import { About } from './sections/About'
import { Achievements } from './sections/Achievements'
import { Arena } from './sections/Arena'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Writing } from './sections/Writing'

export default function App() {
  const [booted, setBooted] = useState(false)
  const konami = useKonami()
  const onDone = useCallback(() => setBooted(true), [])

  return (
    <>
      <AnimatePresence>{!booted && <Preloader onDone={onDone} />}</AnimatePresence>
      <SynthBackground />
      <Sakura boost={konami} />
      <Overlays />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <MarqueeTape />
        <div className="bg-gradient-to-b from-transparent via-void/85 to-void">
          <About />
          <Skills />
          <Projects />
          <Arena />
          <Achievements />
          <Writing />
          <Contact />
        </div>
      </main>
      <Footer />
      <AnimatePresence>{konami && <PowerUpToast />}</AnimatePresence>
    </>
  )
}
