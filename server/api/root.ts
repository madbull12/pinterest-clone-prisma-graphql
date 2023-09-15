import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "../api/routers/exampleRouter";
import { pinRouter } from "./routers/pinRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  pin:pinRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
