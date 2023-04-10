import { AddTagInputWidget } from "../add-tag/AddTagInputWidget";

export const CreateNoteForm: React.FC<{
    defaultValues?: {
        title?: string,
        content?: string,
        tags?: string[]
    }
    onSubmit: (formInput: { noteTitle: string, noteContent: string, noteTags: string[] }) => void,
    error?: string
}> = ({ defaultValues, onSubmit, error }) => {
    return (
        <form
            className="space-y-4 w-full"
            onSubmit={e => {
                e.preventDefault();

                const formData = new FormData(e.target as HTMLFormElement);

                const formInputMap = {
                    noteTitle: formData.get('note-title') as string,
                    noteContent: formData.get('note-content') as string,
                    noteTags: [...formData.entries()].reduce<string[]>((tags, entry) => {
                        if (entry[0].includes('note-tags')) {
                            return [...tags, entry[1] as string]
                        }
                        
                        return tags;
                    }, []),
                }

                onSubmit(formInputMap);
            }}
        >
            <div>
                <label htmlFor="note-title" className="block font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    id="note-title"
                    name="note-title"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                    required
                    minLength={2}
                    maxLength={24}
                    defaultValue={defaultValues?.title}
                />
            </div>
            <div>
                <label htmlFor="note-content" className="block font-medium text-gray-700">Content:</label>
                <textarea
                    id="note-content"
                    name="note-content"
                    rows={6}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                    maxLength={400}
                    defaultValue={defaultValues?.content}
                />
            </div>
            <div>
                <AddTagInputWidget defaultValue={defaultValues?.tags} />
            </div>
            {error && <div className="text-red-500 italic font-bold text-center">{error}</div>}
            <button type="submit" className="bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-400 transition-colors w-full">Save Note</button>
        </form>
    );
}