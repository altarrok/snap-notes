import { useState, PropsWithChildren } from "react";
import { SignInOutModalContext } from "./SignInOutModalContext";

export const SignInOutModalContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isSignInOutModalOpen, setIsSignInOutModalOpen] = useState(false);
  
    return (
      <SignInOutModalContext.Provider value={{ isSignInOutModalOpen, setIsSignInOutModalOpen }}>
        {children}
      </SignInOutModalContext.Provider>
    );
  };