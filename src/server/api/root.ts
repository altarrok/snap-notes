import { noteRouter } from './routers/note';
import { createTRPCRouter } from "~/server/api/trpc";
import { tagRouter } from './routers/tag';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    note: noteRouter,
    tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
