import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  addComment: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1, "Comment can't be empty"),
        userId: z.string(),
        pinId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: input,
      });
    }),
});
