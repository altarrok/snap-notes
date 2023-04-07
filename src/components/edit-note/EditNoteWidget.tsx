import { CreateNoteForm } from "../create-note"
import { api } from "~/utils/api";
import { Spinner } from "../ui/Spinner";
import { useEffect } from "react";

export const EditNoteWidget: React.FC<{ noteId: string, previousTitle: string, previousContent: string, onSuccess?: () => void, onExit?: () => void }> = ({ noteId, previousTitle, previousContent, onSuccess, onExit }) => {
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
                            })}
                            defaultValues={{
                                title: previousTitle,
                                content: previousContent,
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