import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "../api/routers/exampleRouter";
import { pinRouter } from "./routers/pinRouter";
import { boardRouter } from "./routers/boardRouter";
import { savedRouter } from "./routers/savedRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  board:boardRouter,
  pin:pinRouter,
  saved:savedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
