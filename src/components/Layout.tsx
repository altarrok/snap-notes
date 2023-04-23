import { PropsWithChildren } from "react";
import { SignInOutModalContextProvider } from "./auth/SignInOutModalContextProvider";
import { SignInOutModal } from "./auth/SignInOutModal";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <main>
            <SignInOutModalContextProvider>
                {children}
                <SignInOutModal />
            </SignInOutModalContextProvider>
        </main>
    );
}
