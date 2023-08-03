// import { Board, Board, Board } from "@prisma/client";
import { booleanArg, extendType, nonNull, nullable, objectType, stringArg } from "nexus";

export const Board = objectType({
  name: "Board",
  definition(t) {
    t.string("id");
    t.string("name");
    t.nullable.string("description");
    t.string("userId");
    t.boolean("secret");
    t.field("user", {
      type: "User",
      async resolve(_parent, _, ctx) {
        return await ctx.prisma.board
          .findUnique({
            where: {
              id: _parent.id as string,
            },
          })
          .user();
      },
    });
    t.list.field<any>("saved", {
      type: "Saved",
      async resolve(_parent: any, _, ctx) {
        return await ctx.prisma.board
          .findUnique({
            where: {
              id: _parent.id as string,
            },
          })
          .saved();
      },
    });
  },
});

export const BoardQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.nonNull.field("userBoards", {
      type: "Board",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve(_parent, { userId }, ctx) {
        const { user: curUser } = ctx;
        if (curUser?.id === userId) {
          return ctx.prisma.board.findMany({
            where: {
              userId,
            },
          });
        }
        return ctx.prisma.board.findMany({
          where: {
            userId,
            secret: false,
          },
        });
      },
    }),
      t.nonNull.field<any>("firstUserBoard", {
        type: "Board",
        args: {
          userId: nonNull(stringArg()),
        },
        resolve(_parent, { userId }, ctx) {
          return ctx.prisma.board.findFirst({
            where: {
              userId,
            },
          });
        },
      }),
      t.nonNull.field<any>("boardPins", {
        type: "Board",
        args: {
          boardId: nonNull(stringArg()),
        },
        async resolve(_parent, { boardId }, ctx) {
          const boardUnique = await ctx.prisma.board.findUnique({
            where: {
              id: boardId,
            },
          });

          if (boardUnique?.secret) {
            if (boardUnique.userId !== ctx.user?.id) {
              throw new Error("ffs this is secret bij");
            }
            return boardUnique;
          }
          return boardUnique;
        },
      });
    t.nonNull.field<any>("singleBoard", {
      type: "Board",
      args: {
        boardId: nonNull(stringArg()),
      },
      async resolve(_parent, { boardId }, ctx) {
        return await ctx.prisma.board.findUnique({
          where: {
            id: boardId,
          },
        });
      },
    });
  },
});

export const BoardMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field<any>("createBoard", {
      type: "Board",
      args: {
        userId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        secret: nonNull(booleanArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error("Unauthorized!");
        }
        const userId = ctx.user?.id;
        return await ctx.prisma.board.create({
          data: {
            name: args.name,

            secret: args.secret,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      },
    });

    t.nonNull.field<any>("updateBoard", {
      type: "Board",
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
        secret: nonNull(booleanArg()),
        description:nullable(stringArg())
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error("Unauthorized!");
        }

        const isRightUser = (await ctx.prisma.board.findUnique({
          where:{
            // user
            id:args.id
          }
        }))?.userId === ctx.user?.id;

        if(!isRightUser) {
          throw new Error("You have no right to use this resource")
        }

        return await ctx.prisma.board.update({
          where:{
            id:args.id
          },
          data: {
            name: args.name,
            secret: args.secret,
            description:args.description
          },
        });
      },
    });
  },
});
