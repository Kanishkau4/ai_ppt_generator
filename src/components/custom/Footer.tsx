import { Link } from "react-router-dom"
import logo from "../../assets/icon.png"

export default function Footer() {
    return (
        <footer className="pt-24 pb-12 bg-transparent relative overflow-hidden flex flex-col min-h-[450px]">
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container px-4 md:px-6 flex flex-col flex-grow relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-16">
                    <div className="md:col-span-2 flex flex-col items-start gap-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0">
                                <img src={logo} alt="logo" className="h-8 w-8" />
                            </div>
                            <span className="font-bold text-xl tracking-wide text-foreground">AI PPT Gen</span>
                        </Link>
                        <p className="text-muted-foreground/80 text-sm max-w-[380px] leading-relaxed">
                            Generate beautiful, professional presentations in seconds using the power of AI.
                            Designed to help you focus on your message, rather than your slides.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="font-bold tracking-wide text-sm text-foreground">Product</h4>
                        <nav className="flex flex-col gap-4 text-sm font-medium">
                            <Link to="/" className="text-muted-foreground/80 hover:text-foreground transition-colors">Home</Link>
                            <Link to="/#features" className="text-muted-foreground/80 hover:text-foreground transition-colors">Features</Link>
                            <Link to="/workspace/pricing" className="text-muted-foreground/80 hover:text-foreground transition-colors">Pricing</Link>
                            <Link to="/#faq" className="text-muted-foreground/80 hover:text-foreground transition-colors">FAQ</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6 lg:col-span-2 lg:pl-10">
                        <h4 className="font-bold tracking-wide text-sm text-foreground">Get in touch</h4>
                        <div className="flex flex-col gap-4 text-sm font-medium">
                            <a href="mailto:support@aipptgen.com" className="text-muted-foreground/80 hover:text-foreground transition-colors">support@aipptgen.com</a>
                        </div>
                    </div>
                </div>

                {/* This div pushes the copyright area to the bottom using mt-auto */}
                <div className="mt-auto pt-8 flex flex-col items-center border-t border-border relative z-10">
                    <p className="text-xs text-muted-foreground">
                        Copyright 2026 © AI PPT Gen. All Right Reserved.
                    </p>
                </div>
            </div>

            {/* Large Outlined Text Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 translate-y-20 opacity-[0.03] dark:opacity-5">
                <h2
                    className="text-[25vw] font-black leading-none text-transparent tracking-tighter"
                    style={{ WebkitTextStroke: '2px currentColor' }}
                >
                    landing
                </h2>
            </div>
        </footer>
    )
}
