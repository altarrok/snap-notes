import { api } from "~/utils/api";
import { TagFilter } from "./TagFilter";
import { useContext } from "react";
import { NotebookContext } from "../notebook/NotebookContext";
import { useSession } from "next-auth/react";

export const TagFilterWidget: React.FC = () => {
    const { notebookContextState, setNotebookContextState } = useContext(NotebookContext);
    const { status } = useSession();
    const usersTagsQuery = api.tag.getCurrentUsersTags.useQuery(undefined, {
        enabled: status === "authenticated",
    });

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