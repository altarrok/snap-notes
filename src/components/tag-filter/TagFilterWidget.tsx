import { api } from "~/utils/api";
import { TagFilter } from "./TagFilter";
import { useContext } from "react";
import { NotebookContext } from "../notebook/NotebookContext";

export const TagFilterWidget: React.FC = () => {
    const { notebookContextState, setNotebookContextState } = useContext(NotebookContext);
    const usersTagsQuery = api.tag.getCurrentUsersTags.useQuery();

    return (
        <>
            {
                usersTagsQuery.data && usersTagsQuery.data.length > 0 && (
                    <TagFilter
                        tags={usersTagsQuery.data?.map(tag => tag.name)}
                        onChange={(selectedTags) => setNotebookContextState((prevState) => ({
                            ...prevState,
                            filterByTags: selectedTags
                        }))}
                        selectedTags={notebookContextState.filterByTags}
                    />
                )
            }
        </>
    );
}