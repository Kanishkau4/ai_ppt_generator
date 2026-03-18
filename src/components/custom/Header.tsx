import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { useUser, SignInButton, UserButton } from "@clerk/react";

function Header() {
    const { isSignedIn } = useUser();
    return (
        <div className="flex justify-between items-center w-full px-6 py-3">
            <img src={logo} alt="logo" width={150} height={150} />
            <SignInButton mode="modal">
                <button className="cursor-pointer bg-white text-black">{isSignedIn ? <div className="flex items-center gap-2 "><UserButton /> <Link to="/workspace"><Button>Go to Workspace</Button></Link></div> : 'Get Started'}</button>
            </SignInButton>
        </div>
    );
}

export default Header;