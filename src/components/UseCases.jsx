import { motion } from 'framer-motion'
import { useCases } from '../data/useCases'

function MiniChat({ q, a }) {
  return (
    <div className="mt-3 space-y-1.5">
      {/* User message */}
      <div className="flex justify-end">
        <div className="bg-accent/80 text-white text-[11px] font-body px-3 py-1.5 rounded-2xl rounded-br-sm max-w-[85%] leading-snug">
          {q}
        </div>
      </div>
      {/* Bot reply */}
      <div className="flex justify-start">
        <div className="bg-surface border border-[rgba(139,92,246,0.2)] border-l-2 border-l-accent text-text-primary text-[11px] font-body px-3 py-1.5 rounded-2xl rounded-bl-sm max-w-[85%] leading-snug">
          {a}
        </div>
      </div>
    </div>
  )
}

export default function UseCases() {
  return (
    <section id="use-cases" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-body px-3 py-1.5 rounded-full mb-4">
            6 Business Types
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary mb-3">
            Works For Every Business
          </h2>
          <p className="font-body text-text-muted text-base max-w-lg mx-auto">
            From restaurants to CA firms — GrahakBot adapts to your business and speaks your language.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="bg-surface border border-[rgba(139,92,246,0.15)] hover:border-accent/40 rounded-2xl p-5 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.08)] group"
            >
              <div className="text-3xl mb-3">{uc.icon}</div>
              <h3 className="font-heading font-bold text-text-primary text-base mb-1">
                {uc.title}
              </h3>
              <p className="font-body text-text-muted text-xs leading-relaxed mb-2">
                {uc.description}
              </p>
              <MiniChat q={uc.exampleQ} a={uc.exampleA} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
