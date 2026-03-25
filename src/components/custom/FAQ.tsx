import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const faqs = [
  {
    question: "What is AI PPT Generator used for?",
    answer: "Our app is designed to help you create professional, high-quality presentations in seconds. Simply provide a prompt or topic, and our AI will generate content, structure, and design for your slides.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a free plan where you can generate up to 5 presentations to try out our AI-powered features. No credit card is required to start.",
  },
  {
    question: "Can I change my subscription plan later?",
    answer: "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "How is my data secured?",
    answer: "We take security seriously. All your presentations and account data are encrypted and stored securely. We do not use your private data to train our AI models without your explicit permission.",
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, we offer priority support for our Pro and Elite users. Free users have access to our community forums and documentation for help.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="px-3 py-1 rounded-full border bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider text-[10px] md:text-xs">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently asked questions</h2>
          <p className="text-muted-foreground text-lg max-w-[700px]">
            Ship beautiful presentations without the overhead — customizable, scalable, and AI-powered UI components.
          </p>
        </div>

        <div className="max-w-3xl mx-auto border rounded-2xl bg-card overflow-hidden shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0 px-6">
                <AccordionTrigger className="text-left font-semibold py-6 hover:no-underline hover:text-purple-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
