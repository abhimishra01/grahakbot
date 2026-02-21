import { motion } from 'framer-motion'
import { Settings2, Rocket, MessageCircleHeart } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Settings2,
    title: 'Configure',
    description:
      'Tell us your business name, services, working hours, and preferred tone. Takes under 2 minutes.',
  },
  {
    number: '02',
    icon: Rocket,
    title: 'Deploy',
    description:
      'We set up your AI assistant on WhatsApp Business in under 2 hours. Zero tech skills needed from your side.',
  },
  {
    number: '03',
    icon: MessageCircleHeart,
    title: 'Respond',
    description:
      'Your customers get instant replies 24/7. You focus on running your business while GrahakBot handles the rest.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-body px-3 py-1.5 rounded-full mb-4">
            Simple Setup
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary mb-3">
            How It Works
          </h2>
          <p className="font-body text-text-muted text-base max-w-lg mx-auto">
            From idea to live AI assistant — in 3 simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden sm:block absolute top-12 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number + Icon */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-surface2 border border-[rgba(139,92,246,0.2)] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-[10px] font-heading font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
