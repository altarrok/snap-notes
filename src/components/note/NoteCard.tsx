import { useContext, useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { NoteMenu } from "./NoteMenu";
import { EditNoteWidget } from "../edit-note/EditNoteWidget";
import { api } from "~/utils/api";
import { Spinner } from "../ui/Spinner";
import { Tag } from "../Tag";
import { NotebookContext } from "../notebook/NotebookContext";

export const NoteCard: React.FC<{
    noteId: string,
    title: string,
    content: string,
    tags: string[],
    activatedMenuOptions?: {
        edit: boolean,
        delete: boolean,
        share: boolean,
        archive: boolean,
        unArchive: boolean,
    },
    archiveMode?: boolean,
}> = ({ noteId, title, content, tags, activatedMenuOptions }) => {
    const { setNotebookContextState } = useContext(NotebookContext);
    const [cardStage, setCardStage] = useState<"VIEW" | "EDIT">("VIEW");
    const utils = api.useContext();
    const deleteNoteMutation = api.note.delete.useMutation({
        async onSuccess() {
            await utils.note.getWithCursor.refetch();
        }
    });
    
    const switchArchiveStatusMutation = api.note.switchArchiveStatus.useMutation({
        async onSuccess() {
            await utils.note.getWithCursor.refetch();
        }
    })

    useEffect(() => {
        setCardStage("VIEW")
    }, [noteId, title, content])

    return (
        <>
            <Card>
                <div className="flex flex-col h-full">
                    {
                        cardStage === "EDIT" ? (
                            <div className="p-4 h-full">
                                <EditNoteWidget
                                    noteId={noteId}
                                    previousTitle={title}
                                    previousContent={content}
                                    previousTags={tags}
                                    onSuccess={() => setCardStage("VIEW")}
                                    onExit={() => setCardStage("VIEW")}
                                />
                            </div>
                        ) : (
                            deleteNoteMutation.isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <Spinner size={12} />
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-5xl text-center font-bold border-b border-b-gray-200 p-4 break-words">
                                        {title}
                                    </h2>
                                    {
                                        tags.length > 0 && (
                                            <div className="border-b border-b-gray-200 p-4 flex gap-2 overflow-x-auto">
                                                {
                                                    tags.map((tag, i) => (
                                                        <Tag key={i} >
                                                            <span title={tag}>{tag}</span>
                                                        </Tag>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                    <p className="text-base p-4 break-words">
                                        {content}
                                    </p>
                                </>
                            )
                        )
                    }
                </div>
                {
                    cardStage === "VIEW" && !deleteNoteMutation.isLoading && activatedMenuOptions && (

                        <div className="absolute top-0 right-0 ">
                            <NoteMenu
                                onShare={activatedMenuOptions.share ? (() => setNotebookContextState((prevState) => ({ ...prevState, shareModalNoteId: noteId }))) : undefined}
                                onUnarchive={activatedMenuOptions.unArchive ? () => switchArchiveStatusMutation.mutate({ noteId }) : undefined}
                                onArchive={activatedMenuOptions.archive ? () => switchArchiveStatusMutation.mutate({ noteId }) : undefined}
                                onEdit={activatedMenuOptions.edit ? () => setCardStage("EDIT") : undefined}
                                onDelete={activatedMenuOptions.delete ? () => deleteNoteMutation.mutate({ noteId }) : undefined}
                            />
                        </div>
                    )
                }
            </Card>
        </>
    );
}