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
    //update
    updateBathroomData: protectedProcedure.input(z.object({ userId: z.string(), scrollBar: z.boolean(), newItem: z.string(), eventIndex: z.number(), event0Finished: z.boolean()})).mutation(async({ input }) => {
        await db.isGetItems.update({
            where: {
                userId: input.userId
            },
            data: {
                scrollBar: input.scrollBar
            }
        })

        await db.belonging.create({
            data: {
                userId: input.userId,
                belongingName: input.newItem
            }
        })

        await db.entrance.update({
            where:{
                userId: input.userId
            },
            data: {
                eventIndex: input.eventIndex,
                event0Finished:input.event0Finished
            }
        })
    })
});