import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const entranceRouter = createTRPCRouter({
    //get
    getEntranceData: protectedProcedure.input(z.object({ userId: z.string() })).query(async({ input }) => {
        const requiredEntraceRoomData = await db.user.findUnique({
            where: {
                id: input.userId
            },
            include: {
                movableRooms: true,
                entrance: true,
                belongings: true
            }
        });
        return requiredEntraceRoomData;
    }),
    // isFitScrollbar
    //   eventIndex     
    //   event0Finished 
    //   isFirstClear   
    //   isClear 
    //update
    updateEntranceData_isFitScrollbar: protectedProcedure.input(z.object({ userId: z.string(), isFitScrollbar: z.boolean() })).mutation(({ input }) => {
        return db.entrance.update({
            where: {
                userId: input.userId
            },
            data: {
                isFitScrollbar: input.isFitScrollbar
            }
        })
    }),
    updateEntranceData_FinishedSendingText: protectedProcedure.input(z.object({ userId: z.string(), eventIndex: z.number(), event0Finished: z.boolean() })).mutation(async({ input }) => {
        const tmp =  await db.entrance.update({
            where: {
                userId: input.userId
            },
            data: {
                eventIndex: input.eventIndex,
                event0Finished: input.event0Finished
            }
        })
        return tmp
    }),
    updateEntranceData_isClear: protectedProcedure.input(z.object({ userId: z.string(), isClear: z.boolean() })).mutation(({ input }) => {
        return db.entrance.update({
            where: {
                userId: input.userId
            },
            data: {
                isClear: input.isClear
            }
        })
    }),
});