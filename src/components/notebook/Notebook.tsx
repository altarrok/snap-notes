import { api } from "~/utils/api";
import { CreateNoteCard } from "../create-note/CreateNoteCard";
import { NoteCard } from "../note/NoteCard";
import { useCallback, useState } from "react";
import { Spinner } from "../ui/Spinner";
import { ShareNoteModal } from "../share-note/ShareNoteModal";
import { SearchNoteDebouncedInput } from "../search-note/SearchNoteDebouncedInput";
import { TagFilterWidget } from "../tag-filter/TagFilterWidget";

export const Notebook: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [noteSearchDebouncedInput, setNoteSearchDebouncedInput] = useState<string>();
    const [shareModalNoteId, setShareModalNoteId] = useState<string>();
    const { data, fetchNextPage, hasNextPage } = api.note.getWithCursor.useInfiniteQuery(
        {
            limit: 15,
            searchValue: (noteSearchDebouncedInput !== "" ? noteSearchDebouncedInput : undefined),
            tags: (selectedTags.length > 0 ? selectedTags : undefined),
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );
    const loadMoreRef = useCallback((node: Element | null) => {
        if (node !== null) {
            new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    fetchNextPage();
                }
            }, {
                rootMargin: "0px",
                threshold: 0.1
            }).observe(node)
        }
    }, [fetchNextPage])

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-row justify-end gap-2 py-2">
                    <TagFilterWidget selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                    <SearchNoteDebouncedInput onDebouncedValueChange={(noteSearchInputValue) => setNoteSearchDebouncedInput(noteSearchInputValue)} />
                </div>
                <div className="grid grid-cols-4 auto-rows-fr gap-4" >
                    <CreateNoteCard />
                    {
                        data?.pages.map(page => page.notes.map((note, i) => (
                            <NoteCard
                                noteId={note.id}
                                key={i}
                                title={note.title}
                                content={note.content}
                                tags={note.tags.map(tag => tag.name)}
                                onShare={() => setShareModalNoteId(note.id)}
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
            <ShareNoteModal
                noteId={shareModalNoteId}
                onRequestClose={() => setShareModalNoteId(undefined)}
            />
        </>
    );
}