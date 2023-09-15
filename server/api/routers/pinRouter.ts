import { createTRPCRouter, publicProcedure } from "../trpc";

export const pinRouter = createTRPCRouter({
    getAllPins:publicProcedure.query(({ ctx })=>{
        return ctx.prisma.pin.findMany()
    })
})