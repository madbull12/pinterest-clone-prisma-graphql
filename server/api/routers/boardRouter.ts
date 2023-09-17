import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const boardRouter = createTRPCRouter({
  getYourBoards: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.board.findMany({
      where: {
        userId,
      },
      include: {
        saved: true,
      },
    });
  }),
  userBoards: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      const curUserId = ctx.session?.user?.id;
      const { userId } = input;
      if (curUserId === userId) {
        return ctx.prisma.board.findMany({
          where: {
            userId,
          },
          include: {
            saved: {
              include: {
                pin: true,
              },
            },
          },
        });
      }
      return ctx.prisma.board.findMany({
        where: {
          userId,
          secret: false,
        },
        include: {
          saved: {
            include: {
              pin: true,
            },
          },
        },
      });
    }),
});
