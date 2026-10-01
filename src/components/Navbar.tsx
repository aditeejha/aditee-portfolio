import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between px-4 py-2 transition-all sm:px-6 ${
          scrolled ? 'hud-card hud-corners mx-3 rounded-sm sm:mx-auto' : ''
        }`}
      >
        <a href="#home" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center bg-pink font-pixel text-[10px] text-void shadow-neon-pink transition group-hover:bg-cyan group-hover:shadow-neon-cyan">
            AJ
          </span>
          <span className="hidden font-mono text-2xl leading-none text-paper sm:block">
            aditee<span className="text-pink">.</span>jha
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`group relative px-3 py-2 font-mono text-xl leading-none transition ${
                active === n.id ? 'text-cyan' : 'text-muted hover:text-paper'
              }`}
            >
              <span className="mr-1 font-pixel text-[8px] text-pink/80">{String(i).padStart(2, '0')}</span>
              {n.label}
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-px bg-cyan transition-transform ${
                  active === n.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download
            className="hidden items-center gap-2 border border-pink px-3 py-2 font-pixel text-[9px] text-pink transition hover:bg-pink hover:text-void hover:shadow-neon-pink sm:flex"
          >
            <Download size={12} /> RESUME
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-line text-paper lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col bg-void/95 px-8 pt-28 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line py-4 font-display text-2xl font-bold tracking-wide text-paper"
              >
                <span className="font-pixel text-[10px] text-pink">{String(i).padStart(2, '0')}</span>
                {n.label}
                <span className="ml-auto font-mono text-lg text-muted">{n.jp}</span>
              </a>
            ))}
            <a
              href={profile.resume}
              download
              onClick={() => setOpen(false)}
              className="mt-8 flex items-center justify-center gap-2 bg-pink py-4 font-pixel text-[10px] text-void"
            >
              <Download size={14} /> DOWNLOAD RESUME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
