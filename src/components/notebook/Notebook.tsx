import { useMemo, useState } from "react";
import { MdArchive, MdNotes } from "react-icons/md";
import { NotebookPage } from "./NotebookPage";
import { NotebookContext, TNotebookContextState, defaultNotebookContextState } from "./NotebookContext";

export const Notebook: React.FC = () => {
    const [notebookContextState, setNotebookContextState] = useState<TNotebookContextState>(defaultNotebookContextState);

    const notebookContextValue = useMemo(
        () => ({ notebookContextState, setNotebookContextState }),
        [notebookContextState]
    );

    return (
        <NotebookContext.Provider value={notebookContextValue}>
            <div className="flex items-center">
                <button
                    className={`text-2xl flex items-center gap-2 p-2 transition-colors ${notebookContextState.selectedPage === "NOTES" && 'bg-blue-200'}`}
                    onClick={() => setNotebookContextState((prevState) => ({ ...prevState, selectedPage: "NOTES" }))}
                >
                    <MdNotes /> Notes
                </button>
                <button
                    className={`text-2xl flex items-center gap-2 p-2 transition-colors ${notebookContextState.selectedPage === "ARCHIVED" && 'bg-blue-200'}`}
                    onClick={() => setNotebookContextState((prevState) => ({ ...prevState, selectedPage: "ARCHIVED" }))}
                >
                    <MdArchive /> Archived
                </button>
            </div>
            <NotebookPage />
        </NotebookContext.Provider>
    );
}