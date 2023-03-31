import { useContext } from "react";
import { SignInOutModalContext } from "./SignInOutModalContext";


export const SignInOutModal: React.FC = () => {
    const { isSignInOutModalOpen, setIsSignInOutModalOpen } = useContext(SignInOutModalContext);
    
    return (
        <></>
    );
} 