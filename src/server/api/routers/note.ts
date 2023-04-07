import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
    upsert: protectedProcedure
        .input(z.object({
            noteId: z.string().optional(),
            title: z.string().min(2).max(24),
            content: z.string().max(400),
        }))
        .mutation(async ({ input, ctx }) => {
            if (input.noteId) {
                const noteOwnerUserId = (await ctx.prisma.note.findUnique({
                    where: {
                        id: input.noteId
                    }
                }))?.userId

                if (ctx.session.user.id !== noteOwnerUserId) {
                    throw new Error("Unauthorized")
                }
            }

            return ctx.prisma.note.upsert({
                create: {
                    title: input.title,
                    content: input.content,
                    userId: ctx.session.user.id
                },
                update: {
                    title: input.title,
                    content: input.content,
                    userId: ctx.session.user.id
                },
                where: {
                    id: input.noteId || ""
                }
            });
        }),
    getWithCursor: publicProcedure
        .input(z.object({
            limit: z.number(),
            cursor: z.string().nullish()
        }))
        .query(async ({ input, ctx }) => {
            const notes = await ctx.prisma.note.findMany({
                take: input.limit + 1,
                cursor: input.cursor ? { id: input.cursor } : undefined,
                orderBy: {
                    createdAt: 'desc'
                }
            });

            let nextCursor: typeof input.cursor = undefined;

            if (notes.length > input.limit) {
                const nextNote = notes.pop(); // return the last item from the array
                nextCursor = nextNote?.id;
            }

            return {
                notes,
                nextCursor,
            };
        })
});