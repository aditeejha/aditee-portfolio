import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, Send } from 'lucide-react'
import { profile } from '../data/profile'
import { SocialIcon } from '../components/SocialIcon'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

function useLocalTime(tz: string) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-IN', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    const tick = () => setTime(f.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [tz])
  return time
}

const field =
  'w-full border border-line bg-ink/80 px-4 py-3 font-mono text-xl leading-none text-paper placeholder:text-muted/60 focus:border-cyan focus:outline-none'

export function Contact() {
  const time = useLocalTime(profile.timezone)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[Portfolio] ${name || 'Hello'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact">
      <SectionHeading
        index="07"
        title="Contact"
        jp="コンタクト"
        kicker="SEND A TRANSMISSION"
        blurb="Internships, collaborations, hackathon teams, or a long-form essay idea. The inbox is open."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <form onSubmit={submit} className="hud-card hud-corners space-y-4 p-6 sm:p-8">
            <p className="font-pixel text-[9px] text-cyan">NEW MESSAGE</p>
            <label className="block">
              <span className="font-pixel text-[8px] text-muted">NAME</span>
              <input className={`mt-2 ${field}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </label>
            <label className="block">
              <span className="font-pixel text-[8px] text-muted">EMAIL</span>
              <input
                className={`mt-2 ${field}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="block">
              <span className="font-pixel text-[8px] text-muted">MESSAGE</span>
              <textarea
                className={`mt-2 min-h-36 resize-y ${field}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are we building?"
                required
                minLength={10}
              />
            </label>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-pink py-3.5 font-pixel text-[10px] text-void transition hover:bg-cyan hover:shadow-neon-cyan"
            >
              <Send size={14} /> SEND VIA EMAIL
            </button>
            <p className="font-mono text-base text-muted">Opens your mail app with the message pre-filled. No servers, no tracking.</p>
          </form>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <a
              href={`mailto:${profile.email}`}
              className="hud-card flex items-center gap-4 p-6 transition hover:border-pink/70 hover:shadow-neon-pink"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center bg-pink/15 text-pink">
                <Mail size={22} />
              </span>
              <div className="min-w-0">
                <p className="font-pixel text-[8px] text-muted">EMAIL</p>
                <p className="truncate font-mono text-2xl leading-tight text-paper">{profile.email}</p>
              </div>
              <ArrowUpRight size={18} className="ml-auto shrink-0 text-muted" />
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="hud-card flex items-center gap-3 p-5">
                <MapPin size={18} className="text-cyan" />
                <div>
                  <p className="font-pixel text-[8px] text-muted">BASE</p>
                  <p className="font-mono text-xl leading-tight text-paper">{profile.location}</p>
                </div>
              </div>
              <div className="hud-card flex items-center gap-3 p-5">
                <Clock size={18} className="text-amber" />
                <div>
                  <p className="font-pixel text-[8px] text-muted">LOCAL TIME · IST</p>
                  <p className="font-mono text-xl leading-tight text-paper tabular-nums">{time || '--:--:--'}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="hud-card divide-y divide-line">
              {profile.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 px-5 py-3.5 transition hover:bg-ink-2/70"
                  >
                    <SocialIcon kind={s.icon} className="text-muted transition group-hover:text-cyan" />
                    <span className="font-display text-sm font-bold text-paper">{s.name}</span>
                    <span className="ml-auto font-mono text-lg leading-none text-muted">{s.handle}</span>
                    <ArrowUpRight size={14} className="text-muted transition group-hover:text-pink" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
