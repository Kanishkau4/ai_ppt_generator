import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icon.png";
import { Button } from "../ui/button";
import { useUser, SignInButton, UserButton } from "@clerk/react";
import { ModeToggle } from "../mode-toggle";
import { useContext } from "react";
import { UserDetailContext } from "../../../context/UserDetailContext";
import { Gem } from "lucide-react";

function Header() {
    const { isSignedIn } = useUser();
    const location = useLocation();
    const { userDetail } = useContext(UserDetailContext) as any;

    return (
        <header className="fixed top-0 z-50 w-full bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-2 shrink-0">
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                            <img src={logo} alt="logo" className="h-8 w-8" />
                        </div>
                        <span className="hidden font-bold sm:inline-block">AI PPT Gen</span>
                    </Link>
                </div>

                <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
                    <Link to="/#features" className="transition-colors hover:text-foreground">Features</Link>
                    <Link to="/workspace/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
                    <Link to="/#docs" className="transition-colors hover:text-foreground">Docs</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                        <ModeToggle />
                    </div>
                    {isSignedIn ? (
                        <div className="flex items-center gap-4">
                            {location.pathname.includes('/workspace') ? (
                                <Button variant="secondary" size="sm" className="pointer-events-none cursor-default">
                                    <Gem className="h-4 w-4" /> {userDetail?.credits || 0} Credits
                                </Button>
                            ) : (
                                <Link to="/workspace">
                                    <Button variant="ghost" size="sm" className="hover:bg-white/5">Workspace</Button>
                                </Link>
                            )}
                            <UserButton />
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:bg-white/5">Sign in</Button>
                            </SignInButton>
                            <SignInButton mode="modal">
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-5">Get started</Button>
                            </SignInButton>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;