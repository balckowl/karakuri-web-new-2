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
});