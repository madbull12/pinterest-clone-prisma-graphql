import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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
            userId: userId as string,
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
          userId: userId as string,
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
  boardPins: publicProcedure
    .input(z.object({ boardId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { boardId } = input;
      const boardUnique = await ctx.prisma.board.findUnique({
        where: {
          id: boardId,
        },
        include: {
          saved: {
            include: {
              pin: true,
            },
          },
        },
      });

      if (boardUnique?.secret) {
        if (boardUnique.userId !== ctx.session?.user?.id) {
          throw new TRPCError({
            message: "Unable to load data",
            code: "FORBIDDEN",
          });
        }
        return boardUnique;
      }
      return boardUnique;
    }),
  createBoard: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        secret: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, secret } = input;
      const userId = await ctx.session.user.id;
      return await ctx.prisma.board.create({
        data: {
          name: name,

          secret: secret,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  singleBoard: publicProcedure
    .input(z.object({ boardId: z.string() }))
    .query(({ ctx, input }) => {
      const { boardId } = input;
      return ctx.prisma.board.findUnique({
        where: {
          id: boardId,
        },
      });
    }),

  updateBoard: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        secret: z.boolean(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, secret, description } = input;
      const userId = await ctx.session.user.id;
      const isRightUser =
        (
          await ctx.prisma.board.findUnique({
            where: {
              // user
              id,
            },
          })
        )?.userId === userId;

      if (!isRightUser) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You're not allowed to make this request",
        });
      }

      return await ctx.prisma.board.update({
        where: {
          id,
        },
        data: {
          name,
          secret,
          description,
        },
      });
    }),
  deleteBoard: protectedProcedure
    .input(z.object({ boardId: z.string() }))
    .mutation(async({ ctx, input }) => {
      const { boardId } = input;

      const userId = await ctx.session.user.id;
      const isRightUser =
        (
          await ctx.prisma.board.findUnique({
            where: {
              // user
              id: boardId,
            },
          })
        )?.userId === userId;

      if (!isRightUser) {
        throw new Error("You have no right to use this resource");
      }

      return await ctx.prisma.board.delete({
        where: {
          id: boardId,
        },
      });
    }),
});
