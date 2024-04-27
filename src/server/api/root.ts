import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { floor1Router } from "./routers/floor1";
import { floorRouter } from "./routers/floor";
import { entranceRouter } from "./routers/entrance";
import { bathroomRouter } from "./routers/bathroom";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  floor: floorRouter,
  //ここに新しいtrpcのファイルを追加
  floor1: floor1Router,
  entrance: entranceRouter,
  bathroom: bathroomRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
