import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import BotCustomizer from './BotCustomizer'
import ChatWindow from './ChatWindow'
import { starterMessages, defaultServices, defaultNames } from '../data/starterMessages'

const defaultConfig = {
  businessName: 'Sharma Electronics',
  businessType: 'retail',
  services: defaultServices.retail,
  hours: '10am - 8pm',
  location: 'Lucknow, UP',
  tone: 'friendly',
}

function makeStarterMessage(businessType) {
  const text = starterMessages[businessType] || starterMessages.other
  return [
    {
      role: 'user',
      content: text,
      sender: 'user',
      timestamp: Date.now(),
    },
  ]
}

export default function DemoSection() {
  const [config, setConfig] = useState(defaultConfig)
  const [provider, setProvider] = useState('claude')
  const [messages, setMessages] = useState(makeStarterMessage(defaultConfig.businessType))

  const handleConfigChange = useCallback((newConfig) => {
    const typeChanged = newConfig.businessType !== config.businessType
    setConfig(newConfig)
    if (typeChanged) {
      setMessages(makeStarterMessage(newConfig.businessType))
    }
  }, [config.businessType])

  const handleReset = () => {
    setMessages(makeStarterMessage(config.businessType))
  }

  const handleProviderChange = (p) => {
    setProvider(p)
  }

  return (
    <section id="demo" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-body px-3 py-1.5 rounded-full mb-4">
            ⚡ Live AI Demo
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary mb-3">
            Try It Live
          </h2>
          <p className="font-body text-text-muted text-base max-w-xl mx-auto">
            Customize your business below and chat as a customer on the right.
            Powered by real AI.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* Left: Customizer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <BotCustomizer
              config={config}
              onChange={handleConfigChange}
              onReset={handleReset}
              provider={provider}
              onProviderChange={handleProviderChange}
            />
          </motion.div>

          {/* Right: Chat Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ChatWindow
              businessConfig={config}
              provider={provider}
              messages={messages}
              setMessages={setMessages}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
