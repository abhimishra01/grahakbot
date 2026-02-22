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
      initial={{ opacity: 0, x: isBot ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        alignSelf: isBot ? 'flex-start' : 'flex-end',
        maxWidth: '75%',
      }}
    >
      <div
        style={{
          background: isBot ? '#1f2c34' : '#005c4b',
          borderRadius: isBot ? '0px 8px 8px 8px' : '8px 0px 8px 8px',
          padding: '8px 12px',
          wordBreak: 'break-word',
        }}
      >
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            lineHeight: '1.5',
            color: '#e9edef',
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          {message}
        </p>

        {/* Timestamp + ticks */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '3px',
            marginTop: '3px',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '10px',
              color: 'rgba(233,237,239,0.5)',
            }}
          >
            {formatTime(timestamp)}
          </span>
          {!isBot && (
            <span style={{ fontSize: '11px', color: '#53bdeb', lineHeight: 1 }}>✓✓</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
