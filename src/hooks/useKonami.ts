import { useEffect, useState } from 'react'

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function useKonami(durationMs = 9000) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    let i = 0
    let timer = 0
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      i = k === CODE[i] ? i + 1 : k === CODE[0] ? 1 : 0
      if (i === CODE.length) {
        i = 0
        setActive(true)
        window.clearTimeout(timer)
        timer = window.setTimeout(() => setActive(false), durationMs)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
    }
  }, [durationMs])
  return active
}
