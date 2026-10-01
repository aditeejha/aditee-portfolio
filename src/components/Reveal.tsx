import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = { children: ReactNode; className?: string; delay?: number; y?: number }

export function Reveal({ children, className, delay = 0, y = 26 }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
