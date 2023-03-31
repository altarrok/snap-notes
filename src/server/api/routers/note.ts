import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            title: z.string(),
            content: z.string(),
        }))
        .mutation(({ input, ctx }) => {
            ctx.prisma.note.create({
                data: {
                    title: input.title,
                    content: input.content,
                    userId: ctx.session.user.id
                }
            });
        }),
});