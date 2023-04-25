import { MdContentCopy } from "react-icons/md";
import { Modal } from "../ui/Modal";
import { useContext, useEffect, useMemo, useState } from "react";
import { NotebookContext } from "../notebook/NotebookContext";
import React from "react";
import { SharePermissionSwitch } from "./SharePermissionSwitch";
import { api } from "~/utils/api";
import { NotePermission } from "@prisma/client";
import { Spinner } from "../ui/Spinner";
import { Switch } from "@headlessui/react";

export const ShareNoteModal: React.FC<
    Omit<React.ComponentProps<typeof Modal>, "isOpen" | "onRequestClose">
> = ({ ...modalProps }) => {
    const { notebookContextState: { shareModalNoteId }, setNotebookContextState } = useContext(NotebookContext);
    const utils = api.useContext();
    const note = api.note.getById.useQuery({ noteId: shareModalNoteId }, { enabled: !!shareModalNoteId });
    const updateMutation = api.note.upsert.useMutation({
        async onSuccess() {
            await utils.note.getById.refetch();
        }
    });
    const [isSuccess, setSuccess] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    const [archiveEnabled, setArchiveEnabled] = useState(false);
    const [deleteEnabled, setDeleteEnabled] = useState(false);
    const [sharingEnabled, setSharingEnabled] = useState(false);

    const shareLink = useMemo(() => {
        setSuccess(false)
        if (typeof document !== "undefined") {
            const { origin, pathname } = new URL(document.URL);
            return `${origin}${pathname}note/${shareModalNoteId}`;
        } else {
            return `/${shareModalNoteId}`
        }
    }, [shareModalNoteId])

    useEffect(() => {
        setSuccess(false)
    }, [shareModalNoteId])

    useEffect(() => {
        if (note.data && (
            editEnabled !== note.data.sharedPermissions.includes("EDIT") ||
            archiveEnabled !== note.data.sharedPermissions.includes("ARCHIVE") ||
            deleteEnabled !== note.data.sharedPermissions.includes("DELETE") ||
            sharingEnabled !== note.data.sharingEnabled
        )) {
            const newSharedPermissions: NotePermission[] = [];

            if (editEnabled) {
                newSharedPermissions.push("EDIT")
            }

            if (archiveEnabled) {
                newSharedPermissions.push("ARCHIVE")
            }

            if (deleteEnabled) {
                newSharedPermissions.push("DELETE")
            }

            updateMutation.mutate({
                ...note.data,
                noteId: note.data.id,
                tags: note.data.tags.map(tag => tag.name),
                sharedPermissions: newSharedPermissions,
                sharingEnabled,
            })
        }

    }, [editEnabled, archiveEnabled, deleteEnabled, sharingEnabled])

    useEffect(() => {
        if (note.data) {
            setEditEnabled(note.data.sharedPermissions.includes("EDIT"));
            setArchiveEnabled(note.data.sharedPermissions.includes("ARCHIVE"));
            setDeleteEnabled(note.data.sharedPermissions.includes("DELETE"));
            setSharingEnabled(note.data.sharingEnabled);
        }
    }, [note.dataUpdatedAt])

    return (
        <Modal
            isOpen={!!shareModalNoteId}
            onRequestClose={() => setNotebookContextState((prevState) => ({
                ...prevState,
                shareModalNoteId: undefined
            }))}
            shouldCloseOnOverlayClick={!note.isLoading && !updateMutation.isLoading}
            {...modalProps}
        >
            <div className="flex flex-col divide-y-2">
                <div className="flex items-center justify-between gap-x-4 pb-2">
                    <span className="font-bold text-4xl">Share Note</span>
                    <Switch
                        checked={sharingEnabled}
                        onChange={setSharingEnabled}
                        className={`${sharingEnabled ? 'bg-green-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                        <span
                            className={`${sharingEnabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                </div>
                <div className="relative p-2">
                    <div className="flex flex-row items-stretch py-2">
                        <span className="rounded-l-md bg-zinc-200 border-2 border-solid border-gray-400 p-2 text-zinc-400">{shareLink}</span>
                        <button
                            className="rounded-r-md border-gray-400 border-solid border-2 border-l-0 px-2 flex items-center hover:bg-cyan-100 transition-colors"
                            onClick={async () => {
                                await navigator.clipboard.writeText(shareLink);
                                setSuccess(true);
                            }}
                        >
                            <MdContentCopy className="mr-1" />{isSuccess ? "Copied" : "Copy"}
                        </button>
                    </div>
                    <div className="pt-2 flex flex-col gap-y-2">
                        <span className="text-lg font-bold">Anyone with the link:</span>
                        <SharePermissionSwitch permission="edit" enabled={editEnabled} setEnabled={setEditEnabled} />
                        <SharePermissionSwitch permission="archive" enabled={archiveEnabled} setEnabled={setArchiveEnabled} />
                        <SharePermissionSwitch permission="delete" enabled={deleteEnabled} setEnabled={setDeleteEnabled} />
                    </div>

                    {
                        !sharingEnabled && !note.isLoading && !updateMutation.isLoading && (
                            <div className="w-full h-full flex justify-center items-center absolute bg-black/75 top-0 left-0 z-50 rounded-b-xl" style={{ borderTop: 0 }} />
                        )
                    }
                </div>
                {
                    note.isLoading || updateMutation.isLoading ? (
                        <div className="w-full h-full flex justify-center items-center absolute bg-black/25 top-0 left-0 z-50" style={{ borderTop: 0 }}>
                            <Spinner size={6} />
                        </div>
                    ) : <></>
                }
            </div>
        </Modal >
    );
}