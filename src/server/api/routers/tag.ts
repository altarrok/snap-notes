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
                    notes: {
                        some: {
                            Note: {
                                userId: ctx.session.user.id
                            }
                        }
                    }
                }
            })
        }),
    getAllTags: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.tag.findMany()
        }),
});