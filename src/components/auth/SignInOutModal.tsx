import { useContext } from "react";
import { SignInOutModalContext } from "./SignInOutModalContext";
import { Modal } from "../ui/Modal";
import { GoogleIcon } from "./GoogleIcon";
import { signIn } from "next-auth/react";



export const SignInOutModal: React.FC = () => {
    const { isSignInOutModalOpen, setIsSignInOutModalOpen } = useContext(SignInOutModalContext);

    return (
        <Modal
            isOpen={isSignInOutModalOpen}
            onRequestClose={() => setIsSignInOutModalOpen(false)}
        >
            <div>
                <button
                    className="flex items-center border border-solid border-gray-400"
                    onClick={() => signIn("google")}
                >
                    <i className="w-12 inline-block  border-r border-r-solid border-r-gray-400">
                        <GoogleIcon />
                    </i>
                    <span className="text-base inline-block align-middle p-2">
                        Sign in with Google
                    </span>
                </button>
            </div>
        </Modal>
    );
} 