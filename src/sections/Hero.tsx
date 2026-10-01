import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { PlayerCard } from '../components/PlayerCard'
import { SocialIcon } from '../components/SocialIcon'
import { Typewriter } from '../components/Typewriter'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-28 pb-20 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            className="font-mono text-xl text-cyan sm:text-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            &gt; PLAYER 01 · BIT MESRA · CLASS OF 2028<span className="animate-blink">_</span>
          </motion.p>

          <motion.h1
            className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <span className="glitch text-paper" data-text="ADITEE">
              ADITEE
            </span>
            <br />
            <span className="text-gradient">JHA</span>
          </motion.h1>

          <motion.p
            className="mt-3 font-mono text-2xl text-muted sm:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {profile.katakana}
          </motion.p>

          <motion.div
            className="mt-6 h-9 font-display text-xl font-bold text-pink sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typewriter words={profile.roles} />
          </motion.div>

          <motion.p
            className="mt-6 max-w-xl text-base text-muted [text-shadow:0_2px_14px_rgba(6,4,15,0.95)] sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
          >
            <a
              href="#projects"
              className="flex items-center gap-2 bg-pink px-5 py-3.5 font-pixel text-[10px] text-void shadow-neon-pink transition hover:-translate-y-0.5 hover:bg-cyan hover:shadow-neon-cyan"
            >
              VIEW PROJECTS <ArrowUpRight size={14} />
            </a>
            <a
              href={profile.resume}
              download
              className="flex items-center gap-2 border border-cyan px-5 py-3.5 font-pixel text-[10px] text-cyan transition hover:-translate-y-0.5 hover:bg-cyan/10 hover:shadow-neon-cyan"
            >
              <Download size={14} /> RESUME
            </a>
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            aria-label="Social links"
          >
            {profile.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  className="grid h-10 w-10 place-items-center border border-line text-muted transition hover:border-pink hover:text-pink hover:shadow-neon-pink"
                >
                  <SocialIcon kind={s.icon} />
                  <span className="sr-only">{s.name}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
        >
          <PlayerCard />
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-pixel text-[8px] text-muted transition hover:text-cyan sm:flex"
      >
        SCROLL
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
