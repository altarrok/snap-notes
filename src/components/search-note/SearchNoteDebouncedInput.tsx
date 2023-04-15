import { useContext, useEffect, useState } from "react";
import { NotebookContext } from "../notebook/NotebookContext";

export const SearchNoteDebouncedInput: React.FC = () => {
    const { setNotebookContextState } = useContext(NotebookContext);
    const [inputValue, setInputValue] = useState("");


    useEffect(
        () => {
            const handler = setTimeout(() => {
                setNotebookContextState((prevState) => ({ ...prevState, searchBy: inputValue}));
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