import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-2 mb-2"
    >
      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs flex-shrink-0">
        🤖
      </div>
      <div className="bg-surface2 border border-[rgba(139,92,246,0.25)] border-l-2 border-l-accent px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-accent rounded-full block"
              style={{
                animation: `dotBounce 1.4s infinite ease-in-out both`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
