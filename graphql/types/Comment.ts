import {
  objectType,
  asNexusMethod,
  extendType,
  nonNull,
  stringArg,
} from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import { Pin } from "./Pin";
import { User } from "./User";

export const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.string("id");
    t.string("createdAt");
    t.string("content");
    t.string("pinId");
    t.field<any>("pin", {
      type: Pin,
      async resolve(_parent: any, args, ctx) {
        return await ctx.prisma.comment
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .pin();
      },
    });
    t.string("userId");
    t.field<any>("user", {
      type: User,
      async resolve(_parent: any, _args, ctx) {
        return await ctx.prisma.comment
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user();
      },
    });
  },
});

export const CommentMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field<any>("createComment", {
      type: "Comment",
      args: {
        content: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        pinId: nonNull(stringArg()),
      },
      async resolve(_parent, { content, userId, pinId }, ctx) {
        if (!ctx.user) {
          throw new Error("Unauthorized!");
        }

        const data = {
          content,
          userId,
          pinId,
        };

        return await ctx.prisma.comment.create({
          data,
        });
      },
    });
  },
});
