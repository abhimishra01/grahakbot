import { buildSystemPrompt } from './systemPrompt.js'

export const PROVIDERS = {
  claude: {
    label: 'Claude (Anthropic)',
    model: 'claude-haiku-4-5-20251001',
    cost: '~$0.001 / message',
    envKey: 'VITE_ANTHROPIC_API_KEY',
  },
  openai: {
    label: 'OpenAI',
    model: 'gpt-4o-mini',
    cost: '~$0.0005 / message',
    envKey: 'VITE_OPENAI_API_KEY',
  },
  gemini: {
    label: 'Google Gemini',
    model: 'gemini-1.5-flash',
    cost: 'Free tier',
    envKey: 'VITE_GEMINI_API_KEY',
  },
}

/**
 * Resolve API key: env var → localStorage → null
 * @param {string} provider - 'claude' | 'openai' | 'gemini'
 * @returns {{ key: string|null, source: 'env'|'localStorage'|null }}
 */
export function resolveApiKey(provider) {
  const envKey = PROVIDERS[provider]?.envKey
  const envValue = envKey ? import.meta.env[envKey] : null
  if (envValue) return { key: envValue, source: 'env' }

  const lsKey = `grahakbot_${provider}_key`
  const lsValue = localStorage.getItem(lsKey)
  if (lsValue) return { key: lsValue, source: 'localStorage' }

  return { key: null, source: null }
}

/**
 * Save API key to localStorage
 * @param {string} provider
 * @param {string} key
 */
export function saveApiKey(provider, key) {
  localStorage.setItem(`grahakbot_${provider}_key`, key)
}

/**
 * Send a message to the selected AI provider.
 * @param {Array<{role: string, content: string}>} messages - conversation history
 * @param {{ provider: string, apiKey: string, businessConfig: Object }} config
 * @returns {Promise<string>} - AI reply text
 */
export async function sendMessage(messages, config) {
  const { provider = 'claude', apiKey, businessConfig = {} } = config
  const systemPrompt = buildSystemPrompt(businessConfig)

  if (!apiKey) {
    throw new Error('No API key provided. Please enter your API key.')
  }

  switch (provider) {
    case 'claude':
      return callClaude(messages, systemPrompt, apiKey)
    case 'openai':
      return callOpenAI(messages, systemPrompt, apiKey)
    case 'gemini':
      return callGemini(messages, systemPrompt, apiKey)
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }
}

async function callClaude(messages, systemPrompt, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: PROVIDERS.claude.model,
      max_tokens: 150,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Claude API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text?.trim() || 'Sorry, I could not process that.'
}

async function callOpenAI(messages, systemPrompt, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: PROVIDERS.openai.model,
      max_tokens: 150,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not process that.'
}

async function callGemini(messages, systemPrompt, apiKey) {
  // Build Gemini conversation format
  const geminiMessages = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${PROVIDERS.gemini.model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: geminiMessages,
        generationConfig: {
          maxOutputTokens: 150,
          temperature: 0.7,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      err?.error?.message || `Gemini API error: ${response.status}`
    )
  }

  const data = await response.json()
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    'Sorry, I could not process that.'
  )
}
