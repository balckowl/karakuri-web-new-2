import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const bathroomRouter = createTRPCRouter({
    //get
    getBathRoomData: protectedProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
        const requiredBathRoomData = db.user.findUnique({
            where: {
                id: input.userId
            },
            include: {
                movableRooms: true,
                bathroom: true,
                belongings: true
            }
        })
        return requiredBathRoomData;
    }),
    // eventIndex     Int     @default(0)
    // event0Finished Boolean @default(true)
    //update
    updateBathRoomData_evetIndex: protectedProcedure.input(z.object({ userId: z.string(), eventIndex: z.number() })).mutation(({ input }) => {
        return db.bathroom.update({
            where: {
                userId: input.userId
            },
            data: {
                eventIndex: input.eventIndex
            }
        })
    }),
    updateBathRoomData_evet0Finished: protectedProcedure.input(z.object({ userId: z.string(), event0Finished: z.boolean() })).mutation(({ input }) => {
        return db.bathroom.update({
            where: {
                userId: input.userId
            },
            data: {
                event0Finished: input.event0Finished
            }
        })
    }),
});