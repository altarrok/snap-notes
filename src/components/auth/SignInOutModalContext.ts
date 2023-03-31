import { createContext } from "react";

export const SignInOutModalContext = createContext({
    isSignInOutModalOpen: false,
    setIsSignInOutModalOpen: (isSignInOutModalOpen: boolean) => {} // eslint-disable-line
});