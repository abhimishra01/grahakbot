import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import { sendMessage, resolveApiKey } from '../utils/aiClient'

export default function ChatWindow({ businessConfig, provider, messages, setMessages }) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const chatContainerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isTyping) return

    const { key: apiKey } = resolveApiKey(provider)
    if (!apiKey) {
      setError('Please enter and save your API key in the customizer panel.')
      return
    }

    setError(null)
    setInput('')

    const userMessage = { role: 'user', content: text, sender: 'user', timestamp: Date.now() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsTyping(true)

    try {
      const history = updatedMessages.map((m) => ({ role: m.role, content: m.content }))
      const reply = await sendMessage(history, { provider, apiKey, businessConfig })
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply, sender: 'bot', timestamp: Date.now() },
      ])
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const avatarLetter = (businessConfig.businessName || 'B').charAt(0).toUpperCase()
  const canSend = input.trim().length > 0 && !isTyping

  return (
    <div
      style={{
        width: '100%',
        height: '580px',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow:
          '0 0 0 1px rgba(139,92,246,0.15), 0 24px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: '#1f2c34',
          height: '60px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', cursor: 'pointer' }}>
          ←
        </span>

        {/* Avatar — first letter of businessName */}
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'Syne, sans-serif',
            fontWeight: '700',
            fontSize: '14px',
            flexShrink: 0,
            userSelect: 'none',
          }}
        >
          {avatarLetter}
        </div>

        {/* Name + status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: '600',
              fontSize: '14px',
              color: '#e9edef',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {businessConfig.businessName || 'Business Assistant'}
          </div>
          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#00a884',
            }}
          >
            ● online
          </div>
        </div>

        {/* Right icons */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '16px',
          }}
        >
          <span role="img" aria-label="video">📹</span>
          <span role="img" aria-label="call">📞</span>
          <span style={{ fontWeight: '900', letterSpacing: '1px', fontSize: '18px' }}>⋮</span>
        </div>
      </div>

      {/* ── Chat area ── */}
      <div
        ref={chatContainerRef}
        className="wa-chat-area"
        style={{
          background: '#0b141a',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '60px 60px',
          flex: 1,
          overflowY: 'auto',
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {/* Date pill */}
        <div
          style={{
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '3px 10px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            alignSelf: 'center',
            marginBottom: '4px',
          }}
        >
          Today
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              message={msg.content}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
      </div>

      {/* ── Error banner ── */}
      <AnimatePresence>
        {error && (
          <div
            style={{
              padding: '8px 16px',
              background: 'rgba(239,68,68,0.1)',
              borderTop: '1px solid rgba(239,68,68,0.2)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            <AlertCircle
              style={{ width: '14px', height: '14px', color: '#f87171', flexShrink: 0, marginTop: '2px' }}
            />
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: '#f87171',
                margin: 0,
              }}
            >
              {error}
            </p>
          </div>
        )}
      </AnimatePresence>

      {/* ── Input bar ── */}
      <div
        style={{
          background: '#1f2c34',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}
      >
        <span
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '20px', cursor: 'pointer', flexShrink: 0 }}
          role="img" aria-label="emoji"
        >
          😊
        </span>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isTyping}
          className="wa-input"
          style={{
            flex: 1,
            background: '#2a3942',
            border: 'none',
            borderRadius: '24px',
            padding: '10px 16px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            color: '#e9edef',
            outline: 'none',
            opacity: isTyping ? 0.5 : 1,
          }}
        />

        <span
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px', cursor: 'pointer', flexShrink: 0 }}
          role="img" aria-label="attach"
        >
          📎
        </span>

        <button
          onClick={handleSend}
          disabled={!canSend}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: canSend ? '#00a884' : 'rgba(0,168,132,0.35)',
            border: 'none',
            cursor: canSend ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '18px',
            flexShrink: 0,
            transition: 'background 0.2s ease, transform 0.1s ease',
          }}
          onMouseEnter={(e) => { if (canSend) e.currentTarget.style.background = '#008f72' }}
          onMouseLeave={(e) => { if (canSend) e.currentTarget.style.background = '#00a884' }}
          onMouseDown={(e) => { if (canSend) e.currentTarget.style.transform = 'scale(0.95)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          ➤
        </button>
      </div>
    </div>
  )
}
