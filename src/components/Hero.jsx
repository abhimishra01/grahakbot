import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

const stats = [
  { value: '63M+', label: 'Indian MSMEs' },
  { value: '24/7', label: 'Customer Replies' },
  { value: '2 min', label: 'Setup Time' },
]

// Animated dot grid background
function DotGrid() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(139,92,246,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Radial fade mask */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #07040f 100%)',
        }}
      />
    </div>
  )
}

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden">
      <DotGrid />

      {/* Glow blob */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-surface border border-[rgba(139,92,246,0.3)] text-accent text-xs font-body font-medium px-3 py-1.5 rounded-full mb-6"
        >
          <Zap className="w-3 h-3" />
          AI-powered WhatsApp assistant for Indian businesses
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary leading-tight mb-6"
        >
          Give Your Business an{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">
            AI Assistant.
          </span>
          <br />
          Instantly.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          GrahakBot answers your customers 24/7 — orders, appointments, FAQs.
          No tech skills needed.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollTo('demo')}
            className="group flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-body font-medium px-8 py-3.5 rounded-xl text-base transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] w-full sm:w-auto justify-center"
          >
            Try Live Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('get-it')}
            className="flex items-center gap-2 border border-[rgba(139,92,246,0.4)] text-text-primary hover:bg-surface font-body font-medium px-8 py-3.5 rounded-xl text-base transition-all w-full sm:w-auto justify-center"
          >
            Get It For My Business
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-accent">
                {stat.value}
              </div>
              <div className="font-body text-text-muted text-xs sm:text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-text-muted text-xs font-body">Scroll to try</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent" />
      </motion.div>
    </section>
  )
}
