import { api } from "~/utils/api";
import { AddTagInput } from "./AddTagInput";

export const AddTagInputWidget: React.FC<{ defaultValue?: string[] }> = ({ defaultValue }) => {
    const usersTagsQuery = api.tag.getAllTags.useQuery();
    
    return (
        <AddTagInput tagOptions={(usersTagsQuery.data || []).map(tag => tag.name)} defaultValue={defaultValue} />
    );
}