import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const floorRouter = createTRPCRouter({
    updateCurrentRoom: protectedProcedure.input(z.object({ userId: z.string(), room: z.string() })).mutation(({ input }) => {
        return db.user.update({
            where: {
                id: input.userId
            },
            data: {
                currentRoom: input.room
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
    createBelongings: protectedProcedure.input(z.object({ userId: z.string(), belonging: z.string() })).mutation(async ({ input }) => {
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
