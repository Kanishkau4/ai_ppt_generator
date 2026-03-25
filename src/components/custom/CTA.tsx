import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { SignInButton } from "@clerk/react"

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Local Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-[600px]">
            Join thousands of satisfied customers and transform your business today.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <SignInButton mode="modal">
              <Button size="lg" className="h-12 px-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold border-none transition-all hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                Start free trial
              </Button>
            </SignInButton>
            <Link to="/workspace/pricing">
              <Button variant="outline" size="lg" className="h-12 px-10 rounded-full border-border bg-background hover:bg-muted transition-all hover:scale-105">
                Contact sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
