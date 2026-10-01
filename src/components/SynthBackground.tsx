import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Star = { x: number; y: number; r: number; p: number }

export function SynthBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let t = 0
    let stars: Star[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = Array.from({ length: Math.floor((w * h) / 9000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.62,
        r: Math.random() * 1.4 + 0.3,
        p: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      const horizon = h * 0.66
      ctx.clearRect(0, 0, w, h)

      const sky = ctx.createLinearGradient(0, 0, 0, horizon)
      sky.addColorStop(0, '#06040f')
      sky.addColorStop(1, '#1b0b36')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, horizon)

      ctx.fillStyle = '#ece7ff'
      for (const s of stars) {
        ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.9 + s.p))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      const cx = w * 0.5
      const R = Math.min(w, h) * 0.21
      const cy = horizon - R * 0.08

      const glow = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 2.2)
      glow.addColorStop(0, 'rgba(255,45,149,0.28)')
      glow.addColorStop(1, 'rgba(255,45,149,0)')
      ctx.fillStyle = glow
      ctx.fillRect(cx - R * 2.2, cy - R * 2.2, R * 4.4, R * 4.4)

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()
      const sun = ctx.createLinearGradient(0, cy - R, 0, cy + R)
      sun.addColorStop(0, '#ffb703')
      sun.addColorStop(0.55, '#ff2d95')
      sun.addColorStop(1, '#9d4edd')
      ctx.fillStyle = sun
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2)
      ctx.fillStyle = '#0b0620'
      const step = R * 0.13
      const offset = (t * 14) % step
      for (let i = 0; i < 8; i++) {
        const y = cy + R * 0.02 + i * step + offset
        ctx.fillRect(cx - R, y, R * 2, 1.5 + i * 1.4)
      }
      ctx.restore()

      const ground = ctx.createLinearGradient(0, horizon, 0, h)
      ground.addColorStop(0, '#1b0b36')
      ground.addColorStop(1, '#06040f')
      ctx.fillStyle = ground
      ctx.fillRect(0, horizon, w, h - horizon)

      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(0,240,255,0.32)'
      const n = 16
      for (let i = -n; i <= n; i++) {
        const xb = cx + (i / n) * w * 1.7
        ctx.beginPath()
        ctx.moveTo(cx, horizon)
        ctx.lineTo(xb, h)
        ctx.stroke()
      }
      const rows = 14
      const phase = (t * 0.55) % 1
      for (let i = 0; i < rows; i++) {
        const f = (i + phase) / rows
        const y = horizon + Math.pow(f, 2.3) * (h - horizon)
        ctx.globalAlpha = 0.12 + f * 0.7
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.strokeStyle = 'rgba(255,45,149,0.85)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, horizon)
      ctx.lineTo(w, horizon)
      ctx.stroke()
    }

    const loop = () => {
      t += 1 / 60
      draw()
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduced) draw()
    else raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return <canvas ref={ref} aria-hidden className="fixed inset-0 -z-10" />
}
