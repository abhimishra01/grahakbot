import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Send, AlertCircle } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import { sendMessage, resolveApiKey } from '../utils/aiClient'

export default function ChatWindow({ businessConfig, provider, messages, setMessages }) {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      // Build history for AI (only role + content, no extra fields)
      const history = updatedMessages.map((m) => ({ role: m.role, content: m.content }))

      const reply = await sendMessage(history, {
        provider,
        apiKey,
        businessConfig,
      })

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          sender: 'bot',
          timestamp: Date.now(),
        },
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

  return (
    <div className="flex flex-col bg-surface border border-[rgba(139,92,246,0.15)] rounded-2xl overflow-hidden h-[580px]">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface2 border-b border-[rgba(139,92,246,0.15)]">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-base">
          🤖
        </div>
        <div>
          <div className="text-sm font-body font-medium text-text-primary">
            {businessConfig.businessName || 'Business Assistant'}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-text-muted font-body">Online</span>
          </div>
        </div>

        {/* WhatsApp-style dots */}
        <div className="ml-auto flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-text-muted/50" />
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-1"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(139,92,246,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center gap-2 opacity-50">
            <div className="text-3xl">💬</div>
            <p className="text-text-muted text-sm font-body">
              Configure the bot and start chatting below
            </p>
          </div>
        )}

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

        <div ref={bottomRef} />
      </div>

      {/* Error banner */}
      <AnimatePresence>
        {error && (
          <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-400 font-body">{error}</p>
          </div>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <div className="px-3 py-3 border-t border-[rgba(139,92,246,0.15)] bg-surface2 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isTyping}
          className="flex-1 bg-surface border border-[rgba(139,92,246,0.2)] rounded-full px-4 py-2.5 text-sm text-text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 rounded-full bg-accent hover:bg-accent/90 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  )
}
