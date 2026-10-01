import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Flame, Star } from 'lucide-react'
import stats from '../data/stats.json'
import { SocialIcon } from '../components/SocialIcon'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

const DIFF = [
  { key: 'easy', label: 'Easy', color: '#0891b2' },
  { key: 'medium', label: 'Medium', color: '#ff2d95' },
  { key: 'hard', label: 'Hard', color: '#c47a00' },
] as const

const fmt = (n: number) => n.toLocaleString('en-IN')

function Big({ value, label, tone = 'text-paper' }: { value: string; label: string; tone?: string }) {
  return (
    <div>
      <p className={`font-display text-3xl font-black leading-none sm:text-4xl ${tone}`}>{value}</p>
      <p className="mt-2 font-pixel text-[8px] text-muted">{label}</p>
    </div>
  )
}

export function Arena() {
  const reduced = useReducedMotion()
  const lc = stats.leetcode
  const cc = stats.codechef
  const gh = stats.github
  const total = lc.solved.all

  return (
    <Section id="arena">
      <SectionHeading
        index="04"
        title="Arena"
        jp="アリーナ"
        kicker="LEADERBOARD"
        blurb="Competitive programming is the daily training arc. 500+ problems across platforms, a LeetCode contest rating in the top 10%, and a streak that has not broken in 200 days."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <article className="hud-card hud-corners h-full p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center bg-amber/15 text-amber">
                  <SocialIcon kind="leetcode" size={20} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-paper">LeetCode</p>
                  <p className="font-mono text-lg leading-none text-muted">@{lc.username}</p>
                </div>
              </div>
              <a href={lc.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-pixel text-[9px] text-cyan hover:text-pink">
                OPEN <ArrowUpRight size={12} />
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Big value={fmt(total)} label="PROBLEMS SOLVED" tone="text-cyan" />
              <Big value={fmt(lc.contestRating)} label="CONTEST RATING" tone="text-pink" />
              <Big value={`${lc.topPercentage}%`} label="TOP PERCENTILE" />
              <Big value={fmt(lc.contestsAttended)} label="CONTESTS" />
            </div>

            <div className="mt-8">
              <p className="font-pixel text-[8px] text-muted">SOLVED BY DIFFICULTY</p>
              <ul className="mt-3 space-y-2.5">
                {DIFF.map((d, i) => {
                  const n = lc.solved[d.key]
                  const pct = (n / total) * 100
                  return (
                    <li key={d.key} className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3">
                      <span className="font-mono text-xl leading-none text-paper">{d.label}</span>
                      <div className="h-2.5 bg-ink-2" role="img" aria-label={`${d.label}: ${n} solved`}>
                        <motion.div
                          className="h-full rounded-r-[3px]"
                          style={{ background: d.color }}
                          initial={reduced ? false : { width: 0 }}
                          whileInView={{ width: `${Math.max(pct, 1.5)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <span className="text-right font-mono text-xl leading-none text-paper">{n}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-line pt-5">
              <span className="font-pixel text-[8px] text-muted">BADGES</span>
              {lc.badges.map((b) => (
                <span key={b} className="flex items-center gap-1.5 border border-amber/50 px-2.5 py-1 font-mono text-base leading-none text-amber">
                  <Flame size={12} /> {b}
                </span>
              ))}
              <span className="ml-auto font-mono text-base text-muted">global rank #{fmt(lc.globalRanking)}</span>
            </div>
          </article>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <Reveal delay={0.1}>
            <article className="hud-card h-full p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center bg-pink/15 text-pink">
                    <SocialIcon kind="codechef" size={20} />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-paper">CodeChef</p>
                    <p className="font-mono text-lg leading-none text-muted">@{cc.username}</p>
                  </div>
                </div>
                <a href={cc.url} target="_blank" rel="noreferrer" className="font-pixel text-[9px] text-cyan hover:text-pink">
                  OPEN
                </a>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Big value={fmt(cc.highestRating)} label="PEAK RATING" tone="text-pink" />
                <Big value={fmt(cc.rating)} label="CURRENT" />
              </div>
              <p className="mt-5 flex items-center gap-1 font-mono text-lg text-amber">
                {Array.from({ length: cc.highestStars }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="ml-2 text-muted">peak {cc.highestStars}★ · {cc.contests} rated contests</span>
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.2}>
            <article className="hud-card h-full p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center bg-cyan/15 text-cyan">
                  <SocialIcon kind="github" size={20} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-paper">GitHub</p>
                  <p className="font-mono text-lg leading-none text-muted">@{gh.username}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Big value={fmt(gh.publicRepos)} label="PUBLIC REPOS" tone="text-cyan" />
                <Big value="500+" label="DSA PROBLEMS · ALL PLATFORMS" />
              </div>
              <div className="mt-5 flex gap-4 font-pixel text-[9px]">
                <a href={gh.url} target="_blank" rel="noreferrer" className="text-cyan hover:text-pink">
                  GITHUB →
                </a>
                <a href="https://codolio.com/profile/aditeejha" target="_blank" rel="noreferrer" className="text-cyan hover:text-pink">
                  CODOLIO →
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </div>

      <p className="mt-6 font-mono text-lg text-muted">
        stats synced {stats.updatedAt} · refresh with <span className="text-cyan">npm run stats</span>
      </p>
    </Section>
  )
}
