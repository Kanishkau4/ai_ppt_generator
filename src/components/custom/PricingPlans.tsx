import { Check, Sparkles } from "lucide-react"
import { Button } from "../ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get a taste of AI-powered design with just enough power to start.",
    billingTag: "Always free",
    features: [
      "4 AI Projects",
      "Standard Slide Layouts",
      "Basic AI Export",
      "Community Support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Innovator (Pro)",
    price: "$19.99",
    description: "Perfect for creators and business professionals who need quick, stunning decks.",
    billingTag: "/mo",
    subTag: "Only billed monthly",
    features: [
      "Unlimited AI Projects",
      "Premium Slide Layouts",
      "High-Resolution Exports",
      "Priority Support",
      "Custom Brand Assets",
      "No Watermark",
    ],
    buttonText: "Upgrade Now",
    popular: true,
  },
  {
    name: "Visionary (Elite)",
    price: "$59.99",
    description: "For those who build at scale. High-volume generation and premium assets.",
    billingTag: "/mo",
    subTag: "Only billed monthly",
    features: [
      "All Pro Features",
      "Advanced AI Stylization",
      "Custom Font Libraries",
      "Team Collaboration",
      "Early Access to Features",
      "Dedicated Account Manager",
    ],
    buttonText: "Go Elite",
    popular: false,
  },
]

export default function PricingPlans() {
  return (
    <section id="pricing" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="px-3 py-1 rounded-full border bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Pricing Plans</h2>
          <p className="text-muted-foreground text-lg max-w-[700px]">
            Flexible pricing options designed to meet your needs — whether you're just getting started or scaling up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 transform hover:scale-105 ${plan.popular
                  ? "bg-purple-600 text-white shadow-2xl border-purple-500 -mt-4 mb-4 ring-4 ring-purple-600/20"
                  : "bg-card hover:bg-accent/50 hover:shadow-xl"
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-white text-purple-600 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </div>
              )}

              <div className="mb-8 flex-grow">
                <h3 className={`text-xl font-bold ${plan.popular ? "text-white" : "text-card-foreground"}`}>{plan.name}</h3>
                <p className={`text-sm mt-2 leading-relaxed min-h-[40px] ${plan.popular ? "text-purple-50" : "text-muted-foreground"}`}>{plan.description}</p>

                <div className="mt-6 flex flex-col gap-0.5">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${plan.popular ? "text-white" : "text-card-foreground"}`}>{plan.price}</span>
                    <span className={`text-sm font-medium ${plan.popular ? "text-purple-100" : "text-muted-foreground"}`}>
                      {plan.billingTag}
                    </span>
                  </div>
                  {plan.subTag && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${plan.popular ? "text-purple-200/80" : "text-muted-foreground/60"}`}>
                      {plan.subTag}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3">
                    <Check className={`h-4 w-4 shrink-0 font-bold ${plan.popular ? "text-white" : "text-purple-600"}`} />
                    <span className={`text-sm ${plan.popular ? "text-purple-50" : "text-muted-foreground"}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full h-12 rounded-xl font-bold transition-all ${plan.popular
                    ? "bg-white text-purple-600 hover:bg-purple-50 hover:scale-[1.02]"
                    : "bg-purple-600 text-white hover:bg-purple-700 hover:scale-[1.02]"
                  }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
