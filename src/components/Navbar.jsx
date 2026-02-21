import { useState, useEffect } from 'react'
import { Bot, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-[rgba(139,92,246,0.15)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-heading font-bold text-lg text-text-primary">
            Grahak<span className="text-accent">Bot</span>
          </span>
        </button>

        {/* Desktop CTA */}
        <div className="hidden sm:flex items-center gap-6">
          <button
            onClick={() => scrollTo('demo')}
            className="text-text-muted hover:text-text-primary text-sm font-body transition-colors"
          >
            Live Demo
          </button>
          <button
            onClick={() => scrollTo('get-it')}
            className="bg-accent hover:bg-accent/90 text-white text-sm font-body font-medium px-4 py-2 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          >
            Get It For My Business
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-text-primary p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-surface border-b border-[rgba(139,92,246,0.15)] px-4 py-4 flex flex-col gap-3">
          <button
            onClick={() => scrollTo('demo')}
            className="text-text-muted text-sm text-left py-2"
          >
            Live Demo
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="text-text-muted text-sm text-left py-2"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('use-cases')}
            className="text-text-muted text-sm text-left py-2"
          >
            Use Cases
          </button>
          <button
            onClick={() => scrollTo('get-it')}
            className="bg-accent text-white text-sm font-medium px-4 py-2.5 rounded-lg text-center"
          >
            Get It For My Business
          </button>
        </div>
      )}
    </nav>
  )
}
