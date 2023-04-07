import { useSession } from "next-auth/react";
import { useCallback, useContext } from "react";
import { api } from "~/utils/api";
import { SignInOutModalContext } from "../auth/SignInOutModalContext";
import { Spinner } from "../ui/Spinner";
import { CreateNoteForm } from "./CreateNoteForm";

export const CreateNoteWidget: React.FC = () => {
    const utils = api.useContext();
    const createNoteMutation = api.note.create.useMutation({
        async onSuccess() {
            await utils.note.getWithCursor.invalidate();
        }
    });
    const { setIsSignInOutModalOpen } = useContext(SignInOutModalContext);
    const { status } = useSession();

    const formSubmissionHandler = useCallback((formInput: { noteTitle: string, noteContent: string }) => {
        if (status !== "authenticated") {
            setIsSignInOutModalOpen(true);
            return;
        }

        createNoteMutation.mutate({
            title: formInput.noteTitle,
            content: formInput.noteContent,
        });
    }, [status, setIsSignInOutModalOpen]);

    return (
        <div className="min-w-48 h-full flex flex-col space-y-4 p-4 items-center justify-center">
            {
                createNoteMutation.isLoading ?
                    <Spinner size={12} />
                    :
                    <>
                        <h1 className="text-2xl font-bold">Create New Note</h1>
                        <CreateNoteForm
                            onSubmit={formSubmissionHandler}
                            error={createNoteMutation.error?.message}
                        />
                    </>
            }
        </div>
    );
}
