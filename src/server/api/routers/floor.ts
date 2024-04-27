import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const floorRouter = createTRPCRouter({
    updateCurrentRoom: publicProcedure.input(z.object({ userId: z.string(), room: z.string() })).mutation(async({ input }) => {
        await db.user.update({
            where: {
                id: input.userId
            },
            data: {
                currentRoom: input.room
            }
        })
    }),
    updateIsGetItems_scorllBar: protectedProcedure.input(z.object({ userId: z.string(), scrollBar: z.boolean() })).mutation(async ({ input }) => {
        await db.isGetItems.update({
            where: {
                userId: input.userId
            },
            data: {
                scrollBar: input.scrollBar
            }
        })
    }),
    updateProgress: protectedProcedure.input(z.object({ userId: z.string(), progress: z.number() })).mutation(async ({ input }) => {
        return await db.user.update({
            where: {
                id: input.userId
            },
            data: {
                progress: input.progress
            }
        })
    }),
    updateBelonging: protectedProcedure.input(z.object({ userId: z.string(), belonging: z.string() })).mutation(async ({ input }) => {
        return await db.user.update({
            where: {
                id: input.userId
            },
            data: {
                belonging: input.belonging
            }
        })
    }),
    updateMovableRooms: protectedProcedure.input(z.object({ userId: z.string(), room: z.string() })).mutation(async ({ input }) => {
        return await db.movableRoom.create({
            data: {
                userId: input.userId,
                roomName: input.room
            }
        })
    }),
    createBelongingsData: protectedProcedure.input(z.object({ userId: z.string(), belonging: z.string() })).mutation(async ({ input }) => {
        return await db.belonging.create({
            data: {
                userId: input.userId,
                belongingName: input.belonging
            }
        })
    }),
    deleteBlongings: protectedProcedure.input(z.object({ userId: z.string(), belonging: z.string() })).mutation(async ({ input }) => {
        return await db.belonging.deleteMany({
            where: {
                userId: input.userId,
                belongingName: input.belonging
            }
        })
    }),
});
