import { ArrowUpRight, PenLine } from 'lucide-react'
import articles from '../data/articles.json'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

const fmtDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export function Writing() {
  const items = articles.items.slice(0, 6)
  return (
    <Section id="writing">
      <SectionHeading
        index="06"
        title="Writing"
        jp="エッセイ"
        kicker="SIDE QUEST · MEDIUM"
        blurb="Essays on Medium: late-night thoughts, the in-between places, and what it is like to be a writer who ships code."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <Reveal key={a.link} delay={0.06 * i}>
            <a
              href={a.link}
              target="_blank"
              rel="noreferrer"
              className="halftone group flex h-full flex-col border-[3px] border-ink bg-paper p-5 text-ink shadow-[6px_6px_0_0_var(--color-pink)] transition hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--color-cyan)]"
            >
              <div className="flex items-center justify-between font-pixel text-[8px] text-ink/60">
                <span>{a.publication.toUpperCase()}</span>
                <span>{fmtDate(a.date)}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-black leading-snug">{a.title}</h3>
              <p className="mt-3 text-sm text-ink/75">{a.summary}</p>
              <span className="mt-auto flex items-center gap-1 pt-5 font-mono text-xl leading-none text-pink group-hover:text-ink">
                READ ON MEDIUM <ArrowUpRight size={14} />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <a
          href={articles.profile}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 border border-pink px-5 py-3 font-pixel text-[9px] text-pink transition hover:bg-pink hover:text-void hover:shadow-neon-pink"
        >
          <PenLine size={14} /> ALL {articles.items.length} STORIES ON MEDIUM
        </a>
      </Reveal>
    </Section>
  )
}
