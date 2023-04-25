import { PropsWithChildren } from "react";

export const Tag: React.FC<PropsWithChildren<{ overflowHidden?: boolean, onDelete?: () => void }>> = ({ overflowHidden, children, onDelete }) => {
    return (
        <div
            className={`${overflowHidden ? 'overflow-x-hidden' : ''} text-ellipsis text-md py-1 px-2 bg-blue-100 rounded-2xl inline-block border border-solid border-blue-300`}
        >
            {children}
            {
                onDelete && (
                    <button
                        className="transition-colors hover:text-red-500 ml-2 text-xl"
                        onClick={onDelete}
                        type="button"
                    >
                        &times;
                    </button>
                )
            }
        </div>
    );
}