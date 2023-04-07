export const CreateNoteForm: React.FC<{
    onSubmit: (formInput: { noteTitle: string, noteContent: string }) => void,
    error?: string
}> = ({ onSubmit, error }) => {
    return (
        <form
            className="space-y-4 w-full"
            onSubmit={e => {
                e.preventDefault();

                const target = e.target as typeof e.target & {
                    "note-title": { value: string };
                    "note-content": { value: string };
                };

                onSubmit({ noteTitle: target["note-title"].value, noteContent: target["note-content"].value });
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
                />
            </div>
            {error && <div className="text-red-500 italic font-bold text-center">{error}</div>}
            <button type="submit" className="bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-400 transition-colors w-full">Save Note</button>
        </form>
    );
}