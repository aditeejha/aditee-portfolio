import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-void">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <div className="text-center sm:text-left">
          <p className="font-mono text-xl leading-none text-paper">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="mt-2 font-mono text-lg leading-none text-muted">built with React · Tailwind · Framer Motion · too much chai</p>
        </div>
        <p className="font-mono text-2xl text-muted">
          ありがとう <span className="text-pink">·</span> thanks for scrolling
        </p>
        <a
          href="#home"
          className="flex items-center gap-2 border border-line px-3 py-2 font-pixel text-[8px] text-muted transition hover:border-cyan hover:text-cyan"
        >
          BACK TO TOP <ArrowUp size={12} />
        </a>
      </div>
      <p className="pb-6 text-center font-pixel text-[8px] text-muted/60">
        <span className="animate-blink">INSERT COIN TO CONTINUE</span> · try ↑↑↓↓←→←→BA
      </p>
    </footer>
  )
}
