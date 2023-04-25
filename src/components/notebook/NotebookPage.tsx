import { api } from "~/utils/api";
import { CreateNoteCard } from "../create-note/CreateNoteCard";
import { NoteCard } from "../note/NoteCard";
import { useCallback, useContext } from "react";
import { Spinner } from "../ui/Spinner";
import { ShareNoteModal } from "../share-note/ShareNoteModal";
import { SearchNoteDebouncedInput } from "../search-note/SearchNoteDebouncedInput";
import { TagFilterWidget } from "../tag-filter/TagFilterWidget";
import { SortSelector } from "../sort-selector/SortSelector";
import { NotebookContext } from "./NotebookContext";
import { useSession } from "next-auth/react";

export const NotebookPage: React.FC = () => {
    const { notebookContextState } = useContext(NotebookContext);
    const { status } = useSession();

    const { data, fetchNextPage, hasNextPage } = api.note.getWithCursor.useInfiniteQuery(
        {
            limit: 15,
            searchValue: (notebookContextState.searchBy !== "" ? notebookContextState.searchBy : undefined),
            tags: (notebookContextState.filterByTags.length > 0 ? notebookContextState.filterByTags : undefined),
            sortBy: notebookContextState.sortBy,
            archivedPosts: notebookContextState.selectedPage === "ARCHIVED",
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            enabled: status === "authenticated",
        }
    );
    const loadMoreRef = useCallback((node: Element | null) => {
        if (node !== null) {
            new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    void fetchNextPage();
                }
            }, {
                rootMargin: "0px",
                threshold: 0.1
            }).observe(node)
        }
    }, [fetchNextPage]);


    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row justify-end gap-2 py-2">
                    <TagFilterWidget />
                    <SortSelector />
                    <SearchNoteDebouncedInput />
                </div>
                <div className="grid grid-cols-4 auto-rows-fr gap-4" >
                    {notebookContextState.selectedPage === "ARCHIVED" || <CreateNoteCard />}
                    {
                        data?.pages.map(page => page.notes.map((note, i) => (
                            <NoteCard
                                noteId={note.id}
                                key={i}
                                title={note.title}
                                content={note.content}
                                tags={note.tags.map(tag => tag.name)}
                                activatedMenuOptions={{
                                    delete: true,
                                    edit: !note.archived,
                                    share: !note.archived,
                                    archive: !note.archived,
                                    unArchive: note.archived,
                                }}
                            />
                        )))
                    }
                    <div
                        ref={(hasNextPage && loadMoreRef) || undefined}
                        className="col-start-2 col-span-2 flex items-center justify-center text-2xl font-bold"
                    >
                        {hasNextPage ? <Spinner size={12} /> : "That's it, you got it all! :)"}
                    </div>
                </div>
            </div>
            <ShareNoteModal />
        </>
    );
}