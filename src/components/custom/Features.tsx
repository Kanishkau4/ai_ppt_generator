import { Lightbulb, Layout, Zap, Share2 } from "lucide-react"

const features = [
  {
    title: "AI Content Generation",
    description: "Generate complete slide content and outlines from just a simple prompt. No more writer's block.",
    icon: Lightbulb,
  },
  {
    title: "Professional Layouts",
    description: "Our AI automatically applies stunning, modern design principles to every slide for a polished look.",
    icon: Layout,
  },
  {
    title: "Lightning-fast Setup",
    description: "Create a 10-slide presentation in under 60 seconds. Save hours of manual design work.",
    icon: Zap,
  },
  {
    title: "Export & Present",
    description: "Seamlessly export to PPTX or present directly from your browser with built-in presenter mode.",
    icon: Share2,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="px-3 py-1 rounded-full border bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Built for modern creators</h2>
          <p className="text-muted-foreground text-lg max-w-[700px]">
            The most advanced AI engine for presentations. Everything you need to turn ideas into impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
