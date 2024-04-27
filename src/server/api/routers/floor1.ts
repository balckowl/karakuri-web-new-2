import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const floor1Router = createTRPCRouter({
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
  getCafeteriaData: protectedProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
    const requiredKitchenRoomData = db.user.findUnique({
      where: {
        id: input.userId
      },
      include: {
        movableRooms: true,
        cafeteria: true,
        belongings: true
      }
    })
    return requiredKitchenRoomData;
  }),
  getKitchenData: protectedProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
    const requiredKitchenRoomData = db.user.findUnique({
      where: {
        id: input.userId
      },
      include: {
        movableRooms: true,
        kitchen: true,
        belongings: true,
      }
    })
    return requiredKitchenRoomData;
  }),
  getSocialRoomData: protectedProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
    const requiredSocialRoomData = db.user.findUnique({
      where: {
        id: input.userId
      },
      include: {
        movableRooms: true,
        socialRoom: true,
        belongings: true
      }
    })
    return requiredSocialRoomData;
  }),
  getStoreRoomData: protectedProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
    const requiredStoreRoomData = db.user.findUnique({
      where: {
        id: input.userId
      },
      include: {
        movableRooms: true,
        storeRoom: true,
        belongings: true
      }
    })
    return requiredStoreRoomData;
  }),
  getElevatorData: protectedProcedure.input(z.object({ userId: z.string() })).query(({ input }) => {
    const requiredElevatorRoomData = db.user.findUnique({
      where: {
        id: input.userId
      },
      include: {
        movableRooms: true,
        elevator: true,
        belongings: true
      }
    })
    return requiredElevatorRoomData;
  }),

  // isFitScrollbar
  //   eventIndex     
  //   event0Finished 
  //   isFirstClear   
  //   isClear 
  //update
  updateEntranceData: protectedProcedure.input(z.object({ userId: z.string(), isFitScrollbar:z.string(), eventIndex: z.number(), event0Finished: z.boolean(), isFirstClear: z.boolean(), isClear: z.boolean()})).mutation(({input})=>{
    return db.entrance.update({
      where:{
        userId: input.userId
      },
      data: {
        
      }
    })
  })
});