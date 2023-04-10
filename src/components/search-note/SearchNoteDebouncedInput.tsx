import { useEffect, useState } from "react";

export const SearchNoteDebouncedInput: React.FC<{ 
    onDebouncedValueChange: (input: string) => void 
}> = ({ onDebouncedValueChange }) => {
    const [inputValue, setInputValue] = useState("");


    useEffect(
        () => {
            const handler = setTimeout(() => {
                onDebouncedValueChange(inputValue);
            }, 500);

            return () => {
                clearTimeout(handler);
            };
        },
        [inputValue]
    );

    return (
        <input
            type="text"
            placeholder="Search for notes"
            className="p-2 border border-solid border-gray-400 rounded-md"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    );
}