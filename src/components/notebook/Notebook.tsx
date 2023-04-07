import { api } from "~/utils/api";
import { CreateNoteCard } from "../create-note/CreateNoteCard";
import { NoteCard } from "../note/NoteCard";
import { useCallback } from "react";
import { Spinner } from "../ui/Spinner";

export const Notebook: React.FC = () => {
    const { data, fetchNextPage, hasNextPage } = api.note.getWithCursor.useInfiniteQuery(
        {
            limit: 15,
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
        <div className="grid grid-cols-4 auto-rows-fr gap-4" >
            <CreateNoteCard />
            {
                data?.pages.map(page => page.notes.map((note, i) => (
                    <NoteCard
                        key={i}
                        title={note.title}
                        content={note.content}
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
    );
}