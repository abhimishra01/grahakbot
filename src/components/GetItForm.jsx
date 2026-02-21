import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Phone } from 'lucide-react'

const businessTypes = [
  'Restaurant',
  'Salon',
  'Retail Shop',
  'CA / Accountant',
  'Coaching Centre',
  'Medical Clinic',
  'Other',
]

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'REPLACE_ID'

export default function GetItForm() {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    businessType: 'Restaurant',
    whatsapp: '',
    about: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          businessName: form.businessName,
          businessType: form.businessType,
          whatsapp: `+91${form.whatsapp}`,
          about: form.about,
        }),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="get-it" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-body px-3 py-1.5 rounded-full mb-4">
            Let's Get Started
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary mb-3">
            Want GrahakBot For Your Business?
          </h2>
          <p className="font-body text-text-muted text-base leading-relaxed">
            Fill this in. I'll reach out within 24 hours to set it up for you.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-surface border border-[rgba(139,92,246,0.2)] rounded-2xl p-6 sm:p-8"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <p className="font-heading font-bold text-xl text-text-primary mb-2">
                  🎉 Got it!
                </p>
                <p className="font-body text-text-muted text-sm leading-relaxed">
                  Expect a WhatsApp message from me within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs text-text-muted font-body mb-1.5">
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rajesh Kumar"
                  className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-4 py-3 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors placeholder:text-text-muted/50"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-xs text-text-muted font-body mb-1.5">
                  Business Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  required
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="Kumar Electronics"
                  className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-4 py-3 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors placeholder:text-text-muted/50"
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-xs text-text-muted font-body mb-1.5">
                  Business Type
                </label>
                <select
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-4 py-3 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors cursor-pointer"
                >
                  {businessTypes.map((t) => (
                    <option key={t} value={t} className="bg-surface2">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs text-text-muted font-body mb-1.5">
                  WhatsApp Number <span className="text-accent">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-3 py-3 text-sm text-text-muted font-body whitespace-nowrap">
                    <Phone className="w-3.5 h-3.5" />
                    +91
                  </div>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="flex-1 bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-4 py-3 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors placeholder:text-text-muted/50"
                  />
                </div>
              </div>

              {/* About */}
              <div>
                <label className="block text-xs text-text-muted font-body mb-1.5">
                  Tell me about your business
                </label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What do you sell? Any specific questions your customers usually ask? What hours are you open?"
                  className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-4 py-3 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors resize-none placeholder:text-text-muted/50"
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm font-body">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  Something went wrong. WhatsApp me directly at{' '}
                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    +91-XXXXXXXXXX
                  </a>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-body font-medium px-6 py-3.5 rounded-xl text-base transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Yes, I Want GrahakBot
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
