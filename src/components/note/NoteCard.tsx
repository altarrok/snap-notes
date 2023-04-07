import { useState } from "react";
import { Card } from "../ui/Card";
import { NoteMenu } from "./NoteMenu";
import { EditNoteWidget } from "../edit-note/EditNoteWidget";

export const NoteCard: React.FC<{ noteId: string, title: string, content: string }> = ({ noteId, title, content }) => {
    const [cardStage, setCardStage] = useState<"VIEW" | "EDIT">("VIEW");

    return (
        <Card>
            <div className="flex flex-col h-full">
                {
                    cardStage === "EDIT" ? (
                            <div className="p-4 h-full">
                                <EditNoteWidget
                                    noteId={noteId}
                                    previousTitle={title}
                                    previousContent={content}
                                    onSuccess={() => setCardStage("VIEW")}
                                    onExit={() => setCardStage("VIEW")}
                                />
                            </div>
                    ) : (
                        <>
                            <h2 className="text-5xl text-center font-bold border-b border-b-solid border-b-gray-200 p-4 break-words">
                                {title}
                            </h2>
                            <p className="text-base p-4 break-words">
                                {content}
                            </p>
                        </>
                    )
                }
            </div>
            <div className="absolute top-0 right-0 ">
                {
                    cardStage === "VIEW" && (
                        <NoteMenu
                            onEdit={() => setCardStage("EDIT")}
                        />
                    )
                }
            </div>
        </Card>
    );
}