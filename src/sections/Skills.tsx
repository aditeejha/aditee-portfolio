import { skillGroups } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

const LOADOUT = ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'React', 'TypeScript']

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        title="Skills"
        jp="スキル"
        kicker="INVENTORY"
        blurb="Everything equipped and everything in the bag. Primary loadout is a Node + Postgres backend with a React front."
      />

      <Reveal className="mb-8">
        <div className="hud-card flex flex-wrap items-center gap-3 border-pink/60 px-5 py-4">
          <span className="font-pixel text-[9px] text-pink">EQUIPPED</span>
          {LOADOUT.map((s) => (
            <span key={s} className="bg-pink px-3 py-1 font-mono text-lg leading-none text-void">
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.title} delay={0.06 * gi}>
            <div className="hud-card hud-corners group h-full p-6 transition hover:-translate-y-1 hover:border-cyan/60 hover:shadow-neon-cyan">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-paper">{g.title}</h3>
                <span className="shrink-0 whitespace-nowrap font-mono text-lg text-muted/80">{g.jp}</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 border border-line bg-ink-2/70 px-3 py-1.5 font-mono text-lg leading-none text-paper transition group-hover:border-line/80"
                  >
                    <span className="h-1.5 w-1.5 bg-cyan" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
