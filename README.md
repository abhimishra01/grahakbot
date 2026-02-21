# GrahakBot 🤖
> AI assistant for every Indian business. In seconds.

**Live Demo:** [abhimishra01.github.io/grahakbot](https://abhimishra01.github.io/grahakbot)

---

## What it does

GrahakBot is a portfolio demo showcasing an AI-powered WhatsApp-style business assistant for Indian SMEs. Businesses can configure a custom AI persona that handles customer queries 24/7 — orders, appointments, FAQs, pricing, and more.

- **Live chat demo** powered by real AI (Claude / OpenAI / Gemini)
- **Business customizer** that changes the AI persona in real time
- **Lead gen form** for businesses that want this on their real WhatsApp
- Dark theme, India-first design, fully mobile-responsive

---

## How the demo works

1. Go to the **Try It Live** section
2. Configure your business in the left panel:
   - Business name, type, services, hours, location, tone
3. Select your AI provider and paste your API key
4. Chat on the right panel as a customer

The AI responds in real time using your business's context. Change any setting and the bot adapts instantly.

---

## Supported AI Providers

| Provider | Model | Cost | Notes |
|----------|-------|------|-------|
| **Anthropic Claude** | claude-haiku-4-5-20251001 | ~$0.001/msg | Default, best quality |
| **OpenAI** | gpt-4o-mini | ~$0.0005/msg | Slightly cheaper |
| **Google Gemini** | gemini-1.5-flash | Free tier | No cost on free quota |

API keys are stored in **your browser only** — never sent to any server other than the AI provider.

---

## Run Locally

```bash
git clone https://github.com/abhimishra01/grahakbot.git
cd grahakbot
npm install
```

Create a `.env` file (optional — you can also enter keys in the UI):

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...
VITE_OPENAI_API_KEY=sk-...
VITE_GEMINI_API_KEY=AIza...
VITE_FORMSPREE_ID=your_formspree_form_id
```

```bash
npm run dev
```

Open [http://localhost:5173/grahakbot/](http://localhost:5173/grahakbot/)

---

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `vite build` then `gh-pages -d dist`. Make sure your GitHub repo is named `grahakbot` and GitHub Pages is enabled on the `gh-pages` branch.

---

## Tech Stack

- **React + Vite** — frontend framework
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Formspree** — lead gen form backend
- **gh-pages** — GitHub Pages deployment
- **lucide-react** — icons

---

## Built by Abhishek Mishra

- GitHub: [github.com/abhimishra01](https://github.com/abhimishra01)
- LinkedIn: [linkedin.com/in/abhimishra01](https://linkedin.com/in/abhimishra01)
