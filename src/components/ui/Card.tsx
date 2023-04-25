import { PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
    return (
        <div className={`relative border border-solid border-gray-400 rounded-md ${className || ''}`}>
            { children }
        </div>
    );
}