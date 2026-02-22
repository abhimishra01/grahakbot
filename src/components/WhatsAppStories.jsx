import { motion } from 'framer-motion'

/* ─── Data ───────────────────────────────────────────────────────── */

const phones = [
  {
    business: "Sharma's Kitchen",
    avatarLetter: 'S',
    avatarBg: '#166534',
    label: 'Restaurant',
    labelEmoji: '🍽️',
    messages: [
      { from: 'customer', text: "Hi, do you have a table for 4\npeople tonight at 8pm? 🍽️", time: '7:42 PM' },
      { from: 'bot', text: "Hello! Yes, we have a table\navailable for 4 at 8 PM tonight.\nShall I reserve it in your name? 😊", time: '7:42 PM' },
      { from: 'customer', text: 'Yes please! Name: Rahul Sharma', time: '7:43 PM' },
      { from: 'bot', text: "Done! Table reserved for Rahul\nSharma, 4 people at 8 PM. We'll\nsee you tonight! 🎉", time: '7:43 PM' },
    ],
  },
  {
    business: 'Priya Beauty Studio',
    avatarLetter: 'P',
    avatarBg: '#4c1d95',
    label: 'Salon',
    labelEmoji: '💇‍♀️',
    messages: [
      { from: 'customer', text: "Hello, I want a haircut\ntomorrow. What slots are\nfree? 💇‍♀️", time: '11:15 PM' },
      { from: 'bot', text: "Hi! Tomorrow we have slots\nat 10 AM, 2 PM and 4 PM\navailable. Which works for you?", time: '11:15 PM' },
      { from: 'customer', text: '2 PM is perfect!', time: '11:16 PM' },
      { from: 'bot', text: "Booked! See you tomorrow at\n2 PM. Any specific style in\nmind? 😊✂️", time: '11:16 PM' },
    ],
  },
  {
    business: 'Kumar Electronics',
    avatarLetter: 'K',
    avatarBg: '#92400e',
    label: 'Retail Shop',
    labelEmoji: '📱',
    messages: [
      { from: 'customer', text: 'Bhai, iPhone 15 128GB\navailable hai? Aur price\nkya hai?', time: '2:07 AM' },
      { from: 'bot', text: 'Haan ji! iPhone 15 128GB\nhamare paas ₹79,999 mein\navailable hai. 📱', time: '2:07 AM' },
      { from: 'customer', text: 'COD milega?', time: '2:08 AM' },
      { from: 'bot', text: 'COD available hai! Kal\nsubah 10 baje se store\nopen hai. Aayenge? 😊', time: '2:08 AM' },
    ],
  },
]

/* ─── Sub-components ─────────────────────────────────────────────── */

function Bubble({ msg }) {
  const isBot = msg.from === 'bot'
  return (
    <div style={{ alignSelf: isBot ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
      <div
        style={{
          background: isBot ? '#005c4b' : '#1f2c34',
          borderRadius: isBot ? '8px 0px 8px 8px' : '0px 8px 8px 8px',
          padding: '8px 12px',
        }}
      >
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            lineHeight: '1.5',
            color: '#e9edef',
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          {msg.text}
        </p>
        <div
          style={{
            textAlign: 'right',
            fontSize: '10px',
            color: 'rgba(233,237,239,0.5)',
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          {msg.time}
          {isBot && (
            <span style={{ color: '#53bdeb', fontSize: '11px' }}>✓✓</span>
          )}
        </div>
      </div>
    </div>
  )
}

function PhoneCard({ phone, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 160, damping: 20 }}
      whileHover={{
        y: -8,
        boxShadow:
          '0 0 0 1px rgba(139,92,246,0.4), 0 24px 70px rgba(0,0,0,0.6), 0 0 60px rgba(139,92,246,0.15)',
      }}
      style={{
        width: '300px',
        maxWidth: '100%',
        height: '520px',
        background: '#1f1f1f',
        borderRadius: '32px',
        border: '6px solid #2a2a2a',
        boxShadow:
          '0 0 0 1px rgba(139,92,246,0.2), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.05)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s ease',
        flexShrink: 0,
      }}
    >
      {/* Notch */}
      <div
        style={{
          height: '8px',
          background: '#2a2a2a',
          width: '40%',
          borderRadius: '0 0 8px 8px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      />

      {/* Chat header */}
      <div
        style={{
          background: '#1f2c34',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>←</span>

        {/* Avatar */}
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: phone.avatarBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '700',
            fontSize: '14px',
            fontFamily: 'DM Sans, sans-serif',
            flexShrink: 0,
          }}
        >
          {phone.avatarLetter}
        </div>

        {/* Name + status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: '600',
              fontSize: '13px',
              color: '#ffffff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {phone.business}
          </div>
          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              color: '#00a884',
            }}
          >
            online
          </div>
        </div>

        {/* Icons */}
        <div
          style={{
            display: 'flex',
            gap: '18px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
          }}
        >
          <span>📹</span>
          <span>📞</span>
        </div>
      </div>

      {/* Chat area */}
      <div
        style={{
          background: '#0b141a',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          flex: 1,
          padding: '12px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          overflow: 'hidden',
        }}
      >
        {/* Date pill */}
        <div
          style={{
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '3px 10px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            alignSelf: 'center',
            marginBottom: '4px',
          }}
        >
          Today
        </div>

        {phone.messages.map((msg, i) => (
          <Bubble key={i} msg={msg} />
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────────────── */

export default function WhatsAppStories() {
  const scrollToDemo = () =>
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{ background: '#07040f', padding: '80px 20px' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8b5cf6',
            marginBottom: '16px',
          }}
        >
          // Real conversations. Every day.
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-5xl"
          style={{ color: '#ede9fe', marginBottom: '12px' }}
        >
          Your Customers Are Already Asking.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '18px',
            color: '#4c4470',
          }}
        >
          GrahakBot answers them. Instantly. 24/7.
        </motion.p>
      </div>

      {/* Phone mockups */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        {phones.map((phone, i) => (
          <div key={phone.business} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <PhoneCard phone={phone} delay={i * 0.15} />

            {/* Replied instantly pill */}
            <div
              style={{
                background: 'rgba(0,168,132,0.1)',
                border: '1px solid rgba(0,168,132,0.2)',
                borderRadius: '100px',
                padding: '3px 10px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                color: '#00a884',
              }}
            >
              ✓✓ Replied instantly
            </div>

            {/* Business type label */}
            <div
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                color: '#4c4470',
              }}
            >
              {phone.labelEmoji} {phone.label}
            </div>
          </div>
        ))}
      </div>

      {/* Closing row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          maxWidth: '900px',
          margin: '48px auto 0',
          background: '#111118',
          border: '1px solid rgba(139,92,246,0.15)',
          borderRadius: '12px',
          padding: '32px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: '700',
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              color: '#ede9fe',
              marginBottom: '4px',
            }}
          >
            Ready to never miss a customer again?
          </div>
          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: '#4c4470',
            }}
          >
            Set up your GrahakBot in 2 minutes.
          </div>
        </div>

        <button
          onClick={scrollToDemo}
          style={{
            background: 'linear-gradient(to right, #8b5cf6, #6366f1)',
            color: '#ffffff',
            padding: '14px 28px',
            borderRadius: '8px',
            border: 'none',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: '600',
            fontSize: '15px',
            boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = '0 6px 28px rgba(139,92,246,0.5)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = '0 4px 20px rgba(139,92,246,0.3)')
          }
        >
          Try Live Demo →
        </button>
      </motion.div>
    </section>
  )
}
