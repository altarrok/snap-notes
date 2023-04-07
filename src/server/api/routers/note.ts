import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            title: z.string().min(2).max(24),
            content: z.string().max(400),
        }))
        .mutation(({ input, ctx }) => {
            return ctx.prisma.note.create({
                data: {
                    title: input.title,
                    content: input.content,
                    userId: ctx.session.user.id
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