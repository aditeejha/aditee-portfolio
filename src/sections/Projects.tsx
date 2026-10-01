import { ArrowUpRight, Code, ExternalLink, Gamepad2 } from 'lucide-react'
import { projects, sideQuests, type Project } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

const ACCENT = {
  pink: { text: 'text-pink', border: 'hover:border-pink/70', glow: 'hover:shadow-neon-pink', bg: 'from-pink/30' },
  cyan: { text: 'text-cyan', border: 'hover:border-cyan/70', glow: 'hover:shadow-neon-cyan', bg: 'from-cyan/30' },
  amber: { text: 'text-amber', border: 'hover:border-amber/70', glow: 'hover:shadow-[0_0_24px_rgba(255,183,3,0.3)]', bg: 'from-amber/30' },
  violet: { text: 'text-violet', border: 'hover:border-violet/70', glow: 'hover:shadow-[0_0_24px_rgba(157,78,221,0.35)]', bg: 'from-violet/40' },
} as const

function Links({ p }: { p: Project }) {
  if (!p.links.length) return <span className="font-mono text-lg text-muted">Private · hackathon build</span>
  return (
    <div className="flex flex-wrap gap-3">
      {p.links.map((l) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-2 border px-3 py-2 font-pixel text-[9px] transition ${
            l.kind === 'live'
              ? 'border-pink bg-pink text-void hover:bg-cyan hover:border-cyan'
              : 'border-line text-paper hover:border-cyan hover:text-cyan'
          }`}
        >
          {l.kind === 'live' ? <ExternalLink size={12} /> : <Code size={12} />}
          {l.label.toUpperCase()}
        </a>
      ))}
    </div>
  )
}

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="border border-line bg-ink-2/70 px-2 py-1 font-mono text-base leading-none text-muted">
          {t}
        </li>
      ))}
    </ul>
  )
}

function Featured({ p }: { p: Project }) {
  const a = ACCENT[p.accent]
  return (
    <article className={`hud-card hud-corners group grid overflow-hidden transition ${a.border} ${a.glow} lg:grid-cols-2`}>
      <a href={p.links[0]?.url} target="_blank" rel="noreferrer" className="relative block min-h-64 overflow-hidden bg-ink-2">
        {p.cover && (
          <img
            src={p.cover}
            alt={`${p.title} screenshot`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="holo pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" aria-hidden />
        <span className="absolute left-4 top-4 bg-pink px-2 py-1 font-pixel text-[8px] text-void">{p.badge}</span>
      </a>
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between font-pixel text-[9px]">
          <span className={a.text}>{p.kind.toUpperCase()}</span>
          <span className="text-muted">{p.year}</span>
        </div>
        <h3 className="mt-3 font-display text-3xl font-black text-paper">{p.title}</h3>
        <p className="mt-1 font-mono text-xl text-muted">{p.tagline}</p>
        <p className="mt-4 text-muted">{p.description}</p>
        <ul className="mt-4 space-y-2 text-sm text-paper/85">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${p.accent === 'cyan' ? 'bg-cyan' : 'bg-pink'}`} aria-hidden />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <Tech items={p.tech} />
        </div>
        <div className="mt-6">
          <Links p={p} />
        </div>
      </div>
    </article>
  )
}

function Card({ p, index }: { p: Project; index: number }) {
  const a = ACCENT[p.accent]
  return (
    <article className={`hud-card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 ${a.border} ${a.glow}`}>
      <div className={`halftone relative h-32 bg-gradient-to-br ${a.bg} via-ink-2 to-ink`}>
        <span className="absolute left-5 top-4 font-display text-6xl font-black text-paper/10">{String(index).padStart(2, '0')}</span>
        <span className={`absolute bottom-4 left-5 font-pixel text-[9px] ${a.text}`}>{p.kind.toUpperCase()}</span>
        {p.badge && <span className="absolute right-4 top-4 border border-amber px-2 py-1 font-pixel text-[8px] text-amber">{p.badge}</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-paper">{p.title}</h3>
          <span className="font-mono text-lg text-muted">{p.year}</span>
        </div>
        <p className="mt-1 font-mono text-lg leading-tight text-muted">{p.tagline}</p>
        <ul className="mt-4 space-y-2 text-sm text-paper/80">
          {p.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex gap-2">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${a.text.replace('text-', 'bg-')}`} aria-hidden />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Tech items={p.tech} />
        </div>
        <div className="mt-auto pt-6">
          <Links p={p} />
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        title="Projects"
        jp="プロジェクト"
        kicker="QUEST LOG"
        blurb="Full products, not toy demos. Each one has a real lifecycle, real auth, and a database that has been through a few migrations."
      />

      <div className="space-y-6">
        {featured.map((p) => (
          <Reveal key={p.slug}>
            <Featured p={p} />
          </Reveal>
        ))}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 * i}>
              <Card p={p} index={i + 2} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-14">
        <div className="flex items-center gap-3">
          <Gamepad2 size={16} className="text-amber" />
          <p className="font-pixel text-[9px] text-amber">SIDE QUESTS</p>
          <span className="h-px flex-1 bg-line" />
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {sideQuests.map((q) => (
            <li key={q.name}>
              <a
                href={q.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col border border-line bg-ink/60 p-4 transition hover:border-amber/70 hover:bg-ink"
              >
                <span className="flex items-center justify-between font-mono text-xl leading-none text-paper">
                  {q.name}
                  <ArrowUpRight size={14} className="text-muted transition group-hover:text-amber" />
                </span>
                <span className="mt-2 text-sm text-muted">{q.blurb}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
