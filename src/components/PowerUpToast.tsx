import { motion } from 'framer-motion'

export function PowerUpToast() {
  return (
    <motion.div
      className="fixed inset-x-0 bottom-8 z-[70] flex justify-center px-4"
      initial={{ y: 60, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      role="status"
    >
      <div className="pixel-border bg-amber px-5 py-3 font-pixel text-[10px] text-void shadow-[0_0_30px_rgba(255,183,3,0.6)]">
        ★ POWER UP! ULTRA SAKURA MODE ★
      </div>
    </motion.div>
  )
}
