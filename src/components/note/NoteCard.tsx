import { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { NoteMenu } from "./NoteMenu";
import { EditNoteWidget } from "../edit-note/EditNoteWidget";
import { api } from "~/utils/api";
import { Spinner } from "../ui/Spinner";
import { Tag } from "../Tag";

export const NoteCard: React.FC<{
    noteId: string,
    title: string,
    content: string,
    tags: string[],
    optionsDisabled?: boolean,
    archiveMode?: boolean,
    onShare?: () => void,
    onArchive?: () => void,
    onUnarchive?: () => void,
}> = ({ noteId, title, content, tags, optionsDisabled, archiveMode, onShare, onArchive, onUnarchive }) => {
    const [cardStage, setCardStage] = useState<"VIEW" | "EDIT">("VIEW");
    const utils = api.useContext();
    const deleteNoteMutation = api.note.delete.useMutation({
        async onSuccess() {
            await utils.note.getWithCursor.refetch();
        }
    });

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
                    cardStage === "VIEW" && !deleteNoteMutation.isLoading && !optionsDisabled && (

                        <div className="absolute top-0 right-0 ">
                            <NoteMenu
                                onShare={onShare}
                                onArchive={onArchive}
                                onUnarchive={onUnarchive}
                                {
                                ...(
                                    !archiveMode && {
                                        onEdit: () => setCardStage("EDIT"),
                                        onDelete: () => deleteNoteMutation.mutate({ noteId })
                                    }
                                )
                                }
                            />
                        </div>
                    )
                }
            </Card>
        </>
    );
}