import { CreateNoteForm } from "../create-note"
import { api } from "~/utils/api";
import { Spinner } from "../ui/Spinner";
import { useEffect } from "react";

export const EditNoteWidget: React.FC<{ noteId: string, previousTitle: string, previousContent: string, previousTags: string[], onSuccess?: () => void, onExit?: () => void }> = ({ noteId, previousTitle, previousContent, previousTags, onSuccess, onExit }) => {
    const utils = api.useContext();
    const updateNoteMutation = api.note.upsert.useMutation({
        async onSuccess() {
            await utils.note.getWithCursor.refetch();
            await utils.tag.getCurrentUsersTags.invalidate();
        }
    });

    useEffect(() => {
        if (updateNoteMutation.isSuccess) {
            onSuccess?.()
        }
    }, [updateNoteMutation.isSuccess])

    return (
        <div className="flex flex-col space-y-4 items-center justify-center h-full">
            {
                updateNoteMutation.isLoading ? (
                    <Spinner size={12} />
                ) : (
                    <>
                        <h1 className="text-2xl text-center font-bold">Editing Note</h1>
                        <CreateNoteForm
                            onSubmit={(formInput) => updateNoteMutation.mutate({
                                noteId,
                                title: formInput.noteTitle,
                                content: formInput.noteContent,
                                tags: formInput.noteTags
                            })}
                            defaultValues={{
                                title: previousTitle,
                                content: previousContent,
                                tags: previousTags,
                            }}
                        />
                        <div className="absolute top-0 right-0" style={{ marginTop: 0 }}>
                            <button
                                className="text-4xl px-2 transition-colors hover:text-red-500"
                                onClick={() => onExit?.()}
                            >
                                &times;
                            </button>
                        </div>
                    </>
                )
            }

        </div>
    );
}