import { useContext } from "react";
import { SignInOutModalContext } from "./SignInOutModalContext";
import { MdLogin } from "react-icons/md";


export const SignInButton: React.FC = () => {
    const { setIsSignInOutModalOpen } = useContext(SignInOutModalContext);

    return (
        <button
            onClick={() => setIsSignInOutModalOpen(true)}
            className="rounded-lg border-2 border-solid border-black p-2"
        >
            <MdLogin className="text-4xl" />
        </button>
    );
}