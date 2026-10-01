import { Reveal } from './Reveal'

type Props = { index: string; title: string; jp: string; kicker?: string; blurb?: string }

export function SectionHeading({ index, title, jp, kicker, blurb }: Props) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-pixel text-[10px] text-pink">
            {index} <span className="text-muted">//</span> {kicker ?? title.toUpperCase()}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-paper sm:text-5xl">{title}</h2>
        </div>
        <p className="hidden font-mono text-2xl text-muted/80 sm:block">{jp}</p>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className="h-px w-16 bg-pink shadow-neon-pink" />
        <span className="h-px flex-1 bg-line" />
        <span className="h-2 w-2 bg-cyan shadow-neon-cyan" />
      </div>
      {blurb && <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">{blurb}</p>}
    </Reveal>
  )
}
