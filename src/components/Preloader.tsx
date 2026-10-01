import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  'AJ-OS v2.0 · booting',
  'mounting /projects ........ ok',
  'compiling neon shaders ... ok',
  'syncing leetcode stats ... ok',
  'summoning sakura ......... ok',
]

export function Preloader({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const timers = LINES.map((_, i) => window.setTimeout(() => setShown(i + 1), 160 + i * 190))
    const finish = window.setTimeout(onDone, 160 + LINES.length * 190 + 650)
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finish)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [onDone])

  const pct = Math.round((shown / LINES.length) * 100)

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-void"
      exit={{ opacity: 0, y: -40, transition: { duration: 0.45, ease: 'easeInOut' } }}
      role="status"
      aria-label="Loading"
    >
      <div className="w-[min(92vw,560px)] px-6">
        <div className="mb-6 flex items-center justify-between font-pixel text-[10px] text-pink">
          <span>INSERT COIN</span>
          <span className="text-cyan">{pct}%</span>
        </div>
        <ul className="min-h-[7.5rem] font-mono text-xl leading-snug text-cyan/90 sm:text-2xl">
          {LINES.slice(0, shown).map((l) => (
            <li key={l}>
              <span className="text-pink">&gt;</span> {l}
            </li>
          ))}
          <li>
            <span className="animate-blink">▌</span>
          </li>
        </ul>
        <div className="mt-5 h-3 w-full border border-line bg-ink">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan via-pink to-amber"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: 'linear', duration: 0.2 }}
          />
        </div>
        <p className="mt-6 text-center font-pixel text-[10px] text-muted">
          <span className="animate-blink">PRESS ANY KEY TO START</span>
        </p>
      </div>
    </motion.div>
  )
}
