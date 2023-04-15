import { Dispatch, SetStateAction, createContext } from "react";

export type TNotebookContextState = {
    selectedPage: "NOTES" | "ARCHIVED";
    filterByTags: string[];
    sortBy: "TITLE" | "DATE";
    searchBy: string;
    shareModalNoteId?: string;
}

export type TNotebookContext = {
    notebookContextState: TNotebookContextState;
    setNotebookContextState: Dispatch<SetStateAction<TNotebookContextState>>;
}

export const defaultNotebookContextState: TNotebookContextState = {
    selectedPage: "NOTES",
    filterByTags: [],
    sortBy: "DATE",
    searchBy: "",
}

export const NotebookContext = createContext<TNotebookContext>({
    notebookContextState: defaultNotebookContextState,
    setNotebookContextState: () => {}
})