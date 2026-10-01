import { GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

export function About() {
  return (
    <Section id="about">
      <SectionHeading index="01" title="About" jp="アバウト" kicker="CHARACTER PROFILE" />

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Reveal>
            <div className="speech-bubble halftone border-[3px] border-ink bg-paper p-6 text-ink shadow-[8px_8px_0_0_var(--color-pink)]">
              <p className="font-display text-xl font-black leading-snug sm:text-2xl">
                “A writer, a techie, and everything in between.”
              </p>
              <p className="mt-2 font-mono text-lg text-ink/60">— the one-line version</p>
            </div>
          </Reveal>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-8">
            <p className="font-pixel text-[9px] text-cyan">COURSEWORK</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.education.coursework.map((c) => (
                <li key={c} className="border border-line bg-ink/70 px-3 py-1.5 font-mono text-lg leading-none text-paper">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Reveal delay={0.1}>
            <div className="hud-card hud-corners p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center bg-cyan/15 text-cyan">
                  <GraduationCap size={20} />
                </span>
                <p className="font-pixel text-[9px] text-cyan">EDUCATION</p>
              </div>
              <p className="mt-4 font-display text-lg font-bold text-paper">{profile.education.school}</p>
              <p className="mt-1 text-muted">{profile.education.degree}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-xl leading-none">
                <div>
                  <dt className="text-[9px] font-pixel text-muted">YEARS</dt>
                  <dd className="mt-1 text-paper">{profile.education.years}</dd>
                </div>
                <div>
                  <dt className="text-[9px] font-pixel text-muted">CGPA</dt>
                  <dd className="mt-1 text-pink">{profile.education.cgpa}</dd>
                </div>
              </dl>
              <p className="mt-4 flex items-center gap-2 font-mono text-lg text-muted">
                <MapPin size={14} /> {profile.education.location}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="hud-card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center bg-pink/15 text-pink">
                  <Sparkles size={20} />
                </span>
                <p className="font-pixel text-[9px] text-pink">STATUS SCREEN</p>
              </div>
              <dl className="mt-4 divide-y divide-line">
                {profile.quickFacts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="font-pixel text-[8px] text-muted">{f.label}</dt>
                    <dd className="text-right font-mono text-xl leading-none text-paper">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
