import { motion } from 'framer-motion'

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export default function MessageBubble({ message, sender, timestamp }) {
  const isBot = sender === 'bot'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-end gap-2 mb-3 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {/* Bot avatar */}
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-xs flex-shrink-0 mb-5">
          🤖
        </div>
      )}

      <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} max-w-[80%]`}>
        {/* Bubble */}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
            isBot
              ? 'bg-surface2 border border-[rgba(139,92,246,0.25)] border-l-2 border-l-accent text-text-primary rounded-bl-sm'
              : 'bg-accent text-white rounded-br-sm'
          }`}
          style={{ wordBreak: 'break-word' }}
        >
          {message}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-text-muted mt-1 px-1">
          {formatTime(timestamp)}
        </span>
      </div>

      {/* User avatar */}
      {!isBot && (
        <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs text-white flex-shrink-0 mb-5">
          👤
        </div>
      )}
    </motion.div>
  )
}
