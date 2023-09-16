import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      include: {
        pins: {
          select: {
            media: true,
          },
        },
      },
    });
  }),
  getHighestPinsCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      include: {
        pins: {
          select: {
            media: true,
          },
        },
      },
      orderBy: {
        pins: {
          _count: "desc",
        },
      },
    });
  }),
});
