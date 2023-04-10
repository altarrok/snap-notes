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
            tags: z.string().array()
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
                    userId: ctx.session.user.id,
                    tags: {
                        create: input.tags.map(tag => ({
                            tag: {
                                connectOrCreate: {
                                    create: {
                                        userId: ctx.session.user.id,
                                        name: tag,
                                    },
                                    where: {
                                        userId_name: {
                                            userId: ctx.session.user.id,
                                            name: tag,
                                        }
                                    }
                                }
                            }
                        }))
                    },
                },
                update: {
                    title: input.title,
                    content: input.content,
                    userId: ctx.session.user.id,
                    tags: {
                        deleteMany: {},
                        connectOrCreate: input.tags.map(tag => ({
                            create: {
                                tag: {
                                    connectOrCreate: {
                                        create: {
                                            userId: ctx.session.user.id,
                                            name: tag,
                                        },
                                        where: {
                                            userId_name: {
                                                userId: ctx.session.user.id,
                                                name: tag,
                                            }
                                        }
                                    }
                                }
                            },
                            where: {
                                noteId_userId_name: {
                                    noteId: input.noteId || "",
                                    userId: ctx.session.user.id,
                                    name: tag,
                                }
                            }
                        }))
                    },
                },
                where: {
                    id: input.noteId || ""
                }
            });
        }),
    getWithCursor: publicProcedure
        .input(z.object({
            limit: z.number(),
            cursor: z.string().nullish(),
            searchValue: z.string().nonempty().optional(),
            tags: z.string().array().optional(),
        }))
        .query(async ({ input, ctx }) => {
            const notes = await ctx.prisma.note.findMany({
                take: input.limit + 1,
                cursor: input.cursor ? { id: input.cursor } : undefined,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    tags: true
                },
                ...(input.searchValue || input.tags ? {
                    where: {
                        AND: {
                            ...(input.searchValue ? {
                                OR: [
                                    { title: { contains: input.searchValue, mode: "insensitive" } },
                                    { content: { contains: input.searchValue, mode: "insensitive" } },
                                ]
                            } : {}),
                            ...(input.tags ? {
                                tags: {
                                    some: {
                                        OR: input.tags?.map(tag => ({
                                            name: tag
                                        }))
                                    }
                                }
                            } : {})
                        },
                    }
                } : {}),
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
        }),
    getById: publicProcedure
        .input(z.object({
            noteId: z.string()
        }))
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.note.findUnique({
                where: {
                    id: input.noteId
                },
                include: {
                    tags: true
                }
            })
        }),
    delete: protectedProcedure
        .input(z.object({
            noteId: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            const targetNoteOwnerId = (await ctx.prisma.note.findUnique({
                where: {
                    id: input.noteId
                }
            }))?.userId

            if (ctx.session.user.id !== targetNoteOwnerId) {
                throw new Error("Unauthorized")
            }

            return ctx.prisma.note.delete({
                where: {
                    id: input.noteId
                }
            })
        }),
});