import type { MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { playerStats, profile } from '../data/profile'
import stats from '../data/stats.json'
import { PixelAvatar } from './PixelAvatar'

const BAR: Record<string, string> = {
  cyan: 'bg-cyan shadow-neon-cyan',
  pink: 'bg-pink shadow-neon-pink',
  amber: 'bg-amber',
  violet: 'bg-violet',
}

export function PlayerCard() {
  const reduced = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 14)
    rx.set(-py * 14)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="hud-card hud-corners relative mx-auto w-full max-w-sm select-none overflow-hidden p-5 sm:p-6"
      data-hover
    >
      <div className="holo pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="relative">
        <div className="flex items-center justify-between font-pixel text-[9px]">
          <span className="text-pink">PLAYER 01</span>
          <span className="flex items-center gap-2 text-mint">
            <span className="h-2 w-2 animate-pulse bg-mint" /> ONLINE
          </span>
        </div>

        <div className="mt-5 flex items-center gap-5">
          <div className="halftone relative grid h-28 w-28 shrink-0 place-items-center border-2 border-cyan bg-ink-2 p-2 shadow-neon-cyan">
            <PixelAvatar className="h-full w-full animate-float" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl font-black leading-tight text-paper">{profile.name.toUpperCase()}</p>
            <p className="mt-1 truncate font-mono text-lg text-muted">{profile.katakana}</p>
            <p className="mt-2 font-mono text-xl leading-tight text-cyan">
              LVL 2 <span className="text-muted">·</span> B.Tech CSE
            </p>
            <p className="font-mono text-lg leading-tight text-muted">
              CLASS <span className="text-pink">Full-Stack</span>
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-2.5">
          {playerStats.map((s, i) => (
            <li key={s.label} className="flex items-center gap-3 font-mono text-lg leading-none">
              <span className="w-20 text-muted">{s.label}</span>
              <div className="h-2 flex-1 bg-ink-2">
                <motion.div
                  className={`h-full ${BAR[s.tone]}`}
                  initial={reduced ? false : { width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="w-8 text-right text-paper">{s.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
          <Stat label="SOLVED" value={stats.leetcode.solved.all} />
          <Stat label="RATING" value={stats.leetcode.contestRating} />
          <Stat label="CONTESTS" value={stats.leetcode.contestsAttended} />
        </div>
        <p className="mt-4 text-center font-pixel text-[8px] text-muted">EXP · LEETCODE · {stats.updatedAt}</p>
      </div>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-display text-xl font-bold text-paper">{value.toLocaleString('en-IN')}</p>
      <p className="font-pixel text-[8px] text-muted">{label}</p>
    </div>
  )
}
