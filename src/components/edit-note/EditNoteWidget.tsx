import { CreateNoteForm } from "../create-note"
import { api } from "~/utils/api";
import { Spinner } from "../ui/Spinner";
import { useEffect } from "react";

export const EditNoteWidget: React.FC<{ noteId: string, previousTitle: string, previousContent: string, onSuccess?: () => void }> = ({ noteId, previousTitle, previousContent, onSuccess }) => {
    const utils = api.useContext();
    const updateNoteMutation = api.note.upsert.useMutation({
        async onSuccess() {
            await utils.note.getWithCursor.invalidate();
        }
    });

    useEffect(() => {
        if (updateNoteMutation.isSuccess) {
            onSuccess?.()
        }
    }, [updateNoteMutation.isSuccess])

    return (
        <div className="flex flex-col space-y-4 items-center">
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
                            })}
                            defaultValues={{
                                title: previousTitle,
                                content: previousContent,
                            }}
                        />
                    </>
                )
            }

        </div>
    );
}