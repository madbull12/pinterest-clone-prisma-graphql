import { createTRPCRouter, protectedProcedure } from "../trpc";

export const boardRouter = createTRPCRouter({
    getYourBoards:protectedProcedure.query(({ ctx })=>{
        const userId = ctx.session.user.id;
        return ctx.prisma.board.findMany({
            where: {
              userId,
            },
            include:{
                saved:true
            }
          });
    })
})