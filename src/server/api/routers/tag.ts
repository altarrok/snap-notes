import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
    getCurrentUsersTags: protectedProcedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.tag.findMany({
                where: {
                    userId: ctx.session.user.id
                }
            })
        }),
});