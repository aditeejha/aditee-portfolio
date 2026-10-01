import { Award, Flame, Mic, Swords, Trophy } from 'lucide-react'
import { achievements, certifications } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

const ICONS = { trophy: Trophy, mic: Mic, swords: Swords, flame: Flame } as const

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading index="05" title="Trophies" jp="トロフィー" kicker="ACHIEVEMENTS UNLOCKED" />

      <div className="grid gap-5 md:grid-cols-2">
        {achievements.map((a, i) => {
          const Icon = ICONS[a.icon as keyof typeof ICONS] ?? Trophy
          return (
            <Reveal key={a.title} delay={0.07 * i}>
              <article className="hud-card group flex h-full gap-5 p-6 transition hover:-translate-y-1 hover:border-amber/70">
                <div className="pixel-border grid h-14 w-14 shrink-0 place-items-center bg-ink-2 text-amber">
                  <Icon size={24} />
                </div>
                <div className="min-w-0">
                  <p className="font-pixel text-[8px] text-amber">ACHIEVEMENT UNLOCKED · {a.year}</p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-paper">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted">{a.detail}</p>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mt-12">
        <div className="flex items-center gap-3">
          <Award size={16} className="text-cyan" />
          <p className="font-pixel text-[9px] text-cyan">CERTIFICATIONS</p>
          <span className="h-px flex-1 bg-line" />
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {certifications.map((c) => (
            <li key={c.title} className="border border-line bg-ink/60 p-4">
              <p className="font-display text-sm font-bold text-paper">{c.title}</p>
              <p className="mt-1 font-mono text-lg leading-none text-muted">{c.issuer}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
