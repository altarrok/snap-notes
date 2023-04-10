import { api } from "~/utils/api";
import { TagFilter } from "./TagFilter";

export const TagFilterWidget: React.FC<{ selectedTags: string[], setSelectedTags: (selectedTags: string[]) => void }> = ({ selectedTags, setSelectedTags }) => {
    const usersTagsQuery = api.tag.getCurrentUsersTags.useQuery();

    return (
        <>
            {
                usersTagsQuery.data && usersTagsQuery.data.length > 0 && (
                    <TagFilter tags={usersTagsQuery.data?.map(tag => tag.name)} onChange={(selectedTags) => setSelectedTags(selectedTags)} selectedTags={selectedTags} />
                )
            }
        </>
    );
}