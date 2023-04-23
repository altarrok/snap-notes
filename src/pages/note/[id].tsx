import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "~/components/Layout";
import { SignInButton } from "~/components/auth/SignInButton";
import { NoteCard } from "~/components/note/NoteCard";
import { Spinner } from "~/components/ui/Spinner";
import { api } from "~/utils/api";

const Note: NextPage = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const noteQuery = api.note.getById.useQuery({
        noteId: id
    });

    return (
        <Layout>
            <div className="flex items-center justify-center h-screen">
                {
                    !router.isReady || noteQuery.isLoading ? (
                        <Spinner size={24} />
                    ) : (
                        noteQuery.data ? (
                            <NoteCard
                                noteId={noteQuery.data.id}
                                title={noteQuery.data.title}
                                content={noteQuery.data.content}
                                tags={noteQuery.data.tags.map(tag => tag.name)}
                                activatedMenuOptions={{
                                    delete: noteQuery.data.sharedPermissions.includes("DELETE"),
                                    edit: noteQuery.data.sharedPermissions.includes("EDIT") && !noteQuery.data.archived,
                                    share: false,
                                    archive: noteQuery.data.sharedPermissions.includes("ARCHIVE") && !noteQuery.data.archived,
                                    unArchive: noteQuery.data.sharedPermissions.includes("ARCHIVE") && noteQuery.data.archived,
                                }}
                            />
                        ) : (
                            <>
                                <span className="text-2xl">Sorry, could not find the note</span>
                                <div className="mx-2 border-l border-solid border-black h-12"></div>
                                <Link href={"/"} className="text-2xl text-blue-600">
                                    Return to the application
                                </Link>
                            </>
                        )
                    )
                }
            </div>
        </Layout>
    );
};

export default Note;
