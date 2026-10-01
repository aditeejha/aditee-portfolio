import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Petal = { x: number; y: number; s: number; vx: number; vy: number; rot: number; vr: number; a: number; hue: string }

const HUES = ['#ffb7d5', '#ff8fc0', '#ffd1e4', '#ff2d95']

export function Sakura({ boost = false }: { boost?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || reduced) return

    let raf = 0
    let w = 0
    let h = 0
    let petals: Petal[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const spawn = (fromTop: boolean): Petal => ({
      x: Math.random() * w,
      y: fromTop ? -20 : Math.random() * h,
      s: 5 + Math.random() * 7,
      vx: 0.25 + Math.random() * 0.6,
      vy: 0.6 + Math.random() * 1.1,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.04,
      a: 0.45 + Math.random() * 0.4,
      hue: HUES[Math.floor(Math.random() * HUES.length)],
    })

    const target = () => Math.floor((w / 1400) * (boost ? 110 : 22))

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      petals = Array.from({ length: target() }, () => spawn(false))
    }

    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      const want = target()
      while (petals.length < want) petals.push(spawn(true))
      if (petals.length > want) petals.length = want
      for (const p of petals) {
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.4
        p.y += p.vy
        p.rot += p.vr
        if (p.y > h + 20 || p.x > w + 20) Object.assign(p, spawn(true))
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.a
        ctx.fillStyle = p.hue
        ctx.beginPath()
        ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced, boost])

  if (reduced) return null
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[55]" />
}
