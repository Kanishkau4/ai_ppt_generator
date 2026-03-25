import { Play, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { useUser, SignInButton } from "@clerk/react";
import { Link } from "react-router-dom";

function Hero() {
    const { isSignedIn } = useUser();
    return (
        <section className="relative flex flex-col items-center justify-center pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full dark:bg-purple-900/20" />
            </div>

            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/50 backdrop-blur-sm text-xs md:text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-slate-200 overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                            </div>
                        ))}
                    </div>
                    <span className="text-muted-foreground ml-1">Join 10k+ users creating with AI</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-[900px]">
                    Every professional deck begins with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-300">AI power</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] leading-relaxed">
                    Transform your ideas into stunning, professional presentations instantly.
                    Our AI handles the structure and design so you can focus on your message.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <SignInButton mode="modal">
                        <Button size="lg" className="h-12 px-8 text-base bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                            {isSignedIn ? <Link to="/workspace">Create Your Deck</Link> : 'Get Started Free'} <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </SignInButton>
                    <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full group">
                        Watch Demo <Play className="ml-2 h-4 w-4 fill-current transition-transform group-hover:scale-110" />
                    </Button>
                </div>

                {/* Video Preview */}
                <div className="relative mt-16 w-full max-w-[1000px] mx-auto rounded-xl border bg-background shadow-2xl overflow-hidden group">
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="top-in-bottom-out"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                        thumbnailAlt="Hero Video"
                    />
                    <HeroVideoDialog
                        className="hidden dark:block"
                        animationStyle="top-in-bottom-out"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                        thumbnailAlt="Hero Video"
                    />
                </div>

                {/* Trusted By with Animation */}
                <div className="pt-20 pb-8 w-full overflow-hidden">
                    <p className="text-sm font-medium text-muted-foreground/60 uppercase tracking-widest mb-10">Trusted by leading teams worldwide</p>
                    <div className="relative">
                        <div className="flex w-max animate-marquee space-x-16 md:space-x-24 opacity-50 grayscale transition-all hover:grayscale-0 items-center py-4">
                            {[1, 2].map((set) => (
                                <div key={set} className="flex space-x-16 md:space-x-24 items-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 md:h-8" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6 md:h-8" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-6 md:h-8" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-6 md:h-8" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6 md:h-8" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Instacart_logo.svg" alt="Instacart" className="h-6 md:h-8" />
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
