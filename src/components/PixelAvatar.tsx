import { useEffect, useState } from 'react'

const ROWS = [
  '......hhhh......',
  '....hhhhhhhh....',
  '...hhhhhhhhhh...',
  '..hhhHhhhhhhhh..',
  '.PhhhHhhhhhhhhP.',
  '.phhhssssssshhp.',
  '.phhssssssssshp.',
  '.phsssssssssshp.',
  '..hssewsssewssh.',
  '..hsseessseessh.',
  '..hsbsssssssbsh.',
  '...sssssmmsss...',
  '....ssssssss....',
  '...cccCssCccc...',
  '..cccccccccccc..',
  '.ccccccCCcccccc.',
]

const COLORS: Record<string, string> = {
  h: '#1b1038',
  H: '#ff2d95',
  s: '#ffd6b8',
  e: '#120c2a',
  w: '#ffffff',
  b: '#ff9ab8',
  m: '#d6336c',
  p: '#ff2d95',
  P: '#3a2a5a',
  c: '#00f0ff',
  C: '#0088aa',
}

export function PixelAvatar({ className }: { className?: string }) {
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    let closeTimer = 0
    const id = window.setInterval(() => {
      setBlink(true)
      closeTimer = window.setTimeout(() => setBlink(false), 140)
    }, 3600)
    return () => {
      clearInterval(id)
      clearTimeout(closeTimer)
    }
  }, [])

  const rows = blink ? ROWS.map((r, i) => (i === 8 ? r.replace(/[ew]/g, 's') : r)) : ROWS

  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges" role="img" aria-label="Pixel avatar">
      {rows.map((row, y) =>
        [...row].map((ch, x) =>
          ch === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COLORS[ch]} />,
        ),
      )}
    </svg>
  )
}
