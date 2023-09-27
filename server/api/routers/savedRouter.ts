import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const savedRouter = createTRPCRouter({
  savePin: protectedProcedure
    .input(
      z.object({ pinId: z.string(), boardId: z.string(), userId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      const saveData = {
        pinId: input.pinId,
        userId: input.userId,
        boardId: input.boardId,
      };
      const existingSaved = await ctx.prisma.saved
        .findUnique({
          where: {
            userId_pinId_boardId: {
              userId: input.userId as string,
              pinId: input.pinId as string,
              boardId: input.boardId as string,
            },
          },
        })
        .board();
      if (existingSaved) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Pin already saved in ${existingSaved.name}`,
        });
      }
      return await ctx.prisma.saved.create({
        data: saveData,
      });
    }),
  deleteSavedPin: protectedProcedure
    .input(z.object({ pinId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { pinId } = input;
      return await ctx.prisma.saved.delete({
        where: {
          id:pinId as string,
          
        },
      });
    }),
});
