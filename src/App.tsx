import Header from './components/custom/Header'
import Hero from './components/custom/Hero'
import Features from './components/custom/Features'
import PricingPlans from './components/custom/PricingPlans'
import FAQ from './components/custom/FAQ'
import CTA from './components/custom/CTA'
import Footer from './components/custom/Footer'

function App() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground scroll-smooth selection:bg-purple-500/30 selection:text-primary-foreground relative">
      {/* Purple Radial Glow Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none dark:opacity-100 opacity-60"
        style={{
          backgroundImage: `radial-gradient(circle 800px at 50% 100px, rgba(139,92,246,0.25), transparent)`,
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Features />
          <PricingPlans />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
