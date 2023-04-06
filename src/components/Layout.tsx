import { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {    
    return (
        <main>
            {children}
        </main>
    );
}
