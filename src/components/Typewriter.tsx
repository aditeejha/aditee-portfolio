import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export function Typewriter({ words, className }: { words: readonly string[]; className?: string }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) {
      setText(words[0])
      return
    }
    const full = words[index % words.length]
    const delay = deleting ? 38 : text.length === full.length ? 1700 : 68
    const id = window.setTimeout(() => {
      if (!deleting) {
        if (text.length < full.length) setText(full.slice(0, text.length + 1))
        else setDeleting(true)
      } else if (text.length > 0) {
        setText(full.slice(0, text.length - 1))
      } else {
        setDeleting(false)
        setIndex((n) => n + 1)
      }
    }, delay)
    return () => clearTimeout(id)
  }, [text, deleting, index, words, reduced])

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="animate-blink text-cyan">▌</span>
    </span>
  )
}
