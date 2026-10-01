import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-cursor')
    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let raf = 0
    const move = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null
      ring.current?.classList.toggle('is-hover', !!el?.closest('a, button, [data-hover]'))
    }
    const loop = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.body.classList.remove('has-cursor')
    }
  }, [reduced])

  if (reduced) return null
  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  )
}
