import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ alignSelf: 'flex-start' }}
    >
      <div
        style={{
          background: '#1f2c34',
          borderRadius: '0px 8px 8px 8px',
          padding: '12px 16px',
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(233,237,239,0.4)',
              animation: 'typingBounce 1.2s infinite ease-in-out',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
