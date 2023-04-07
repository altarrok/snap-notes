import { PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="max-w-md border border-solid border-gray-400 rounded-md">
            { children }
        </div>
    );
}