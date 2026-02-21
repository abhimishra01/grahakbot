import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DemoSection from './components/DemoSection'
import HowItWorks from './components/HowItWorks'
import UseCases from './components/UseCases'
import GetItForm from './components/GetItForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />

        {/* Divider glow */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-8" />

        <DemoSection />

        {/* Divider glow */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent mx-8" />

        <HowItWorks />

        {/* Divider glow */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent mx-8" />

        <UseCases />

        {/* CTA banner */}
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto rounded-2xl border border-[rgba(139,92,246,0.25)] bg-gradient-to-br from-surface to-surface2 p-8 sm:p-12 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(139,92,246,0.6) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)',
              }}
            />
            <div className="relative z-10">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-primary mb-3">
                Your business deserves a 24/7 assistant.
              </h2>
              <p className="font-body text-text-muted text-base mb-8 max-w-lg mx-auto">
                Join Indian SMEs that never miss a customer query.
              </p>
              <button
                onClick={() =>
                  document
                    .getElementById('get-it')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-body font-medium px-8 py-3.5 rounded-xl text-base transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                Get It For My Business →
              </button>
            </div>
          </div>
        </div>

        <GetItForm />
      </main>
      <Footer />
    </div>
  )
}
