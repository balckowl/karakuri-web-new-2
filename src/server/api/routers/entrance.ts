import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const entranceRouter = createTRPCRouter({
    //get
    getEntranceData: protectedProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
        const requiredEntraceRoomData = db.user.findUnique({
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
    updateEntranceData_eventIndex: protectedProcedure.input(z.object({ userId: z.string(), eventIndex: z.number() })).mutation(({ input }) => {
        return db.entrance.update({
            where: {
                userId: input.userId
            },
            data: {
                eventIndex: input.eventIndex
            }
        })
    }),
    updateEntranceData_event0Finished: protectedProcedure.input(z.object({ userId: z.string(), event0Finished: z.boolean() })).mutation(({ input }) => {
        return db.entrance.update({
            where: {
                userId: input.userId
            },
            data: {
                event0Finished: input.event0Finished
            }
        })
    }),
    // updateEntranceData_isFirstClear: protectedProcedure.input(z.object({ userId: z.string(), isFirstClear: z.boolean() })).mutation(({ input }) => {
    //     return db.entrance.update({
    //         where: {
    //             userId: input.userId
    //         },
    //         data: {
    //             event0Finished: input.isFirstClear
    //         }
    //     })
    // }),
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