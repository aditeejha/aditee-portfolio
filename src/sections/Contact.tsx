import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin, Send } from 'lucide-react'
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

// Phones hand mailto links to the mail app; desktop browsers often have none set up, so open Gmail there.
const onPhone = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

function composeLink(subject = '', body = '') {
  if (onPhone()) return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: profile.email, su: subject, body })
  return `https://mail.google.com/mail/?${params}`
}

const field =
  'w-full border border-line bg-ink/80 px-4 py-3 font-mono text-xl leading-none text-paper placeholder:text-muted/60 focus:border-cyan focus:outline-none'

export function Contact() {
  const time = useLocalTime(profile.timezone)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [opened, setOpened] = useState(false)
  const [copied, setCopied] = useState(false)

  const subject = `[Portfolio] ${name || 'Hello'}`
  const body = `${message}\n\n— ${name}${email ? ` (${email})` : ''}`

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const link = composeLink(subject, body)
    if (link.startsWith('mailto:')) window.location.href = link
    else window.open(link, '_blank', 'noopener')
    setOpened(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
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
              <Send size={14} /> SEND VIA GMAIL
            </button>
            {opened ? (
              <p className="font-mono text-base text-mint" role="status">
                Your message is ready in a new tab: press Send there. No Gmail?{' '}
                <a className="text-cyan underline" href={`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>
                  Use your mail app
                </a>{' '}
                or write to {profile.email}.
              </p>
            ) : (
              <p className="font-mono text-base text-muted">Opens Gmail (or your mail app on a phone) with the message pre-filled. No servers, no tracking.</p>
            )}
          </form>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="hud-card flex items-center gap-4 p-6 transition hover:border-pink/70 hover:shadow-neon-pink">
              <a href={composeLink()} target="_blank" rel="noreferrer" className="flex min-w-0 flex-1 items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center bg-pink/15 text-pink">
                  <Mail size={22} />
                </span>
                <div className="min-w-0">
                  <p className="font-pixel text-[8px] text-muted">EMAIL</p>
                  <p className="truncate font-mono text-2xl leading-tight text-paper">{profile.email}</p>
                </div>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                title={copied ? 'Copied' : 'Copy email address'}
                className="shrink-0 p-2 text-muted transition hover:text-cyan"
              >
                {copied ? <Check size={18} className="text-mint" /> : <Copy size={18} />}
              </button>
            </div>
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
