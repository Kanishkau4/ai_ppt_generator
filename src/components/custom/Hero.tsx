import { Play, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { HeroVideoDialog } from "../ui/hero-video-dialog";
import { useUser, SignInButton } from "@clerk/react";
import { Link } from "react-router-dom";

function Hero() {
    const { isSignedIn } = useUser();
    return (
        <div className="flex flex-col items-center justify-center w-full px-6 py-3 bg-white mt-28 space-y-4 ">
            <h1 className="text-4xl font-bold">From Idea to <span className="text-blue-500">Stunning Presentations</span> with AI</h1>
            <p className="text-lg w-2/3 text-center text-gray-500">Turn your ideas into beautifully designed presentations instantly. Our AI-powered platform handles content, design, and structure so you can focus on your message, not the slides. Whether you're pitching, teaching, or storytelling, create professional decks faster than ever.</p>
            <div className="flex items-center space-x-4">
                <Button variant={'outline'} size={'lg'}>Watch Video <Play /></Button>
                <SignInButton mode="modal">
                    <Button size={'lg'}>{isSignedIn ? <Link to="/workspace">Create New Project</Link> : 'Get Started'} <ChevronRight /></Button>
                </SignInButton>
            </div>
            <div className="relative mt-10">
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
        </div>
    );
}

export default Hero;