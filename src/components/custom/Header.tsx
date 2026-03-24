import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { useUser, SignInButton, UserButton, useAuth } from "@clerk/react";
import { useLocation } from "react-router-dom";
import { UserDetailContext } from "../../../context/UserDetailContext";
import { useContext } from "react";
import { Gem } from "lucide-react";

function Header() {
    const { isSignedIn } = useUser();
    const location = useLocation();
    const { userDetail } = useContext(UserDetailContext);
    const { has } = useAuth();
    const hasProAccess = has({ plan: 'innovator_pro_' })
    console.log(hasProAccess);
    const hasEliteAccess = has({ plan: 'visionary_elite_' })
    console.log(hasEliteAccess);

    // Deduct 1 credit ONLY if NOT elite
    if (!hasEliteAccess && userDetail && userDetail.credits > 0) {
        const updatedCredits = userDetail.credits - 1;
        console.log("Updated credits:", updatedCredits);
    } else if (hasEliteAccess) {
        console.log("No credit deduction for Elite user");
    }

    console.log(location);
    return (
        <div className="flex justify-between items-center w-full px-6 py-3">
            <img src={logo} alt="logo" width={150} height={150} />
            <SignInButton mode="modal">
                <button className="cursor-pointer bg-white text-black">{isSignedIn ? <div className="flex items-center gap-2 "><UserButton />
                    {location.pathname === '/workspace' ?
                        // Inside Return
                        <Link to="/workspace/pricing">
                            <div className={`flex items-center gap-2 border rounded-full px-3 py-1 text-sm font-medium transition-all ${hasProAccess || hasEliteAccess ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
                                <Gem className="h-4 w-4 text-blue-500" />
                                <span>
                                    {hasEliteAccess ? 'Unlimited' : (userDetail?.credits ?? 0)} Credits
                                </span>
                                {hasProAccess && <span className="ml-1 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full uppercase">Pro</span>}
                                {hasEliteAccess && <span className="ml-1 bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-full uppercase">Elite</span>}
                            </div>
                        </Link>
                        :
                        <Link to="/workspace"><Button>Go to Workspace</Button></Link>

                    }
                </div> : 'Get Started'}</button>
            </SignInButton>
        </div>
    );
}

export default Header;