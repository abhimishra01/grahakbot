import { useState, useEffect } from 'react'
import { RefreshCw, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { PROVIDERS, resolveApiKey, saveApiKey } from '../utils/aiClient'
import { defaultServices, defaultNames } from '../data/starterMessages'

const businessTypes = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'salon', label: 'Salon' },
  { value: 'retail', label: 'Retail Shop' },
  { value: 'ca', label: 'CA / Accountant' },
  { value: 'coaching', label: 'Coaching Centre' },
  { value: 'clinic', label: 'Medical Clinic' },
  { value: 'other', label: 'Other' },
]

const tones = ['friendly', 'professional', 'casual']

export default function BotCustomizer({ config, onChange, onReset, provider, onProviderChange }) {
  const [showKey, setShowKey] = useState(false)
  const [keyInput, setKeyInput] = useState('')
  const [keySaved, setKeySaved] = useState(false)
  const { key: resolvedKey, source: keySource } = resolveApiKey(provider)

  // When business type changes, auto-update name + services
  const handleTypeChange = (type) => {
    const newName = defaultNames[type] || config.businessName
    const newServices = defaultServices[type] || ['', '', '']
    onChange({ ...config, businessType: type, businessName: newName, services: newServices })
  }

  const handleServiceChange = (index, value) => {
    const updated = [...config.services]
    updated[index] = value
    onChange({ ...config, services: updated })
  }

  const handleSaveKey = () => {
    if (keyInput.trim()) {
      saveApiKey(provider, keyInput.trim())
      setKeySaved(true)
      setTimeout(() => setKeySaved(false), 2000)
      // Trigger a re-render so the key source updates
      onProviderChange(provider)
    }
  }

  // Reset saved state when provider changes
  useEffect(() => {
    setKeyInput('')
    setKeySaved(false)
  }, [provider])

  const showKeyInput = !resolvedKey

  return (
    <div className="bg-surface border border-[rgba(139,92,246,0.15)] rounded-2xl p-5 flex flex-col gap-4">
      <h3 className="font-heading font-bold text-text-primary text-base">
        Configure Your Bot
      </h3>

      {/* Business Name */}
      <div>
        <label className="block text-xs text-text-muted font-body mb-1.5">
          Business Name
        </label>
        <input
          type="text"
          value={config.businessName}
          onChange={(e) => onChange({ ...config, businessName: e.target.value })}
          className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-3 py-2 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors"
          placeholder="e.g. Sharma Electronics"
        />
      </div>

      {/* Business Type */}
      <div>
        <label className="block text-xs text-text-muted font-body mb-1.5">
          Business Type
        </label>
        <select
          value={config.businessType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-3 py-2 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors cursor-pointer"
        >
          {businessTypes.map((t) => (
            <option key={t.value} value={t.value} className="bg-surface2">
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Services */}
      <div>
        <label className="block text-xs text-text-muted font-body mb-1.5">
          Services / Products (up to 3)
        </label>
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              type="text"
              value={config.services[i] || ''}
              onChange={(e) => handleServiceChange(i, e.target.value)}
              placeholder={`Service ${i + 1}`}
              className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-3 py-2 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors"
            />
          ))}
        </div>
      </div>

      {/* Hours */}
      <div>
        <label className="block text-xs text-text-muted font-body mb-1.5">
          Working Hours
        </label>
        <input
          type="text"
          value={config.hours}
          onChange={(e) => onChange({ ...config, hours: e.target.value })}
          className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-3 py-2 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors"
          placeholder="e.g. 10am - 8pm"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs text-text-muted font-body mb-1.5">
          Location
        </label>
        <input
          type="text"
          value={config.location}
          onChange={(e) => onChange({ ...config, location: e.target.value })}
          className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-3 py-2 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors"
          placeholder="e.g. Lucknow, UP"
        />
      </div>

      {/* Tone */}
      <div>
        <label className="block text-xs text-text-muted font-body mb-1.5">
          Bot Tone
        </label>
        <div className="flex gap-2">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => onChange({ ...config, tone: t })}
              className={`flex-1 py-2 text-xs font-body rounded-lg border transition-all capitalize ${
                config.tone === t
                  ? 'bg-accent border-accent text-white'
                  : 'bg-surface2 border-[rgba(139,92,246,0.2)] text-text-muted hover:border-accent/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[rgba(139,92,246,0.1)]" />

      {/* Provider selector */}
      <div>
        <label className="block text-xs text-text-muted font-body mb-1.5">
          AI Provider
        </label>
        <div className="flex flex-col gap-2">
          {Object.entries(PROVIDERS).map(([key, p]) => {
            const { source } = resolveApiKey(key)
            return (
              <button
                key={key}
                onClick={() => onProviderChange(key)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-left transition-all ${
                  provider === key
                    ? 'border-accent bg-accent/10'
                    : 'border-[rgba(139,92,246,0.15)] bg-surface2 hover:border-accent/30'
                }`}
              >
                <span className="text-sm text-text-primary font-body">{p.label}</span>
                <div className="flex items-center gap-2">
                  {source === 'env' && (
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                      Dev Mode
                    </span>
                  )}
                  {source === 'localStorage' && (
                    <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                      Key Saved
                    </span>
                  )}
                  <span className="text-[10px] text-text-muted">{p.cost}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* API Key input (only if no key found) */}
      {showKeyInput && (
        <div>
          <label className="block text-xs text-text-muted font-body mb-1.5">
            {PROVIDERS[provider]?.label} API Key
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type={showKey ? 'text' : 'password'}
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveKey()}
                placeholder="Paste your API key..."
                className="w-full bg-surface2 border border-[rgba(139,92,246,0.2)] rounded-lg px-3 py-2 pr-9 text-sm text-text-primary font-body focus:outline-none focus:border-accent/60 transition-colors"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={handleSaveKey}
              className="bg-accent hover:bg-accent/90 text-white text-xs font-body font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              {keySaved ? <CheckCircle className="w-4 h-4" /> : 'Save'}
            </button>
          </div>
          <p className="text-[10px] text-text-muted mt-1">
            Key is stored in your browser only. Never sent to our servers.
          </p>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 border border-[rgba(139,92,246,0.2)] text-text-muted hover:text-text-primary hover:border-accent/40 text-sm font-body py-2.5 rounded-lg transition-all"
      >
        <RefreshCw className="w-4 h-4" />
        Reset Chat
      </button>
    </div>
  )
}
