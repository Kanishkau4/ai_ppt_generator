import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { useUser, SignInButton, UserButton } from "@clerk/react";
import { useLocation } from "react-router-dom";
import { UserDetailContext } from "../../../context/UserDetailContext";
import { useContext } from "react";
import { Gem } from "lucide-react";

function Header() {
    const { isSignedIn } = useUser();
    const location = useLocation();
    const { userDetail } = useContext(UserDetailContext);

    console.log(location);
    return (
        <div className="flex justify-between items-center w-full px-6 py-3">
            <img src={logo} alt="logo" width={150} height={150} />
            <SignInButton mode="modal">
                <button className="cursor-pointer bg-white text-black">{isSignedIn ? <div className="flex items-center gap-2 "><UserButton />
                    {location.pathname == '/workspace' ?
                        <div className="flex items-center gap-1 p-2">
                            <Gem>{userDetail?.credits ?? 0}</Gem>
                        </div> :
                        <Link to="/workspace"><Button>Go to Workspace</Button></Link>

                    }
                </div> : 'Get Started'}</button>
            </SignInButton>
        </div>
    );
}

export default Header;